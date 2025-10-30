# Meauxbility API Worker

Cloudflare Worker for Meauxbility Foundation API with KV storage.

## Configuration

### KV Namespace Binding
- **Binding Name**: `KV_BINDING`
- **Namespace ID**: `5a156c2799884edd9490c09cedcda117`
- **Account ID (CRAZY_CONNECTED)**: `e8d0359c2ad85845814f446f4dd174ea`

### API Endpoints

#### Health Check
```bash
GET /health
```
Returns service health status.

#### Initialize CRAZY_CONNECTED Key
```bash
GET /kv/init
```
Stores the CRAZY_CONNECTED key in KV storage.

#### Get CRAZY_CONNECTED Key
```bash
GET /kv/crazy-connected
```
Retrieves the CRAZY_CONNECTED value.

#### List All Keys
```bash
GET /kv/list
```
Lists all keys in the KV namespace.

#### Get Any Key
```bash
GET /kv/{key}
```
Retrieves any key from KV storage.

#### Set Key-Value
```bash
POST /kv/{key}
Content-Type: application/json

{
  "value": "your_value_here"
}
```
Stores a key-value pair.

#### Delete Key
```bash
DELETE /kv/{key}
```
Deletes a key from KV storage.

## Local Development

1. Install dependencies:
```bash
cd workers/meauxbility-api
npm install
```

2. Run locally:
```bash
npm run dev
```

3. Test endpoints:
```bash
# Health check
curl http://localhost:8787/health

# Initialize CRAZY_CONNECTED
curl http://localhost:8787/kv/init

# Get CRAZY_CONNECTED
curl http://localhost:8787/kv/crazy-connected

# List all keys
curl http://localhost:8787/kv/list
```

## Deployment

### Deploy to Production
```bash
npm run deploy:production
```

Or using wrangler directly:
```bash
wrangler deploy --env production
```

### Deploy to Development
```bash
npm run deploy
```

## Environment Variables

These are configured in `wrangler.toml`:
- Account ID: `e8d0359c2ad85845814f446f4dd174ea`
- KV Namespace ID: `5a156c2799884edd9490c09cedcda117`
- Worker URL: `https://meauxbility-api.meauxbility.workers.dev`

## Testing After Deployment

```bash
# Test production endpoint
curl https://meauxbility-api.meauxbility.workers.dev/health

# Initialize CRAZY_CONNECTED in production
curl https://meauxbility-api.meauxbility.workers.dev/kv/init

# Get CRAZY_CONNECTED from production
curl https://meauxbility-api.meauxbility.workers.dev/kv/crazy-connected
```

## CORS

All endpoints support CORS with:
- Origin: `*` (all origins allowed)
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization

## Error Handling

All errors return JSON with:
```json
{
  "error": "error message"
}
```

## Live URL

Once deployed: `https://meauxbility-api.meauxbility.workers.dev`
