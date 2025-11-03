#!/usr/bin/env bash
set -euo pipefail

echo "================================================"
echo "📦 MEAUXBILITY MONOREPO SCAN"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Apps & Packages${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
find apps -maxdepth 1 -type d | tail -n +2 | while read dir; do
    if [ -f "$dir/package.json" ]; then
        name=$(jq -r '.name' "$dir/package.json")
        version=$(jq -r '.version' "$dir/package.json")
        echo -e "${GREEN}✓${NC} $dir ($name@$version)"
    else
        echo -e "${RED}✗${NC} $dir (no package.json)"
    fi
done
echo ""

echo -e "${BLUE}🧩 Framework Detection${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for app in apps/*; do
    if [ -d "$app" ]; then
        echo -e "\n${YELLOW}$app:${NC}"
        [ -f "$app/next.config.js" ] && echo "  - Next.js (next.config.js)" || true
        [ -f "$app/next.config.mjs" ] && echo "  - Next.js (next.config.mjs)" || true
        [ -f "$app/next.config.ts" ] && echo "  - Next.js (next.config.ts)" || true
        [ -f "$app/vercel.json" ] && echo "  - Vercel config present" || true
        [ -f "$app/tsconfig.json" ] && echo "  - TypeScript configured" || true
        [ -f "$app/tailwind.config.ts" ] && echo "  - Tailwind CSS configured" || true
        [ -f "$app/tailwind.config.js" ] && echo "  - Tailwind CSS configured" || true
    fi
done
echo ""

echo -e "${BLUE}⚙️  Build Scripts${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for app in apps/*; do
    if [ -f "$app/package.json" ]; then
        echo -e "\n${YELLOW}$(basename $app):${NC}"
        jq -r '.scripts | to_entries[] | select(.key | test("build|dev|start|lint")) | "  \(.key): \(.value)"' "$app/package.json"
    fi
done
echo ""

echo -e "${BLUE}🔐 Environment Variables Referenced${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for app in apps/*; do
    if [ -d "$app/src" ]; then
        echo -e "\n${YELLOW}$(basename $app):${NC}"
        grep -roh "process\.env\.[A-Z_][A-Z0-9_]*" "$app/src" 2>/dev/null | sort -u | sed 's/^/  /' || echo "  No env vars found"
    fi
done
echo ""

echo -e "${BLUE}📄 Environment Files Present${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for app in apps/*; do
    echo -e "\n${YELLOW}$(basename $app):${NC}"
    [ -f "$app/.env.local" ] && echo -e "  ${GREEN}✓${NC} .env.local" || echo -e "  ${RED}✗${NC} .env.local"
    [ -f "$app/.env.production" ] && echo -e "  ${GREEN}✓${NC} .env.production" || echo -e "  ${RED}✗${NC} .env.production"
    [ -f "$app/.env.local.example" ] && echo -e "  ${GREEN}✓${NC} .env.local.example" || echo -e "  ${RED}✗${NC} .env.local.example"
    [ -f "$app/.env.production.example" ] && echo -e "  ${GREEN}✓${NC} .env.production.example" || echo -e "  ${RED}✗${NC} .env.production.example"
done
echo ""

echo -e "${BLUE}🏗️  Build Status Check${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for app in apps/*; do
    if [ -f "$app/package.json" ]; then
        echo -e "\n${YELLOW}$(basename $app):${NC}"
        if [ -d "$app/.next" ]; then
            echo -e "  ${GREEN}✓${NC} Built (.next directory exists)"
            echo "  Last built: $(stat -c %y "$app/.next" | cut -d' ' -f1)"
        else
            echo -e "  ${YELLOW}⚠${NC}  Not built yet (.next directory missing)"
        fi
    fi
done
echo ""

echo -e "${BLUE}📦 Dependencies Check${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for app in apps/*; do
    if [ -f "$app/package.json" ]; then
        echo -e "\n${YELLOW}$(basename $app):${NC}"
        if [ -d "$app/node_modules" ]; then
            count=$(find "$app/node_modules" -maxdepth 1 -type d | wc -l)
            echo -e "  ${GREEN}✓${NC} Dependencies installed ($count packages)"
        else
            echo -e "  ${RED}✗${NC} Dependencies not installed (run npm install)"
        fi

        # Check for key dependencies
        echo "  Key dependencies:"
        jq -r '.dependencies | keys[] | select(test("next|react|supabase|stripe"))' "$app/package.json" | sed 's/^/    - /' || echo "    None found"
    fi
done
echo ""

echo -e "${BLUE}🚀 Vercel Configuration${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
for app in apps/*; do
    if [ -f "$app/vercel.json" ]; then
        echo -e "\n${YELLOW}$(basename $app):${NC}"
        echo "  Framework: $(jq -r '.framework // "not specified"' "$app/vercel.json")"
        echo "  Build Command: $(jq -r '.buildCommand // "default"' "$app/vercel.json")"
        echo "  Output Directory: $(jq -r '.outputDirectory // "default"' "$app/vercel.json")"
    fi
done
echo ""

echo -e "${BLUE}🧪 Git Status${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Current branch: $(git branch --show-current)"
echo "Latest commit: $(git log -1 --oneline)"
echo "Uncommitted changes: $(git status --short | wc -l) files"
echo ""

echo -e "${BLUE}📊 Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
total_apps=$(find apps -maxdepth 1 -type d | tail -n +2 | wc -l)
built_apps=$(find apps -name ".next" -type d | wc -l)
echo "Total apps: $total_apps"
echo "Built apps: $built_apps"
echo "Apps with dependencies: $(find apps -name "node_modules" -type d | wc -l)"
echo ""

if [ $built_apps -eq $total_apps ]; then
    echo -e "${GREEN}✅ All apps are built and ready!${NC}"
else
    echo -e "${YELLOW}⚠️  Some apps need to be built. Run: npm run build:all${NC}"
fi
echo ""

echo "================================================"
echo "Scan complete!"
echo "================================================"
