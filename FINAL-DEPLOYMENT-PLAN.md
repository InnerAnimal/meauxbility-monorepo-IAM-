# 🚀 FINAL DEPLOYMENT PLAN - With Your Vercel Projects

Complete deployment strategy using your existing Vercel projects.

---

## 📋 YOUR VERCEL PROJECT MAPPING

| Site | Project ID | Current Status | Will Deploy |
|------|-----------|----------------|-------------|
| **Admin Portal** | `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY` | Deployed at iaudodidact.com | `apps/admin-portal-production` |
| **Meauxbility.org** | `prj_AemccTFEjP7ztRJivI4wtysSyEfi` | Ready | `apps/meauxbility-org` |
| **Inner Animals** | `prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR` | Ready | `apps/inneranimals-shop` |
| **Unknown** | `prj_GubWcc9t8oer7P24lwLnzO8nWWZN` | Unknown | TBD |

**Deploy Hooks Available:**
- Meauxbility.org: `https://api.vercel.com/v1/integrations/deploy/prj_AemccTFEjP7ztRJivI4wtysSyEfi/yRUBfnYlex`
- Unknown Project: `https://api.vercel.com/v1/integrations/deploy/prj_GubWcc9t8oer7P24lwLnzO8nWWZN/OMkMfTTux1`

---

## 🎯 DEPLOYMENT METHOD 1: Via Vercel CLI (Recommended)

### Prerequisites

```bash
# Install Vercel CLI (if not already)
npm install -g vercel

# Login
vercel login
```

### Deploy Each Site

#### 1️⃣ Deploy Admin Portal

```bash
# Navigate to admin portal directory
cd /path/to/meauxbility-monorepo-IAM-/apps/admin-portal-production

# Link to existing project
vercel link --yes \
  --project-id prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY

# Deploy to production
vercel --prod

# ✅ Result: https://iaudodidact.com (your existing domain)
```

#### 2️⃣ Deploy Meauxbility.org

```bash
# Navigate to meauxbility.org directory
cd ../meauxbility-org

# Link to existing project
vercel link --yes \
  --project-id prj_AemccTFEjP7ztRJivI4wtysSyEfi

# Deploy to production
vercel --prod

# ✅ Result: https://[project-name].vercel.app
```

#### 3️⃣ Deploy Inner Animals Shop

```bash
# Navigate to shop directory
cd ../inneranimals-shop

# Link to existing project
vercel link --yes \
  --project-id prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR

# Deploy to production
vercel --prod

# ✅ Result: https://[project-name].vercel.app
```

### All-in-One Script

Save this as `deploy-to-existing-projects.sh`:

```bash
#!/bin/bash

echo "🚀 Deploying to Existing Vercel Projects"
echo "==========================================="

REPO_ROOT=$(pwd)

# Deploy Admin Portal
echo ""
echo "📊 Deploying Admin Portal..."
cd "$REPO_ROOT/apps/admin-portal-production"
vercel link --yes --project-id prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY
vercel --prod
ADMIN_STATUS=$?

# Deploy Meauxbility.org
echo ""
echo "🏛️  Deploying Meauxbility.org..."
cd "$REPO_ROOT/apps/meauxbility-org"
vercel link --yes --project-id prj_AemccTFEjP7ztRJivI4wtysSyEfi
vercel --prod
MEAUX_STATUS=$?

# Deploy Inner Animals
echo ""
echo "🛍️  Deploying Inner Animals Shop..."
cd "$REPO_ROOT/apps/inneranimals-shop"
vercel link --yes --project-id prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR
vercel --prod
SHOP_STATUS=$?

cd "$REPO_ROOT"

echo ""
echo "============================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "============================================"
echo ""
echo "Status:"
echo "  Admin Portal: $([ $ADMIN_STATUS -eq 0 ] && echo '✅ Success' || echo '❌ Failed')"
echo "  Meauxbility.org: $([ $MEAUX_STATUS -eq 0 ] && echo '✅ Success' || echo '❌ Failed')"
echo "  Inner Animals: $([ $SHOP_STATUS -eq 0 ] && echo '✅ Success' || echo '❌ Failed')"
echo ""
echo "🌐 Check your Vercel dashboard for live URLs!"
```

Make it executable and run:

```bash
chmod +x deploy-to-existing-projects.sh
./deploy-to-existing-projects.sh
```

---

## 🎯 DEPLOYMENT METHOD 2: Via Deploy Hooks (Instant)

Deploy hooks trigger deployments without CLI. But **CRITICAL**: You must first ensure Root Directories are set!

### Trigger Deployments

```bash
# Trigger Meauxbility.org deployment
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_AemccTFEjP7ztRJivI4wtysSyEfi/yRUBfnYlex

# Trigger Unknown Project deployment
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_GubWcc9t8oer7P24lwLnzO8nWWZN/OMkMfTTux1
```

**⚠️ WARNING:** Deploy hooks will only work if:
1. Root directories are already configured
2. Git branch is correctly set
3. Build settings are proper

---

## 🎯 DEPLOYMENT METHOD 3: Via Vercel Dashboard

### For Each Project:

#### Admin Portal (prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY)

1. Go to: https://vercel.com/dashboard
2. Find your project with iaudodidact.com domain
3. **Settings → General**
   - Root Directory: `apps/admin-portal-production` ⚠️
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Settings → Git**
   - Production Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
5. **Settings → Environment Variables**
   - Add all required env vars (see below)
6. **Deployments → Redeploy**

#### Meauxbility.org (prj_AemccTFEjP7ztRJivI4wtysSyEfi)

1. Find this project in dashboard
2. **Settings → General**
   - Root Directory: `apps/meauxbility-org` ⚠️
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Settings → Git**
   - Production Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
4. **Deployments → Redeploy**

#### Inner Animals (prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR)

1. Find this project in dashboard
2. **Settings → General**
   - Root Directory: `apps/inneranimals-shop` ⚠️
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Settings → Git**
   - Production Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
4. **Deployments → Redeploy**

---

## 🔐 Environment Variables (Admin Portal Only)

Add these to `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE=eyJhbGci...
STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
```

### How to Add:

**Via Dashboard:**
1. Project Settings → Environment Variables
2. Click "Add New"
3. Enter name and value
4. Select "Production"
5. Save and redeploy

**Via CLI:**
```bash
cd apps/admin-portal-production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste value when prompted
# Repeat for each variable
```

---

## ⚠️ CRITICAL PRE-DEPLOYMENT CHECKLIST

Before deploying, verify these settings for EACH project:

### All Three Projects:

- [ ] **Root Directory is set correctly:**
  - Admin: `apps/admin-portal-production`
  - Meaux: `apps/meauxbility-org`
  - Shop: `apps/inneranimals-shop`

- [ ] **Git Configuration:**
  - Connected to: `InnerAnimal/meauxbility-monorepo-IAM-`
  - Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`

- [ ] **Build Settings:**
  - Framework: Next.js (auto-detected)
  - Build Command: `npm run build`
  - Output Directory: `.next`
  - Install Command: `npm install`

### Admin Portal Only:

- [ ] Environment variables added (5 total)
- [ ] Variables are set for "Production" environment

---

## 🌐 Expected Results

After successful deployment:

### 1. Admin Portal (iaudodidact.com)
```
https://iaudodidact.com
```
**What you'll see:**
- Purple gradient background
- Dashboard header: "Meauxbility Admin Portal"
- Three stat cards:
  - Total Grants: 50+
  - Pending Applications: 12
  - Funds Distributed: $250K+
- Recent Applications section
- Quick Actions buttons

### 2. Meauxbility.org
```
https://[your-vercel-url].vercel.app
```
**What you'll see:**
- Gradient hero: purple → blue → indigo
- Headline: "Transform Your Pain into Purpose"
- Subtext: "Join Louisiana's warriors..."
- 501(c)(3) EIN: 33-4214907
- Two buttons: "Apply for Grant" | "Donate Now"
- Mission metrics section
- Service cards (3 columns)
- Impact section with purple gradient
- Grant application form
- Footer

### 3. Inner Animals Shop
```
https://[your-vercel-url].vercel.app
```
**What you'll see:**
- Navigation bar: INNER ANIMALS (black background)
- Links: Home | Shop | Cart | Mission
- Hero section: black → purple gradient
- "UNLEASH YOUR INNER WARRIOR" headline
- "Shop Collection" button
- Featured products grid (3 columns):
  - Warrior Tee ($35)
  - Resilience Hoodie ($65)
  - Victory Cap ($25)
- Product cards with purple accents
- Mission section
- Footer

---

## 🔍 Verify Deployment Success

After deploying, check:

```bash
# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Inspect specific deployment
vercel inspect [deployment-url]
```

Or visit each URL and verify:
- [ ] Page loads without errors
- [ ] Styles are applied correctly
- [ ] No 404 errors
- [ ] Console is error-free (F12 → Console)
- [ ] Mobile responsive works

---

## 🎨 Deployment Timeline

**Estimated Total Time: 10-15 minutes**

| Step | Action | Time |
|------|--------|------|
| 1 | Configure Root Directories (if needed) | 2 min |
| 2 | Set Environment Variables (admin only) | 2 min |
| 3 | Deploy Admin Portal | 2-3 min |
| 4 | Deploy Meauxbility.org | 2-3 min |
| 5 | Deploy Inner Animals | 2-3 min |
| 6 | Verify all sites | 2 min |

---

## 🆘 Troubleshooting

### Build fails: "Couldn't find any pages or app directory"

**Cause:** Root Directory not set
**Fix:** Settings → General → Root Directory → Set to `apps/[app-name]`

### Build succeeds but site shows 404

**Cause:** Output directory mismatch
**Fix:** Settings → General → Output Directory → Set to `.next`

### Environment variables not working

**Cause:** Not redeployed after adding
**Fix:** Add variables → Deployments → Redeploy

### Wrong code is deploying

**Cause:** Wrong git branch
**Fix:** Settings → Git → Production Branch → Set to our branch

---

## ✅ POST-DEPLOYMENT

After all three sites are live:

1. **Test each site thoroughly**
2. **Share URLs** with stakeholders
3. **Configure custom domains** (optional):
   - meauxbility.org → Meaux project
   - inneranimals.com → Shop project
   - iaudodidact.com → Already configured! ✓

4. **Set up monitoring**
5. **Plan content updates**

---

## 🎉 Ready to Deploy!

**Choose your method:**
- **CLI (Fastest):** Use the deployment script above
- **Dashboard (Visual):** Follow step-by-step guide
- **Deploy Hooks (Advanced):** Trigger via curl

**All code is ready. All builds are tested. Let's launch! 🚀**

---

**Created:** October 30, 2024
**Status:** Ready for Production Deployment
**Branch:** `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
