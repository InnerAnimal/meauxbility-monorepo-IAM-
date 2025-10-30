import { generateText, generateObject } from 'ai';
import { defaultModel } from '../ai/config';
import { AgentMessage, WorkflowContext, WorkflowResult } from './types';
import { z } from 'zod';

/**
 * Agent Communication System
 *
 * Enables efficient communication between AI agents (Vercel, GitHub, etc.)
 * with context awareness and intelligent routing.
 */

// Message queue (in production, use Redis or similar)
const messageQueue: AgentMessage[] = [];

// Agent registry
interface AgentRegistration {
  id: string;
  name: string;
  capabilities: string[];
  endpoint?: string;
  lastSeen: Date;
}

const registeredAgents = new Map<string, AgentRegistration>();

/**
 * Register an agent in the system
 */
export function registerAgent(agent: Omit<AgentRegistration, 'lastSeen'>) {
  registeredAgents.set(agent.id, {
    ...agent,
    lastSeen: new Date(),
  });
}

/**
 * Get all registered agents
 */
export function listAgents(): AgentRegistration[] {
  return Array.from(registeredAgents.values());
}

/**
 * Agent-to-Agent Communication Workflow
 */
export async function agentCommunicationWorkflow(
  message: AgentMessage,
  context: WorkflowContext
): Promise<WorkflowResult<AgentMessage>> {
  "use workflow";

  const startTime = Date.now();

  try {
    // Step 1: Validate message
    const validatedMessage = validateMessage(message);

    // Step 2: Route message to appropriate handler
    const routingDecision = await routeMessage(validatedMessage);

    // Step 3: Process message with AI if needed
    const response = await processMessage(validatedMessage, routingDecision, context);

    // Step 4: Store in message queue
    messageQueue.push(validatedMessage);
    if (response) {
      messageQueue.push(response);
    }

    return {
      success: true,
      data: response || undefined,
      metadata: {
        duration: Date.now() - startTime,
        steps: ['validate', 'route', 'process', 'store'],
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: {
        duration: Date.now() - startTime,
      },
    };
  }
}

/**
 * Validate agent message
 */
function validateMessage(message: AgentMessage): AgentMessage {
  // In production, add more validation
  if (!message.id || !message.from || !message.to) {
    throw new Error('Invalid message: missing required fields');
  }
  return message;
}

/**
 * Route message intelligently
 */
async function routeMessage(message: AgentMessage) {
  const { object } = await generateObject({
    model: defaultModel,
    schema: z.object({
      targetAgent: z.string(),
      priority: z.enum(['low', 'medium', 'high', 'urgent']),
      requiresAI: z.boolean(),
      suggestedAction: z.string(),
    }),
    messages: [
      {
        role: 'user',
        content: `Analyze this agent message and determine routing:

From: ${message.from}
To: ${message.to}
Type: ${message.type}
Payload: ${JSON.stringify(message.payload, null, 2)}

Available agents: ${Array.from(registeredAgents.keys()).join(', ')}

Determine:
1. Best target agent
2. Priority level
3. Whether AI processing is needed
4. Suggested action`,
      },
    ],
  });

  return object;
}

/**
 * Process message with AI
 */
async function processMessage(
  message: AgentMessage,
  routing: any,
  context: WorkflowContext
): Promise<AgentMessage | null> {
  // If message is just informational, no response needed
  if (message.type === 'event' && !routing.requiresAI) {
    return null;
  }

  // Generate AI response for requests
  if (message.type === 'request' || message.type === 'command') {
    const { text } = await generateText({
      model: defaultModel,
      messages: [
        {
          role: 'system',
          content: `You are an AI agent communication assistant. Your role is to help agents communicate effectively by:
1. Understanding requests and generating appropriate responses
2. Translating between different agent communication styles
3. Providing context and suggestions
4. Coordinating multi-agent workflows

Current context:
- Request ID: ${context.requestId}
- Agent ID: ${context.agentId}`,
        },
        {
          role: 'user',
          content: `Process this message and generate an appropriate response:

${JSON.stringify(message, null, 2)}

Routing suggestion: ${routing.suggestedAction}`,
        },
      ],
    });

    return {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      from: context.agentId,
      to: message.from,
      type: 'response',
      payload: {
        originalMessageId: message.id,
        response: text,
      },
      timestamp: new Date().toISOString(),
      correlationId: message.correlationId || message.id,
    };
  }

  return null;
}

/**
 * Get messages for a specific agent
 */
export function getMessagesForAgent(agentId: string, limit: number = 50): AgentMessage[] {
  return messageQueue
    .filter((msg) => msg.to === agentId || msg.to === 'broadcast')
    .slice(-limit);
}

/**
 * Broadcast message to all agents
 */
export async function broadcastMessage(
  from: string,
  payload: Record<string, any>
): Promise<AgentMessage> {
  const message: AgentMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    from,
    to: 'broadcast',
    type: 'event',
    payload,
    timestamp: new Date().toISOString(),
  };

  messageQueue.push(message);
  return message;
}

/**
 * Create a workflow coordination message
 * Used when multiple agents need to work together
 */
export async function coordinateWorkflow(
  workflow: {
    id: string;
    name: string;
    agents: string[];
    tasks: Array<{ agent: string; task: string }>;
  },
  context: WorkflowContext
): Promise<WorkflowResult<{ messages: AgentMessage[] }>> {
  "use workflow";

  const startTime = Date.now();
  const messages: AgentMessage[] = [];

  try {
    // Generate coordination plan
    const { object } = await generateObject({
      model: defaultModel,
      schema: z.object({
        plan: z.array(
          z.object({
            step: z.number(),
            agent: z.string(),
            action: z.string(),
            dependencies: z.array(z.number()),
          })
        ),
        estimatedDuration: z.number(),
      }),
      messages: [
        {
          role: 'user',
          content: `Create a coordination plan for this workflow:

Workflow: ${workflow.name}
Agents: ${workflow.agents.join(', ')}
Tasks: ${JSON.stringify(workflow.tasks, null, 2)}

Generate an ordered execution plan with dependencies.`,
        },
      ],
    });

    // Send coordination messages to each agent
    for (const step of object.plan) {
      const message: AgentMessage = {
        id: `coord-${workflow.id}-step-${step.step}`,
        from: context.agentId,
        to: step.agent,
        type: 'command',
        payload: {
          workflowId: workflow.id,
          step: step.step,
          action: step.action,
          dependencies: step.dependencies,
        },
        timestamp: new Date().toISOString(),
        correlationId: workflow.id,
      };

      messages.push(message);
      messageQueue.push(message);
    }

    return {
      success: true,
      data: { messages },
      metadata: {
        duration: Date.now() - startTime,
        steps: ['plan', 'coordinate'],
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: {
        duration: Date.now() - startTime,
      },
    };
  }
}
