# Planning Guide

A browser-based Azure OpenAI TTS Voice Sampler that allows users to securely input their Azure credentials and preview all available TTS voices with customizable text, featuring sequential playback and credential persistence.

**Experience Qualities**:
1. **Professional** - Clean, corporate interface that inspires confidence when handling sensitive API credentials
2. **Efficient** - Quick voice previewing with minimal clicks, supporting batch testing of all voices
3. **Transparent** - Clear feedback on API calls, errors, and audio generation progress

**Complexity Level**: Light Application (multiple features with basic state)
  - Manages API credentials, voice selection, text input, and audio playback with state persistence

## Essential Features

### Credential Management
- **Functionality**: Secure input and storage of Azure OpenAI API credentials (endpoint, key, deployment, API version)
- **Purpose**: Enable users to connect to their own Azure OpenAI deployment without exposing credentials
- **Trigger**: Initial app load or "Settings" button click
- **Progression**: User opens app → sees credential form → inputs Azure details → validates format → saves to encrypted storage → enables voice testing
- **Success criteria**: Credentials persist between sessions, form validation prevents invalid inputs, clear error messages for API failures

### Voice Selection & Preview
- **Functionality**: Dropdown selector with 20+ Azure TTS voices, text input area, and "Speak" button
- **Purpose**: Allow users to test individual voices with custom text
- **Trigger**: User selects voice and clicks "Speak" button
- **Progression**: User selects voice → enters/edits text → clicks Speak → API call initiated → loading indicator shown → audio returned → auto-plays in player
- **Success criteria**: Audio plays within 2 seconds, clear error handling for API failures, audio controls allow replay

### Play All Voices Mode
- **Functionality**: Sequential playback of sample text across all available voices
- **Purpose**: Enable quick comparison of all voices without manual clicking
- **Trigger**: User clicks "Play All Voices" button
- **Progression**: User clicks Play All → first voice generates → plays → next voice generates → plays → continues until complete → shows completion message
- **Success criteria**: Smooth transitions between voices, ability to cancel mid-sequence, visual indicator of current voice

### Voice Library Management
- **Functionality**: Predefined list of Azure TTS voices with option to add custom voices
- **Purpose**: Support all known Azure voices including dated variants and new releases
- **Trigger**: App initialization loads default voice list
- **Progression**: App loads → voice list populated from local data → dropdown populated → user can optionally add custom voice names
- **Success criteria**: All 20+ voices available, alphabetically sorted, custom voices persist

## Edge Case Handling
- **Missing Credentials**: Show friendly prompt to configure Azure settings before enabling voice testing
- **Invalid API Response**: Display specific error messages (authentication, quota, network) with suggested fixes
- **Network Timeout**: Show timeout error after 30s, allow retry without re-entering credentials
- **Empty Text Input**: Provide default sample text, validate minimum 1 character before API call
- **Audio Playback Failure**: Gracefully handle browser audio restrictions, show manual play button
- **Concurrent Play All**: Disable "Play All" button during sequential playback to prevent conflicts

## Design Direction
The design should feel professional and corporate, evoking the Microsoft Azure aesthetic with blue accents and clean typography. A minimal interface serves the technical/developer audience best, with clear sectioning between credentials, controls, and playback areas.

## Color Selection
Complementary (opposite colors) - Azure blue paired with warm orange accents to create professional contrast while maintaining energy and focus for interactive elements.

- **Primary Color**: Deep Azure Blue (oklch(0.45 0.15 250)) - conveys Microsoft Azure brand alignment and technical credibility
- **Secondary Colors**: Cool slate gray (oklch(0.65 0.02 250)) for secondary UI elements and neutral backgrounds
- **Accent Color**: Vibrant orange (oklch(0.68 0.17 45)) for CTAs and interactive highlights
- **Foreground/Background Pairings**:
  - Background (White oklch(0.98 0 0)): Dark text (oklch(0.25 0.02 250)) - Ratio 12.5:1 ✓
  - Card (Light blue oklch(0.96 0.03 250)): Dark text (oklch(0.25 0.02 250)) - Ratio 11.8:1 ✓
  - Primary (Azure Blue oklch(0.45 0.15 250)): White text (oklch(0.98 0 0)) - Ratio 7.2:1 ✓
  - Accent (Orange oklch(0.68 0.17 45)): Dark text (oklch(0.25 0.02 250)) - Ratio 6.1:1 ✓
  - Muted (Light gray oklch(0.92 0.01 250)): Medium text (oklch(0.50 0.02 250)) - Ratio 4.8:1 ✓

## Font Selection
Typography should convey technical precision while maintaining readability for extended use, using the Segoe UI system font family (Microsoft's design language) with Inter as a web-friendly fallback.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter SemiBold/32px/tight tracking (-0.02em)
  - H2 (Section Headers): Inter Medium/20px/tight tracking
  - H3 (Voice Names): Inter Medium/16px/normal tracking
  - Body (Instructions): Inter Regular/14px/relaxed line-height (1.6)
  - Labels (Form Fields): Inter Medium/13px/wide tracking (0.01em)
  - Buttons: Inter SemiBold/14px/normal tracking
  - Code (API Keys): JetBrains Mono Regular/13px/monospace

## Animations
Animations should be subtle and functional, reinforcing state changes and guiding attention during the sequential voice playback process without distracting from the core testing workflow.

- **Purposeful Meaning**: Use pulse animations on the active voice during "Play All" mode to clearly show progress; fade transitions for audio player appearance communicate generation completion
- **Hierarchy of Movement**: Prioritize current voice highlighting > audio waveform visualization > button state changes > form field focus states

## Component Selection
- **Components**:
  - **Card** (Shadcn): Main container for credential form and voice testing area - add subtle shadow and blue-tinted border
  - **Input** (Shadcn): API credential fields - monospace font for keys/endpoints
  - **Select** (Shadcn): Voice dropdown - include voice descriptions in options
  - **Textarea** (Shadcn): Sample text input - adjustable height, character counter
  - **Button** (Shadcn): Primary (Speak), Secondary (Play All), Ghost (Settings) - use Primary with Azure blue
  - **Alert** (Shadcn): Error/success messages - destructive for API errors, success for completion
  - **Progress** (Shadcn): Show during "Play All" sequence - number of voices completed
  - **Tabs** (Shadcn): Switch between Settings and Voice Testing views
  - **Badge** (Shadcn): Show voice type tags (alloy, neural, etc.)
  - **Separator** (Shadcn): Divide credential section from testing section

- **Customizations**:
  - Custom audio player component with waveform visualization using Web Audio API
  - Custom voice card component showing voice name, type badge, and play button
  - Toast notifications (Sonner) for API success/error feedback

- **States**:
  - Buttons: Default azure blue, hover with scale(1.02), active with depth, disabled with 40% opacity, loading with spinner
  - Inputs: Default with blue border on focus, error state with red border and shake animation
  - Select: Hover shows light blue background, selected option has azure accent

- **Icon Selection**:
  - Gear (settings management)
  - Play/Pause (audio controls)
  - ListChecks (Play All mode)
  - SpeakerHigh (voice preview)
  - Warning (error states)
  - CheckCircle (success confirmations)
  - Key (credential fields)
  - CaretDown (dropdown indicators)

- **Spacing**:
  - Section gaps: gap-8 (2rem)
  - Form field spacing: gap-4 (1rem)
  - Card padding: p-6 (1.5rem)
  - Button padding: px-6 py-3
  - Container max-width: max-w-4xl

- **Mobile**:
  - Stack credential form fields vertically on mobile
  - Full-width buttons on screens < 640px
  - Collapse Settings into a Sheet drawer on mobile
  - Reduce voice list font size on mobile
  - Audio player controls adapt to narrow width
  - Tab navigation converts to vertical on mobile
