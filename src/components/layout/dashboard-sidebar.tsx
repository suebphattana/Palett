'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Sparkles, 
  Image, 
  Wand2, 
  Zap, 
  Settings, 
  CreditCard,
  Home,
  Images
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Generate',
    href: '/dashboard/generate',
    icon: Sparkles,
  },
  {
    name: 'Gallery',
    href: '/dashboard/gallery',
    icon: Images,
  },
  {
    name: 'Edit',
    href: '/dashboard/edit',
    icon: Wand2,
  },
  {
    name: 'Upscale',
    href: '/dashboard/upscale',
    icon: Zap,
  },
]

const secondaryNavigation = [
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    name: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Palett AI</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-primary/10 text-primary'
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
        
        <Separator className="my-4" />
        
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-primary/10 text-primary'
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          © 2024 Palett AI
        </div>
      </div>
    </div>
  )
}