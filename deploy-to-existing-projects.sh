#!/bin/bash

echo "🚀 MEAUXBILITY FOUNDATION - DEPLOY TO EXISTING PROJECTS"
echo "========================================================"
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
    exit 1
fi

echo "✅ Authenticated with Vercel"
echo ""

# Get the repository root
REPO_ROOT=$(pwd)

# Project IDs
ADMIN_PROJECT_ID="prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY"
MEAUX_PROJECT_ID="prj_AemccTFEjP7ztRJivI4wtysSyEfi"
SHOP_PROJECT_ID="prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR"

# Deploy in specified order: Meauxbility.org → Inner Animals → Admin Portal

# 1. Deploy Meauxbility.org FIRST
echo "🏛️  [1/3] Deploying Meauxbility.org..."
echo "   Project ID: $MEAUX_PROJECT_ID"
cd "$REPO_ROOT/apps/meauxbility-org"

# Create .vercel directory if it doesn't exist
mkdir -p .vercel

# Create project.json to link to existing project
cat > .vercel/project.json << EOF
{
  "projectId": "$MEAUX_PROJECT_ID",
  "orgId": "team_placeholder"
}
EOF

echo "   Deploying..."
vercel --prod --yes
MEAUX_STATUS=$?
echo ""

# 2. Deploy Inner Animals Shop SECOND
echo "🛍️  [2/3] Deploying Inner Animals Shop..."
echo "   Project ID: $SHOP_PROJECT_ID"
cd "$REPO_ROOT/apps/inneranimals-shop"

# Create .vercel directory if it doesn't exist
mkdir -p .vercel

# Create project.json to link to existing project
cat > .vercel/project.json << EOF
{
  "projectId": "$SHOP_PROJECT_ID",
  "orgId": "team_placeholder"
}
EOF

echo "   Deploying..."
vercel --prod --yes
SHOP_STATUS=$?
echo ""

# 3. Deploy Admin Portal LAST
echo "📊 [3/3] Deploying Admin Portal to iaudodidact.com..."
echo "   Project ID: $ADMIN_PROJECT_ID"
cd "$REPO_ROOT/apps/admin-portal-production"

# Create .vercel directory if it doesn't exist
mkdir -p .vercel

# Create project.json to link to existing project
cat > .vercel/project.json << EOF
{
  "projectId": "$ADMIN_PROJECT_ID",
  "orgId": "team_placeholder"
}
EOF

echo "   Deploying..."
vercel --prod --yes
ADMIN_STATUS=$?
echo ""

# Return to root
cd "$REPO_ROOT"

echo "============================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "============================================"
echo ""
echo "📋 Deployment Status:"
echo "──────────────────────────────────────────"
if [ $ADMIN_STATUS -eq 0 ]; then
    echo "  📊 Admin Portal:     ✅ Success"
else
    echo "  📊 Admin Portal:     ❌ Failed"
fi

if [ $MEAUX_STATUS -eq 0 ]; then
    echo "  🏛️  Meauxbility.org:  ✅ Success"
else
    echo "  🏛️  Meauxbility.org:  ❌ Failed"
fi

if [ $SHOP_STATUS -eq 0 ]; then
    echo "  🛍️  Inner Animals:    ✅ Success"
else
    echo "  🛍️  Inner Animals:    ❌ Failed"
fi
echo ""

if [ $ADMIN_STATUS -eq 0 ] && [ $MEAUX_STATUS -eq 0 ] && [ $SHOP_STATUS -eq 0 ]; then
    echo "🎉 All three sites deployed successfully!"
    echo ""
    echo "🌐 Your Live Sites:"
    echo "──────────────────────────────────────────"
    echo "  Admin Portal:     https://iaudodidact.com"
    echo "  Meauxbility.org:  Check Vercel dashboard"
    echo "  Inner Animals:    Check Vercel dashboard"
    echo ""
    echo "📋 Next Steps:"
    echo "──────────────────────────────────────────"
    echo "  1. Visit each URL to verify deployment"
    echo "  2. Configure custom domains (if not done)"
    echo "  3. Test all functionality"
    echo "  4. Monitor Vercel dashboard for issues"
    echo ""
    echo "🎯 Ready for November 3rd Launch!"
else
    echo "⚠️  Some deployments failed. Check logs above."
    echo ""
    echo "🔍 Troubleshooting:"
    echo "──────────────────────────────────────────"
    echo "  1. Verify Root Directory is set in Vercel dashboard"
    echo "  2. Check git branch is accessible"
    echo "  3. Review build logs in Vercel"
    echo "  4. Ensure environment variables are set (admin portal)"
fi

echo "============================================"
