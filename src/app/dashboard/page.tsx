import { auth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Sparkles, Image, Zap, Plus } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || 'Creator'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to create something amazing today?
          </p>
        </div>
        <Link href="/dashboard/generate">
          <Button size="lg" className="shadow-lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Image
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              +0 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images Generated</CardTitle>
            <Image className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Start creating to see your stats
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/billing" className="text-primary hover:underline">
                Upgrade for more features
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/generate">
            <CardHeader>
              <Sparkles className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Generate Image</CardTitle>
              <CardDescription>
                Create stunning images from text prompts using AI
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/gallery">
            <CardHeader>
              <Image className="h-8 w-8 text-primary mb-2" />
              <CardTitle>View Gallery</CardTitle>
              <CardDescription>
                Browse and manage your created images
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/upscale">
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Upscale Image</CardTitle>
              <CardDescription>
                Enhance image resolution up to 4K quality
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            New to Palett AI? Here's how to get the most out of your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Badge variant="outline">1</Badge>
              <span>Try generating your first image with a simple prompt like "a serene mountain landscape"</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">2</Badge>
              <span>Experiment with different AI models (FLUX, Imagen 4) for varied styles</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">3</Badge>
              <span>Use the gallery to organize and manage your creations</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">4</Badge>
              <span>Upgrade to Pro for unlimited monthly credits and premium features</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}