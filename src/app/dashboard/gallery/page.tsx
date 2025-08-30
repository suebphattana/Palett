import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ImageGrid } from '@/components/gallery/image-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Images, Image as ImageIcon } from 'lucide-react'

export default async function GalleryPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return <div>Please sign in to view your gallery</div>
  }

  // Fetch user's images
  const images = await prisma.generatedImage.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50, // Limit to recent 50 images
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Images className="mr-3 h-8 w-8" />
            Your Gallery
          </h1>
          <p className="text-muted-foreground">
            Browse and manage your AI-generated images
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {images.length} image{images.length !== 1 ? 's' : ''}
        </div>
      </div>

      {images.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <ImageIcon className="mr-2 h-6 w-6" />
              No Images Yet
            </CardTitle>
            <CardDescription>
              Your generated images will appear here. Start by creating your first image!
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ImageGrid images={images} />
      )}
    </div>
  )
}