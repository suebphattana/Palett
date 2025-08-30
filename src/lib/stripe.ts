import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const CREDIT_PACKAGES = {
  STARTER: {
    credits: 100,
    price: 999, // $9.99 in cents
    priceId: 'price_starter',
  },
  CREATOR: {
    credits: 250,
    price: 1999, // $19.99 in cents
    bonus: 50,
    priceId: 'price_creator',
  },
  PROFESSIONAL: {
    credits: 600,
    price: 3999, // $39.99 in cents
    bonus: 100,
    priceId: 'price_professional',
  },
} as const;

export const SUBSCRIPTION_PLANS = {
  PRO: {
    credits: 500,
    price: 1999, // $19.99/month
    priceId: 'price_pro_monthly',
  },
  PREMIUM: {
    credits: -1, // unlimited
    price: 4999, // $49.99/month
    priceId: 'price_premium_monthly',
  },
} as const;