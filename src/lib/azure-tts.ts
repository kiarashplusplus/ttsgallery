import type { AzureConfig, TTSRequest, TTSResponse } from '@/types/azure'

// Constants
const MAX_ERROR_TEXT_LENGTH = 200

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
        let errorMessage = `Azure API error (${response.status} ${response.statusText})`
        
        try {
          const errorJson = JSON.parse(errorText)
          if (errorJson.error?.message) {
            errorMessage = `${errorMessage}: ${errorJson.error.message}`
          } else if (errorJson.message) {
            errorMessage = `${errorMessage}: ${errorJson.message}`
          }
        } catch {
          if (errorText) {
            // Truncate at word boundary and add ellipsis if text is too long
            if (errorText.length > MAX_ERROR_TEXT_LENGTH) {
              const truncated = errorText.substring(0, MAX_ERROR_TEXT_LENGTH)
              const lastSpace = truncated.lastIndexOf(' ')
              const finalText = lastSpace > 0
                ? truncated.substring(0, lastSpace) + '...'
                : truncated + '...'
              errorMessage = `${errorMessage}: ${finalText}`
            } else {
              errorMessage = `${errorMessage}: ${errorText}`
            }
          }
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
      let errorMessage = 'Unknown error occurred'
      
      if (error instanceof Error) {
        errorMessage = error.message
        // Add more context for common network errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage = 'Network error: Unable to connect to Azure API'
        } else if (error.name === 'AbortError') {
          errorMessage = 'Request was aborted or timed out'
        }
      }
      
      return {
        audioUrl: '',
        error: errorMessage,
      }
    }
  }

  updateConfig(config: AzureConfig) {
    this.config = config
  }
}
