#!/bin/bash

echo "================================================"
echo "🧪 Meauxbility Foundation - Local Testing"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env files exist
echo "Checking .env files..."
echo ""

check_env_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓ Found: $1${NC}"
        return 0
    else
        echo -e "${RED}✗ Missing: $1${NC}"
        return 1
    fi
}

ALL_FOUND=true

check_env_file "apps/meauxbility-org/.env.local" || ALL_FOUND=false
check_env_file "apps/inneranimals-shop/.env.local" || ALL_FOUND=false
check_env_file "apps/admin-portal-production/.env.production" || ALL_FOUND=false

echo ""

if [ "$ALL_FOUND" = false ]; then
    echo -e "${RED}❌ Missing .env files!${NC}"
    echo ""
    echo "Run this first:"
    echo "  ./setup-env.sh"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ All .env files found!${NC}"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Starting all three applications...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "This will start:"
echo "  • Meauxbility.org       → http://localhost:3000"
echo "  • Inner Animals Shop    → http://localhost:3002"
echo "  • Admin Portal          → http://localhost:3001"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""
read -p "Press Enter to start..."

# Start all apps
npm run dev:all
