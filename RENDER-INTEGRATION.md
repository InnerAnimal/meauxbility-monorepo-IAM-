# Render.com Integration & MCP Setup

## Render API Key Saved ✅

**API Key**: `rnd_fyr9ywA3eCzmO9dr704VNRvif6eX`
**Saved as**:
- `RENDER_API_KEY`
- `RENDERFUCKINGWORKPRODUCTION`

These are now in `env.sh` (gitignored for security).

## Setting Up Render MCP Server

The Model Context Protocol (MCP) allows Claude to interact with Render.com directly.

### Step 1: Add MCP Server to Claude CLI

Run this command in your terminal (NOT in this session):

```bash
claude mcp add --transport http render https://mcp.render.com/mcp \
  --header "Authorization: Bearer rnd_fyr9ywA3eCzmO9dr704VNRvif6eX"
```

This will:
- Add Render as an MCP server
- Authenticate using your API key
- Allow Claude to manage Render deployments

### Step 2: Verify MCP Connection

```bash
claude mcp list
```

You should see "render" in the list of available MCP servers.

### Step 3: Using Render MCP

Once configured, you can ask me to:
- Deploy services to Render
- Check deployment status
- View logs
- Manage environment variables
- Scale services

## Render Deployment Options

### Option 1: Deploy via MCP (After MCP setup)

Simply ask me in a future session:
```
"Deploy the Inner Animals shop to Render"
"Check Render deployment status"
"View Render logs for meauxbility-api"
```

### Option 2: Deploy via Render Dashboard

1. Go to: https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo: `InnerAnimal/meauxbility-monorepo-IAM-`
4. Configure:
   - **Name**: `inneranimals-shop` (or `meauxbility-org`, `admin-portal`)
   - **Root Directory**: `apps/inneranimals-shop`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Add all variables from `env.sh`

### Option 3: Deploy via Render CLI

Install Render CLI:
```bash
brew install render
# or
curl -fsSL https://render.com/install | bash
```

Login:
```bash
render login --api-key rnd_fyr9ywA3eCzmO9dr704VNRvif6eX
```

Deploy:
```bash
render deploy
```

## Render Environment Variables

When deploying to Render, you'll need to set these in the dashboard:

### For All Apps:
```
NEXT_PUBLIC_SUPABASE_URL=https://ghiulqoqujsiofsjcrqk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[from env.sh]
NODE_ENV=production
```

### For Inner Animals Shop:
```
NEXT_PUBLIC_APP_URL=https://inneranimals.com
STRIPE_PUBLISHABLE_KEY=[your stripe key]
STRIPE_SECRET_KEY=[your stripe secret]
STRIPE_WEBHOOK_SECRET=[your webhook secret]
```

### For Admin Portal:
```
NEXT_PUBLIC_APP_URL=https://iaudodidact.com
SUPABASE_SERVICE_ROLE_KEY=[from env.sh]
GITHUB_TOKEN=[if needed]
OPENAI_API_KEY=[if needed]
ANTHROPIC_API_KEY=[if needed]
```

## Quick Deploy Commands

Once MCP is configured, you can use these commands in future Claude sessions:

```
"Deploy meauxbility-org to Render"
"Check render deployment status for inneranimals-shop"
"Show render logs for admin-portal"
"List all render services"
"Update environment variables on render"
```

## Render vs Vercel vs Cloudflare

**Vercel** (Current - Recommended for Next.js):
- ✅ Best for Next.js apps
- ✅ Already deployed
- ✅ Custom domains configured

**Render**:
- Good for full-stack apps
- Docker support
- Database hosting
- Background workers

**Cloudflare Workers** (Current - API):
- ✅ Already deployed
- ✅ Serverless functions
- ✅ KV storage active

## Current Recommendation

**Keep Vercel for the three main apps:**
- meauxbility.org
- iaudodidact.com
- inneranimals.com

**Use Cloudflare Workers for:**
- API endpoints (already deployed ✅)

**Use Render for:**
- Backend services (if needed later)
- Database hosting
- Background jobs

## Testing Render API

Test your API key:
```bash
curl -H "Authorization: Bearer rnd_fyr9ywA3eCzmO9dr704VNRvif6eX" \
  https://api.render.com/v1/services
```

## Next Steps

1. ✅ API key saved to env.sh
2. Run the MCP add command in your terminal
3. Verify MCP connection with `claude mcp list`
4. Start using Render commands with Claude!

---

**Your Render API key is secured in env.sh and ready to use! 🚀**
