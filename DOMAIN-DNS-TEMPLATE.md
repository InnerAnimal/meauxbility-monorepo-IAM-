# 🌐 DOMAIN & DNS CONFIGURATION TEMPLATE

**Instructions:** Fill out this template with your domain information. This will help configure all your branded URLs for the Meauxbility Foundation applications.

---

## 📋 Domain Inventory

### Domain 1: Meauxbility.org (Main Nonprofit Site)

**Basic Information:**
```
Domain Name:           meauxbility.org
Current Status:        [ ] Active  [ ] Needs Setup  [ ] Needs Transfer
Registrar:             ________________________________
(e.g., GoDaddy, Namecheap, Google Domains, Cloudflare)

DNS Provider:          [ ] Same as Registrar  [ ] Different:_____________
Nameservers:
  NS1:                 ________________________________
  NS2:                 ________________________________
  NS3:                 ________________________________
  NS4:                 ________________________________
```

**Current DNS Records (if any):**
```
A Records:
  @     →  ________________________________
  www   →  ________________________________

CNAME Records:
  ________________________________  →  ________________________________

MX Records (Email):
  ________________________________
  ________________________________

TXT Records:
  ________________________________
  ________________________________
```

**Access Information:**
```
Registrar Login URL:   ________________________________
Username/Email:        ________________________________
2FA Method:            [ ] SMS  [ ] App  [ ] Email  [ ] None
DNS Panel URL:         ________________________________
```

---

### Domain 2: iaudodidact.com (Admin Portal)

**Basic Information:**
```
Domain Name:           iaudodidact.com
Current Status:        [ ] Active  [ ] Needs Setup  [ ] Needs Transfer
Registrar:             ________________________________
DNS Provider:          [ ] Same as Registrar  [ ] Different:_____________
Nameservers:
  NS1:                 ________________________________
  NS2:                 ________________________________
  NS3:                 ________________________________
  NS4:                 ________________________________
```

**Current DNS Records (if any):**
```
A Records:
  @     →  ________________________________
  www   →  ________________________________

CNAME Records:
  ________________________________  →  ________________________________

MX Records (Email):
  ________________________________
  ________________________________

TXT Records:
  ________________________________
  ________________________________
```

**Access Information:**
```
Registrar Login URL:   ________________________________
Username/Email:        ________________________________
2FA Method:            [ ] SMS  [ ] App  [ ] Email  [ ] None
DNS Panel URL:         ________________________________
```

---

### Domain 3: inneranimals.com (E-commerce Shop)

**Basic Information:**
```
Domain Name:           inneranimals.com
Current Status:        [ ] Active  [ ] Needs Setup  [ ] Needs Transfer
Registrar:             ________________________________
DNS Provider:          [ ] Same as Registrar  [ ] Different:_____________
Nameservers:
  NS1:                 ________________________________
  NS2:                 ________________________________
  NS3:                 ________________________________
  NS4:                 ________________________________
```

**Current DNS Records (if any):**
```
A Records:
  @     →  ________________________________
  www   →  ________________________________

CNAME Records:
  ________________________________  →  ________________________________

MX Records (Email):
  ________________________________
  ________________________________

TXT Records:
  ________________________________
  ________________________________
```

**Access Information:**
```
Registrar Login URL:   ________________________________
Username/Email:        ________________________________
2FA Method:            [ ] SMS  [ ] App  [ ] Email  [ ] None
DNS Panel URL:         ________________________________
```

---

## 🔧 Additional Configuration

### Cloudflare (if applicable)

```
Using Cloudflare?     [ ] Yes  [ ] No

If Yes:
  Account Email:       ________________________________
  Zone ID:             ________________________________
  API Token:           ________________________________
  Proxy Status:        [ ] Proxied (Orange Cloud)  [ ] DNS Only (Grey Cloud)
```

---

### Email Configuration

**Do you have email set up for these domains?**

```
meauxbility.org emails:
  Provider:            [ ] Gmail  [ ] Microsoft 365  [ ] Custom  [ ] None
  MX Records:          ________________________________

iaudodidact.com emails:
  Provider:            [ ] Gmail  [ ] Microsoft 365  [ ] Custom  [ ] None
  MX Records:          ________________________________

inneranimals.com emails:
  Provider:            [ ] Gmail  [ ] Microsoft 365  [ ] Custom  [ ] None
  MX Records:          ________________________________
```

---

### SSL/TLS Certificates

```
Current SSL Provider:  [ ] Let's Encrypt  [ ] Cloudflare  [ ] Other:_______
Auto-renew enabled?    [ ] Yes  [ ] No  [ ] Don't know
```

---

### Subdomains (if any)

**List any subdomains currently in use:**

```
meauxbility.org:
  - ________________________________  →  ________________________________
  - ________________________________  →  ________________________________

iaudodidact.com:
  - ________________________________  →  ________________________________
  - ________________________________  →  ________________________________

inneranimals.com:
  - ________________________________  →  ________________________________
  - ________________________________  →  ________________________________
```

---

### Desired Configuration

**How do you want each domain to work?**

```
meauxbility.org:
  [ ] Both www and non-www work (www.meauxbility.org + meauxbility.org)
  [ ] Redirect www to non-www (www → meauxbility.org)
  [ ] Redirect non-www to www (meauxbility.org → www)

iaudodidact.com:
  [ ] Both www and non-www work
  [ ] Redirect www to non-www
  [ ] Redirect non-www to www

inneranimals.com:
  [ ] Both www and non-www work
  [ ] Redirect www to non-www
  [ ] Redirect non-www to www
```

---

## 🎯 Vercel Project Mapping

**Confirm which Vercel project goes to which domain:**

```
Vercel Project                        →  Domain
─────────────────────────────────────────────────────────────────
prj_AemccTFEjP7ztRJivI4wtysSyEfi  →  ______________________
prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY  →  ______________________
prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR  →  ______________________
prj_itOfPE7qqGxHIk57tFEYEGzXdb0h  →  ______________________
```

Expected mapping:
- Meauxbility.org → One of the projects above
- iaudodidact.com → One of the projects above
- inneranimals.com → One of the projects above

---

## 📞 Contact Information

**Technical Contact:**
```
Name:                  ________________________________
Email:                 ________________________________
Phone:                 ________________________________
Preferred Contact:     [ ] Email  [ ] Phone  [ ] Other:_______
```

**Domain Account Recovery:**
```
Can you access domain registrar?     [ ] Yes  [ ] No
Can you receive verification emails?  [ ] Yes  [ ] No
Can you change DNS records?           [ ] Yes  [ ] No
Need help with access?                [ ] Yes  [ ] No
```

---

## 🚨 Important Notes

**Before we configure, please confirm:**

```
[ ] I have access to my domain registrar account
[ ] I have access to DNS management panel
[ ] I can receive emails at the domain admin email
[ ] I understand DNS changes can take 24-48 hours to propagate
[ ] I have backups of current DNS records (if any)
[ ] Email service won't be affected by DNS changes
```

---

## 📝 Additional Information

**Anything else we should know?**

```
Special requirements:
________________________________
________________________________
________________________________

Current issues or concerns:
________________________________
________________________________
________________________________

Existing integrations (analytics, ads, etc.):
________________________________
________________________________
________________________________

Preferred go-live timing:
[ ] ASAP
[ ] Specific date/time: ________________________________
[ ] After testing
```

---

## ✅ How to Fill This Out

### Quick Method:
```bash
# Copy this file
cp DOMAIN-DNS-TEMPLATE.md DOMAIN-DNS-INFO.md

# Edit with your information
nano DOMAIN-DNS-INFO.md

# Share with me
```

### Information Gathering Checklist:

1. **For Each Domain:**
   - [ ] Log in to your registrar
   - [ ] Note down the registrar name
   - [ ] Find DNS management section
   - [ ] Copy current nameservers
   - [ ] Export or screenshot current DNS records
   - [ ] Check if email is configured

2. **Vercel Projects:**
   - [ ] Log in to Vercel dashboard
   - [ ] Identify which project is which app
   - [ ] Note project IDs
   - [ ] Check current domains (if any)

3. **Access Verification:**
   - [ ] Can you log in to each registrar?
   - [ ] Can you edit DNS records?
   - [ ] Do you have 2FA backup codes?
   - [ ] Can you receive verification emails?

---

## 🎯 What Happens Next

Once you provide this information, I will:

1. **Create DNS Configuration Scripts**
   - Exact DNS records to add/modify
   - Step-by-step instructions for your registrar
   - Verification commands

2. **Generate Vercel Domain Setup Guide**
   - Add domains to correct projects
   - Configure SSL certificates
   - Set up redirects (www/non-www)

3. **Provide Testing & Verification Steps**
   - How to test DNS propagation
   - How to verify SSL is working
   - How to confirm domain is live

4. **Create Rollback Plan**
   - How to revert changes if needed
   - Backup of original DNS records
   - Emergency contacts

---

## 📚 Need Help Finding This Information?

### To Find Your Registrar:
```bash
# Run a WHOIS lookup
whois meauxbility.org
```

### To Check Current DNS:
```bash
# Check nameservers
dig NS meauxbility.org

# Check A records
dig A meauxbility.org

# Check all records
dig ANY meauxbility.org
```

### To Find Vercel Project IDs:
1. Go to: https://vercel.com/dashboard
2. Click on each project
3. Go to Settings → General
4. Project ID is shown at the top

---

## 🔐 Security Note

**IMPORTANT:** Do not include actual passwords in this file!

- ✅ Do include: Usernames, email addresses, registrar names
- ❌ Do not include: Passwords, API keys, secret tokens
- ℹ️ Note: I'll guide you through using credentials securely when needed

---

**Ready to configure?** Fill out this template and share it with me!

I'll create a customized configuration plan for your exact setup.
