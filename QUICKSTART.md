# Quick Start Guide - TTS Gallery

Welcome to **TTS Gallery**! This guide will help you get started in under 5 minutes.

## 🎯 What is TTS Gallery?

TTS Gallery is a browser-based tool that lets you preview and compare all 23 Azure OpenAI text-to-speech voices. Perfect for:
- Developers choosing voices for their applications
- Content creators testing voice options
- Teams comparing voice quality
- Anyone curious about AI voices

## ⚡ Quick Start (5 Minutes)

### Step 1: Get Azure OpenAI Access

If you don't have Azure OpenAI access yet:
1. Visit [Azure Portal](https://portal.azure.com)
2. Create an Azure OpenAI resource
3. Deploy a TTS model (e.g., `gpt-4o-mini-tts`)
4. Note your credentials (you'll need these in Step 2)

### Step 2: Open TTS Gallery

Visit **[tts.gallery](https://tts.gallery)** in your web browser.

### Step 3: Configure Your Credentials

1. Click the **Settings** tab
2. Enter your Azure OpenAI details:
   - **Endpoint**: Your Azure resource URL (e.g., `https://your-resource.openai.azure.com`)
   - **API Key**: Your API key from Azure Portal
   - **Deployment**: Your deployment name (e.g., `gpt-4o-mini-tts`)
   - **API Version**: Usually `2025-03-01-preview`
3. Click **Save Configuration**

> 💡 **Privacy Note**: Your credentials are encrypted and stored locally in your browser. They never leave your device except to call your Azure endpoint.

### Step 4: Test a Voice

1. Switch to the **Voice Testing** tab
2. Select a voice from the dropdown (try "Alloy" first)
3. Edit the sample text or use the default
4. Click **Speak** to hear the voice

### Step 5: Compare All Voices

Want to hear all voices with the same text?
1. Enter your text in the Sample Text field
2. Click **Play All Voices**
3. Sit back and listen to all 23 voices sequentially

## 🎤 Understanding the Voices

### Standard Voices (6)
High-quality voices suitable for most applications:
- **Alloy** - Neutral and balanced
- **Echo** - Resonant and clear
- **Fable** - Expressive and warm
- **Nova** - Bright and energetic
- **Onyx** - Deep and authoritative
- **Shimmer** - Bright and cheerful

### Neural Voices (15)
Advanced neural voices with enhanced expressiveness:
- **Ash, Ballad, Brook, Cedar, Clover** - Natural and expressive
- **Coral, Dan, Elan, Jazz, Marin** - Smooth and professional
- **Marilyn, Meadow, Rio, Sage, Verse** - Diverse characteristics

### HD Voices (2)
Highest quality voices for premium applications:
- **Jade Hardy** - Confident and strong
- **Megan Wetherall** - Professional and polished

## 💡 Tips & Tricks

### Finding the Right Voice
- **Test with your actual content** - Different voices work better for different content types
- **Use "Play All"** - Listen to all voices to find the perfect match
- **Consider your audience** - Some voices are more formal, others more casual
- **Test multiple text samples** - Voices may sound different with various content

### Sample Text Ideas
- Product descriptions
- Podcast intros
- Customer service scripts
- Educational content
- Story narration
- Business presentations

### Optimizing Quality
- Use proper punctuation for natural pauses
- Test with different sentence lengths
- Try emphasis with ALL CAPS or *asterisks*
- Include questions to hear voice inflection

## 🔧 Troubleshooting

### "Please configure your Azure OpenAI credentials"
→ Go to Settings tab and enter your credentials

### "Authentication Failed"
→ Double-check your API key and endpoint URL (no extra spaces!)

### "Deployment not found"
→ Verify your deployment name matches exactly what's in Azure Portal

### CORS Error
→ Your Azure resource might not allow browser requests. See [Azure CORS documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/cors)

### Audio doesn't play
→ Check your browser's audio permissions and volume settings

## 🔒 Security & Privacy

✅ **Your data stays on your device**
- Credentials encrypted in browser storage
- No server-side storage
- No data collection or analytics

✅ **Direct to Azure**
- API calls go directly to your Azure endpoint
- TTS Gallery never sees your credentials
- Open-source code you can verify

## 📚 Next Steps

Once you're comfortable with the basics:
- ⭐ [Star the project](https://github.com/yourusername/tts-gallery) on GitHub
- 📖 Read the full [README](README.md)
- 🤝 Check out [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- 🚀 Deploy your own instance with [DEPLOYMENT.md](DEPLOYMENT.md)

## 🆘 Need Help?

- 💬 [Open an issue](https://github.com/yourusername/tts-gallery/issues) on GitHub
- 📧 Check [Azure OpenAI documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- 🔍 Search existing issues for similar problems

---

**Ready to explore voices?** Head to **[tts.gallery](https://tts.gallery)** and start testing! 🎉
