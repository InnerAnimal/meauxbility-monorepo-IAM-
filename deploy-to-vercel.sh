#!/bin/bash

echo "================================================"
echo "🚀 Meauxbility Foundation - Vercel Deployment"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found!${NC}"
    echo "Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install Vercel CLI. Please run: npm install -g vercel${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Vercel CLI is installed${NC}"
echo ""

# Check if logged in to Vercel
echo "Checking Vercel authentication..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Not logged in to Vercel. Logging in...${NC}"
    vercel login
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to login to Vercel${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Logged in to Vercel${NC}"
echo ""

# Function to deploy an app
deploy_app() {
    local APP_NAME=$1
    local APP_PATH=$2
    local DOMAIN=$3

    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}Deploying: $APP_NAME${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    cd "$APP_PATH" || exit

    echo "Deploying to production..."
    vercel --prod --yes

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $APP_NAME deployed successfully!${NC}"
        echo ""
        echo -e "${YELLOW}IMPORTANT: Add environment variables in Vercel dashboard!${NC}"
        echo "1. Go to: https://vercel.com/dashboard"
        echo "2. Click on your project: $APP_NAME"
        echo "3. Go to: Settings > Environment Variables"
        echo "4. Add all variables from your .env file"
        echo ""
        echo "Domain: $DOMAIN"
        echo "Configure this domain in: Settings > Domains"
    else
        echo -e "${RED}❌ Failed to deploy $APP_NAME${NC}"
        exit 1
    fi

    cd - > /dev/null
}

# Get repository root
REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT" || exit

echo "Starting deployment of all three apps..."
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

# Deploy Meauxbility.org
deploy_app "meauxbility-org" "apps/meauxbility-org" "meauxbility.org"

echo ""
read -p "Press Enter to deploy Inner Animals Shop..."

# Deploy Inner Animals Shop
deploy_app "inneranimals-shop" "apps/inneranimals-shop" "inneranimals.com"

echo ""
read -p "Press Enter to deploy Admin Portal..."

# Deploy Admin Portal
deploy_app "admin-portal-production" "apps/admin-portal-production" "iaudodidact.com"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 ALL APPS DEPLOYED!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}⚠️  NEXT STEPS (CRITICAL):${NC}"
echo ""
echo "For EACH app in Vercel Dashboard (https://vercel.com/dashboard):"
echo ""
echo "1. Click on the project"
echo "2. Go to Settings > Environment Variables"
echo "3. Add these variables (from your .env files):"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE"
echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   - STRIPE_SECRET_KEY"
echo "   - NEXT_PUBLIC_APP_URL (set to your production domain)"
echo ""
echo "4. Go to Settings > Domains"
echo "5. Add your custom domain:"
echo "   - meauxbility-org → meauxbility.org"
echo "   - inneranimals-shop → inneranimals.com"
echo "   - admin-portal-production → iaudodidact.com"
echo ""
echo "6. After adding env vars, redeploy each app:"
echo "   vercel --prod"
echo ""
echo -e "${GREEN}Your apps are now deployed! 🚀${NC}"
echo ""
