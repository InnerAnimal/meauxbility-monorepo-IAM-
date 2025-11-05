import { z } from 'zod';

// Base workflow result type
export interface WorkflowResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    duration?: number;
    steps?: string[];
    model?: string;
    tokens?: {
      input: number;
      output: number;
      total: number;
    };
  };
}

// Agent communication message types
export const AgentMessageSchema = z.object({
  id: z.string(),
  from: z.string(), // agent identifier
  to: z.string(), // target agent or 'broadcast'
  type: z.enum(['request', 'response', 'event', 'command']),
  payload: z.record(z.any()),
  timestamp: z.string(),
  correlationId: z.string().optional(), // for tracking related messages
});

export type AgentMessage = z.infer<typeof AgentMessageSchema>;

// Workflow context for agent communication
export interface WorkflowContext {
  requestId: string;
  agentId: string;
  userId?: string;
  metadata?: Record<string, any>;
}

// Workflow step definition
export interface WorkflowStep {
  name: string;
  execute: (context: WorkflowContext, input: any) => Promise<any>;
  retries?: number;
  timeout?: number;
}

// Grant eligibility types
export const GrantApplicationSchema = z.object({
  applicantName: z.string(),
  organizationType: z.string(),
  revenue: z.number().optional(),
  location: z.string(),
  projectDescription: z.string(),
  fundingAmount: z.number(),
  purpose: z.string(),
});

export type GrantApplication = z.infer<typeof GrantApplicationSchema>;

export interface EligibilityResult {
  eligible: boolean;
  score: number; // 0-100
  reasoning: string;
  matchedCriteria: string[];
  concerns: string[];
  recommendations: string[];
  grantSuggestions?: Array<{
    name: string;
    matchScore: number;
    reason: string;
  }>;
}
