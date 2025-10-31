# 🎯 2-Project Domain Mapping - FINAL CONFIGURATION

**Simplified setup:** All 6 domains → 2 Vercel projects

---

## 📋 THE MAPPING

### Project 1: Public Applications (Meauxbility + Inner Animals)
**Vercel Project ID:** `prj_AemccTFEjP7ztRJivI4wtysSyEfi`
**App:** `apps/meauxbility-org`

**Domains on this project:**
1. ✅ **meauxbility.org** (primary - main nonprofit site)
2. ✅ **meauxbility.com** (redirect to meauxbility.org)
3. ✅ **inneranimals.com** (shop - uses same codebase, different branding)
4. ✅ **inneranimalmedia.com** (media/portfolio - same codebase)
5. ⚠️ **meauxxx.com** (optional - redirect or leave unconfigured)

---

### Project 2: Admin Portal (Internal Only)
**Vercel Project ID:** `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY`
**App:** `apps/admin-portal-production`

**Domains on this project:**
1. ✅ **iaudodidact.com** (staff/admin dashboard)

---

## 🚀 Quick Setup (Copy-Paste)

### Step 1: Add Domains in Vercel

**For Project 1 (Public - prj_AemccTFEjP7ztRJivI4wtysSyEfi):**
```
1. Go to: https://vercel.com/dashboard
2. Select project: prj_AemccTFEjP7ztRJivI4wtysSyEfi
3. Settings → Domains
4. Add these domains one by one:
   - meauxbility.org
   - meauxbility.com
   - inneranimals.com
   - inneranimalmedia.com
   (skip meauxxx.com for now)

5. Vercel shows: ns1.vercel-dns.com, ns2.vercel-dns.com
```

**For Project 2 (Admin - prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY):**
```
1. Same dashboard
2. Select project: prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY
3. Settings → Domains
4. Add: iaudodidact.com

5. Vercel shows: ns1.vercel-dns.com, ns2.vercel-dns.com
```

---

### Step 2: Configure Redirects in Vercel

**In Project 1, after domains are added:**

1. **meauxbility.com → meauxbility.org**
   ```
   Settings → Domains → meauxbility.com
   → Set as: "Redirect to meauxbility.org"
   → Type: Permanent (308)
   ```

2. **Keep these as separate domains (no redirect):**
   - meauxbility.org (primary)
   - inneranimals.com (works independently)
   - inneranimalmedia.com (works independently)

**Note:** All three will show the same site but can be styled differently later using domain detection in your code.

---

### Step 3: Update Nameservers at Your Registrar

**For ALL 5 domains (or 6 with meauxxx.com):**

Change nameservers to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Generic steps (works for most registrars):**
```
1. Log in to your domain registrar
2. Go to domain management
3. Find "Nameservers" or "DNS Settings"
4. Change to "Custom Nameservers"
5. Enter: ns1.vercel-dns.com
6. Enter: ns2.vercel-dns.com
7. Save
8. Repeat for each domain
```

---

## 🔧 Registrar-Specific Instructions

### GoDaddy
```
1. https://sso.godaddy.com
2. My Products → Domains
3. Click domain → Manage DNS
4. Nameservers → Change
5. Custom nameservers
6. ns1.vercel-dns.com
7. ns2.vercel-dns.com
8. Save
```

### Namecheap
```
1. https://www.namecheap.com/myaccount/login
2. Domain List → Manage
3. Nameservers section
4. Custom DNS
5. ns1.vercel-dns.com
6. ns2.vercel-dns.com
7. Save
```

### Cloudflare
```
1. https://dash.cloudflare.com
2. Select domain → DNS
3. Change nameservers (if domain registered with CF)
4. Or add as external domain
5. ns1.vercel-dns.com
6. ns2.vercel-dns.com
```

### Google Domains
```
1. https://domains.google.com
2. My domains → Click domain
3. DNS → Custom name servers
4. ns1.vercel-dns.com
5. ns2.vercel-dns.com
6. Save
```

---

## ⏱️ Timeline

| Step | Time |
|------|------|
| Add domains in Vercel | 10 minutes |
| Configure redirects | 5 minutes |
| Update nameservers (all 5-6) | 15 minutes |
| **Total active time** | **30 minutes** |
| DNS propagation | 2-48 hours |
| SSL certificates | Automatic (5-10 min after verification) |

---

## ✅ Verification Checklist

### After 2-48 hours:

**For each domain:**
- [ ] https://meauxbility.org loads
- [ ] https://meauxbility.com redirects to .org
- [ ] https://inneranimals.com loads
- [ ] https://inneranimalmedia.com loads
- [ ] https://iaudodidact.com loads (admin)
- [ ] All show green padlock (SSL)
- [ ] All show green checkmark in Vercel

**Test commands:**
```bash
# Check each domain
dig A meauxbility.org
dig A meauxbility.com
dig A inneranimals.com
dig A inneranimalmedia.com
dig A iaudodidact.com

# Test SSL
curl -I https://meauxbility.org
curl -I https://inneranimals.com
curl -I https://iaudodidact.com

# Test redirect
curl -I https://meauxbility.com
# Should show: location: https://meauxbility.org
```

---

## 💡 How It Works

**Project 1 (Public) serves multiple domains:**
- Same Next.js app
- Same code
- Can detect domain in code to show different content:
  ```javascript
  // In your app
  const domain = request.headers.host;
  if (domain.includes('inneranimals')) {
    // Show Inner Animals branding
  } else if (domain.includes('meauxbility')) {
    // Show Meauxbility branding
  }
  ```

**Project 2 (Admin) is separate:**
- Different app entirely
- Secure admin functionality
- Only accessible via iaudodidact.com

---

## 📧 Email Preservation

**If you have email:**

After nameservers change to Vercel:
```
1. Go to Vercel Dashboard
2. Click on domain
3. DNS Records → Add Record
4. Add your MX records
5. Add SPF/DKIM TXT records
```

**Check current email first:**
```bash
dig MX meauxbility.org
dig MX inneranimals.com
dig MX iaudodidact.com
```

Save the output before changing nameservers!

---

## 🎯 What You Get

**After setup:**
- ✅ All 5 domains live on Vercel
- ✅ Free SSL certificates (auto-renewed)
- ✅ Global CDN
- ✅ meauxbility.com auto-redirects to .org
- ✅ All managed in one Vercel dashboard
- ✅ Zero additional cost (included in Pro)

**Benefits:**
- One platform for everything
- No DNS provider to manage separately
- Automatic SSL renewal
- Easy to add more domains later
- Can add subdomains instantly (blog.meauxbility.org, etc.)

---

## 🚨 Quick Decisions Needed

**1. meauxxx.com - What to do?**
- [ ] Configure now (point to Project 1)
- [ ] Leave for later
- [ ] Delete domain

**2. Email - Do you have it?**
- [ ] Yes - on which domains? _____________
- [ ] No - skip email setup

**3. Registrar - Where are domains?**
- [ ] All at same registrar: _____________
- [ ] Different registrars: _____________

---

## 🎬 Execute Now

**Copy this exact sequence:**

```
1. Open Vercel Dashboard
2. Project prj_AemccTFEjP7ztRJivI4wtysSyEfi → Add 4 domains
3. Project prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY → Add 1 domain
4. Set meauxbility.com to redirect
5. Open domain registrar
6. Update all 5 nameservers to Vercel
7. Wait 2-48 hours
8. Verify all working
```

**Total time:** 30 minutes of work + waiting for DNS

---

**Ready?** Just tell me:
1. Your registrar name
2. Do you have email?
3. Ready to execute now?

I'll walk you through it step by step! 🚀

---

**Updated:** October 30, 2024
**Status:** Ready to configure
**Projects:** 2 (simplified from 3-4)
**Domains:** 5 active (6 if including meauxxx.com)
