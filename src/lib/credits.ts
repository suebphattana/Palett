import { prisma } from "@/lib/db";

export const CREDIT_COSTS = {
  // Existing
  TEXT_TO_IMAGE: 1,
  IMAGE_TO_IMAGE: 2,
  UPSCALE: 1,
  BACKGROUND_REMOVAL: 1,
  BATCH_PROCESS: 1, // per image
  
  // New Video Generation
  TEXT_TO_VIDEO_HAILUO: 3,      // MiniMax Hailuo
  TEXT_TO_VIDEO_KLING: 4,       // Kling AI (longer videos)
  TEXT_TO_VIDEO_LUMA: 2,        // Luma Dream Machine (faster/cheaper)
  TEXT_TO_VIDEO_WAN_T2V: 3,     // WanDB Text-to-Video
  
  IMAGE_TO_VIDEO_HAILUO: 4,     // Higher cost for image input
  IMAGE_TO_VIDEO_KLING: 5,
  IMAGE_TO_VIDEO_LUMA: 3,
  IMAGE_TO_VIDEO_WAN_I2V: 4,    // WanDB Image-to-Video
  
  // New Image Editing
  IMAGE_EDIT_QWEN: 2,           // Qwen Image Edit
} as const;

// Helper function to get credit cost for a specific model
export function getModelCreditCost(operation: string, model?: string): number {
  // For video operations, include model in operation name
  if (operation === 'TEXT_TO_VIDEO' && model) {
    const operationKey = `TEXT_TO_VIDEO_${model.toUpperCase()}` as keyof typeof CREDIT_COSTS;
    return CREDIT_COSTS[operationKey] || 3; // Default to 3 if model not found
  }
  
  if (operation === 'IMAGE_TO_VIDEO' && model) {
    const operationKey = `IMAGE_TO_VIDEO_${model.toUpperCase()}` as keyof typeof CREDIT_COSTS;
    return CREDIT_COSTS[operationKey] || 4; // Default to 4 if model not found
  }
  
  if (operation === 'IMAGE_EDIT' && model) {
    const operationKey = `IMAGE_EDIT_${model.toUpperCase()}` as keyof typeof CREDIT_COSTS;
    return CREDIT_COSTS[operationKey] || 2; // Default to 2 if model not found
  }
  
  // For existing operations, use direct lookup
  return CREDIT_COSTS[operation as keyof typeof CREDIT_COSTS] || 1;
}

export async function deductCredits(
  userId: string, 
  operation: keyof typeof CREDIT_COSTS,
  quantity = 1
) {
  const cost = CREDIT_COSTS[operation] * quantity;
  
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
        credits: { gte: cost } // Ensures user has enough credits
      },
      data: {
        credits: { decrement: cost }
      }
    });

    // Log the usage
    await prisma.usageLog.create({
      data: {
        userId,
        operation,
        creditsUsed: cost,
        model: "unknown", // Set based on actual model used
        success: true
      }
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Insufficient credits or user not found");
  }
}

// New function for model-based credit deduction
export async function deductCreditsForModel(
  userId: string,
  operation: string,
  model: string,
  quantity = 1
) {
  const cost = getModelCreditCost(operation, model) * quantity;
  
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
        credits: { gte: cost } // Ensures user has enough credits
      },
      data: {
        credits: { decrement: cost }
      }
    });

    // Log the usage
    await prisma.usageLog.create({
      data: {
        userId,
        operation: `${operation}_${model.toUpperCase()}`,
        creditsUsed: cost,
        model: model,
        success: true
      }
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Insufficient credits or user not found");
  }
}

export async function addCredits(userId: string, credits: number) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      credits: { increment: credits }
    }
  });
}

export async function getUserCredits(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true }
  });
  
  return user?.credits ?? 0;
}