export const AI_MODELS = {
  'fal-ai/flux/dev': {
    name: 'FLUX Dev',
    description: 'Fast, high-quality image generation',
    category: 'text-to-image',
    creditCost: 1
  },
  'fal-ai/flux-pro/v1.1-ultra': {
    name: 'FLUX Pro',
    description: 'Premium quality with advanced features',
    category: 'text-to-image',
    creditCost: 2
  },
  'fal-ai/imagen4/preview': {
    name: 'Imagen 4',
    description: 'Google\'s latest image generation model',
    category: 'text-to-image',
    creditCost: 2
  },
  'fal-ai/ideogram/v3': {
    name: 'Ideogram v3',
    description: 'Excellent for text and graphics',
    category: 'text-to-image',
    creditCost: 1
  }
} as const

export const IMAGE_SIZES = [
  { value: 'square_hd', label: 'Square HD (1024×1024)', aspect: '1:1' },
  { value: 'landscape_4_3', label: 'Landscape (1024×768)', aspect: '4:3' },
  { value: 'landscape_16_9', label: 'Landscape Wide (1024×576)', aspect: '16:9' },
  { value: 'portrait_4_3', label: 'Portrait (768×1024)', aspect: '3:4' },
  { value: 'portrait_16_9', label: 'Portrait Tall (576×1024)', aspect: '9:16' }
] as const