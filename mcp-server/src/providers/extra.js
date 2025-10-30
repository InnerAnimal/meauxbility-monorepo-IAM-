import fetch from 'node-fetch';
import { z } from 'zod';
import { requireAdmin } from '../auth.js';

// GitHub: open PR
const github_open_pr = {
  name: 'github_open_pr',
  description: 'Open a PR on GitHub (admin). repo format: owner/name',
  inputSchema: z
    .object({ repo: z.string(), head: z.string(), base: z.string(), title: z.string(), body: z.string().optional() })
    .strip(),
  async handler({ input, context }) {
    requireAdmin(context);
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error('GITHUB_TOKEN not set');
    const res = await fetch(`https://api.github.com/repos/${input.repo}/pulls`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'meaux-mcp' },
      body: JSON.stringify({ title: input.title, head: input.head, base: input.base, body: input.body ?? '' }),
    });
    if (!res.ok) throw new Error(`GitHub error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return { content: [{ type: 'json', json: data }] };
  },
};

// Stripe: list products
const stripe_list_products = {
  name: 'stripe_list_products',
  description: 'List Stripe products (read-only)',
  inputSchema: z.object({ limit: z.number().optional() }).strip(),
  async handler({ input }) {
    const key = process.env.STRIPE_API_KEY;
    if (!key) throw new Error('STRIPE_API_KEY not set');
    const res = await fetch('https://api.stripe.com/v1/products?limit=' + (input.limit ?? 10), {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) throw new Error(`Stripe error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return { content: [{ type: 'json', json: data }] };
  },
};

// GA4: send event via Measurement Protocol
const ga4_send_event = {
  name: 'ga4_send_event',
  description: 'Send GA4 event via Measurement Protocol',
  inputSchema: z
    .object({ client_id: z.string(), name: z.string(), params: z.record(z.any()).optional() })
    .strip(),
  async handler({ input }) {
    const property = process.env.GA4_PROPERTY_ID;
    const secret = process.env.GA4_API_SECRET;
    if (!property || !secret) throw new Error('GA4_PROPERTY_ID or GA4_API_SECRET not set');
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${property}&api_secret=${secret}`;
    const payload = { client_id: input.client_id, events: [{ name: input.name, params: input.params ?? {} }] };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error(`GA4 error: ${res.status} ${await res.text()}`);
    return { content: [{ type: 'text', text: 'GA4 event sent' }] };
  },
};

// WhatsApp Cloud API: send message
const whatsapp_send_message = {
  name: 'whatsapp_send_message',
  description: 'Send a WhatsApp message via Meta Cloud API (admin)',
  inputSchema: z
    .object({ phone_number_id: z.string(), to: z.string(), text: z.string() })
    .strip(),
  async handler({ input, context }) {
    requireAdmin(context);
    const token = process.env.WHATSAPP_TOKEN;
    if (!token) throw new Error('WHATSAPP_TOKEN not set');
    const res = await fetch(`https://graph.facebook.com/v19.0/${input.phone_number_id}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to: input.to, type: 'text', text: { body: input.text } }),
    });
    if (!res.ok) throw new Error(`WhatsApp error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return { content: [{ type: 'json', json: data }] };
  },
};

// OpenAI: simple content generation
const openai_generate = {
  name: 'openai_generate',
  description: 'Generate text with OpenAI (gpt-4o-mini by default)',
  inputSchema: z
    .object({ prompt: z.string(), model: z.string().optional() })
    .strip(),
  async handler({ input }) {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error('OPENAI_API_KEY not set');
    const model = input.model ?? 'gpt-4o-mini';
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages: [{ role: 'user', content: input.prompt }] }),
    });
    if (!res.ok) throw new Error(`OpenAI error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? '';
    return { content: [{ type: 'text', text }] };
  },
};

export const extraTools = [
  github_open_pr,
  stripe_list_products,
  ga4_send_event,
  whatsapp_send_message,
  openai_generate,
];
