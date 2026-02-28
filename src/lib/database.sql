-- Bible.ai Database Schema for Supabase (PostgreSQL)

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  denomination TEXT NOT NULL DEFAULT 'nondenominational' CHECK (denomination IN ('catholic', 'protestant', 'nondenominational', 'orthodox')),
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'faithful', 'disciple')),
  stripe_customer_id TEXT,
  streak_count INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  total_entries INTEGER NOT NULL DEFAULT 0,
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  church_id UUID REFERENCES churches(id),
  referral_code TEXT UNIQUE NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  daily_reminder_time TIME,
  notification_preferences JSONB NOT NULL DEFAULT '{"daily_devotional": true, "prayer_reminders": true, "community_updates": true, "newsletter_weekly": true, "newsletter_daily_verse": true}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Journal Entries (encrypted content)
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  encrypted_content TEXT NOT NULL,
  mood TEXT CHECK (mood IN ('grateful', 'joyful', 'peaceful', 'struggling', 'seeking', 'hopeful', 'sorrowful', 'anxious')),
  tags TEXT[] DEFAULT '{}',
  scripture_references TEXT[] DEFAULT '{}',
  word_count INTEGER NOT NULL DEFAULT 0,
  is_private BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Devotionals
CREATE TABLE IF NOT EXISTS devotionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  journal_entry_id UUID REFERENCES journal_entries(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  scripture_reference TEXT NOT NULL,
  scripture_text TEXT NOT NULL,
  reflection TEXT NOT NULL,
  prayer_prompt TEXT NOT NULL,
  action_step TEXT NOT NULL,
  denomination_context TEXT NOT NULL DEFAULT 'nondenominational',
  theme TEXT NOT NULL,
  date DATE NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prayer Requests (encrypted content)
CREATE TABLE IF NOT EXISTS prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  encrypted_content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('health', 'family', 'work', 'relationships', 'spiritual_growth', 'financial', 'guidance', 'gratitude', 'world', 'other')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'answered', 'ongoing')),
  is_confession BOOLEAN NOT NULL DEFAULT FALSE,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  answered_date TIMESTAMPTZ,
  answered_note TEXT,
  pray_count INTEGER NOT NULL DEFAULT 0,
  auto_delete_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Confession Entries (doubly encrypted, auto-delete)
CREATE TABLE IF NOT EXISTS confession_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doubly_encrypted_content TEXT NOT NULL,
  denomination TEXT NOT NULL,
  guidance_response TEXT,
  auto_delete_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reading Plans
CREATE TABLE IF NOT EXISTS reading_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('gospel', 'wisdom', 'prophets', 'epistles', 'whole_bible', 'topical')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  cover_image TEXT,
  readings JSONB NOT NULL DEFAULT '[]',
  participants_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Reading Progress
CREATE TABLE IF NOT EXISTS user_reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES reading_plans(id) ON DELETE CASCADE,
  current_day INTEGER NOT NULL DEFAULT 1,
  completed_days INTEGER[] DEFAULT '{}',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  streak_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, plan_id)
);

-- Community Posts
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  type TEXT NOT NULL CHECK (type IN ('devotional', 'testimony', 'prayer', 'discussion')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  scripture_reference TEXT,
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  church_id UUID REFERENCES churches(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Community Comments
CREATE TABLE IF NOT EXISTS community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Churches
CREATE TABLE IF NOT EXISTS churches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  denomination TEXT NOT NULL,
  pastor_name TEXT NOT NULL,
  admin_user_id UUID NOT NULL REFERENCES users(id),
  member_count INTEGER NOT NULL DEFAULT 0,
  subscription_plan TEXT NOT NULL DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'premium')),
  address TEXT,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('faithful', 'disciple')),
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'cancelled', 'trialing')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Referrals
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id),
  referred_id UUID NOT NULL REFERENCES users(id),
  referral_code TEXT NOT NULL,
  reward_claimed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE confession_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own profile
CREATE POLICY users_own ON users FOR ALL USING (auth.uid() = id);

-- Journal entries are private
CREATE POLICY journal_own ON journal_entries FOR ALL USING (auth.uid() = user_id);

-- Prayer requests: own or public
CREATE POLICY prayer_own ON prayer_requests FOR ALL USING (auth.uid() = user_id OR is_public = TRUE);

-- Confession entries are strictly private
CREATE POLICY confession_own ON confession_entries FOR ALL USING (auth.uid() = user_id);

-- Devotionals: own or public
CREATE POLICY devotional_access ON devotionals FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);
CREATE POLICY devotional_own ON devotionals FOR INSERT USING (auth.uid() = user_id);
CREATE POLICY devotional_update ON devotionals FOR UPDATE USING (auth.uid() = user_id);

-- Community posts are public for reading
CREATE POLICY posts_read ON community_posts FOR SELECT USING (TRUE);
CREATE POLICY posts_own ON community_posts FOR INSERT USING (auth.uid() = user_id);
CREATE POLICY posts_update ON community_posts FOR UPDATE USING (auth.uid() = user_id);

-- Auto-delete confession entries (run via cron job)
-- SELECT cron.schedule('delete-expired-confessions', '0 */6 * * *', 'DELETE FROM confession_entries WHERE auto_delete_at < NOW()');

-- Indexes for performance
CREATE INDEX idx_journal_user_date ON journal_entries(user_id, date);
CREATE INDEX idx_prayer_user_status ON prayer_requests(user_id, status);
CREATE INDEX idx_devotional_date ON devotionals(date);
CREATE INDEX idx_community_type ON community_posts(type, created_at DESC);
CREATE INDEX idx_reading_progress ON user_reading_progress(user_id, plan_id);
CREATE INDEX idx_confession_auto_delete ON confession_entries(auto_delete_at);
