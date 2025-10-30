import fetch from 'node-fetch';
import { z } from 'zod';
import { requireAdmin } from '../auth.js';

const RENDER_API = 'https://api.render.com/v1';

async function renderFetch(path, options = {}) {
  const key = process.env.RENDER_API_KEY;
  if (!key) throw new Error('RENDER_API_KEY not set');

  const res = await fetch(`${RENDER_API}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Render API error: ${res.status} ${text}`);
  }

  return res.json();
}

// List services
const render_services_list = {
  name: 'render_services_list',
  description: 'List all Render services',
  inputSchema: z.object({}).strip(),
  async handler() {
    const data = await renderFetch('/services');
    return { content: [{ type: 'json', json: data }] };
  },
};

// Get service details
const render_service_get = {
  name: 'render_service_get',
  description: 'Get details of a Render service',
  inputSchema: z.object({
    serviceId: z.string(),
  }).strip(),
  async handler({ input }) {
    const data = await renderFetch(`/services/${input.serviceId}`);
    return { content: [{ type: 'json', json: data.service }] };
  },
};

// List deploys for service
const render_deploys_list = {
  name: 'render_deploys_list',
  description: 'List deploys for a Render service',
  inputSchema: z.object({
    serviceId: z.string(),
    limit: z.number().optional().default(10),
  }).strip(),
  async handler({ input }) {
    const data = await renderFetch(`/services/${input.serviceId}/deploys?limit=${input.limit}`);
    return { content: [{ type: 'json', json: data }] };
  },
};

// Trigger deploy
const render_deploy_trigger = {
  name: 'render_deploy_trigger',
  description: 'Trigger a new deploy for a Render service (admin)',
  inputSchema: z.object({
    serviceId: z.string(),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const data = await renderFetch(`/services/${input.serviceId}/deploys`, {
      method: 'POST',
    });

    return { content: [{ type: 'json', json: data }] };
  },
};

// Get environment variables
const render_env_get = {
  name: 'render_env_get',
  description: 'Get environment variables for a Render service',
  inputSchema: z.object({
    serviceId: z.string(),
  }).strip(),
  async handler({ input }) {
    const data = await renderFetch(`/services/${input.serviceId}/env-vars`);
    return { content: [{ type: 'json', json: data }] };
  },
};

// Set environment variable
const render_env_set = {
  name: 'render_env_set',
  description: 'Set an environment variable for a Render service (admin)',
  inputSchema: z.object({
    serviceId: z.string(),
    key: z.string(),
    value: z.string(),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const data = await renderFetch(`/services/${input.serviceId}/env-vars`, {
      method: 'PUT',
      body: JSON.stringify([{
        key: input.key,
        value: input.value,
      }]),
    });

    return { content: [{ type: 'json', json: data }] };
  },
};

export const renderTools = [
  render_services_list,
  render_service_get,
  render_deploys_list,
  render_deploy_trigger,
  render_env_get,
  render_env_set,
];
