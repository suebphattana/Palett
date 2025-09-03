'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Play, AlertCircle, CheckCircle } from 'lucide-react'
import { ModelSelector } from './model-selector'
import { VIDEO_MODELS } from '@/lib/fal'

const videoGenerationSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  model: z.string().min(1, 'Please select a model'),
  duration: z.number().min(3).max(10),
  aspectRatio: z.string(),
  steps: z.number().min(20).max(50)
})

type VideoGenerationForm = z.infer<typeof videoGenerationSchema>

interface GeneratedVideo {
  id: string
  url: string
  thumbnail?: string
  duration: number
  aspectRatio: string
}

export function TextToVideoForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<GeneratedVideo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  const form = useForm<VideoGenerationForm>({
    resolver: zodResolver(videoGenerationSchema),
    defaultValues: {
      prompt: '',
      model: '',
      duration: 5,
      aspectRatio: '16:9',
      steps: 30
    }
  })

  // Update form model when model selector changes
  const handleModelSelect = (model: string) => {
    setSelectedModel(model)
    form.setValue('model', model)
    form.clearErrors('model')
  }

  const onSubmit = async (data: VideoGenerationForm) => {
    if (!selectedModel) {
      setError('Please select a model')
      return
    }

    setIsGenerating(true)
    setError(null)
    setGeneratedVideo(null)

    try {
      const response = await fetch('/api/generate/text-to-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: data.prompt,
          model: selectedModel,
          duration: data.duration,
          aspectRatio: data.aspectRatio,
          steps: data.steps
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Video generation failed')
      }

      if (result.success && result.video) {
        setGeneratedVideo(result.video)
      } else {
        throw new Error(result.error || 'No video returned')
      }

    } catch (err) {
      console.error('Video generation error:', err)
      setError(err instanceof Error ? err.message : 'Video generation failed')
    } finally {
      setIsGenerating(false)
    }
  }

  const maxDuration = selectedModel 
    ? VIDEO_MODELS[selectedModel as keyof typeof VIDEO_MODELS]?.maxDuration || 10
    : 10

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Choose AI Model</CardTitle>
        </CardHeader>
        <CardContent>
          <ModelSelector
            selectedModel={selectedModel}
            onModelSelect={handleModelSelect}
          />
        </CardContent>
      </Card>

      {/* Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Step 2: Video Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Prompt */}
            <div className="space-y-2">
              <Label htmlFor="prompt">Video Description *</Label>
              <Textarea
                id="prompt"
                placeholder="Describe the video you want to create... Be specific about actions, settings, and style"
                className="min-h-[100px]"
                {...form.register('prompt')}
              />
              {form.formState.errors.prompt && (
                <p className="text-sm text-destructive">{form.formState.errors.prompt.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Duration */}
              <div className="space-y-3">
                <Label>Duration: {form.watch('duration')}s</Label>
                <Slider
                  value={[form.watch('duration')]}
                  onValueChange={(value) => form.setValue('duration', value[0])}
                  max={maxDuration}
                  min={3}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Max {maxDuration}s with {selectedModel || 'selected model'}
                </p>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <Select
                  value={form.watch('aspectRatio')}
                  onValueChange={(value) => form.setValue('aspectRatio', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                    <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                    <SelectItem value="1:1">1:1 (Square)</SelectItem>
                    <SelectItem value="4:3">4:3 (Classic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <Label>Quality: {form.watch('steps')} steps</Label>
                <Slider
                  value={[form.watch('steps')]}
                  onValueChange={(value) => form.setValue('steps', value[0])}
                  max={50}
                  min={20}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher = better quality, longer generation
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isGenerating || !selectedModel}
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Video... (This may take 1-3 minutes)
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Generate Video
                  {selectedModel && (
                    <span className="ml-2 text-sm opacity-75">
                      ({VIDEO_MODELS[selectedModel as keyof typeof VIDEO_MODELS]?.credits} credits)
                    </span>
                  )}
                </>
              )}
            </Button>

            {form.formState.errors.model && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{form.formState.errors.model.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Generated Video */}
      {generatedVideo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              Video Generated Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <video
                src={generatedVideo.url}
                poster={generatedVideo.thumbnail}
                controls
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                style={{ aspectRatio: generatedVideo.aspectRatio.replace(':', '/') }}
              >
                Your browser does not support the video tag.
              </video>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Duration: {generatedVideo.duration}s • Aspect Ratio: {generatedVideo.aspectRatio}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" asChild>
                    <a href={generatedVideo.url} download>
                      Download Video
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}