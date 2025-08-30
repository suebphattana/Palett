import { auth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CreditCard, Zap, Crown, Star, Plus, History } from 'lucide-react'

export default async function BillingPage() {
  const session = await auth()

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center">
          <CreditCard className="mr-3 h-8 w-8" />
          Billing & Credits
        </h1>
        <p className="text-muted-foreground">
          Manage your subscription, credits, and billing information
        </p>
      </div>

      {/* Current Plan & Credits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="mr-2 h-5 w-5" />
              Available Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">10</div>
            <p className="text-sm text-muted-foreground mb-4">
              Free tier credits
            </p>
            <Progress value={100} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              10 of 10 credits remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Crown className="mr-2 h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">Free</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              10 credits per month included
            </p>
            <Button className="w-full">
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <History className="mr-2 h-5 w-5" />
              Usage This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">0</div>
            <p className="text-sm text-muted-foreground mb-4">
              Credits used
            </p>
            <Progress value={0} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              0 of 10 credits used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Packages */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Buy Credits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Starter Pack</CardTitle>
              <CardDescription className="text-2xl font-bold">
                $9.99
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li>✓ 100 credits</li>
                <li>✓ Never expires</li>
                <li>✓ All AI models</li>
                <li>✓ Standard support</li>
              </ul>
              <Button className="w-full" disabled>
                Buy Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              Best Value
            </Badge>
            <CardHeader>
              <CardTitle>Creator Pack</CardTitle>
              <CardDescription className="text-2xl font-bold">
                $19.99
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li>✓ 250 credits</li>
                <li className="text-primary">✓ +50 bonus credits</li>
                <li>✓ Never expires</li>
                <li>✓ All AI models</li>
                <li>✓ Priority support</li>
              </ul>
              <Button className="w-full" disabled>
                Buy Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Pack</CardTitle>
              <CardDescription className="text-2xl font-bold">
                $39.99
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li>✓ 600 credits</li>
                <li className="text-primary">✓ +100 bonus credits</li>
                <li>✓ Never expires</li>
                <li>✓ All AI models</li>
                <li>✓ Priority support</li>
              </ul>
              <Button className="w-full" disabled>
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Pro Monthly
              </CardTitle>
              <CardDescription className="text-2xl font-bold">
                $19.99/month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li>✓ 500 monthly credits</li>
                <li>✓ All AI models</li>
                <li>✓ Advanced features</li>
                <li>✓ Priority support</li>
                <li>✓ Cancel anytime</li>
              </ul>
              <Button className="w-full" disabled>
                Subscribe
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="mr-2 h-5 w-5" />
                Premium Monthly
              </CardTitle>
              <CardDescription className="text-2xl font-bold">
                $49.99/month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li>✓ Unlimited credits</li>
                <li>✓ All premium models</li>
                <li>✓ Priority processing</li>
                <li>✓ 24/7 support</li>
                <li>✓ Commercial license</li>
              </ul>
              <Button className="w-full" disabled>
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Usage History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your recent credit usage and generations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No activity yet. Start generating images to see your usage history!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}