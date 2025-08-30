import { GenerationForm } from '@/components/image-generation/generation-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export default function GeneratePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          Generate Images with AI
        </h1>
        <p className="text-muted-foreground">
          Transform your ideas into stunning visuals using advanced AI models
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generation Form */}
        <div className="lg:col-span-2">
          <GenerationForm />
        </div>

        {/* Tips & Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Be specific:</strong> Include details like lighting, style, and composition
              </div>
              <div>
                <strong>Use styles:</strong> Try "photorealistic", "digital art", or "watercolor"
              </div>
              <div>
                <strong>Add quality terms:</strong> "high quality", "detailed", "professional"
              </div>
              <div>
                <strong>Negative prompts:</strong> Exclude unwanted elements like "blurry", "low quality"
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Example Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-2 bg-muted rounded">
                "A serene mountain landscape at sunset, photorealistic, high detail"
              </div>
              <div className="p-2 bg-muted rounded">
                "Portrait of a wise old wizard, digital art style, detailed"
              </div>
              <div className="p-2 bg-muted rounded">
                "Modern minimalist living room, bright lighting, architectural"
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}