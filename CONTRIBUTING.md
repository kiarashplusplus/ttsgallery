# Contributing to TTS Gallery

Thank you for your interest in contributing to TTS Gallery! This document provides guidelines and information for contributors.

## 🎯 Project Vision

TTS Gallery (tts.gallery) is a privacy-focused, open-source tool for previewing and comparing Azure OpenAI text-to-speech voices. Our mission is to provide developers and content creators with a simple, secure way to test and compare TTS voices before integrating them into their applications.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs. actual behavior
- Browser and OS information
- Screenshots if applicable

### Suggesting Features

We welcome feature suggestions! Please open an issue with:
- A clear description of the feature
- Use case or problem it solves
- Proposed implementation (if you have ideas)
- Mockups or examples (if applicable)

### Pull Requests

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes** following our code style
3. **Test thoroughly** - ensure all features work
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request** with a detailed description

## 💻 Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/ttsgallery.git
cd ttsgallery

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Code Style

- **TypeScript**: We use TypeScript for type safety
- **React 19**: Use modern React patterns (hooks, functional components)
- **Tailwind CSS**: Use utility classes for styling
- **Shadcn UI**: Prefer shadcn components over custom implementations
- **No comments**: Code should be self-documenting unless absolutely necessary

### Component Guidelines

- Keep components focused and single-purpose
- Use descriptive prop names
- Prefer composition over props
- Extract reusable logic into custom hooks
- Use `useKV` for persistent state
- Use `useState` for ephemeral UI state

### Naming Conventions

- Components: `PascalCase` (e.g., `VoiceTester`)
- Hooks: `camelCase` with `use` prefix (e.g., `useVoiceGenerator`)
- Files: Match component name (e.g., `VoiceTester.tsx`)
- CSS classes: Use Tailwind utilities

## 🎨 Design Principles

- **Privacy First**: No data collection, credentials stay local
- **Simplicity**: Focus on core functionality
- **Professional**: Azure-themed, clean interface
- **Accessible**: WCAG AA compliance
- **Responsive**: Mobile-first design

## 🧪 Testing

Before submitting a PR:
- [ ] Test on Chrome, Firefox, and Safari
- [ ] Test on mobile devices
- [ ] Verify all voices work correctly
- [ ] Check error handling
- [ ] Ensure no console errors
- [ ] Test with invalid credentials

## 📋 Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # Shadcn components (don't modify)
│   └── ...          # Custom components
├── data/            # Static data (voices list)
├── hooks/           # Custom React hooks
├── lib/             # Utilities and services
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component
└── index.css        # Global styles and theme
```

## 🎯 Priority Areas

We're particularly interested in contributions for:

1. **Voice Library Updates**: New Azure voices or corrections
2. **Accessibility**: ARIA labels, keyboard navigation improvements
3. **Error Handling**: Better error messages and recovery
4. **Performance**: Optimization for audio generation/playback
5. **Documentation**: README improvements, code examples
6. **UI/UX**: Design improvements while maintaining simplicity

## 🚫 Out of Scope

Please avoid PRs for:
- Adding backend/server components (this is a client-only app)
- Integrating non-Azure TTS services
- Adding analytics or tracking
- Significant UI redesigns without discussion
- Dependencies on Node.js-only packages

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to open an issue for any questions about contributing!

## 🙏 Thank You

Every contribution helps make TTS Gallery better for everyone. Thank you for being part of this project!
