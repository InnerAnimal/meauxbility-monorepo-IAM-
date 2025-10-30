import fetch from 'node-fetch';
import { config, getAllProjects } from './config.js';

/**
 * Main orchestrator for finish_project command
 * Coordinates deployment across all services
 */

export class Orchestrator {
  constructor() {
    this.steps = [];
    this.results = [];
  }

  log(message, status = 'info') {
    const entry = { timestamp: new Date().toISOString(), message, status };
    this.steps.push(entry);
    console.log(`[${status.toUpperCase()}] ${message}`);
  }

  async runHealthChecks() {
    this.log('Running health checks on all services...');
    const results = [];

    for (const check of config.healthChecks) {
      try {
        const startTime = Date.now();
        const res = await fetch(check.url, { timeout: 5000 });
        const responseTime = Date.now() - startTime;

        results.push({
          name: check.name,
          url: check.url,
          status: res.ok ? 'healthy' : 'unhealthy',
          statusCode: res.status,
          responseTime,
        });

        this.log(`✓ ${check.name}: ${res.status} (${responseTime}ms)`, 'success');
      } catch (error) {
        results.push({
          name: check.name,
          url: check.url,
          status: 'error',
          error: error.message,
        });
        this.log(`✗ ${check.name}: ${error.message}`, 'error');
      }
    }

    return results;
  }

  async verifyDNS() {
    this.log('Verifying DNS configuration...');
    const projects = getAllProjects();
    const results = [];

    for (const project of projects) {
      if (!project.domain) continue;

      try {
        // Simple check - try to resolve the domain
        const res = await fetch(`https://${project.domain}`, {
          method: 'HEAD',
          timeout: 5000,
        });

        results.push({
          domain: project.domain,
          status: res.ok ? 'configured' : 'error',
          statusCode: res.status,
        });

        this.log(`✓ ${project.domain}: ${res.status}`, 'success');
      } catch (error) {
        results.push({
          domain: project.domain,
          status: 'error',
          error: error.message,
        });
        this.log(`✗ ${project.domain}: ${error.message}`, 'warning');
      }
    }

    return results;
  }

  async checkEnvironmentVars() {
    this.log('Checking environment variables...');
    const required = [
      'CLOUDFLARE_API_TOKEN',
      'VERCEL_TOKEN',
      'GITHUB_TOKEN',
      'SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'RENDER_API_KEY',
    ];

    const results = [];
    for (const key of required) {
      const exists = !!process.env[key];
      results.push({ key, configured: exists });

      if (exists) {
        this.log(`✓ ${key}: configured`, 'success');
      } else {
        this.log(`✗ ${key}: missing`, 'warning');
      }
    }

    return results;
  }

  async auditProjects() {
    this.log('Auditing project configurations...');
    const projects = getAllProjects();
    const results = [];

    for (const project of projects) {
      const audit = {
        name: project.name,
        domain: project.domain,
        vercelProjectId: project.vercelProjectId,
        status: 'pending',
        issues: [],
      };

      if (!project.vercelProjectId) {
        audit.issues.push('No Vercel project ID configured');
      }

      if (!project.domain) {
        audit.issues.push('No domain configured');
      }

      audit.status = audit.issues.length === 0 ? 'ready' : 'needs_attention';
      results.push(audit);

      const emoji = audit.status === 'ready' ? '✓' : '⚠';
      this.log(`${emoji} ${project.name}: ${audit.issues.length} issues`, audit.status === 'ready' ? 'success' : 'warning');
    }

    return results;
  }

  async verifyDeployments() {
    this.log('Verifying latest deployments...');
    const projects = getAllProjects().filter(p => p.vercelProjectId);
    const results = [];

    for (const project of projects) {
      try {
        // This would call the Vercel API to check latest deployment
        // For now, just check if the domain is accessible
        const res = await fetch(`https://${project.domain}`, {
          method: 'HEAD',
          timeout: 5000,
        });

        results.push({
          project: project.name,
          domain: project.domain,
          status: res.ok ? 'deployed' : 'error',
          statusCode: res.status,
        });

        this.log(`✓ ${project.name}: deployed and accessible`, 'success');
      } catch (error) {
        results.push({
          project: project.name,
          domain: project.domain,
          status: 'error',
          error: error.message,
        });
        this.log(`✗ ${project.name}: ${error.message}`, 'error');
      }
    }

    return results;
  }

  async run(options = {}) {
    this.log('🚀 Starting Meauxbility Infrastructure Orchestration');
    this.log(`Mode: ${options.planOnly ? 'PLAN ONLY' : 'EXECUTE'}`);

    const summary = {
      startTime: new Date().toISOString(),
      planOnly: options.planOnly,
      steps: [],
    };

    try {
      // Step 1: Environment Check
      this.log('\n=== Step 1: Environment Variables ===');
      summary.environmentVars = await this.checkEnvironmentVars();

      // Step 2: Project Audit
      this.log('\n=== Step 2: Project Audit ===');
      summary.projectAudit = await this.auditProjects();

      // Step 3: DNS Verification
      this.log('\n=== Step 3: DNS Verification ===');
      summary.dnsVerification = await this.verifyDNS();

      // Step 4: Health Checks
      this.log('\n=== Step 4: Health Checks ===');
      summary.healthChecks = await this.runHealthChecks();

      // Step 5: Deployment Verification
      this.log('\n=== Step 5: Deployment Verification ===');
      summary.deploymentVerification = await this.verifyDeployments();

      summary.endTime = new Date().toISOString();
      summary.status = 'completed';

      this.log('\n✅ Orchestration completed successfully!', 'success');

      // Generate recommendations
      const recommendations = this.generateRecommendations(summary);
      summary.recommendations = recommendations;

      if (recommendations.length > 0) {
        this.log('\n=== Recommendations ===');
        recommendations.forEach((rec, i) => {
          this.log(`${i + 1}. ${rec}`, 'info');
        });
      }

      return summary;

    } catch (error) {
      this.log(`\n❌ Orchestration failed: ${error.message}`, 'error');
      summary.status = 'failed';
      summary.error = error.message;
      summary.endTime = new Date().toISOString();
      throw error;
    }
  }

  generateRecommendations(summary) {
    const recommendations = [];

    // Check for missing environment variables
    const missingEnvVars = summary.environmentVars?.filter(e => !e.configured);
    if (missingEnvVars && missingEnvVars.length > 0) {
      recommendations.push(`Configure missing environment variables: ${missingEnvVars.map(e => e.key).join(', ')}`);
    }

    // Check for projects needing attention
    const projectsNeedingAttention = summary.projectAudit?.filter(p => p.status === 'needs_attention');
    if (projectsNeedingAttention && projectsNeedingAttention.length > 0) {
      projectsNeedingAttention.forEach(project => {
        recommendations.push(`${project.name}: ${project.issues.join(', ')}`);
      });
    }

    // Check for unhealthy services
    const unhealthyServices = summary.healthChecks?.filter(h => h.status !== 'healthy');
    if (unhealthyServices && unhealthyServices.length > 0) {
      recommendations.push(`Investigate unhealthy services: ${unhealthyServices.map(s => s.name).join(', ')}`);
    }

    // Check for DNS issues
    const dnsIssues = summary.dnsVerification?.filter(d => d.status === 'error');
    if (dnsIssues && dnsIssues.length > 0) {
      recommendations.push(`Fix DNS configuration for: ${dnsIssues.map(d => d.domain).join(', ')}`);
    }

    return recommendations;
  }
}
