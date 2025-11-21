#!/bin/bash

# TTS Gallery - Cloudflare Pages Build Script
# This script builds the production-ready dist folder

set -e

echo "🎙️  TTS Gallery - Building for Cloudflare Pages Deployment"
echo "============================================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo "✅ Dependencies installed"
  echo ""
fi

# Clean previous build
if [ -d "dist" ]; then
  echo "🧹 Cleaning previous build..."
  rm -rf dist
  echo "✅ Previous build cleaned"
  echo ""
fi

# Run production build
echo "🔨 Building production bundle..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
  echo ""
  echo "✅ Build successful!"
  echo ""
  echo "📊 Build Statistics:"
  echo "-------------------"
  
  # Count files
  file_count=$(find dist -type f | wc -l)
  echo "Files: $file_count"
  
  # Calculate total size
  if command -v du &> /dev/null; then
    size=$(du -sh dist | cut -f1)
    echo "Total size: $size"
  fi
  
  # List main files
  echo ""
  echo "📁 Main files:"
  ls -lh dist/ | grep -E '^\-' | awk '{print "  " $9 " (" $5 ")"}'
  
  # Check for critical files
  echo ""
  echo "🔍 Verifying critical files..."
  
  critical_files=("index.html" "_redirects" "_headers" "robots.txt" "sitemap.xml")
  all_present=true
  
  for file in "${critical_files[@]}"; do
    if [ -f "dist/$file" ]; then
      echo "  ✅ $file"
    else
      echo "  ❌ $file (missing)"
      all_present=false
    fi
  done
  
  echo ""
  
  if [ "$all_present" = true ]; then
    echo "🎉 All critical files present!"
    echo ""
    echo "📦 Your dist/ folder is ready for Cloudflare Pages deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub: git add . && git commit -m 'Build for deployment' && git push"
    echo "2. Or deploy with Wrangler CLI: wrangler pages deploy dist --project-name=tts-gallery"
    echo "3. Or upload dist/ folder directly in Cloudflare Pages dashboard"
    echo ""
    echo "🌐 Your site will be live at: https://tts.gallery"
    exit 0
  else
    echo "⚠️  Warning: Some critical files are missing!"
    echo "The build may not work correctly on Cloudflare Pages."
    exit 1
  fi
else
  echo ""
  echo "❌ Build failed! dist/ folder not created."
  echo "Check the error messages above for details."
  exit 1
fi
