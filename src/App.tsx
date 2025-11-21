import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Gear, Info } from '@phosphor-icons/react'
import { CredentialsForm } from '@/components/CredentialsForm'
import { VoiceTester } from '@/components/VoiceTester'
import { Toaster } from '@/components/ui/sonner'
import type { AzureConfig } from '@/types/azure'
import { validateAzureConfig } from '@/types/azure'

function App() {
  const [config, setConfig] = useKV<Partial<AzureConfig>>('azure-config', {})
  const [activeTab, setActiveTab] = useState<'test' | 'settings'>('test')
  const [isConfigValid, setIsConfigValid] = useState(false)

  useEffect(() => {
    const errors = validateAzureConfig(config || {})
    setIsConfigValid(errors.length === 0)
    
    if (errors.length > 0 && activeTab === 'test') {
      setActiveTab('settings')
    }
  }, [config, activeTab])

  const handleConfigChange = (newConfig: AzureConfig) => {
    setConfig(newConfig)
    setActiveTab('test')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TTS Gallery - Azure OpenAI Voice Sampler
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Preview and compare all 23 Azure OpenAI text-to-speech voices
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            Test gpt-4o-mini-tts voices: Alloy, Echo, Fable, Nova, Onyx, Shimmer + 15 Neural voices + 2 HD voices
          </p>
          <a 
            href="https://tts.gallery" 
            className="text-sm text-primary hover:text-accent transition-colors inline-block font-medium"
          >
            tts.gallery
          </a>
        </header>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'test' | 'settings')} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="test" disabled={!isConfigValid}>
              Voice Testing
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Gear className="mr-2" size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="test" className="space-y-6">
            {isConfigValid ? (
              <>
                <Alert className="border-primary/20 bg-primary/5">
                  <Info className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-primary">How to Use Azure OpenAI TTS Voice Sampler</AlertTitle>
                  <AlertDescription>
                    Select any of the 23 Azure OpenAI voices from the dropdown, enter or edit your sample text, and click "Speak" to preview the voice. 
                    Use "Play All Voices" to compare all standard, neural, and HD voices sequentially with the same text.
                  </AlertDescription>
                </Alert>
                
                <VoiceTester config={config as AzureConfig} />
              </>
            ) : (
              <Alert variant="destructive">
                <AlertDescription>
                  Please configure your Azure OpenAI credentials (endpoint, API key, and gpt-4o-mini-tts deployment) in the Settings tab before testing voices.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Alert className="border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary">Privacy & Security</AlertTitle>
              <AlertDescription>
                TTS Gallery runs entirely in your browser. Your credentials are encrypted and stored locally. 
                They are only sent to your Azure OpenAI endpoint - never to tts.gallery or any third-party servers.
              </AlertDescription>
            </Alert>

            <CredentialsForm
              config={config || {}}
              onConfigChange={handleConfigChange}
            />

            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <h3 className="font-semibold mb-2 text-sm">Example Configuration</h3>
              <div className="space-y-1 text-xs font-mono">
                <div><span className="text-muted-foreground">Endpoint:</span> https://your-resource.openai.azure.com</div>
                <div><span className="text-muted-foreground">Deployment:</span> gpt-4o-mini-tts</div>
                <div><span className="text-muted-foreground">API Version:</span> 2025-03-01-preview</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-sm text-muted-foreground border-t border-border pt-6">
          <h2 className="mb-3 font-semibold text-foreground text-base">
            Complete Azure OpenAI TTS Voice Library - All 23 Voices
          </h2>
          <p className="text-xs leading-relaxed max-w-3xl mx-auto mb-4">
            <strong>Standard Voices (6):</strong> Alloy (neutral, balanced), Echo (resonant, clear), Fable (expressive, warm), Nova (bright, energetic), Onyx (deep, authoritative), Shimmer (bright, cheerful)
            {' • '}
            <strong>Neural Voices (15):</strong> Ash, Ballad, Brook, Cedar, Clover, Coral, Dan, Elan, Jazz, Marin, Marilyn, Meadow, Rio, Sage, Verse
            {' • '}
            <strong>HD Voices (2):</strong> Jade Hardy (confident, strong), Megan Wetherall (professional, polished)
          </p>
          <p className="text-xs mb-4 max-w-2xl mx-auto leading-relaxed">
            Free and open-source Azure OpenAI text-to-speech voice preview tool. 
            Test gpt-4o-mini-tts API with custom text for narration, customer support, tutorials, and more. 
            Compare voice quality across standard, neural, and HD models.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs flex-wrap">
            <a 
              href="https://github.com/kiarashplusplus/ttsgallery" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Open Source on GitHub
            </a>
            <span>•</span>
            <a 
              href="https://opensource.org/licenses/MIT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              MIT License
            </a>
            <span>•</span>
            <span>Privacy-Focused</span>
            <span>•</span>
            <span>No Data Collection</span>
            <span>•</span>
            <span>Local Credential Storage</span>
          </div>
          <p className="mt-4 text-xs">
            Not affiliated with Microsoft or Azure • Created by <a href="https://github.com/kiarashplusplus" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Kiarash Adl</a>
          </p>
          <p className="mt-2 text-xs">
            Have ideas to improve this tool? <a href="https://github.com/kiarashplusplus/ttsgallery/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Share your feedback on GitHub</a>
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            Keywords: Azure OpenAI TTS, gpt-4o-mini-tts demo, OpenAI voices comparison, text-to-speech preview, 
            TTS voice sampler, Azure speech synthesis, neural TTS voices, HD voice quality
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App