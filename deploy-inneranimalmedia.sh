#!/bin/bash

echo "🎬 INNER ANIMAL MEDIA - DEPLOYMENT"
echo "==================================="
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please run: vercel login"
    echo "   Or set VERCEL_TOKEN environment variable"
    exit 1
fi

echo "✅ Authenticated with Vercel"
echo ""

# Get the repository root
REPO_ROOT=$(pwd)

# Deploy Inner Animal Media
echo "🎬 Deploying Inner Animal Media..."
cd "$REPO_ROOT/apps/inneranimalmedia"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Deploying to Vercel..."
vercel --prod --yes

DEPLOY_STATUS=$?
echo ""

cd "$REPO_ROOT"

echo "============================================"
if [ $DEPLOY_STATUS -eq 0 ]; then
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo "============================================"
    echo ""
    echo "🌐 Your site is now live!"
    echo ""
    echo "📋 Next Steps:"
    echo "──────────────────────────────────────────"
    echo "  1. Test your .vercel.app URL"
    echo "  2. Verify all functionality works"
    echo "  3. Add custom domain in Vercel dashboard"
    echo "  4. Configure DNS (see DNS-CONFIGURATION-INNERANIMALMEDIA.md)"
    echo "  5. Wait for DNS propagation (5-30 minutes)"
    echo "  6. Verify https://inneranimalmedia.com"
    echo ""
    echo "🎉 Inner Animal Media is ready!"
else
    echo "❌ DEPLOYMENT FAILED"
    echo "============================================"
    echo ""
    echo "🔍 Troubleshooting:"
    echo "──────────────────────────────────────────"
    echo "  1. Check build logs above for errors"
    echo "  2. Verify all dependencies are installed"
    echo "  3. Try: npm run build (to test locally)"
    echo "  4. Check Vercel dashboard for details"
fi

echo "============================================"
