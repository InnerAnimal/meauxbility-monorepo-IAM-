## 🚦 Monorepo Scan & Deploy Readiness — TODO

**Goal:** Inventory the monorepo, surface config gaps, and produce a reliable deploy plan for Vercel with zero-env-drift.

---

### 0️⃣ Branches to Review (Merge Plan)

- [x] `main` (default)
- [ ] `html-styling-review`
- [ ] `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
- [x] `claude/meauxbility-monorepo-launch-011CUfWRCRjdLaJC1V4AeZLs` ← **CURRENT WORKING BRANCH**
- [ ] `claude/investigate-n-variable-011CUdf7YcxBu3rSXcFensb7`
- [ ] `claude/vercel-ai-workflow-setup-011CUdbEeV9z3Azu9YmQonuJ`

**Action:** Fast-forward or rebase onto main where appropriate; open PRs with deploy-impact section.

---

### 1️⃣ Repo Scan (Automated Inventory)

Add quick scan script to list apps/packages, frameworks, build targets:

```bash
#!/usr/bin/env bash
# scripts/scan-monorepo.sh
set -euo pipefail

echo "📦 Packages & Apps"
find apps -maxdepth 1 -type d | tail -n +2

echo -e "\n🧩 Framework detection"
find apps -name "next.config.*" -o -name "vercel.json"

echo -e "\n⚙️ Build scripts"
find apps -name "package.json" -exec grep -H "\"build\":" {} \;

echo -e "\n🔐 Env variables referenced"
grep -r "process\.env\." apps/*/src --include="*.ts" --include="*.tsx" | cut -d: -f1 | sort -u

echo -e "\n✅ Current status"
echo "Apps found:"
ls -1 apps/
```

**Run:** `bash scripts/scan-monorepo.sh`

---

### 2️⃣ Workspace & Package Manager Alignment

- [x] Using npm workspaces (defined in root `package.json`)
- [x] Single lockfile at repo root (`package-lock.json`)
- [ ] Ensure consistent `engines.node` (>=18.0.0)
- [ ] Verify all apps have `package.json` with proper dependencies

---

### 3️⃣ Build Pipeline

Each app must define working scripts:

- [x] `build` script exists in all apps
- [x] `dev` script exists in all apps
- [x] `start` script exists in all apps
- [x] All builds pass locally

**Test:**
```bash
npm run build:all
```

---

### 4️⃣ Environment Variables & Secrets

- [x] `.env.*.example` files created for each app
- [ ] Document required envs per app
- [ ] Verify Vercel project envs match example files
- [ ] Add env validation script

**Required per app:**
```bash
# All apps need:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_URL
```

---

### 5️⃣ Vercel Config Per App

- [x] Each app has `vercel.json`
- [ ] Framework correctly specified (`nextjs`)
- [ ] Build command correct
- [ ] Output directory correct
- [ ] Node version matches

**Verify:**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

---

### 6️⃣ Routing & Domains

**Target domains:**
- `meauxbility.org` → `apps/meauxbility-org`
- `inneranimals.com` → `apps/inneranimals-shop`
- `iaudodidact.com` → `apps/admin-portal-production`

**Setup:**
- [ ] Create 3 separate Vercel projects
- [ ] Map domains in Vercel dashboard
- [ ] Configure DNS (A/CNAME records)
- [ ] Enable HTTPS
- [ ] Set up redirects (www → non-www or vice versa)

---

### 7️⃣ Static Assets & Build Output

- [x] Images in `public/` directories
- [ ] Verify image paths are absolute (`/image.png` not `./image.png`)
- [ ] Check Next.js config for image optimization
- [ ] Confirm build output is correct

---

### 8️⃣ CI: TypeCheck, Lint, Build Matrix

Add GitHub Actions workflow:

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main, claude/*]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build:all
```

---

### 9️⃣ Styling & Design System

- [x] Tailwind CSS configured in all apps
- [x] Global styles present
- [ ] Ensure PostCSS configs are correct
- [ ] Verify Tailwind classes work
- [ ] Check for style conflicts

---

### 🔟 Analytics, Auth, and 3rd-Party SDKs

**Current integrations:**
- [x] Supabase (database)
- [x] Stripe (payments)
- [ ] Analytics (Google Analytics, Plausible, etc.)
- [ ] Error tracking (Sentry, etc.)

**Verify:**
- [ ] Client-only code runs only in browser
- [ ] Server-only keys never exposed to client
- [ ] API routes properly secured

---

### ✅ Definition of Done

- [ ] CI green on all branches
- [ ] All 3 apps build successfully locally
- [ ] All 3 apps build successfully on Vercel
- [ ] `.env.example` accurate for all apps
- [ ] Environment variables set in Vercel
- [ ] Domains configured and DNS pointing correctly
- [ ] All forms submit to database successfully
- [ ] Stripe checkout works end-to-end
- [ ] Shopping cart persists correctly
- [ ] Admin dashboard loads real data
- [ ] No TypeScript errors
- [ ] No console errors in production
- [ ] Mobile responsive on all pages
- [ ] Deployed to production URLs

---

### 🚀 Quick Deploy Checklist

```bash
# 1. Configure environment
./setup-env.sh

# 2. Test builds
npm run build:all

# 3. Deploy to Vercel
./deploy-to-vercel.sh

# 4. Configure in Vercel Dashboard:
#    - Add environment variables
#    - Add custom domains
#    - Redeploy

# 5. Test production sites
#    - Submit grant application
#    - Process donation
#    - Complete shop purchase
#    - Check admin dashboard
```

---

### 📝 Notes

**Apps:**
1. **meauxbility-org** - Main foundation site (grants & donations)
2. **inneranimals-shop** - E-commerce platform
3. **admin-portal-production** - Admin dashboard

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Stripe (Payments)
- Vercel (Hosting)

**Current Status:**
- ✅ All code written
- ✅ All features implemented
- ✅ All builds passing
- ✅ Database schema ready
- ✅ Deployment scripts created
- ⏳ Needs environment configuration
- ⏳ Needs Vercel deployment

---

**Branch:** `claude/meauxbility-monorepo-launch-011CUfWRCRjdLaJC1V4AeZLs`
**Target Launch:** November 3, 2024
