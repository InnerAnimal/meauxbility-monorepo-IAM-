import { NextRequest, NextResponse } from 'next/server';
import { registerAgent, listAgents } from '@/lib/workflows/agent-communication';
import { z } from 'zod';

const AgentRegistrationSchema = z.object({
  id: z.string(),
  name: z.string(),
  capabilities: z.array(z.string()),
  endpoint: z.string().url().optional(),
});

/**
 * POST /api/agents/register
 *
 * Register a new agent in the system
 *
 * Request body:
 * {
 *   "id": "github-agent",
 *   "name": "GitHub Agent",
 *   "capabilities": ["pull-requests", "issues", "deployments"],
 *   "endpoint": "https://api.github.com/..." (optional)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate registration
    const validationResult = AgentRegistrationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid registration format',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const agent = validationResult.data;

    // Register agent
    registerAgent(agent);

    return NextResponse.json({
      success: true,
      message: `Agent '${agent.id}' registered successfully`,
      agent,
    });
  } catch (error) {
    console.error('Agent registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/agents/register
 *
 * List all registered agents
 */
export async function GET() {
  try {
    const agents = listAgents();

    return NextResponse.json({
      success: true,
      agents,
      count: agents.length,
    });
  } catch (error) {
    console.error('Error listing agents:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
