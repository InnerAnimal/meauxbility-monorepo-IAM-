# 🚀 Vercel Dashboard Deployment Guide

**Issue Identified:** The current Vercel token has read-only access but lacks deployment permissions. The API shows no accessible projects for this token.

**Solution:** Connect your GitHub repository directly to Vercel projects via the dashboard for automatic deployments.

---

## 🎯 Recommended Approach: GitHub Integration

This is the **easiest and most reliable** method. Once set up, every push to your branch automatically deploys!

### ✅ Benefits:
- ✨ Automatic deployments on every git push
- 🔄 Preview deployments for every commit
- 📊 Built-in deployment monitoring
- 🔐 Secure GitHub app integration
- ⚡ No CLI authentication needed

---

## 📋 Step-by-Step Instructions

### Step 1: Connect Repository to Meauxbility.org Project

1. **Go to your Vercel project:**
   - Navigate to: https://vercel.com/meauxbility/your-project-name
   - Or go to: https://vercel.com/dashboard → Select your project
   - Project ID: `prj_AemccTFEjP7ztRJivI4wtysSyEfi`

2. **Open Settings:**
   - Click "Settings" at the top
   - Go to "Git" section in the sidebar

3. **Connect GitHub Repository:**
   - Click "Connect Git Repository"
   - Select "GitHub" as the provider
   - Authorize Vercel GitHub App if prompted
   - Search for: `InnerAnimal/meauxbility-monorepo-IAM-`
   - Click "Connect"

4. **Configure Git Settings:**
   ```
   Production Branch: claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n
   ```
   ✅ Check: "Automatically deploy Production Branch on push"

5. **Configure Build Settings:**
   - Go to "Settings" → "General" → "Build & Development Settings"
   - **Root Directory:** `apps/meauxbility-org`
   - **Framework Preset:** Next.js
   - **Build Command:** (leave default) `next build`
   - **Output Directory:** (leave default) `.next`
   - **Install Command:** (leave default) `npm install`

6. **Save Changes** and click "Redeploy" if prompted

---

### Step 2: Connect Repository to Inner Animals Shop

Repeat the same process for the shop:

1. **Go to your shop project:**
   - Project ID: `prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR`

2. **Connect Git Repository:**
   - Repository: `InnerAnimal/meauxbility-monorepo-IAM-`
   - Production Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`

3. **Configure Build Settings:**
   - **Root Directory:** `apps/inneranimals-shop`
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`

4. **Save and Deploy**

---

### Step 3: Connect Repository to Admin Portal

Repeat for the admin portal:

1. **Go to your admin project:**
   - Project ID: `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY`
   - Domain: iaudodidact.com

2. **Connect Git Repository:**
   - Repository: `InnerAnimal/meauxbility-monorepo-IAM-`
   - Production Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`

3. **Configure Build Settings:**
   - **Root Directory:** `apps/admin-portal-production`
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`

4. **Add Environment Variables** (Settings → Environment Variables):
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

   # Stripe
   STRIPE_SECRET_KEY=sk_test_51... (or sk_live_51...)
   STRIPE_PUBLISHABLE_KEY=pk_test_51... (or pk_live_51...)
   ```

5. **Save and Deploy**

---

## 🎉 Trigger Automatic Deployment

Once connected, simply push your code:

```bash
# Make any small change to trigger deployment
git commit --allow-empty -m "Trigger Vercel deployment"
git push origin claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n
```

Or deployments will trigger automatically on the next code push!

---

## 🔧 Alternative Methods

### Method A: Deploy Hooks (Quick Trigger)

You can trigger deployments via HTTPS without CLI:

```bash
# Meauxbility.org (example - you need the actual deploy hook URL)
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_AemccTFEjP7ztRJivI4wtysSyEfi/DEPLOY_HOOK_KEY

# Inner Animals Shop
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR/DEPLOY_HOOK_KEY

# Admin Portal
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY/DEPLOY_HOOK_KEY
```

**To get Deploy Hook URLs:**
1. Go to Project → Settings → Git
2. Scroll to "Deploy Hooks"
3. Create a new hook for your production branch
4. Copy the URL and use with curl

---

### Method B: Create New Token with Deployment Permissions

If you prefer CLI deployment:

1. **Go to:** https://vercel.com/account/tokens
2. **Create New Token:**
   - Name: "Meauxbility Deployment - Full Access"
   - Scope: **Full Account** (or select specific projects)
   - Expiration: Choose appropriate duration
3. **Copy the token** (starts with `vercel_...` or similar)
4. **Update `.env.sh`:**
   ```bash
   export VERCEL_TOKEN="your_new_token_here"
   ```
5. **Deploy:**
   ```bash
   source .env.sh
   vercel deploy --prod --token $VERCEL_TOKEN
   ```

---

## 📊 Monitoring Deployments

### View Deployment Status

1. **Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Click on each project to see deployment status

2. **GitHub Integration:**
   - Check status in GitHub commit checks
   - Green checkmark = deployed successfully
   - Red X = deployment failed (click for logs)

3. **Deployment URLs:**
   After successful deployment, you'll get:
   - **Production URL:** Your custom domain (e.g., meauxbility.org)
   - **Vercel URL:** Auto-generated URL (e.g., your-project.vercel.app)

---

## 🔍 Troubleshooting

### "Build failed: Cannot find module"

**Solution:** Check Root Directory is set correctly
- Meauxbility: `apps/meauxbility-org`
- Shop: `apps/inneranimals-shop`
- Admin: `apps/admin-portal-production`

### "No page found at /"

**Solution:** Verify Framework Preset is "Next.js" and Output Directory is `.next`

### "Environment variable not found"

**Solution:** Add environment variables in Settings → Environment Variables
- Select "Production" environment
- Add all required variables from `.env.sh.example`

### Deployments not triggering

**Solution:**
- Verify Production Branch matches: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
- Check "Auto-deploy" is enabled in Git settings
- Try manual deploy: Project → Deployments → Redeploy

---

## ✅ Verification Checklist

After setup, verify each project:

### Meauxbility.org
- [ ] GitHub repo connected
- [ ] Root Directory: `apps/meauxbility-org`
- [ ] Production branch set correctly
- [ ] Build succeeds
- [ ] Site accessible at production URL

### Inner Animals Shop
- [ ] GitHub repo connected
- [ ] Root Directory: `apps/inneranimals-shop`
- [ ] Production branch set correctly
- [ ] Build succeeds
- [ ] Site accessible at production URL

### Admin Portal
- [ ] GitHub repo connected
- [ ] Root Directory: `apps/admin-portal-production`
- [ ] Production branch set correctly
- [ ] Environment variables added (Supabase + Stripe)
- [ ] Build succeeds
- [ ] Site accessible at iaudodidact.com

---

## 🎯 Current Status

**Repository:** `InnerAnimal/meauxbility-monorepo-IAM-`
**Branch:** `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
**Latest Commit:** All changes pushed and ready

**Token Issue:** Current token (`vck_4BMqveAjanteOohRofOoWnyHnqi98PGVhUM9a64k62GRZKGdgP35Slto`) has read-only access:
- ✅ Works for: `vercel whoami`
- ❌ Fails for: `vercel deploy`, `vercel link`
- 📊 API Response: Empty projects list

**Recommended Solution:** Connect via Vercel Dashboard (GitHub integration) - this is the most reliable method and doesn't require CLI tokens.

---

## 🚀 Quick Start Command (Once Dashboard is Connected)

```bash
# Simply push to trigger deployment
git push origin claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n

# Or make an empty commit to force trigger
git commit --allow-empty -m "🚀 Deploy to production"
git push origin claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n
```

---

## 📞 Next Steps

1. **Connect Projects in Vercel Dashboard** (5-10 minutes per project)
2. **Configure Root Directories** (critical for monorepo)
3. **Add Environment Variables** (for admin portal)
4. **Push to GitHub** (triggers automatic deployment)
5. **Verify Deployments** (check URLs and functionality)

---

**Created:** October 30, 2024
**Status:** Ready for Dashboard Configuration
**Estimated Setup Time:** 15-20 minutes total

Once connected, all future deployments are automatic! 🎉
