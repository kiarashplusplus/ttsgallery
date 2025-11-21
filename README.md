# TTS Gallery - Azure OpenAI TTS Voice Sampler

**[tts.gallery](https://tts.gallery)** - Free, open-source Azure OpenAI TTS voice preview tool. Compare all 23 text-to-speech voices (gpt-4o-mini-tts) including Alloy, Echo, Nova, Fable, Onyx, Shimmer, and 15 neural voices + 2 HD voices. Test individual voices or play through all voices sequentially with custom text.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Azure OpenAI](https://img.shields.io/badge/Azure-OpenAI%20TTS-0078D4)](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> 🎙️ **The complete Azure OpenAI TTS voice library at your fingertips**

Created by [Kiarash Adl](https://github.com/kiarashplusplus)

## 🌟 Features at a Glance

| Feature | Description |
|---------|-------------|
| 🎤 **23 Voices** | All Azure OpenAI TTS voices (Standard, Neural, HD) |
| 🔐 **Secure** | Credentials encrypted and stored locally in browser |
| 🎯 **Individual Testing** | Test any voice with custom text |
| 🎵 **Sequential Playback** | Compare all voices with same text automatically |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |
| 🎨 **Professional UI** | Azure-themed, clean interface |
| 🚀 **No Backend** | 100% client-side, no server required |
| 🔒 **Privacy-First** | Zero data collection or tracking |
| ⚡ **Fast** | Instant voice switching and playback |
| 🆓 **Free & Open** | MIT licensed, community-driven |

## 🎯 Supported Voices

### Standard Voices
- **Alloy** - Neutral and balanced
- **Echo** - Resonant and clear
- **Fable** - Expressive and warm
- **Nova** - Bright and energetic
- **Onyx** - Deep and authoritative
- **Shimmer** - Bright and cheerful

### Neural Voices
- **Ash** - Clear and articulate
- **Ballad** - Smooth and melodic
- **Brook** - Gentle and flowing
- **Cedar** - Warm and grounded
- **Clover** - Fresh and lively
- **Coral** - Vibrant and warm
- **Dan** - Professional and clear
- **Elan** - Energetic and dynamic
- **Jazz** - Smooth and sophisticated
- **Marin** - Fresh and coastal
- **Marilyn** - Classic and elegant
- **Meadow** - Calm and natural
- **Rio** - Lively and upbeat
- **Sage** - Wise and measured
- **Verse** - Poetic and expressive

### HD Voices
- **Jade Hardy** - Confident and strong
- **Megan Wetherall** - Professional and polished

## 🎯 Live Demo

**Visit [tts.gallery](https://tts.gallery)** to use the application immediately!

**Watch the Demo:** See TTS Gallery in action on [TikTok](https://www.tiktok.com/@tts.gallery/video/7575220076723358998) 🎥

<div align="center">
  <blockquote 
    class="tiktok-embed" 
    cite="https://www.tiktok.com/@tts.gallery/video/7575220076723358998" 
    data-video-id="7575220076723358998" 
    data-embed-from="embed_page"
    style="max-width: 605px;min-width: 325px;"
  >
    <section>
      <a 
        target="_blank" 
        title="@tts.gallery" 
        href="https://www.tiktok.com/@tts.gallery?refer=embed"
      >
        @tts.gallery
      </a>
      <p>
        OpenAI voice sampler for 
        <a 
          title="developers" 
          target="_blank" 
          href="https://www.tiktok.com/tag/developers?refer=embed"
        >
          #developers
        </a>
        to try before choosing an 
        <a 
          title="azure" 
          target="_blank" 
          href="https://www.tiktok.com/tag/azure?refer=embed"
        >
          #azure
        </a>
        <a 
          title="openai" 
          target="_blank" 
          href="https://www.tiktok.com/tag/openai?refer=embed"
        >
          #openAI
        </a>
        voice like Jade Hardy or Megan Wetherall
      </p>
      <a 
        target="_blank" 
        title="♬ original sound - tts.gallery" 
        href="https://www.tiktok.com/music/original-sound-7575220047904328470?refer=embed"
      >
        ♬ original sound - tts.gallery
      </a>
    </section>
  </blockquote>
  <script async src="https://www.tiktok.com/embed.js"></script>
</div>

**New to TTS Gallery?** Check out the [Quick Start Guide](QUICKSTART.md) for a 5-minute tutorial.

> ⚠️ **Before deploying your own instance**: This project requires `og-image.png` (1200×630px) and `screenshot.png` assets in the `public/` directory for proper SEO and social sharing. See [ASSETS.md](ASSETS.md) for detailed requirements and creation guidelines.

## 🚀 Getting Started

### Prerequisites

- An Azure OpenAI account with TTS deployment
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Azure OpenAI Setup

1. **Create an Azure OpenAI resource** in the Azure Portal
2. **Deploy a TTS model** (e.g., `gpt-4o-mini-tts`)
3. **Get your credentials**:
   - Endpoint URL (e.g., `https://your-resource.openai.azure.com`)
   - API Key (found in "Keys and Endpoint" section)
   - Deployment name (e.g., `gpt-4o-mini-tts`)
   - API version (e.g., `2025-03-01-preview`)

### Using the Application

1. **Visit [tts.gallery](https://tts.gallery)** or run locally
2. **Navigate to Settings tab**
3. **Enter your Azure OpenAI credentials**:
   ```
   Endpoint:    https://your-resource.openai.azure.com
   API Key:     your-api-key-here
   Deployment:  gpt-4o-mini-tts
   API Version: 2025-03-01-preview
   ```
4. **Click "Save Configuration"**
5. **Switch to Voice Testing tab**
6. **Select a voice** from the dropdown
7. **Enter or edit the sample text**
8. **Click "Speak"** to hear the selected voice
9. **Or click "Play All Voices"** to hear all voices sequentially

## 🛠️ Technical Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Vite** - Build tool
- **Azure OpenAI API** - Text-to-speech service

## 🔒 Privacy & Security

- ✅ All credentials stored locally in browser (encrypted KV store)
- ✅ No backend server required
- ✅ No data collection or analytics
- ✅ API calls made directly from browser to Azure
- ✅ Open source - verify the code yourself

**Note**: Your browser must support CORS for Azure OpenAI endpoints. If you encounter CORS issues, you may need to configure your Azure OpenAI resource to allow browser-based requests.

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/kiarashplusplus/ttsgallery.git
cd ttsgallery

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 API Configuration Examples

### Standard Configuration
```
Endpoint:    https://myresource.openai.azure.com
Deployment:  gpt-4o-mini-tts
API Version: 2025-03-01-preview
```

### With Custom Deployment
```
Endpoint:    https://mycompany-ai.openai.azure.com
Deployment:  tts-production-v2
API Version: 2025-03-01-preview
```

## 🎨 Customization

The application uses a professional Azure-themed color palette:

- **Primary**: Deep Azure Blue - Main actions and brand color
- **Secondary**: Cool Slate Gray - Supporting elements
- **Accent**: Vibrant Orange - Highlights and CTAs
- **Typography**: Inter (UI) + JetBrains Mono (code)

## 🐛 Troubleshooting

### "CORS Error" when generating speech
**Solution**: Ensure your Azure OpenAI resource allows browser-based requests. You may need to enable CORS in your Azure configuration or use a browser extension that enables CORS for development.

### "Authentication Failed" error
**Solution**: Double-check your API key and endpoint URL. Ensure there are no extra spaces or characters.

### "Deployment not found" error
**Solution**: Verify your deployment name matches exactly what's shown in Azure Portal. Deployment names are case-sensitive.

### Audio doesn't auto-play
**Solution**: Modern browsers block auto-play. Click the play button on the audio controls to start playback.

### "Play All" stops unexpectedly
**Solution**: Check your browser console for errors. Ensure you have sufficient Azure API quota remaining.

## 📝 Example Use Cases

- **Voice Selection** - Compare voices before implementing TTS in your application
- **Demo Creation** - Generate voice samples for client presentations
- **Quality Testing** - Verify voice quality with your specific content
- **Voice Discovery** - Explore all available voices to find the perfect fit
- **Batch Testing** - Test the same script across all voices quickly

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Have ideas to improve this tool?** Visit the [GitHub repository](https://github.com/kiarashplusplus/ttsgallery) to share your suggestions or submit a pull request!

Quick contribution steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines and project structure.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Created by [Kiarash Adl](https://github.com/kiarashplusplus)
- Built with [Shadcn UI](https://ui.shadcn.com/)
- Powered by [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- Icons from [Phosphor Icons](https://phosphoricons.com/)

## 📦 Deployment

Ready to deploy your own instance? See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Vercel (recommended)
- Netlify
- Cloudflare Pages
- GitHub Pages
- Custom domain setup for tts.gallery

### Required Assets

Before deploying, ensure you have created the following assets in your `public/` directory:

- **og-image.png** (1200x630px) - Open Graph image for social media sharing
- **screenshot.png** - Application screenshot for documentation and SEO

These images are referenced in the HTML meta tags and structured data for optimal SEO and social sharing.

## 🌟 Star History

If you find this project useful, please consider giving it a star on GitHub!

## 📧 Support

For issues related to:
- **This application**: Open an issue in the [GitHub repository](https://github.com/kiarashplusplus/ttsgallery/issues)
- **Feature requests**: Share your ideas on [GitHub Discussions](https://github.com/kiarashplusplus/ttsgallery/discussions)
- **Azure OpenAI Service**: Contact [Azure Support](https://azure.microsoft.com/en-us/support/)
- **API access**: Check [Azure OpenAI documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)

## 🔗 Links

- **Live Application**: [tts.gallery](https://tts.gallery)
- **GitHub Repository**: [github.com/kiarashplusplus/ttsgallery](https://github.com/kiarashplusplus/ttsgallery)
- **Report Issues**: [GitHub Issues](https://github.com/kiarashplusplus/ttsgallery/issues)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- **Contributing Guide**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Note**: This application is not affiliated with or endorsed by Microsoft or Azure. It's a community-built tool for testing Azure OpenAI TTS voices.

Made with ❤️ by [Kiarash Adl](https://github.com/kiarashplusplus)

## 🏷️ Topics

`azure-openai` `tts` `text-to-speech` `voice-sampler` `gpt-4o-mini-tts` `openai-voices` `azure-tts` `speech-synthesis` `voice-preview` `react` `typescript` `open-source` `developer-tools` `audio` `ai-voices` `neural-voices` `hd-voices` `voice-comparison` `demo-app`
