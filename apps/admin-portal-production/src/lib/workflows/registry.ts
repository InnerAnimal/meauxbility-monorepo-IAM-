import { WorkflowResult } from './types';
import { grantEligibilityWorkflow } from './grant-eligibility';
import { secureDeploymentWorkflow, DeploymentInputSchema } from './deployment';
import { integratedDeploymentWorkflow, IntegratedDeploymentInputSchema } from './integrated-deployment';

/**
 * Workflow Registry
 *
 * Central registry for all available workflows in the system.
 * Makes it easy to add new workflows and route requests.
 */

export type WorkflowFunction = (input: any) => Promise<WorkflowResult<any>>;

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  execute: WorkflowFunction;
  inputSchema?: any; // Zod schema for validation
  tags?: string[];
}

// Registry of all available workflows
const workflows = new Map<string, WorkflowDefinition>();

// Register grant eligibility workflow
workflows.set('grant-eligibility', {
  id: 'grant-eligibility',
  name: 'Grant Eligibility Checker',
  description:
    'Multi-step workflow to analyze grant applications, research matching grants, and provide eligibility recommendations',
  version: '1.0.0',
  execute: grantEligibilityWorkflow,
  tags: ['grant', 'eligibility', 'analysis'],
});

// Register deployment workflow
workflows.set('secure-deployment', {
  id: 'secure-deployment',
  name: 'Secure Deployment Workflow',
  description:
    'Multi-step deployment workflow with pre/post validation, testing, secret validation, and auto-rollback capabilities',
  version: '1.0.0',
  execute: secureDeploymentWorkflow,
  inputSchema: DeploymentInputSchema,
  tags: ['deployment', 'devops', 'security', 'automation'],
});

// Register integrated deployment workflow
workflows.set('integrated-deployment', {
  id: 'integrated-deployment',
  name: 'Integrated GitHub + Vercel Deployment',
  description:
    'Complete deployment pipeline coordinating GitHub and Vercel agents with pre-flight checks, health validation, and team notifications',
  version: '1.0.0',
  execute: integratedDeploymentWorkflow,
  inputSchema: IntegratedDeploymentInputSchema,
  tags: ['deployment', 'github', 'vercel', 'automation', 'multi-agent'],
});

/**
 * Register a new workflow
 */
export function registerWorkflow(definition: WorkflowDefinition) {
  workflows.set(definition.id, definition);
}

/**
 * Get a workflow by ID
 */
export function getWorkflow(id: string): WorkflowDefinition | undefined {
  return workflows.get(id);
}

/**
 * List all available workflows
 */
export function listWorkflows(): WorkflowDefinition[] {
  return Array.from(workflows.values());
}

/**
 * Execute a workflow by ID
 */
export async function executeWorkflow<T = any>(
  workflowId: string,
  input: any
): Promise<WorkflowResult<T>> {
  const workflow = workflows.get(workflowId);

  if (!workflow) {
    return {
      success: false,
      error: `Workflow '${workflowId}' not found`,
    };
  }

  try {
    return await workflow.execute(input);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Search workflows by tags
 */
export function findWorkflowsByTag(tag: string): WorkflowDefinition[] {
  return Array.from(workflows.values()).filter((w) =>
    w.tags?.includes(tag)
  );
}
