import { useState, useRef, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Play, Pause, ListChecks, SpeakerHigh, Warning, CheckCircle } from '@phosphor-icons/react'
import { defaultVoices, defaultSampleText, playAllPresetText, type Voice } from '@/data/voices'
import { AzureTTSService } from '@/lib/azure-tts'
import type { AzureConfig } from '@/types/azure'
import { toast } from 'sonner'

// Constants
const TOTAL_PHASES = 2 // Generation + Playback
const AUDIO_LOAD_TIMEOUT = 10000 // 10 seconds

interface VoiceTesterProps {
  config: AzureConfig
}

export function VoiceTester({ config }: VoiceTesterProps) {
  const [selectedVoice, setSelectedVoice] = useState<string>(defaultVoices[0].id)
  const [sampleText, setSampleText] = useState(defaultSampleText)
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isPlayingAll, setIsPlayingAll] = useState(false)
  const [currentPlayingVoiceId, setCurrentPlayingVoiceId] = useState<string>('')
  const [generatingVoiceId, setGeneratingVoiceId] = useState<string>('')
  const [playAllProgress, setPlayAllProgress] = useState(0)
  const [playMode, setPlayMode] = useState<'all' | 'top' | 'hd'>('all')
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false)
  const [generatedAudios, setGeneratedAudios] = useState<Map<string, string>>(new Map())
  const [customPresetText, setCustomPresetText] = useState(playAllPresetText)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const visibleAudioRef = useRef<HTMLAudioElement>(null)
  const ttsService = useRef(new AzureTTSService(config))
  const cancelPlaybackRef = useRef(false)

  const topVoices = useMemo(() => defaultVoices.filter(v => v.isTop), [])
  const hdVoices = useMemo(() => defaultVoices.filter(v => v.type === 'hd'), [])
  const voicesToPlay = useMemo(() => {
    if (playMode === 'all') return defaultVoices
    if (playMode === 'hd') return hdVoices
    return topVoices
  }, [playMode, topVoices, hdVoices])
  const voiceCount = voicesToPlay.length

  useEffect(() => {
    ttsService.current.updateConfig(config)
  }, [config])

  const handleGenerateSpeech = async (voiceId: string) => {
    if (!sampleText.trim()) {
      setError('Please enter some text to speak')
      return
    }

    setIsGenerating(true)
    setError('')

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl('')
    }

    const result = await ttsService.current.generateSpeech({
      voice: voiceId,
      text: sampleText,
    })

    setIsGenerating(false)

    if (result.error) {
      setError(result.error)
      toast.error(result.error)
    } else {
      setAudioUrl(result.audioUrl)
      toast.success(`Generated speech for ${defaultVoices.find(v => v.id === voiceId)?.name}`)
      
      setTimeout(() => {
        if (visibleAudioRef.current) {
          visibleAudioRef.current.play()
        }
      }, 100)
    }
  }

  const handlePlayAll = async () => {
    if (isPlayingAll) {
      cancelPlaybackRef.current = true
      setIsPlayingAll(false)
      setCurrentPlayingVoiceId('')
      setGeneratingVoiceId('')
      setPlayAllProgress(0)
      setIsGeneratingBatch(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      return
    }

    cancelPlaybackRef.current = false
    const voiceList = voicesToPlay

    // Phase 1: Batch generate all audio files
    setIsGeneratingBatch(true)
    setIsPlayingAll(true)
    setPlayAllProgress(0)
    const audioMap = new Map<string, string>()

    for (let i = 0; i < voiceList.length; i++) {
      if (cancelPlaybackRef.current) break
      
      setGeneratingVoiceId(voiceList[i].id)
      setPlayAllProgress((i / (voiceList.length * TOTAL_PHASES)) * 100)
      
      const result = await ttsService.current.generateSpeech({
        voice: voiceList[i].id,
        text: customPresetText,
      })

      if (result.error) {
        toast.error(`Failed to generate ${voiceList[i].name}: ${result.error}`)
      } else {
        audioMap.set(voiceList[i].id, result.audioUrl)
      }
    }

    setGeneratedAudios(audioMap)
    setIsGeneratingBatch(false)
    setGeneratingVoiceId('')

    // Check if cancelled during generation
    if (cancelPlaybackRef.current) {
      audioMap.forEach(url => URL.revokeObjectURL(url))
      setGeneratedAudios(new Map())
      setIsPlayingAll(false)
      setCurrentPlayingVoiceId('')
      setPlayAllProgress(0)
      return
    }

    // Phase 2: Play all generated audio files sequentially
    for (let i = 0; i < voiceList.length; i++) {
      if (cancelPlaybackRef.current) break
      
      setCurrentPlayingVoiceId(voiceList[i].id)
      setPlayAllProgress(((voiceList.length + i) / (voiceList.length * TOTAL_PHASES)) * 100)
      
      const audioUrl = audioMap.get(voiceList[i].id)
      if (!audioUrl) continue

      if (audioRef.current) {
        const audio = audioRef.current
        
        // Set src and wait for it to load before playing
        audio.src = audioUrl
        
        try {
          await new Promise<void>((resolveLoad, rejectLoad) => {
            let timeoutId!: NodeJS.Timeout
            
            const onCanPlay = () => {
              audio.removeEventListener('canplay', onCanPlay)
              audio.removeEventListener('error', onError)
              clearTimeout(timeoutId)
              resolveLoad()
            }
            
            const onError = () => {
              audio.removeEventListener('canplay', onCanPlay)
              audio.removeEventListener('error', onError)
              clearTimeout(timeoutId)
              rejectLoad(new Error('Failed to load audio'))
            }
            
            // Add listeners before calling load to avoid race condition
            audio.addEventListener('canplay', onCanPlay)
            audio.addEventListener('error', onError)
            audio.load()
            
            // Add timeout to prevent indefinite hanging
            timeoutId = setTimeout(() => {
              audio.removeEventListener('canplay', onCanPlay)
              audio.removeEventListener('error', onError)
              rejectLoad(new Error('Audio load timeout'))
            }, AUDIO_LOAD_TIMEOUT)
          })
          
          // Play and wait for completion
          try {
            await audio.play()
          } catch (playError) {
            console.error(`Failed to start playback for ${voiceList[i].name}:`, playError)
            throw playError // Re-throw to be caught by outer try-catch
          }
          
          await new Promise<void>((resolve) => {
            const onEnded = () => {
              audio.removeEventListener('ended', onEnded)
              audio.removeEventListener('error', onPlaybackError)
              resolve()
            }
            
            const onPlaybackError = (error: Event) => {
              audio.removeEventListener('ended', onEnded)
              audio.removeEventListener('error', onPlaybackError)
              console.error(`Audio playback error for ${voiceList[i].name}:`, error)
              resolve()
            }
            
            audio.addEventListener('ended', onEnded)
            audio.addEventListener('error', onPlaybackError)
          })
        } catch (error) {
          console.error(`Failed to play voice ${voiceList[i].name}:`, error)
          // Continue to next voice even if this one fails
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Cleanup generated audio URLs
    audioMap.forEach(url => URL.revokeObjectURL(url))
    setGeneratedAudios(new Map())
    
    setIsPlayingAll(false)
    setCurrentPlayingVoiceId('')
    setPlayAllProgress(100)
    if (!cancelPlaybackRef.current) {
      const modeText = playMode === 'all' ? 'all' : playMode === 'hd' ? 'HD' : 'top'
      toast.success(`Completed playing ${modeText} voices!`)
    }
  }

  const getVoiceTypeColor = (type: Voice['type']) => {
    switch (type) {
      case 'hd':
        return 'bg-accent text-accent-foreground'
      case 'neural':
        return 'bg-primary text-primary-foreground'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SpeakerHigh className="text-primary" size={24} />
          Voice Testing
        </CardTitle>
        <CardDescription>
          Select a voice and enter text to hear how it sounds, or play all voices sequentially.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Play All Section - Now at the top */}
        <div className="flex flex-col gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <Label className="text-sm font-medium mb-1 block">Batch Voice Comparison</Label>
              <p className="text-xs text-muted-foreground">
                Play {playMode === 'all' ? `all ${defaultVoices.length}` : playMode === 'hd' ? `${hdVoices.length} HD` : `top ${topVoices.length}`} voices sequentially with custom preset text
              </p>
            </div>
            <ToggleGroup 
              type="single" 
              value={playMode} 
              onValueChange={(value) => value && setPlayMode(value as 'all' | 'top' | 'hd')}
              className="shrink-0"
            >
              <ToggleGroupItem value="all" aria-label="Play all voices" className="px-3">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="top" aria-label="Play top voices" className="px-3">
                Top
              </ToggleGroupItem>
              <ToggleGroupItem value="hd" aria-label="Play HD voices" className="px-3">
                HD
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="preset-text" className="text-xs">Preset Text for Batch Comparison</Label>
            <Input
              id="preset-text"
              type="text"
              value={customPresetText}
              onChange={(e) => setCustomPresetText(e.target.value)}
              placeholder="Enter preset text..."
              disabled={isPlayingAll || isGeneratingBatch}
            />
          </div>

          {(isGeneratingBatch || (isPlayingAll && !isGeneratingBatch)) && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                {isGeneratingBatch ? (
                  <>
                    <span className="text-muted-foreground flex items-center gap-2">
                      <div className="animate-spin h-3 w-3 border-2 border-accent border-t-transparent rounded-full" />
                      Generating: {defaultVoices.find(v => v.id === generatingVoiceId)?.name}
                    </span>
                    <span className="text-muted-foreground">
                      {voicesToPlay.findIndex(v => v.id === generatingVoiceId) + 1} / {voiceCount}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Play className="animate-pulse" size={14} />
                      Playing: {defaultVoices.find(v => v.id === currentPlayingVoiceId)?.name}
                    </span>
                    <span className="text-muted-foreground">
                      {voicesToPlay.findIndex(v => v.id === currentPlayingVoiceId) + 1} / {voiceCount}
                    </span>
                  </>
                )}
              </div>
              <Progress value={playAllProgress} className="h-2" />
            </div>
          )}

          <Button
            onClick={handlePlayAll}
            disabled={isGenerating}
            variant={isPlayingAll ? 'destructive' : 'default'}
            className="w-full"
          >
            {isPlayingAll ? (
              <>
                <Pause className="mr-2" size={18} />
                Stop {isGeneratingBatch ? 'Generating' : 'Playback'}
              </>
            ) : (
              <>
                <ListChecks className="mr-2" size={18} />
                Play {playMode === 'all' ? 'All' : playMode === 'hd' ? 'HD' : 'Top'} Voices
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="voice-select">Voice</Label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger id="voice-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {defaultVoices.map((voice) => (
                <SelectItem 
                  key={voice.id} 
                  value={voice.id}
                  className={currentPlayingVoiceId === voice.id ? 'bg-accent/20' : ''}
                >
                  <div className="flex items-center gap-2">
                    <span>{voice.name}</span>
                    <Badge variant="outline" className={`text-xs ${getVoiceTypeColor(voice.type)}`}>
                      {voice.type}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {defaultVoices.find(v => v.id === selectedVoice)?.description}
          </p>
          {defaultVoices.find(v => v.id === selectedVoice)?.useCases && (
            <p className="text-xs text-muted-foreground/80 italic">
              Best for: {defaultVoices.find(v => v.id === selectedVoice)?.useCases}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sample-text">Sample Text</Label>
          <Textarea
            id="sample-text"
            placeholder="Enter text to convert to speech..."
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {sampleText.length} characters
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <Warning className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => handleGenerateSpeech(selectedVoice)}
            disabled={isGenerating || isPlayingAll || !sampleText.trim()}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                Generating...
              </>
            ) : (
              <>
                <Play className="mr-2" size={18} />
                Speak
              </>
            )}
          </Button>
        </div>

        {audioUrl && (
          <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Audio Player</Label>
            <audio
              ref={visibleAudioRef}
              src={audioUrl}
              controls
              className="w-full"
            />
          </div>
        )}

        {/* Hidden audio element for batch playback */}
        <audio ref={audioRef} className="hidden" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4 bg-muted/30 rounded-lg max-h-48 overflow-y-auto">
          {defaultVoices.map((voice) => {
            const isGeneratingVoice = isGeneratingBatch && generatingVoiceId === voice.id
            const isPlayingVoice = !isGeneratingBatch && currentPlayingVoiceId === voice.id && isPlayingAll
            
            return (
              <button
                key={voice.id}
                onClick={() => setSelectedVoice(voice.id)}
                className={`
                  text-xs p-2 rounded border transition-all text-left
                  ${selectedVoice === voice.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:border-primary/50'}
                  ${isGeneratingVoice ? 'ring-2 ring-orange-500 animate-pulse' : ''}
                  ${isPlayingVoice ? 'ring-2 ring-accent animate-pulse' : ''}
                `}
              >
                <div className="font-medium flex items-center gap-1">
                  {voice.name}
                  {isGeneratingVoice && (
                    <div className="animate-spin h-3 w-3 border-2 border-orange-500 border-t-transparent rounded-full" />
                  )}
                  {isPlayingVoice && (
                    <Play className="animate-pulse" size={12} />
                  )}
                </div>
                <Badge variant="outline" className={`text-[10px] mt-1 ${getVoiceTypeColor(voice.type)}`}>
                  {voice.type}
                </Badge>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
