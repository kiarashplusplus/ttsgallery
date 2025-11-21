export interface Voice {
  id: string
  name: string
  description: string
  type: 'standard' | 'neural' | 'hd'
}

export const defaultVoices: Voice[] = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral and balanced', type: 'standard' },
  { id: 'ash', name: 'Ash', description: 'Clear and articulate', type: 'neural' },
  { id: 'ballad', name: 'Ballad', description: 'Smooth and melodic', type: 'neural' },
  { id: 'brook', name: 'Brook', description: 'Gentle and flowing', type: 'neural' },
  { id: 'cedar', name: 'Cedar', description: 'Warm and grounded', type: 'neural' },
  { id: 'clover', name: 'Clover', description: 'Fresh and lively', type: 'neural' },
  { id: 'coral', name: 'Coral', description: 'Vibrant and warm', type: 'neural' },
  { id: 'dan', name: 'Dan', description: 'Professional and clear', type: 'neural' },
  { id: 'echo', name: 'Echo', description: 'Resonant and clear', type: 'standard' },
  { id: 'elan', name: 'Elan', description: 'Energetic and dynamic', type: 'neural' },
  { id: 'fable', name: 'Fable', description: 'Expressive and warm', type: 'standard' },
  { id: 'jade-hardy', name: 'Jade Hardy', description: 'Confident and strong', type: 'hd' },
  { id: 'jazz', name: 'Jazz', description: 'Smooth and sophisticated', type: 'neural' },
  { id: 'marin', name: 'Marin', description: 'Fresh and coastal', type: 'neural' },
  { id: 'marilyn', name: 'Marilyn', description: 'Classic and elegant', type: 'neural' },
  { id: 'meadow', name: 'Meadow', description: 'Calm and natural', type: 'neural' },
  { id: 'megan-wetherall', name: 'Megan Wetherall', description: 'Professional and polished', type: 'hd' },
  { id: 'nova', name: 'Nova', description: 'Bright and energetic', type: 'standard' },
  { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative', type: 'standard' },
  { id: 'rio', name: 'Rio', description: 'Lively and upbeat', type: 'neural' },
  { id: 'sage', name: 'Sage', description: 'Wise and measured', type: 'neural' },
  { id: 'shimmer', name: 'Shimmer', description: 'Bright and cheerful', type: 'standard' },
  { id: 'verse', name: 'Verse', description: 'Poetic and expressive', type: 'neural' },
]

export const defaultSampleText = "Hello! I'm an Azure OpenAI text-to-speech voice. This is how I sound when reading your text."
