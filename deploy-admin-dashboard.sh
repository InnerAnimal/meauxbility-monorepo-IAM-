#!/bin/bash
# =============================================================================
# ADMIN DASHBOARD - VERCEL DEPLOYMENT SCRIPT
# =============================================================================
# Automatically deploy admin dashboard to Vercel
# Usage: ./deploy-admin-dashboard.sh
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         ADMIN DASHBOARD - VERCEL DEPLOYMENT                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if .env.sh exists
if [ -f ".env.sh" ]; then
    echo -e "${BLUE}==>${NC} Loading environment variables..."
    source .env.sh
    echo ""
else
    echo -e "${YELLOW}⚠${NC} .env.sh not found"
    echo ""
    echo "Create .env.sh with your Vercel token:"
    echo "  cp .env.sh.example .env.sh"
    echo "  # Edit .env.sh and add your token"
    echo ""
    echo "Or deploy via Vercel Dashboard:"
    echo "  See: VERCEL-DASHBOARD-DEPLOYMENT.md"
    echo ""
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠${NC} Vercel CLI not installed"
    echo ""
    echo "Installing Vercel CLI globally..."
    npm install -g vercel
    echo ""
fi

# Navigate to admin portal
cd apps/admin-portal-production

echo -e "${BLUE}==>${NC} Admin Portal Deployment"
echo ""
echo "📋 Project Details:"
echo "   Project ID: ${CYAN}prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY${NC}"
echo "   Domain:     ${CYAN}iaudodidact.com${NC}"
echo "   Directory:  ${CYAN}apps/admin-portal-production${NC}"
echo ""

# Check for environment variables
MISSING_VARS=0

if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ "$NEXT_PUBLIC_SUPABASE_URL" = "https://your-project.supabase.co" ]; then
    echo -e "${YELLOW}⚠${NC} NEXT_PUBLIC_SUPABASE_URL not configured"
    MISSING_VARS=$((MISSING_VARS + 1))
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ] || [[ "$NEXT_PUBLIC_SUPABASE_ANON_KEY" == "eyJhbGci"* ]]; then
    echo -e "${YELLOW}⚠${NC} NEXT_PUBLIC_SUPABASE_ANON_KEY not configured"
    MISSING_VARS=$((MISSING_VARS + 1))
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ] || [[ "$SUPABASE_SERVICE_ROLE_KEY" == "eyJhbGci"* ]]; then
    echo -e "${YELLOW}⚠${NC} SUPABASE_SERVICE_ROLE_KEY not configured"
    MISSING_VARS=$((MISSING_VARS + 1))
fi

if [ -z "$STRIPE_SECRET_KEY" ] || [ "$STRIPE_SECRET_KEY" = "sk_test_51..." ]; then
    echo -e "${YELLOW}⚠${NC} STRIPE_SECRET_KEY not configured"
    MISSING_VARS=$((MISSING_VARS + 1))
fi

if [ $MISSING_VARS -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠${NC} $MISSING_VARS environment variable(s) not configured"
    echo ""
    echo "Admin dashboard needs these credentials:"
    echo "  • Supabase URL and keys"
    echo "  • Stripe API keys"
    echo ""
    echo "Update .env.sh with your credentials and try again"
    echo "Or add them in Vercel Dashboard → Settings → Environment Variables"
    echo ""

    read -p "Continue deployment anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled"
        exit 1
    fi
fi

echo ""
echo -e "${BLUE}==>${NC} Deploying to Vercel..."
echo ""

# Try to deploy
if [ -n "$VERCEL_TOKEN" ] && [ "$VERCEL_TOKEN" != "PASTE_YOUR_VERCEL_TOKEN_HERE" ]; then
    # Using token from .env.sh
    echo "Using Vercel token from .env.sh..."

    # Create .vercel directory if it doesn't exist
    mkdir -p .vercel

    # Create project.json
    cat > .vercel/project.json << EOF
{
  "projectId": "prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY",
  "orgId": "team_meauxbility"
}
EOF

    # Attempt deployment
    if vercel --prod --token "$VERCEL_TOKEN" --yes 2>&1; then
        echo ""
        echo -e "${GREEN}✓${NC} Admin dashboard deployed successfully!"
        echo ""
        echo "🌐 Your admin dashboard should be live at:"
        echo "   ${GREEN}https://iaudodidact.com${NC}"
        echo ""
    else
        DEPLOY_ERROR=$?
        echo ""
        echo -e "${RED}✗${NC} Deployment failed"
        echo ""
        echo "Possible issues:"
        echo "  1. Token may not have deployment permissions"
        echo "  2. Project linking may need to be done via dashboard"
        echo ""
        echo "📝 Alternative: Deploy via Vercel Dashboard"
        echo "   1. Go to: https://vercel.com/dashboard"
        echo "   2. Select project: prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY"
        echo "   3. Settings → Git → Connect Repository"
        echo "   4. Repository: InnerAnimal/meauxbility-monorepo-IAM-"
        echo "   5. Root Directory: apps/admin-portal-production"
        echo "   6. Add environment variables"
        echo "   7. Redeploy"
        echo ""
        echo "See: VERCEL-DASHBOARD-DEPLOYMENT.md for full guide"
        echo ""
        exit $DEPLOY_ERROR
    fi
else
    echo -e "${YELLOW}⚠${NC} No valid Vercel token found"
    echo ""
    echo "📝 Deploy via Vercel Dashboard instead:"
    echo ""
    echo "Step 1: Go to Vercel Dashboard"
    echo "  https://vercel.com/dashboard"
    echo ""
    echo "Step 2: Select Your Admin Portal Project"
    echo "  Project ID: prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY"
    echo ""
    echo "Step 3: Connect GitHub Repository"
    echo "  Settings → Git → Connect Git Repository"
    echo "  Repository: InnerAnimal/meauxbility-monorepo-IAM-"
    echo "  Branch: claude/november-3-unified-launch-011CUdHf21XhHwqH2VgUqq7n"
    echo ""
    echo "Step 4: Set Root Directory"
    echo "  Root Directory: apps/admin-portal-production"
    echo ""
    echo "Step 5: Add Environment Variables"
    echo "  Settings → Environment Variables → Add:"
    echo "    • NEXT_PUBLIC_SUPABASE_URL"
    echo "    • NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "    • SUPABASE_SERVICE_ROLE_KEY"
    echo "    • STRIPE_SECRET_KEY"
    echo "    • STRIPE_PUBLISHABLE_KEY"
    echo ""
    echo "Step 6: Deploy"
    echo "  Click 'Redeploy' or push to GitHub"
    echo ""
    echo "📚 Full guide: VERCEL-DASHBOARD-DEPLOYMENT.md"
    echo ""
    exit 1
fi

# Return to root
cd ../..

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                   DEPLOYMENT COMPLETE                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "✅ Next Steps:"
echo "   1. Visit your dashboard: https://iaudodidact.com"
echo "   2. Configure custom domain if needed"
echo "   3. Add team members in Vercel settings"
echo "   4. Monitor analytics and logs"
echo ""
