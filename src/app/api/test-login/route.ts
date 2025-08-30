import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('Testing login for:', email)
    
    const user = await prisma.user.findUnique({
      where: { email },
    })
    
    if (!user || !user.password) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found or no password set' 
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
    console.error('Test login error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}