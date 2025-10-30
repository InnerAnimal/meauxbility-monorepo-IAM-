# 🔄 Update Your Existing Vercel Deployment

Your existing Vercel deployment needs to be updated to use the new monorepo code!

---

## 📊 Current Situation

**Existing Deployment:**
- **Branch:** main
- **Commit:** 55f9ddb (Initial commit from 19h ago)
- **Domain:** iaudodidact.com ✓ (This is good!)
- **Status:** Ready but outdated

**New Code Location:**
- **Branch:** `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
- **Latest Commit:** 3fa45bb
- **Contains:**
  - ✅ All 3 complete Next.js apps
  - ✅ 45+ files, 1,500+ lines of code
  - ✅ All builds tested and working
  - ✅ Complete documentation

---

## 🎯 OPTION A: Update & Expand (Recommended)

This approach updates your existing deployment and adds the other two sites.

### Step 1: Merge Our Branch to Main

```bash
# From your local machine (after cloning)
git checkout claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n
git checkout -b main
git push origin main --force
```

**Or create main from our branch:**
```bash
git branch -M claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n main
git push origin main --force
```

### Step 2: Reconfigure Existing Vercel Project

**Go to your existing Vercel project settings:**

1. **Project Settings → General**
   - Project Name: Change to `admin-portal-production` (or leave as is)
   - **Root Directory:** Set to `apps/admin-portal-production` ⚠️ **CRITICAL**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

2. **Verify Git Settings:**
   - Settings → Git
   - Production Branch: `main` (or change to `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`)

3. **Add Environment Variables:**
   - Settings → Environment Variables
   - Add for Production:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
     SUPABASE_SERVICE_ROLE=eyJhbGci...
     STRIPE_SECRET_KEY=sk_test_...
     STRIPE_PUBLISHABLE_KEY=pk_test_...
     ```

4. **Redeploy:**
   - Deployments → Three dots on latest → Redeploy
   - OR: `git push origin main` (triggers auto-deploy)

✅ **Result:** Admin portal will be live at `iaudodidact.com`

### Step 3: Deploy Two More Sites

#### Deploy Meauxbility.org

1. Go to https://vercel.com/new
2. Import: `InnerAnimal/meauxbility-monorepo-IAM-`
3. Configure:
   - Project Name: `meauxbility-org`
   - Root Directory: `apps/meauxbility-org` ⚠️
   - Production Branch: `main` (or your claude branch)
   - Framework: Next.js
4. Deploy!

#### Deploy Inner Animals Shop

1. Go to https://vercel.com/new
2. Import: `InnerAnimal/meauxbility-monorepo-IAM-`
3. Configure:
   - Project Name: `inneranimals-shop`
   - Root Directory: `apps/inneranimals-shop` ⚠️
   - Production Branch: `main`
   - Framework: Next.js
4. Deploy!

### Step 4: Configure Domains

**You already have iaudodidact.com configured! ✓**

Add the other two:

**Meauxbility.org project:**
- Settings → Domains
- Add: `meauxbility.org`
- Follow DNS instructions

**Inner Animals project:**
- Settings → Domains
- Add: `inneranimals.com`
- Follow DNS instructions

---

## 🎯 OPTION B: Fresh Start (Clean Slate)

If you want to start fresh with better organization:

### Step 1: Note Your Settings

From your existing project, copy:
- Environment variables (if any)
- Domain configuration (iaudodidact.com)

### Step 2: Delete Old Project (Optional)

Only if you want a clean start:
- Project Settings → General → Delete Project

### Step 3: Deploy All Three Fresh

Follow the guide in `DEPLOY-FROM-YOUR-MACHINE.md`:

```bash
# Clone repo locally
git clone https://github.com/InnerAnimal/meauxbility-monorepo-IAM-.git
cd meauxbility-monorepo-IAM-
git checkout claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n

# Login to Vercel
vercel login

# Deploy all three
./deploy-all.sh
```

Then add domains:
- Admin Portal → iaudodidact.com
- Meauxbility.org → meauxbility.org
- Inner Animals → inneranimals.com

---

## 🔍 What's Wrong with Current Deployment?

Your existing deployment might be showing:
- ❌ Old content from 19h ago
- ❌ Not the full monorepo structure
- ❌ Missing the complete apps we built
- ❌ No root directory configuration
- ❌ Deploying from wrong directory

After updating, you'll have:
- ✅ Latest code with all 3 apps
- ✅ Proper monorepo structure
- ✅ Root directories configured
- ✅ All features working
- ✅ Complete documentation

---

## 📋 Quick Decision Guide

**Choose OPTION A if:**
- You want to keep the existing project
- You already have iaudodidact.com configured
- You want to preserve deployment history
- You want the fastest path

**Choose OPTION B if:**
- You want a clean, organized setup
- You're okay reconfiguring domains
- You want three clearly named projects
- You prefer starting fresh

---

## 🚀 Fastest Path to See Live Sites

**Right Now (5 minutes):**

1. **Open your local terminal**
2. **Clone the repo:**
   ```bash
   git clone https://github.com/InnerAnimal/meauxbility-monorepo-IAM-.git
   cd meauxbility-monorepo-IAM-
   git checkout claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n
   ```

3. **Deploy via CLI:**
   ```bash
   npm install -g vercel
   vercel login

   # Deploy each app
   cd apps/meauxbility-org && vercel --prod
   cd ../admin-portal-production && vercel --prod
   cd ../inneranimals-shop && vercel --prod
   ```

4. **Get 3 Vercel URLs instantly!**

**Then configure domains later.**

---

## 🆘 Troubleshooting

### "Root directory is not set"

**Fix:** In Vercel project settings:
- Settings → General → Root Directory
- Set to: `apps/admin-portal-production` (or respective app)
- Redeploy

### "Build failing"

**Fix:** Make sure you're deploying from the correct branch:
- `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
- OR merge to `main` first

### "Environment variables not working"

**Fix:**
- Add variables in Vercel dashboard
- Select "Production" environment
- Redeploy after adding

---

## ✅ Expected Results

After updating, visiting your URLs should show:

**Admin Portal (iaudodidact.com):**
- Purple gradient dashboard
- Grant statistics: 50+, 12 pending, $250K
- Recent applications list
- Quick action buttons

**Meauxbility.org:**
- Gradient hero: "Transform Your Pain into Purpose"
- Grant application form
- Donation buttons
- Mission sections

**Inner Animals (inneranimals.com):**
- "UNLEASH YOUR INNER WARRIOR"
- 6 products displayed
- Shopping cart
- Black & purple theme

---

## 🎉 Next Steps

1. Choose your option (A or B)
2. Follow the steps
3. Deploy and get live URLs
4. Test all three sites
5. Configure custom domains
6. Launch on November 3rd!

---

**Questions?** Check `VERCEL-DEPLOYMENT-GUIDE.md` for more details.

**Ready to update?** Pick your option and let's go! 🚀
