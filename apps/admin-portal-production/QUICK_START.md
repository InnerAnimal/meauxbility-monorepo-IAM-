# Quick Start Guide: AI Workflows & Agent System

## 🚀 Get Started in 5 Minutes

### Step 1: Set Up Environment

```bash
cd apps/admin-portal-production
cp .env.local.example .env.local
```

Edit `.env.local` and add your API key:
```
ANTHROPIC_API_KEY=your_actual_key_here
```

### Step 2: Start the Development Server

```bash
npm run dev
```

Server starts on http://localhost:3001

### Step 3: Test the System

```bash
# Run all tests
node test-workflows.mjs

# Or test specific features
node test-workflows.mjs grant        # Grant eligibility workflow
node test-workflows.mjs agents       # Agent communication
node test-workflows.mjs coordinate   # Multi-agent coordination
node test-workflows.mjs list         # List available workflows
```

## 📋 What You Can Do

### 1. Check Grant Eligibility

**Via API:**
```bash
curl -X POST http://localhost:3001/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "grant-eligibility",
    "input": {
      "applicantName": "Your Organization",
      "organizationType": "nonprofit",
      "location": "New Orleans, LA",
      "revenue": 150000,
      "projectDescription": "Your project description here",
      "fundingAmount": 50000,
      "purpose": "healthcare"
    }
  }'
```

**Via React Component:**
```tsx
import GrantEligibilityChecker from './examples/GrantEligibilityChecker';

export default function Page() {
  return <GrantEligibilityChecker />;
}
```

### 2. Agent Communication

**Register an agent:**
```bash
curl -X POST http://localhost:3001/api/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-agent",
    "name": "My Agent",
    "capabilities": ["task1", "task2"]
  }'
```

**Send a message:**
```bash
curl -X POST http://localhost:3001/api/agents/message \
  -H "Content-Type: application/json" \
  -d '{
    "id": "msg-123",
    "from": "my-agent",
    "to": "another-agent",
    "type": "request",
    "payload": {"action": "do-something"},
    "timestamp": "2024-01-15T10:00:00Z"
  }'
```

### 3. List Available Workflows

```bash
curl http://localhost:3001/api/workflows/list
```

## 🛠️ API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/workflows/list` | GET | List all workflows |
| `/api/workflows/execute` | POST | Execute a workflow |
| `/api/agents/register` | GET/POST | Register or list agents |
| `/api/agents/message` | GET/POST | Send/receive messages |
| `/api/agents/coordinate` | POST | Coordinate multi-agent tasks |

## 📚 Example Use Cases

### Grant Processing Pipeline
```javascript
// 1. Check eligibility
const eligibility = await fetch('/api/workflows/execute', {
  method: 'POST',
  body: JSON.stringify({
    workflowId: 'grant-eligibility',
    input: applicationData
  })
});

// 2. If eligible, process further
if (eligibility.data.eligible) {
  // Send to review agent
  await fetch('/api/agents/message', {
    method: 'POST',
    body: JSON.stringify({
      from: 'system',
      to: 'review-agent',
      type: 'command',
      payload: { action: 'review', application: applicationData }
    })
  });
}
```

### Multi-Agent Deployment
```javascript
await fetch('/api/agents/coordinate', {
  method: 'POST',
  body: JSON.stringify({
    id: 'deploy-123',
    name: 'Deploy to Production',
    agents: ['github-agent', 'vercel-agent', 'notify-agent'],
    tasks: [
      { agent: 'github-agent', task: 'Merge PR' },
      { agent: 'vercel-agent', task: 'Deploy' },
      { agent: 'notify-agent', task: 'Notify team' }
    ]
  })
});
```

## 🎯 Next Steps

1. **Read the full documentation**: See `AI_WORKFLOWS_README.md`
2. **Explore examples**: Check `src/app/examples/`
3. **Add custom workflows**: Follow the guide in the README
4. **Deploy to production**: See deployment section below

## 🚢 Deployment to Vercel

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variable `ANTHROPIC_API_KEY` in Vercel dashboard
4. Deploy!

Your workflows will be available at:
- `https://your-domain.com/api/workflows/*`
- `https://your-domain.com/api/agents/*`

## 💡 Tips

- Use `AI_DEFAULT_MODEL` env var to change the default model
- Set `AGENT_ENABLE_LOGGING=true` for debugging
- Check the test script for more examples
- Review the type definitions in `src/lib/workflows/types.ts`

## 🆘 Troubleshooting

**"Workflow not found"**
- Check workflow ID matches registry
- Run `node test-workflows.mjs list` to see available workflows

**"Invalid API key"**
- Verify `ANTHROPIC_API_KEY` in `.env.local`
- Make sure you're using a valid key from https://console.anthropic.com

**API not responding**
- Ensure dev server is running on port 3001
- Check for errors in terminal

## 📖 More Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Anthropic API Reference](https://docs.anthropic.com)
- [Full AI Workflows README](./AI_WORKFLOWS_README.md)
