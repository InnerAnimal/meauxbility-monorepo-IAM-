import { NextResponse } from 'next/server';
import { listWorkflows, findWorkflowsByTag } from '@/lib/workflows/registry';

/**
 * GET /api/workflows/list
 *
 * List all available workflows or filter by tag
 *
 * Query params:
 * - tag: Filter by tag (optional)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    const workflows = tag
      ? findWorkflowsByTag(tag)
      : listWorkflows();

    return NextResponse.json({
      success: true,
      workflows: workflows.map((w) => ({
        id: w.id,
        name: w.name,
        description: w.description,
        version: w.version,
        tags: w.tags,
      })),
    });
  } catch (error) {
    console.error('Error listing workflows:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
