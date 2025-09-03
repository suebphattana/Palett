import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { editImage, FAL_MODELS } from '@/lib/fal'
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
      prompt,
      guidance = 7.5,
      steps = 30
    } = body

    // Validate required fields
    if (!imageUrl || !prompt) {
      return NextResponse.json({ 
        error: 'Missing required fields: imageUrl, prompt' 
      }, { status: 400 })
    }

    // Use Qwen model for image editing
    const model = 'QWEN'
    const modelEndpoint = FAL_MODELS.IMAGE_EDIT.QWEN

    console.log(`Starting image editing with Qwen for user ${session.user.id}`)

    // Deduct credits before generation
    try {
      await deductCreditsForModel(session.user.id, 'IMAGE_EDIT', model)
    } catch (error) {
      return NextResponse.json({ 
        error: 'Insufficient credits or user not found' 
      }, { status: 402 }) // Payment Required
    }

    // Edit image with Fal AI
    const result = await editImage({
      model: modelEndpoint,
      imageUrl,
      prompt,
      guidance,
      steps
    })

    console.log('Fal AI result:', result)

    // Save to database
    const savedImage = await prisma.generatedImage.create({
      data: {
        userId: session.user.id,
        prompt,
        model: `${model}_IMAGE_EDIT`,
        imageUrl: result.image?.url || result.url, // Edited image URL
        thumbnailUrl: null, // No thumbnail for edited images
        width: result.image?.width || 1024,
        height: result.image?.height || 1024,
        contentType: 'image',
        operation: 'image-edit',
        originalImageUrl: imageUrl,
        guidance,
        steps,
        metadata: {
          model: model,
          falModel: modelEndpoint,
          originalParams: { imageUrl, prompt, guidance, steps }
        }
      }
    })

    console.log('Edited image saved to database:', savedImage.id)

    return NextResponse.json({
      success: true,
      image: {
        id: savedImage.id,
        url: savedImage.imageUrl,
        originalUrl: imageUrl,
        width: savedImage.width,
        height: savedImage.height
      },
      model: model,
      creditsUsed: await import('@/lib/credits').then(m => m.getModelCreditCost('IMAGE_EDIT', model))
    })

  } catch (error) {
    console.error('Image editing error:', error)
    
    // Return detailed error for development
    const errorMessage = error instanceof Error ? error.message : 'Image editing failed'
    
    return NextResponse.json({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 })
  }
}