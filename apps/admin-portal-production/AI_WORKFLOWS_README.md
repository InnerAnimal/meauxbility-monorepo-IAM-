# AI Workflows & Agent Communication System

## Overview

This admin portal now serves as the **central hub** for AI-powered workflows and agent-to-agent communication in the Meauxbility ecosystem. Built with the Vercel AI SDK, it enables:

1. **Multi-step AI workflows** with automatic retries and state management
2. **Agent communication** between Vercel, GitHub, and other services
3. **Grant eligibility checking** with intelligent analysis
4. **Extensible architecture** for adding new workflows

## Table of Contents

- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Workflows](#workflows)
- [Agent Communication](#agent-communication)
- [API Reference](#api-reference)
- [Adding New Workflows](#adding-new-workflows)
- [Examples](#examples)

## Quick Start

### 1. Installation

Dependencies are already installed. If you need to reinstall:

```bash
cd apps/admin-portal-production
npm install
```

### 2. Environment Setup

Copy the environment example and configure:

```bash
cp .env.local.example .env.local
```

Required environment variables:
- `ANTHROPIC_API_KEY` - Your Anthropic API key (required)
- `OPENAI_API_KEY` - OpenAI key (optional, for alternative models)

### 3. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### 4. Test the API

```bash
# List available workflows
curl http://localhost:3001/api/workflows/list

# Execute grant eligibility workflow
curl -X POST http://localhost:3001/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "grant-eligibility",
    "input": {
      "applicantName": "Community Health Initiative",
      "organizationType": "nonprofit",
      "location": "New Orleans, LA",
      "revenue": 150000,
      "projectDescription": "Mobile health clinic for underserved communities",
      "fundingAmount": 75000,
      "purpose": "healthcare"
    }
  }'
```

## Architecture

```
src/
├── lib/
│   ├── ai/
│   │   └── config.ts          # AI model configuration
│   └── workflows/
│       ├── types.ts            # TypeScript types
│       ├── registry.ts         # Workflow registry
│       ├── grant-eligibility.ts # Grant checker workflow
│       └── agent-communication.ts # Agent messaging
└── app/
    └── api/
        ├── workflows/
        │   ├── execute/        # Execute workflows
        │   └── list/           # List workflows
        └── agents/
            ├── register/       # Register agents
            ├── message/        # Send/receive messages
            └── coordinate/     # Multi-agent coordination
```

## Workflows

### Grant Eligibility Workflow

The grant eligibility workflow uses a 4-step process:

1. **Initial Analysis** - Analyzes the application for strengths and concerns
2. **Research Grants** - Matches against available grant programs
3. **Fact-Check** - Validates claims and checks eligibility criteria
4. **Final Recommendation** - Generates comprehensive eligibility report

**Input Schema:**
```typescript
{
  applicantName: string;
  organizationType: string;
  location: string;
  revenue?: number;
  projectDescription: string;
  fundingAmount: number;
  purpose: string;
}
```

**Output:**
```typescript
{
  eligible: boolean;
  score: number; // 0-100
  reasoning: string;
  matchedCriteria: string[];
  concerns: string[];
  recommendations: string[];
  grantSuggestions: Array<{
    name: string;
    matchScore: number;
    reason: string;
  }>;
}
```

### Creating New Workflows

See [Adding New Workflows](#adding-new-workflows) section below.

## Agent Communication

The agent communication system enables different AI agents to coordinate work.

### Supported Message Types

- `request` - Request information or action from another agent
- `response` - Respond to a request
- `event` - Broadcast an event (e.g., "deployment completed")
- `command` - Execute a specific command

### Agent Message Format

```typescript
{
  id: string;
  from: string;        // Agent ID
  to: string;          // Target agent or 'broadcast'
  type: 'request' | 'response' | 'event' | 'command';
  payload: Record<string, any>;
  timestamp: string;   // ISO 8601
  correlationId?: string; // For tracking related messages
}
```

### Example: Agent Registration

```bash
curl -X POST http://localhost:3001/api/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "id": "github-agent",
    "name": "GitHub Integration Agent",
    "capabilities": ["pull-requests", "issues", "deployments"],
    "endpoint": "https://api.github.com"
  }'
```

### Example: Send Message

```bash
curl -X POST http://localhost:3001/api/agents/message \
  -H "Content-Type: application/json" \
  -d '{
    "id": "msg-123",
    "from": "vercel-agent",
    "to": "github-agent",
    "type": "request",
    "payload": {
      "action": "create-pr",
      "branch": "feature/new-workflow",
      "title": "Add new workflow"
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }'
```

### Multi-Agent Coordination

For complex workflows involving multiple agents:

```bash
curl -X POST http://localhost:3001/api/agents/coordinate \
  -H "Content-Type: application/json" \
  -d '{
    "id": "deploy-workflow-123",
    "name": "Full Deployment Workflow",
    "agents": ["github-agent", "vercel-agent", "notification-agent"],
    "tasks": [
      { "agent": "github-agent", "task": "Create and merge PR" },
      { "agent": "vercel-agent", "task": "Deploy to production" },
      { "agent": "notification-agent", "task": "Send deployment notification" }
    ]
  }'
```

The system will:
1. Analyze task dependencies
2. Create an optimal execution plan
3. Send coordinated messages to each agent
4. Track workflow progress

## API Reference

### Workflows

#### `GET /api/workflows/list`
List all available workflows.

**Query params:**
- `tag` (optional) - Filter by tag

**Response:**
```json
{
  "success": true,
  "workflows": [
    {
      "id": "grant-eligibility",
      "name": "Grant Eligibility Checker",
      "description": "...",
      "version": "1.0.0",
      "tags": ["grant", "eligibility"]
    }
  ]
}
```

#### `POST /api/workflows/execute`
Execute a workflow.

**Request body:**
```json
{
  "workflowId": "grant-eligibility",
  "input": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "metadata": {
    "duration": 5420,
    "steps": ["initial-analysis", "research-grants", "fact-check", "final-recommendation"],
    "model": "claude-3-5-sonnet-20241022"
  }
}
```

### Agents

#### `POST /api/agents/register`
Register a new agent.

#### `GET /api/agents/register`
List all registered agents.

#### `POST /api/agents/message`
Send a message between agents.

#### `GET /api/agents/message?agentId=xxx&limit=50`
Get messages for a specific agent.

#### `POST /api/agents/coordinate`
Coordinate a multi-agent workflow.

## Adding New Workflows

### Step 1: Define Your Workflow

Create a new file in `src/lib/workflows/`:

```typescript
// src/lib/workflows/my-workflow.ts
import { generateText } from 'ai';
import { defaultModel } from '../ai/config';
import { WorkflowResult } from './types';

export async function myWorkflow(input: any): Promise<WorkflowResult<any>> {
  "use workflow"; // Important: enables workflow features

  const startTime = Date.now();
  const steps: string[] = [];

  try {
    // Step 1: Do something
    steps.push('step-1');
    const step1Result = await doStep1(input);

    // Step 2: Do something else
    steps.push('step-2');
    const step2Result = await doStep2(step1Result);

    return {
      success: true,
      data: step2Result,
      metadata: {
        duration: Date.now() - startTime,
        steps,
      },
    };
  } catch (error) {
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

async function doStep1(input: any) {
  const { text } = await generateText({
    model: defaultModel,
    messages: [{ role: 'user', content: `Process: ${input}` }],
  });
  return text;
}

async function doStep2(input: string) {
  // Additional processing
  return { result: input };
}
```

### Step 2: Register Your Workflow

Add to `src/lib/workflows/registry.ts`:

```typescript
import { myWorkflow } from './my-workflow';

workflows.set('my-workflow', {
  id: 'my-workflow',
  name: 'My Custom Workflow',
  description: 'Description of what this does',
  version: '1.0.0',
  execute: myWorkflow,
  tags: ['custom', 'analysis'],
});
```

### Step 3: Use Your Workflow

```bash
curl -X POST http://localhost:3001/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "my-workflow",
    "input": { "data": "test" }
  }'
```

## Examples

### Example 1: Grant Eligibility Check

```javascript
const response = await fetch('http://localhost:3001/api/workflows/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    workflowId: 'grant-eligibility',
    input: {
      applicantName: 'Tech for Good',
      organizationType: 'nonprofit',
      location: 'San Francisco, CA',
      revenue: 250000,
      projectDescription: 'AI-powered educational platform for underserved schools',
      fundingAmount: 100000,
      purpose: 'education',
    },
  }),
});

const result = await response.json();
console.log('Eligibility:', result.data.eligible);
console.log('Score:', result.data.score);
console.log('Recommendations:', result.data.recommendations);
```

### Example 2: Agent Communication

```javascript
// Register an agent
await fetch('http://localhost:3001/api/agents/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'my-agent',
    name: 'My Custom Agent',
    capabilities: ['data-processing', 'notifications'],
  }),
});

// Send a message
await fetch('http://localhost:3001/api/agents/message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'msg-' + Date.now(),
    from: 'my-agent',
    to: 'github-agent',
    type: 'request',
    payload: { action: 'get-repo-info', repo: 'my-org/my-repo' },
    timestamp: new Date().toISOString(),
  }),
});

// Get messages for your agent
const messages = await fetch('http://localhost:3001/api/agents/message?agentId=my-agent');
const data = await messages.json();
console.log('Messages:', data.messages);
```

### Example 3: Multi-Agent Workflow

```javascript
const workflow = {
  id: 'grant-processing-' + Date.now(),
  name: 'Grant Application Processing',
  agents: ['review-agent', 'verification-agent', 'notification-agent'],
  tasks: [
    { agent: 'review-agent', task: 'Initial application review' },
    { agent: 'verification-agent', task: 'Verify applicant credentials' },
    { agent: 'notification-agent', task: 'Send decision to applicant' },
  ],
};

const response = await fetch('http://localhost:3001/api/agents/coordinate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(workflow),
});

const result = await response.json();
console.log('Coordination plan:', result.data.messages);
```

## Development Tips

1. **Model Selection**: Use `selectModel('simple' | 'balanced' | 'complex')` based on task complexity
2. **Error Handling**: All workflows return `WorkflowResult` with success/error status
3. **Timeouts**: Set appropriate timeouts for long-running workflows
4. **Retries**: Workflows automatically retry on transient failures
5. **Logging**: Enable `AGENT_ENABLE_LOGGING=true` for debugging

## Deployment

When deploying to Vercel:

1. Set environment variables in Vercel dashboard
2. Ensure `ANTHROPIC_API_KEY` is configured
3. Monitor usage in Anthropic console
4. Set up rate limiting if needed

## Contributing

To add new features:

1. Create workflow in `src/lib/workflows/`
2. Register in `registry.ts`
3. Update this README with examples
4. Test thoroughly with example inputs

## Support

For issues or questions:
- Check the Vercel AI SDK docs: https://sdk.vercel.ai/docs
- Review Anthropic API docs: https://docs.anthropic.com
- Open an issue in the repository

---

**Built with:**
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Anthropic Claude](https://www.anthropic.com/claude)
- [Next.js 14](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
