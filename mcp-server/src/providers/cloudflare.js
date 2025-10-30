import fetch from 'node-fetch';
import { z } from 'zod';
import { requireAdmin } from '../auth.js';

const CF_API = 'https://api.cloudflare.com/client/v4';

async function cfFetch(path, options = {}) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) throw new Error('CLOUDFLARE_API_TOKEN not set');

  const res = await fetch(`${CF_API}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudflare API error: ${res.status} ${text}`);
  }

  return res.json();
}

// List DNS records for a zone
const cf_list_dns_records = {
  name: 'cf_list_dns_records',
  description: 'List DNS records in a Cloudflare zone',
  inputSchema: z.object({
    zoneId: z.string(),
    name: z.string().optional(),
    type: z.string().optional(),
  }).strip(),
  async handler({ input }) {
    const params = new URLSearchParams();
    if (input.name) params.set('name', input.name);
    if (input.type) params.set('type', input.type);

    const data = await cfFetch(`/zones/${input.zoneId}/dns_records?${params}`);
    return { content: [{ type: 'json', json: data.result }] };
  },
};

// Create or update DNS record
const cf_upsert_dns_record = {
  name: 'cf_upsert_dns_record',
  description: 'Create or update a DNS record in Cloudflare (admin)',
  inputSchema: z.object({
    zoneId: z.string(),
    type: z.enum(['A', 'AAAA', 'CNAME', 'TXT', 'MX']),
    name: z.string(),
    content: z.string(),
    proxied: z.boolean().optional().default(true),
    ttl: z.number().optional().default(1),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    // Check if record exists
    const existing = await cfFetch(`/zones/${input.zoneId}/dns_records?name=${input.name}&type=${input.type}`);

    let data;
    if (existing.result && existing.result.length > 0) {
      // Update existing
      const recordId = existing.result[0].id;
      data = await cfFetch(`/zones/${input.zoneId}/dns_records/${recordId}`, {
        method: 'PUT',
        body: JSON.stringify({
          type: input.type,
          name: input.name,
          content: input.content,
          proxied: input.proxied,
          ttl: input.ttl,
        }),
      });
    } else {
      // Create new
      data = await cfFetch(`/zones/${input.zoneId}/dns_records`, {
        method: 'POST',
        body: JSON.stringify({
          type: input.type,
          name: input.name,
          content: input.content,
          proxied: input.proxied,
          ttl: input.ttl,
        }),
      });
    }

    return { content: [{ type: 'json', json: data.result }] };
  },
};

// Point domain to Vercel
const cf_point_to_vercel = {
  name: 'cf_point_to_vercel',
  description: 'Point a domain to Vercel using Cloudflare DNS (admin)',
  inputSchema: z.object({
    zoneId: z.string(),
    domain: z.string(),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const results = [];

    // A record for root
    const aRecord = await cfFetch(`/zones/${input.zoneId}/dns_records`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'A',
        name: input.domain,
        content: '76.76.21.21',
        proxied: true,
        ttl: 1,
      }),
    });
    results.push({ type: 'A', ...aRecord.result });

    // AAAA record for IPv6
    const aaaaRecord = await cfFetch(`/zones/${input.zoneId}/dns_records`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'AAAA',
        name: input.domain,
        content: '2606:4700:10::6816:1515',
        proxied: true,
        ttl: 1,
      }),
    });
    results.push({ type: 'AAAA', ...aaaaRecord.result });

    // CNAME for www
    const cnameRecord = await cfFetch(`/zones/${input.zoneId}/dns_records`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'CNAME',
        name: `www.${input.domain}`,
        content: 'cname.vercel-dns.com',
        proxied: true,
        ttl: 1,
      }),
    });
    results.push({ type: 'CNAME', ...cnameRecord.result });

    return {
      content: [{
        type: 'text',
        text: `DNS records created for ${input.domain}:\n${JSON.stringify(results, null, 2)}`,
      }],
    };
  },
};

// List Cloudflare Workers
const cf_list_workers = {
  name: 'cf_list_workers',
  description: 'List Cloudflare Workers in account',
  inputSchema: z.object({
    accountId: z.string(),
  }).strip(),
  async handler({ input }) {
    const data = await cfFetch(`/accounts/${input.accountId}/workers/services`);
    return { content: [{ type: 'json', json: data.result }] };
  },
};

// Deploy Cloudflare Worker
const cf_deploy_worker = {
  name: 'cf_deploy_worker',
  description: 'Deploy a Cloudflare Worker (admin)',
  inputSchema: z.object({
    accountId: z.string(),
    workerName: z.string(),
    script: z.string(),
    kvBindings: z.array(z.object({
      name: z.string(),
      namespace_id: z.string(),
    })).optional(),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const formData = new FormData();
    formData.append('script', new Blob([input.script], { type: 'application/javascript' }));

    if (input.kvBindings && input.kvBindings.length > 0) {
      const metadata = {
        bindings: input.kvBindings.map(b => ({
          type: 'kv_namespace',
          name: b.name,
          namespace_id: b.namespace_id,
        })),
      };
      formData.append('metadata', JSON.stringify(metadata));
    }

    const res = await fetch(`${CF_API}/accounts/${input.accountId}/workers/scripts/${input.workerName}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Worker deployment failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    return { content: [{ type: 'json', json: data.result }] };
  },
};

// Get KV namespace
const cf_get_kv = {
  name: 'cf_get_kv',
  description: 'Get value from Cloudflare KV',
  inputSchema: z.object({
    accountId: z.string(),
    namespaceId: z.string(),
    key: z.string(),
  }).strip(),
  async handler({ input }) {
    const data = await cfFetch(
      `/accounts/${input.accountId}/storage/kv/namespaces/${input.namespaceId}/values/${input.key}`
    );
    return { content: [{ type: 'text', text: data }] };
  },
};

// Set KV value
const cf_set_kv = {
  name: 'cf_set_kv',
  description: 'Set value in Cloudflare KV (admin)',
  inputSchema: z.object({
    accountId: z.string(),
    namespaceId: z.string(),
    key: z.string(),
    value: z.string(),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    await cfFetch(
      `/accounts/${input.accountId}/storage/kv/namespaces/${input.namespaceId}/values/${input.key}`,
      {
        method: 'PUT',
        body: input.value,
        headers: { 'Content-Type': 'text/plain' },
      }
    );

    return { content: [{ type: 'text', text: `KV key '${input.key}' set successfully` }] };
  },
};

export const cloudflareTools = [
  cf_list_dns_records,
  cf_upsert_dns_record,
  cf_point_to_vercel,
  cf_list_workers,
  cf_deploy_worker,
  cf_get_kv,
  cf_set_kv,
];
