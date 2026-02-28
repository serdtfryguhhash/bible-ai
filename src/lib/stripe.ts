import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion,
  typescript: true,
});

export const PRICING_PLANS = {
  free: {
    name: "Free",
    price: 0,
    interval: null,
    features: [
      "Daily verse & devotional",
      "3 journal entries per week",
      "Basic prayer journal",
      "Scripture search",
      "Community access (read only)",
    ],
    limitations: {
      journal_entries_per_week: 3,
      ai_devotionals_per_week: 1,
      reading_plans: 1,
      prayer_requests: 10,
    },
  },
  faithful: {
    name: "Faithful",
    price: 7.99,
    priceId: process.env.STRIPE_FAITHFUL_PRICE_ID || "price_faithful",
    interval: "month" as const,
    features: [
      "Everything in Free",
      "Unlimited journal entries",
      "AI-powered devotionals daily",
      "Full prayer journal with categories",
      "Confession guide (encrypted)",
      "5 reading plans",
      "Community posting",
      "Weekly newsletter",
    ],
    limitations: {
      journal_entries_per_week: -1,
      ai_devotionals_per_week: 7,
      reading_plans: 5,
      prayer_requests: -1,
    },
  },
  disciple: {
    name: "Disciple",
    price: 19.99,
    priceId: process.env.STRIPE_DISCIPLE_PRICE_ID || "price_disciple",
    interval: "month" as const,
    features: [
      "Everything in Faithful",
      "Unlimited AI devotionals",
      "Scripture deep-dive explanations",
      "Apply to My Life personalization",
      "All reading plans with AI commentary",
      "Church group features",
      "Priority support",
      "Ad-free experience forever",
      "Merch store discounts (15%)",
      "Daily & weekly newsletters",
    ],
    limitations: {
      journal_entries_per_week: -1,
      ai_devotionals_per_week: -1,
      reading_plans: -1,
      prayer_requests: -1,
    },
  },
} as const;

export type PricingTier = keyof typeof PRICING_PLANS;
