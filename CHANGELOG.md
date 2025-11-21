# Changelog

All notable changes to TTS Gallery will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-01

### 🎉 Initial Release - TTS Gallery Launch

#### Added
- **23 Azure OpenAI TTS Voices** - Support for all Standard, Neural, and HD voices
  - Standard: Alloy, Echo, Fable, Nova, Onyx, Shimmer
  - Neural: Ash, Ballad, Brook, Cedar, Clover, Coral, Dan, Elan, Jazz, Marin, Marilyn, Meadow, Rio, Sage, Verse
  - HD: Jade Hardy, Megan Wetherall
- **Secure Credential Management** - Local encrypted storage for Azure OpenAI credentials
- **Individual Voice Testing** - Select and test any voice with custom text
- **Sequential Playback Mode** - "Play All Voices" feature to compare all voices automatically
- **Real-time Audio Generation** - Direct integration with Azure OpenAI TTS API
- **Responsive Design** - Mobile-first design that works on all devices
- **Professional UI** - Azure-themed interface with gradient branding
- **Voice Type Badges** - Visual indicators for Standard, Neural, and HD voices
- **Audio Player Controls** - Full playback controls for generated speech
- **Error Handling** - Comprehensive error messages and recovery
- **Privacy-Focused Architecture** - Zero data collection, client-side only
- **Form Validation** - Input validation for all credential fields
- **Progress Indicators** - Visual feedback during voice generation and playback
- **Toast Notifications** - Success and error notifications using Sonner

#### Features
- Tab-based navigation (Voice Testing / Settings)
- Credential persistence across sessions
- Sample text editor with character count
- Visual voice selection grid
- Active voice highlighting during sequential playback
- Default sample text provided
- Auto-play generated audio
- Cancel sequential playback mid-sequence

#### Technical Stack
- React 19 with TypeScript
- Vite build system
- Tailwind CSS for styling
- Shadcn UI component library
- Framer Motion for animations
- Phosphor Icons
- Azure OpenAI TTS API integration

#### Documentation
- Comprehensive README with feature overview
- CONTRIBUTING.md with contribution guidelines
- DEPLOYMENT.md with hosting instructions
- PRD.md with product requirements and design rationale
- SECURITY.md for security policies
- LICENSE (MIT)

#### Infrastructure
- SEO optimization with meta tags
- Robots.txt for search engines
- Sitemap.xml for indexing
- Security headers configuration
- Favicon and branding
- Social media meta tags (Open Graph, Twitter)

### Security
- All credentials stored locally using encrypted browser storage
- No backend servers - 100% client-side application
- Direct API calls to user's Azure OpenAI endpoint only
- No third-party analytics or tracking
- Content Security Policy headers

### Domain
- Primary domain: **tts.gallery**
- Branding updated throughout application
- Production-ready for deployment

---

## Future Roadmap

### Planned Features
- [ ] Voice favorites/bookmarks
- [ ] Custom voice library management
- [ ] Audio export/download
- [ ] Voice comparison side-by-side
- [ ] Batch text testing
- [ ] Voice speed/pitch controls
- [ ] History of generated samples
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] PWA support for offline use

### Under Consideration
- [ ] Support for additional TTS providers
- [ ] Voice sample library
- [ ] Shareable voice configurations
- [ ] Browser extension version
- [ ] API usage analytics (local only)

---

## Version History

- **1.0.0** (2024-01-01) - Initial public release with tts.gallery domain

---

**Note**: All versions follow [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for backwards-compatible functionality additions
- PATCH version for backwards-compatible bug fixes
