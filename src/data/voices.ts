export interface Voice {
  id: string
  name: string
  description: string
  type: 'standard' | 'neural' | 'hd'
  useCases?: string
  isTop?: boolean
}

export const defaultVoices: Voice[] = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral and balanced voice - versatile for all content types', type: 'standard', useCases: 'General purpose, tutorials, announcements', isTop: true },
  { id: 'ash', name: 'Ash', description: 'Clear and articulate neural voice - professional delivery', type: 'neural', useCases: 'Business presentations, professional content' },
  { id: 'ballad', name: 'Ballad', description: 'Smooth and melodic neural voice - engaging narration', type: 'neural', useCases: 'Storytelling, audiobooks, creative content', isTop: true },
  { id: 'brook', name: 'Brook', description: 'Gentle and flowing neural voice - calm delivery', type: 'neural', useCases: 'Meditation, relaxation, gentle narration' },
  { id: 'cedar', name: 'Cedar', description: 'Warm and grounded neural voice - authentic feel', type: 'neural', useCases: 'Natural conversation, welcoming content' },
  { id: 'clover', name: 'Clover', description: 'Fresh and lively neural voice - energetic tone', type: 'neural', useCases: 'Upbeat content, youth-focused material' },
  { id: 'coral', name: 'Coral', description: 'Vibrant and warm neural voice - friendly delivery', type: 'neural', useCases: 'Customer service, friendly announcements' },
  { id: 'dan', name: 'Dan', description: 'Professional and clear neural voice - authoritative', type: 'neural', useCases: 'Corporate training, professional videos' },
  { id: 'echo', name: 'Echo', description: 'Resonant and clear standard voice - strong presence', type: 'standard', useCases: 'Announcements, important messages', isTop: true },
  { id: 'elan', name: 'Elan', description: 'Energetic and dynamic neural voice - enthusiastic', type: 'neural', useCases: 'Marketing, promotional content' },
  { id: 'fable', name: 'Fable', description: 'Expressive and warm standard voice - storytelling excellence', type: 'standard', useCases: 'Audiobooks, narrative content', isTop: true },
  { id: 'jade-hardy', name: 'Jade Hardy', description: 'Confident and strong HD voice - premium quality', type: 'hd', useCases: 'High-quality narration, professional broadcasts', isTop: true },
  { id: 'jazz', name: 'Jazz', description: 'Smooth and sophisticated neural voice - refined tone', type: 'neural', useCases: 'Luxury brands, sophisticated content' },
  { id: 'marin', name: 'Marin', description: 'Fresh and coastal neural voice - breezy delivery', type: 'neural', useCases: 'Lifestyle content, travel narration' },
  { id: 'marilyn', name: 'Marilyn', description: 'Classic and elegant neural voice - timeless quality', type: 'neural', useCases: 'Classic literature, elegant presentations' },
  { id: 'meadow', name: 'Meadow', description: 'Calm and natural neural voice - peaceful tone', type: 'neural', useCases: 'Nature content, calming narration' },
  { id: 'megan-wetherall', name: 'Megan Wetherall', description: 'Professional and polished HD voice - broadcast quality', type: 'hd', useCases: 'News broadcasts, premium content', isTop: true },
  { id: 'nova', name: 'Nova', description: 'Bright and energetic standard voice - engaging delivery', type: 'standard', useCases: 'Educational content, tutorials', isTop: true },
  { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative standard voice - commanding presence', type: 'standard', useCases: 'Documentaries, serious content', isTop: true },
  { id: 'rio', name: 'Rio', description: 'Lively and upbeat neural voice - vibrant energy', type: 'neural', useCases: 'Youth content, energetic presentations' },
  { id: 'sage', name: 'Sage', description: 'Wise and measured neural voice - thoughtful delivery', type: 'neural', useCases: 'Educational content, wisdom sharing' },
  { id: 'shimmer', name: 'Shimmer', description: 'Bright and cheerful standard voice - optimistic tone', type: 'standard', useCases: 'Positive messaging, uplifting content', isTop: true },
  { id: 'verse', name: 'Verse', description: 'Poetic and expressive neural voice - artistic flair', type: 'neural', useCases: 'Poetry, creative writing, artistic content' },
]

export const defaultSampleText = "Hello! I'm an Azure OpenAI text-to-speech voice from the gpt-4o-mini-tts model. This is how I sound when reading your custom text. Try me out with different content to see how I perform!"

export const playAllPresetText = "Seriously?"
