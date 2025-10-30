# Meauxbility Foundation - November 3rd Launch

Complete monorepo for the unified deployment of all Meauxbility Foundation digital properties.

## 🚀 Projects

### 1. Meauxbility.org (Main Nonprofit Site)
**Location:** `apps/meauxbility-org`
**Deploy to:** meauxbility.org
**Purpose:** Main nonprofit website featuring grant applications, donation processing, and mission information

**Features:**
- Beautiful gradient hero design (Fred's proven template)
- Grant application form
- Donation system
- Mission and impact showcase
- 501(c)(3) EIN: 33-4214907

### 2. Admin Portal (iaudodidact.com)
**Location:** `apps/admin-portal-production`
**Deploy to:** iaudodidact.com
**Purpose:** Administrative dashboard for managing grants, donations, and operations

**Features:**
- Grant application management
- Donation tracking
- Analytics dashboard
- User management
- Integration with Supabase and Stripe

### 3. Inner Animals Shop (E-commerce)
**Location:** `apps/inneranimals-shop`
**Deploy to:** inneranimals.com
**Purpose:** Premium apparel e-commerce site supporting the foundation

**Features:**
- Product catalog
- Shopping cart
- Stripe checkout integration
- All proceeds support Meauxbility Foundation

## 📦 Quick Start

### Install Dependencies
```bash
npm run install:all
```

### Development (All Apps)
```bash
npm run dev:all
```

### Development (Individual Apps)
```bash
npm run dev:meauxbility   # Port 3000
npm run dev:admin         # Port 3001
npm run dev:shop          # Port 3002
```

### Build All Apps
```bash
npm run build:all
```

### Deploy Everything
```bash
npm run deploy
# or
./deploy-all.sh
```

## 🗄️ Database Schema

Located in `supabase/migrations/001_launch.sql`

**Tables:**
- `grants` - Grant applications
- `donations` - Donation records
- `products` - Shop inventory
- `orders` - Customer orders
- `order_items` - Order line items
- `admin_users` - Admin portal users

## 🔧 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe
- **Hosting:** Vercel
- **Version Control:** Git

## 🌐 Deployment

### Vercel Setup
1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Run deployment script: `./deploy-all.sh`

### Domain Configuration
- meauxbility.org → Meauxbility Foundation site
- iaudodidact.com → Admin Portal
- inneranimals.com → E-commerce Shop

## 📝 Environment Variables

### Admin Portal (.env.production)
```
NEXT_PUBLIC_APP_URL=https://iaudodidact.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE=your_service_role
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_public
GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## 📂 Project Structure

```
meauxbility-monorepo-IAM-/
├── apps/
│   ├── meauxbility-org/          # Main nonprofit site
│   │   ├── src/
│   │   │   └── app/
│   │   ├── package.json
│   │   └── next.config.js
│   ├── admin-portal-production/   # Admin dashboard
│   │   ├── src/
│   │   │   └── app/
│   │   ├── package.json
│   │   └── .env.production.example
│   └── inneranimals-shop/         # E-commerce site
│       ├── src/
│       │   └── app/
│       ├── package.json
│       └── next.config.js
├── supabase/
│   └── migrations/
│       └── 001_launch.sql
├── deploy-all.sh                  # Unified deployment script
├── package.json                   # Root package.json
└── README.md

```

## 🎯 November 3rd Launch Checklist

- [x] Create monorepo structure
- [x] Setup Meauxbility.org with Fred's design
- [x] Configure admin portal for iaudodidact.com
- [x] Build Inner Animals e-commerce platform
- [x] Create unified deployment script
- [x] Setup Supabase database schema
- [ ] Install all dependencies
- [ ] Test all builds
- [ ] Configure environment variables
- [ ] Run deployment
- [ ] Verify all domains
- [ ] Test payment processing

## 📞 Contact

**Meauxbility Foundation**
Lafayette, Louisiana
Email: sam@meauxbility.org
501(c)(3) EIN: 33-4214907

## 🦁 Inner Animals

Premium apparel brand supporting spinal cord injury survivors.
Every purchase helps fund adaptive equipment and accessibility services.

---

**Ready for November 3rd Launch!** 🎉
