/**
 * Meauxbility API Worker
 * Handles API requests and KV storage operations
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Health check endpoint
      if (path === '/health') {
        return new Response(JSON.stringify({
          status: 'healthy',
          timestamp: Date.now(),
          service: 'meauxbility-api'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Store CRAZY_CONNECTED key
      if (path === '/kv/init') {
        await env.KV_BINDING.put('CRAZY_CONNECTED', 'e8d0359c2ad85845814f446f4dd174ea');
        return new Response(JSON.stringify({
          success: true,
          message: 'CRAZY_CONNECTED key initialized'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Get CRAZY_CONNECTED key
      if (path === '/kv/crazy-connected') {
        const value = await env.KV_BINDING.get('CRAZY_CONNECTED');
        return new Response(JSON.stringify({
          key: 'CRAZY_CONNECTED',
          value: value
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // List all keys
      if (path === '/kv/list') {
        const allKeys = await env.KV_BINDING.list();
        return new Response(JSON.stringify({
          keys: allKeys.keys
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Generic KV operations
      if (path.startsWith('/kv/')) {
        const key = path.replace('/kv/', '');

        if (request.method === 'GET') {
          const value = await env.KV_BINDING.get(key);
          return new Response(JSON.stringify({
            key: key,
            value: value
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        if (request.method === 'POST' || request.method === 'PUT') {
          const body = await request.json();
          await env.KV_BINDING.put(key, body.value);
          return new Response(JSON.stringify({
            success: true,
            key: key,
            value: body.value
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        if (request.method === 'DELETE') {
          await env.KV_BINDING.delete(key);
          return new Response(JSON.stringify({
            success: true,
            message: `Key '${key}' deleted`
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      // Default response
      return new Response(JSON.stringify({
        message: 'Meauxbility API Worker',
        endpoints: {
          health: '/health',
          init: '/kv/init',
          getCrazyConnected: '/kv/crazy-connected',
          list: '/kv/list',
          get: '/kv/{key}',
          set: 'POST /kv/{key}',
          delete: 'DELETE /kv/{key}'
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
