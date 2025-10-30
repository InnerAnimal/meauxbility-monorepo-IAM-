import fetch from 'node-fetch';
import { z } from 'zod';
import { requireAdmin } from '../auth.js';

async function supabaseFetch(path, options = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set');
  }

  const res = await fetch(`${url}/rest/v1${path}`, {
    ...options,
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data;
}

// Query table
const supabase_query = {
  name: 'supabase_query',
  description: 'Query a Supabase table',
  inputSchema: z.object({
    table: z.string(),
    select: z.string().optional().default('*'),
    filter: z.string().optional(),
    limit: z.number().optional().default(10),
  }).strip(),
  async handler({ input }) {
    let path = `/${input.table}?select=${input.select}&limit=${input.limit}`;
    if (input.filter) path += `&${input.filter}`;

    const data = await supabaseFetch(path);
    return { content: [{ type: 'json', json: data }] };
  },
};

// Insert row
const supabase_insert = {
  name: 'supabase_insert',
  description: 'Insert a row into a Supabase table (admin)',
  inputSchema: z.object({
    table: z.string(),
    data: z.record(z.any()),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const data = await supabaseFetch(`/${input.table}`, {
      method: 'POST',
      body: JSON.stringify(input.data),
    });

    return { content: [{ type: 'json', json: data }] };
  },
};

// Update row
const supabase_update = {
  name: 'supabase_update',
  description: 'Update rows in a Supabase table (admin)',
  inputSchema: z.object({
    table: z.string(),
    filter: z.string(),
    data: z.record(z.any()),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const data = await supabaseFetch(`/${input.table}?${input.filter}`, {
      method: 'PATCH',
      body: JSON.stringify(input.data),
    });

    return { content: [{ type: 'json', json: data }] };
  },
};

// Delete row
const supabase_delete = {
  name: 'supabase_delete',
  description: 'Delete rows from a Supabase table (admin)',
  inputSchema: z.object({
    table: z.string(),
    filter: z.string(),
  }).strip(),
  async handler({ input, context }) {
    requireAdmin(context);

    const data = await supabaseFetch(`/${input.table}?${input.filter}`, {
      method: 'DELETE',
    });

    return { content: [{ type: 'json', json: data }] };
  },
};

// Get table stats
const supabase_table_stats = {
  name: 'supabase_table_stats',
  description: 'Get statistics for a Supabase table',
  inputSchema: z.object({
    table: z.string(),
  }).strip(),
  async handler({ input }) {
    const data = await supabaseFetch(`/${input.table}?select=count`);
    return { content: [{ type: 'json', json: { table: input.table, count: data.length } }] };
  },
};

export const supabaseTools = [
  supabase_query,
  supabase_insert,
  supabase_update,
  supabase_delete,
  supabase_table_stats,
];
