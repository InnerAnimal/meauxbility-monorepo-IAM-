#!/bin/bash

echo "================================================"
echo "🚀 Meauxbility Foundation - Environment Setup"
echo "================================================"
echo ""
echo "This script will help you create .env files for all three apps."
echo "Have your API keys ready!"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to read input
read_input() {
    read -p "$1: " value
    echo "$value"
}

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 1: Supabase Configuration${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

SUPABASE_URL=$(read_input "Enter your Supabase Project URL (https://xxxxx.supabase.co)")
SUPABASE_ANON=$(read_input "Enter your Supabase Anon Key (starts with eyJ...)")
SUPABASE_SERVICE=$(read_input "Enter your Supabase Service Role Key (starts with eyJ...)")

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 2: Stripe Configuration${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Using TEST keys or LIVE keys? (Enter 'test' or 'live')"
read -p "Mode: " STRIPE_MODE

if [ "$STRIPE_MODE" = "live" ]; then
    STRIPE_PUB=$(read_input "Enter your Stripe LIVE Publishable Key (pk_live_...)")
    STRIPE_SECRET=$(read_input "Enter your Stripe LIVE Secret Key (sk_live_...)")
else
    STRIPE_PUB=$(read_input "Enter your Stripe TEST Publishable Key (pk_test_...)")
    STRIPE_SECRET=$(read_input "Enter your Stripe TEST Secret Key (sk_test_...)")
fi

echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Creating .env files...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Create .env.local for meauxbility-org
echo "Creating apps/meauxbility-org/.env.local"
cat > apps/meauxbility-org/.env.local << EOF
# Meauxbility.org Environment Variables
# Generated: $(date)

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON
SUPABASE_SERVICE_ROLE=$SUPABASE_SERVICE

# Stripe Configuration ($STRIPE_MODE mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUB
STRIPE_SECRET_KEY=$STRIPE_SECRET

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

echo -e "${GREEN}✓ Created apps/meauxbility-org/.env.local${NC}"

# Create .env.local for inneranimals-shop
echo "Creating apps/inneranimals-shop/.env.local"
cat > apps/inneranimals-shop/.env.local << EOF
# Inner Animals Shop Environment Variables
# Generated: $(date)

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON
SUPABASE_SERVICE_ROLE=$SUPABASE_SERVICE

# Stripe Configuration ($STRIPE_MODE mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUB
STRIPE_SECRET_KEY=$STRIPE_SECRET

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3002
EOF

echo -e "${GREEN}✓ Created apps/inneranimals-shop/.env.local${NC}"

# Create .env.production for admin-portal
echo "Creating apps/admin-portal-production/.env.production"
cat > apps/admin-portal-production/.env.production << EOF
# Admin Portal Environment Variables
# Generated: $(date)

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON
SUPABASE_SERVICE_ROLE=$SUPABASE_SERVICE

# Stripe Configuration ($STRIPE_MODE mode)
STRIPE_SECRET_KEY=$STRIPE_SECRET
STRIPE_PUBLISHABLE_KEY=$STRIPE_PUB
EOF

echo -e "${GREEN}✓ Created apps/admin-portal-production/.env.production${NC}"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ SUCCESS! All .env files created!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Next steps:"
echo "1. Test locally: npm run dev:all"
echo "2. Deploy to Vercel: ./deploy-to-vercel.sh"
echo ""
