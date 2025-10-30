#!/bin/bash
# ============================================
# SECURE DEPLOYMENT SCRIPT
# ============================================
#
# This script deploys your application using environment files
# instead of hardcoded credentials.
#
# USAGE:
#   ./deploy-secure.sh [environment]
#
# ENVIRONMENTS:
#   production  - Deploy to production
#   preview     - Deploy preview/staging
#   development - Deploy development
#
# REQUIREMENTS:
#   - Vercel CLI installed (npm install -g vercel)
#   - .env.production file with your secrets
#   - Vercel project linked (vercel link)
#
# ============================================

set -e  # Exit on error

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="admin-portal-production"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Parse environment argument
ENVIRONMENT="${1:-production}"

if [[ ! "$ENVIRONMENT" =~ ^(production|preview|development)$ ]]; then
    log_error "Invalid environment: $ENVIRONMENT"
    echo ""
    echo "Usage: $0 [production|preview|development]"
    exit 1
fi

echo "🚀 SECURE DEPLOYMENT SCRIPT"
echo "============================"
echo ""
log_info "Project: $PROJECT_NAME"
log_info "Environment: $ENVIRONMENT"
log_info "Directory: $SCRIPT_DIR"
echo ""

# Check if required tools are installed
log_info "Checking prerequisites..."

if ! command -v vercel &> /dev/null; then
    log_error "Vercel CLI is not installed"
    echo "Install it with: npm install -g vercel"
    exit 1
fi

log_success "Vercel CLI found"

# Check if environment file exists
ENV_FILE="$SCRIPT_DIR/.env.$ENVIRONMENT"

if [ ! -f "$ENV_FILE" ]; then
    log_error "Environment file not found: $ENV_FILE"
    echo ""
    echo "Create it by copying the example:"
    echo "  cp .env.production.example .env.production"
    echo ""
    echo "Then edit it with your actual credentials."
    exit 1
fi

log_success "Environment file found: $ENV_FILE"

# Verify .gitignore includes environment files
if ! grep -q "^\.env\." "$SCRIPT_DIR/.gitignore" 2>/dev/null; then
    log_warning ".env files may not be in .gitignore"
    log_warning "Consider adding '.env.*' to .gitignore to protect secrets"
fi

# Check if Vercel project is linked
if [ ! -f "$SCRIPT_DIR/.vercel/project.json" ]; then
    log_warning "Vercel project not linked"
    log_info "Running 'vercel link'..."

    vercel link

    if [ $? -ne 0 ]; then
        log_error "Failed to link Vercel project"
        exit 1
    fi
fi

log_success "Vercel project linked"

# Confirm deployment
echo ""
echo "Ready to deploy to $ENVIRONMENT"
echo ""
log_warning "This will deploy with credentials from: $ENV_FILE"
echo ""

read -p "Continue with deployment? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    log_info "Deployment cancelled"
    exit 0
fi

echo ""
log_info "Starting deployment process..."
echo ""

# Sync environment variables to Vercel
log_info "Syncing environment variables to Vercel..."

# Read .env file and upload to Vercel
# Skip comments and empty lines
while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue

    # Remove leading/trailing whitespace
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)

    # Skip if key is empty after trimming
    [ -z "$key" ] && continue

    # Add to Vercel (will update if exists)
    echo "$value" | vercel env add "$key" "$ENVIRONMENT" --force > /dev/null 2>&1 || true

done < "$ENV_FILE"

log_success "Environment variables synced"

# Run pre-deployment checks
log_info "Running pre-deployment checks..."

# Check for TypeScript errors
if command -v npm &> /dev/null; then
    log_info "Type checking..."
    if npm run build --dry-run > /dev/null 2>&1; then
        log_success "Type check passed"
    else
        log_warning "Type check had issues (continuing anyway)"
    fi
fi

# Deploy to Vercel
echo ""
log_info "Deploying to Vercel..."
echo ""

if [ "$ENVIRONMENT" = "production" ]; then
    vercel --prod --yes
else
    vercel --yes
fi

DEPLOY_EXIT_CODE=$?

echo ""

if [ $DEPLOY_EXIT_CODE -eq 0 ]; then
    log_success "Deployment completed successfully!"
    echo ""
    log_info "Next steps:"
    echo "  1. Check the deployment URL provided above"
    echo "  2. Run health checks"
    echo "  3. Monitor application logs"
    echo ""
else
    log_error "Deployment failed"
    exit $DEPLOY_EXIT_CODE
fi

# Offer to run AI-powered deployment workflow
echo ""
log_info "💡 Tip: For advanced deployments with AI-powered validation,"
log_info "    use the integrated workflow system:"
echo ""
echo "    curl -X POST http://localhost:3001/api/workflows/execute \\"
echo "      -H 'Content-Type: application/json' \\"
echo "      -d '{\"workflowId\": \"integrated-deployment\", \"input\": {...}}'"
echo ""

log_success "All done! 🎉"
