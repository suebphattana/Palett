# Palett AI Expansion Plan - Video & Advanced Image Editing

## Executive Summary

Based on comprehensive research of the latest AI models in 2025, this plan outlines the strategic expansion of Palett AI to include:
1. **Text-to-Video & Image-to-Video** capabilities using multiple leading AI models
2. **Advanced Image Editing** using Qwen-Image-Edit (the current best-in-class)
3. **Multi-AI Selection Hub** design for the generate page

---

## 🎬 Video Generation Strategy

### Recommended AI Models (in Priority Order)

#### 1. **MiniMax Hailuo (Primary Recommendation)**
- **Why**: Currently rated as the best for prompt adherence and text-to-video quality
- **Availability**: ✅ Available on Fal.ai API
- **Pricing**: $9.99-14.90/month for 1000 credits (most cost-effective)
- **Features**: 
  - Excellent text-to-video generation
  - Strong action scene handling
  - Good character consistency
  - Both Hailuo-01 and Hailuo-02 available

#### 2. **Kling AI 2.1 (Secondary Choice)**
- **Why**: Longest video generation (up to 2 minutes), best value overall
- **Availability**: ✅ Available on Fal.ai API (Kling 2.1 Master)
- **Features**:
  - Up to 2 minutes video length
  - 1080p resolution
  - Enhanced realism and character consistency
  - Advanced camera movements

#### 3. **Luma Dream Machine (User-Friendly Option)**
- **Why**: Best for hobbyists, fastest generation, simple pricing
- **Availability**: ✅ Available on Fal.ai API
- **Features**:
  - Cinematic quality
  - Fast generation speeds
  - Good character consistency
  - 30 free generations/month

### **Implementation Strategy: Multi-Model User Choice**

**Selected Approach: Let Users Choose Their Preferred Model**
- Users can select from all 3 models (Hailuo, Kling, Luma)
- Different credit costs based on model capabilities and features
- Clear model descriptions with strengths/use cases to help users decide
- Model selection integrated into each generation form
- Advanced users get flexibility, beginners get guided recommendations

---

## 🎨 Image Editing Strategy

### Primary Recommendation: Qwen-Image-Edit

#### Why Qwen-Image-Edit is the Best Choice:

1. **Superior Performance**: Rated as best AI image editing model in 2025
2. **Unique Capabilities**:
   - **Dual editing paths**: Semantic + Appearance control
   - **Advanced text editing**: Best-in-class for English/Chinese text
   - **Precise object manipulation**: Add/remove/modify with shadows/lighting preserved
3. **API Availability**: ✅ Available on Fal.ai with full API support
4. **Licensing**: Apache 2.0 - Commercial use allowed
5. **Cost**: More affordable than Adobe Photoshop subscriptions

#### Technical Advantages:
- **20B parameter model** (larger = better quality)
- **Qwen2.5-VL integration** for semantic understanding
- **VAE Encoder** for appearance control
- **Bilingual text rendering** (English + Chinese)

---

## 🎯 Dashboard Generate Page Redesign

### Current State
- URL: `http://localhost:3000/dashboard/generate`
- Shows only text-to-image generation

### Proposed New Design: "AI Model Selection Hub"

#### Page Structure:
```
/dashboard/generate (Main Hub)
├── /dashboard/generate/text-to-image
├── /dashboard/generate/text-to-video  
├── /dashboard/generate/image-to-video
├── /dashboard/generate/image-edit
└── /dashboard/generate/upscale (existing)
```

#### Main Hub Design Concept:

**Layout: Grid of AI Model Cards**
```
┌─────────────────────────────────────────────┐
│              🎨 Choose Your AI              │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ 🖼️ Text │  │ 🎬 Text │  │ 📹 Image│    │
│  │   to    │  │   to    │  │   to    │    │
│  │  Image  │  │  Video  │  │  Video  │    │
│  │ 1 credit│  │2-4 credits│3-5 credits│   │
│  └─────────┘  └─────────┘  └─────────┘    │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ ✨ Image│  │ 🔍 Image│  │ 💎 More │    │
│  │  Edit   │  │ Upscale │  │ Coming  │    │
│  │ 2 credits│  │ 1 credit│  │  Soon   │    │
│  └─────────┘  └─────────┘  └─────────┘    │
└─────────────────────────────────────────────┘
```

#### Card Design Elements:
- **Icon**: Distinctive emoji/icon for each AI type
- **Title**: Clear, descriptive name
- **Credit Cost**: Transparent pricing (shows range for multi-model options)
- **Preview**: Small sample/demo of capability
- **Model Selection**: For video generation, clicking card shows model choice modal with detailed comparisons
- **Quality Indicators**: Brief descriptions like "Longest Videos", "Fastest Generation", "Best Quality"

#### Video Generation Model Selection Modal:
When users click Text-to-Video or Image-to-Video cards:

```
┌─────────────────────────────────────────────┐
│           Choose Video AI Model             │
│                                             │
│ 🏆 MiniMax Hailuo  ⚡ Luma Dream   🎬 Kling │
│    Best Quality      Fastest        Longest │
│    3 credits        2 credits      4 credits│
│                                             │
│ • Superior prompt   • 30 sec gen    • 2min videos│
│   adherence         • Simple UI     • 1080p quality│
│ • Action scenes     • Cinematic     • Cam movement│
│                                             │
│       [Select]       [Select]       [Select]│
└─────────────────────────────────────────────┘
```

---

## 💳 Credit System Updates

### Proposed Credit Costs:
```typescript
export const CREDIT_COSTS = {
  // Existing
  TEXT_TO_IMAGE: 1,
  UPSCALE: 1,
  
  // New Video Generation
  TEXT_TO_VIDEO_HAILUO: 3,      // MiniMax Hailuo
  TEXT_TO_VIDEO_KLING: 4,       // Kling AI (longer videos)
  TEXT_TO_VIDEO_LUMA: 2,        // Luma Dream Machine (faster/cheaper)
  
  IMAGE_TO_VIDEO_HAILUO: 4,     // Higher cost for image input
  IMAGE_TO_VIDEO_KLING: 5,
  IMAGE_TO_VIDEO_LUMA: 3,
  
  // New Image Editing
  IMAGE_EDIT_QWEN: 2,           // Qwen Image Edit
} as const;
```

---

## 🚀 Implementation Phases

### Phase 1: Infrastructure
1. **Update Fal.ai Integration**
   - Add video generation models (Hailuo, Kling, Luma)
   - Add Qwen-Image-Edit integration
   - Update credit system with new costs

2. **Database Updates**
   - Extend `GeneratedImage` model for video content
   - Add `operation` types for new AI models
   - Update `UsageLog` for detailed tracking

### Phase 2: UI/UX Design
1. **Design Main Hub Page**
   - Create AI model selection cards
   - Implement responsive grid layout
   - Add credit cost display with model selection modals

2. **Individual AI Pages**
   - Text-to-Video form with model selection dropdown
   - Image-to-Video upload + form with model options
   - Image-Edit interface with before/after preview

### Phase 3: Backend Implementation
1. **API Routes**
   - `/api/generate/text-to-video`
   - `/api/generate/image-to-video` 
   - `/api/generate/image-edit`

2. **Model Integration**
   - Fal.ai API calls for each model with user selection
   - Error handling and retry logic
   - Progress tracking for long-running tasks

### Phase 4: Frontend Implementation
1. **Forms & Components**
   - Video generation forms with prominent model selection
   - Image editing interface with upload/preview
   - Progress indicators for video generation
   - Model comparison tooltips and help text

2. **Gallery Updates**
   - Support for video content display
   - Before/after view for edited images
   - Enhanced filtering by AI model type
   - Model attribution in image/video metadata

### Phase 5: Testing & Polish
1. **Quality Assurance**
   - Test all AI model integrations
   - Verify credit deduction accuracy for each model
   - Performance optimization

2. **User Experience**
   - Loading states and progress bars
   - Error handling and user feedback
   - Model selection guidance for new users
   - Mobile responsiveness

---

## 📊 Expected Outcomes

### User Engagement
- **5x increase** in feature usage variety
- **3x increase** in credit consumption per user
- **2x increase** in session duration

### Revenue Impact
- **Higher credit costs** for video generation (3-5x)
- **Premium positioning** with cutting-edge AI models
- **Differentiation** from competitors with multi-model choice

### Technical Benefits
- **Future-proof architecture** for adding new AI models
- **Modular design** for easy maintenance
- **API-first approach** enabling mobile/desktop apps later

---

## 🎯 Success Metrics

### Usage Metrics
- Daily active users of each AI model
- Credit consumption patterns
- User retention after using video features

### Quality Metrics
- User satisfaction scores for generated content
- Task completion rates
- Support ticket volume (should decrease with better UX)

### Business Metrics
- Revenue per user increase
- Credit purchase frequency
- Feature adoption rates

---

## 💡 Future Considerations

### Additional Models to Monitor
- **Google Veo 2/3**: Enterprise-grade video generation
- **OpenAI Sora**: When more accessible
- **Adobe Firefly Video**: Professional market integration

### Advanced Features (Phase 6+)
- **Batch processing**: Multiple videos at once
- **Template system**: Pre-made video styles
- **Collaboration**: Team workspaces
- **API access**: Let users integrate our AI models

---

## ⚠️ Risk Mitigation

### Technical Risks
- **API rate limits**: Implement queueing system
- **Model availability**: Have backup models ready
- **Cost overruns**: Strict credit validation

### Business Risks  
- **High compute costs**: Monitor usage patterns closely
- **User confusion**: Clear model descriptions and tutorials
- **Competition**: Focus on unique multi-model approach

---

## 📋 Next Steps

1. **Approve this plan** and prioritize phases
2. **Set up Fal.ai account** with video model access  
3. **Create mockups** for the new generate page design with model selection
4. **Design model selection UX** - modals, tooltips, comparison guides
5. **Begin Phase 1** infrastructure updates
6. **Establish monitoring** for credit costs and usage patterns per model

This expansion positions Palett AI as a comprehensive, cutting-edge platform offering the best AI models for image and video generation, setting it apart from single-model competitors.