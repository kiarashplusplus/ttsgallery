# Azure OpenAI TTS Voice Sampler

A browser-based web application for previewing and comparing all available text-to-speech voices from Azure OpenAI's TTS service. Test individual voices or play through all 23 voices sequentially with your custom text.

![Azure OpenAI TTS Voice Sampler](https://via.placeholder.com/1200x600/0078D4/FFFFFF?text=Azure+OpenAI+TTS+Voice+Sampler)

## ✨ Features

- 🎤 **23 TTS Voices** - Preview all Azure OpenAI voices including alloy, echo, fable, nova, shimmer, and 18 more
- 🔐 **Secure Credential Storage** - Your Azure API credentials are stored locally in encrypted browser storage
- 🎯 **Individual Testing** - Select any voice and hear it speak your custom text
- 🎵 **Sequential Playback** - "Play All Voices" mode lets you compare all voices with the same text
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Azure-Themed UI** - Professional interface inspired by Microsoft Azure's design language
- 🚀 **Zero Backend** - Runs entirely in your browser, no server required
- 🔒 **Privacy-First** - No data collection, credentials never leave your browser

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
   - API version (e.g., `2024-02-15-preview`)

### Using the Application

1. **Open the application** in your web browser
2. **Navigate to Settings tab**
3. **Enter your Azure OpenAI credentials**:
   ```
   Endpoint:    https://your-resource.openai.azure.com
   API Key:     your-api-key-here
   Deployment:  gpt-4o-mini-tts
   API Version: 2024-02-15-preview
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

## 📖 API Configuration Examples

### Standard Configuration
```
Endpoint:    https://myresource.openai.azure.com
Deployment:  gpt-4o-mini-tts
API Version: 2024-02-15-preview
```

### With Custom Deployment
```
Endpoint:    https://mycompany-ai.openai.azure.com
Deployment:  tts-production-v2
API Version: 2024-02-15-preview
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

This is an open-source project. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Shadcn UI](https://ui.shadcn.com/)
- Powered by [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- Icons from [Phosphor Icons](https://phosphoricons.com/)

## 📧 Support

For issues related to:
- **This application**: Open an issue in this repository
- **Azure OpenAI Service**: Contact [Azure Support](https://azure.microsoft.com/en-us/support/)
- **API access**: Check [Azure OpenAI documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)

---

**Note**: This application is not affiliated with or endorsed by Microsoft or Azure. It's a community-built tool for testing Azure OpenAI TTS voices.
