'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { AI_MODELS, IMAGE_SIZES } from '@/constants/models'
import { Sparkles, Download, Heart, Share2, Settings, Wand2 } from 'lucide-react'
import Image from 'next/image'

const generationSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  negativePrompt: z.string().optional(),
  model: z.string(),
  imageSize: z.string(),
  steps: z.number().min(10).max(50),
  guidance: z.number().min(1).max(20),
  seed: z.number().optional(),
})

type GenerationForm = z.infer<typeof generationSchema>

export function GenerationForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const form = useForm<GenerationForm>({
    resolver: zodResolver(generationSchema),
    defaultValues: {
      model: 'fal-ai/flux/dev',
      imageSize: 'landscape_4_3',
      steps: 28,
      guidance: 3.5,
    },
  })

  const onSubmit = async (data: GenerationForm) => {
    setIsGenerating(true)
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock generated images
      const mockImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=512&fit=crop',
        'https://images.unsplash.com/photo-1497436072909-f5e4be217605?w=512&h=512&fit=crop',
      ]
      setGeneratedImages(mockImages)
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const selectedModel = AI_MODELS[form.watch('model') as keyof typeof AI_MODELS]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand2 className="mr-2 h-5 w-5" />
            Generate Image
          </CardTitle>
          <CardDescription>
            Describe what you want to create and let AI bring it to life
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Prompt */}
            <div>
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="A serene mountain landscape at sunset, photorealistic, high detail..."
                className="min-h-[100px] resize-none"
                {...form.register('prompt')}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{form.watch('prompt')?.length || 0} characters</span>
                {form.formState.errors.prompt && (
                  <span className="text-destructive">{form.formState.errors.prompt.message}</span>
                )}
              </div>
            </div>

            {/* Model & Size Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>AI Model</Label>
                <Select value={form.watch('model')} onValueChange={(value) => form.setValue('model', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AI_MODELS).map(([key, model]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center justify-between w-full">
                          <span>{model.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {model.creditCost} credit{model.creditCost !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedModel && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedModel.description}
                  </p>
                )}
              </div>

              <div>
                <Label>Image Size</Label>
                <Select value={form.watch('imageSize')} onValueChange={(value) => form.setValue('imageSize', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {IMAGE_SIZES.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        <div className="flex flex-col">
                          <span>{size.label}</span>
                          <span className="text-xs text-muted-foreground">{size.aspect}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="p-0 h-auto font-normal"
              >
                <Settings className="mr-2 h-4 w-4" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              </Button>

              {showAdvanced && (
                <div className="mt-4 space-y-4 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="negativePrompt">Negative Prompt (Optional)</Label>
                    <Textarea
                      id="negativePrompt"
                      placeholder="blurry, low quality, distorted..."
                      className="min-h-[60px]"
                      {...form.register('negativePrompt')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Steps: {form.watch('steps')}</Label>
                      <Slider
                        value={[form.watch('steps')]}
                        onValueChange={([value]) => form.setValue('steps', value)}
                        min={10}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        More steps = higher quality, slower generation
                      </p>
                    </div>

                    <div>
                      <Label>Guidance: {form.watch('guidance')}</Label>
                      <Slider
                        value={[form.watch('guidance')]}
                        onValueChange={([value]) => form.setValue('guidance', value)}
                        min={1}
                        max={20}
                        step={0.5}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        How closely to follow the prompt
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="seed">Seed (Optional)</Label>
                    <Input
                      id="seed"
                      type="number"
                      placeholder="Random seed..."
                      {...form.register('seed', { valueAsNumber: true })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use same seed for reproducible results
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Generate Button */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Cost: <Badge variant="secondary">{selectedModel?.creditCost || 1} Credit{(selectedModel?.creditCost || 1) !== 1 ? 's' : ''}</Badge>
              </div>
              <Button type="submit" disabled={isGenerating} size="lg">
                {isGenerating ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Generated Images */}
      {generatedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedImages.map((url, index) => (
                <div key={index} className="group relative">
                  <div className="aspect-square relative overflow-hidden rounded-lg border">
                    <Image
                      src={url}
                      alt={`Generated ${index + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}