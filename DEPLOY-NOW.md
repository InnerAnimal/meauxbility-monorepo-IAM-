# 🚀 Deploy Meauxbility Foundation - Step-by-Step Guide

**Time Required:** 60-90 minutes
**Difficulty:** Intermediate
**Prerequisites:** Email address, credit card for Stripe (no charges for setup)

---

## ⚠️ IMPORTANT: What You Need to Do

I've built all the code and functionality, but **you** need to:

1. **Sign up for services** (Supabase, Stripe, Vercel)
2. **Get API keys** from those services
3. **Configure environment variables** with your keys
4. **Deploy to Vercel**

**I cannot do these steps because:**
- I don't have access to create accounts
- I cannot sign up for external services
- I cannot obtain real API keys
- I cannot deploy to your Vercel account

**But I've prepared everything else!** ✅

---

## 📋 Step-by-Step Deployment

### STEP 1: Setup Supabase (15-20 minutes)

#### 1.1 Create Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Verify your email

#### 1.2 Create Project
1. Click "New Project"
2. **Project name:** `meauxbility-foundation`
3. **Database password:** Create a strong password (save it!)
4. **Region:** Choose closest to Louisiana (e.g., US East)
5. Click "Create new project"
6. Wait 2-3 minutes for setup

#### 1.3 Run Database Migration
1. Once project is ready, click "SQL Editor" in left sidebar
2. Open this file on your computer: `supabase/migrations/001_launch.sql`
3. Copy the ENTIRE contents
4. Paste into Supabase SQL Editor
5. Click "Run" button
6. You should see "Success. No rows returned"

#### 1.4 Verify Tables Created
1. Click "Table Editor" in left sidebar
2. You should see 6 tables:
   - `grants`
   - `donations`
   - `products`
   - `orders`
   - `order_items`
   - `admin_users`
3. Click on `products` table - should see 6 sample products

#### 1.5 Get API Keys
1. Click "Settings" (gear icon) in left sidebar
2. Click "API" under Project Settings
3. **Copy these values** (you'll need them soon):
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE`
4. Save these in a text file temporarily

---

### STEP 2: Setup Stripe (10-15 minutes)

#### 2.1 Create Account
1. Go to https://stripe.com
2. Click "Start now" or "Sign up"
3. Enter your email and create password
4. Complete business information:
   - **Business name:** Meauxbility Foundation
   - **Type:** Nonprofit
   - **Country:** United States
5. Verify your email

#### 2.2 Activate Account
1. Complete the account activation form
2. Add EIN: **33-4214907**
3. Add business details
4. Note: You can start with test mode and activate live mode later

#### 2.3 Get API Keys (TEST MODE FIRST)
1. In Stripe Dashboard, click "Developers" in top right
2. Click "API keys"
3. You should see:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...` - click "Reveal live key")
4. **Copy these values:**
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
5. Save these in your text file

**Note:** Use test keys first! Activate live mode after testing.

---

### STEP 3: Configure Environment Variables (15-20 minutes)

Now you'll create `.env` files with the keys you copied.

#### 3.1 Meauxbility.org

```bash
cd apps/meauxbility-org
cp .env.local.example .env.local
```

Edit `.env.local` and replace:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co  # Your Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...             # Your anon key
SUPABASE_SERVICE_ROLE=eyJhbG...                     # Your service role key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...      # Your Stripe publishable
STRIPE_SECRET_KEY=sk_test_...                        # Your Stripe secret
NEXT_PUBLIC_APP_URL=http://localhost:3000           # Keep this for now
```

#### 3.2 Inner Animals Shop

```bash
cd apps/inneranimals-shop
cp .env.local.example .env.local
```

Edit `.env.local` with **THE SAME KEYS** as meauxbility-org:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co  # SAME as above
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...             # SAME as above
SUPABASE_SERVICE_ROLE=eyJhbG...                     # SAME as above
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...      # SAME as above
STRIPE_SECRET_KEY=sk_test_...                        # SAME as above
NEXT_PUBLIC_APP_URL=http://localhost:3002           # Different port
```

#### 3.3 Admin Portal

```bash
cd apps/admin-portal-production
cp .env.production.example .env.production
```

Edit `.env.production` with **THE SAME KEYS**:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3001           # Different port
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co  # SAME as above
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...             # SAME as above
SUPABASE_SERVICE_ROLE=eyJhbG...                     # SAME as above
STRIPE_SECRET_KEY=sk_test_...                        # SAME as above
STRIPE_PUBLISHABLE_KEY=pk_test_...                   # SAME as above
```

---

### STEP 4: Test Locally (10 minutes)

Before deploying, test everything works:

```bash
# From repository root
cd /home/user/meauxbility-monorepo-IAM-

# Test meauxbility.org
cd apps/meauxbility-org
npm run dev
# Open http://localhost:3000
# Try submitting a grant application
# Try the donation form
# Check Supabase to see if data appears
# Press Ctrl+C to stop

# Test shop
cd ../inneranimals-shop
npm run dev
# Open http://localhost:3002
# Add products to cart
# Try checkout (will redirect to Stripe)
# Press Ctrl+C to stop

# Test admin portal
cd ../admin-portal-production
npm run dev
# Open http://localhost:3001
# Check if statistics load
# Press Ctrl+C to stop
```

---

### STEP 5: Deploy to Vercel (20-30 minutes)

#### 5.1 Install Vercel CLI

```bash
npm install -g vercel
```

#### 5.2 Login to Vercel

```bash
vercel login
```

Follow prompts to login (email, GitHub, etc.)

#### 5.3 Deploy Meauxbility.org

```bash
cd apps/meauxbility-org
vercel --prod
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Your personal account
- **Link to existing project?** → No
- **Project name?** → meauxbility-org
- **Directory?** → ./
- **Override settings?** → No

After deployment:
1. Go to Vercel dashboard: https://vercel.com/dashboard
2. Click on "meauxbility-org" project
3. Go to Settings > Environment Variables
4. Add each variable from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to https://your-project.vercel.app)
5. Go to Settings > Domains
6. Add custom domain: **meauxbility.org**
7. Follow DNS instructions from Vercel

#### 5.4 Deploy Inner Animals Shop

```bash
cd ../inneranimals-shop
vercel --prod
```

Repeat the same process:
- Add environment variables in Vercel dashboard
- Add custom domain: **inneranimals.com**

#### 5.5 Deploy Admin Portal

```bash
cd ../admin-portal-production
vercel --prod
```

Repeat the same process:
- Add environment variables in Vercel dashboard
- Add custom domain: **iaudodidact.com**

---

### STEP 6: Configure Custom Domains (15-20 minutes)

For each domain (meauxbility.org, inneranimals.com, iaudodidact.com):

1. **In Vercel Dashboard:**
   - Go to project → Settings → Domains
   - Click "Add Domain"
   - Enter your domain
   - Copy the DNS records Vercel provides

2. **In Your Domain Registrar** (Namecheap, GoDaddy, etc.):
   - Login to your domain registrar
   - Go to DNS settings for the domain
   - Add the A/CNAME records from Vercel
   - Wait 5-60 minutes for DNS propagation

3. **Verify:**
   - Go back to Vercel dashboard
   - Domain should show "Valid Configuration" checkmark

---

### STEP 7: Test Production Deployment (15 minutes)

#### 7.1 Test Meauxbility.org
1. Visit https://meauxbility.org (or your Vercel URL)
2. Submit a test grant application
3. Try a test donation ($1.00 with test card: 4242 4242 4242 4242)
4. Check Supabase → Table Editor → grants & donations

#### 7.2 Test Inner Animals Shop
1. Visit https://inneranimals.com
2. Add products to cart
3. Go to checkout
4. Complete purchase with test card
5. Check Supabase → orders table

#### 7.3 Test Admin Portal
1. Visit https://iaudodidact.com
2. Check dashboard loads
3. Verify statistics show your test data

---

### STEP 8: Activate Stripe Live Mode (Do this after testing!)

1. In Stripe Dashboard, click "Activate your account"
2. Complete remaining business verification
3. Get your **LIVE** API keys (pk_live_... and sk_live_...)
4. Update environment variables in Vercel with live keys
5. Redeploy all apps

---

## ✅ Deployment Checklist

Use this to track your progress:

- [ ] Supabase account created
- [ ] Supabase project created
- [ ] Database migration executed
- [ ] 6 tables visible in Supabase
- [ ] Supabase API keys copied
- [ ] Stripe account created
- [ ] Stripe test keys copied
- [ ] `.env.local` created for meauxbility-org
- [ ] `.env.local` created for inneranimals-shop
- [ ] `.env.production` created for admin-portal
- [ ] Tested locally - meauxbility.org works
- [ ] Tested locally - shop works
- [ ] Tested locally - admin portal works
- [ ] Vercel CLI installed
- [ ] Logged into Vercel
- [ ] Deployed meauxbility-org to Vercel
- [ ] Deployed inneranimals-shop to Vercel
- [ ] Deployed admin-portal to Vercel
- [ ] Environment variables added in Vercel (all 3 apps)
- [ ] Custom domains added in Vercel
- [ ] DNS records updated at registrar
- [ ] Tested production meauxbility.org
- [ ] Tested production shop
- [ ] Tested production admin portal
- [ ] Activated Stripe live mode
- [ ] Updated Vercel with live Stripe keys

---

## 🆘 Troubleshooting

### "Module not found" errors
→ Run `npm install` in that app's directory

### "supabaseUrl is required"
→ Check environment variables are set correctly in Vercel

### Stripe checkout doesn't work
→ Verify `STRIPE_SECRET_KEY` is the SECRET key, not publishable

### Products don't load in shop
→ Check Supabase migration ran successfully

### Admin dashboard shows 0 for everything
→ Submit test data through the forms first

---

## 📞 Need Help?

- Supabase: https://supabase.com/docs
- Stripe: https://stripe.com/docs
- Vercel: https://vercel.com/docs
- Contact: sam@meauxbility.org

---

## 🎉 Once Deployed...

Your three apps will be live:
- ✅ **meauxbility.org** - Accepting grant applications & donations
- ✅ **inneranimals.com** - Selling products
- ✅ **iaudodidact.com** - Tracking everything

**Launch Date: November 3, 2024** 🚀

---

**Prepared by:** Claude Code Agent
**Last Updated:** October 31, 2024
**All code is ready - you just need to configure services!**
