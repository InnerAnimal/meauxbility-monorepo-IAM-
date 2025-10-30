#!/bin/bash

echo "🚀 MEAUXBILITY FOUNDATION - NOVEMBER 3RD UNIFIED DEPLOYMENT"
echo "==========================================================="
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

# Deploy Meauxbility.org
echo "🏛️  Deploying Meauxbility.org..."
cd "$REPO_ROOT/apps/meauxbility-org"
vercel --prod --yes
MEAUX_URL=$?
echo ""

# Deploy Admin Portal to iaudodidact.com
echo "📊 Deploying Admin Portal..."
cd "$REPO_ROOT/apps/admin-portal-production"
vercel --prod --yes
ADMIN_URL=$?
echo ""

# Deploy InnerAnimals.com
echo "🛍️  Deploying Inner Animals Shop..."
cd "$REPO_ROOT/apps/inneranimals-shop"
vercel --prod --yes
SHOP_URL=$?
echo ""

# Return to root
cd "$REPO_ROOT"

echo "============================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "============================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure custom domains in Vercel dashboard:"
echo "   - Meauxbility.org → meauxbility.org"
echo "   - Admin Portal → iaudodidact.com"
echo "   - Inner Animals → inneranimals.com"
echo ""
echo "2. Set environment variables for Admin Portal:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_PUBLISHABLE_KEY"
echo ""
echo "3. Redeploy after setting environment variables"
echo ""
echo "============================================"
echo "🎉 READY FOR NOVEMBER 3RD LAUNCH! 🎉"
echo "============================================"
