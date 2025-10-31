# 🚀 START HERE - Quick Deployment Guide

**You have:** ✅ Supabase account + keys | ✅ Stripe account + keys | ✅ All code built

**Time to deploy:** 20-30 minutes

---

## 🎯 Three Simple Steps

### STEP 1: Configure Environment (5 minutes)

Run the automated setup script:

```bash
./setup-env.sh
```

This will ask you for:
- Supabase Project URL
- Supabase Anon Key
- Supabase Service Role Key
- Stripe Publishable Key
- Stripe Secret Key

**The script will automatically create all `.env` files for you!**

---

### STEP 2: Test Locally (5 minutes)

```bash
./test-locally.sh
```

This opens:
- **Meauxbility.org** → http://localhost:3000
- **Inner Animals Shop** → http://localhost:3002
- **Admin Portal** → http://localhost:3001

**Quick Tests:**
- ✓ Submit a grant application on meauxbility.org
- ✓ Make a test donation (use card: 4242 4242 4242 4242)
- ✓ Add products to cart on shop
- ✓ Check admin dashboard shows data

Press `Ctrl+C` to stop when done.

---

### STEP 3: Deploy to Vercel (15 minutes)

```bash
./deploy-to-vercel.sh
```

This will:
1. Check if Vercel CLI is installed (installs if needed)
2. Login to Vercel
3. Deploy all three apps automatically
4. Show you what to do next

**After deployment, you need to:**

For **EACH** project in Vercel Dashboard (https://vercel.com/dashboard):

1. Click project → **Settings** → **Environment Variables**
2. Add these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY
   NEXT_PUBLIC_APP_URL
   ```

3. Click project → **Settings** → **Domains**
4. Add your domain:
   - meauxbility-org → **meauxbility.org**
   - inneranimals-shop → **inneranimals.com**
   - admin-portal-production → **iaudodidact.com**

5. Redeploy after adding env vars:
   ```bash
   vercel --prod
   ```

---

## 📋 Quick Checklist

Copy this and check off as you go:

```
□ Run ./setup-env.sh (enter your API keys)
□ Run ./test-locally.sh (test everything works)
□ Check grant form works locally
□ Check donation works locally
□ Check shop cart works locally
□ Check admin dashboard loads data
□ Run ./deploy-to-vercel.sh
□ Add env variables to meauxbility-org in Vercel
□ Add env variables to inneranimals-shop in Vercel
□ Add env variables to admin-portal in Vercel
□ Add domain meauxbility.org in Vercel
□ Add domain inneranimals.com in Vercel
□ Add domain iaudodidact.com in Vercel
□ Update DNS records at domain registrar
□ Redeploy all apps: vercel --prod
□ Test production meauxbility.org
□ Test production inneranimals.com
□ Test production iaudodidact.com
□ Go live on November 3rd! 🎉
```

---

## 🆘 If Something Goes Wrong

### "Script not executable"
```bash
chmod +x setup-env.sh deploy-to-vercel.sh test-locally.sh
```

### "npm run dev:all fails"
```bash
# Make sure you ran setup-env.sh first
./setup-env.sh
```

### "Build fails in Vercel"
- Check environment variables are set in Vercel dashboard
- Make sure you added ALL the required variables
- Verify keys are correct (no extra spaces)

### "Database connection fails"
- Verify Supabase URL is correct
- Check Supabase project is active
- Confirm you ran the migration SQL

### "Stripe checkout fails"
- Using test keys? Use test card: 4242 4242 4242 4242
- Verify both publishable AND secret keys are set
- Check keys match (both test or both live)

---

## 📱 Your API Keys Location

**Supabase Keys:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click Settings (gear icon) → API
4. Copy: Project URL, anon key, service_role key

**Stripe Keys:**
1. Go to https://dashboard.stripe.com
2. Click Developers → API Keys
3. For testing: Use "Test mode" keys (pk_test_... and sk_test_...)
4. For production: Switch to "Live mode" and use pk_live_... and sk_live_...

---

## 🎯 What Each Script Does

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `setup-env.sh` | Creates .env files with your keys | First time setup |
| `test-locally.sh` | Starts all apps on localhost | Before deploying |
| `deploy-to-vercel.sh` | Deploys all apps to Vercel | When ready to go live |

---

## ⚡ Super Quick Deploy (If You're Confident)

```bash
./setup-env.sh          # Enter your keys
./test-locally.sh       # Quick test (Ctrl+C to stop)
./deploy-to-vercel.sh   # Deploy!
# Then add env vars in Vercel dashboard
```

**Total time:** 15-20 minutes

---

## 🎉 After Deployment

Your three websites will be live:

- **meauxbility.org** - Accepting grant applications & donations
- **inneranimals.com** - Selling Inner Animals products
- **iaudodidact.com** - Managing all operations

All connected to:
- ✅ Your Supabase database
- ✅ Your Stripe account
- ✅ Deployed on Vercel

**Test everything before announcing the launch!**

---

## 📞 Need More Help?

- **Detailed deployment guide:** See `DEPLOY-NOW.md`
- **Environment setup reference:** See `LAUNCH-ENVIRONMENT-SETUP.md`
- **Project status:** See `DEPLOYMENT-READY.md`

**Launch Date: November 3, 2024** 🚀

---

**All code is ready. Just run the scripts! 💪**
