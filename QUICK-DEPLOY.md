# 🚀 Quick Deploy - See Your Sites Live in 5 Minutes!

## Option 1: Deploy via Vercel CLI (Fastest)

### Step 1: Authenticate
```bash
vercel login
```

This will:
- Open your browser
- Ask you to confirm the login
- Save your credentials

### Step 2: Deploy All Three Apps
```bash
./deploy-all.sh
```

**OR** deploy individually to see each URL immediately:

```bash
# Deploy Meauxbility.org
cd apps/meauxbility-org
vercel --prod

# Deploy Admin Portal
cd ../admin-portal-production
vercel --prod

# Deploy Inner Animals Shop
cd ../inneranimals-shop
vercel --prod
```

---

## Option 2: Deploy via Vercel Dashboard (No CLI Needed)

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
