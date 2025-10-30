# Inner Animal Media - Deployment Guide

## ✅ Application Created Successfully!

Your new **Inner Animal Media** platform has been created in the monorepo at:
```
apps/inneranimalmedia/
```

---

## 🎯 Deployment Strategy: Deploy FIRST, DNS LATER

**You do NOT need to change DNS yet!** Follow this workflow:

### Phase 1: Deploy to Vercel (Do this now)
1. Deploy app to Vercel
2. Get `.vercel.app` URL
3. Test everything on that URL

### Phase 2: Add Custom Domain (Do this after testing)
1. Add `inneranimalmedia.com` in Vercel dashboard
2. Configure DNS in Cloudflare
3. Wait for DNS propagation
4. Verify custom domain works

---

## 🚀 Step 1: Deploy to Vercel

### Option A: Using Deployment Script (Easiest)

```bash
# From repo root
./deploy-inneranimalmedia.sh
```

This will:
- Install dependencies
- Build the app
- Deploy to Vercel
- Give you a live `.vercel.app` URL

### Option B: Using Vercel CLI

```bash
# Navigate to the app
cd apps/inneranimalmedia

# Install dependencies
npm install

# Deploy to production
vercel --prod --yes
```

### Option C: Via Vercel Dashboard

1. Go to: https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repo: `InnerAnimal/meauxbility-monorepo-IAM-`
4. **Important Settings**:
   - **Root Directory**: `apps/inneranimalmedia`
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click "Deploy"

---

## 🧪 Step 2: Test Your Deployment

After deployment, Vercel will give you a URL like:
```
https://inneranimalmedia.vercel.app
```

**Test the following:**
- [ ] Homepage loads correctly
- [ ] All sections display properly
- [ ] Navigation works
- [ ] Styling looks correct
- [ ] Links to Meauxbility.org work
- [ ] Mobile responsive design works

---

## 🌐 Step 3: Add Custom Domain (After Testing)

### Once you're happy with the .vercel.app site:

1. **Go to Vercel Project Settings**:
   - Dashboard → Your Project → Settings → Domains

2. **Add Domain**:
   - Enter: `inneranimalmedia.com`
   - Click "Add"
   - Also add: `www.inneranimalmedia.com`

3. **Vercel will show DNS instructions**

---

## 📡 Step 4: Configure DNS in Cloudflare

### Only do this after Step 3!

Go to: https://dash.cloudflare.com → inneranimalmedia.com → DNS → Records

Add these records:

**A Record (Root Domain)**
```
Type:    A
Name:    @
Target:  76.76.21.21
Proxy:   ☁️ Proxied (orange cloud ON)
TTL:     Auto
```

**AAAA Record (IPv6)**
```
Type:    AAAA
Name:    @
Target:  2606:4700:10::6816:1515
Proxy:   ☁️ Proxied (orange cloud ON)
TTL:     Auto
```

**CNAME Record (WWW)**
```
Type:    CNAME
Name:    www
Target:  cname.vercel-dns.com
Proxy:   ☁️ Proxied (orange cloud ON)
TTL:     Auto
```

### SSL/TLS Settings

In Cloudflare → SSL/TLS:
- Set mode to: **Full (strict)**

---

## ⏱️ Step 5: Wait for DNS Propagation

After adding DNS records:
- DNS propagation takes **5-30 minutes** (usually 10-15 minutes)
- Vercel will automatically detect the DNS changes
- SSL certificate will be provisioned automatically
- Once ready, Vercel will show "Valid Configuration" ✅

### Check DNS Propagation:

**Command line:**
```bash
dig inneranimalmedia.com
```

**Online tool:**
https://www.whatsmydns.net/#A/inneranimalmedia.com

---

## ✅ Step 6: Verify Custom Domain

Once DNS propagates, test:

```bash
curl -I https://inneranimalmedia.com
```

Should return `200 OK` with SSL.

Visit in browser:
- https://inneranimalmedia.com ✅
- https://www.inneranimalmedia.com ✅

Both should:
- Load your site
- Show green padlock (SSL)
- Redirect www → non-www (or vice versa)

---

## 🔧 Local Development

### Run locally:

```bash
# From repo root
npm run dev:media

# Or from app directory
cd apps/inneranimalmedia
npm run dev
```

Visit: http://localhost:3003

### Make changes:

1. Edit files in `apps/inneranimalmedia/src/`
2. See changes instantly in browser
3. When ready, commit and push to GitHub
4. Vercel will auto-deploy (if connected to GitHub)

---

## 📁 Project Structure

```
apps/inneranimalmedia/
├── src/
│   └── app/
│       ├── layout.tsx           # Root layout
│       ├── page.tsx             # Homepage
│       └── globals.css          # Global styles
├── public/                      # Static assets (images, etc)
├── .eslintrc.json              # ESLint config
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js config
├── package.json                # Dependencies & scripts
├── postcss.config.js           # PostCSS config
├── README.md                   # App-specific docs
├── tailwind.config.js          # Tailwind config
├── tsconfig.json               # TypeScript config
└── vercel.json                 # Vercel config
```

---

## 🎨 Customization

### Colors & Branding

Edit `src/app/globals.css` and Tailwind classes in components.

Current theme:
- **Primary**: Purple (`purple-600`, `purple-900`)
- **Accent**: Pink (`pink-600`)
- **Background**: Slate (`slate-900`)
- **Gradients**: Purple → Pink → Blue

### Content

Edit `src/app/page.tsx` to:
- Change hero text
- Add/remove sections
- Update links
- Modify content cards

### Layout

Edit `src/app/layout.tsx` for:
- Metadata (title, description)
- Global structure
- Analytics (if needed)

---

## 🔄 Continuous Deployment

### Connect to GitHub (Recommended)

In Vercel dashboard:
1. Go to Project Settings → Git
2. Connect to GitHub repo
3. Set branch to `main` (or your branch)

**From now on:**
- Push to GitHub → Vercel auto-deploys ✅
- Pull requests → Vercel creates preview deployments
- Main branch → Deploys to production

---

## 🚨 Troubleshooting

### Build fails?
```bash
cd apps/inneranimalmedia
npm run build
```
Fix errors shown, then redeploy.

### DNS not working?
- Wait 30 minutes for full propagation
- Check DNS records match exactly
- Verify nameservers are still Cloudflare
- Clear browser cache

### SSL errors?
- Ensure Cloudflare SSL is "Full (strict)"
- Wait 10 minutes for Vercel SSL provisioning
- Try purging SSL cache in Cloudflare

### 404 errors?
- Check Root Directory setting in Vercel
- Verify build completed successfully
- Check Vercel deployment logs

---

## 📊 All Four Projects

Your complete Meauxbility ecosystem:

| Project | Domain | Port | Status |
|---------|--------|------|--------|
| Meauxbility.org | meauxbility.org | 3000 | ✅ Deployed |
| Admin Portal | iaudodidact.com | 3001 | ✅ Deployed |
| Inner Animals Shop | inneranimals.com | 3002 | ✅ Deployed |
| **Inner Animal Media** | **inneranimalmedia.com** | **3003** | **🆕 Ready to deploy** |

---

## 🎯 Deployment Checklist

- [x] App created in monorepo
- [x] Dependencies installed
- [x] Build tested successfully ✅
- [x] Deployment script created
- [ ] Deploy to Vercel
- [ ] Test .vercel.app URL
- [ ] Add custom domain in Vercel
- [ ] Configure DNS in Cloudflare
- [ ] Wait for DNS propagation
- [ ] Verify https://inneranimalmedia.com
- [ ] Connect GitHub for auto-deployment

---

## 🎉 You're Ready!

Run this command to deploy:

```bash
./deploy-inneranimalmedia.sh
```

Or use Vercel dashboard. Either way, **test the .vercel.app URL first**, then add the custom domain!

**Questions? Check the full DNS guide in DNS-CONFIGURATION-INNERANIMALMEDIA.md**
