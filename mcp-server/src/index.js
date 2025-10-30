#!/usr/bin/env node

import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { requireAdmin } from './auth.js';
import { cloudflareTools } from './providers/cloudflare.js';
import { vercelTools } from './providers/vercel.js';
import { supabaseTools } from './providers/supabase.js';
import { renderTools } from './providers/render.js';
import { extraTools } from './providers/extra.js';
import { stubTools } from './providers/stubs.js';
import { Orchestrator } from './orchestrator.js';

console.error('🎯 Starting Meauxbility Internal MCP Server...');

const server = new Server(
  {
    name: 'meaux-internal-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

function registerTools() {
  console.error('📦 Registering tools...');

  // Cloudflare tools
  for (const tool of cloudflareTools) {
    server.setRequestHandler('tools/call', tool);
    console.error(`  ✓ Cloudflare: ${tool.name}`);
  }

  // Vercel tools
  for (const tool of vercelTools) {
    server.setRequestHandler('tools/call', tool);
    console.error(`  ✓ Vercel: ${tool.name}`);
  }

  // Supabase tools
  for (const tool of supabaseTools) {
    server.setRequestHandler('tools/call', tool);
    console.error(`  ✓ Supabase: ${tool.name}`);
  }

  // Render tools
  for (const tool of renderTools) {
    server.setRequestHandler('tools/call', tool);
    console.error(`  ✓ Render: ${tool.name}`);
  }

  // Extra tools (GitHub, Stripe, GA4, WhatsApp, OpenAI)
  for (const tool of extraTools) {
    server.setRequestHandler('tools/call', tool);
    console.error(`  ✓ Extra: ${tool.name}`);
  }

  // Stub tools
  for (const tool of stubTools) {
    server.setRequestHandler('tools/call', tool);
    console.error(`  ✓ Stub: ${tool.name}`);
  }

  // Orchestrator: finish_project
  server.setRequestHandler('tools/call', {
    name: 'finish_project',
    description: 'Audit infrastructure, verify deployments, check health, and provide recommendations for production readiness',
    inputSchema: z
      .object({
        confirm: z.boolean().describe('Must be true to execute (even in plan-only mode)'),
        planOnly: z.boolean().optional().default(true).describe('If true, only audits and reports. If false, can trigger fixes.'),
      })
      .strip(),
    async handler({ input, context }) {
      requireAdmin(context);

      if (!input.confirm) {
        return {
          content: [{
            type: 'text',
            text: '❌ Refused: confirm must be true to run orchestrator.',
          }],
        };
      }

      try {
        const orchestrator = new Orchestrator();
        const summary = await orchestrator.run({ planOnly: input.planOnly });

        return {
          content: [{
            type: 'text',
            text: `
🎯 Meauxbility Infrastructure Report
====================================

Status: ${summary.status}
Started: ${summary.startTime}
Completed: ${summary.endTime}
Mode: ${summary.planOnly ? 'PLAN ONLY' : 'EXECUTE'}

Environment Variables:
${summary.environmentVars.map(e => `  ${e.configured ? '✓' : '✗'} ${e.key}`).join('\n')}

Projects:
${summary.projectAudit.map(p => `  ${p.status === 'ready' ? '✓' : '⚠'} ${p.name} - ${p.issues.length} issues`).join('\n')}

DNS Verification:
${summary.dnsVerification.map(d => `  ${d.status === 'configured' ? '✓' : '✗'} ${d.domain}`).join('\n')}

Health Checks:
${summary.healthChecks.map(h => `  ${h.status === 'healthy' ? '✓' : '✗'} ${h.name} (${h.responseTime || 'N/A'}ms)`).join('\n')}

Deployments:
${summary.deploymentVerification.map(d => `  ${d.status === 'deployed' ? '✓' : '✗'} ${d.project}`).join('\n')}

${summary.recommendations.length > 0 ? `
Recommendations:
${summary.recommendations.map((rec, i) => `  ${i + 1}. ${rec}`).join('\n')}
` : '✅ No issues found - infrastructure is production ready!'}

====================================
            `,
          }, {
            type: 'json',
            json: summary,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `❌ Orchestration failed: ${error.message}\n\n${error.stack}`,
          }],
        };
      }
    },
  });

  console.error(`  ✓ Orchestrator: finish_project`);
  console.error(`\n✅ Total tools registered: ${
    cloudflareTools.length +
    vercelTools.length +
    supabaseTools.length +
    renderTools.length +
    extraTools.length +
    stubTools.length +
    1 // orchestrator
  }`);
}

// Register all tools
registerTools();

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);

console.error('✅ MCP Server is ready and listening on stdio');
console.error('💡 Use finish_project tool to audit and orchestrate deployments');
