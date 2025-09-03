import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { generateVideoFromImage, getModelEndpoint } from '@/lib/fal'
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
      imageUrl,
      prompt = "",
      model, // 'HAILUO', 'KLING', 'LUMA', or 'WAN_I2V'
      duration = 5,
      aspectRatio = "16:9"
    } = body

    // Validate required fields
    if (!imageUrl || !model) {
      return NextResponse.json({ 
        error: 'Missing required fields: imageUrl, model' 
      }, { status: 400 })
    }

    // Validate model choice
    if (!['HAILUO', 'KLING', 'LUMA', 'WAN_I2V'].includes(model)) {
      return NextResponse.json({ 
        error: 'Invalid model. Must be HAILUO, KLING, LUMA, or WAN_I2V' 
      }, { status: 400 })
    }

    // Get the Fal.ai model endpoint
    const modelEndpoint = getModelEndpoint('IMAGE_TO_VIDEO', model)
    if (!modelEndpoint) {
      return NextResponse.json({ 
        error: 'Model endpoint not found' 
      }, { status: 400 })
    }

    console.log(`Starting image-to-video generation with ${model} for user ${session.user.id}`)

    // Deduct credits before generation
    try {
      await deductCreditsForModel(session.user.id, 'IMAGE_TO_VIDEO', model)
    } catch (error) {
      return NextResponse.json({ 
        error: 'Insufficient credits or user not found' 
      }, { status: 402 }) // Payment Required
    }

    // Generate video from image with Fal AI
    const result = await generateVideoFromImage({
      model: modelEndpoint,
      imageUrl,
      prompt,
      duration,
      aspectRatio
    })

    console.log('Fal AI result:', result)

    // Save to database
    const savedVideo = await prisma.generatedImage.create({
      data: {
        userId: session.user.id,
        prompt: prompt || 'Image to video conversion',
        model: `${model}_IMAGE_TO_VIDEO`,
        imageUrl: result.video?.url || result.url, // Video URL
        thumbnailUrl: result.thumbnail?.url || null,
        width: 1920, // Default video dimensions
        height: 1080,
        duration: duration,
        aspectRatio: aspectRatio,
        contentType: 'video',
        operation: 'image-to-video',
        originalImageUrl: imageUrl,
        metadata: {
          model: model,
          falModel: modelEndpoint,
          originalParams: { imageUrl, prompt, duration, aspectRatio }
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
        aspectRatio: savedVideo.aspectRatio,
        originalImage: imageUrl
      },
      model: model,
      creditsUsed: await import('@/lib/credits').then(m => m.getModelCreditCost('IMAGE_TO_VIDEO', model))
    })

  } catch (error) {
    console.error('Image-to-video generation error:', error)
    
    // Return detailed error for development
    const errorMessage = error instanceof Error ? error.message : 'Video generation failed'
    
    return NextResponse.json({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 })
  }
}