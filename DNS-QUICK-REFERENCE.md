# 🚀 DNS Configuration Quick Reference

Fast reference for configuring your domains with Vercel.

---

## 📋 Your Domains

| Domain | Application | Vercel Project ID |
|--------|-------------|-------------------|
| meauxbility.org | Main Site | `prj_AemccTFEjP7ztRJivI4wtysSyEfi` |
| iaudodidact.com | Admin Portal | `prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY` |
| inneranimals.com | E-commerce Shop | `prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR` |

---

## ⚡ Quick Setup (2 Methods)

### Method 1: Vercel Nameservers (Easiest)

**Step 1:** Add domain in Vercel Dashboard
```
Vercel Dashboard → Project → Settings → Domains → Add Domain
```

**Step 2:** Update nameservers at your registrar
```
Change nameservers to:
  ns1.vercel-dns.com
  ns2.vercel-dns.com
```

**Step 3:** Wait 24-48 hours for propagation

**Done!** Vercel handles everything (DNS + SSL)

---

### Method 2: Your Own DNS

**Step 1:** Add domain in Vercel Dashboard
```
Vercel Dashboard → Project → Settings → Domains → Add Domain
```

**Step 2:** Add these DNS records at your provider

**For root domain (example.com):**
```
Type:  A
Name:  @ (or blank)
Value: 76.76.21.21
TTL:   3600
```

**For www subdomain:**
```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   3600
```

**Step 3:** Wait 1-6 hours for propagation

**Done!** SSL auto-configured

---

## 🔧 DNS Record Templates

### Meauxbility.org

**Using Vercel Nameservers:**
```
At your registrar:
  Nameservers: ns1.vercel-dns.com, ns2.vercel-dns.com
```

**Using Your DNS:**
```
A Record:
  Name:  @
  Value: 76.76.21.21

CNAME Record:
  Name:  www
  Value: cname.vercel-dns.com
```

---

### iaudodidact.com

**Using Vercel Nameservers:**
```
At your registrar:
  Nameservers: ns1.vercel-dns.com, ns2.vercel-dns.com
```

**Using Your DNS:**
```
A Record:
  Name:  @
  Value: 76.76.21.21

CNAME Record:
  Name:  www
  Value: cname.vercel-dns.com
```

---

### inneranimals.com

**Using Vercel Nameservers:**
```
At your registrar:
  Nameservers: ns1.vercel-dns.com, ns2.vercel-dns.com
```

**Using Your DNS:**
```
A Record:
  Name:  @
  Value: 76.76.21.21

CNAME Record:
  Name:  www
  Value: cname.vercel-dns.com
```

---

## 📧 Preserve Email (Important!)

**Before changing DNS, save your MX records:**

```bash
# Check current email setup
dig MX meauxbility.org
dig MX iaudodidact.com
dig MX inneranimals.com
```

**After changing to Vercel nameservers:**
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Click on your domain
3. Add your MX records back
4. Add SPF/DKIM TXT records

---

## 🧪 Testing Commands

**Check DNS propagation:**
```bash
# Check A record
dig A meauxbility.org

# Check CNAME
dig CNAME www.meauxbility.org

# Check nameservers
dig NS meauxbility.org
```

**Check SSL:**
```bash
# Test HTTPS
curl -I https://meauxbility.org

# Check certificate
openssl s_client -connect meauxbility.org:443 -servername meauxbility.org
```

**Check redirect:**
```bash
# Test www redirect
curl -I https://www.meauxbility.org
```

---

## ⏱️ Expected Wait Times

| Action | Time |
|--------|------|
| Nameserver change | 24-48 hours |
| A/CNAME records | 1-6 hours |
| SSL certificate | 5-10 minutes |
| Vercel verification | 5 minutes |

---

## ✅ Verification Checklist

### Per Domain:

**Vercel Dashboard:**
- [ ] Domain added
- [ ] Green checkmark (verified)
- [ ] SSL certificate issued
- [ ] WWW variant added
- [ ] Redirect configured

**DNS:**
- [ ] Records updated
- [ ] Propagation complete
- [ ] Email still works

**Testing:**
- [ ] HTTPS works
- [ ] WWW redirects correctly
- [ ] No SSL warnings
- [ ] Site loads correctly

---

## 🚨 Common Issues

### "Domain Not Verified"
```
Wait longer (DNS can take 48 hours)
Check DNS records are correct
Remove and re-add domain in Vercel
```

### "SSL Certificate Error"
```
Wait 10 minutes after verification
Check domain is fully verified first
Both www and non-www need records
```

### Email Stopped Working
```
Check MX records are still present
Add them back to new DNS provider
Wait for DNS propagation
```

---

## 📱 Registrar Quick Links

**GoDaddy:**
- Login: https://sso.godaddy.com
- DNS: Domain List → Manage → DNS

**Namecheap:**
- Login: https://www.namecheap.com/myaccount/login
- DNS: Domain List → Manage → Advanced DNS

**Cloudflare:**
- Login: https://dash.cloudflare.com
- DNS: Select domain → DNS

**Google Domains:**
- Login: https://domains.google.com
- DNS: My domains → Click domain → DNS

---

## 🔄 WWW Redirect Setup

**In Vercel Dashboard:**

1. Add both versions:
   - `meauxbility.org`
   - `www.meauxbility.org`

2. Choose primary:
   - Usually non-www (meauxbility.org)

3. Set redirect:
   - www → non-www (recommended)
   - OR non-www → www

---

## 📊 Current Vercel IPs

**If Vercel changes IPs, update A records:**

Current Vercel IP: `76.76.21.21`

Check latest: https://vercel.com/docs/custom-domains

---

## 💡 Pro Tips

**Use Vercel Nameservers if:**
- ✅ Simplest setup
- ✅ Don't need custom DNS features
- ✅ No existing email setup

**Use Your Own DNS if:**
- ✅ Already have email configured
- ✅ Need custom DNS records
- ✅ Using Cloudflare features
- ✅ Multiple services on same domain

---

## 🆘 Need Help?

**Run domain info gatherer:**
```bash
./gather-domain-info.sh
```

**Fill out template:**
```bash
cp DOMAIN-DNS-TEMPLATE.md DOMAIN-DNS-INFO.md
# Edit with your info
```

**Read full guide:**
```bash
cat DOMAIN-SETUP-GUIDE.md
```

---

## 🎯 One-Line Commands

**Add all three domains (in Vercel Dashboard):**
```
1. meauxbility.org → prj_AemccTFEjP7ztRJivI4wtysSyEfi
2. iaudodidact.com → prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY
3. inneranimals.com → prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR
```

**Check all domains:**
```bash
for domain in meauxbility.org iaudodidact.com inneranimals.com; do
  echo "=== $domain ==="
  dig +short A $domain
  dig +short NS $domain
  echo ""
done
```

---

**Updated:** October 30, 2024
**Vercel IP:** 76.76.21.21
**Nameservers:** ns1.vercel-dns.com, ns2.vercel-dns.com
