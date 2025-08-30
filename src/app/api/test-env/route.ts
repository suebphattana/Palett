import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.startsWith('DATABASE') || 
      key.startsWith('NEXT') ||
      key.startsWith('PRISMA')
    )
  })
}