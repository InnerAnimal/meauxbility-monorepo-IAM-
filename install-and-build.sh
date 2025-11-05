#!/bin/bash
# =============================================================================
# MEAUXBILITY MONOREPO - AUTOMATED INSTALLATION & BUILD
# =============================================================================
# This script automatically installs dependencies and builds all applications
# Usage: ./install-and-build.sh
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║       MEAUXBILITY FOUNDATION - AUTOMATED INSTALLATION          ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# =============================================================================
# STEP 1: Check Prerequisites
# =============================================================================
print_step "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current: $(node -v)"
    exit 1
fi
print_success "Node.js $(node -v) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
print_success "npm $(npm -v) detected"

# Check git
if ! command -v git &> /dev/null; then
    print_warning "git is not installed (optional but recommended)"
else
    print_success "git $(git --version | cut -d' ' -f3) detected"
fi

echo ""

# =============================================================================
# STEP 2: Clean Previous Installations (Optional)
# =============================================================================
print_step "Checking for previous installations..."

if [ -d "node_modules" ]; then
    read -p "Previous installation found. Clean install? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_step "Removing old node_modules..."
        rm -rf node_modules
        rm -rf apps/*/node_modules
        rm -rf apps/*/.next
        rm -rf package-lock.json
        rm -rf apps/*/package-lock.json
        print_success "Cleaned previous installation"
    fi
fi

echo ""

# =============================================================================
# STEP 3: Install Root Dependencies
# =============================================================================
print_step "Installing root dependencies..."
echo ""

npm install

if [ $? -eq 0 ]; then
    print_success "Root dependencies installed"
else
    print_error "Failed to install root dependencies"
    exit 1
fi

echo ""

# =============================================================================
# STEP 4: Install App Dependencies
# =============================================================================
print_step "Installing application dependencies..."
echo ""

# Meauxbility.org
print_step "Installing meauxbility.org dependencies..."
cd apps/meauxbility-org
npm install
if [ $? -eq 0 ]; then
    print_success "Meauxbility.org dependencies installed"
else
    print_error "Failed to install meauxbility.org dependencies"
    exit 1
fi
cd ../..

# Admin Portal
print_step "Installing admin portal dependencies..."
cd apps/admin-portal-production
npm install
if [ $? -eq 0 ]; then
    print_success "Admin portal dependencies installed"
else
    print_error "Failed to install admin portal dependencies"
    exit 1
fi
cd ../..

# Inner Animals Shop
print_step "Installing shop dependencies..."
cd apps/inneranimals-shop
npm install
if [ $? -eq 0 ]; then
    print_success "Shop dependencies installed"
else
    print_error "Failed to install shop dependencies"
    exit 1
fi
cd ../..

echo ""

# =============================================================================
# STEP 5: Build Applications
# =============================================================================
print_step "Building applications..."
echo ""

BUILD_ERRORS=0

# Build Meauxbility.org
print_step "Building meauxbility.org..."
cd apps/meauxbility-org
if npm run build; then
    print_success "Meauxbility.org built successfully"
else
    print_error "Failed to build meauxbility.org"
    BUILD_ERRORS=$((BUILD_ERRORS + 1))
fi
cd ../..
echo ""

# Build Admin Portal
print_step "Building admin portal..."
cd apps/admin-portal-production
if npm run build; then
    print_success "Admin portal built successfully"
else
    print_error "Failed to build admin portal"
    BUILD_ERRORS=$((BUILD_ERRORS + 1))
fi
cd ../..
echo ""

# Build Inner Animals Shop
print_step "Building shop..."
cd apps/inneranimals-shop
if npm run build; then
    print_success "Shop built successfully"
else
    print_error "Failed to build shop"
    BUILD_ERRORS=$((BUILD_ERRORS + 1))
fi
cd ../..
echo ""

# =============================================================================
# STEP 6: Verify Builds
# =============================================================================
print_step "Verifying builds..."
echo ""

VERIFIED=0
TOTAL=3

if [ -d "apps/meauxbility-org/.next" ]; then
    print_success "Meauxbility.org build verified"
    VERIFIED=$((VERIFIED + 1))
else
    print_error "Meauxbility.org build not found"
fi

if [ -d "apps/admin-portal-production/.next" ]; then
    print_success "Admin portal build verified"
    VERIFIED=$((VERIFIED + 1))
else
    print_error "Admin portal build not found"
fi

if [ -d "apps/inneranimals-shop/.next" ]; then
    print_success "Shop build verified"
    VERIFIED=$((VERIFIED + 1))
else
    print_error "Shop build not found"
fi

echo ""

# =============================================================================
# SUMMARY
# =============================================================================
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    INSTALLATION SUMMARY                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo -e "${BLUE}Applications Built:${NC} $VERIFIED/$TOTAL"
echo ""

if [ $VERIFIED -eq $TOTAL ]; then
    print_success "All applications installed and built successfully!"
    echo ""
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                      NEXT STEPS                                ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🚀 Ready to deploy! Choose one option:"
    echo ""
    echo "Option 1: Start development servers"
    echo "  ${GREEN}npm run dev:all${NC}"
    echo "  Access at:"
    echo "    • Meauxbility.org:  http://localhost:3000"
    echo "    • Admin Portal:     http://localhost:3001"
    echo "    • Shop:             http://localhost:3002"
    echo ""
    echo "Option 2: Deploy to Vercel (Dashboard)"
    echo "  1. Go to: https://vercel.com/dashboard"
    echo "  2. Connect your GitHub repository"
    echo "  3. Set Root Directories (see QUICK-DEPLOY.md)"
    echo ""
    echo "Option 3: Deploy to Vercel (CLI)"
    echo "  ${GREEN}source .env.sh${NC}  # Load your credentials"
    echo "  ${GREEN}vercel --prod${NC}   # Deploy each app"
    echo ""
    echo "📚 Documentation:"
    echo "  • QUICK-DEPLOY.md              - Quick deployment reference"
    echo "  • VERCEL-DASHBOARD-DEPLOYMENT.md - Complete dashboard guide"
    echo "  • ENVIRONMENT-SETUP.md         - Environment configuration"
    echo ""
    exit 0
else
    print_error "Some applications failed to build"
    echo ""
    echo "Build Errors: $BUILD_ERRORS"
    echo ""
    echo "🔍 Troubleshooting:"
    echo "  1. Check the error messages above"
    echo "  2. Ensure Node.js 18+ is installed"
    echo "  3. Try: rm -rf node_modules && npm install"
    echo "  4. Check internet connection for npm packages"
    echo ""
    exit 1
fi
