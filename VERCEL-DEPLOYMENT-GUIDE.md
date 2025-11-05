# 🚀 Vercel Deployment Guide - Meauxbility Monorepo

Complete guide for deploying all three applications to Vercel.

---

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: Vercel Dashboard (Recommended)](#method-1-vercel-dashboard-recommended)
3. [Method 2: Vercel CLI](#method-2-vercel-cli)
4. [Environment Variables](#environment-variables)
5. [Custom Domains](#custom-domains)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- [ ] Vercel account (sign up at https://vercel.com)
- [ ] GitHub repository access
- [ ] Supabase project set up
- [ ] Stripe account configured
- [ ] Domain DNS access (for custom domains)

---

## Method 1: Vercel Dashboard (Recommended)

This is the easiest method for monorepo deployments.

### Step 1: Connect Repository

1. Go to https://vercel.com/dashboard
2. Click **"Add New..." → "Project"**
3. Import your Git repository: `InnerAnimal/meauxbility-monorepo-IAM-`
4. Authorize Vercel to access the repository

### Step 2: Deploy Meauxbility.org

1. **Project Name:** `meauxbility-org`
2. **Framework Preset:** Next.js
3. **Root Directory:** `apps/meauxbility-org` ⚠️ **IMPORTANT**
4. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next` (leave default)
   - Install Command: `npm install`
5. **Environment Variables:** None needed for this app
6. Click **"Deploy"**

### Step 3: Deploy Admin Portal

1. Return to dashboard and click **"Add New..." → "Project"**
2. Import the **same repository** again
3. **Project Name:** `admin-portal-production`
4. **Framework Preset:** Next.js
5. **Root Directory:** `apps/admin-portal-production` ⚠️ **IMPORTANT**
6. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
7. **Environment Variables:** (See [Environment Variables](#environment-variables) section)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
8. Click **"Deploy"**

### Step 4: Deploy Inner Animals Shop

1. Return to dashboard and click **"Add New..." → "Project"**
2. Import the **same repository** again
3. **Project Name:** `inneranimals-shop`
4. **Framework Preset:** Next.js
5. **Root Directory:** `apps/inneranimals-shop` ⚠️ **IMPORTANT**
6. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
7. **Environment Variables:**
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (optional for future)
8. Click **"Deploy"**

### Step 5: Configure Custom Domains

After successful deployments:

#### For Meauxbility.org
1. Go to project settings → Domains
2. Add domain: `meauxbility.org`
3. Add domain: `www.meauxbility.org` (redirect to main)
4. Follow DNS configuration instructions

#### For Admin Portal
1. Go to project settings → Domains
2. Add domain: `iaudodidact.com`
3. Add domain: `www.iaudodidact.com` (redirect to main)
4. Follow DNS configuration instructions

#### For Inner Animals Shop
1. Go to project settings → Domains
2. Add domain: `inneranimals.com`
3. Add domain: `www.inneranimals.com` (redirect to main)
4. Follow DNS configuration instructions

---

## Method 2: Vercel CLI

### Prerequisites

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login
```

### Deploy Each App

#### Deploy Meauxbility.org

```bash
cd apps/meauxbility-org
vercel --prod
```

Follow the prompts:
- Set up and deploy: **Y**
- Which scope: Select your account/team
- Link to existing project: **N**
- Project name: `meauxbility-org`
- Directory: `./` (already in the right directory)
- Override settings: **N**

#### Deploy Admin Portal

```bash
cd ../admin-portal-production
vercel --prod
```

**Important:** Add environment variables first via:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_PUBLISHABLE_KEY production
```

#### Deploy Inner Animals Shop

```bash
cd ../inneranimals-shop
vercel --prod
```

### Or Use the Automated Script

```bash
# From repository root
./deploy-all.sh
```

**Note:** You must be authenticated first (`vercel login`)

---

## Environment Variables

### Supabase Variables

Get these from your Supabase project dashboard (Settings → API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Stripe Variables

Get these from your Stripe dashboard (Developers → API keys):

```env
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
STRIPE_PUBLISHABLE_KEY=pk_live_... (or pk_test_... for testing)
```

### Optional Variables

```env
GITHUB_TOKEN=ghp_... (for GitHub integrations)
OPENAI_API_KEY=sk-... (for AI features)
ANTHROPIC_API_KEY=sk-ant-... (for Claude AI features)
```

### Adding Environment Variables via Dashboard

1. Go to Project → Settings → Environment Variables
2. Click "Add New"
3. Enter **Name** and **Value**
4. Select **Production** environment
5. Click "Save"
6. **Redeploy** the project for changes to take effect

### Adding Environment Variables via CLI

```bash
cd apps/admin-portal-production

# Add one variable at a time
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste the value when prompted

# Or import from .env file
vercel env pull .env.production
```

---

## Custom Domains

### DNS Configuration Options

#### Option 1: Use Vercel Nameservers (Recommended)

1. In your domain registrar, set nameservers to:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
2. Add domain in Vercel dashboard
3. DNS is automatically configured

#### Option 2: Use Your Own DNS

1. Add an A record:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

2. Add a CNAME for www:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. Wait for DNS propagation (can take 24-48 hours)

### Verify Domain Configuration

```bash
# Check DNS propagation
dig meauxbility.org
dig iaudodidact.com
dig inneranimals.com

# Or use online tools
https://www.whatsmydns.net
```

---

## Troubleshooting

### Build Failures

#### Issue: "Couldn't find any `pages` or `app` directory"

**Solution:** Ensure Root Directory is set correctly in project settings:
- Meauxbility.org: `apps/meauxbility-org`
- Admin Portal: `apps/admin-portal-production`
- Inner Animals Shop: `apps/inneranimals-shop`

#### Issue: "Module not found" errors

**Solution:** Clear cache and redeploy:
1. Project Settings → General
2. Scroll to "Build & Development Settings"
3. Clear cache
4. Trigger new deployment

#### Issue: Environment variables not working

**Solution:**
1. Verify variables are set for "Production" environment
2. Redeploy after adding variables (they don't apply to existing deployments)
3. Check variable names (they're case-sensitive)

### Deployment Failures

#### Issue: "Error: No existing credentials found"

**Solution:**
```bash
vercel login
# Or set token:
export VERCEL_TOKEN=your_token_here
```

#### Issue: Build timeout

**Solution:** Contact Vercel support or upgrade plan for longer build times

### Domain Issues

#### Issue: Domain not working after 48 hours

**Solution:**
1. Verify DNS records are correct
2. Check domain registrar hasn't blocked the change
3. Use `dig` command to check propagation
4. Contact domain registrar support

#### Issue: SSL certificate errors

**Solution:**
- Wait 1-2 hours after adding domain
- Vercel automatically provisions Let's Encrypt certificates
- Check Project → Settings → Domains for certificate status

---

## Post-Deployment Checklist

After successful deployment:

- [ ] All three sites are accessible via their Vercel URLs
- [ ] Custom domains are configured
- [ ] SSL certificates are active (https:// works)
- [ ] Environment variables are set (Admin Portal)
- [ ] Test form submissions work
- [ ] Database connections work (Supabase)
- [ ] Payment processing works (Stripe test mode)
- [ ] All navigation links work
- [ ] Mobile responsive design looks good
- [ ] No console errors in browser dev tools

---

## Monitoring & Maintenance

### View Deployment Logs

```bash
# List deployments
vercel ls

# View logs for a specific deployment
vercel logs [deployment-url]
```

### Redeploy

```bash
# Redeploy from CLI
cd apps/[app-name]
vercel --prod

# Or trigger from dashboard
# Project → Deployments → Three dots → Redeploy
```

### Roll Back

```bash
# From dashboard:
# Deployments → Find previous successful deployment → Promote to Production
```

---

## Support

### Vercel Support
- Dashboard: https://vercel.com/support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

### Monorepo Issues
- See: https://vercel.com/docs/monorepos

### Project Contacts
- Meauxbility Foundation: sam@meauxbility.org
- GitHub: InnerAnimal/meauxbility-monorepo-IAM-

---

**Last Updated:** October 30, 2024
**Status:** Ready for Production Deployment
