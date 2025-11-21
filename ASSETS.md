# Required Assets

This document lists the assets required for the TTS Gallery project for proper SEO, social sharing, and deployment.

## Image Assets

All image assets should be placed in the `public/` directory at the root of the project.

### og-image.png

**Purpose**: Open Graph image for social media sharing (Facebook, LinkedIn, etc.)

**Specifications**:
- **Dimensions**: 1200 × 630 pixels
- **Format**: PNG (preferred) or JPG
- **File size**: < 1MB recommended
- **Location**: `public/og-image.png`

**Usage**: 
- Referenced in HTML meta tags for Open Graph (`og:image`)
- Referenced in Twitter Card meta tags (`twitter:image`)
- Displays when sharing tts.gallery links on social media platforms

**Recommended Content**:
- TTS Gallery branding/logo
- Text: "TTS Gallery - Azure OpenAI Voice Sampler"
- Visual representation of the app (screenshot or design)
- High contrast colors for visibility in social feeds

### screenshot.png

**Purpose**: Application screenshot for documentation, SEO, and schema.org structured data

**Specifications**:
- **Dimensions**: 1280 × 720 pixels or higher (16:9 ratio recommended)
- **Format**: PNG (preferred)
- **File size**: < 2MB recommended
- **Location**: `public/screenshot.png`

**Usage**:
- Referenced in schema.org `SoftwareApplication` structured data
- Can be used in README and documentation
- Helps with SEO by showing search engines what the app looks like

**Recommended Content**:
- Full application interface screenshot
- Show the voice testing interface with sample text
- Include visible branding (TTS Gallery header)
- Capture the main UI elements (voice selector, text input, play buttons)

## Creating the Assets

### Quick Creation Guide

1. **For og-image.png**:
   - Use a design tool (Figma, Canva, Photoshop)
   - Create a 1200×630px canvas
   - Add TTS Gallery branding
   - Include key text: "Preview all 23 Azure OpenAI TTS Voices"
   - Use the brand colors from the theme (blue/orange accent)
   - Export as PNG

2. **For screenshot.png**:
   - Open the application in your browser
   - Navigate to the main voice testing interface
   - Use browser developer tools or a screenshot tool
   - Capture at least 1280×720 resolution
   - Ensure UI is in a clean, presentable state
   - Crop and optimize the image
   - Export as PNG

### Placeholder Assets

If you need to deploy quickly, you can create simple placeholder images:

```bash
# Install ImageMagick (if not already installed)
# Then create placeholders:

# OG Image placeholder
convert -size 1200x630 xc:#3B82F6 -pointsize 48 -fill white -gravity center \
  -annotate +0+0 "TTS Gallery\nAzure OpenAI Voice Sampler" \
  public/og-image.png

# Screenshot placeholder
convert -size 1280x720 xc:#F8F9FA -pointsize 36 -fill #1E293B -gravity center \
  -annotate +0+0 "TTS Gallery Screenshot" \
  public/screenshot.png
```

## Validation

After adding the assets, validate them:

1. **Check file paths**:
   ```bash
   ls -lh public/og-image.png
   ls -lh public/screenshot.png
   ```

2. **Test Open Graph tags**:
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

3. **Test structured data**:
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Verify schema.org markup is correctly parsed

## Asset Guidelines

### Best Practices

- **Optimize file sizes**: Use compression tools like TinyPNG or ImageOptim
- **Use descriptive filenames**: Keep the standard names for consistency
- **Version control**: Include these assets in git (they're not too large)
- **Branding consistency**: Match the app's color scheme and typography
- **Accessibility**: Ensure text in images has sufficient contrast

### Don't

- Don't use copyrighted images without permission
- Don't exceed recommended file sizes (slow page loads)
- Don't use low-resolution images (looks unprofessional)
- Don't include sensitive information in screenshots

## Deployment Checklist

Before deploying to tts.gallery:

- [ ] `public/og-image.png` exists and is 1200×630px
- [ ] `public/screenshot.png` exists and is high quality
- [ ] Both images are optimized for web
- [ ] Images match the TTS Gallery branding
- [ ] No sensitive data visible in screenshot
- [ ] Tested social sharing preview on at least one platform
- [ ] Validated structured data with Google Rich Results Test

## Additional Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

**Note**: These assets are essential for professional presentation and SEO. Taking time to create high-quality versions will improve the visibility and shareability of TTS Gallery.

Created by [Kiarash Adl](https://github.com/kiarashplusplus) • [GitHub Repository](https://github.com/kiarashplusplus/ttsgallery)
