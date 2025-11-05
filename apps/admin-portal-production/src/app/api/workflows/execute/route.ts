import { NextRequest, NextResponse } from 'next/server';
import { executeWorkflow, getWorkflow } from '@/lib/workflows/registry';

/**
 * POST /api/workflows/execute
 *
 * Execute a workflow by ID with provided input
 *
 * Request body:
 * {
 *   "workflowId": "grant-eligibility",
 *   "input": { ... }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workflowId, input } = body;

    if (!workflowId) {
      return NextResponse.json(
        { error: 'workflowId is required' },
        { status: 400 }
      );
    }

    if (!input) {
      return NextResponse.json(
        { error: 'input is required' },
        { status: 400 }
      );
    }

    // Verify workflow exists
    const workflow = getWorkflow(workflowId);
    if (!workflow) {
      return NextResponse.json(
        { error: `Workflow '${workflowId}' not found` },
        { status: 404 }
      );
    }

    // Execute workflow
    const result = await executeWorkflow(workflowId, input);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Workflow execution error:', error);
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
 * GET /api/workflows/execute
 *
 * Get information about workflow execution endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/workflows/execute',
    method: 'POST',
    description: 'Execute a workflow by ID',
    requestBody: {
      workflowId: 'string (required)',
      input: 'object (required)',
    },
    example: {
      workflowId: 'grant-eligibility',
      input: {
        applicantName: 'Example Org',
        organizationType: 'nonprofit',
        location: 'USA',
        projectDescription: 'Community health program',
        fundingAmount: 50000,
        purpose: 'healthcare',
      },
    },
  });
}
