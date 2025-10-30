# Inner Animal Media

Media platform for sharing stories of resilience, strength, and the warrior spirit within.

## Overview

Inner Animal Media is a content platform dedicated to authentic storytelling, documentaries, and multimedia content that amplifies voices of resilience and recovery. Part of the Meauxbility Foundation ecosystem.

## Features

- 📖 Story publishing and curation
- 🎥 Video documentary hosting
- 🎙️ Podcast episodes
- 💪 Community engagement
- 🎨 Modern, responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel
- **Port**: 3003 (development)

## Local Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3003

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

## Project Structure

```
inneranimalmedia/
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout
│       ├── page.tsx         # Homepage
│       └── globals.css      # Global styles
├── public/                  # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── vercel.json              # Vercel configuration
```

## Deployment

### Deploy to Vercel

**Option 1: Via Dashboard**
1. Go to: https://vercel.com
2. Click "New Project"
3. Import from GitHub: `InnerAnimal/meauxbility-monorepo-IAM-`
4. Set Root Directory: `apps/inneranimalmedia`
5. Click "Deploy"

**Option 2: Via CLI**
```bash
cd apps/inneranimalmedia
vercel --prod
```

**Option 3: Via Deployment Script**
```bash
# From repo root
./deploy-inneranimalmedia.sh
```

### Add Custom Domain (After Deployment)

1. Get your Vercel project URL (e.g., `inneranimalmedia.vercel.app`)
2. Test that it works
3. Add custom domain `inneranimalmedia.com` in Vercel dashboard
4. Update DNS records in Cloudflare (see DNS-CONFIGURATION-INNERANIMALMEDIA.md)

## Environment Variables

No environment variables required for basic deployment.

### Optional (for future features):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=https://inneranimalmedia.com
```

## Development Workflow

1. **Build New Feature**
   ```bash
   npm run dev
   ```

2. **Test Locally**
   - Visit http://localhost:3003
   - Test all functionality

3. **Build & Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

4. **Verify Deployment**
   - Check .vercel.app URL first
   - Once working, add custom domain

## Design Theme

- **Colors**: Purple, Pink, Blue gradients
- **Style**: Modern, bold, inspiring
- **Vibe**: Strength, resilience, warrior spirit
- **Typography**: Clean, readable, impactful

## Related Projects

- **Meauxbility.org**: Main nonprofit site
- **iaudodidact.com**: Admin portal
- **inneranimals.com**: E-commerce shop

## Links

- **Foundation**: https://meauxbility.org
- **Documentation**: See root README.md
- **DNS Guide**: ../DNS-CONFIGURATION-INNERANIMALMEDIA.md

## Future Features

- [ ] Blog/article system
- [ ] Video hosting integration
- [ ] Podcast RSS feed
- [ ] User comments/engagement
- [ ] Newsletter subscription
- [ ] Social media integration
- [ ] Search functionality
- [ ] Content categorization

---

**Part of the Meauxbility Foundation**
Lafayette, Louisiana
501(c)(3) EIN: 33-4214907
