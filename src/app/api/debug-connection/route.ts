import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL
    
    if (!databaseUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'DATABASE_URL not found' 
      })
    }

    // Parse the DATABASE_URL to show components without revealing password
    const url = new URL(databaseUrl)
    
    return NextResponse.json({
      success: true,
      connectionDetails: {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        database: url.pathname.substring(1), // remove leading slash
        username: url.username,
        passwordSet: !!url.password,
        fullUrl: databaseUrl.replace(/:[^@]*@/, ':***@') // hide password
      },
      environment: process.env.NODE_ENV,
      nextRuntime: process.env.NEXT_RUNTIME
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error?.constructor?.name
    }, { status: 500 })
  }
}