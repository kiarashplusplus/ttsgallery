import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Play, Pause, ListChecks, SpeakerHigh, Warning, CheckCircle } from '@phosphor-icons/react'
import { defaultVoices, defaultSampleText, type Voice } from '@/data/voices'
import { AzureTTSService } from '@/lib/azure-tts'
import type { AzureConfig } from '@/types/azure'
import { toast } from 'sonner'

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
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number>(-1)
  const [playAllProgress, setPlayAllProgress] = useState(0)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const ttsService = useRef(new AzureTTSService(config))

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
        if (audioRef.current) {
          audioRef.current.play()
        }
      }, 100)
    }
  }

  const handlePlayAll = async () => {
    if (isPlayingAll) {
      setIsPlayingAll(false)
      setCurrentPlayingIndex(-1)
      setPlayAllProgress(0)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      return
    }

    setIsPlayingAll(true)
    setCurrentPlayingIndex(0)
    setPlayAllProgress(0)

    for (let i = 0; i < defaultVoices.length; i++) {
      if (!isPlayingAll && i > 0) break
      
      setCurrentPlayingIndex(i)
      setPlayAllProgress((i / defaultVoices.length) * 100)
      
      await handleGenerateSpeech(defaultVoices[i].id)
      
      if (audioRef.current) {
        await new Promise<void>((resolve) => {
          const audio = audioRef.current!
          
          const onEnded = () => {
            audio.removeEventListener('ended', onEnded)
            resolve()
          }
          
          const onError = () => {
            audio.removeEventListener('error', onError)
            resolve()
          }
          
          audio.addEventListener('ended', onEnded)
          audio.addEventListener('error', onError)
        })
      }
      
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setIsPlayingAll(false)
    setCurrentPlayingIndex(-1)
    setPlayAllProgress(100)
    toast.success('Completed playing all voices!')
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
                  className={currentPlayingIndex >= 0 && defaultVoices[currentPlayingIndex].id === voice.id ? 'bg-accent/20' : ''}
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

        {isPlayingAll && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Playing: {defaultVoices[currentPlayingIndex]?.name}
              </span>
              <span className="text-muted-foreground">
                {currentPlayingIndex + 1} / {defaultVoices.length}
              </span>
            </div>
            <Progress value={playAllProgress} className="h-2" />
          </div>
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

          <Button
            onClick={handlePlayAll}
            disabled={isGenerating || !sampleText.trim()}
            variant={isPlayingAll ? 'destructive' : 'secondary'}
            className="flex-1"
          >
            {isPlayingAll ? (
              <>
                <Pause className="mr-2" size={18} />
                Stop All
              </>
            ) : (
              <>
                <ListChecks className="mr-2" size={18} />
                Play All Voices
              </>
            )}
          </Button>
        </div>

        {audioUrl && (
          <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Audio Player</Label>
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="w-full"
            />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4 bg-muted/30 rounded-lg max-h-48 overflow-y-auto">
          {defaultVoices.map((voice, index) => (
            <button
              key={voice.id}
              onClick={() => setSelectedVoice(voice.id)}
              className={`
                text-xs p-2 rounded border transition-all text-left
                ${selectedVoice === voice.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:border-primary/50'}
                ${currentPlayingIndex === index ? 'ring-2 ring-accent animate-pulse' : ''}
              `}
            >
              <div className="font-medium">{voice.name}</div>
              <Badge variant="outline" className={`text-[10px] mt-1 ${getVoiceTypeColor(voice.type)}`}>
                {voice.type}
              </Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
