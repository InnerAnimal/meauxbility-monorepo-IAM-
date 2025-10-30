# 🌐 Meauxbility Edge Functions

Cloudflare Workers providing edge caching and API optimization for Meauxbility Foundation applications.

---

## 🎯 Overview

This directory contains Cloudflare Workers that integrate with your Vercel-deployed applications to provide:

- **Edge Caching** - KV-based caching for API responses
- **Performance** - Serve cached data from 300+ global edge locations
- **Reliability** - Reduce load on your Vercel functions
- **Flexibility** - Easy integration with existing APIs

---

## 📋 Prerequisites

1. **Cloudflare Account** - Free tier works great
2. **KV Namespace** - Already configured: `5a156c2799884edd9490c09cedcda117`
3. **Wrangler CLI** - Cloudflare's deployment tool

---

## 🚀 Quick Start

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler

# Or using your package manager
pnpm add -g wrangler
```

### Step 2: Authenticate with Cloudflare

```bash
wrangler login
```

This will open your browser to authenticate.

### Step 3: Configure Environment Variables

Edit your `.env.sh` in the root directory:

```bash
# Cloudflare Configuration
export CLOUDFLARE_API_TOKEN="your_cloudflare_api_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
export CLOUDFLARE_KV_NAMESPACE_ID="5a156c2799884edd9490c09cedcda117"
```

### Step 4: Install Dependencies

```bash
cd workers
npm install
```

### Step 5: Deploy

```bash
# Deploy to production
npm run deploy:production

# Or deploy to staging first
npm run deploy:staging
```

---

## 🔧 Configuration

### Wrangler Configuration (`wrangler.toml`)

The worker is already configured with your KV namespace:

```toml
kv_namespaces = [
    { binding = "KV_BINDING", id = "5a156c2799884edd9490c09cedcda117" }
]
```

### Environment Variables

Set these in your Cloudflare Worker dashboard or via `wrangler.toml`:

- `VERCEL_MEAUX_URL` - Your meauxbility.org URL
- `VERCEL_ADMIN_URL` - Your admin portal URL
- `VERCEL_SHOP_URL` - Your shop URL

---

## 📡 API Endpoints

### Health Check

```bash
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "environment": "production",
  "services": {
    "meauxbility": "https://meauxbility.org",
    "admin": "https://iaudodidact.com",
    "shop": "https://inneranimals.com"
  },
  "kv": "connected",
  "timestamp": "2024-10-30T12:00:00.000Z"
}
```

### Get Cached Value

```bash
GET /api/cache/get?key=mykey
```

**Response:**
```json
{
  "success": true,
  "key": "mykey",
  "value": { "data": "cached data" },
  "cached_at": "2024-10-30T12:00:00.000Z"
}
```

### Set Cached Value

```bash
POST /api/cache/set
Content-Type: application/json

{
  "key": "mykey",
  "value": { "data": "some data" },
  "ttl": 3600
}
```

**Response:**
```json
{
  "success": true,
  "key": "mykey",
  "message": "Value cached successfully",
  "expires": "3600 seconds"
}
```

### Delete Cached Value

```bash
DELETE /api/cache/delete?key=mykey
```

**Response:**
```json
{
  "success": true,
  "key": "mykey",
  "message": "Value deleted from cache"
}
```

---

## 💡 Use Cases

### 1. Cache Grant Applications

```typescript
// In your Next.js API route
export async function GET(request: Request) {
  const cacheKey = 'grants:pending';

  // Try to get from edge cache first
  const cached = await fetch(
    `https://your-worker.workers.dev/api/cache/get?key=${cacheKey}`
  );

  if (cached.ok) {
    const data = await cached.json();
    return Response.json(data.value);
  }

  // If not cached, fetch from Supabase
  const grants = await supabase.from('grants').select('*');

  // Cache for 5 minutes
  await fetch('https://your-worker.workers.dev/api/cache/set', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key: cacheKey,
      value: grants.data,
      ttl: 300 // 5 minutes
    })
  });

  return Response.json(grants.data);
}
```

### 2. Cache Product Catalog

```typescript
// Cache all products for 1 hour
const products = await fetchProducts();

await fetch('https://your-worker.workers.dev/api/cache/set', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    key: 'products:all',
    value: products,
    ttl: 3600 // 1 hour
  })
});
```

### 3. Session Storage

```typescript
// Store user sessions at the edge
await fetch('https://your-worker.workers.dev/api/cache/set', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    key: `session:${userId}`,
    value: sessionData,
    ttl: 86400 // 24 hours
  })
});
```

---

## 🛠️ Development

### Run Locally

```bash
npm run dev
```

This starts a local server at `http://localhost:8787`

### Test API Endpoints

```bash
# Health check
curl http://localhost:8787/api/health

# Set a value
curl -X POST http://localhost:8787/api/cache/set \
  -H "Content-Type: application/json" \
  -d '{"key":"test","value":"hello world","ttl":60}'

# Get a value
curl http://localhost:8787/api/cache/get?key=test

# Delete a value
curl -X DELETE http://localhost:8787/api/cache/delete?key=test
```

### View Logs

```bash
npm run tail
```

---

## 📊 Monitoring

### View KV Namespace Contents

```bash
# List all keys
wrangler kv:key list --binding=KV_BINDING

# Get a specific value
npm run kv:get -- "mykey"

# Put a value
npm run kv:put -- "mykey" "myvalue"

# Delete a key
npm run kv:delete -- "mykey"
```

### Check Worker Stats

Go to: https://dash.cloudflare.com → Workers & Pages → Your Worker → Analytics

---

## 🔒 Security

### CORS Configuration

The worker includes CORS headers for cross-origin requests:

```typescript
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type'
```

### Rate Limiting

To add rate limiting, extend the worker with Cloudflare's rate limiting API:

```typescript
// Example: Limit to 100 requests per minute
const rateLimit = await env.RATE_LIMITER.limit({ key: clientIP });

if (!rateLimit.success) {
  return new Response('Rate limit exceeded', { status: 429 });
}
```

---

## 📦 Deployment

### Deploy to Production

```bash
npm run deploy:production
```

### Deploy to Staging

```bash
npm run deploy:staging
```

### Set Environment Variables

```bash
# Via CLI
wrangler secret put CLOUDFLARE_API_TOKEN

# Or in Cloudflare dashboard
# Workers & Pages → Your Worker → Settings → Variables
```

---

## 🌍 Integration with Vercel Apps

### In Your Next.js Applications

Create a utility file: `lib/edge-cache.ts`

```typescript
const WORKER_URL = process.env.NEXT_PUBLIC_EDGE_WORKER_URL;

export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const response = await fetch(`${WORKER_URL}/api/cache/get?key=${key}`);
    if (!response.ok) return null;

    const data = await response.json();
    return data.value as T;
  } catch {
    return null;
  }
}

export async function setInCache<T>(
  key: string,
  value: T,
  ttl?: number
): Promise<boolean> {
  try {
    const response = await fetch(`${WORKER_URL}/api/cache/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value, ttl })
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function deleteFromCache(key: string): Promise<boolean> {
  try {
    const response = await fetch(`${WORKER_URL}/api/cache/delete?key=${key}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch {
    return false;
  }
}
```

---

## 🎯 Next Steps

1. **Deploy the Worker**
   ```bash
   cd workers && npm install && npm run deploy:production
   ```

2. **Get Your Worker URL**
   After deployment, you'll get a URL like:
   `https://meauxbility-edge-functions.your-subdomain.workers.dev`

3. **Add to Vercel Environment Variables**
   ```bash
   NEXT_PUBLIC_EDGE_WORKER_URL=https://meauxbility-edge-functions.your-subdomain.workers.dev
   ```

4. **Start Caching**
   Use the edge cache in your API routes for better performance!

---

## 📚 Resources

- **Cloudflare Workers Docs**: https://developers.cloudflare.com/workers/
- **KV Storage Docs**: https://developers.cloudflare.com/kv/
- **Wrangler CLI Docs**: https://developers.cloudflare.com/workers/wrangler/
- **Pricing**: https://www.cloudflare.com/plans/developer-platform/

---

## 🆘 Troubleshooting

### "KV namespace not found"

Make sure your namespace ID is correct in `wrangler.toml`:
```toml
kv_namespaces = [
    { binding = "KV_BINDING", id = "5a156c2799884edd9490c09cedcda117" }
]
```

### "Authentication required"

Run `wrangler login` again to re-authenticate.

### "Worker not receiving requests"

Check your routes in `wrangler.toml` or configure routes in the Cloudflare dashboard.

---

**Created:** October 30, 2024
**Status:** Ready for Deployment
**KV Namespace ID:** `5a156c2799884edd9490c09cedcda117`
