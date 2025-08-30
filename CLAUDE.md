# Imgentic AI Clone - Complete Development Guide

**Project name**: Palett AI

## Project Overview

Building a comprehensive AI image generation and editing platform similar to imgentic.ai using Next.js 15, Fal AI, and modern web technologies. This platform will offer text-to-image generation, image editing, background removal, upscaling, and more.

## Core Features to Implement

### 🎨 AI Image Generation & Editing
- **Text-to-Image Generation**: Create images from text prompts using FLUX, Imagen 4, Ideogram models
- **Image-to-Image Editing**: Transform existing images with AI guidance
- **Background Removal/Replacement**: Automatic background detection and replacement
- **Image Upscaling**: Enhance resolution up to 4K using AI
- **Inpainting/Outpainting**: Fill or extend image areas intelligently
- **Style Transfer**: Apply artistic styles to images
- **Photo Restoration**: Repair old or damaged photos
- **Batch Processing**: Handle multiple images simultaneously

### 👤 User Management & Auth
- **Authentication**: Google, GitHub, email/password via NextAuth.js
- **User Profiles**: Manage account settings, preferences
- **Image Gallery**: Personal collection with organization features
- **Usage History**: Track generation and editing activities

### 💳 Billing & Subscriptions
- **Credit System**: Pay-per-use model for API calls
- **Subscription Plans**: Monthly/yearly unlimited plans
- **Stripe Integration**: Secure payment processing
- **Usage Analytics**: Track credits, costs, and limits

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Color tone**: Slate: Light/Dark theme toggleable
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend
- **API Routes**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 (Auth.js)
- **File Storage**: AWS S3 or Vercel Blob
- **AI Provider**: Fal AI (primary), OpenAI (secondary)

### Infrastructure
- **Hosting**: Vercel
- **Database**: Supabase or Railway PostgreSQL
- **Payments**: Stripe
- **CDN**: Vercel Edge Network
- **Monitoring**: Sentry (errors) + Vercel Analytics

## Database Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id                String    @id @default(cuid())
  name              String?
  email             String    @unique
  emailVerified     DateTime?
  image             String?
  credits           Int       @default(10) // Free credits
  stripeCustomerId  String?   @unique
  subscriptionId    String?   @unique
  subscriptionStatus String? // active, canceled, past_due
  plan              String    @default("free") // free, pro, premium
  accounts          Account[]
  sessions          Session[]
  images            GeneratedImage[]
  purchases         Purchase[]
  usageLogs         UsageLog[]
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@index([email])
}

model GeneratedImage {
  id          String   @id @default(cuid())
  userId      String
  prompt      String
  negativePrompt String?
  model       String   // flux-dev, imagen4, etc.
  imageUrl    String
  thumbnailUrl String?
  width       Int
  height      Int
  seed        Int?
  steps       Int?
  guidance    Float?
  style       String?
  operation   String   @default("text-to-image") // text-to-image, image-to-image, upscale, etc.
  originalImageUrl String? // For image-to-image operations
  metadata    Json?    // Store additional parameters
  isPublic    Boolean  @default(false)
  likes       Int      @default(0)
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())

  @@index([userId, createdAt])
  @@index([isPublic, createdAt])
}

model Purchase {
  id                     String   @id @default(cuid())
  userId                 String
  creditsAdded           Int
  pricePaid              Int      // in cents
  currency               String   @default("usd")
  stripeCheckoutSessionId String  @unique
  stripePaymentIntentId  String?  @unique
  status                 String   @default("pending") // pending, completed, failed
  user                   User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt              DateTime @default(now())

  @@index([userId])
}

model UsageLog {
  id         String   @id @default(cuid())
  userId     String
  operation  String   // text-to-image, upscale, background-removal, etc.
  creditsUsed Int
  model      String
  success    Boolean  @default(true)
  errorMessage String?
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  timestamp  DateTime @default(now())

  @@index([userId, timestamp])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── gallery/
│   │   ├── generate/
│   │   ├── edit/
│   │   ├── upscale/
│   │   ├── settings/
│   │   └── billing/
│   ├── api/
│   │   ├── auth/
│   │   ├── generate/
│   │   ├── edit/
│   │   ├── upload/
│   │   ├── webhooks/
│   │   └── stripe/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ # shadcn/ui components
│   ├── forms/
│   ├── image-generation/
│   ├── image-editing/
│   ├── gallery/
│   ├── billing/
│   ├── layout/
│   └── common/
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── fal.ts
│   ├── stripe.ts
│   ├── upload.ts
│   ├── credits.ts
│   └── utils.ts
├── hooks/
├── stores/
│   ├── auth-store.ts
│   ├── image-store.ts
│   └── ui-store.ts
├── types/
└── constants/
```

## Fal AI Integration

### Core Models to Implement

```typescript
// lib/fal.ts
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

export async function generateImage(params: {
  model: string;
  prompt: string;
  negativePrompt?: string;
  imageSize?: string;
  numImages?: number;
  steps?: number;
  guidance?: number;
  seed?: number;
}) {
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
```

### Credit System Implementation

```typescript
// lib/credits.ts
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
```

## Key Components

### Image Generation Form

```typescript
// components/image-generation/generation-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { generateImage } from "@/lib/fal";

const generationSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  negativePrompt: z.string().optional(),
  model: z.string(),
  imageSize: z.string(),
  steps: z.number().min(10).max(50),
  guidance: z.number().min(1).max(20)
});

type GenerationForm = z.infer<typeof generationSchema>;

export function GenerationForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const form = useForm<GenerationForm>({
    resolver: zodResolver(generationSchema),
    defaultValues: {
      model: "fal-ai/flux/dev",
      imageSize: "landscape_4_3",
      steps: 28,
      guidance: 3.5
    }
  });

  const onSubmit = async (data: GenerationForm) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const result = await response.json();
      setGeneratedImages(result.images);
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Textarea
          placeholder="Describe the image you want to create..."
          {...form.register("prompt")}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Select {...form.register("model")}>
          <option value="fal-ai/flux/dev">FLUX Dev</option>
          <option value="fal-ai/flux-pro/v1.1-ultra">FLUX Pro</option>
          <option value="fal-ai/imagen4/preview">Imagen 4</option>
        </Select>
        
        <Select {...form.register("imageSize")}>
          <option value="square_hd">Square HD</option>
          <option value="landscape_4_3">Landscape</option>
          <option value="portrait_4_3">Portrait</option>
        </Select>
      </div>

      <Button type="submit" disabled={isGenerating} className="w-full">
        {isGenerating ? "Generating..." : "Generate Image"}
      </Button>

      {generatedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {generatedImages.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Generated ${index + 1}`}
              className="rounded-lg shadow-lg"
            />
          ))}
        </div>
      )}
    </form>
  );
}
```

### API Route Example

```typescript
// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateImage } from "@/lib/fal";
import { deductCredits } from "@/lib/credits";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { prompt, negativePrompt, model, imageSize, steps, guidance } = body;

    // Deduct credits before generation
    await deductCredits(session.user.id, "TEXT_TO_IMAGE");

    // Generate image with Fal AI
    const result = await generateImage({
      model,
      prompt,
      negativePrompt,
      imageSize,
      steps,
      guidance
    });

    // Save to database
    const savedImage = await prisma.generatedImage.create({
      data: {
        userId: session.user.id,
        prompt,
        negativePrompt,
        model,
        imageUrl: result.images[0].url,
        width: result.images[0].width,
        height: result.images[0].height,
        operation: "text-to-image"
      }
    });

    return NextResponse.json({
      images: result.images.map(img => img.url),
      savedImageId: savedImage.id
    });

  } catch (error) {
    console.error("Generation API error:", error);
    return NextResponse.json(
      { error: "Generation failed" }, 
      { status: 500 }
    );
  }
}
```

## Stripe Integration

### Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.metadata?.type === "credits") {
        const userId = session.metadata.userId;
        const credits = parseInt(session.metadata.credits);
        
        // Add credits to user
        await prisma.user.update({
          where: { id: userId },
          data: { credits: { increment: credits } }
        });

        // Record purchase
        await prisma.purchase.create({
          data: {
            userId,
            creditsAdded: credits,
            pricePaid: session.amount_total!,
            stripeCheckoutSessionId: session.id,
            status: "completed"
          }
        });
      }
      break;

    case "customer.subscription.created":
    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.user.update({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
          subscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
          plan: subscription.metadata.plan || "pro"
        }
      });
      break;
  }

  return NextResponse.json({ received: true });
}
```

## Development Setup

### 1. Initialize Project

```bash
# Create Next.js project
npx create-next-app@latest imgentic-clone --typescript --tailwind --app

# Install dependencies
npm install @fal-ai/client @prisma/client prisma
npm install next-auth@beta stripe
npm install @hookform/resolvers/zod react-hook-form zod
npm install zustand @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react class-variance-authority clsx tailwind-merge

# Install shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea select dialog dropdown-menu
```

### 2. Environment Variables

```bash
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/imgentic"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Auth providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

# AI Provider
FAL_KEY="your-fal-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# File storage
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_S3_BUCKET_NAME="your-bucket"
AWS_REGION="us-east-1"
```

### 3. Database Setup

```bash
# Initialize Prisma
npx prisma init

# Generate client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## Pricing Strategy

### Credit Packages
- **Starter**: $9.99 for 100 credits
- **Creator**: $19.99 for 250 credits (bonus 50)
- **Professional**: $39.99 for 600 credits (bonus 100)

### Subscription Plans
- **Free**: 10 credits/month
- **Pro**: $19.99/month - 500 credits + unlimited basic features
- **Premium**: $49.99/month - Unlimited credits + priority processing

## Performance Optimizations

### 1. Image Optimization
- Use Next.js Image component for optimal loading
- Implement progressive image enhancement
- CDN integration for global delivery

### 2. Caching Strategy
- Redis for session and temporary data
- Next.js static generation for public pages
- Edge caching for API responses

### 3. Rate Limiting
```typescript
// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1h"), // 10 requests per hour
  analytics: true,
});
```

## Security Considerations

### 1. Input Validation
- Sanitize all user inputs
- Validate image file types and sizes
- Implement CSRF protection

### 2. Authentication
- Secure session management
- OAuth integration best practices
- JWT token handling

### 3. API Security
- Rate limiting per user/IP
- Request validation middleware
- Secure webhook verification

## Testing Strategy

### 1. Unit Tests
```typescript
// tests/lib/credits.test.ts
import { deductCredits, addCredits } from "@/lib/credits";

describe("Credits System", () => {
  it("should deduct credits correctly", async () => {
    // Test implementation
  });
  
  it("should prevent negative credits", async () => {
    // Test implementation
  });
});
```

### 2. Integration Tests
- API endpoint testing
- Database operation testing
- Stripe webhook testing

### 3. E2E Tests
- User registration flow
- Image generation process
- Payment processing

## Deployment Checklist

### Pre-deployment
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Stripe webhooks configured
- [ ] Domain and SSL setup
- [ ] CDN configuration

### Post-deployment
- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Backup strategy implemented
- [ ] Analytics tracking active

## Monitoring & Analytics

### Error Tracking
- Sentry integration for error monitoring
- Custom error boundaries
- API error logging

### Performance Monitoring
- Vercel Analytics for page performance
- Database query optimization
- API response time tracking

### Business Metrics
- User registration and retention
- Credit usage patterns
- Revenue tracking
- Feature usage analytics

## Future Enhancements

### Phase 2 Features
- Video generation capabilities
- 3D model creation
- Advanced image editing tools
- Collaborative workspaces

### Phase 3 Features
- Mobile applications
- API for third-party developers
- Marketplace for user-generated content
- Advanced AI model training

## Resources & Documentation

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Fal AI Docs](https://docs.fal.ai)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Stripe Docs](https://stripe.com/docs)

### Community Resources
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Fal AI Discord](https://discord.gg/fal-ai)
- [shadcn/ui GitHub](https://github.com/shadcn-ui/ui)

This guide provides a comprehensive foundation for building your imgentic.ai clone. The tech stack is modern, scalable, and follows current best practices. Start with the core features and gradually add more advanced functionality based on user feedback and business needs.