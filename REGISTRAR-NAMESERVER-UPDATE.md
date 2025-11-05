# 🌐 DOMAIN REGISTRAR NAMESERVER UPDATE GUIDE

**For:** Sam - Meauxbility November 3rd Launch
**Purpose:** Update nameservers at domain registrar to point to Vercel
**Time:** 15-20 minutes (5 domains)

---

## 🎯 WHAT YOU'RE DOING

**Nameservers to use:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**For these domains:**
1. inneranimals.com
2. inneranimalmedia.com
3. iaudodidact.com
4. meauxbility.org
5. meauxbility.com

---

## 🔍 FIND YOUR REGISTRAR

**Not sure where your domains are registered?**

### Quick Check:
```bash
whois meauxbility.org | grep -i "registrar:"
```

**Common registrars:**
- Shopify (if bought through Shopify)
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- Name.com

**Once you know, jump to that section below.**

---

## 🛒 SHOPIFY (Most Likely for You)

**If you bought domains through Shopify or manage them in Shopify Admin**

### Step 1: Log into Shopify
```
URL: https://[your-store].myshopify.com/admin
OR: https://admin.shopify.com/
```

### Step 2: Navigate to Domains
1. **Click:** Settings (bottom left gear icon)
2. **Click:** Domains
3. **You should see:** List of all your domains

### Step 3: Select Domain
1. **Click on:** inneranimals.com (start with this one)

### Step 4: Check Domain Management

**Shopify will show ONE of these options:**

#### Option A: "Manage domain" button
**If you see this:**
1. Click "Manage domain"
2. Look for "Nameservers" or "DNS settings"
3. Click "Edit" or "Change nameservers"

#### Option B: "View settings" or "DNS settings"
**If you see this:**
1. Click it
2. Look for "Nameservers" section

### Step 5: Update Nameservers

**Shopify-managed domains:**

1. **Find section:** "Nameservers" or "Name servers"
2. **Current setting might be:** "Shopify-managed" or "Default"
3. **Click:** "Change" or "Edit" or "Use custom nameservers"
4. **Select:** "Custom nameservers" or "Third-party nameservers"
5. **Delete existing nameservers**
6. **Enter:**
   ```
   Nameserver 1: ns1.vercel-dns.com
   Nameserver 2: ns2.vercel-dns.com
   ```
7. **Click:** "Save" or "Confirm"

### Step 6: Warning Messages (May Appear)

**Shopify might warn:**
```
⚠️ "Changing nameservers will affect your domain's DNS settings"
⚠️ "Email may be affected"
⚠️ "Your store's connection to this domain may be lost"
```

**What to do:**
1. **Click:** "I understand" or "Continue"
2. **We have your email backup** from `backup-current-dns.sh`
3. **This is expected** - we're moving to Vercel

### Step 7: Repeat for All Domains

**Repeat Steps 3-6 for:**
- inneranimalmedia.com
- iaudodidact.com
- meauxbility.org
- meauxbility.com

**Time:** ~3 minutes per domain = 15 minutes total

### ✅ Shopify Complete!

**What you should see:**
- All 5 domains now show "Custom nameservers"
- ns1.vercel-dns.com and ns2.vercel-dns.com listed

**Next:** Wait 2-48 hours for DNS propagation

---

## 🌐 GODADDY

**If your domains are at GoDaddy**

### Step 1: Log In
```
URL: https://sso.godaddy.com/
```

### Step 2: Go to Domains
1. **Click:** "My Products" (top menu)
2. **Click:** "Domains" or "Domain Portfolio"
3. **You should see:** List of all your domains

### Step 3: Select Domain
1. **Find:** inneranimals.com
2. **Click:** The domain name itself OR "Manage" button

### Step 4: Find DNS Settings
1. **Scroll down** to "Additional Settings"
2. **Click:** "Manage DNS"

### Step 5: Change Nameservers
1. **Scroll to:** "Nameservers" section
2. **Click:** "Change" button
3. **Select:** "I'll use my own nameservers"
4. **Remove existing nameservers** (click X next to each)
5. **Enter:**
   ```
   Nameserver 1: ns1.vercel-dns.com
   Nameserver 2: ns2.vercel-dns.com
   ```
6. **Click:** "Save"

### Step 6: Confirm
**GoDaddy will ask:** "Are you sure?"
**Click:** "Continue" or "Yes, proceed"

### Step 7: Repeat
**Repeat Steps 3-6 for all 5 domains**

### ✅ GoDaddy Complete!

---

## 💙 NAMECHEAP

**If your domains are at Namecheap**

### Step 1: Log In
```
URL: https://www.namecheap.com/myaccount/login/
```

### Step 2: Domain List
1. **Click:** "Domain List" (left sidebar)
2. **You should see:** All your domains

### Step 3: Manage Domain
1. **Find:** inneranimals.com
2. **Click:** "Manage" button next to it

### Step 4: Nameservers Section
1. **Scroll down** to "NAMESERVERS"
2. **Current setting:** Likely "Namecheap BasicDNS" or "Namecheap PremiumDNS"
3. **Click dropdown:** Select "Custom DNS"

### Step 5: Enter Vercel Nameservers
1. **Remove existing entries**
2. **Enter:**
   ```
   Nameserver 1: ns1.vercel-dns.com
   Nameserver 2: ns2.vercel-dns.com
   ```
3. **Click:** Green checkmark ✓ or "Save"

### Step 6: Repeat
**Repeat Steps 3-5 for all 5 domains**

### ✅ Namecheap Complete!

---

## 📧 GOOGLE DOMAINS

**Note:** Google Domains is transitioning to Squarespace

### Step 1: Log In
```
URL: https://domains.google.com/
```

### Step 2: My Domains
1. **Click on:** inneranimals.com

### Step 3: DNS Settings
1. **Click:** "DNS" (left sidebar)
2. **Scroll to:** "Name servers"

### Step 4: Custom Name Servers
1. **Click:** "Use custom name servers"
2. **Remove existing** (click X)
3. **Enter:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. **Click:** "Save"

### Step 5: Repeat
**Repeat for all domains**

### ✅ Google Domains Complete!

---

## ☁️ CLOUDFLARE

**If domains are registered with Cloudflare**

### Step 1: Log In
```
URL: https://dash.cloudflare.com/
```

### Step 2: Select Domain
1. **Click on:** inneranimals.com from the list

### Step 3: Check Registration

**Cloudflare has TWO ways domains can be here:**

#### Option A: Domain is REGISTERED with Cloudflare
**Look for:** "Domain Registration" in left sidebar

1. Click "Domain Registration"
2. Click your domain
3. Click "Configuration"
4. Click "Custom nameservers"
5. Enter Vercel nameservers
6. Save

#### Option B: Domain is just MANAGED by Cloudflare (registered elsewhere)
**This means:** You need to update nameservers at the ACTUAL registrar (not Cloudflare)

**To find actual registrar:**
```bash
whois inneranimals.com | grep -i "registrar:"
```

Then use the appropriate section above.

---

## 🔧 OTHER REGISTRARS

**Not listed above?**

### Generic Steps (Works for Most Registrars)

1. **Log into your domain registrar**
2. **Find:** "My Domains" or "Domain Management"
3. **Click on your domain**
4. **Look for one of these:**
   - "Nameservers"
   - "DNS Settings"
   - "Name Servers"
   - "DNS Management"
5. **Change to:** "Custom" or "Use third-party nameservers"
6. **Remove existing nameservers**
7. **Enter:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
8. **Save changes**
9. **Repeat for all domains**

---

## ⏱️ WHAT HAPPENS NEXT

### Immediate (0-5 minutes)
- ✅ You've updated nameservers
- ✅ Registrar saved your changes
- ⏳ DNS propagation begins

### 30 minutes - 2 hours
- ⏳ DNS starting to propagate
- ⏳ Some locations see new nameservers
- ⏳ Vercel detecting changes

### 2-6 hours (Typical)
- ✅ Most DNS propagation complete
- ✅ Vercel verifies domain ownership
- ✅ SSL certificates begin issuing
- ✅ Sites becoming accessible

### 24-48 hours (Maximum)
- ✅ Full worldwide DNS propagation
- ✅ All locations see new nameservers
- ✅ Everything fully operational

---

## 🔍 HOW TO CHECK PROGRESS

### Method 1: DNS Checker (Online)
```
https://dnschecker.org/

Enter: inneranimals.com
Select: NS (Nameserver)
Click: Search

Look for: ns1.vercel-dns.com and ns2.vercel-dns.com
Green checkmarks = propagated
Red X = still propagating
```

### Method 2: Command Line
```bash
dig NS inneranimals.com

# Should show:
# inneranimals.com. 3600 IN NS ns1.vercel-dns.com.
# inneranimals.com. 3600 IN NS ns2.vercel-dns.com.
```

### Method 3: Vercel Dashboard
```
1. Go to: https://vercel.com/dashboard
2. Click your project
3. Settings → Domains
4. Look for green checkmarks ✅ next to domains
```

---

## 📧 RESTORE EMAIL (After DNS Propagates)

**CRITICAL: Do this after nameservers are verified in Vercel!**

### Step 1: Get Your MX Backup
```bash
cat dns-backup-*.txt | grep -A 10 "MX RECORDS"
```

### Step 2: Add MX Records in Vercel

**For each domain with email:**

1. **Go to:** Vercel Dashboard → Project → Settings → Domains
2. **Click on:** inneranimals.com
3. **Click:** "DNS Records" or "Manage DNS"
4. **Click:** "Add Record"

**Add each MX record:**
```
Type: MX
Name: @
Value: [from your backup, e.g., "10 mx1.emailprovider.com"]
TTL: 3600 (default)
```

**Click:** "Save"

### Step 3: Add SPF/DKIM TXT Records

**Same process:**
```
Type: TXT
Name: @
Value: [from your backup, e.g., "v=spf1 include:_spf.google.com ~all"]
TTL: 3600
```

### Step 4: Test Email

**Send test email to:**
- sam@inneranimals.com
- info@meauxbility.org

**Verify:** You receive them in your inbox

---

## ✅ VERIFICATION CHECKLIST

**After updating nameservers:**

- [ ] All 5 domains updated at registrar
- [ ] Confirmation emails received (if registrar sends them)
- [ ] DNS checker shows Vercel nameservers propagating
- [ ] Vercel dashboard shows verification in progress
- [ ] Wait 2-6 hours for propagation
- [ ] Run: `./verify-deployment.sh` to test everything
- [ ] Green checkmarks in Vercel for all domains
- [ ] MX records added back in Vercel
- [ ] Email test successful

---

## 🚨 TROUBLESHOOTING

### "Nameservers not updating"

**Check:**
1. Did you save changes at registrar?
2. Did you get confirmation email?
3. Has it been at least 2 hours?

**Try:**
- Log back into registrar and verify nameservers are saved
- Clear your browser cache
- Try different DNS checker: https://www.whatsmydns.net/

### "Email stopped working"

**Fix:**
1. Check if MX records are in Vercel
2. Go to Vercel → Domain → DNS Records
3. Add MX records from your backup file
4. Wait 30 minutes for propagation

### "Domain shows error in Vercel"

**Check:**
1. Are nameservers pointing to Vercel? (use dig NS domain.com)
2. Has DNS propagation completed? (check dnschecker.org)
3. Is domain added to correct Vercel project?

---

## 💬 QUICK REFERENCE

**Nameservers:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Domains to update:**
1. inneranimals.com
2. inneranimalmedia.com
3. iaudodidact.com
4. meauxbility.org
5. meauxbility.com

**Check propagation:**
- https://dnschecker.org/
- https://www.whatsmydns.net/

**Verify deployment:**
```bash
./verify-deployment.sh
```

---

## 🎯 NEXT STEPS

1. ✅ Update nameservers at registrar (just completed!)
2. ⏳ Wait 2-6 hours for DNS propagation
3. ✅ Vercel verifies domains automatically
4. ✅ SSL certificates issued automatically
5. 📧 Add MX records back in Vercel
6. ✅ Run verification script
7. 🎂 Launch on November 3rd!

---

**Status:** Nameservers updated ✅
**Next:** Wait for DNS propagation (2-6 hours)
**Then:** Add MX records, verify everything
**Launch:** November 3rd, 5:00 PM 🎂
