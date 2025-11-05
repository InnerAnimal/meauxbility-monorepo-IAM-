# 🔐 Environment Setup Guide

This guide explains how to configure credentials for deploying the Meauxbility Foundation applications.

---

## 🎯 Quick Start

### Step 1: Create Your Credentials File

```bash
# Copy the example file
cp .env.sh.example .env.sh

# Make it executable
chmod +x .env.sh
```

### Step 2: Get Your Vercel Token

1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: `Meauxbility Deployment`
4. Select scope: Full Account (or specific projects)
5. Click "Create"
6. Copy the token (it starts with `vercel_...` or similar)

### Step 3: Edit Your Credentials File

```bash
# Open with your preferred editor
nano .env.sh
# or
code .env.sh
# or
vim .env.sh
```

Replace these placeholder values:

```bash
# CHANGE THIS:
export VERCEL_TOKEN="PASTE_YOUR_VERCEL_TOKEN_HERE"

# TO YOUR ACTUAL TOKEN:
export VERCEL_TOKEN="vercel_abc123xyz..."
```

### Step 4: Get Supabase Credentials (Admin Portal Only)

1. Go to: https://app.supabase.com
2. Select your project
3. Go to: Settings → API
4. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 5: Get Stripe Credentials (Admin Portal Only)

1. Go to: https://dashboard.stripe.com/apikeys
2. For testing: Use keys starting with `sk_test_` and `pk_test_`
3. For production: Use keys starting with `sk_live_` and `pk_live_`
4. Copy both the Secret key and Publishable key

### Step 6: Load Environment Variables

```bash
# Source the file to load all variables
source .env.sh
```

You should see output like:
```
✅ Environment variables loaded successfully!

📋 Configuration Summary:
─────────────────────────────────────────────
  Vercel Token:     vercel_abc123xyz... (48 chars)
  Admin Project:    prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY
  Meaux Project:    prj_AemccTFEjP7ztRJivI4wtysSyEfi
  Shop Project:     prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR
  Production Branch: claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n
─────────────────────────────────────────────
```

### Step 7: Deploy!

```bash
# Deploy all three projects
./deploy-to-existing-projects.sh

# Or deploy individually
cd apps/meauxbility-org && vercel --prod
cd ../admin-portal-production && vercel --prod
cd ../inneranimals-shop && vercel --prod
```

---

## 🔧 Helper Functions

Your `.env.sh` file includes helpful functions:

### Check Vercel Authentication
```bash
source .env.sh
check_vercel_auth
```

### Deploy All Projects
```bash
source .env.sh
deploy_all
```

### Add Environment Variables to Vercel Projects
```bash
source .env.sh
add_vercel_env_vars
```

---

## 📋 Required Credentials Checklist

### For All Deployments:
- [ ] Vercel token (`VERCEL_TOKEN`)
- [ ] Vercel project IDs (already configured)

### For Admin Portal Only:
- [ ] Supabase URL (`NEXT_PUBLIC_SUPABASE_URL`)
- [ ] Supabase anon key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] Supabase service role key (`SUPABASE_SERVICE_ROLE_KEY`)
- [ ] Stripe secret key (`STRIPE_SECRET_KEY`)
- [ ] Stripe publishable key (`STRIPE_PUBLISHABLE_KEY`)

### Optional:
- [ ] Stripe webhook secret (`STRIPE_WEBHOOK_SECRET`)
- [ ] GitHub token (`GITHUB_TOKEN`) - for automation
- [ ] Vercel org ID (`VERCEL_ORG_ID`) - for team accounts

---

## 🔒 Security Best Practices

### DO:
✅ Keep `.env.sh` private and secure
✅ Use encrypted storage for backups
✅ Share via secure channels only (encrypted email, password manager)
✅ Rotate tokens periodically
✅ Use test keys for development

### DON'T:
❌ Commit `.env.sh` to git (it's in .gitignore)
❌ Share credentials in plain text
❌ Use production keys in development
❌ Paste credentials in public chat or forums
❌ Store credentials in unencrypted files

---

## 🆘 Troubleshooting

### "Vercel token not configured"
**Fix:** Make sure you replaced `PASTE_YOUR_VERCEL_TOKEN_HERE` with your actual token

### "command not found: vercel"
**Fix:** Install Vercel CLI:
```bash
npm install -g vercel
```

### "Environment variables not working"
**Fix:** Make sure you sourced the file:
```bash
source .env.sh
# not just: ./env.sh
```

### "Permission denied"
**Fix:** Make the file executable:
```bash
chmod +x .env.sh
```

---

## 📤 Sharing Credentials Securely

### Method 1: Password Manager (Recommended)
1. Copy the contents of `.env.sh`
2. Create a secure note in your password manager (1Password, LastPass, etc.)
3. Share via password manager's secure sharing feature

### Method 2: Encrypted File
```bash
# Encrypt the file
gpg -c .env.sh
# This creates .env.sh.gpg

# Share .env.sh.gpg with the passphrase separately

# To decrypt:
gpg .env.sh.gpg
```

### Method 3: Temporary Secure Share
Use services like:
- https://onetimesecret.com (expires after viewing)
- https://privnote.com (self-destructs)
- Your team's secret management tool (Vault, AWS Secrets Manager, etc.)

---

## 🔄 Updating Credentials

If you need to update credentials:

```bash
# 1. Edit the file
nano .env.sh

# 2. Reload the environment
source .env.sh

# 3. Update Vercel environment variables
source .env.sh
add_vercel_env_vars

# 4. Redeploy to apply changes
./deploy-to-existing-projects.sh
```

---

## 📝 Environment Variables Reference

| Variable | Required For | Where to Get | Example |
|----------|-------------|--------------|---------|
| `VERCEL_TOKEN` | All deployments | https://vercel.com/account/tokens | `vercel_xyz...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Admin Portal | Supabase Dashboard → Settings → API | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Admin Portal | Supabase Dashboard → Settings → API | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin Portal | Supabase Dashboard → Settings → API | `eyJhbGci...` |
| `STRIPE_SECRET_KEY` | Admin Portal | https://dashboard.stripe.com/apikeys | `sk_test_...` or `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | Admin Portal | https://dashboard.stripe.com/apikeys | `pk_test_...` or `pk_live_...` |

---

## ✅ Verification

After setup, verify everything is working:

```bash
# 1. Load environment
source .env.sh

# 2. Check authentication
vercel whoami

# 3. List your projects
vercel ls

# 4. Test deployment (dry run)
vercel --prod --confirm=false

# 5. Deploy for real
./deploy-to-existing-projects.sh
```

---

## 🎉 You're Ready!

Once you see the success message, your environment is configured correctly and you're ready to deploy all three applications!

**Need help?** Check the other deployment guides:
- `FINAL-DEPLOYMENT-PLAN.md` - Complete deployment strategy
- `DEPLOY-WITH-EXISTING-PROJECT.md` - Using existing Vercel projects
- `UPDATE-EXISTING-DEPLOYMENT.md` - Updating current deployments

---

**Created:** October 30, 2024
**Status:** Ready for Production Use
**Branch:** `claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n`
