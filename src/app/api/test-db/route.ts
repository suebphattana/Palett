import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs'

export async function GET() {
  let prisma: PrismaClient | null = null
  
  try {
    console.log('Creating fresh Prisma client...')
    console.log('DATABASE_URL available:', !!process.env.DATABASE_URL)
    console.log('NODE_ENV:', process.env.NODE_ENV)
    
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
    
    console.log('Prisma client created, attempting connection...')
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        credits: true,
      }
    })
    
    console.log('Query successful, found users:', users.length)
    
    return NextResponse.json({ 
      success: true, 
      users,
      count: users.length 
    })
  } catch (error) {
    console.error('Database test error:', error)
    console.error('Error type:', error?.constructor?.name)
    console.error('Error code:', (error as any)?.code)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error?.constructor?.name || 'Unknown'
    }, { status: 500 })
  } finally {
    if (prisma) {
      await prisma.$disconnect()
    }
  }
}