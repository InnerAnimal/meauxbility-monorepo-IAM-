# 🌐 Domain Inventory & Configuration Plan

**Updated:** October 30, 2024

---

## 📋 Your Domains

| Domain | Status | Intended Use | Vercel Project |
|--------|--------|--------------|----------------|
| **inneranimals.com** | Active | E-commerce shop | `prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR` |
| **inneranimalmedia.com** | Active | TBD - Need clarification | TBD |
| **iaudodidact.com** | Active | Admin portal | `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY` |
| **meauxxx.com** | Active | May delete | N/A |
| **meauxbility.com** | Active | Redirect to .org OR separate? | TBD |
| **meauxbility.org** | Active | Main nonprofit site | `prj_AemccTFEjP7ztRJivI4wtysSyEfi` |

---

## 🎯 Recommended Configuration

### Primary Domains (Deploy Now)

**1. meauxbility.org → Main Nonprofit Site**
```
Vercel Project: prj_AemccTFEjP7ztRJivI4wtysSyEfi
App: apps/meauxbility-org
Purpose: Main public-facing nonprofit website
Redirect: www.meauxbility.org → meauxbility.org
```

**2. iaudodidact.com → Admin Portal**
```
Vercel Project: prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY
App: apps/admin-portal-production
Purpose: Staff/admin dashboard
Redirect: www.iaudodidact.com → iaudodidact.com
```

**3. inneranimals.com → E-commerce Shop**
```
Vercel Project: prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR
App: apps/inneranimals-shop
Purpose: Product sales for Inner Animals brand
Redirect: www.inneranimals.com → inneranimals.com
```

### Secondary Domains (Decide)

**4. meauxbility.com**
```
Option A: Redirect to meauxbility.org (recommended)
Option B: Separate site (requires new Vercel project)
Option C: Point to same project as .org (same site, different domain)

Recommendation: Redirect to .org to avoid confusion
```

**5. inneranimalmedia.com**
```
Need to know: What is this for?
- Media/press site?
- Blog?
- Portfolio?
- Redirect to inneranimals.com?

Based on answer, will configure appropriately
```

**6. meauxxx.com**
```
Status: User considering deletion
Action: Hold for now, can delete or redirect later
No immediate configuration needed
```

---

## ✅ Quick Decision Matrix

### Questions to Answer:

**Q1: Domain Registrar?**
- Where are ALL these domains registered?
- Same registrar or different?
- Most likely: _________________

**Q2: Email Setup?**
- Do you have email on any domains?
- Which domains have email?
- Email provider (Gmail/Microsoft365/etc.)?

**Q3: meauxbility.com → What to do?**
- [ ] Redirect to meauxbility.org (simplest)
- [ ] Separate site
- [ ] Same site as .org (both work)
- [ ] Delete/don't configure

**Q4: inneranimalmedia.com → What is it?**
- [ ] Media/press site
- [ ] Blog
- [ ] Redirect to inneranimals.com
- [ ] Redirect to meauxbility.org
- [ ] Separate project (explain: _______)

**Q5: Timeline?**
- [ ] Configure all NOW
- [ ] Configure main 3 first (meauxbility.org, iaudodidact.com, inneranimals.com)
- [ ] Decide on others later

---

## 🚀 Immediate Action Plan

### Phase 1: Core Domains (Primary)
```
1. meauxbility.org
2. iaudodidact.com
3. inneranimals.com

Timeline: 20 minutes active + 2-48 hours DNS propagation
```

### Phase 2: Secondary Domains (After core is live)
```
4. meauxbility.com (redirect or separate)
5. inneranimalmedia.com (based on intended use)
```

### Phase 3: Cleanup (Optional)
```
6. meauxxx.com (delete or keep)
```

---

## 📝 Configuration Checklist

### For Each Domain:

**In Vercel Dashboard:**
- [ ] Add domain to correct project
- [ ] Note nameservers provided (ns1.vercel-dns.com, ns2.vercel-dns.com)
- [ ] Add www variant
- [ ] Configure redirect (www → non-www)

**At Registrar:**
- [ ] Log in to registrar
- [ ] Find domain management
- [ ] Update nameservers to Vercel
- [ ] Save changes

**Verification:**
- [ ] Wait for DNS propagation (check dnschecker.org)
- [ ] Verify green checkmark in Vercel
- [ ] Test HTTPS works
- [ ] Test www redirect works
- [ ] Confirm email still works (if applicable)

---

## 💰 Cost Impact

**Current:** Vercel Pro ($20/month)

**Adding domains:**
- Custom domains: $0 (unlimited on Pro)
- DNS hosting: $0 (included)
- SSL certificates: $0 (automatic)

**Total additional cost: $0**

All included in your existing Pro subscription!

---

## 🎯 Recommended Next Steps

**Option A: Do it all right now (I handle it)**
1. Answer the 5 questions above
2. I provide exact registrar instructions
3. You update nameservers
4. Done in 30 minutes

**Option B: Use master prompt elsewhere**
1. Copy MASTER-DOMAIN-PROMPT.txt
2. Fill in your details
3. Paste to ChatGPT/Claude/Cursor
4. Follow their instructions

**Option C: Phase it**
1. Start with core 3 domains
2. Get those live
3. Configure others later

---

## 📞 Quick Answers Needed

Just reply with:

```
Registrar: [NAME]
Email: [YES/NO - which domains?]
meauxbility.com → [Redirect to .org / Separate / Same site]
inneranimalmedia.com → [Purpose / Redirect to _____ / Not needed]
Ready: [YES - do it now / LATER - just core 3]
```

And I'll handle the rest! 🚀

---

**Updated:** October 30, 2024
**Status:** Awaiting domain configuration decisions
**Vercel Projects:** 4 identified, 3 mapped to apps
