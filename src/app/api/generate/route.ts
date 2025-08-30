import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { generateImage } from '@/lib/fal'
import { deductCredits } from '@/lib/credits'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const generateRequestSchema = z.object({
  prompt: z.string().min(1),
  negativePrompt: z.string().optional(),
  model: z.string(),
  imageSize: z.string().optional(),
  steps: z.number().min(10).max(50).optional(),
  guidance: z.number().min(1).max(20).optional(),
  seed: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = generateRequestSchema.parse(body)

    // Check if user has enough credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    })

    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      )
    }

    // Deduct credits before generation
    await deductCredits(session.user.id, 'TEXT_TO_IMAGE')

    // Generate image with Fal AI
    const result = await generateImage({
      model: validatedData.model,
      prompt: validatedData.prompt,
      negativePrompt: validatedData.negativePrompt,
      imageSize: validatedData.imageSize,
      steps: validatedData.steps,
      guidance: validatedData.guidance,
      seed: validatedData.seed,
    })

    // Save to database
    const savedImage = await prisma.generatedImage.create({
      data: {
        userId: session.user.id,
        prompt: validatedData.prompt,
        negativePrompt: validatedData.negativePrompt,
        model: validatedData.model,
        imageUrl: result.images[0].url,
        width: result.images[0].width,
        height: result.images[0].height,
        steps: validatedData.steps,
        guidance: validatedData.guidance,
        seed: validatedData.seed,
        operation: 'text-to-image',
      },
    })

    return NextResponse.json({
      success: true,
      images: result.images.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
      })),
      savedImageId: savedImage.id,
    })

  } catch (error) {
    console.error('Generation API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    )
  }
}