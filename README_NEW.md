# Palett AI - Advanced AI Image Generation Platform

A comprehensive AI image generation platform built with Next.js 15, featuring multiple AI models (FLUX, Imagen 4, Ideogram) and a credit-based system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Environment variables (see below)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/palett"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-id" 
   GITHUB_SECRET="your-github-secret"
   
   # AI Provider
   FAL_KEY="your-fal-ai-key"
   ```

3. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`

## 🎯 Features

### ✅ Implemented
- **Authentication**: Google, GitHub, email magic links
- **Landing Page**: Professional marketing site with pricing
- **Dashboard**: Complete user interface with sidebar navigation
- **Image Generation**: Advanced form with model selection and settings
- **Gallery**: Image management with detailed metadata
- **Credit System**: Pay-per-use model with credit tracking
- **Responsive Design**: Mobile-first with dark/light theme
- **Settings & Billing**: User management and subscription pages

### 🔄 Ready for Enhancement
- Actual Fal AI integration (needs API key setup)
- Stripe payment processing (infrastructure ready)
- Image editing tools (UI implemented)
- Image upscaling (UI implemented)

## 🏗 Architecture

### Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v5
- **AI Provider**: Fal AI
- **Payments**: Stripe (ready for integration)

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   ├── api/              # API routes
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components
│   └── ...              # Feature components
├── lib/                 # Utilities and configurations
│   ├── auth.ts         # NextAuth configuration
│   ├── db.ts           # Prisma client
│   ├── fal.ts          # Fal AI integration
│   └── ...             # Other utilities
└── types/              # TypeScript definitions
```

## 💳 Credit System

### Pricing
- **Free**: 10 credits included
- **Starter Pack**: $9.99 for 100 credits
- **Creator Pack**: $19.99 for 250 credits (+50 bonus)
- **Professional Pack**: $39.99 for 600 credits (+100 bonus)

### Subscriptions
- **Pro**: $19.99/month for 500 monthly credits
- **Premium**: $49.99/month for unlimited credits

### Credit Costs
- Text-to-image: 1 credit
- Image-to-image: 2 credits
- Upscaling: 1 credit
- Background removal: 1 credit

## 🎨 AI Models

### Supported Models
- **FLUX Dev**: Fast, high-quality generation (1 credit)
- **FLUX Pro**: Premium quality (2 credits)
- **Imagen 4**: Google's latest model (2 credits)
- **Ideogram v3**: Excellent for text and graphics (1 credit)

### Image Sizes
- Square HD (1024×1024)
- Landscape 4:3 (1024×768)
- Landscape 16:9 (1024×576)
- Portrait 4:3 (768×1024)
- Portrait 16:9 (576×1024)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands
- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes
- `npx prisma migrate dev` - Create new migration

## 🚀 Deployment

Ready for deployment on:
- **Vercel** (recommended)
- **Railway**
- **Digital Ocean**
- Any Node.js hosting platform

### Environment Setup
1. Set up PostgreSQL database
2. Configure OAuth apps (Google, GitHub)
3. Get Fal AI API key
4. Set up Stripe (optional)
5. Deploy with environment variables

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Please feel free to submit issues and enhancement requests.

---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.**