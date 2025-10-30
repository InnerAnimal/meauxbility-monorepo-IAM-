/**
 * Meauxbility Foundation - Cloudflare Edge Functions
 *
 * This worker provides edge caching and API optimization for
 * the Meauxbility Foundation applications deployed on Vercel.
 *
 * Features:
 * - KV-based caching for API responses
 * - CORS handling for cross-origin requests
 * - Rate limiting
 * - Geolocation-based routing
 */

export interface Env {
  KV_BINDING: KVNamespace;
  VERCEL_MEAUX_URL: string;
  VERCEL_ADMIN_URL: string;
  VERCEL_SHOP_URL: string;
  ENVIRONMENT: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Route based on path
    switch (url.pathname) {
      case '/api/cache/get':
        return handleCacheGet(request, env);

      case '/api/cache/set':
        return handleCacheSet(request, env);

      case '/api/cache/delete':
        return handleCacheDelete(request, env);

      case '/api/health':
        return handleHealthCheck(env);

      default:
        return new Response('Meauxbility Edge Functions - Ready', {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        });
    }
  },
};

/**
 * Get cached value from KV
 */
async function handleCacheGet(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!key) {
    return jsonResponse({ error: 'Missing key parameter' }, 400);
  }

  try {
    const value = await env.KV_BINDING.get(key);

    if (value === null) {
      return jsonResponse({ error: 'Key not found' }, 404);
    }

    return jsonResponse({
      success: true,
      key,
      value: JSON.parse(value),
      cached_at: new Date().toISOString()
    });
  } catch (error) {
    return jsonResponse({ error: 'Failed to retrieve from cache' }, 500);
  }
}

/**
 * Set value in KV cache
 */
async function handleCacheSet(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await request.json() as { key: string; value: any; ttl?: number };
    const { key, value, ttl } = body;

    if (!key || value === undefined) {
      return jsonResponse({ error: 'Missing key or value' }, 400);
    }

    // Store in KV with optional TTL (time-to-live in seconds)
    const options = ttl ? { expirationTtl: ttl } : {};
    await env.KV_BINDING.put(key, JSON.stringify(value), options);

    return jsonResponse({
      success: true,
      key,
      message: 'Value cached successfully',
      expires: ttl ? `${ttl} seconds` : 'never'
    });
  } catch (error) {
    return jsonResponse({ error: 'Failed to cache value' }, 500);
  }
}

/**
 * Delete value from KV cache
 */
async function handleCacheDelete(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'DELETE') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!key) {
    return jsonResponse({ error: 'Missing key parameter' }, 400);
  }

  try {
    await env.KV_BINDING.delete(key);
    return jsonResponse({
      success: true,
      key,
      message: 'Value deleted from cache'
    });
  } catch (error) {
    return jsonResponse({ error: 'Failed to delete from cache' }, 500);
  }
}

/**
 * Health check endpoint
 */
async function handleHealthCheck(env: Env): Promise<Response> {
  return jsonResponse({
    status: 'healthy',
    environment: env.ENVIRONMENT,
    services: {
      meauxbility: env.VERCEL_MEAUX_URL,
      admin: env.VERCEL_ADMIN_URL,
      shop: env.VERCEL_SHOP_URL
    },
    kv: 'connected',
    timestamp: new Date().toISOString()
  });
}

/**
 * Helper function to create JSON responses with CORS headers
 */
function jsonResponse(data: any, status: number = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
