# Meauxbility Foundation - Environment Setup Guide
## November 3rd Launch Configuration

This guide covers all environment variables needed for the successful deployment of the three applications.

---

## 🗂️ Overview

The monorepo contains three applications that require environment configuration:

1. **Meauxbility.org** (Main Foundation Site)
2. **Admin Portal** (iaudodidact.com)
3. **Inner Animals Shop** (inneranimals.com)

---

## 🔑 Required Services

### 1. Supabase (Database)
- **Sign up:** https://supabase.com
- **Create Project:** meauxbility-foundation
- **After creation, get:**
  - Project URL: `NEXT_PUBLIC_SUPABASE_URL`
  - Anon/Public Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Service Role Key: `SUPABASE_SERVICE_ROLE` (Settings > API)

### 2. Stripe (Payments)
- **Sign up:** https://stripe.com
- **Get API Keys:** Dashboard > Developers > API Keys
  - Publishable Key: `STRIPE_PUBLISHABLE_KEY`
  - Secret Key: `STRIPE_SECRET_KEY`

### 3. Vercel (Hosting)
- **Sign up:** https://vercel.com
- **Get Token:** Account Settings > Tokens
  - Personal Access Token: `VERCEL_TOKEN`

---

## 📝 Environment Variables by Application

### Meauxbility.org (Main Site)

Create `.env.local` in `apps/meauxbility-org/`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE=your_service_role_key_here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... # or pk_test_ for testing
STRIPE_SECRET_KEY=sk_live_... # or sk_test_ for testing

# App Configuration
NEXT_PUBLIC_APP_URL=https://meauxbility.org
```

### Admin Portal (iaudodidact.com)

Create `.env.production` in `apps/admin-portal-production/`:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=https://iaudodidact.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE=your_service_role_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Optional: API Keys for future features
GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### Inner Animals Shop (inneranimals.com)

Create `.env.local` in `apps/inneranimals-shop/`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE=your_service_role_key_here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# App Configuration
NEXT_PUBLIC_APP_URL=https://inneranimals.com
```

---

## 🗄️ Database Setup

### 1. Run Migration in Supabase

1. Go to Supabase Dashboard > SQL Editor
2. Open `supabase/migrations/001_launch.sql` from this repo
3. Copy and paste the entire SQL file
4. Click "Run"

This creates:
- `grants` table
- `donations` table
- `products` table
- `orders` table
- `order_items` table
- `admin_users` table
- Sample product data for the shop

### 2. Verify Tables Created

Run this query in SQL Editor:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

You should see all 6 tables listed.

---

## 🚀 Vercel Deployment Setup

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy Each App:**

   **Meauxbility.org:**
   ```bash
   cd apps/meauxbility-org
   vercel --prod
   # Follow prompts to connect to domain meauxbility.org
   ```

   **Admin Portal:**
   ```bash
   cd apps/admin-portal-production
   vercel --prod
   # Connect to domain iaudodidact.com
   ```

   **Inner Animals Shop:**
   ```bash
   cd apps/inneranimals-shop
   vercel --prod
   # Connect to domain inneranimals.com
   ```

4. **Add Environment Variables in Vercel Dashboard:**
   - Go to each project in Vercel
   - Settings > Environment Variables
   - Add all variables from the `.env` files above

### Option 2: Using GitHub Integration

1. Push code to GitHub repository
2. Import each app folder as separate Vercel project
3. Configure domains in Vercel dashboard
4. Add environment variables

---

## ✅ Pre-Launch Checklist

### Database
- [ ] Supabase project created
- [ ] Migration SQL executed successfully
- [ ] Sample products visible in `products` table
- [ ] Row Level Security policies enabled

### Stripe
- [ ] Stripe account activated
- [ ] Test mode working (use test keys first)
- [ ] Live mode enabled for production
- [ ] Webhook endpoints configured (if needed)

### Environment Variables
- [ ] All `.env.local` files created in each app
- [ ] Supabase keys added to all apps
- [ ] Stripe keys added to all apps
- [ ] All environment variables added to Vercel

### Build Test
- [ ] `npm run build:meauxbility` succeeds
- [ ] `npm run build:admin` succeeds
- [ ] `npm run build:shop` succeeds

### Deployment
- [ ] meauxbility.org deployed and accessible
- [ ] iaudodidact.com deployed and accessible
- [ ] inneranimals.com deployed and accessible

---

## 🧪 Testing After Deployment

### 1. Test Meauxbility.org
- [ ] Homepage loads correctly
- [ ] Grant application form submits
- [ ] Donation form redirects to Stripe checkout
- [ ] Stripe checkout completes successfully
- [ ] Form submissions appear in Supabase `grants` table

### 2. Test Admin Portal
- [ ] Dashboard loads and shows statistics
- [ ] Recent grants display correctly
- [ ] Recent donations display correctly
- [ ] Statistics update when new data added

### 3. Test Inner Animals Shop
- [ ] Products load from database
- [ ] Products can be added to cart
- [ ] Cart displays correctly
- [ ] Checkout redirects to Stripe
- [ ] Order appears in `orders` table after purchase

---

## 🔧 Troubleshooting

### Issue: "Module not found: @supabase/supabase-js"
**Solution:** Run `npm install` in the affected app directory

### Issue: "supabaseUrl is required"
**Solution:** Check that `NEXT_PUBLIC_SUPABASE_URL` is set in environment variables

### Issue: Stripe checkout not working
**Solution:**
- Verify Stripe keys are correct
- Check that `STRIPE_SECRET_KEY` is set (not publishable key)
- Test with Stripe test mode first

### Issue: Build fails on Vercel
**Solution:**
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct dependencies

---

## 📞 Support

For issues during setup:
- Check Supabase logs: Dashboard > Database > Logs
- Check Stripe logs: Dashboard > Developers > Logs
- Check Vercel logs: Project > Deployments > [deployment] > Logs

Contact: sam@meauxbility.org

---

## 🎯 Quick Start Commands

```bash
# Install all dependencies
npm install

# Build all apps
npm run build:all

# Test locally (development mode)
npm run dev:all

# Deploy to production (after env vars configured)
./deploy-all.sh
```

---

**Last Updated:** October 31, 2024
**Launch Date:** November 3, 2024
**Monorepo Version:** 1.0.0
