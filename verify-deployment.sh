#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# DEPLOYMENT VERIFICATION SCRIPT
# ═══════════════════════════════════════════════════════════════════
#
# Tests all domains, SSL certificates, redirects, and email
# Run after DNS propagation is complete
#
# Usage: ./verify-deployment.sh
#
# ═══════════════════════════════════════════════════════════════════

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Domains to verify
declare -A DOMAINS=(
    ["meauxbility.org"]="Nonprofit Website (Primary)"
    ["meauxbility.com"]="Should redirect to .org"
    ["inneranimals.com"]="E-commerce Shop"
    ["inneranimalmedia.com"]="Media/Portfolio Site"
    ["iaudodidact.com"]="Admin Dashboard"
)

# Email accounts to check
EMAIL_DOMAINS=(
    "inneranimals.com"
    "meauxbility.org"
)

echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  DEPLOYMENT VERIFICATION - MEAUXBILITY NOVEMBER 3RD LAUNCH${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}Testing all domains, SSL, redirects, and email configuration...${NC}"
echo ""

# Counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
WARNING_TESTS=0

# Test results array
declare -a TEST_RESULTS

# Function to test domain DNS
test_dns() {
    local domain=$1
    local description=$2

    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}🌐 Testing: ${domain}${NC}"
    echo -e "${CYAN}   ${description}${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    # Test 1: DNS Resolution
    echo -n "  📍 DNS Resolution (A record)... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if IP=$(dig +short A "${domain}" | head -n 1); then
        if [ -n "$IP" ]; then
            echo -e "${GREEN}✅ PASS${NC} (${IP})"
            PASSED_TESTS=$((PASSED_TESTS + 1))
            TEST_RESULTS+=("✅ ${domain}: DNS resolves to ${IP}")
        else
            echo -e "${RED}❌ FAIL${NC} (no IP returned)"
            FAILED_TESTS=$((FAILED_TESTS + 1))
            TEST_RESULTS+=("❌ ${domain}: DNS resolution failed")
        fi
    else
        echo -e "${RED}❌ FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        TEST_RESULTS+=("❌ ${domain}: DNS query failed")
    fi

    # Test 2: Nameservers
    echo -n "  📌 Nameservers (should be Vercel)... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    NS=$(dig +short NS "${domain}" | head -n 1)
    if echo "$NS" | grep -q "vercel"; then
        echo -e "${GREEN}✅ PASS${NC} (${NS})"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        TEST_RESULTS+=("✅ ${domain}: Using Vercel nameservers")
    else
        echo -e "${YELLOW}⚠️  WARNING${NC} (${NS})"
        WARNING_TESTS=$((WARNING_TESTS + 1))
        TEST_RESULTS+=("⚠️  ${domain}: Not using Vercel nameservers (${NS})")
    fi

    # Test 3: HTTPS Availability
    echo -n "  🔒 HTTPS/SSL... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${domain}" --max-time 10 2>/dev/null); then
        if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 301 ] || [ "$HTTP_CODE" -eq 302 ] || [ "$HTTP_CODE" -eq 308 ]; then
            echo -e "${GREEN}✅ PASS${NC} (HTTP ${HTTP_CODE})"
            PASSED_TESTS=$((PASSED_TESTS + 1))
            TEST_RESULTS+=("✅ ${domain}: HTTPS working (${HTTP_CODE})")
        else
            echo -e "${YELLOW}⚠️  WARNING${NC} (HTTP ${HTTP_CODE})"
            WARNING_TESTS=$((WARNING_TESTS + 1))
            TEST_RESULTS+=("⚠️  ${domain}: Unexpected HTTP code (${HTTP_CODE})")
        fi
    else
        echo -e "${RED}❌ FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        TEST_RESULTS+=("❌ ${domain}: HTTPS connection failed")
    fi

    # Test 4: SSL Certificate
    echo -n "  📜 SSL Certificate validity... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if echo | openssl s_client -servername "${domain}" -connect "${domain}:443" 2>/dev/null | grep -q "Verify return code: 0"; then
        echo -e "${GREEN}✅ PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        TEST_RESULTS+=("✅ ${domain}: Valid SSL certificate")
    else
        echo -e "${YELLOW}⚠️  WARNING${NC} (may still be provisioning)"
        WARNING_TESTS=$((WARNING_TESTS + 1))
        TEST_RESULTS+=("⚠️  ${domain}: SSL certificate issue (may be provisioning)")
    fi

    # Test 5: Response time
    echo -n "  ⚡ Response time... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "https://${domain}" --max-time 10 2>/dev/null); then
        if (( $(echo "$RESPONSE_TIME < 2.0" | bc -l) )); then
            echo -e "${GREEN}✅ PASS${NC} (${RESPONSE_TIME}s)"
            PASSED_TESTS=$((PASSED_TESTS + 1))
            TEST_RESULTS+=("✅ ${domain}: Fast response (${RESPONSE_TIME}s)")
        else
            echo -e "${YELLOW}⚠️  SLOW${NC} (${RESPONSE_TIME}s)"
            WARNING_TESTS=$((WARNING_TESTS + 1))
            TEST_RESULTS+=("⚠️  ${domain}: Slow response (${RESPONSE_TIME}s)")
        fi
    else
        echo -e "${RED}❌ FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        TEST_RESULTS+=("❌ ${domain}: No response")
    fi

    echo ""
}

# Test redirect
test_redirect() {
    local from_domain=$1
    local to_domain=$2

    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}🔀 Testing Redirect: ${from_domain} → ${to_domain}${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -n "  🔀 Redirect check... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    REDIRECT_LOCATION=$(curl -s -I "https://${from_domain}" --max-time 10 2>/dev/null | grep -i "^location:" | awk '{print $2}' | tr -d '\r')

    if echo "$REDIRECT_LOCATION" | grep -q "${to_domain}"; then
        echo -e "${GREEN}✅ PASS${NC}"
        echo -e "     Redirects to: ${GREEN}${REDIRECT_LOCATION}${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        TEST_RESULTS+=("✅ ${from_domain} correctly redirects to ${to_domain}")
    else
        echo -e "${RED}❌ FAIL${NC}"
        echo -e "     Expected: https://${to_domain}"
        echo -e "     Got: ${REDIRECT_LOCATION:-"No redirect"}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        TEST_RESULTS+=("❌ ${from_domain} redirect not working")
    fi

    echo ""
}

# Test email DNS records
test_email() {
    local domain=$1

    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📧 Testing Email DNS: ${domain}${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    # Test MX records
    echo -n "  📬 MX Records... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    MX_RECORDS=$(dig +short MX "${domain}")
    if [ -n "$MX_RECORDS" ]; then
        echo -e "${GREEN}✅ PASS${NC}"
        echo -e "     ${CYAN}${MX_RECORDS}${NC}" | sed 's/^/     /'
        PASSED_TESTS=$((PASSED_TESTS + 1))
        TEST_RESULTS+=("✅ ${domain}: MX records configured")
    else
        echo -e "${RED}❌ FAIL${NC} (no MX records found!)"
        echo -e "     ${YELLOW}⚠️  Email will NOT work without MX records!${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        TEST_RESULTS+=("❌ ${domain}: NO MX RECORDS - email broken!")
    fi

    # Test SPF record
    echo -n "  📋 SPF Record (TXT)... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    SPF_RECORD=$(dig +short TXT "${domain}" | grep "v=spf1")
    if [ -n "$SPF_RECORD" ]; then
        echo -e "${GREEN}✅ PASS${NC}"
        echo -e "     ${CYAN}${SPF_RECORD}${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        TEST_RESULTS+=("✅ ${domain}: SPF record found")
    else
        echo -e "${YELLOW}⚠️  WARNING${NC} (no SPF record)"
        echo -e "     ${YELLOW}Emails may be marked as spam${NC}"
        WARNING_TESTS=$((WARNING_TESTS + 1))
        TEST_RESULTS+=("⚠️  ${domain}: No SPF record")
    fi

    echo ""
}

# Run all tests
echo ""

# Test individual domains
for domain in "${!DOMAINS[@]}"; do
    test_dns "$domain" "${DOMAINS[$domain]}"
    sleep 1
done

# Test redirect
test_redirect "meauxbility.com" "meauxbility.org"

# Test email configuration
for domain in "${EMAIL_DOMAINS[@]}"; do
    test_email "$domain"
    sleep 1
done

# Final summary
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  TEST SUMMARY${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Total Tests:    ${CYAN}${TOTAL_TESTS}${NC}"
echo -e "  ${GREEN}✅ Passed:      ${PASSED_TESTS}${NC}"
echo -e "  ${YELLOW}⚠️  Warnings:    ${WARNING_TESTS}${NC}"
echo -e "  ${RED}❌ Failed:      ${FAILED_TESTS}${NC}"
echo ""

# Calculate percentage
if [ $TOTAL_TESTS -gt 0 ]; then
    PASS_PERCENTAGE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
    echo -e "  Success Rate:   ${GREEN}${PASS_PERCENTAGE}%${NC}"
    echo ""
fi

# Overall status
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
if [ $FAILED_TESTS -eq 0 ] && [ $WARNING_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! Deployment is LIVE and working perfectly!${NC}"
    echo ""
    echo -e "${GREEN}✅ Ready for November 3rd launch!${NC}"
elif [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  DEPLOYMENT WORKING with ${WARNING_TESTS} warnings${NC}"
    echo ""
    echo -e "Review warnings above - deployment is functional but may need adjustments"
else
    echo -e "${RED}❌ DEPLOYMENT HAS ${FAILED_TESTS} CRITICAL ISSUES${NC}"
    echo ""
    echo -e "${YELLOW}Action required - review failed tests above${NC}"
fi
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

# Detailed results
echo -e "${CYAN}Detailed Results:${NC}"
echo ""
for result in "${TEST_RESULTS[@]}"; do
    echo -e "  $result"
done
echo ""

# Next steps
if [ $FAILED_TESTS -gt 0 ]; then
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}NEXT STEPS:${NC}"
    echo ""
    echo -e "  1. Check Vercel dashboard for domain status"
    echo -e "  2. Verify nameservers are updated at registrar"
    echo -e "  3. If MX records missing, add from backup file"
    echo -e "  4. Wait for DNS propagation (can take up to 48 hours)"
    echo -e "  5. Re-run this script: ./verify-deployment.sh"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
fi

# Exit code based on results
if [ $FAILED_TESTS -gt 0 ]; then
    exit 1
else
    exit 0
fi
