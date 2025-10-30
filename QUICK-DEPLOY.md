# 🚀 Quick Deploy - See Your Sites Live in 5 Minutes!

## ⚠️ Current Token Status

Your Vercel token (`vck_4BMqveAjanteOohRofOoWnyHnqi98PGVhUM9a64k62GRZKGdgP35Slto`) has **read-only access**:
- ✅ Works for: `vercel whoami`
- ❌ Fails for: deployments, linking projects
- 📊 No projects accessible via API

**Best Solution:** Connect GitHub to existing Vercel projects via Dashboard (see Option 2 below)

---

## Option 1: Connect Existing Projects (RECOMMENDED - 15 mins)

You already have 3 Vercel projects. Just connect them to GitHub!

### For Each Project (5 mins each):

**Meauxbility.org** (`prj_AemccTFEjP7ztRJivI4wtysSyEfi`):
1. Go to Vercel Dashboard → Select your meauxbility project
2. Settings → Git → "Connect Git Repository"
3. Select: `InnerAnimal/meauxbility-monorepo-IAM-`
4. Production Branch: `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
5. **Root Directory:** `apps/meauxbility-org` ⚠️ CRITICAL!
6. Save & Redeploy

**Inner Animals Shop** (`prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR`):
1. Same steps as above
2. **Root Directory:** `apps/inneranimals-shop`

**Admin Portal** (`prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY`):
1. Same steps as above
2. **Root Directory:** `apps/admin-portal-production`
3. Add environment variables (Supabase + Stripe)

### ✨ Result:
Every git push now automatically deploys all three sites!

---

## Option 2: New Projects via Dashboard (If starting fresh)

### 🏛️ Deploy Meauxbility.org

1. Go to: https://vercel.com/new
2. **Import Git Repository**
3. Select: `InnerAnimal/meauxbility-monorepo-IAM-`
4. **Configure Project:**
   - Project Name: `meauxbility-org`
   - Framework: Next.js
   - **Root Directory: `apps/meauxbility-org`** ⚠️ IMPORTANT!
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click **"Deploy"**
6. ⏱️ Wait 2-3 minutes
7. 🎉 **You'll get a URL like:** `https://meauxbility-org-xxx.vercel.app`

### 📊 Deploy Admin Portal

1. Go to: https://vercel.com/new (again)
2. **Import same repository**
3. Select: `InnerAnimal/meauxbility-monorepo-IAM-`
4. **Configure Project:**
   - Project Name: `admin-portal-production`
   - Framework: Next.js
   - **Root Directory: `apps/admin-portal-production`** ⚠️ IMPORTANT!
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Add Environment Variables** (Settings → Environment Variables):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE=your-service-role
   STRIPE_SECRET_KEY=sk_test_your_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   ```
6. Click **"Deploy"**
7. ⏱️ Wait 2-3 minutes
8. 🎉 **You'll get a URL like:** `https://admin-portal-production-xxx.vercel.app`

### 🛍️ Deploy Inner Animals Shop

1. Go to: https://vercel.com/new (again)
2. **Import same repository**
3. Select: `InnerAnimal/meauxbility-monorepo-IAM-`
4. **Configure Project:**
   - Project Name: `inneranimals-shop`
   - Framework: Next.js
   - **Root Directory: `apps/inneranimals-shop`** ⚠️ IMPORTANT!
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click **"Deploy"**
6. ⏱️ Wait 2-3 minutes
7. 🎉 **You'll get a URL like:** `https://inneranimals-shop-xxx.vercel.app`

---

## ✨ What You'll See

### Meauxbility.org Preview
```
https://meauxbility-org.vercel.app
```
- 🎨 Beautiful gradient hero
- 📋 Grant application form
- 💜 Donation buttons
- 🏛️ Mission & impact sections
- 📱 Fully responsive

### Admin Portal Preview
```
https://admin-portal-production.vercel.app
```
- 📊 Dashboard with metrics
- 📈 Grant application stats
- 💰 Donation tracking
- ⚡ Quick action buttons
- 🔒 Production-ready admin interface

### Inner Animals Shop Preview
```
https://inneranimals-shop.vercel.app
```
- 🛍️ Product catalog (6 products)
- 🛒 Shopping cart
- 💳 Checkout flow
- 🎨 Sleek black & purple design
- 📱 Mobile-optimized

---

## 🌐 Custom Domains (After Deployment)

Once deployed, connect your domains:

1. **Meauxbility.org**
   - Project Settings → Domains
   - Add: `meauxbility.org`

2. **Admin Portal**
   - Project Settings → Domains
   - Add: `iaudodidact.com`

3. **Inner Animals Shop**
   - Project Settings → Domains
   - Add: `inneranimals.com`

---

## 🎯 Current Status

✅ **All builds successful**
✅ **Dependencies installed**
✅ **Vercel config ready**
✅ **Documentation complete**

**Ready to deploy!**

---

## 🆘 Need Help?

**Can't access browser for `vercel login`?**
1. Get token: https://vercel.com/account/tokens
2. Set token:
   ```bash
   export VERCEL_TOKEN=your_token_here
   vercel --token $VERCEL_TOKEN --prod
   ```

**Dashboard deployment not working?**
- Make sure Root Directory is set correctly!
- It should be `apps/[app-name]` NOT just `/` or empty

**Want to see it now?**
- Dashboard method takes ~5 minutes total
- CLI method takes ~3 minutes (after login)

---

## 🚀 Let's Go!

Choose your method and deploy. You'll have live URLs in minutes!

**Questions?** Check `VERCEL-DEPLOYMENT-GUIDE.md` for detailed help.
