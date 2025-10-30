#!/usr/bin/env node

import 'dotenv/config';
import { Orchestrator } from '../orchestrator.js';

async function runHealthCheck() {
  console.log('🏥 Running Meauxbility Infrastructure Health Check\n');

  try {
    const orchestrator = new Orchestrator();
    const summary = await orchestrator.run({ planOnly: true });

    // Exit with error code if there are critical issues
    const hasErrors = summary.healthChecks.some(h => h.status === 'error') ||
                     summary.deploymentVerification.some(d => d.status === 'error');

    if (hasErrors) {
      console.error('\n❌ Health check failed - critical issues detected');
      process.exit(1);
    } else if (summary.recommendations.length > 0) {
      console.log('\n⚠️  Health check passed with warnings');
      process.exit(0);
    } else {
      console.log('\n✅ Health check passed - all systems operational');
      process.exit(0);
    }
  } catch (error) {
    console.error(`\n❌ Health check error: ${error.message}`);
    process.exit(1);
  }
}

runHealthCheck();
