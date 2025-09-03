import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { generateVideo, FAL_MODELS, getModelEndpoint } from '@/lib/fal'
import { deductCreditsForModel } from '@/lib/credits'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      prompt, 
      model, // 'HAILUO', 'KLING', 'LUMA', or 'WAN_T2V'
      duration = 5,
      aspectRatio = "16:9",
      steps = 30
    } = body

    // Validate required fields
    if (!prompt || !model) {
      return NextResponse.json({ 
        error: 'Missing required fields: prompt, model' 
      }, { status: 400 })
    }

    // Validate model choice
    if (!['HAILUO', 'KLING', 'LUMA', 'WAN_T2V'].includes(model)) {
      return NextResponse.json({ 
        error: 'Invalid model. Must be HAILUO, KLING, LUMA, or WAN_T2V' 
      }, { status: 400 })
    }

    // Get the Fal.ai model endpoint
    const modelEndpoint = getModelEndpoint('TEXT_TO_VIDEO', model)
    if (!modelEndpoint) {
      return NextResponse.json({ 
        error: 'Model endpoint not found' 
      }, { status: 400 })
    }

    console.log(`Starting text-to-video generation with ${model} for user ${session.user.id}`)

    // Deduct credits before generation
    try {
      await deductCreditsForModel(session.user.id, 'TEXT_TO_VIDEO', model)
    } catch (error) {
      return NextResponse.json({ 
        error: 'Insufficient credits or user not found' 
      }, { status: 402 }) // Payment Required
    }

    // Generate video with Fal AI
    const result = await generateVideo({
      model: modelEndpoint,
      prompt,
      duration,
      aspectRatio,
      steps
    })

    console.log('Fal AI result:', result)

    // Save to database
    const savedVideo = await prisma.generatedImage.create({
      data: {
        userId: session.user.id,
        prompt,
        model: `${model}_TEXT_TO_VIDEO`,
        imageUrl: result.video?.url || result.url, // Video URL
        thumbnailUrl: result.thumbnail?.url || null,
        width: 1920, // Default video dimensions
        height: 1080,
        duration: duration,
        aspectRatio: aspectRatio,
        contentType: 'video',
        operation: 'text-to-video',
        steps,
        metadata: {
          model: model,
          falModel: modelEndpoint,
          originalParams: { prompt, duration, aspectRatio, steps }
        }
      }
    })

    console.log('Video saved to database:', savedVideo.id)

    return NextResponse.json({
      success: true,
      video: {
        id: savedVideo.id,
        url: savedVideo.imageUrl,
        thumbnail: savedVideo.thumbnailUrl,
        duration: savedVideo.duration,
        aspectRatio: savedVideo.aspectRatio
      },
      model: model,
      creditsUsed: await import('@/lib/credits').then(m => m.getModelCreditCost('TEXT_TO_VIDEO', model))
    })

  } catch (error) {
    console.error('Text-to-video generation error:', error)
    
    // Return detailed error for development
    const errorMessage = error instanceof Error ? error.message : 'Video generation failed'
    
    return NextResponse.json({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 })
  }
}