'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wand2, Upload, Image, Scissors, Palette, Zap } from 'lucide-react'

const EDIT_TOOLS = [
  {
    id: 'background-removal',
    title: 'Background Removal',
    description: 'Remove backgrounds from images with AI precision',
    icon: <Scissors className="h-8 w-8" />,
    credits: '1 credit',
    badge: 'Popular',
    badgeVariant: 'default' as const,
    href: '/dashboard/edit/background-removal',
    gradient: 'from-red-500 to-pink-600',
    features: ['One-click removal', 'Edge refinement', 'Transparent output'],
    disabled: true
  },
  {
    id: 'image-to-image',
    title: 'Image-to-Image',
    description: 'Transform images using AI with guided editing',
    icon: <Image className="h-8 w-8" />,
    credits: '2 credits',
    badge: 'Advanced',
    badgeVariant: 'secondary' as const,
    href: '/dashboard/edit/image-to-image',
    gradient: 'from-blue-500 to-cyan-600',
    features: ['Style transfer', 'Content aware', 'Multiple modes'],
    disabled: true
  },
  {
    id: 'style-transfer',
    title: 'Style Transfer',
    description: 'Apply artistic styles and effects to your images',
    icon: <Palette className="h-8 w-8" />,
    credits: '2 credits',
    badge: 'Artistic',
    badgeVariant: 'outline' as const,
    href: '/dashboard/edit/style-transfer',
    gradient: 'from-purple-500 to-indigo-600',
    features: ['Art styles', 'Custom filters', 'Blend modes'],
    disabled: true
  },
  {
    id: 'upscale',
    title: 'Image Upscale',
    description: 'Enhance and upscale your images with AI',
    icon: <Zap className="h-8 w-8" />,
    credits: '1 credit',
    badge: 'Fast',
    badgeVariant: 'default' as const,
    href: '/dashboard/edit/upscale',
    gradient: 'from-green-500 to-emerald-600',
    features: ['4K upscaling', 'Detail enhancement', 'Noise reduction'],
    disabled: true
  },
  {
    id: 'object-removal',
    title: 'Object Removal',
    description: 'Remove unwanted objects from your photos',
    icon: <Wand2 className="h-8 w-8" />,
    credits: '2 credits',
    badge: 'Smart',
    badgeVariant: 'secondary' as const,
    href: '/dashboard/edit/object-removal',
    gradient: 'from-orange-500 to-yellow-600',
    features: ['Smart inpainting', 'Context aware', 'Multiple objects'],
    disabled: true
  },
  {
    id: 'face-enhance',
    title: 'Face Enhancement',
    description: 'Enhance portraits and facial features',
    icon: <Upload className="h-8 w-8" />,
    credits: '2 credits',
    badge: 'Coming Soon',
    badgeVariant: 'outline' as const,
    href: '#',
    gradient: 'from-gray-500 to-gray-600',
    features: ['Portrait mode', 'Skin smoothing', 'Feature enhancement'],
    disabled: true
  }
]

export default function EditPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
          <Wand2 className="h-8 w-8 text-green-500" />
          <h1 className="text-4xl font-bold">Edit with AI</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform and enhance your images using advanced AI editing tools and techniques
        </p>
      </div>

      {/* Edit Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDIT_TOOLS.map((tool) => (
          <Card
            key={tool.id}
            className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${
              tool.disabled 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:border-primary/50 hover:scale-105 cursor-pointer'
            }`}
          >
            {tool.disabled ? (
              <div className="p-6">
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {/* Icon and Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.gradient} text-white`}>
                        {tool.icon}
                      </div>
                      {tool.badge && (
                        <Badge variant={tool.badgeVariant}>{tool.badge}</Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{tool.title}</h3>
                      <p className="text-muted-foreground text-sm">{tool.description}</p>
                    </div>

                    {/* Credits */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{tool.credits}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-muted-foreground">
                          <div className="h-1 w-1 bg-muted-foreground rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            ) : (
              <Link href={tool.href}>
                <div className="p-6 h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="space-y-4 flex-1">
                      {/* Icon and Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.gradient} text-white transition-transform group-hover:scale-110`}>
                          {tool.icon}
                        </div>
                        {tool.badge && (
                          <Badge variant={tool.badgeVariant}>{tool.badge}</Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{tool.description}</p>
                      </div>

                      {/* Credits */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{tool.credits}</span>
                      </div>

                      {/* Features */}
                      <div className="space-y-1">
                        {tool.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-muted-foreground">
                            <div className="h-1 w-1 bg-muted-foreground rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="text-center text-sm font-medium text-primary">
                        Click to start →
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Link>
            )}
          </Card>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Perfect your images with professional-grade AI editing tools.
        </p>
        <p className="text-xs text-muted-foreground">
          All tools are coming soon. Background removal and upscaling will be available first.
        </p>
      </div>
    </div>
  )
}