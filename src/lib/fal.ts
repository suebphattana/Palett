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
  TEXT_TO_VIDEO: {
    HAILUO: "fal-ai/minimax-video-01",
    KLING: "fal-ai/kling-video/v1/standard/text-to-video",
    LUMA: "fal-ai/luma-dream-machine",
    WAN_T2V: "fal-ai/wan-t2v"
  },
  IMAGE_TO_VIDEO: {
    HAILUO: "fal-ai/minimax-video-01",
    KLING: "fal-ai/kling-video/v1/standard/image-to-video", 
    LUMA: "fal-ai/luma-dream-machine",
    WAN_I2V: "fal-ai/wan-i2v"
  },
  IMAGE_EDIT: {
    QWEN: "fal-ai/qwen-image-edit"
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

// Model configurations for user selection
export const VIDEO_MODELS = {
  HAILUO: {
    name: "MiniMax Hailuo",
    description: "Best Quality",
    features: ["Superior prompt adherence", "Action scenes", "High quality"],
    credits: 3,
    maxDuration: 6, // seconds
    icon: "🏆"
  },
  LUMA: {
    name: "Luma Dream Machine", 
    description: "Fastest",
    features: ["30 sec generation", "Simple UI", "Cinematic quality"],
    credits: 2,
    maxDuration: 5,
    icon: "⚡"
  },
  KLING: {
    name: "Kling AI",
    description: "Longest",
    features: ["2min videos", "1080p quality", "Camera movement"],
    credits: 4,
    maxDuration: 10,
    icon: "🎬"
  },
  WAN_T2V: {
    name: "WanDB Text-to-Video",
    description: "Research Model",
    features: ["Academic quality", "Research-grade", "Experimental"],
    credits: 3,
    maxDuration: 8,
    icon: "🔬"
  },
  WAN_I2V: {
    name: "WanDB Image-to-Video", 
    description: "Research Model",
    features: ["Academic quality", "Research-grade", "Image animation"],
    credits: 4,
    maxDuration: 8,
    icon: "🔬"
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

export interface GenerateVideoParams {
  model: string;
  prompt: string;
  duration?: number;
  aspectRatio?: string;
  steps?: number;
}

export interface VideoFromImageParams {
  model: string;
  imageUrl: string;
  prompt?: string;
  duration?: number;
  aspectRatio?: string;
}

export interface EditImageParams {
  model: string;
  imageUrl: string;
  prompt: string;
  guidance?: number;
  steps?: number;
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

export async function generateVideo(params: GenerateVideoParams) {
  try {
    const result = await fal.subscribe(params.model, {
      input: {
        prompt: params.prompt,
        duration: params.duration || 5,
        aspect_ratio: params.aspectRatio || "16:9",
        num_inference_steps: params.steps || 30
      }
    });
    
    return result;
  } catch (error) {
    console.error("Fal AI video generation error:", error);
    throw new Error("Video generation failed");
  }
}

export async function generateVideoFromImage(params: VideoFromImageParams) {
  try {
    const result = await fal.subscribe(params.model, {
      input: {
        image_url: params.imageUrl,
        prompt: params.prompt || "",
        duration: params.duration || 5,
        aspect_ratio: params.aspectRatio || "16:9"
      }
    });
    
    return result;
  } catch (error) {
    console.error("Fal AI image-to-video error:", error);
    throw new Error("Image-to-video generation failed");
  }
}

export async function editImage(params: EditImageParams) {
  try {
    const result = await fal.subscribe(params.model, {
      input: {
        image_url: params.imageUrl,
        prompt: params.prompt,
        guidance_scale: params.guidance || 7.5,
        num_inference_steps: params.steps || 30
      }
    });
    
    return result;
  } catch (error) {
    console.error("Fal AI image editing error:", error);
    throw new Error("Image editing failed");
  }
}

// Helper function to get model info for user selection
export function getModelInfo(modelType: 'TEXT_TO_VIDEO' | 'IMAGE_TO_VIDEO', modelKey: keyof typeof VIDEO_MODELS) {
  return VIDEO_MODELS[modelKey];
}

// Helper function to get model endpoint
export function getModelEndpoint(modelType: keyof typeof FAL_MODELS, modelKey: string) {
  const models = FAL_MODELS[modelType] as Record<string, string>;
  return models[modelKey];
}