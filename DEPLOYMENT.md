# Deployment Guide for TTS Gallery

This guide will help you deploy TTS Gallery to various hosting platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- Your hosting platform account (Vercel, Netlify, etc.)

## 🚀 Quick Deploy

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kiarashplusplus/ttsgallery)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Vercel will automatically build and deploy
4. Your app will be live at `your-project.vercel.app`
5. Configure custom domain to point to `tts.gallery`

**Build Configuration:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kiarashplusplus/ttsgallery)

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub account
3. Netlify will automatically build and deploy
4. Your app will be live at `your-project.netlify.app`
5. Configure custom domain settings for `tts.gallery`

**Build Configuration:**
- Build Command: `npm run build`
- Publish Directory: `dist`
- Node Version: 18

### Deploy to GitHub Pages

1. **Update `vite.config.ts`**:
```typescript
export default defineConfig({
  base: '/tts-gallery/',  // Replace with your repo name
  // ... rest of config
})
```

2. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

3. **Add deploy script to `package.json`**:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Enable GitHub Pages** in repository settings (gh-pages branch)

### Deploy to Cloudflare Pages

1. **Connect your GitHub repository** in Cloudflare Pages dashboard
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Build Output Directory: `dist`
   - Environment Variables: None needed
3. **Deploy** - Cloudflare will build and deploy automatically
4. **Add custom domain** `tts.gallery` in Cloudflare Pages settings

## 🔧 Build for Production

### Local Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The production build will be in the `dist/` directory.

### Environment Variables

TTS Gallery doesn't require any environment variables for deployment. All configuration happens in the browser.

## 🌐 Custom Domain Setup

### Setting up tts.gallery domain

#### For Vercel:
1. Go to your project settings → Domains
2. Add `tts.gallery` and `www.tts.gallery`
3. Add the following DNS records to your domain registrar:

```
Type  Name  Value
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

#### For Netlify:
1. Go to Domain settings → Add custom domain
2. Add `tts.gallery`
3. Configure DNS records:

```
Type  Name  Value
A     @     75.2.60.5
CNAME www   your-site.netlify.app
```

#### For Cloudflare Pages:
1. Custom domains → Add custom domain
2. Add `tts.gallery`
3. Cloudflare will automatically configure DNS if you use Cloudflare DNS

### SSL/HTTPS

All recommended platforms (Vercel, Netlify, Cloudflare) provide automatic SSL certificates via Let's Encrypt. HTTPS will be enabled automatically.

## 🔒 Security Headers (Optional)

Add a `_headers` file to your `public/` directory for enhanced security:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://*.openai.azure.com;
```

## 📊 Analytics (Optional)

If you want to add privacy-friendly analytics:

### Plausible Analytics

1. Sign up at [plausible.io](https://plausible.io)
2. Add the script to `index.html`:

```html
<script defer data-domain="tts.gallery" src="https://plausible.io/js/script.js"></script>
```

### Umami Analytics

1. Self-host or use Umami Cloud
2. Add tracking script to `index.html`

**Note**: Remember that TTS Gallery is built on privacy principles. Only add analytics if necessary and always respect user privacy.

## 🚨 CORS Configuration

If users encounter CORS errors when using the app:

### Solution 1: Azure CORS Configuration
Users need to configure CORS in their Azure OpenAI resource to allow browser requests.

### Solution 2: Documentation
Add clear documentation in your app about CORS requirements and how to configure Azure OpenAI.

## 📱 PWA Support (Optional)

To make TTS Gallery installable as a Progressive Web App:

1. **Install vite-plugin-pwa**:
```bash
npm install -D vite-plugin-pwa
```

2. **Update vite.config.ts**:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'TTS Gallery',
        short_name: 'TTS Gallery',
        description: 'Azure OpenAI Voice Sampler',
        theme_color: '#0078d4',
        icons: [
          // Add your icon files
        ]
      }
    })
  ]
})
```

## 🐛 Troubleshooting

### Build fails with TypeScript errors
```bash
npm run build -- --noCheck
```

### Out of memory during build
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Assets not loading
Check that `base` in `vite.config.ts` is set correctly for your deployment.

## 📦 CDN Optimization

For better performance, ensure your hosting platform serves assets via CDN:
- ✅ Vercel - Automatic global CDN
- ✅ Netlify - Automatic global CDN
- ✅ Cloudflare Pages - Automatic global CDN

## 🔄 Continuous Deployment

All recommended platforms support automatic deployments:
1. Push to `main` branch → Automatic deployment
2. Pull requests → Preview deployments
3. Rollback available if needed

## 📞 Support

If you encounter deployment issues:
- Check platform-specific documentation
- Open an issue on GitHub
- Consult the platform's support team

---

**Ready to deploy?** Choose your preferred platform and follow the steps above. Your TTS Gallery instance will be live in minutes!
