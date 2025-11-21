import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Key, CheckCircle, Warning } from '@phosphor-icons/react'
import type { AzureConfig } from '@/types/azure'
import { validateAzureConfig } from '@/types/azure'

interface CredentialsFormProps {
  config: Partial<AzureConfig>
  onConfigChange: (config: AzureConfig) => void
  onCancel?: () => void
}

export function CredentialsForm({ config, onConfigChange, onCancel }: CredentialsFormProps) {
  const [formData, setFormData] = useState<Partial<AzureConfig>>(config)
  const [errors, setErrors] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateAzureConfig(formData)
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setShowSuccess(false)
      return
    }

    setErrors([])
    setShowSuccess(true)
    onConfigChange(formData as AzureConfig)
    
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleChange = (field: keyof AzureConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    setErrors([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="text-primary" size={24} />
          Azure OpenAI Configuration
        </CardTitle>
        <CardDescription>
          Enter your Azure OpenAI credentials to enable voice testing. Your credentials are stored locally and never sent to any server except Azure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="endpoint">Endpoint URL</Label>
            <Input
              id="endpoint"
              type="url"
              placeholder="https://your-resource.openai.azure.com"
              value={formData.endpoint || ''}
              onChange={handleChange('endpoint')}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Your Azure OpenAI API key"
              value={formData.apiKey || ''}
              onChange={handleChange('apiKey')}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="deployment">Deployment Name</Label>
            <Input
              id="deployment"
              type="text"
              placeholder="gpt-4o-mini-tts"
              value={formData.deployment || ''}
              onChange={handleChange('deployment')}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="apiVersion">API Version</Label>
            <Input
              id="apiVersion"
              type="text"
              placeholder="2024-02-15-preview"
              value={formData.apiVersion || ''}
              onChange={handleChange('apiVersion')}
              className="font-mono text-sm"
            />
          </div>

          {errors.length > 0 && (
            <Alert variant="destructive">
              <Warning className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {showSuccess && (
            <Alert className="border-green-500 bg-green-50 text-green-900">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Configuration saved successfully!
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 mt-2">
            <Button type="submit" className="flex-1">
              Save Configuration
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
