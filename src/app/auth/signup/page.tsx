import { SignUpForm } from '@/components/auth/signup-form'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Palett AI</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Get started for free</h1>
          <p className="text-muted-foreground">
            Create your account and start generating amazing images
          </p>
        </div>
        
        <SignUpForm />
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}