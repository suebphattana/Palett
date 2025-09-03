import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, ArrowLeft, Upload } from 'lucide-react'
import Link from 'next/link'

export default function ImageEditPage() {
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
            <Edit className="h-8 w-8 mr-3 text-green-500" />
            Image Edit
          </h1>
          <p className="text-muted-foreground mt-1">
            Edit and enhance images with Qwen AI - the best image editing model
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coming Soon Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                AI Image Editing with Qwen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12 space-y-4">
                <Edit className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">Launching Soon!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Our advanced image editing powered by Qwen AI is almost ready. 
                  Edit text, objects, and scenes with simple text commands.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🖼️ Upload any image</p>
                  <p>✏️ Describe your edits in text</p>
                  <p>🎯 Precise object manipulation</p>
                  <p>📝 Best-in-class text editing</p>
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
              <CardTitle className="text-lg">Qwen AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Text Editing:</strong> Add, remove, or modify text in images perfectly
              </div>
              <div>
                <strong>Object Manipulation:</strong> Remove, add, or change objects naturally
              </div>
              <div>
                <strong>Style Changes:</strong> Transform artistic styles and appearances
              </div>
              <div>
                <strong>Smart Shadows:</strong> Automatically adjusts lighting and shadows
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2 Credits</div>
              <p className="text-sm text-muted-foreground">
                Per image edit with Qwen AI
              </p>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  More affordable than Adobe Photoshop subscriptions!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Example Edits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-2 bg-muted rounded">
                "Remove the person from the background"
              </div>
              <div className="p-2 bg-muted rounded">
                "Change the text to say 'Hello World'"
              </div>
              <div className="p-2 bg-muted rounded">
                "Make the sky more dramatic and stormy"
              </div>
              <div className="p-2 bg-muted rounded">
                "Add a red car parked on the street"
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}