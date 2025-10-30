# DNS Configuration for inneranimalmedia.com

## Current Status ✅

Your domain **inneranimalmedia.com** is already using Cloudflare nameservers:
- `jessica.ns.cloudflare.com`
- `mike.ns.cloudflare.com`

This means Cloudflare is managing your DNS. Now we need to add records to point to Vercel.

---

## Step 1: Access Cloudflare DNS Management

1. Go to: https://dash.cloudflare.com
2. Select **inneranimalmedia.com** from your domains list
3. Click **DNS** in the left sidebar
4. Click **Records** tab

---

## Step 2: Add DNS Records for Vercel

### Option A: Point to Vercel (Recommended)

Add these DNS records in Cloudflare:

#### Root Domain (inneranimalmedia.com)

**Record 1: A Record**
```
Type:    A
Name:    @
Target:  76.76.21.21
Proxy:   Proxied (orange cloud ON)
TTL:     Auto
```

**Record 2: AAAA Record (IPv6)**
```
Type:    AAAA
Name:    @
Target:  2606:4700:10::6816:1515
Proxy:   Proxied (orange cloud ON)
TTL:     Auto
```

#### WWW Subdomain (www.inneranimalmedia.com)

**Record 3: CNAME Record**
```
Type:    CNAME
Name:    www
Target:  cname.vercel-dns.com
Proxy:   Proxied (orange cloud ON)
TTL:     Auto
```

### Option B: Direct CNAME to Vercel (Alternative)

If you prefer CNAME for the root:

```
Type:    CNAME
Name:    @
Target:  cname.vercel-dns.com
Proxy:   DNS only (grey cloud)
TTL:     Auto
```

**Note**: CNAME flattening must be enabled in Cloudflare (it usually is by default).

---

## Step 3: Configure in Vercel

### Add Domain to Vercel Project

1. **Go to Vercel Dashboard**:
   - For Inner Animals Shop: https://vercel.com/meauxbilityorg/inneranimals-shop/settings/domains
   - OR create a new project for this domain

2. **Add Domain**:
   - Click "Add" in Domains section
   - Enter: `inneranimalmedia.com`
   - Click "Add"
   - Also add: `www.inneranimalmedia.com`

3. **Verify Domain**:
   - Vercel will check DNS records
   - Should verify within 5-30 minutes
   - Vercel will automatically provision SSL certificate

---

## Step 4: Cloudflare SSL/TLS Settings

**Important**: Configure SSL properly for Vercel

1. Go to **SSL/TLS** in Cloudflare dashboard
2. Select **Overview** tab
3. Set encryption mode:

### Recommended Setting:

**SSL/TLS encryption mode**: `Full (strict)`

This ensures:
- Cloudflare ← Encrypted → Vercel
- SSL certificate validation
- Best security

---

## Step 5: Additional Cloudflare Settings (Optional but Recommended)

### Page Rules

Create a redirect from www to non-www (or vice versa):

1. Go to **Rules** → **Page Rules**
2. Click "Create Page Rule"

**Redirect www to non-www:**
```
URL: www.inneranimalmedia.com/*
Setting: Forwarding URL (301 - Permanent Redirect)
Destination: https://inneranimalmedia.com/$1
```

### Security Settings

**Under Security** → **Settings**:
- Security Level: `Medium`
- Challenge Passage: `30 Minutes`
- Browser Integrity Check: `On`

**Under Speed** → **Optimization**:
- Auto Minify: Check `JavaScript`, `CSS`, `HTML`
- Brotli: `On`

---

## Complete DNS Records Summary

After configuration, your Cloudflare DNS should have:

```
Type    Name    Target                      Proxy Status
────────────────────────────────────────────────────────
A       @       76.76.21.21                 Proxied
AAAA    @       2606:4700:10::6816:1515    Proxied
CNAME   www     cname.vercel-dns.com       Proxied
NS      -       jessica.ns.cloudflare.com  DNS only
NS      -       mike.ns.cloudflare.com     DNS only
```

---

## Alternative: Point to Supabase (If using Supabase directly)

If you want to use Supabase's hosting instead:

```
Type:    CNAME
Name:    @
Target:  [your-project].supabase.co
Proxy:   Proxied
```

**Get your Supabase URL from**: https://app.supabase.com/project/[your-project]/settings/api

Your current Supabase: `ghiulqoqujsiofsjcrqk.supabase.co`

---

## Testing Your Configuration

### 1. Check DNS Propagation

**Command Line:**
```bash
dig inneranimalmedia.com
dig www.inneranimalmedia.com
```

**Online Tool:**
https://www.whatsmydns.net/#A/inneranimalmedia.com

### 2. Test SSL Certificate

Once DNS propagates (5-30 minutes):
```bash
curl -I https://inneranimalmedia.com
```

Should return `200 OK` with SSL

### 3. Browser Test

Visit:
- https://inneranimalmedia.com
- https://www.inneranimalmedia.com

Both should load with green padlock (SSL)

---

## Troubleshooting

### DNS Not Resolving?
- Wait 15-30 minutes for propagation
- Check Cloudflare DNS records are correct
- Verify nameservers haven't changed
- Clear local DNS cache: `sudo dscacheutil -flushcache` (Mac)

### SSL Certificate Error?
- Ensure SSL mode is `Full (strict)` in Cloudflare
- Wait for Vercel to provision certificate (5-10 minutes)
- Try "Purge SSL Cache" in Cloudflare

### Domain Not Verifying in Vercel?
- Ensure DNS records point to correct targets
- Try switching Cloudflare proxy from Proxied to DNS only temporarily
- Check Vercel project settings

### 502 Bad Gateway?
- Ensure SSL mode is NOT `Flexible`
- Check Vercel deployment is live
- Verify domain is added in Vercel project

---

## Quick Setup Checklist

- [x] Nameservers pointing to Cloudflare ✅
- [ ] Add A record: `@` → `76.76.21.21`
- [ ] Add AAAA record: `@` → `2606:4700:10::6816:1515`
- [ ] Add CNAME record: `www` → `cname.vercel-dns.com`
- [ ] Set SSL mode to `Full (strict)`
- [ ] Add domain in Vercel project
- [ ] Wait for DNS propagation (5-30 min)
- [ ] Verify SSL certificate
- [ ] Test both www and non-www

---

## Question: What will inneranimalmedia.com host?

**Please clarify:**

1. **Same as Inner Animals Shop** (inneranimals.com)?
   - Point to existing Vercel project: `prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR`

2. **New separate website**?
   - Create new Vercel project
   - Deploy new codebase

3. **Replace inneranimals.com**?
   - Point to same Vercel project
   - Have both domains work

Let me know and I'll help configure it correctly! 🚀
