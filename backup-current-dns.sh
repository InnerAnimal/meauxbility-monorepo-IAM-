#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# DNS & EMAIL RECORD BACKUP SCRIPT
# ═══════════════════════════════════════════════════════════════════
#
# RUN THIS BEFORE CHANGING ANY DNS/NAMESERVERS!
# Saves all current DNS records to preserve email configuration
#
# Usage: ./backup-current-dns.sh
# Output: dns-backup-[timestamp].txt
#
# ═══════════════════════════════════════════════════════════════════

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Timestamp for backup file
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="dns-backup-${TIMESTAMP}.txt"

# Domains to backup
DOMAINS=(
    "inneranimals.com"
    "inneranimalmedia.com"
    "iaudodidact.com"
    "meauxbility.org"
    "meauxbility.com"
    "meauxxx.com"
)

echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  DNS & EMAIL BACKUP - MEAUXBILITY NOVEMBER 3RD LAUNCH${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}⚠️  CRITICAL: This backup preserves your email configuration!${NC}"
echo -e "${YELLOW}   Save this file before changing nameservers.${NC}"
echo ""
echo -e "Backup file: ${GREEN}${BACKUP_FILE}${NC}"
echo ""

# Initialize backup file
{
    echo "═══════════════════════════════════════════════════════════════════"
    echo "DNS & EMAIL RECORD BACKUP"
    echo "Created: $(date)"
    echo "═══════════════════════════════════════════════════════════════════"
    echo ""
    echo "⚠️  KEEP THIS FILE SAFE!"
    echo "These records are needed to restore email after DNS migration."
    echo ""
    echo "═══════════════════════════════════════════════════════════════════"
    echo ""
} > "${BACKUP_FILE}"

# Function to query and save DNS records
backup_domain() {
    local domain=$1

    echo -e "${BLUE}📋 Backing up: ${domain}${NC}"

    {
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "DOMAIN: ${domain}"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""

        # Nameservers (NS)
        echo "📌 NAMESERVERS (NS):"
        echo "---"
        dig +short NS "${domain}" || echo "  ❌ No NS records found"
        echo ""

        # A Records
        echo "📌 A RECORDS (IPv4):"
        echo "---"
        dig +short A "${domain}" || echo "  ❌ No A records found"
        echo ""

        # AAAA Records
        echo "📌 AAAA RECORDS (IPv6):"
        echo "---"
        dig +short AAAA "${domain}" || echo "  ❌ No AAAA records found"
        echo ""

        # MX Records (CRITICAL FOR EMAIL!)
        echo "🔴 MX RECORDS (EMAIL - CRITICAL!):"
        echo "---"
        dig +short MX "${domain}" || echo "  ❌ No MX records found"
        echo ""

        # TXT Records (SPF, DKIM, DMARC for email)
        echo "📌 TXT RECORDS (SPF/DKIM/DMARC):"
        echo "---"
        dig +short TXT "${domain}" || echo "  ❌ No TXT records found"
        echo ""

        # CNAME Records
        echo "📌 CNAME RECORDS:"
        echo "---"
        dig +short CNAME "${domain}" || echo "  ❌ No CNAME records found"
        echo ""

        # WWW variant
        echo "📌 WWW SUBDOMAIN:"
        echo "---"
        dig +short A "www.${domain}" || echo "  ❌ No www A records found"
        dig +short CNAME "www.${domain}" || echo "  ❌ No www CNAME records found"
        echo ""

        echo ""
    } >> "${BACKUP_FILE}"
}

# Backup all domains
for domain in "${DOMAINS[@]}"; do
    backup_domain "${domain}"
    sleep 1  # Rate limiting
done

# Summary
{
    echo "═══════════════════════════════════════════════════════════════════"
    echo "BACKUP COMPLETE"
    echo "═══════════════════════════════════════════════════════════════════"
    echo ""
    echo "📧 EMAIL CONFIGURATION TO PRESERVE:"
    echo "---"
    echo "Accounts that must continue working:"
    echo "  • sam@inneranimals.com"
    echo "  • connor@inneranimals.com"
    echo "  • fred@inneranimals.com"
    echo "  • info@inneranimals.com"
    echo "  • info@meauxbility.org"
    echo ""
    echo "NEXT STEPS:"
    echo "1. Review MX records above (marked 🔴 CRITICAL)"
    echo "2. After DNS migration to Vercel:"
    echo "   a. Go to Vercel Dashboard → Domain → DNS Records"
    echo "   b. Add back ALL MX records exactly as shown above"
    echo "   c. Add back ALL TXT records (SPF/DKIM/DMARC)"
    echo "3. Verify email works by sending test message"
    echo ""
    echo "═══════════════════════════════════════════════════════════════════"
} >> "${BACKUP_FILE}"

echo ""
echo -e "${GREEN}✅ Backup complete!${NC}"
echo -e "${GREEN}   File saved: ${BACKUP_FILE}${NC}"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT NEXT STEPS:${NC}"
echo -e "   1. Review the backup file (especially MX records)"
echo -e "   2. Keep this file safe - you'll need it after DNS migration"
echo -e "   3. After changing nameservers to Vercel:"
echo -e "      → Add MX records back in Vercel dashboard"
echo -e "      → Add TXT records back (SPF/DKIM)"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}🔍 Quick check - Email domains with MX records:${NC}"
echo ""

# Quick MX check
for domain in "${DOMAINS[@]}"; do
    mx_count=$(dig +short MX "${domain}" | wc -l)
    if [ "$mx_count" -gt 0 ]; then
        echo -e "  ${GREEN}✅ ${domain} has ${mx_count} MX record(s)${NC}"
    else
        echo -e "  ${YELLOW}⚠️  ${domain} has no MX records${NC}"
    fi
done

echo ""
echo -e "${BLUE}Backup saved to: ${BACKUP_FILE}${NC}"
echo ""
