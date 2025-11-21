export interface AzureConfig {
  endpoint: string
  apiKey: string
  deployment: string
  apiVersion: string
}

export interface TTSRequest {
  voice: string
  text: string
  speed?: number
}

export interface TTSResponse {
  audioUrl: string
  error?: string
}

export const validateAzureConfig = (config: Partial<AzureConfig>): string[] => {
  const errors: string[] = []
  
  if (!config.endpoint) {
    errors.push('Endpoint is required')
  } else if (!config.endpoint.startsWith('https://')) {
    errors.push('Endpoint must start with https://')
  }
  
  if (!config.apiKey) {
    errors.push('API Key is required')
  } else if (config.apiKey.length < 10) {
    errors.push('API Key appears to be invalid')
  }
  
  if (!config.deployment) {
    errors.push('Deployment name is required')
  }
  
  if (!config.apiVersion) {
    errors.push('API Version is required')
  }
  
  return errors
}
