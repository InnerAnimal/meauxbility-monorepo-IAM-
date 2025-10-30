# Domain Setup Guide - inneranimals.com

## Current Status

✅ **Deployment**: inneranimals-shop is live on Vercel
✅ **Vercel URLs**:
- `inneranimals-shop.vercel.app`
- `inneranimals-shop-c79zqog9i-meauxbilityorg.vercel.app`

❌ **Custom Domain**: inneranimals.com not yet connected

## Step-by-Step Setup

### Step 1: Access Vercel Project Settings

1. Go to: https://vercel.com/meauxbilityorg/inneranimals-shop
2. Click "Settings" (top navigation)
3. Click "Domains" (left sidebar)

### Step 2: Add Custom Domains

Add both domains for best practices:

**Primary Domain:**
```
inneranimals.com
```

**WWW Subdomain:**
```
www.inneranimals.com
```

In Vercel:
1. Enter `inneranimals.com` in the domain field
2. Click "Add"
3. Repeat for `www.inneranimals.com`

### Step 3: Configure DNS Records

Vercel will provide DNS configuration. You need to add these records to your domain registrar:

#### For inneranimals.com (apex domain):

**Option A: A Record (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (or auto)
```

**Option B: CNAME Record**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600 (or auto)
```

#### For www.inneranimals.com:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or auto)
```

### Step 4: Where to Add DNS Records

#### If domain is with Cloudflare:
1. Go to: https://dash.cloudflare.com
2. Select `inneranimals.com`
3. Go to "DNS" → "Records"
4. Click "Add record"
5. Add the records above

#### If domain is with GoDaddy:
1. Go to: https://dcc.godaddy.com/domains
2. Click on `inneranimals.com`
3. Click "DNS" → "Manage DNS"
4. Click "Add" to add new records

#### If domain is with Namecheap:
1. Go to: https://ap.www.namecheap.com/domains/list
2. Click "Manage" next to `inneranimals.com`
3. Go to "Advanced DNS"
4. Click "Add New Record"

### Step 5: Verify & Wait

1. After adding DNS records, return to Vercel
2. Click "Refresh" or "Verify" on the domain
3. DNS propagation can take 5 minutes to 48 hours (usually 5-15 minutes)

### Step 6: Set Primary Domain

Once verified:
1. In Vercel Domains settings
2. Click the three dots next to `inneranimals.com`
3. Select "Mark as Primary Domain"

## Verification

### Test DNS Propagation:

**Check A Record:**
```bash
dig inneranimals.com
```

**Check CNAME:**
```bash
dig www.inneranimals.com
```

**Online Tool:**
https://www.whatsmydns.net/#A/inneranimals.com

### Test Website:

Once DNS propagates:
- http://inneranimals.com (should redirect to https)
- https://inneranimals.com ✅
- https://www.inneranimals.com ✅

## Troubleshooting

### Domain Not Verifying?
- Double-check DNS records match exactly
- Wait 15-30 minutes for DNS propagation
- Clear your DNS cache: `sudo dscacheutil -flushcache` (Mac)

### SSL Certificate Issues?
- Vercel automatically provisions SSL (takes 5-10 minutes)
- If issues persist, try removing and re-adding domain

### Still Having Issues?
- Check Vercel's domain documentation: https://vercel.com/docs/custom-domains
- Contact Vercel support via dashboard

## Quick Reference

**Vercel Project**: https://vercel.com/meauxbilityorg/inneranimals-shop
**Project ID**: `prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR`
**Custom Domain Target**: `inneranimals.com`

---

**Once complete, your shop will be live at https://inneranimals.com! 🛍️**
