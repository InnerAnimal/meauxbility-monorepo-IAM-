import { NextRequest, NextResponse } from 'next/server';
import { coordinateWorkflow } from '@/lib/workflows/agent-communication';
import { z } from 'zod';

const WorkflowCoordinationSchema = z.object({
  id: z.string(),
  name: z.string(),
  agents: z.array(z.string()),
  tasks: z.array(
    z.object({
      agent: z.string(),
      task: z.string(),
    })
  ),
});

/**
 * POST /api/agents/coordinate
 *
 * Coordinate a multi-agent workflow
 *
 * Request body:
 * {
 *   "id": "deploy-workflow-123",
 *   "name": "Deploy Application Workflow",
 *   "agents": ["github-agent", "vercel-agent", "notification-agent"],
 *   "tasks": [
 *     { "agent": "github-agent", "task": "Create pull request" },
 *     { "agent": "vercel-agent", "task": "Deploy preview" },
 *     { "agent": "notification-agent", "task": "Send status update" }
 *   ]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate coordination request
    const validationResult = WorkflowCoordinationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid coordination request',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const workflow = validationResult.data;

    // Coordinate workflow
    const result = await coordinateWorkflow(workflow, {
      requestId: `coord-${Date.now()}`,
      agentId: 'coordinator',
      metadata: {
        ip: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Workflow coordination error:', error);
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
 * GET /api/agents/coordinate
 *
 * Get information about the coordination endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/agents/coordinate',
    method: 'POST',
    description: 'Coordinate multi-agent workflows with intelligent task ordering',
    requestBody: {
      id: 'string (required) - unique workflow ID',
      name: 'string (required) - workflow name',
      agents: 'string[] (required) - list of agent IDs',
      tasks: 'object[] (required) - list of tasks with agent assignments',
    },
    example: {
      id: 'deploy-workflow-123',
      name: 'Deploy Application Workflow',
      agents: ['github-agent', 'vercel-agent', 'notification-agent'],
      tasks: [
        { agent: 'github-agent', task: 'Create pull request' },
        { agent: 'vercel-agent', task: 'Deploy preview' },
        { agent: 'notification-agent', task: 'Send status update' },
      ],
    },
  });
}
