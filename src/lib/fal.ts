import { fal } from "@fal-ai/client";

// Configure Fal client
fal.config({
  credentials: process.env.FAL_KEY!
});

export const FAL_MODELS = {
  TEXT_TO_IMAGE: {
    FLUX_DEV: "fal-ai/flux/dev",
    FLUX_PRO: "fal-ai/flux-pro/v1.1-ultra", 
    IMAGEN_4: "fal-ai/imagen4/preview",
    IDEOGRAM: "fal-ai/ideogram/v3"
  },
  IMAGE_TO_IMAGE: {
    FLUX_DEV: "fal-ai/flux/dev/image-to-image",
    IMAGEN_4_EDIT: "fal-ai/imagen4/preview/edit"
  },
  UPSCALING: {
    CREATIVE_UPSCALE: "fal-ai/creative-upscaler",
    REAL_ESRGAN: "fal-ai/real-esrgan"
  },
  BACKGROUND: {
    REMOVAL: "fal-ai/birefnet",
    REPLACEMENT: "fal-ai/flux/dev/image-to-image"
  }
} as const;

export interface GenerateImageParams {
  model: string;
  prompt: string;
  negativePrompt?: string;
  imageSize?: string;
  numImages?: number;
  steps?: number;
  guidance?: number;
  seed?: number;
}

export async function generateImage(params: GenerateImageParams) {
  try {
    const result = await fal.subscribe(params.model, {
      input: {
        prompt: params.prompt,
        negative_prompt: params.negativePrompt,
        image_size: params.imageSize || "landscape_4_3",
        num_images: params.numImages || 1,
        num_inference_steps: params.steps || 28,
        guidance_scale: params.guidance || 3.5,
        seed: params.seed
      }
    });
    
    return result;
  } catch (error) {
    console.error("Fal AI generation error:", error);
    throw new Error("Image generation failed");
  }
}

export async function upscaleImage(imageUrl: string, scale = 2) {
  return await fal.subscribe("fal-ai/creative-upscaler", {
    input: {
      image_url: imageUrl,
      scale,
      creativity: 0.3,
      resemblance: 1.0,
      hdr: 0
    }
  });
}