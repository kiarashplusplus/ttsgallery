#!/bin/bash

# TTS Gallery - Quick Deploy to Cloudflare Pages
# This script builds and provides deployment instructions

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎙️  TTS Gallery - Cloudflare Pages Quick Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
if [ ! -d "node_modules" ]; then
  npm install
  if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
  else
    echo "❌ Failed to install dependencies"
    exit 1
  fi
else
  echo "✅ Dependencies already installed"
fi
echo ""

# Step 2: Build production files
echo "🔨 Step 2: Building production files..."
npm run build

if [ $? -eq 0 ] && [ -d "dist" ]; then
  echo "✅ Build successful!"
else
  echo "❌ Build failed"
  exit 1
fi
echo ""

# Step 3: Verify critical files
echo "🔍 Step 3: Verifying build output..."
critical_files=("dist/index.html" "dist/_redirects" "dist/_headers")
all_good=true

for file in "${critical_files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (missing)"
    all_good=false
  fi
done
echo ""

if [ "$all_good" = false ]; then
  echo "❌ Some critical files are missing!"
  exit 1
fi

# Show build stats
echo "📊 Build Statistics:"
echo "  Files: $(find dist -type f | wc -l)"
if command -v du &> /dev/null; then
  echo "  Size: $(du -sh dist | cut -f1)"
fi
echo ""

# Success message
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ BUILD COMPLETE - Ready for Cloudflare Pages!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📦 Your dist/ folder is ready for deployment."
echo ""
echo "🚀 DEPLOYMENT OPTIONS:"
echo ""
echo "Option 1: GitHub Integration (Recommended)"
echo "  1. Push to GitHub:"
echo "     git add ."
echo "     git commit -m 'Ready for deployment'"
echo "     git push origin main"
echo ""
echo "  2. Connect to Cloudflare Pages:"
echo "     → https://dash.cloudflare.com/pages"
echo "     → Click 'Create Application' → 'Connect to Git'"
echo "     → Select your repository"
echo "     → Build command: npm run build"
echo "     → Build output: dist"
echo "     → Click 'Save and Deploy'"
echo ""
echo "Option 2: Wrangler CLI"
echo "  1. Install Wrangler:"
echo "     npm install -g wrangler"
echo ""
echo "  2. Login:"
echo "     wrangler login"
echo ""
echo "  3. Deploy:"
echo "     wrangler pages deploy dist --project-name=tts-gallery"
echo ""
echo "Option 3: Direct Upload"
echo "  1. Go to: https://dash.cloudflare.com/pages"
echo "  2. Click 'Upload assets'"
echo "  3. Drag and drop the dist/ folder"
echo "  4. Click 'Deploy site'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 DOCUMENTATION:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  📄 DEPLOYMENT_SUMMARY.md - Quick overview"
echo "  📄 CLOUDFLARE_DEPLOYMENT.md - Complete Cloudflare guide"
echo "  📄 BUILD.md - Build process details"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 PREVIEW LOCALLY (Optional):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  npm run preview"
echo "  Then open: http://localhost:4173"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Your site will be live at:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Cloudflare: https://tts-gallery.pages.dev"
echo "  Custom: https://tts.gallery (after domain setup)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 Happy Deploying!"
echo ""
