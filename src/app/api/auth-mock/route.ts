import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'

// Mock user data (until we resolve Next.js + Prisma issue)
const MOCK_USERS = [
  {
    id: 'cmeygkic10000h9cfknl6nc54',
    email: 'admin@example.com',
    name: 'Admin User',
    // Pre-hashed 'qwer1234'
    password: '$2a$10$rQZ5K3zOGwNZnbdQzONgR.8YGJj1P7CgJJuoK6t8bKaGz1rOWw4i.',
    role: 'admin',
    credits: 1000
  },
  {
    id: 'cmeygkkss0001h9cffk9qqzb6',
    email: 'user@example.com',
    name: 'Test User',
    // Pre-hashed 'test123'
    password: '$2a$10$3hAhxbdU8hkr5BzaZ3l8pO5dVVbZ8LfUJ5MX8A2cRgHzFdOoJQ6iu',
    role: 'user',
    credits: 10
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('Mock authentication for:', email)
    
    const user = MOCK_USERS.find(u => u.email === email)
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 401 })
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid password' 
      }, { status: 401 })
    }
    
    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        credits: user.credits
      }
    })
  } catch (error) {
    console.error('Mock auth error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}