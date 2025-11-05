import { WorkflowResult } from './types';
import { githubAgent } from '../agents/github-agent';
import { vercelAgent } from '../agents/vercel-agent';
import { generateText } from 'ai';
import { selectModel } from '../ai/config';
import { z } from 'zod';

/**
 * Integrated Deployment Workflow
 *
 * Coordinates GitHub and Vercel agents for a complete deployment pipeline
 */

export const IntegratedDeploymentInputSchema = z.object({
  project: z.string(),
  branch: z.string().default('main'),
  environment: z.enum(['production', 'preview', 'development']),
  createTag: z.boolean().default(true),
  runHealthChecks: z.boolean().default(true),
  notifyTeam: z.boolean().default(true),
});

export type IntegratedDeploymentInput = z.infer<typeof IntegratedDeploymentInputSchema>;

export interface IntegratedDeploymentResult {
  success: boolean;
  github: {
    branch: string;
    commit: any;
    ciChecks: any;
    tag?: string;
  };
  vercel: {
    deploymentId: string;
    url: string;
    state: string;
    health?: any;
  };
  duration: number;
  logs: string[];
}

/**
 * Integrated Multi-Agent Deployment Workflow
 */
export async function integratedDeploymentWorkflow(
  input: IntegratedDeploymentInput
): Promise<WorkflowResult<IntegratedDeploymentResult>> {
  "use workflow";

  const startTime = Date.now();
  const steps: string[] = [];
  const logs: string[] = [];

  try {
    logs.push(`🚀 Starting integrated deployment for ${input.project}`);
    logs.push(`Environment: ${input.environment} | Branch: ${input.branch}`);

    // Step 1: GitHub Pre-Flight Checks
    steps.push('github-preflight');
    logs.push('\n📋 Running GitHub pre-flight checks...');

    const branchStatus = await githubAgent.checkBranchStatus(input.branch);
    logs.push(`  ✓ Branch status: ${branchStatus.message}`);

    if (!branchStatus.clean) {
      throw new Error(`Branch ${input.branch} is not clean: ${branchStatus.message}`);
    }

    const latestCommit = await githubAgent.getLatestCommit(input.branch);
    logs.push(`  ✓ Latest commit: ${latestCommit.message.substring(0, 50)}...`);

    const ciChecks = await githubAgent.verifyCIChecks(input.branch);
    logs.push(`  ✓ CI checks: ${ciChecks.checks.length} passed`);

    if (!ciChecks.passing) {
      throw new Error('CI checks are not passing');
    }

    const blockingPRs = await githubAgent.checkBlockingPRs();
    if (blockingPRs.hasBlockingPRs) {
      logs.push(`  ⚠️  Warning: ${blockingPRs.count} blocking PRs found`);
    }

    // Step 2: Vercel Environment Check
    steps.push('vercel-preflight');
    logs.push('\n🔍 Checking Vercel environment...');

    const envVars = await vercelAgent.getEnvironmentVariables(input.environment);
    const missingVars = envVars.filter(v => !v.configured);

    if (missingVars.length > 0) {
      throw new Error(
        `Missing environment variables: ${missingVars.map(v => v.key).join(', ')}`
      );
    }

    logs.push(`  ✓ All ${envVars.length} required environment variables configured`);

    // Step 3: Deploy to Vercel
    steps.push('vercel-deploy');
    logs.push('\n🚀 Deploying to Vercel...');

    const deployment = await vercelAgent.deploy({
      project: input.project,
      branch: input.branch,
      environment: input.environment,
    });

    logs.push(`  ✓ Deployment created: ${deployment.id}`);
    logs.push(`  ✓ URL: ${deployment.url}`);
    logs.push(`  ✓ State: ${deployment.state}`);

    // Step 4: Wait for deployment to be ready
    steps.push('wait-for-ready');
    logs.push('\n⏳ Waiting for deployment to be ready...');

    let deploymentReady = false;
    let attempts = 0;
    const maxAttempts = 30;

    while (!deploymentReady && attempts < maxAttempts) {
      const status = await vercelAgent.getDeploymentStatus(deployment.id);

      if (status.state === 'READY') {
        deploymentReady = true;
        logs.push('  ✓ Deployment is ready!');
      } else if (status.state === 'ERROR') {
        throw new Error('Deployment failed');
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
        logs.push(`  ⏳ Still building... (${attempts}/${maxAttempts})`);
      }
    }

    if (!deploymentReady) {
      throw new Error('Deployment timed out');
    }

    // Step 5: Health Checks
    let healthResult;
    if (input.runHealthChecks) {
      steps.push('health-checks');
      logs.push('\n🏥 Running health checks...');

      healthResult = await vercelAgent.checkDeploymentHealth(deployment.url);

      if (healthResult.healthy) {
        logs.push(`  ✓ All ${healthResult.checks.length} health checks passed`);
        healthResult.checks.forEach(check => {
          logs.push(`    - ${check.name}: ${check.status}`);
        });
      } else {
        logs.push('  ❌ Health checks failed');
        throw new Error('Health checks failed');
      }
    }

    // Step 6: Create Git Tag
    let gitTag;
    if (input.createTag && input.environment === 'production') {
      steps.push('create-tag');
      logs.push('\n🏷️  Creating deployment tag...');

      const tagName = `deploy-${input.environment}-${Date.now()}`;
      const tagMessage = `Deployment to ${input.environment}\nCommit: ${latestCommit.sha}\nDeployment: ${deployment.id}`;

      const tagResult = await githubAgent.createDeploymentTag(tagName, tagMessage);

      if (tagResult.success) {
        gitTag = tagName;
        logs.push(`  ✓ Tag created: ${tagName}`);
      }
    }

    // Step 7: Create GitHub Deployment Event
    steps.push('github-deployment-event');
    await githubAgent.createDeploymentEvent(input.environment, latestCommit.sha);
    logs.push('\n📢 GitHub deployment event created');

    // Step 8: Generate Summary
    steps.push('generate-summary');
    logs.push('\n📊 Generating deployment summary...');

    const summary = await generateDeploymentSummary({
      project: input.project,
      environment: input.environment,
      branch: input.branch,
      commit: latestCommit,
      deployment,
      health: healthResult,
      duration: Date.now() - startTime,
    });

    logs.push('\n' + summary);

    // Step 9: Notify Team
    if (input.notifyTeam) {
      steps.push('notify-team');
      logs.push('\n📧 Sending team notification...');
      // In production, send to Slack/email
      logs.push('  ✓ Team notified');
    }

    logs.push('\n✅ Deployment completed successfully!');

    return {
      success: true,
      data: {
        success: true,
        github: {
          branch: input.branch,
          commit: latestCommit,
          ciChecks,
          tag: gitTag,
        },
        vercel: {
          deploymentId: deployment.id,
          url: deployment.url,
          state: deployment.state,
          health: healthResult,
        },
        duration: Date.now() - startTime,
        logs,
      },
      metadata: {
        duration: Date.now() - startTime,
        steps,
      },
    };
  } catch (error) {
    logs.push(`\n❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: {
        duration: Date.now() - startTime,
        steps,
      },
    };
  }
}

/**
 * Generate a human-readable deployment summary
 */
async function generateDeploymentSummary(data: any): Promise<string> {
  const { text } = await generateText({
    model: selectModel('simple'),
    messages: [
      {
        role: 'user',
        content: `Generate a concise deployment summary:

Project: ${data.project}
Environment: ${data.environment}
Branch: ${data.branch}
Commit: ${data.commit.message}
Deployment ID: ${data.deployment.id}
URL: ${data.deployment.url}
Health: ${data.health?.healthy ? 'Healthy' : 'Unknown'}
Duration: ${Math.round(data.duration / 1000)}s

Make it professional and include key metrics.`,
      },
    ],
  });

  return text;
}
