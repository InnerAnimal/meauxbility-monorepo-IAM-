#!/bin/bash

echo "🚀 MEAUXBILITY FOUNDATION - NOVEMBER 3RD UNIFIED DEPLOYMENT"
echo "==========================================================="

# Deploy Admin Portal to iaudodidact.com
echo "📊 Deploying Admin Portal..."
cd apps/admin-portal-production
vercel --prod --name iaudodidact --yes

# Deploy Meauxbility.org
echo "🏛️ Deploying Meauxbility.org..."
cd ../meauxbility-org
vercel --prod --name meauxbility --yes

# Deploy InnerAnimals.com
echo "🛍️ Deploying InnerAnimals.com..."
cd ../inneranimals-shop
vercel --prod --name inneranimals --yes

# Configure custom domains
echo "🌐 Configuring domains..."
vercel domains add iaudodidact.com --project iaudodidact
vercel domains add meauxbility.org --project meauxbility
vercel domains add inneranimals.com --project inneranimals

echo "✅ DEPLOYMENT COMPLETE!"
echo "======================================"
echo "Admin Portal: https://iaudodidact.com"
echo "Nonprofit: https://meauxbility.org"
echo "E-commerce: https://inneranimals.com"
echo "======================================"
echo "🎉 READY FOR NOVEMBER 3RD LAUNCH! 🎉"
