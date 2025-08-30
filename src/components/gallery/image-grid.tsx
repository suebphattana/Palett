'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Heart, Download, Share2, Eye, Copy, Calendar } from 'lucide-react'
import { GeneratedImage } from '@prisma/client'
import { format } from 'date-fns'

interface ImageGridProps {
  images: GeneratedImage[]
}

export function ImageGrid({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="group cursor-pointer hover:shadow-lg transition-all">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={image.imageUrl}
                alt={image.prompt.slice(0, 50) + '...'}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                onClick={() => handleImageClick(image)}
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleImageClick(image)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>

              {/* Model Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-xs">
                  {image.model.includes('flux') ? 'FLUX' : 
                   image.model.includes('imagen') ? 'Imagen 4' : 
                   'AI Model'}
                </Badge>
              </div>
            </div>

            <CardContent className="p-3">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {image.prompt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(image.createdAt), 'MMM d, yyyy')}
                </span>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Heart className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Generated Image</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Image */}
                <div className="relative aspect-square max-w-2xl mx-auto rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.prompt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Prompt</h3>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">{selectedImage.prompt}</p>
                    </div>
                  </div>

                  {selectedImage.negativePrompt && (
                    <div>
                      <h3 className="font-semibold mb-2">Negative Prompt</h3>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">{selectedImage.negativePrompt}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Model</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedImage.model.includes('flux') ? 'FLUX Dev' : 
                         selectedImage.model.includes('imagen') ? 'Imagen 4' : 
                         selectedImage.model}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Size</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedImage.width} × {selectedImage.height}
                      </p>
                    </div>
                    {selectedImage.steps && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">Steps</h4>
                        <p className="text-sm text-muted-foreground">{selectedImage.steps}</p>
                      </div>
                    )}
                    {selectedImage.guidance && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">Guidance</h4>
                        <p className="text-sm text-muted-foreground">{selectedImage.guidance}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-1">Created</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(selectedImage.createdAt), 'MMMM d, yyyy \'at\' h:mm a')}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}