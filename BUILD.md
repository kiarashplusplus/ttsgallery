# Cloudflare Pages Deployment - Quick Reference

## 🚀 Build Command

To build the production dist folder for Cloudflare Pages deployment, run:

```bash
npm run build
```

This will:
1. Compile TypeScript (`tsc -b --noCheck`)
2. Bundle and optimize with Vite
3. Create the `dist/` folder with all deployable files

## 📦 What Gets Built

The `dist/` folder will contain:

```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].js    # Bundled JavaScript (optimized)
│   ├── index-[hash].css   # Bundled CSS (optimized)
│   └── [other assets]     # Images, fonts, etc.
├── _redirects             # SPA routing configuration
├── _headers               # Security headers
├── robots.txt             # SEO crawling rules
└── sitemap.xml            # SEO sitemap
```

## ⚙️ Cloudflare Pages Configuration

**Build Settings:**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node version: 18+ (automatic)

**Environment Variables:**
- None required (client-side only app)

## 🌐 Domain Configuration

After deploying to Cloudflare Pages:

1. Your app will be at: `https://[project-name].pages.dev`
2. Add custom domain: `tts.gallery`
3. Cloudflare handles SSL automatically

## 📋 Deployment Methods

### Method 1: GitHub Integration (Recommended)
1. Connect repo to Cloudflare Pages
2. Push to `main` branch
3. Automatic build & deploy

### Method 2: Wrangler CLI
```bash
npm run build
wrangler pages deploy dist --project-name=tts-gallery
```

### Method 3: Direct Upload
1. Run `npm run build`
2. Upload `dist/` folder in Cloudflare Pages dashboard

## ✅ Pre-Deployment Checklist

- [ ] `npm install` completed
- [ ] `npm run build` runs successfully
- [ ] `dist/` folder created
- [ ] `dist/index.html` exists
- [ ] `dist/_redirects` exists
- [ ] `dist/_headers` exists
- [ ] All assets in `dist/assets/`
- [ ] Test locally: `npm run preview`

## 🔍 Verify Build

After running `npm run build`, check:

```bash
ls -la dist/
# Should show index.html, assets/, _redirects, _headers, etc.

# Check file sizes
du -sh dist/*

# Preview locally before deploying
npm run preview
# Open http://localhost:4173
```

## 📊 Expected Build Output

Typical build output:
- Total size: 1-3 MB (uncompressed)
- JavaScript: ~800 KB - 1.5 MB
- CSS: ~100-200 KB
- HTML: ~15-20 KB
- Other assets: Varies

Cloudflare automatically:
- Compresses with Brotli/Gzip
- Caches static assets
- Distributes to 300+ edge locations

## 🐛 Common Build Issues

**Issue: Build fails with TypeScript errors**
```bash
# The build already uses --noCheck, but if needed:
npm run build -- --mode production
```

**Issue: Out of memory**
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

**Issue: Missing dependencies**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🎯 Production Build Features

The build includes:
- ✅ Code minification
- ✅ Tree shaking (removes unused code)
- ✅ Asset optimization
- ✅ CSS purging (Tailwind)
- ✅ Code splitting
- ✅ Source maps (for debugging)
- ✅ Cache busting (hashed filenames)

## 📈 Performance Optimizations

Automatically applied:
- Lazy loading for routes/components
- Font preloading (Google Fonts)
- Image optimization
- CSS/JS compression
- Chunk splitting for faster loads

## 🔐 Security Headers

Configured in `dist/_headers`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- CSP for allowed sources

## 🔄 Continuous Deployment

Once set up:
1. Make changes to code
2. Commit and push to GitHub
3. Cloudflare auto-builds and deploys
4. Live in 2-3 minutes

## 📞 Need Help?

- Build issues: Check `npm run build` output
- Deployment issues: See `CLOUDFLARE_DEPLOYMENT.md`
- General help: See `DEPLOYMENT.md`

---

**Ready to deploy?** Run `npm run build` and upload the `dist/` folder!
