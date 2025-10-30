#!/bin/bash
# =============================================================================
# ADMIN DASHBOARD - QUICK START SCRIPT
# =============================================================================
# Automatically install and start the admin dashboard for development
# Usage: ./start-admin-dashboard.sh
# =============================================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║             MEAUXBILITY ADMIN DASHBOARD - QUICK START          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ADMIN_DIR="$SCRIPT_DIR/apps/admin-portal-production"

# Check if admin directory exists
if [ ! -d "$ADMIN_DIR" ]; then
    echo -e "${RED}✗${NC} Admin portal directory not found!"
    exit 1
fi

cd "$ADMIN_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}==>${NC} Installing dependencies..."
    echo ""
    npm install
    echo ""
    echo -e "${GREEN}✓${NC} Dependencies installed"
    echo ""
else
    echo -e "${GREEN}✓${NC} Dependencies already installed"
    echo ""
fi

# Check if environment variables are set
if [ ! -f "../../.env.sh" ]; then
    echo -e "${YELLOW}⚠${NC} Environment file not found. Creating template..."
    echo ""
    echo "📝 To configure your admin dashboard:"
    echo "  1. Copy .env.sh.example to .env.sh"
    echo "  2. Add your Supabase credentials"
    echo "  3. Add your Stripe keys"
    echo ""
    echo "See ENVIRONMENT-SETUP.md for details"
    echo ""
fi

# Create local env file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo -e "${BLUE}==>${NC} Creating local environment file..."
    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-key-here
STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here

# Optional: Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
EOF
    echo -e "${GREEN}✓${NC} Created .env.local template"
    echo -e "${YELLOW}⚠${NC} Please update .env.local with your actual credentials"
    echo ""
fi

# Start the development server
echo -e "${BLUE}==>${NC} Starting admin dashboard..."
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    DASHBOARD STARTING...                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Admin Dashboard will be available at:"
echo "   ${GREEN}http://localhost:3001${NC}"
echo ""
echo "🔑 Features available:"
echo "   • Dashboard metrics and analytics"
echo "   • Grant application management"
echo "   • Donation tracking"
echo "   • User management"
echo ""
echo "⚙️  Configure environment variables in:"
echo "   apps/admin-portal-production/.env.local"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "─────────────────────────────────────────────────────────────────"
echo ""

# Start the dev server
npm run dev
