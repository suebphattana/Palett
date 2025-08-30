import { prisma } from "@/lib/db";

export const CREDIT_COSTS = {
  TEXT_TO_IMAGE: 1,
  IMAGE_TO_IMAGE: 2,
  UPSCALE: 1,
  BACKGROUND_REMOVAL: 1,
  BATCH_PROCESS: 1, // per image
} as const;

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