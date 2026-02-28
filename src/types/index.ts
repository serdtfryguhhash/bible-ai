export type Denomination = "catholic" | "protestant" | "nondenominational" | "orthodox";

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  denomination: Denomination;
  subscription_tier: "free" | "faithful" | "disciple";
  stripe_customer_id?: string;
  streak_count: number;
  longest_streak: number;
  total_entries: number;
  created_at: string;
  updated_at: string;
  onboarding_completed: boolean;
  church_id?: string;
  referral_code: string;
  timezone: string;
  daily_reminder_time?: string;
  notification_preferences: NotificationPreferences;
}

export interface NotificationPreferences {
  daily_devotional: boolean;
  prayer_reminders: boolean;
  community_updates: boolean;
  newsletter_weekly: boolean;
  newsletter_daily_verse: boolean;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  date: string;
  encrypted_content: string;
  mood?: "grateful" | "joyful" | "peaceful" | "struggling" | "seeking" | "hopeful" | "sorrowful" | "anxious";
  tags: string[];
  scripture_references: string[];
  word_count: number;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface Devotional {
  id: string;
  user_id?: string;
  journal_entry_id?: string;
  title: string;
  scripture_reference: string;
  scripture_text: string;
  reflection: string;
  prayer_prompt: string;
  action_step: string;
  denomination_context: Denomination;
  theme: string;
  date: string;
  is_public: boolean;
  likes_count: number;
  created_at: string;
}

export interface PrayerRequest {
  id: string;
  user_id: string;
  encrypted_content: string;
  category: PrayerCategory;
  status: "active" | "answered" | "ongoing";
  is_confession: boolean;
  is_public: boolean;
  answered_date?: string;
  answered_note?: string;
  pray_count: number;
  auto_delete_at?: string;
  created_at: string;
  updated_at: string;
}

export type PrayerCategory =
  | "health"
  | "family"
  | "work"
  | "relationships"
  | "spiritual_growth"
  | "financial"
  | "guidance"
  | "gratitude"
  | "world"
  | "other";

export interface ConfessionEntry {
  id: string;
  user_id: string;
  doubly_encrypted_content: string;
  denomination: Denomination;
  guidance_response?: string;
  auto_delete_at: string;
  created_at: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration_days: number;
  category: "gospel" | "wisdom" | "prophets" | "epistles" | "whole_bible" | "topical";
  difficulty: "beginner" | "intermediate" | "advanced";
  cover_image?: string;
  readings: PlanReading[];
  participants_count: number;
  created_at: string;
}

export interface PlanReading {
  day: number;
  title: string;
  scripture_references: string[];
  commentary: string;
  reflection_question: string;
}

export interface UserReadingProgress {
  id: string;
  user_id: string;
  plan_id: string;
  current_day: number;
  completed_days: number[];
  started_at: string;
  completed_at?: string;
  streak_count: number;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  type: "devotional" | "testimony" | "prayer" | "discussion";
  title: string;
  content: string;
  scripture_reference?: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  church_id?: string;
  created_at: string;
}

export interface CommunityComment {
  id: string;
  post_id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  likes_count: number;
  created_at: string;
}

export interface Church {
  id: string;
  name: string;
  denomination: Denomination;
  pastor_name: string;
  admin_user_id: string;
  member_count: number;
  subscription_plan: "basic" | "premium";
  address?: string;
  website?: string;
  logo_url?: string;
  created_at: string;
}

export interface Product {
  id: string;
  shopify_id: string;
  title: string;
  description: string;
  price: number;
  compare_at_price?: number;
  images: string[];
  category: "journals" | "apparel" | "art" | "accessories";
  variants: ProductVariant[];
  in_stock: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  available: boolean;
  option1?: string;
  option2?: string;
}

export interface Order {
  id: string;
  user_id: string;
  shopify_order_id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  tracking_number?: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  variant_id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  tier: "faithful" | "disciple";
  status: "active" | "past_due" | "cancelled" | "trialing";
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  referral_code: string;
  reward_claimed: boolean;
  created_at: string;
}

export interface ScripturePassage {
  reference: string;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end?: number;
  text: string;
  translation: string;
}

export interface AIDevotionalRequest {
  journal_content: string;
  denomination: Denomination;
  mood?: string;
  preferred_themes?: string[];
}

export interface AIDevotionalResponse {
  title: string;
  scripture_reference: string;
  scripture_text: string;
  reflection: string;
  prayer_prompt: string;
  action_step: string;
  theme: string;
}

export interface DailyVerse {
  reference: string;
  text: string;
  theme: string;
  date: string;
}
