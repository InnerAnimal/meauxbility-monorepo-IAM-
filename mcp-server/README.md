# Meauxbility Internal MCP Server

Complete Model Context Protocol server for managing and orchestrating the Meauxbility Foundation infrastructure.

## Features

### Provider Integrations

- **Cloudflare**: DNS management, Workers deployment, KV storage
- **Vercel**: Project management, deployments, domain configuration
- **Supabase**: Database operations (CRUD)
- **Render**: Service management and deployments
- **GitHub**: Pull requests and repository management
- **Stripe**: Product and payment management
- **GA4**: Analytics event tracking
- **WhatsApp**: Message sending via Meta Cloud API
- **OpenAI**: Text generation

### Orchestration

The `finish_project` tool provides comprehensive infrastructure auditing:

- Environment variable verification
- Project configuration audit
- DNS verification
- Health checks across all services
- Deployment verification
- Automated recommendations

### Dashboard

Real-time monitoring dashboard with WebSocket updates:
- Service health visualization
- Project status tracking
- DNS configuration status
- Automatic recommendations

## Installation

```bash
cd mcp-server
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `CLOUDFLARE_API_TOKEN`
- `VERCEL_TOKEN`
- `GITHUB_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RENDER_API_KEY`
- `ADMIN_SECRET`

Optional (for extra tools):
- `STRIPE_API_KEY`
- `GA4_PROPERTY_ID`, `GA4_API_SECRET`
- `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`
- `OPENAI_API_KEY`

## Usage

### Start MCP Server

```bash
npm start
```

The server runs in stdio mode for use with Claude or other MCP clients.

### Start Dashboard

```bash
npm run dashboard
```

Visit: http://localhost:4000

### Run Health Check

```bash
npm run health
```

## Available Tools

### Cloudflare
- `cf_list_dns_records` - List DNS records
- `cf_upsert_dns_record` - Create/update DNS record (admin)
- `cf_point_to_vercel` - Configure DNS for Vercel (admin)
- `cf_list_workers` - List Workers
- `cf_deploy_worker` - Deploy Worker (admin)
- `cf_get_kv` - Get KV value
- `cf_set_kv` - Set KV value (admin)

### Vercel
- `vercel_projects_list` - List projects
- `vercel_project_get` - Get project details
- `vercel_deployments_list` - List deployments
- `vercel_deploy` - Trigger deployment (admin)
- `vercel_link_domain` - Add custom domain (admin)
- `vercel_domains_list` - List domains
- `vercel_env_get` - Get environment variables
- `vercel_env_set` - Set environment variable (admin)

### Supabase
- `supabase_query` - Query table
- `supabase_insert` - Insert row (admin)
- `supabase_update` - Update rows (admin)
- `supabase_delete` - Delete rows (admin)
- `supabase_table_stats` - Get table statistics

### Render
- `render_services_list` - List services
- `render_service_get` - Get service details
- `render_deploys_list` - List deploys
- `render_deploy_trigger` - Trigger deploy (admin)
- `render_env_get` - Get environment variables
- `render_env_set` - Set environment variable (admin)

### Extra Tools
- `github_open_pr` - Create GitHub pull request (admin)
- `stripe_list_products` - List Stripe products
- `ga4_send_event` - Send GA4 analytics event
- `whatsapp_send_message` - Send WhatsApp message (admin)
- `openai_generate` - Generate text with OpenAI

### Orchestrator
- `finish_project` - Complete infrastructure audit and orchestration (admin)

## Orchestrator Details

The `finish_project` tool performs:

1. **Environment Check**: Verifies all required environment variables
2. **Project Audit**: Checks configuration of all projects
3. **DNS Verification**: Tests DNS resolution for all domains
4. **Health Checks**: Pings all service endpoints
5. **Deployment Verification**: Confirms latest deployments are accessible
6. **Recommendations**: Generates actionable recommendations

### Usage Example

```json
{
  "tool": "finish_project",
  "input": {
    "confirm": true,
    "planOnly": true
  }
}
```

Set `planOnly: false` to enable automated fixes (future feature).

## Dashboard Features

- **Real-time Updates**: WebSocket connection for live status
- **Health Visualization**: Color-coded status indicators
- **Project Overview**: All projects at a glance
- **DNS Status**: Domain configuration verification
- **Recommendations**: Actionable items for improvements

## Security

- Admin-only tools require `ADMIN_SECRET` authentication
- Read-only tools are available without admin rights
- All API credentials stored in environment variables
- No credentials logged or exposed

## Development

### Add New Provider

1. Create file in `src/providers/`
2. Define tools with schema and handlers
3. Export tools array
4. Import and register in `src/index.js`

### Add New Tool

```javascript
const my_tool = {
  name: 'my_tool',
  description: 'What the tool does',
  inputSchema: z.object({
    param: z.string(),
  }).strip(),
  async handler({ input, context }) {
    // Tool logic
    return { content: [{ type: 'text', text: 'result' }] };
  },
};
```

## Configuration

Edit `src/config.js` to update:
- Project details
- Domain mappings
- Health check endpoints
- Service configurations

## Projects Configured

- **meauxbility-org**: Main nonprofit site (meauxbility.org)
- **admin-portal-production**: Admin dashboard (iaudodidact.com)
- **inneranimals-shop**: E-commerce shop (inneranimals.com)
- **inneranimalmedia**: Media platform (inneranimalmedia.com)

## Health Check Endpoints

- Meauxbility.org
- Admin Portal (iaudodidact.com)
- Inner Animals Shop (inneranimals.com)
- Cloudflare Worker API
- Render Service

## Troubleshooting

### MCP Server won't start
- Check all required environment variables are set
- Verify `.env` file exists and is readable
- Check for port conflicts (dashboard uses 4000)

### Tools failing
- Verify API tokens are valid and not expired
- Check token permissions match required scopes
- Review error messages for specific issues

### Dashboard not connecting
- Ensure dashboard server is running (`npm run dashboard`)
- Check firewall isn't blocking port 4000
- Verify WebSocket connection in browser console

## License

ISC

## Support

Part of the Meauxbility Foundation
Lafayette, Louisiana
501(c)(3) EIN: 33-4214907
