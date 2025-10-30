import { NextRequest, NextResponse } from 'next/server';
import {
  agentCommunicationWorkflow,
  getMessagesForAgent,
  broadcastMessage,
} from '@/lib/workflows/agent-communication';
import { AgentMessage, AgentMessageSchema } from '@/lib/workflows/types';

/**
 * POST /api/agents/message
 *
 * Send a message from one agent to another
 *
 * Request body: AgentMessage
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate message
    const validationResult = AgentMessageSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid message format',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const message: AgentMessage = validationResult.data;

    // Handle broadcast messages
    if (message.to === 'broadcast') {
      const broadcastResult = await broadcastMessage(
        message.from,
        message.payload
      );
      return NextResponse.json({
        success: true,
        message: broadcastResult,
      });
    }

    // Process message through workflow
    const result = await agentCommunicationWorkflow(message, {
      requestId: `req-${Date.now()}`,
      agentId: 'system',
      metadata: {
        ip: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Agent message error:', error);
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
 * GET /api/agents/message?agentId=xxx&limit=50
 *
 * Get messages for a specific agent
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    if (!agentId) {
      return NextResponse.json(
        { error: 'agentId query parameter is required' },
        { status: 400 }
      );
    }

    const messages = getMessagesForAgent(agentId, limit);

    return NextResponse.json({
      success: true,
      messages,
      count: messages.length,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
