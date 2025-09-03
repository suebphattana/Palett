import { TextToVideoForm } from '@/components/video-generation/text-to-video-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, ArrowLeft, Lightbulb } from 'lucide-react'
import Link from 'next/link'

export default function TextToVideoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/generate">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hub
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center">
            <Video className="h-8 w-8 mr-3 text-pink-500" />
            Text to Video
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate stunning videos from text descriptions using cutting-edge AI models
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generation Form */}
        <div className="lg:col-span-2">
          <TextToVideoForm />
        </div>

        {/* Tips & Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Lightbulb className="mr-2 h-5 w-5" />
                Video Generation Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Be descriptive:</strong> Include camera movements like "camera slowly zooms in"
              </div>
              <div>
                <strong>Set the scene:</strong> Describe lighting, weather, and environment details
              </div>
              <div>
                <strong>Specify actions:</strong> "person walking", "leaves rustling", "water flowing"
              </div>
              <div>
                <strong>Add style:</strong> "cinematic", "documentary style", "anime", "realistic"
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Comparison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-2">
                <div className="font-medium flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  MiniMax Hailuo (3 credits)
                </div>
                <p className="text-muted-foreground ml-5">Best quality, superior prompt following</p>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  Kling AI (4 credits)
                </div>
                <p className="text-muted-foreground ml-5">Longest videos up to 10s, cinematic quality</p>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  Luma Dream Machine (2 credits)
                </div>
                <p className="text-muted-foreground ml-5">Fastest generation, good for quick tests</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Example Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-2 bg-muted rounded">
                "A serene lake at sunset with gentle ripples, cinematic wide shot"
              </div>
              <div className="p-2 bg-muted rounded">
                "Person walking through a bustling city street, camera following from behind"
              </div>
              <div className="p-2 bg-muted rounded">
                "Close-up of coffee being poured into a cup, steam rising, warm lighting"
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}