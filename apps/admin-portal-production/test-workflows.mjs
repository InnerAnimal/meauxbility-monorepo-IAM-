#!/usr/bin/env node

/**
 * Test script for AI workflows
 *
 * Usage:
 *   node test-workflows.mjs grant
 *   node test-workflows.mjs agents
 *   node test-workflows.mjs coordinate
 */

const BASE_URL = process.env.API_URL || 'http://localhost:3001';

// Test data
const sampleGrantApplication = {
  applicantName: 'New Orleans Youth Education Initiative',
  organizationType: 'nonprofit',
  location: 'New Orleans, LA',
  revenue: 180000,
  projectDescription: 'After-school STEM program for middle school students in underserved neighborhoods, focusing on robotics and coding',
  fundingAmount: 50000,
  purpose: 'education',
};

async function testGrantWorkflow() {
  console.log('\n📋 Testing Grant Eligibility Workflow...\n');

  try {
    const response = await fetch(`${BASE_URL}/api/workflows/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workflowId: 'grant-eligibility',
        input: sampleGrantApplication,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Workflow executed successfully!\n');
      console.log('Results:');
      console.log('  Eligible:', result.data.eligible ? '✓ YES' : '✗ NO');
      console.log('  Score:', result.data.score + '/100');
      console.log('\n  Reasoning:', result.data.reasoning);
      console.log('\n  Matched Criteria:');
      result.data.matchedCriteria.forEach((c) => console.log('    -', c));
      console.log('\n  Concerns:');
      result.data.concerns.forEach((c) => console.log('    -', c));
      console.log('\n  Recommendations:');
      result.data.recommendations.forEach((r) => console.log('    -', r));

      if (result.data.grantSuggestions?.length > 0) {
        console.log('\n  Grant Suggestions:');
        result.data.grantSuggestions.forEach((g) => {
          console.log(`    - ${g.name} (${g.matchScore}% match)`);
          console.log(`      ${g.reason}`);
        });
      }

      console.log('\n  Metadata:');
      console.log('    Duration:', result.metadata.duration + 'ms');
      console.log('    Steps:', result.metadata.steps.join(' → '));
      console.log('    Model:', result.metadata.model);
    } else {
      console.error('❌ Workflow failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function testAgentSystem() {
  console.log('\n🤖 Testing Agent Communication System...\n');

  try {
    // Register a test agent
    console.log('1. Registering test agent...');
    const registerResponse = await fetch(`${BASE_URL}/api/agents/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'test-agent',
        name: 'Test Agent',
        capabilities: ['testing', 'demo'],
      }),
    });

    const registerResult = await registerResponse.json();
    if (registerResult.success) {
      console.log('   ✓ Agent registered:', registerResult.agent.name);
    }

    // List all agents
    console.log('\n2. Listing all agents...');
    const listResponse = await fetch(`${BASE_URL}/api/agents/register`);
    const listResult = await listResponse.json();
    if (listResult.success) {
      console.log(`   ✓ Found ${listResult.count} agent(s):`);
      listResult.agents.forEach((a) => {
        console.log(`     - ${a.name} (${a.id})`);
        console.log(`       Capabilities: ${a.capabilities.join(', ')}`);
      });
    }

    // Send a test message
    console.log('\n3. Sending test message...');
    const messageResponse = await fetch(`${BASE_URL}/api/agents/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'msg-test-' + Date.now(),
        from: 'test-agent',
        to: 'system',
        type: 'request',
        payload: { action: 'hello', message: 'Testing agent communication' },
        timestamp: new Date().toISOString(),
      }),
    });

    const messageResult = await messageResponse.json();
    if (messageResult.success) {
      console.log('   ✓ Message sent successfully');
      if (messageResult.data) {
        console.log('   ✓ Received response:', messageResult.data);
      }
    }

    console.log('\n✅ Agent system tests complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function testCoordination() {
  console.log('\n🔄 Testing Multi-Agent Coordination...\n');

  try {
    const workflow = {
      id: 'test-workflow-' + Date.now(),
      name: 'Test Multi-Agent Workflow',
      agents: ['agent-1', 'agent-2', 'agent-3'],
      tasks: [
        { agent: 'agent-1', task: 'Initialize data processing' },
        { agent: 'agent-2', task: 'Validate and transform data' },
        { agent: 'agent-3', task: 'Generate final report' },
      ],
    };

    console.log('Coordinating workflow:', workflow.name);
    console.log('Agents involved:', workflow.agents.join(', '));

    const response = await fetch(`${BASE_URL}/api/agents/coordinate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow),
    });

    const result = await response.json();

    if (result.success) {
      console.log('\n✅ Workflow coordinated successfully!');
      console.log('\nGenerated coordination plan:');
      result.data.messages.forEach((msg, i) => {
        console.log(`  Step ${i + 1}: ${msg.to} - ${msg.payload.action}`);
        if (msg.payload.dependencies?.length > 0) {
          console.log(`    Depends on steps: ${msg.payload.dependencies.join(', ')}`);
        }
      });
      console.log('\nDuration:', result.metadata.duration + 'ms');
    } else {
      console.error('❌ Coordination failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function listWorkflows() {
  console.log('\n📚 Available Workflows:\n');

  try {
    const response = await fetch(`${BASE_URL}/api/workflows/list`);
    const result = await response.json();

    if (result.success) {
      result.workflows.forEach((w) => {
        console.log(`  ${w.name} (${w.id})`);
        console.log(`    ${w.description}`);
        console.log(`    Version: ${w.version}`);
        console.log(`    Tags: ${w.tags?.join(', ') || 'none'}`);
        console.log();
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Main execution
const command = process.argv[2];

async function main() {
  console.log('🚀 AI Workflow Test Suite');
  console.log('API URL:', BASE_URL);

  switch (command) {
    case 'grant':
      await testGrantWorkflow();
      break;
    case 'agents':
      await testAgentSystem();
      break;
    case 'coordinate':
      await testCoordination();
      break;
    case 'list':
      await listWorkflows();
      break;
    default:
      console.log('\nUsage:');
      console.log('  node test-workflows.mjs grant       - Test grant eligibility workflow');
      console.log('  node test-workflows.mjs agents      - Test agent communication');
      console.log('  node test-workflows.mjs coordinate  - Test multi-agent coordination');
      console.log('  node test-workflows.mjs list        - List available workflows');
      console.log('\nRunning all tests...\n');
      await listWorkflows();
      await testGrantWorkflow();
      await testAgentSystem();
      await testCoordination();
  }
}

main().catch(console.error);
