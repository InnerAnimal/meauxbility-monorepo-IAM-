# MCP Server Setup Guide

## Quick Start

```bash
# 1. Navigate to MCP server directory
cd mcp-server

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 4. Load environment from parent
source ../env.sh

# 5. Start MCP server
npm start

# Or start dashboard
npm run dashboard
```

## Adding to Claude Desktop

### Option 1: Add to Claude Desktop Config

Edit `~/.claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "meauxbility": {
      "command": "node",
      "args": ["/path/to/meauxbility-monorepo-IAM-/mcp-server/src/index.js"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your_token",
        "VERCEL_TOKEN": "your_token",
        "GITHUB_TOKEN": "your_token",
        "SUPABASE_URL": "your_url",
        "SUPABASE_SERVICE_ROLE_KEY": "your_key",
        "RENDER_API_KEY": "your_key",
        "ADMIN_SECRET": "your_secret"
      }
    }
  }
}
```

### Option 2: Add via Claude MCP Command

```bash
claude mcp add --transport stdio meauxbility \
  --command "node" \
  --args "/path/to/mcp-server/src/index.js"
```

## Environment Variables from env.sh

The parent directory has an `env.sh` file with all credentials. To use it:

```bash
# Source the env file
source ../env.sh

# Then start the MCP server
npm start
```

This will load:
- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID
- VERCEL_TOKEN
- RENDER_API_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- And all other configured credentials

## Testing the Server

### 1. Test Health Check

```bash
npm run health
```

Should output infrastructure status and exit with code 0 if healthy.

### 2. Test Dashboard

```bash
npm run dashboard
```

Visit http://localhost:4000 - should show real-time infrastructure status.

### 3. Test MCP Tools

With Claude Desktop or Claude CLI:

```
Use the finish_project tool to audit infrastructure
```

## Using the Orchestrator

The main orchestrator tool is `finish_project`:

```javascript
{
  "tool": "finish_project",
  "input": {
    "confirm": true,
    "planOnly": true  // Set to false for automated fixes (future)
  }
}
```

This will:
1. Check environment variables
2. Audit all project configurations
3. Verify DNS settings
4. Run health checks on all services
5. Verify deployments
6. Generate recommendations

## Common Tasks

### Deploy Inner Animal Media

```javascript
{
  "tool": "vercel_deploy",
  "input": {
    "projectId": "prj_xxx",
    "gitSource": {
      "type": "github",
      "repoId": "InnerAnimal/meauxbility-monorepo-IAM-",
      "ref": "main"
    }
  }
}
```

### Configure DNS for New Domain

```javascript
{
  "tool": "cf_point_to_vercel",
  "input": {
    "zoneId": "your_zone_id",
    "domain": "inneranimalmedia.com"
  }
}
```

### Check Service Health

```javascript
{
  "tool": "finish_project",
  "input": {
    "confirm": true,
    "planOnly": true
  }
}
```

### Query Supabase Table

```javascript
{
  "tool": "supabase_query",
  "input": {
    "table": "grants",
    "select": "*",
    "limit": 10
  }
}
```

## Troubleshooting

### "ADMIN_SECRET not configured"

Set the ADMIN_SECRET environment variable:

```bash
export ADMIN_SECRET="your-secret-here"
```

Or add to `.env` file.

### "Token not set" errors

Make sure all required tokens are in your environment:

```bash
source ../env.sh
npm start
```

### Dashboard not loading

1. Check port 4000 is not in use
2. Verify WebSocket connection
3. Check browser console for errors

### MCP tools not appearing in Claude

1. Verify claude_desktop_config.json is valid JSON
2. Restart Claude Desktop
3. Check MCP server logs for errors

## Next Steps

1. Configure all environment variables
2. Test with `npm run health`
3. Verify dashboard works
4. Add to Claude Desktop
5. Run `finish_project` to audit infrastructure
6. Follow recommendations to finalize setup

## Production Deployment

### Run Full Audit

```bash
# Set admin credentials
export ADMIN_SECRET="your-prod-secret"

# Source all credentials
source ../env.sh

# Run orchestrator
npm start
```

Then in Claude:
```
Run finish_project with confirm true and planOnly true
```

Review the output and follow all recommendations before going live.

## Support

For issues or questions:
- Check logs in terminal where server is running
- Review error messages carefully
- Verify all credentials are correct
- Test individual tools before using orchestrator

---

**Ready to orchestrate your infrastructure! 🚀**
