import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wand2, Upload, Image } from 'lucide-react'

export default function EditPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          Edit Images with AI
        </h1>
        <p className="text-muted-foreground">
          Transform and enhance your images using advanced AI editing tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Upload className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Background Removal</CardTitle>
            <CardDescription>
              Remove backgrounds from images with AI precision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Image className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Image-to-Image</CardTitle>
            <CardDescription>
              Transform images using AI with guided editing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Wand2 className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Style Transfer</CardTitle>
            <CardDescription>
              Apply artistic styles and effects to your images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}