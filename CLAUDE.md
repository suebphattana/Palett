# Palett AI - AI Image Generation Platform

**Project name**: Palett AI

## Project Overview

AI image generation and editing platform using Next.js 15, Fal AI, and modern web technologies. Currently implemented basic authentication and dashboard structure.

## Current Implementation Status

### ✅ Completed Features
- **Authentication**: Email/password authentication with NextAuth.js v5
- **Database**: PostgreSQL with Prisma ORM, seeded with test users
- **Dashboard**: Main dashboard layout with sidebar navigation
- **User Management**: Basic user system with credits and roles

### 🚧 In Development
- **Image Generation**: Text-to-image using Fal AI models (FLUX, Imagen 4, Ideogram)
- **Gallery**: User image collection and management
- **Credit System**: Pay-per-use model for API calls

### 📋 Next Features
- **Image Editing**: Image-to-image, background removal, upscaling
- **Billing**: Stripe integration for credit purchases
- **Advanced Features**: Batch processing, style transfer

## Tech Stack

- **Framework**: Next.js 15 with App Router, TypeScript
- **Styling**: Tailwind CSS (Slate theme, Light/Dark toggle)
- **UI**: shadcn/ui components, Lucide React icons
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 with credentials provider
- **AI Provider**: Fal AI for image generation
- **Forms**: React Hook Form + Zod validation

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Authentication routes
│   ├── dashboard/        # Protected dashboard pages
│   ├── api/             # API routes
│   └── globals.css
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components (sidebar, etc.)
│   └── image-generation/ # Image generation forms
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   ├── db.ts            # Prisma client
│   ├── fal.ts           # Fal AI integration
│   └── utils.ts         # Utility functions
└── prisma/
    ├── schema.prisma    # Database schema
    └── seed.ts          # Database seeding
```

## Database Configuration

**Connection**: PostgreSQL database using `postgresql://postgres:postgres@localhost:5432/palett`

### Key Models
- **User**: Authentication, credits (default 10), role (admin/user)
- **GeneratedImage**: AI-generated images with metadata
- **Purchase**: Credit purchases via Stripe
- **UsageLog**: Track API usage and costs

### Current Test Users
```
admin@example.com / qwer1234 (Admin, 1000 credits)
user@example.com / test123 (User, 10 credits)
```

## Authentication Setup

**NextAuth.js v5** with credentials provider (email/password)
- Session strategy: JWT
- No Prisma adapter (conflicts with credentials provider)
- Password hashing: bcryptjs

### Login Flow
1. User enters email/password on `/signin`
2. Credentials verified against database
3. JWT session created
4. Redirect to `/dashboard`

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/palett"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI Provider
FAL_KEY="your-fal-key"
```

## Fal AI Integration

### Models Available
```typescript
export const FAL_MODELS = {
  TEXT_TO_IMAGE: {
    FLUX_DEV: "fal-ai/flux/dev",
    FLUX_PRO: "fal-ai/flux-pro/v1.1-ultra", 
    IMAGEN_4: "fal-ai/imagen4/preview",
    IDEOGRAM: "fal-ai/ideogram/v3"
  },
  UPSCALING: {
    CREATIVE_UPSCALE: "fal-ai/creative-upscaler"
  }
} as const;
```

### Credit System
```typescript
export const CREDIT_COSTS = {
  TEXT_TO_IMAGE: 1,
  IMAGE_TO_IMAGE: 2,
  UPSCALE: 1,
  BACKGROUND_REMOVAL: 1
} as const;
```

## Development Commands

```bash
# Development
npm run dev                # Start development server
npm run build             # Build for production
npm run start             # Start production server

# Database
npx prisma generate       # Generate Prisma client
npx prisma db push        # Push schema to database
npm run db:seed           # Seed database with test users
npx prisma studio         # Open database browser

# Linting
npm run lint             # Run ESLint
```

## Known Issues & Solutions

### Database Connection
- **Issue**: "User was denied access on the database" in Next.js
- **Solution**: Ensure both `.env` and `.env.local` have correct `DATABASE_URL`
- **Format**: `postgresql://postgres:postgres@localhost:5432/palett`

### Icon Imports
- **Issue**: "Element type is invalid" for Lucide icons
- **Solution**: Use `Images` instead of `Gallery`, verify all icon imports

### Authentication
- **Current**: Credentials provider only (email/password)
- **Session**: JWT-based, no Prisma adapter
- **Future**: Add Google/GitHub OAuth providers

## Next Priority Tasks

1. **Complete Fal AI Integration** - Implement working image generation
2. **Credit System** - Deduct credits on generation, usage tracking
3. **Gallery Functionality** - Display user's generated images
4. **Error Handling** - Better user feedback and error states
5. **Image Storage** - Save generated images (local/cloud)

## Important Notes

- Use `Images` icon from Lucide React (not `Gallery`)
- Database seeded with admin@example.com / qwer1234
- All API routes require `export const runtime = 'nodejs'`
- Forms use React Hook Form + Zod validation
- UI follows shadcn/ui patterns with Tailwind CSS