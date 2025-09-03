import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Film, ArrowLeft, Upload } from 'lucide-react'
import Link from 'next/link'

export default function ImageToVideoPage() {
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
            <Film className="h-8 w-8 mr-3 text-orange-500" />
            Image to Video
          </h1>
          <p className="text-muted-foreground mt-1">
            Animate your images into stunning videos with AI
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coming Soon Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                Image to Video Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12 space-y-4">
                <Film className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">Coming Very Soon!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're putting the finishing touches on our image-to-video feature. 
                  Upload an image and watch it come to life with AI animation.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🎬 Upload any image</p>
                  <p>✨ Add motion prompts</p>
                  <p>🚀 Generate with Hailuo, Kling, Luma, or WanDB</p>
                </div>
                <Button disabled className="mt-4">
                  Upload Image (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Coming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Smart Animation:</strong> AI analyzes your image to create natural movement
              </div>
              <div>
                <strong>Motion Control:</strong> Specify camera movements and object animations
              </div>
              <div>
                <strong>Multiple Models:</strong> Choose between Hailuo, Kling, Luma, and WanDB for different styles
              </div>
              <div>
                <strong>High Quality:</strong> Generate up to 1080p animated videos
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expected Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Luma Dream Machine:</span>
                <span className="font-medium">3 credits</span>
              </div>
              <div className="flex justify-between">
                <span>MiniMax Hailuo:</span>
                <span className="font-medium">4 credits</span>
              </div>
              <div className="flex justify-between">
                <span>WanDB Image-to-Video:</span>
                <span className="font-medium">4 credits</span>
              </div>
              <div className="flex justify-between">
                <span>Kling AI:</span>
                <span className="font-medium">5 credits</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Try Text-to-Video</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                While you wait, try our text-to-video generation!
              </p>
              <Link href="/dashboard/generate/text-to-video">
                <Button className="w-full" size="sm">
                  Generate Video from Text
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}