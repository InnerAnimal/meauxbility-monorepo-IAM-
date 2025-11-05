# 🌐 Complete Domain Setup Guide

This guide walks you through connecting your custom domains to your Vercel applications.

---

## 🎯 Overview

**Goal:** Connect your branded domains to your deployed applications

**Domains to Configure:**
- `meauxbility.org` → Main nonprofit website
- `iaudodidact.com` → Admin portal
- `inneranimals.com` → E-commerce shop

**Time Required:** ~15-30 minutes per domain

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Access to your domain registrar account
- ✅ Ability to modify DNS records
- ✅ Vercel project deployed and accessible
- ✅ Admin access to Vercel dashboard

---

## 🚀 Step-by-Step Setup

### Phase 1: Add Domain in Vercel Dashboard

#### For Each Application:

**1. Navigate to Vercel Project**
```
1. Go to: https://vercel.com/dashboard
2. Click on your project (e.g., meauxbility-org)
3. Click "Settings" at the top
4. Click "Domains" in the sidebar
```

**2. Add Your Domain**
```
1. In the "Add Domain" field, enter your domain:
   Example: meauxbility.org

2. Click "Add"

3. Vercel will show you DNS configuration needed
```

**3. Choose Configuration Type**

Vercel will ask how to configure the domain:

**Option A: Using Vercel Nameservers (Easiest)**
```
✅ Recommended for simplicity
✅ Vercel manages everything (DNS + SSL)
✅ Fastest propagation

Vercel provides:
  ns1.vercel-dns.com
  ns2.vercel-dns.com

Action: Update nameservers at your registrar
```

**Option B: Using Your Current DNS Provider**
```
✅ Keep existing DNS setup
✅ More control over DNS records
✅ Useful if you have email/other services

Vercel provides:
  A Record: 76.76.21.21
  CNAME: cname.vercel-dns.com

Action: Add these records to your DNS provider
```

---

### Phase 2: Configure DNS Records

#### Option A: Using Vercel Nameservers

**At Your Registrar (GoDaddy, Namecheap, etc.):**

1. **Find Nameserver Settings**
   - Look for: "Nameservers", "DNS", or "Name Servers"
   - Usually in: Domain Management → DNS Settings

2. **Change to Custom Nameservers**
   ```
   Replace existing nameservers with:

   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

3. **Save Changes**
   - Click "Save" or "Update"
   - Wait 5-10 minutes for Vercel to detect

4. **Verify in Vercel**
   - Return to Vercel Domains page
   - Should show "Valid Configuration" ✅

---

#### Option B: Using Your DNS Provider

**At Your DNS Provider:**

1. **For Root Domain (meauxbility.org)**

   **Add A Record:**
   ```
   Type:  A
   Name:  @ (or leave blank)
   Value: 76.76.21.21
   TTL:   3600 (or 1 hour)
   ```

2. **For WWW Subdomain (www.meauxbility.org)**

   **Add CNAME Record:**
   ```
   Type:  CNAME
   Name:  www
   Value: cname.vercel-dns.com
   TTL:   3600
   ```

3. **Alternative: CNAME for Root (if supported)**

   Some providers allow CNAME at root:
   ```
   Type:  CNAME or ALIAS
   Name:  @ (or leave blank)
   Value: cname.vercel-dns.com
   TTL:   3600
   ```

4. **Save All Records**

---

### Phase 3: Configure WWW Redirect

**In Vercel Dashboard:**

1. Go to: Settings → Domains
2. You should see both:
   - `meauxbility.org`
   - `www.meauxbility.org`

3. Click on your preferred primary domain
4. Select: "Redirect visitors to..." option
5. Choose your primary (usually non-www)

**Example:**
```
meauxbility.org → Primary domain ✅
www.meauxbility.org → Redirects to meauxbility.org
```

---

## 🔧 Registrar-Specific Instructions

### GoDaddy

**Change Nameservers:**
```
1. Log in to GoDaddy
2. Go to "My Products" → Domains
3. Click on your domain
4. Scroll to "Additional Settings"
5. Click "Manage DNS"
6. Click "Change" next to Nameservers
7. Select "I'll use my own nameservers"
8. Enter Vercel nameservers
9. Click "Save"
```

**Add DNS Records (if not using Vercel nameservers):**
```
1. In "Manage DNS" page
2. Scroll to "Records" section
3. Click "Add" for new record
4. Select record type (A or CNAME)
5. Fill in Name and Value
6. Click "Save"
```

---

### Namecheap

**Change Nameservers:**
```
1. Log in to Namecheap
2. Go to "Domain List"
3. Click "Manage" next to your domain
4. Find "Nameservers" section
5. Select "Custom DNS"
6. Enter Vercel nameservers
7. Click "Save"
```

**Add DNS Records:**
```
1. In domain management, select "Advanced DNS"
2. Click "Add New Record"
3. Select record type
4. Fill in Host and Value
5. Click "Save All Changes"
```

---

### Cloudflare

**Change Nameservers (if domain registered elsewhere):**
```
1. Add domain to Cloudflare
2. Cloudflare provides its own nameservers
3. Update nameservers at your registrar
4. Then add Vercel DNS records in Cloudflare
```

**Add DNS Records:**
```
1. Log in to Cloudflare
2. Select your domain
3. Go to "DNS" tab
4. Click "Add Record"
5. Add A or CNAME records
6. IMPORTANT: Set Proxy status to "DNS Only" (grey cloud)
7. Click "Save"
```

**⚠️ Cloudflare Note:**
- Must use "DNS Only" (grey cloud) for Vercel domains
- Orange cloud (Proxied) will conflict with Vercel

---

### Google Domains

**Change Nameservers:**
```
1. Log in to Google Domains
2. Click on your domain
3. Click "DNS" in the left sidebar
4. Click "Custom name servers"
5. Enter Vercel nameservers
6. Click "Save"
```

**Add DNS Records:**
```
1. In "DNS" page, stay on "Default name servers"
2. Scroll to "Custom resource records"
3. Add A or CNAME records
4. Click "Add"
```

---

## 🧪 Testing & Verification

### Check DNS Propagation

**Online Tools:**
```
https://dnschecker.org
https://whatsmydns.net

Enter your domain and check:
- A record points to Vercel IP
- CNAME points to Vercel
```

**Command Line:**
```bash
# Check A record
dig meauxbility.org

# Check CNAME
dig www.meauxbility.org

# Check nameservers
dig NS meauxbility.org

# Force check against specific nameserver
dig @8.8.8.8 meauxbility.org
```

---

### Verify SSL Certificate

**In Browser:**
```
1. Visit https://your-domain.com
2. Click the padlock icon
3. Should show "Valid Certificate"
4. Issued by: Vercel
```

**Via Command Line:**
```bash
# Check SSL certificate
curl -vI https://meauxbility.org

# Should show:
# - TLS handshake successful
# - Certificate valid
# - No errors
```

---

### Test Redirects

**WWW to Non-WWW (or vice versa):**
```bash
# This should redirect
curl -I https://www.meauxbility.org

# Should show:
# HTTP/2 308
# location: https://meauxbility.org
```

---

## ⏱️ Propagation Times

**Expected DNS propagation times:**

| Change Type | Time |
|-------------|------|
| Nameserver change | 24-48 hours |
| A/CNAME record | 1-6 hours |
| Vercel SSL cert | 5-10 minutes |
| Cloudflare (DNS only) | 5 minutes |

**Tips:**
- Use incognito/private browsing to avoid cache
- Clear browser cache
- Use different devices/networks to test
- Check from multiple locations (use online tools)

---

## 🔧 Common Issues & Solutions

### "Domain Not Verified" in Vercel

**Problem:** Vercel can't verify your domain

**Solutions:**
```
1. Check DNS records are correct
2. Wait for DNS propagation (up to 48 hours)
3. Try removing and re-adding domain in Vercel
4. Check for typos in DNS records
5. Ensure no conflicting DNS records
```

---

### "Invalid Configuration" Error

**Problem:** DNS records not pointing correctly

**Solutions:**
```
1. Verify exact A/CNAME values from Vercel
2. Remove any duplicate records
3. Check TTL isn't too high (use 3600)
4. Clear DNS cache: ipconfig /flushdns (Windows) or
   sudo dscacheutil -flushcache (Mac)
```

---

### "SSL Certificate Error"

**Problem:** HTTPS not working

**Solutions:**
```
1. Wait 10-15 minutes for Vercel to issue cert
2. Ensure domain is verified first
3. Check both www and non-www have records
4. Try removing and re-adding domain
5. Check Vercel SSL settings in dashboard
```

---

### WWW Not Redirecting

**Problem:** Both www and non-www work separately

**Solutions:**
```
1. In Vercel, check both domains are added
2. Set primary domain correctly
3. Configure redirect in Vercel settings
4. Wait for propagation
```

---

### Cloudflare Orange Cloud Issues

**Problem:** Domain not working with Cloudflare proxied

**Solutions:**
```
1. Change from "Proxied" to "DNS Only"
2. Click the orange cloud to turn it grey
3. Cloudflare proxy conflicts with Vercel
4. Use Cloudflare for DNS only, Vercel for CDN
```

---

## 📧 Preserving Email Setup

**IMPORTANT:** Don't lose email when changing DNS!

### Before Changing DNS:

**1. Export Current MX Records**
```bash
# Check current email setup
dig MX meauxbility.org

# Save output before making changes
```

**2. Add MX Records to New DNS**

If using Vercel nameservers:
```
1. After pointing to Vercel
2. Go to Vercel DNS settings
3. Add your MX records
4. Add SPF/DKIM TXT records if applicable
```

If using your own DNS:
```
1. Don't delete existing MX records
2. Only modify A and CNAME records
3. Leave MX, TXT, and other records intact
```

---

## 🎯 Complete Configuration Example

### Example: meauxbility.org

**Scenario:** Using Vercel nameservers

**Step 1: At Registrar (e.g., GoDaddy)**
```
Change nameservers to:
  ns1.vercel-dns.com
  ns2.vercel-dns.com

Save and wait 24-48 hours
```

**Step 2: At Vercel Dashboard**
```
1. Project Settings → Domains
2. Add: meauxbility.org
3. Vercel auto-detects nameservers
4. SSL certificate issued automatically
5. Add: www.meauxbility.org
6. Set redirect: www → non-www
```

**Step 3: Add Email Records (if needed)**
```
In Vercel DNS settings, add:

MX Records:
  Priority 1: aspmx.l.google.com
  Priority 5: alt1.aspmx.l.google.com

TXT Record:
  v=spf1 include:_spf.google.com ~all
```

**Step 4: Verify**
```bash
# Check domain resolves
dig meauxbility.org

# Check www redirects
curl -I https://www.meauxbility.org

# Check SSL
curl -vI https://meauxbility.org

# Check email
dig MX meauxbility.org
```

---

## 📊 Configuration Checklist

### Per Domain:

**Vercel Setup:**
- [ ] Domain added in Vercel dashboard
- [ ] Domain verified (green checkmark)
- [ ] SSL certificate issued
- [ ] WWW variant added
- [ ] Redirect configured (www → primary or vice versa)

**DNS Setup:**
- [ ] Nameservers updated (if using Vercel DNS)
- [ ] A record pointing to Vercel (if using own DNS)
- [ ] CNAME record for www (if using own DNS)
- [ ] MX records preserved (if using email)
- [ ] SPF/DKIM records added (if using email)

**Testing:**
- [ ] Domain loads via HTTPS
- [ ] WWW redirect works
- [ ] SSL certificate valid
- [ ] No mixed content warnings
- [ ] Email still works (if applicable)
- [ ] Tested from multiple devices/networks

---

## 🚨 Rollback Plan

**If something goes wrong:**

**1. Revert Nameservers**
```
Change back to original nameservers
Usually takes 1-2 hours to propagate back
```

**2. Remove Domain from Vercel**
```
1. Vercel Dashboard → Project → Settings → Domains
2. Click domain to remove
3. Click "Remove"
```

**3. Restore DNS Records**
```
Re-add original A/CNAME records
Use backup from before changes
```

**4. Check Email**
```
Verify MX records are intact
Send test email to confirm
```

---

## 📞 Getting Help

**Vercel Support:**
- Docs: https://vercel.com/docs/custom-domains
- Support: https://vercel.com/support

**DNS Propagation:**
- Check: https://dnschecker.org
- Check: https://whatsmydns.net

**SSL Issues:**
- Test: https://www.ssllabs.com/ssltest/

**Community:**
- Vercel Discord: https://vercel.com/discord
- GitHub Discussions: https://github.com/vercel/vercel/discussions

---

## 🎉 Next Steps

Once all domains are configured:

1. **Test thoroughly** across devices
2. **Update any hardcoded URLs** in your apps
3. **Configure analytics** with new domains
4. **Set up monitoring** for uptime
5. **Update social media** links
6. **Update business cards** and marketing materials
7. **Add domains to Google Search Console**
8. **Configure domain email** if needed

---

**Need help?** Share your completed `DOMAIN-DNS-TEMPLATE.md` with me and I'll create custom step-by-step instructions for your exact setup!
