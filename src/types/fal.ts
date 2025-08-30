export interface GeneratedImageResult {
  images: {
    url: string
    width: number
    height: number
  }[]
}

export interface GenerateImageParams {
  model: string
  prompt: string
  negativePrompt?: string
  imageSize?: string
  numImages?: number
  steps?: number
  guidance?: number
  seed?: number
}

export interface UpscaleImageParams {
  imageUrl: string
  scale?: number
  creativity?: number
  resemblance?: number
  hdr?: number
}