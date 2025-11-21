import type { AzureConfig, TTSRequest, TTSResponse } from '@/types/azure'

export class AzureTTSService {
  private config: AzureConfig

  constructor(config: AzureConfig) {
    this.config = config
  }

  async generateSpeech(request: TTSRequest): Promise<TTSResponse> {
    const { voice, text, speed = 1.0 } = request
    
    const endpoint = this.config.endpoint.endsWith('/') 
      ? this.config.endpoint.slice(0, -1) 
      : this.config.endpoint

    const url = `${endpoint}/openai/deployments/${this.config.deployment}/audio/speech?api-version=${this.config.apiVersion}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.config.apiKey,
        },
        body: JSON.stringify({
          model: this.config.deployment,
          input: text,
          voice: voice,
          speed: speed,
          response_format: 'mp3',
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `Azure API error: ${response.status}`
        
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.error?.message || errorMessage
        } catch {
          errorMessage = errorText || errorMessage
        }

        return {
          audioUrl: '',
          error: errorMessage,
        }
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      return {
        audioUrl,
      }
    } catch (error) {
      return {
        audioUrl: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  updateConfig(config: AzureConfig) {
    this.config = config
  }
}
