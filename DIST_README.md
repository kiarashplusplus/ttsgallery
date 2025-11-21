# TTS Gallery - Production Build

This directory contains the production-ready build of **TTS Gallery** for deployment to Cloudflare Pages.

## 📦 Contents

This build includes:
- `index.html` - Main application entry point with SEO meta tags
- `assets/` - Optimized JavaScript, CSS, and other static assets
- `_redirects` - Cloudflare Pages SPA routing configuration
- `_headers` - Security and caching headers
- `robots.txt` - Search engine crawling instructions
- `sitemap.xml` - SEO sitemap

## 🚀 Deploying to Cloudflare Pages

### Quick Deploy

Upload this entire directory to Cloudflare Pages:

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create Application** → **Pages** → **Upload assets**
3. Select all files in this directory
4. Click **Deploy site**

### Production URL

After deployment, your site will be available at:
- Cloudflare Pages URL: `https://[project-name].pages.dev`
- Custom domain: `https://tts.gallery`

## ⚙️ Configuration

All configuration is pre-built into these files:

- **Routing**: `_redirects` handles SPA routing
- **Security**: `_headers` sets security headers
- **SEO**: Meta tags in `index.html`, `robots.txt`, `sitemap.xml`
- **Performance**: Assets are minified, compressed, and cache-optimized

## 🔐 Security

Security headers configured:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- CSP: Allows only necessary external resources
- HTTPS: Enforced automatically by Cloudflare

## 📊 Performance

Build optimizations:
- Minified JavaScript and CSS
- Tree-shaken dependencies
- Code splitting for optimal loading
- Hashed filenames for cache busting
- Brotli/Gzip compression (automatic by Cloudflare)

## 🌐 SEO

SEO features included:
- Comprehensive meta tags
- Open Graph tags for social sharing
- Twitter Card metadata
- JSON-LD structured data
- Sitemap for search engines
- Robots.txt for crawler guidance

## 📱 Features

- 23 Azure OpenAI TTS voices (Standard, Neural, HD)
- Individual voice testing
- Sequential playback of all voices
- Local credential storage (browser-only)
- Privacy-first design
- Responsive mobile UI

## 🔧 Maintenance

This build is static and requires no server-side maintenance. Cloudflare Pages handles:
- SSL certificates
- DDoS protection
- Global CDN distribution
- Automatic compression
- Edge caching

## 📞 Support

For issues or questions:
- GitHub: [TTS Gallery Repository](https://github.com/yourusername/tts-gallery)
- Documentation: See root project files
- Cloudflare: [Pages Documentation](https://developers.cloudflare.com/pages/)

---

**Built with**: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
**Version**: 1.0.0
**License**: MIT
**Website**: https://tts.gallery
