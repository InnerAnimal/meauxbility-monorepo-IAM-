# 🚀 Deploy Using Your Existing Vercel Project

You already have a Vercel project! Let's update it and deploy the other two sites.

---

## 📋 Your Existing Project

**Project ID:** `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY`
**Current Domain:** iaudodidact.com
**Status:** Deployed (19h ago from old code)

---

## 🎯 Three-Step Deployment Plan

### Step 1: Update Existing Project for Admin Portal

Your existing project should become the **Admin Portal**.

#### Via Vercel Dashboard:

1. **Go to:** https://vercel.com/dashboard
2. **Find your project** (currently showing iaudodidact.com)
3. **Update Settings:**
   - Settings → General → **Root Directory:** `apps/admin-portal-production` ⚠️ CRITICAL
   - Settings → General → Build Command: `npm run build`
   - Settings → General → Output Directory: `.next`

4. **Update Git Branch:**
   - Settings → Git
   - Production Branch: Change to `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
   - OR: Merge our branch to main first

5. **Add Environment Variables:**
   - Settings → Environment Variables → Add New
   - Select: **Production**
   - Add these:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
     SUPABASE_SERVICE_ROLE=eyJhbGci...
     STRIPE_SECRET_KEY=sk_test_...
     STRIPE_PUBLISHABLE_KEY=pk_test_...
     ```

6. **Trigger Deployment:**
   - Deployments tab → Three dots → Redeploy
   - OR push a commit to trigger auto-deploy

✅ **Result:** Your admin portal will be live at `iaudodidact.com`

#### Via CLI (Faster):

```bash
# From your local machine, after cloning
cd /path/to/meauxbility-monorepo-IAM-
git checkout claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n

# Link to your existing project
cd apps/admin-portal-production
vercel link --project-id prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY

# Add environment variables (one-time)
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_PUBLISHABLE_KEY production

# Deploy!
vercel --prod
```

---

### Step 2: Deploy Meauxbility.org (New Project)

Create a second project for the main nonprofit site.

#### Via Dashboard:

1. **Go to:** https://vercel.com/new
2. **Import:** `InnerAnimal/meauxbility-monorepo-IAM-`
3. **Configure:**
   - Project Name: `meauxbility-org`
   - Framework: Next.js
   - **Root Directory:** `apps/meauxbility-org` ⚠️
   - Production Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - No environment variables needed
4. **Click Deploy**

✅ **Result:** You'll get a URL like `https://meauxbility-org.vercel.app`

#### Via CLI:

```bash
cd apps/meauxbility-org
vercel --prod

# Answer prompts:
# - Set up and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - Project name? meauxbility-org
# - Directory? ./
# - Override settings? N
```

---

### Step 3: Deploy Inner Animals Shop (New Project)

Create a third project for the e-commerce site.

#### Via Dashboard:

1. **Go to:** https://vercel.com/new
2. **Import:** `InnerAnimal/meauxbility-monorepo-IAM-` (same repo)
3. **Configure:**
   - Project Name: `inneranimals-shop`
   - Framework: Next.js
   - **Root Directory:** `apps/inneranimals-shop` ⚠️
   - Production Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - No environment variables needed
4. **Click Deploy**

✅ **Result:** You'll get a URL like `https://inneranimals-shop.vercel.app`

#### Via CLI:

```bash
cd ../inneranimals-shop
vercel --prod

# Answer same prompts with different name
```

---

## 🌐 Your Three Live URLs

After completing all three steps:

```
🏛️  Meauxbility.org (Nonprofit Site)
    https://meauxbility-org.vercel.app
    → Later: meauxbility.org

📊 Admin Portal (iaudodidact.com)
    https://iaudodidact.com ✓ (Already configured!)
    https://[your-project].vercel.app

🛍️  Inner Animals Shop (E-commerce)
    https://inneranimals-shop.vercel.app
    → Later: inneranimals.com
```

---

## 🎨 What You'll See

### Admin Portal (iaudodidact.com) - UPDATED
- ✅ Purple gradient dashboard
- ✅ Grant metrics: 50+, 12 pending, $250K
- ✅ Recent applications list
- ✅ Quick action buttons
- ✅ Clean, modern interface

### Meauxbility.org - NEW
- ✅ Gradient hero: "Transform Your Pain into Purpose"
- ✅ Grant application form with inputs
- ✅ Donation buttons
- ✅ Mission, services, and impact sections
- ✅ Footer with 501(c)(3) EIN
- ✅ Mobile responsive

### Inner Animals Shop - NEW
- ✅ "UNLEASH YOUR INNER WARRIOR" hero
- ✅ Featured products section
- ✅ 6 products displayed (Warrior Tee, Resilience Hoodie, etc.)
- ✅ Shopping cart page
- ✅ Shop browse page with categories
- ✅ Mission integration
- ✅ Black & purple branding

---

## 🔧 Automated CLI Deployment

If you want to deploy all at once from your local machine:

```bash
# 1. Clone and checkout
git clone https://github.com/InnerAnimal/meauxbility-monorepo-IAM-.git
cd meauxbility-monorepo-IAM-
git checkout claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n

# 2. Login to Vercel
npm install -g vercel
vercel login

# 3. Run deployment script
chmod +x deploy-all.sh
./deploy-all.sh

# 4. Follow prompts for each deployment
```

---

## 🌍 Add Custom Domains Later

After successful deployments:

### Meauxbility.org
```bash
# Via CLI
vercel domains add meauxbility.org --project meauxbility-org

# Or via Dashboard:
# Project → Settings → Domains → Add meauxbility.org
```

### Inner Animals Shop
```bash
# Via CLI
vercel domains add inneranimals.com --project inneranimals-shop

# Or via Dashboard:
# Project → Settings → Domains → Add inneranimals.com
```

**Note:** iaudodidact.com is already configured! ✓

---

## ⚡ Quick Deploy (Right Now!)

**Fastest path from your local machine:**

```bash
# 1. Clone
git clone https://github.com/InnerAnimal/meauxbility-monorepo-IAM-.git
cd meauxbility-monorepo-IAM-

# 2. Checkout our branch
git checkout claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n

# 3. Login
vercel login

# 4. Deploy each app (total: ~5 minutes)
cd apps/meauxbility-org && vercel --prod
cd ../admin-portal-production && vercel --prod
cd ../inneranimals-shop && vercel --prod
```

**That's it!** Three live URLs in ~5 minutes.

---

## 🆘 Troubleshooting

### "Root directory not found"

**Fix:** Make sure Root Directory is set to:
- Admin: `apps/admin-portal-production`
- Meaux: `apps/meauxbility-org`
- Shop: `apps/inneranimals-shop`

NOT empty or `/`

### "Build failed"

**Fix:**
1. Verify you're deploying from the correct branch
2. Check Root Directory is set
3. Look at build logs for specific errors

### "Environment variables not working"

**Fix:**
1. Add variables in Vercel dashboard
2. Select "Production" environment
3. **Redeploy** after adding (they don't apply retroactively)

### "Can't link to existing project"

**Fix:**
```bash
# Manually link with project ID
cd apps/admin-portal-production
vercel link
# When prompted, enter project ID: prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY
```

---

## ✅ Verification Checklist

After deployment:

- [ ] Admin portal updated and shows new dashboard at iaudodidact.com
- [ ] Meauxbility.org deployed with gradient hero
- [ ] Inner Animals shop deployed with products
- [ ] All three sites load without 404 errors
- [ ] Mobile responsive on all three
- [ ] No console errors in browser
- [ ] All navigation links work

---

## 🎯 Summary

**Your existing project:** Keep it, update it for Admin Portal
**Project ID:** `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY`
**What to do:**
1. Update root directory to `apps/admin-portal-production`
2. Create 2 new projects for the other apps
3. Deploy all three
4. Get 3 live URLs!

---

## 🎉 Ready?

Choose your method:
- **Dashboard:** Follow Step 1-3 above
- **CLI:** Run the automated script
- **Fastest:** Use the Quick Deploy commands

**You're 5 minutes away from seeing all three badass sites live!** 🚀

---

**Need help?** All detailed guides are in the repo:
- `VERCEL-DEPLOYMENT-GUIDE.md`
- `QUICK-DEPLOY.md`
- `DEPLOY-FROM-YOUR-MACHINE.md`
