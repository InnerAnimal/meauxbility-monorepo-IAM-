# 🎯 VERCEL DASHBOARD SETUP - EXACT STEPS

**For:** Sam - Meauxbility Foundation November 3rd Launch
**Time Required:** 20 minutes
**Goal:** Add all domains to Vercel projects

---

## 📋 PRE-FLIGHT CHECKLIST

Before starting, ensure:
- [ ] You're logged into Vercel at https://vercel.com/dashboard
- [ ] You can see your projects (meauxbility, admin-portal, etc.)
- [ ] You have access to your domain registrar (Shopify/GoDaddy/etc.)
- [ ] You've run `./backup-current-dns.sh` to save email config

---

## 🎯 PROJECT 1: PUBLIC APPLICATIONS

### Vercel Project ID: `prj_AemccTFEjP7ztRJivI4wtysSyEfi`
### Domains to add: 4 domains

---

### Step 1: Navigate to Project

1. **Go to:** https://vercel.com/dashboard
2. **Find project:** Look for "meauxbility-org" or similar
3. **Click on the project card**

**Shortcut URL:**
```
https://vercel.com/dashboard/[your-team-name]/[project-name]
```

---

### Step 2: Open Domain Settings

1. **Look at top navigation tabs:** Overview | Deployments | Analytics | **Settings**
2. **Click:** Settings
3. **Look at left sidebar** (should see: General, Domains, Environment Variables, etc.)
4. **Click:** Domains

You should now see: "Domains" page with "Add a domain" button

---

### Step 3: Add Domain #1 - meauxbility.org

1. **Click:** "Add" or "Add Domain" button
2. **Type in the input field:** `meauxbility.org` (no https://, just the domain)
3. **Click:** "Add" or "Continue"

**Vercel will show you ONE of these:**

#### Option A: Invalid Configuration
```
Message: "This domain is not correctly configured"
Instructions shown below
```
**This is EXPECTED!** Continue to next screen.

#### Option B: Verification Required
```
Nameservers needed:
ns1.vercel-dns.com
ns2.vercel-dns.com
```
**Perfect!** Save these nameservers - you'll need them for your registrar.

4. **Click:** "Add" or "Confirm"

---

### Step 4: Add WWW Variant

After adding `meauxbility.org`, Vercel may ask:

```
"Do you also want to add www.meauxbility.org?"
```

**Answer:** YES

**Redirect Setup:**
- **From:** www.meauxbility.org
- **To:** meauxbility.org (non-www)
- **Type:** 308 Permanent Redirect

**Click:** "Add" or "Save"

---

### Step 5: Add Domain #2 - meauxbility.com

**Repeat Step 3:**
1. Click "Add Domain" button again
2. Type: `meauxbility.com`
3. Add
4. Add `www.meauxbility.com` if prompted

---

### Step 6: Configure meauxbility.com Redirect

**IMPORTANT:** This domain should redirect to meauxbility.org

After adding meauxbility.com:

1. **Find the domain in the list:** meauxbility.com
2. **Click the three dots (⋯)** or **"Edit"** button next to it
3. **Look for:** "Redirect to" or "Configure Domain"
4. **Select:** Redirect
5. **Redirect to:** `meauxbility.org`
6. **Status Code:** 308 - Permanent Redirect
7. **Click:** Save

---

### Step 7: Add Domain #3 - inneranimals.com

**Repeat Step 3:**
1. Click "Add Domain"
2. Type: `inneranimals.com`
3. Add
4. Add `www.inneranimals.com` → redirect to non-www

---

### Step 8: Add Domain #4 - inneranimalmedia.com

**Repeat Step 3:**
1. Click "Add Domain"
2. Type: `inneranimalmedia.com`
3. Add
4. Add `www.inneranimalmedia.com` → redirect to non-www

---

### ✅ Project 1 Complete!

You should now see in the Domains list:
- ✅ meauxbility.org
- ✅ www.meauxbility.org (→ meauxbility.org)
- ✅ meauxbility.com (→ meauxbility.org)
- ✅ www.meauxbility.com (→ meauxbility.org)
- ✅ inneranimals.com
- ✅ www.inneranimals.com (→ inneranimals.com)
- ✅ inneranimalmedia.com
- ✅ www.inneranimalmedia.com (→ inneranimalmedia.com)

**Each domain will show:**
- ⚠️ Yellow/Orange icon: "Configuration Required" or "Invalid Configuration"
- Instructions: "Update nameservers to ns1.vercel-dns.com, ns2.vercel-dns.com"

**This is NORMAL!** We'll update nameservers at your registrar next.

---

## 🎯 PROJECT 2: ADMIN PORTAL

### Vercel Project ID: `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY`
### Domains to add: 1 domain

---

### Step 9: Navigate to Admin Portal Project

1. **Go back to:** https://vercel.com/dashboard
2. **Find project:** "admin-portal-production" or similar
3. **Click on it**

---

### Step 10: Add iaudodidact.com

1. **Click:** Settings → Domains (same as before)
2. **Click:** "Add Domain"
3. **Type:** `iaudodidact.com`
4. **Click:** Add
5. **Add www variant:** www.iaudodidact.com → iaudodidact.com

---

### ✅ Project 2 Complete!

You should see:
- ✅ iaudodidact.com
- ✅ www.iaudodidact.com (→ iaudodidact.com)

Both showing ⚠️ "Configuration Required"

---

## 📝 SAVE NAMESERVER INFORMATION

**For ALL domains, Vercel will tell you:**

```
Update your nameservers to:
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Copy these!** You'll need them for the next step.

**Alternative:** If Vercel gives you A/CNAME records instead:
```
A Record: [IP address, like 76.76.21.21]
CNAME: cname.vercel-dns.com
```

Save whichever method Vercel shows you.

---

## 🌐 NEXT STEP: UPDATE NAMESERVERS AT REGISTRAR

Now that domains are added in Vercel, you need to update your domain registrar.

**Where are your domains registered?**
- Shopify? → See `SHOPIFY-DNS-UPDATE.md`
- GoDaddy? → See section below
- Namecheap? → See section below
- Other? → Tell me and I'll create specific guide

---

## 📧 IMPORTANT: EMAIL PRESERVATION

**Before changing nameservers:**

1. **Run backup script:**
   ```bash
   ./backup-current-dns.sh
   ```

2. **Review the backup file** - especially MX records

3. **After nameservers are changed and verified in Vercel:**
   - Go to each domain in Vercel
   - Click "DNS Records"
   - Click "Add Record"
   - Add back ALL MX records from backup
   - Add back ALL TXT records (SPF/DKIM)

**Critical email accounts to preserve:**
- sam@inneranimals.com
- connor@inneranimals.com
- fred@inneranimals.com
- info@inneranimals.com
- info@meauxbility.org

---

## ⏱️ TIMELINE AFTER VERCEL SETUP

**What happens next:**

| Step | Time |
|------|------|
| Add domains in Vercel (just completed) | ✅ Done (20 min) |
| Update nameservers at registrar | ⏳ Next (15 min) |
| DNS propagation (automatic) | ⏳ 2-48 hours |
| Vercel verifies ownership | ⏳ 5-10 min after DNS |
| SSL certificates issued | ⏳ 5-10 min after verify |
| Domains fully live | ⏳ 2-48 hours total |

---

## 🔍 HOW TO CHECK STATUS

### In Vercel Dashboard

**Go to:** Settings → Domains

**Look for:**
- ✅ **Green checkmark** = Domain fully configured and live
- ⚠️ **Yellow/Orange warning** = Waiting for DNS update
- ❌ **Red X** = Configuration error

**Click on any domain to see:**
- Current DNS status
- What needs to be done
- Nameservers to use

---

## 🚨 TROUBLESHOOTING

### "Domain already in use by another Vercel project"

**Fix:**
1. Go to the other project that has this domain
2. Remove the domain from that project
3. Come back and add it to this project

### "Invalid configuration"

**This is normal!** It means:
- Domain is added to Vercel ✅
- Waiting for you to update nameservers at registrar ⏳

### "Nameservers not updated"

**Check:**
1. Did you update nameservers at registrar?
2. Has it been at least 2 hours?
3. Try checking: https://dnschecker.org (enter your domain)

---

## ✅ VERIFICATION CHECKLIST

After Vercel setup, you should see:

**Project 1 (Public):**
- [ ] meauxbility.org added
- [ ] www.meauxbility.org added (redirects)
- [ ] meauxbility.com added (redirects to .org)
- [ ] www.meauxbility.com added (redirects to .org)
- [ ] inneranimals.com added
- [ ] www.inneranimals.com added (redirects)
- [ ] inneranimalmedia.com added
- [ ] www.inneranimalmedia.com added (redirects)

**Project 2 (Admin):**
- [ ] iaudodidact.com added
- [ ] www.iaudodidact.com added (redirects)

**All showing:** ⚠️ Configuration Required (waiting for nameserver update)

---

## 🎯 WHAT'S NEXT

1. ✅ Vercel setup complete
2. ⏳ Update nameservers at registrar → See registrar-specific guide
3. ⏳ Wait for DNS propagation (2-48 hours)
4. ⏳ Add email MX records back in Vercel
5. ✅ Sites go live!
6. 🎂 Launch on November 3rd!

---

## 💬 QUICK REFERENCE

**Vercel Dashboard:** https://vercel.com/dashboard

**Nameservers to use:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Projects:**
- Public apps: prj_AemccTFEjP7ztRJivI4wtysSyEfi (4 domains)
- Admin portal: prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY (1 domain)

**Redirects:**
- www.* → non-www (for all domains)
- meauxbility.com → meauxbility.org

---

**Status:** Vercel setup complete ✅
**Next:** Update nameservers at registrar
**Timeline:** 20 minutes active work + 2-48 hours propagation
**Launch:** November 3rd, 5:00 PM 🎂
