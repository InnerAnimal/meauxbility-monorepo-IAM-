import fetch from 'node-fetch';
import { z } from 'zod';
import { requireAdmin } from '../auth.js';

const VERCEL_API = 'https://api.vercel.com';

async function vercelFetch(path, options = {}) {
  const token = process.env.VERCEL_TOKEN;
  if (!token) throw new Error('VERCEL_TOKEN not set');

  const res = await fetch(`${VERCEL_API}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Vercel API error: ${res.status} ${text}`);
  }

  return res.json();
}

// List projects
const vercel_projects_list = {
  name: 'vercel_projects_list',
  description: 'List all Vercel projects',
  inputSchema: z.object({}).strip(),
  async handler() {
    const data = await vercelFetch('/v9/projects');
    return { content: [{ type: 'json', json: data.projects }] };
  },
};

// Get project details
const vercel_project_get = {
  name: 'vercel_project_get',
  description: 'Get details of a Vercel project',
  inputSchema: z.object({
    projectId: z.string(),
  }).strip(),
  async handler({ input }) {
    const data = await vercelFetch(`/v9/projects/${input.projectId}`);
    return { content: [{ type: 'json', json: data }] };
  },
};

// List deployments
const vercel_deployments_list = {
  name: 'vercel_deployments_list',
  description: 'List deployments for a project',
  inputSchema: z.object({
    projectId: z.string(),
    limit: z.number().optional().default(10),
  }).strip(),
  async handler({ input }) {
    const data = await vercelFetch(`/v6/deployments?projectId=${input.projectId}&limit=${input.limit}`);
    return { content: [{ type: 'json', json: data.deployments }] };
  },
};

// Trigger deployment
const vercel_deploy = {
  name: 'vercel_deploy',
  description: 'Trigger a new deployment for a project (admin)',
  inputSchema: z.object({
    projectId: z.string(),
    gitSource: z.object({
      type: z.literal('github'),
      repoId: z.string(),
      ref: z.string().optional().default('main'),
    }).optional(),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const payload = {
      name: input.projectId,
      gitSource: input.gitSource,
    };

    const data = await vercelFetch('/v13/deployments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return { content: [{ type: 'json', json: data }] };
  },
};

// Add domain to project
const vercel_link_domain = {
  name: 'vercel_link_domain',
  description: 'Add a custom domain to a Vercel project (admin)',
  inputSchema: z.object({
    projectId: z.string(),
    domain: z.string(),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const data = await vercelFetch(`/v9/projects/${input.projectId}/domains`, {
      method: 'POST',
      body: JSON.stringify({ name: input.domain }),
    });

    return { content: [{ type: 'json', json: data }] };
  },
};

// List domains for project
const vercel_domains_list = {
  name: 'vercel_domains_list',
  description: 'List domains for a Vercel project',
  inputSchema: z.object({
    projectId: z.string(),
  }).strip(),
  async handler({ input }) {
    const data = await vercelFetch(`/v9/projects/${input.projectId}/domains`);
    return { content: [{ type: 'json', json: data.domains }] };
  },
};

// Get environment variables
const vercel_env_get = {
  name: 'vercel_env_get',
  description: 'Get environment variables for a project',
  inputSchema: z.object({
    projectId: z.string(),
  }).strip(),
  async handler({ input }) {
    const data = await vercelFetch(`/v9/projects/${input.projectId}/env`);
    return { content: [{ type: 'json', json: data.envs }] };
  },
};

// Set environment variable
const vercel_env_set = {
  name: 'vercel_env_set',
  description: 'Set an environment variable for a project (admin)',
  inputSchema: z.object({
    projectId: z.string(),
    key: z.string(),
    value: z.string(),
    target: z.array(z.enum(['production', 'preview', 'development'])).optional().default(['production']),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const data = await vercelFetch(`/v10/projects/${input.projectId}/env`, {
      method: 'POST',
      body: JSON.stringify({
        key: input.key,
        value: input.value,
        type: 'encrypted',
        target: input.target,
      }),
    });

    return { content: [{ type: 'json', json: data }] };
  },
};

export const vercelTools = [
  vercel_projects_list,
  vercel_project_get,
  vercel_deployments_list,
  vercel_deploy,
  vercel_link_domain,
  vercel_domains_list,
  vercel_env_get,
  vercel_env_set,
];
