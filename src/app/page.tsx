import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Image, Wand2, Zap, Shield, Globe } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Palett AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signin">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Powered by FLUX, Imagen 4 & More
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Create Stunning Images with{' '}
            <span className="text-primary">Advanced AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your ideas into beautiful visuals using cutting-edge AI models. 
            Generate, edit, and enhance images with professional quality results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8">
                Start Creating Free
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Gallery
              <Image className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Image Generation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, edit, and enhance images with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Wand2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Text-to-Image</CardTitle>
                <CardDescription>
                  Create stunning images from simple text descriptions using FLUX, Imagen 4, and Ideogram models.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Image className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Image Editing</CardTitle>
                <CardDescription>
                  Transform existing images with AI-powered editing, background removal, and style transfer.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Upscaling</CardTitle>
                <CardDescription>
                  Enhance image resolution up to 4K with AI upscaling while maintaining quality and details.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Credit System</CardTitle>
                <CardDescription>
                  Pay only for what you use with our flexible credit system. Start with 10 free credits.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Gallery & Sharing</CardTitle>
                <CardDescription>
                  Organize your creations in a personal gallery and share your favorite images with the community.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Multiple Models</CardTitle>
                <CardDescription>
                  Access multiple AI models including FLUX Pro, Imagen 4, and specialized tools for different use cases.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Start free with 10 credits, then choose the plan that fits your needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription className="text-2xl font-bold">
                  $0<span className="text-sm font-normal text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2">
                  <li>✓ 10 free credits</li>
                  <li>✓ Basic AI models</li>
                  <li>✓ Image gallery</li>
                  <li>✓ Standard support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription className="text-2xl font-bold">
                  $19.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2">
                  <li>✓ 500 monthly credits</li>
                  <li>✓ All AI models</li>
                  <li>✓ Advanced features</li>
                  <li>✓ Priority support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription className="text-2xl font-bold">
                  $49.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2">
                  <li>✓ Unlimited credits</li>
                  <li>✓ Premium models</li>
                  <li>✓ Priority processing</li>
                  <li>✓ 24/7 support</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8">
                Start Creating Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Palett AI</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 Palett AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
