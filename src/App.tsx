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
            Azure OpenAI TTS Voice Sampler
          </h1>
          <p className="text-muted-foreground text-lg">
            Preview and compare text-to-speech voices from your Azure OpenAI deployment
          </p>
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
                <Alert className="border-blue-200 bg-blue-50/50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-900">How to use</AlertTitle>
                  <AlertDescription className="text-blue-800">
                    Select a voice from the dropdown, enter or edit the sample text, and click "Speak" to hear the voice. 
                    Use "Play All Voices" to hear all voices sequentially with the same text.
                  </AlertDescription>
                </Alert>
                
                <VoiceTester config={config as AzureConfig} />
              </>
            ) : (
              <Alert variant="destructive">
                <AlertDescription>
                  Please configure your Azure OpenAI credentials in the Settings tab before testing voices.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50/50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-900">Privacy & Security</AlertTitle>
              <AlertDescription className="text-blue-800">
                Your credentials are stored locally in your browser using encrypted storage. 
                They are never sent to any server except your Azure OpenAI endpoint.
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
                <div><span className="text-muted-foreground">API Version:</span> 2024-02-15-preview</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-sm text-muted-foreground border-t border-border pt-6">
          <p>
            Built with Azure OpenAI • Supports 23 TTS voices including alloy, echo, nova, shimmer, and more
          </p>
          <p className="mt-2">
            Open source • Privacy-focused • No data collection
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App