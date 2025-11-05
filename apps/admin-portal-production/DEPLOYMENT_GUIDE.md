# Deployment Guide

Complete guide for deploying using both the AI workflow system and secure bash scripts.

## Table of Contents

- [Quick Start](#quick-start)
- [Method 1: AI-Powered Deployment Workflow](#method-1-ai-powered-deployment-workflow)
- [Method 2: Secure Bash Script](#method-2-secure-bash-script)
- [Method 3: Multi-Agent Coordination](#method-3-multi-agent-coordination)
- [Environment Variables](#environment-variables)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

1. **Vercel CLI** installed: `npm install -g vercel`
2. **Environment variables** configured (see below)
3. **Project linked** to Vercel: `vercel link`

### Choose Your Deployment Method

| Method | Use Case | Complexity | Features |
|--------|----------|------------|----------|
| AI Workflow | Advanced deployments with validation | Medium | Pre/post checks, AI validation, auto-rollback |
| Secure Bash Script | Quick manual deployments | Low | Fast, simple, secure |
| Multi-Agent | Coordinated GitHub + Vercel | High | Full automation, health checks, notifications |

---

## Method 1: AI-Powered Deployment Workflow

The AI workflow provides intelligent deployment with validation, testing, and rollback capabilities.

### Features

- ✅ Pre-deployment validation
- ✅ Automated testing
- ✅ Secret validation
- ✅ Health checks
- ✅ Auto-rollback on failure
- ✅ AI-generated deployment plan
- ✅ Dry-run mode

### Usage

#### Basic Deployment

```bash
curl -X POST http://localhost:3001/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "secure-deployment",
    "input": {
      "project": "admin-portal-production",
      "environment": "production",
      "runTests": true,
      "validateSecrets": true,
      "notifyOnComplete": true,
      "autoRollback": true
    }
  }'
```

#### Dry Run (Validate Without Deploying)

```bash
curl -X POST http://localhost:3001/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "secure-deployment",
    "input": {
      "project": "admin-portal-production",
      "environment": "production",
      "dryRun": true
    }
  }'
```

#### Preview Deployment

```bash
curl -X POST http://localhost:3001/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "secure-deployment",
    "input": {
      "project": "admin-portal-production",
      "environment": "preview",
      "branch": "develop",
      "runTests": true
    }
  }'
```

### Response Format

```json
{
  "success": true,
  "data": {
    "success": true,
    "deploymentId": "dep_1234567890",
    "deploymentUrl": "https://admin-portal-production.vercel.app",
    "environment": "production",
    "timestamp": "2024-01-15T10:30:00Z",
    "duration": 45230,
    "checks": {
      "preDeployment": [
        {
          "name": "Git Branch Status",
          "status": "passed",
          "message": "Branch is clean"
        }
      ],
      "postDeployment": [
        {
          "name": "Health Check",
          "status": "passed",
          "message": "Application healthy"
        }
      ]
    },
    "logs": [
      "Starting deployment...",
      "All checks passed"
    ],
    "rollbackAvailable": true
  }
}
```

---

## Method 2: Secure Bash Script

Fast and simple deployment using a secure bash script.

### Setup

1. **Create environment file:**

```bash
cp .env.production.example .env.production
```

2. **Edit with your credentials:**

```bash
nano .env.production
```

3. **Deploy:**

```bash
./deploy-secure.sh production
```

### Available Commands

```bash
# Deploy to production
./deploy-secure.sh production

# Deploy to preview/staging
./deploy-secure.sh preview

# Deploy to development
./deploy-secure.sh development
```

### What It Does

1. ✅ Validates Vercel CLI is installed
2. ✅ Checks environment file exists
3. ✅ Verifies project is linked
4. ✅ Syncs environment variables to Vercel
5. ✅ Runs type checks (if npm available)
6. ✅ Deploys to specified environment
7. ✅ Provides deployment status

### Security Features

- 🔒 Reads credentials from `.env` files (never hardcoded)
- 🔒 Checks `.gitignore` includes `.env` files
- 🔒 Confirms before deployment
- 🔒 Masks secrets in output

---

## Method 3: Multi-Agent Coordination

Complete deployment pipeline coordinating GitHub and Vercel agents.

### Features

- ✅ GitHub pre-flight checks (branch status, CI, commits)
- ✅ Vercel environment validation
- ✅ Automated deployment
- ✅ Health checks post-deployment
- ✅ Git tag creation
- ✅ Team notifications
- ✅ Deployment summaries with AI

### Usage

```bash
curl -X POST http://localhost:3001/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "integrated-deployment",
    "input": {
      "project": "admin-portal-production",
      "branch": "main",
      "environment": "production",
      "createTag": true,
      "runHealthChecks": true,
      "notifyTeam": true
    }
  }'
```

### Response Example

```json
{
  "success": true,
  "data": {
    "github": {
      "branch": "main",
      "commit": {
        "sha": "abc123...",
        "message": "Add deployment workflow"
      },
      "ciChecks": { "passing": true },
      "tag": "deploy-production-1234567890"
    },
    "vercel": {
      "deploymentId": "dpl_xyz...",
      "url": "https://admin-portal-production.vercel.app",
      "state": "READY",
      "health": { "healthy": true }
    },
    "duration": 67890,
    "logs": [
      "🚀 Starting integrated deployment...",
      "✓ All checks passed"
    ]
  }
}
```

### Agent Coordination

```bash
# Register agents first
curl -X POST http://localhost:3001/api/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "id": "github-agent",
    "name": "GitHub Integration",
    "capabilities": ["branch-check", "ci-status", "tagging"]
  }'

curl -X POST http://localhost:3001/api/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "id": "vercel-agent",
    "name": "Vercel Deployment",
    "capabilities": ["deploy", "health-check", "rollback"]
  }'

# Then coordinate deployment
curl -X POST http://localhost:3001/api/agents/coordinate \
  -H "Content-Type: application/json" \
  -d '{
    "id": "deploy-2024-01-15",
    "name": "Production Deployment",
    "agents": ["github-agent", "vercel-agent"],
    "tasks": [
      { "agent": "github-agent", "task": "Verify branch and CI" },
      { "agent": "vercel-agent", "task": "Deploy application" },
      { "agent": "vercel-agent", "task": "Run health checks" }
    ]
  }'
```

---

## Environment Variables

### Required Variables

Create `.env.production` with these required variables:

```bash
# Supabase (Required for database & auth)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# API URLs
NEXT_PUBLIC_API_URL=https://your-api.workers.dev
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Admin Contact
ADMIN_PHONE=+13374509998
ADMIN_EMAIL=your-email@domain.com

# Environment
NODE_ENV=production
```

### Optional Variables

```bash
# AI Configuration (for AI workflows)
ANTHROPIC_API_KEY=your_key
AI_DEFAULT_MODEL=claude-3-5-sonnet-20241022
AI_MAX_TOKENS=4096

# Vercel (for deployment automation)
VERCEL_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_project_id
VERCEL_TEAM_ID=your_team_id

# GitHub (for agent coordination)
GITHUB_TOKEN=your_github_token

# Cloudflare (if using Workers)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_KV_NAMESPACE_ID=your_namespace_id

# Stripe (if using payments)
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

### Setting Variables in Vercel Dashboard

1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add each variable:
   - **Key**: Variable name
   - **Value**: Variable value
   - **Environments**: Select production/preview/development

---

## Security Best Practices

### 1. Never Commit Secrets

Add to `.gitignore`:

```gitignore
# Environment files with secrets
.env
.env.local
.env.production
.env.development
.env.preview
.env*.local

# Keep examples
!.env.example
!.env*.example
```

### 2. Use Different Secrets Per Environment

```bash
.env.development    # Development secrets
.env.preview        # Preview/staging secrets
.env.production     # Production secrets (most sensitive)
```

### 3. Rotate Secrets Regularly

- Change API keys quarterly
- Rotate after team member departures
- Update immediately if compromised

### 4. Limit Secret Access

- Use Vercel team roles
- Restrict production access
- Audit secret usage

### 5. Validate Before Deploying

```bash
# Always run dry-run first
curl -X POST http://localhost:3001/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{"workflowId": "secure-deployment", "input": {"dryRun": true, ...}}'
```

---

## Troubleshooting

### Deployment Fails: Missing Environment Variables

**Error:** `Missing environment variables: ANTHROPIC_API_KEY`

**Solution:**
1. Check `.env.production` file exists
2. Verify all required variables are set
3. Re-sync with Vercel: `./deploy-secure.sh production`

### Vercel CLI Not Found

**Error:** `vercel: command not found`

**Solution:**
```bash
npm install -g vercel
```

### Project Not Linked

**Error:** `Vercel project not linked`

**Solution:**
```bash
cd apps/admin-portal-production
vercel link
```

### TypeScript Errors

**Error:** `Type error: ...`

**Solution:**
```bash
npm run build  # Fix errors before deploying
```

### Health Checks Fail

**Error:** `Health checks failed`

**Solution:**
1. Check deployment logs in Vercel dashboard
2. Verify all environment variables are set correctly
3. Test endpoints manually
4. Review application logs

### Rollback Needed

**Using AI Workflow:**
The workflow auto-rolls back on failure if `autoRollback: true`.

**Manual Rollback:**
```bash
# List deployments
vercel ls

# Promote a previous deployment
vercel promote <deployment-url>
```

### Permission Denied

**Error:** `Permission denied: ./deploy-secure.sh`

**Solution:**
```bash
chmod +x deploy-secure.sh
```

---

## Comparison: Which Method to Use?

### Use AI Workflow When:
- ✅ You need validation before deployment
- ✅ You want automated testing
- ✅ You need rollback capabilities
- ✅ You want AI-generated deployment plans
- ✅ You're doing critical production deployments

### Use Bash Script When:
- ✅ You need a quick deployment
- ✅ You're familiar with command-line tools
- ✅ You want full control over the process
- ✅ You're doing frequent development deployments

### Use Multi-Agent When:
- ✅ You need GitHub + Vercel coordination
- ✅ You want comprehensive pre-flight checks
- ✅ You need team notifications
- ✅ You want deployment tagging
- ✅ You're coordinating multiple services

---

## Additional Resources

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [AI Workflows README](./AI_WORKFLOWS_README.md)
- [Quick Start Guide](./QUICK_START.md)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

## Support

For issues or questions:
- Check the logs in Vercel dashboard
- Review this troubleshooting guide
- Check the AI workflow documentation
- Open an issue in the repository

---

**Last Updated:** 2024-01-15
**Version:** 1.0.0
