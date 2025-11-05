#!/bin/bash
# =============================================================================
# DOMAIN INFORMATION GATHERING SCRIPT
# =============================================================================
# This script helps you gather all current DNS and domain information
# Usage: ./gather-domain-info.sh
# =============================================================================

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          DOMAIN INFORMATION GATHERING TOOL                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Domains to check
DOMAINS=(
    "meauxbility.org"
    "iaudodidact.com"
    "inneranimals.com"
)

OUTPUT_FILE="domain-info-report.txt"

echo -e "${BLUE}==>${NC} Gathering information for your domains..."
echo ""
echo "This may take a minute. Results will be saved to: ${CYAN}$OUTPUT_FILE${NC}"
echo ""

# Clear previous report
> "$OUTPUT_FILE"

# Header
cat >> "$OUTPUT_FILE" << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║                 DOMAIN INFORMATION REPORT                      ║
╚════════════════════════════════════════════════════════════════╝

Generated: $(date)

This report contains current DNS and domain information for:
- meauxbility.org
- iaudodidact.com
- inneranimals.com

═══════════════════════════════════════════════════════════════════

EOF

# Function to check domain
check_domain() {
    local domain=$1

    echo -e "${BLUE}==>${NC} Checking $domain..."

    cat >> "$OUTPUT_FILE" << EOF

┌────────────────────────────────────────────────────────────────┐
│  Domain: $domain
└────────────────────────────────────────────────────────────────┘

EOF

    # WHOIS information
    echo "WHOIS Information:" >> "$OUTPUT_FILE"
    echo "─────────────────" >> "$OUTPUT_FILE"
    if command -v whois &> /dev/null; then
        whois "$domain" | grep -E "(Registrar:|Name Server:|Updated Date:|Creation Date:|Expiry|Status:)" >> "$OUTPUT_FILE" 2>&1 || echo "  WHOIS lookup failed or timed out" >> "$OUTPUT_FILE"
    else
        echo "  whois command not available" >> "$OUTPUT_FILE"
        echo "  Install with: sudo apt-get install whois" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    # Nameservers
    echo "Nameservers:" >> "$OUTPUT_FILE"
    echo "───────────" >> "$OUTPUT_FILE"
    if command -v dig &> /dev/null; then
        dig +short NS "$domain" >> "$OUTPUT_FILE" 2>&1 || echo "  NS lookup failed" >> "$OUTPUT_FILE"
    else
        echo "  dig command not available" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    # A Records
    echo "A Records (IPv4):" >> "$OUTPUT_FILE"
    echo "────────────────" >> "$OUTPUT_FILE"
    if command -v dig &> /dev/null; then
        dig +short A "$domain" >> "$OUTPUT_FILE" 2>&1 || echo "  A record lookup failed" >> "$OUTPUT_FILE"
    else
        echo "  dig command not available" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    # AAAA Records
    echo "AAAA Records (IPv6):" >> "$OUTPUT_FILE"
    echo "───────────────────" >> "$OUTPUT_FILE"
    if command -v dig &> /dev/null; then
        dig +short AAAA "$domain" >> "$OUTPUT_FILE" 2>&1 || echo "  No IPv6 records" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    # CNAME for www
    echo "WWW CNAME:" >> "$OUTPUT_FILE"
    echo "─────────" >> "$OUTPUT_FILE"
    if command -v dig &> /dev/null; then
        dig +short CNAME "www.$domain" >> "$OUTPUT_FILE" 2>&1 || echo "  No CNAME for www" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    # MX Records
    echo "MX Records (Email):" >> "$OUTPUT_FILE"
    echo "──────────────────" >> "$OUTPUT_FILE"
    if command -v dig &> /dev/null; then
        dig +short MX "$domain" >> "$OUTPUT_FILE" 2>&1 || echo "  No MX records" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    # TXT Records
    echo "TXT Records:" >> "$OUTPUT_FILE"
    echo "───────────" >> "$OUTPUT_FILE"
    if command -v dig &> /dev/null; then
        dig +short TXT "$domain" >> "$OUTPUT_FILE" 2>&1 || echo "  No TXT records" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    # SSL Certificate Check
    echo "SSL Certificate:" >> "$OUTPUT_FILE"
    echo "───────────────" >> "$OUTPUT_FILE"
    if command -v openssl &> /dev/null; then
        timeout 5 openssl s_client -connect "$domain:443" -servername "$domain" </dev/null 2>&1 | \
            grep -E "(subject=|issuer=|notBefore|notAfter)" >> "$OUTPUT_FILE" 2>&1 || \
            echo "  SSL check failed or no certificate" >> "$OUTPUT_FILE"
    else
        echo "  openssl command not available" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    # HTTP Check
    echo "HTTP Status:" >> "$OUTPUT_FILE"
    echo "───────────" >> "$OUTPUT_FILE"
    if command -v curl &> /dev/null; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "https://$domain" --max-time 5 2>&1)
        echo "  HTTPS: $HTTP_CODE" >> "$OUTPUT_FILE"
    else
        echo "  curl command not available" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"

    echo "═══════════════════════════════════════════════════════════════════" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Check all domains
for domain in "${DOMAINS[@]}"; do
    check_domain "$domain"
done

# Summary
cat >> "$OUTPUT_FILE" << 'EOF'

╔════════════════════════════════════════════════════════════════╗
║                           SUMMARY                              ║
╚════════════════════════════════════════════════════════════════╝

To complete domain configuration:

1. Review this report for current DNS settings
2. Fill out DOMAIN-DNS-TEMPLATE.md with the information above
3. Share the completed template for custom configuration
4. Follow DOMAIN-SETUP-GUIDE.md for step-by-step setup

Commands used:
  - whois     (domain registration info)
  - dig       (DNS queries)
  - openssl   (SSL certificate check)
  - curl      (HTTP status check)

If any commands were unavailable, install them:
  sudo apt-get install whois dnsutils openssl curl

EOF

# Display summary
echo ""
echo -e "${GREEN}✓${NC} Information gathering complete!"
echo ""
echo "Results saved to: ${CYAN}$OUTPUT_FILE${NC}"
echo ""
echo "─────────────────────────────────────────────────────────────"
echo ""
echo "📋 Quick Summary:"
echo ""

for domain in "${DOMAINS[@]}"; do
    echo -e "${BLUE}$domain${NC}"

    # Show nameservers
    if command -v dig &> /dev/null; then
        NS=$(dig +short NS "$domain" 2>&1 | head -2)
        if [ -n "$NS" ]; then
            echo "  Nameservers:"
            echo "$NS" | sed 's/^/    /'
        fi
    fi

    # Show current A record
    if command -v dig &> /dev/null; then
        A_RECORD=$(dig +short A "$domain" 2>&1 | head -1)
        if [ -n "$A_RECORD" ]; then
            echo "  Points to: $A_RECORD"
        fi
    fi

    echo ""
done

echo "─────────────────────────────────────────────────────────────"
echo ""
echo "📚 Next Steps:"
echo ""
echo "  1. Review: ${CYAN}$OUTPUT_FILE${NC}"
echo "  2. Fill out: ${CYAN}DOMAIN-DNS-TEMPLATE.md${NC}"
echo "  3. Read: ${CYAN}DOMAIN-SETUP-GUIDE.md${NC}"
echo ""
echo "Need help? Share the report and template with me!"
echo ""
