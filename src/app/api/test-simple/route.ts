import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs'

export async function GET() {
  let prisma: PrismaClient | null = null
  
  try {
    console.log('Testing simple connection...')
    
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })
    
    console.log('Attempting to connect...')
    await prisma.$connect()
    console.log('Connected successfully')
    
    console.log('Attempting raw query...')
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Raw query result:', result)
    
    console.log('Attempting to list tables...')
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('Tables found:', tables)
    
    return NextResponse.json({ 
      success: true, 
      rawQuery: result,
      tables: tables
    })
    
  } catch (error) {
    console.error('Simple test error:', error)
    console.error('Error name:', error?.constructor?.name)
    console.error('Error message:', (error as any)?.message)
    console.error('Error code:', (error as any)?.code)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error?.constructor?.name || 'Unknown',
      code: (error as any)?.code
    }, { status: 500 })
  } finally {
    if (prisma) {
      console.log('Disconnecting...')
      await prisma.$disconnect()
    }
  }
}