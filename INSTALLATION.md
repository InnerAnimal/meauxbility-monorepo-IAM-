# 🚀 Automated Installation Guide

Get your Meauxbility Foundation applications up and running in minutes with our automated installation scripts!

---

## ⚡ Quick Start (Recommended)

### One-Command Installation

```bash
./install-and-build.sh
```

This will automatically:
- ✅ Check prerequisites (Node.js 18+)
- ✅ Install all dependencies
- ✅ Build all three applications
- ✅ Verify builds
- ✅ Show you what to do next

**Time:** ~3-5 minutes depending on internet speed

---

## 🎯 Specific Installation Scripts

### 1. Install & Build Everything

```bash
./install-and-build.sh
```

**What it does:**
- Checks Node.js version (requires 18+)
- Installs root dependencies
- Installs dependencies for all 3 apps
- Builds all 3 applications
- Verifies all builds completed successfully

**Output locations:**
- `apps/meauxbility-org/.next/`
- `apps/admin-portal-production/.next/`
- `apps/inneranimals-shop/.next/`

---

### 2. Start Admin Dashboard (Development)

```bash
./start-admin-dashboard.sh
```

**What it does:**
- Installs dependencies (if needed)
- Creates `.env.local` template
- Starts development server on `http://localhost:3001`

**Perfect for:**
- Local development
- Testing changes
- Adding new features

---

### 3. Deploy Admin Dashboard to Vercel

```bash
./deploy-admin-dashboard.sh
```

**What it does:**
- Loads your Vercel credentials from `.env.sh`
- Checks for required environment variables
- Deploys to production
- Provides dashboard deployment instructions if CLI fails

**Requirements:**
- `.env.sh` configured with Vercel token
- Environment variables configured (Supabase + Stripe)

---

## 📋 Prerequisites

### Required

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Check your versions

```bash
node -v   # Should be v18.0.0 or higher
npm -v    # Should be 9.0.0 or higher
```

### Optional but Recommended

- **git** - For version control
- **Vercel CLI** - For deployments: `npm install -g vercel`
- **wrangler** - For Cloudflare Workers: `npm install -g wrangler`

---

## 🔧 Installation Options

### Option A: Automated Full Install (Fastest)

```bash
# Clone repository (if you haven't already)
git clone https://github.com/InnerAnimal/meauxbility-monorepo-IAM-.git
cd meauxbility-monorepo-IAM-

# Run automated installation
./install-and-build.sh
```

**Result:** All apps installed and built in ~3-5 minutes

---

### Option B: Manual Installation

If you prefer to install step-by-step:

```bash
# Install root dependencies
npm install

# Install and build meauxbility.org
cd apps/meauxbility-org
npm install
npm run build
cd ../..

# Install and build admin portal
cd apps/admin-portal-production
npm install
npm run build
cd ../..

# Install and build shop
cd apps/inneranimals-shop
npm install
npm run build
cd ../..
```

---

### Option C: Install Only What You Need

**Just the admin dashboard:**
```bash
./start-admin-dashboard.sh
```

**Just meauxbility.org:**
```bash
cd apps/meauxbility-org
npm install
npm run dev
```

**Just the shop:**
```bash
cd apps/inneranimals-shop
npm install
npm run dev
```

---

## 🏃 Running the Applications

### Development Mode (All Three)

```bash
npm run dev:all
```

**Access at:**
- Meauxbility.org: http://localhost:3000
- Admin Portal: http://localhost:3001
- Shop: http://localhost:3002

### Development Mode (Individual Apps)

```bash
# Meauxbility.org
npm run dev:meauxbility

# Admin Portal
npm run dev:admin
# OR use the automated script:
./start-admin-dashboard.sh

# Shop
npm run dev:shop
```

### Production Build & Start

```bash
# Build all apps
npm run build:all

# Start production servers
cd apps/meauxbility-org && npm start  # Port 3000
cd apps/admin-portal-production && npm start  # Port 3001
cd apps/inneranimals-shop && npm start  # Port 3002
```

---

## 🔐 Environment Setup

### For Development

1. **Copy example file:**
   ```bash
   cp .env.sh.example .env.sh
   ```

2. **Edit `.env.sh` with your credentials:**
   ```bash
   nano .env.sh
   # or
   code .env.sh
   ```

3. **Add your credentials:**
   - Vercel token
   - Supabase URL and keys
   - Stripe keys

4. **Load environment:**
   ```bash
   source .env.sh
   ```

### For Admin Portal Specifically

Create `apps/admin-portal-production/.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-key
```

**The `start-admin-dashboard.sh` script will create this template for you!**

---

## 🚀 Deployment

### Deploy All Apps

```bash
# Via Vercel Dashboard (Recommended)
# See: VERCEL-DASHBOARD-DEPLOYMENT.md

# Or via CLI (if you have deployment token)
source .env.sh
./deploy-to-existing-projects.sh
```

### Deploy Just Admin Dashboard

```bash
./deploy-admin-dashboard.sh
```

Or follow the dashboard guide: `VERCEL-DASHBOARD-DEPLOYMENT.md`

---

## ✅ Verification

After installation, verify everything works:

### 1. Check Builds Exist

```bash
ls -la apps/meauxbility-org/.next/
ls -la apps/admin-portal-production/.next/
ls -la apps/inneranimals-shop/.next/
```

All should show `.next` directories

### 2. Test Development Servers

```bash
# Start all servers
npm run dev:all

# Visit in browser:
# http://localhost:3000 - Should show Meauxbility.org homepage
# http://localhost:3001 - Should show Admin Dashboard
# http://localhost:3002 - Should show Inner Animals Shop
```

### 3. Check for Errors

```bash
# Check build logs
npm run build:all 2>&1 | tee build.log

# Should see "✓ Compiled successfully" for each app
```

---

## 🆘 Troubleshooting

### "Node version too old"

**Solution:**
```bash
# Install Node 18+ from https://nodejs.org/
# Or use nvm:
nvm install 18
nvm use 18
```

### "npm install failed"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules apps/*/node_modules
npm install
```

### "Build failed: Cannot find module"

**Solution:**
```bash
# Reinstall dependencies in specific app
cd apps/[app-name]
rm -rf node_modules
npm install
npm run build
```

### "Port already in use"

**Solution:**
```bash
# Find and kill process using the port
lsof -ti:3000 | xargs kill -9  # For port 3000
lsof -ti:3001 | xargs kill -9  # For port 3001
lsof -ti:3002 | xargs kill -9  # For port 3002

# Or use different ports
PORT=3010 npm run dev
```

### "Permission denied" for scripts

**Solution:**
```bash
# Make scripts executable
chmod +x install-and-build.sh
chmod +x start-admin-dashboard.sh
chmod +x deploy-admin-dashboard.sh
```

### Script won't run on Windows

**Solution:**
```bash
# Use Git Bash or WSL
# Or run commands manually from the scripts
```

---

## 📊 Installation Script Features

### install-and-build.sh

**Features:**
- ✅ Prerequisite checking (Node.js, npm, git)
- ✅ Clean install option
- ✅ Progress indicators
- ✅ Error handling
- ✅ Build verification
- ✅ Detailed summary
- ✅ Next steps guide

**Exit codes:**
- `0` - Success
- `1` - Prerequisites not met or build failed

### start-admin-dashboard.sh

**Features:**
- ✅ Auto-install dependencies
- ✅ Creates `.env.local` template
- ✅ Environment variable guidance
- ✅ Starts dev server on port 3001
- ✅ Shows available features

### deploy-admin-dashboard.sh

**Features:**
- ✅ Loads credentials from `.env.sh`
- ✅ Checks environment variables
- ✅ Attempts Vercel CLI deployment
- ✅ Provides dashboard fallback instructions
- ✅ Deployment verification

---

## 🎯 Common Workflows

### First Time Setup

```bash
# 1. Install everything
./install-and-build.sh

# 2. Configure environment
cp .env.sh.example .env.sh
# Edit .env.sh with your credentials

# 3. Start development
npm run dev:all
```

### Daily Development

```bash
# Start just what you need
./start-admin-dashboard.sh

# Or start all apps
npm run dev:all
```

### Deploy to Production

```bash
# Option 1: Dashboard (recommended)
# See VERCEL-DASHBOARD-DEPLOYMENT.md

# Option 2: CLI
./deploy-admin-dashboard.sh
```

---

## 📚 Additional Resources

- **QUICK-DEPLOY.md** - Fast deployment reference
- **VERCEL-DASHBOARD-DEPLOYMENT.md** - Complete Vercel guide
- **ENVIRONMENT-SETUP.md** - Environment configuration details
- **FINAL-DEPLOYMENT-PLAN.md** - Comprehensive deployment strategy
- **workers/README.md** - Cloudflare Workers edge caching

---

## 🎉 Success Indicators

After successful installation, you should see:

```
✓ All applications installed and built successfully!

📊 Applications Built: 3/3

🚀 Ready to deploy!
```

**You're ready to:**
- 🖥️ Run development servers
- 🌐 Deploy to Vercel
- 🔧 Start customizing
- 🚀 Launch to production

---

## 🔄 Updating

### Pull Latest Changes

```bash
git pull origin claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n

# Reinstall and rebuild
./install-and-build.sh
```

### Clean Reinstall

```bash
# Remove all builds and dependencies
rm -rf node_modules apps/*/node_modules apps/*/.next

# Fresh install
./install-and-build.sh
```

---

## 📞 Getting Help

**Build Issues:**
1. Check Node.js version: `node -v` (should be 18+)
2. Clear cache: `npm cache clean --force`
3. Clean install: Remove `node_modules`, run `npm install`

**Deployment Issues:**
1. Check `VERCEL-DASHBOARD-DEPLOYMENT.md`
2. Verify environment variables in `.env.sh`
3. Try dashboard deployment instead of CLI

**Development Issues:**
1. Check ports aren't in use
2. Verify `.env.local` files are configured
3. Check browser console for errors

---

**Ready to get started?** Run:
```bash
./install-and-build.sh
```

🎉 Welcome to the Meauxbility Foundation platform!
