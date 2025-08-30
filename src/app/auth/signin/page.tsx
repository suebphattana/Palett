import { SignInForm } from '@/components/auth/signin-form'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Palett AI</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue creating
          </p>
        </div>
        
        <SignInForm />
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}