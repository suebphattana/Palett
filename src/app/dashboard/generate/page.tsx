'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Video, Film, Edit, Zap, Crown } from 'lucide-react'

const AI_MODELS = [
  {
    id: 'text-to-image',
    title: 'Text to Image',
    description: 'Create stunning images from text descriptions',
    icon: <Sparkles className="h-8 w-8" />,
    credits: '1 credit',
    badge: 'Most Popular',
    badgeVariant: 'default' as const,
    href: '/dashboard/generate/text-to-image',
    gradient: 'from-blue-500 to-purple-600',
    features: ['FLUX, Imagen 4', 'High quality', 'Fast generation']
  },
  {
    id: 'text-to-video',
    title: 'Text to Video',
    description: 'Generate videos from text prompts',
    icon: <Video className="h-8 w-8" />,
    credits: '2-4 credits',
    badge: 'New',
    badgeVariant: 'secondary' as const,
    href: '/dashboard/generate/text-to-video',
    gradient: 'from-pink-500 to-rose-600',
    features: ['Hailuo, Kling, Luma', 'Multiple models', 'Up to 2 min videos']
  },
  {
    id: 'image-to-video',
    title: 'Image to Video',
    description: 'Animate your images into videos',
    icon: <Film className="h-8 w-8" />,
    credits: '3-5 credits',
    badge: 'Premium',
    badgeVariant: 'destructive' as const,
    href: '/dashboard/generate/image-to-video',
    gradient: 'from-orange-500 to-red-600',
    features: ['Image animation', 'Camera movement', 'Cinematic quality']
  },
  {
    id: 'image-edit',
    title: 'Image Edit',
    description: 'Edit and enhance images with AI',
    icon: <Edit className="h-8 w-8" />,
    credits: '2 credits',
    badge: 'Best Quality',
    badgeVariant: 'outline' as const,
    href: '/dashboard/generate/image-edit',
    gradient: 'from-green-500 to-teal-600',
    features: ['Qwen AI', 'Text editing', 'Object manipulation']
  },
  {
    id: 'upscale',
    title: 'Image Upscale',
    description: 'Enhance and upscale your images',
    icon: <Zap className="h-8 w-8" />,
    credits: '1 credit',
    badge: null,
    badgeVariant: 'outline' as const,
    href: '/dashboard/generate/upscale',
    gradient: 'from-indigo-500 to-blue-600',
    features: ['4K upscaling', 'AI enhancement', 'Detail preservation']
  },
  {
    id: 'coming-soon',
    title: 'More AI Models',
    description: 'Advanced features coming soon',
    icon: <Crown className="h-8 w-8" />,
    credits: 'Soon',
    badge: 'Coming Soon',
    badgeVariant: 'outline' as const,
    href: '#',
    gradient: 'from-gray-500 to-gray-600',
    features: ['3D Generation', 'Audio sync', 'Batch processing'],
    disabled: true
  }
]

export default function GenerateHubPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          <Sparkles className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold">Choose Your AI</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select from our collection of cutting-edge AI models to bring your creative vision to life
        </p>
      </div>

      {/* AI Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_MODELS.map((model) => (
          <Card
            key={model.id}
            className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${
              model.disabled 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:border-primary/50 hover:scale-105 cursor-pointer'
            }`}
          >
            {model.disabled ? (
              <div className="p-6">
                <CardContent className="p-0">
                  <div className="space-y-4">
                    {/* Icon and Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${model.gradient} text-white`}>
                        {model.icon}
                      </div>
                      {model.badge && (
                        <Badge variant={model.badgeVariant}>{model.badge}</Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{model.title}</h3>
                      <p className="text-muted-foreground text-sm">{model.description}</p>
                    </div>

                    {/* Credits */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{model.credits}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      {model.features.map((feature, index) => (
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
              <Link href={model.href}>
                <div className="p-6 h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="space-y-4 flex-1">
                      {/* Icon and Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${model.gradient} text-white transition-transform group-hover:scale-110`}>
                          {model.icon}
                        </div>
                        {model.badge && (
                          <Badge variant={model.badgeVariant}>{model.badge}</Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {model.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{model.description}</p>
                      </div>

                      {/* Credits */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{model.credits}</span>
                      </div>

                      {/* Features */}
                      <div className="space-y-1">
                        {model.features.map((feature, index) => (
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
          New to AI generation? Start with <strong>Text to Image</strong> for the best experience.
        </p>
        <p className="text-xs text-muted-foreground">
          Credit costs vary by model complexity and generation time.
        </p>
      </div>
    </div>
  )
}