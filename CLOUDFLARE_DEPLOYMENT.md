# Cloudflare Pages Deployment Guide for TTS Gallery

This guide provides step-by-step instructions for deploying TTS Gallery to Cloudflare Pages.

## 🚀 Quick Deploy

### Method 1: Cloudflare Dashboard (Recommended)

1. **Sign in to Cloudflare Pages**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git**

2. **Connect Your Repository**
   - Select your GitHub/GitLab account
   - Choose the `tts-gallery` repository
   - Click **Begin setup**

3. **Configure Build Settings**
   ```
   Project name: tts-gallery
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

4. **Environment Variables**
   - None required (TTS Gallery runs entirely in browser)

5. **Deploy**
   - Click **Save and Deploy**
   - Wait 2-3 minutes for initial build
   - Your site will be live at `tts-gallery.pages.dev`

### Method 2: Wrangler CLI (Advanced)

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Authenticate**
   ```bash
   wrangler login
   ```

3. **Build Locally**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   wrangler pages deploy dist --project-name=tts-gallery
   ```

## 🌐 Custom Domain Setup

### Connect tts.gallery Domain

1. **Add Custom Domain**
   - In Cloudflare Pages dashboard → **Custom domains**
   - Click **Set up a custom domain**
   - Enter: `tts.gallery`

2. **Configure DNS (if using Cloudflare DNS)**
   Cloudflare automatically configures DNS records. If not:
   
   ```
   Type    Name    Target
   CNAME   @       tts-gallery.pages.dev
   CNAME   www     tts-gallery.pages.dev
   ```

3. **SSL/TLS**
   - SSL is automatically provisioned (Free Let's Encrypt certificate)
   - Set SSL/TLS encryption mode to **Full** or **Full (strict)**

4. **Verify**
   - DNS propagation takes 5-60 minutes
   - Check at `https://tts.gallery`

## 📦 Build Configuration Details

### Project Structure for Deployment
```
tts-gallery/
├── dist/                    # Build output (generated)
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│   ├── _headers            # Security headers
│   ├── _redirects          # SPA routing
│   ├── robots.txt
│   └── sitemap.xml
├── public/                 # Static assets (copied to dist)
│   ├── _headers
│   ├── _redirects
│   ├── robots.txt
│   └── sitemap.xml
├── src/                    # Source code
└── package.json
```

### Build Command Explained
```bash
npm run build
# Runs: tsc -b --noCheck && vite build
```

1. `tsc -b --noCheck` - TypeScript compilation (no type checking for speed)
2. `vite build` - Bundles and optimizes for production

### Output Directory
- **dist/** contains all deployable files
- Cloudflare Pages serves files from this directory

## 🔧 Cloudflare-Specific Optimizations

### Headers Configuration
Headers are configured via `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600, must-revalidate

/index.html
  Cache-Control: public, max-age=0, must-revalidate
```

### Redirects Configuration
SPA routing is handled via `public/_redirects`:

```
/*    /index.html   200
```

This ensures all routes serve `index.html` for client-side routing.

### Performance Features (Automatic)
- ✅ **Global CDN** - 300+ edge locations worldwide
- ✅ **HTTP/2 & HTTP/3** - Automatic protocol upgrades
- ✅ **Brotli Compression** - Automatic asset compression
- ✅ **Smart Caching** - Edge caching based on headers
- ✅ **DDoS Protection** - Built-in security
- ✅ **Web Analytics** - Free, privacy-first analytics

## 🔄 Continuous Deployment

### Automatic Deployments
Once connected, Cloudflare Pages automatically:
1. **Deploys on push** to `main` branch → Production
2. **Creates previews** for pull requests → Preview URLs
3. **Enables rollbacks** to previous deployments

### Deployment Workflow
```
git push origin main
  ↓
GitHub/GitLab webhook triggers build
  ↓
Cloudflare Pages runs: npm run build
  ↓
Builds dist/ directory
  ↓
Deploys to global CDN
  ↓
Live at tts.gallery (2-3 minutes)
```

## 📊 Enable Web Analytics (Optional)

1. Go to **Web Analytics** in Cloudflare dashboard
2. Click **Add a site**
3. Enter `tts.gallery`
4. Add the provided script to `index.html` (privacy-friendly, no cookies)

**Note**: TTS Gallery prioritizes privacy. Analytics are optional.

## 🐛 Troubleshooting

### Build Fails

**Error**: `Cannot find module '@/components/...'`
- **Fix**: Ensure `tsconfig.json` has correct path aliases
- Check `vite.config.ts` resolve aliases

**Error**: `Out of memory`
- **Fix**: Build locally first to identify issues
- Check for circular dependencies

### 404 Errors on Refresh

**Problem**: Refreshing `/some-route` shows 404
- **Fix**: Ensure `_redirects` file exists in `public/`:
  ```
  /*    /index.html   200
  ```

### Assets Not Loading

**Problem**: CSS/JS files return 404
- **Fix**: Check `vite.config.ts` base path
- Ensure `base: '/'` for root domain deployment

### CORS Errors

**Problem**: Users see CORS errors calling Azure
- **Note**: This is expected - users must configure CORS in their Azure OpenAI resource
- Document this clearly in the app's Settings tab

## 🔐 Security Checklist

- ✅ HTTPS enforced automatically
- ✅ Security headers configured (`_headers`)
- ✅ CSP allows only necessary origins
- ✅ No sensitive data in build output
- ✅ XSS protection enabled
- ✅ Credentials stored locally (not deployed)

## 📈 Performance Checklist

- ✅ Bundle size optimized (Vite tree-shaking)
- ✅ Code splitting enabled
- ✅ Assets fingerprinted with hashes
- ✅ Compression enabled (Brotli/Gzip)
- ✅ Caching headers configured
- ✅ Fonts preconnected (Google Fonts)

## 🎯 Post-Deployment Verification

After deployment, verify:

1. **Homepage loads**: https://tts.gallery
2. **Security headers**: Check with [securityheaders.com](https://securityheaders.com)
3. **Performance**: Test with [PageSpeed Insights](https://pagespeed.web.dev)
4. **SSL Grade**: Check with [SSL Labs](https://www.ssllabs.com/ssltest/)
5. **Functionality**: Test voice generation with Azure credentials
6. **Mobile responsive**: Test on various devices
7. **SEO**: Verify meta tags and structured data

## 📱 Preview Deployments

Every pull request gets a unique preview URL:
```
https://[pr-number].tts-gallery.pages.dev
```

Use this to test changes before merging to production.

## 🔄 Rollback to Previous Version

1. Go to **Deployments** in Cloudflare Pages
2. Find the working deployment
3. Click **⋮** → **Rollback to this deployment**
4. Confirm rollback

## 💰 Pricing

Cloudflare Pages Free Tier:
- ✅ **500 builds/month** - More than enough
- ✅ **Unlimited requests** - No bandwidth limits
- ✅ **Unlimited bandwidth** - 100% free
- ✅ **100 custom domains** - Add as many as needed
- ✅ **DDoS protection** - Included

Perfect for TTS Gallery's needs.

## 🚀 Production Deployment Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy via Wrangler (if using CLI)
wrangler pages deploy dist --project-name=tts-gallery

# Deploy specific branch
wrangler pages deploy dist --branch=staging
```

## 📞 Support Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [TTS Gallery Issues](https://github.com/yourusername/tts-gallery/issues)

## ✅ Deployment Checklist

Before deploying:

- [ ] Update `package.json` version
- [ ] Test build locally (`npm run build`)
- [ ] Preview build locally (`npm run preview`)
- [ ] Verify all features work
- [ ] Update `CHANGELOG.md`
- [ ] Commit and push to GitHub
- [ ] Wait for automatic Cloudflare deployment
- [ ] Verify production site
- [ ] Test with real Azure credentials
- [ ] Check performance metrics
- [ ] Verify SEO tags
- [ ] Test on mobile devices
- [ ] Announce on socials (optional)

---

**Ready to deploy?** Push to GitHub and Cloudflare Pages handles the rest automatically!

## 🎉 First Deploy Success?

After your first successful deploy:
1. Share it: https://tts.gallery
2. Star the repo ⭐
3. Tweet about it
4. Add to GitHub trending
5. Submit to ProductHunt
6. Share in developer communities

Good luck! 🚀
