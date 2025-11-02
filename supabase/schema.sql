-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  plan VARCHAR(50) DEFAULT 'free' CHECK (plan IN ('free', 'creator', 'pro')),
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create platforms table
CREATE TABLE IF NOT EXISTS public.platforms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform_type VARCHAR(50) NOT NULL CHECK (platform_type IN ('youtube', 'tiktok', 'instagram')),
  platform_user_id VARCHAR(255),
  platform_username VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_synced_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, platform_type)
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_id UUID NOT NULL REFERENCES public.platforms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  subscribers_gained INTEGER DEFAULT 0,
  watch_time_minutes INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(platform_id, date)
);

-- Create content table
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_id UUID NOT NULL REFERENCES public.platforms(id) ON DELETE CASCADE,
  platform_content_id VARCHAR(255),
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(platform_id, platform_content_id)
);

-- Create ai_ideas table
CREATE TABLE IF NOT EXISTS public.ai_ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform_type VARCHAR(50) CHECK (platform_type IN ('youtube', 'tiktok', 'instagram')),
  niche VARCHAR(255),
  idea_title TEXT NOT NULL,
  idea_description TEXT,
  hook TEXT,
  suggested_duration INTEGER,
  status VARCHAR(50) DEFAULT 'saved' CHECK (status IN ('saved', 'in_progress', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partnerships table
CREATE TABLE IF NOT EXISTS public.partnerships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  brand_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  partnership_type VARCHAR(100),
  delivery_date DATE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'paid')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partnership_id UUID NOT NULL REFERENCES public.partnerships(id) ON DELETE CASCADE,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  pdf_url TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage_tracking table
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  feature VARCHAR(100) NOT NULL,
  count INTEGER DEFAULT 1,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, feature, period_start)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_platforms_user_id ON public.platforms(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_platform_date ON public.analytics(platform_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_content_platform_published ON public.content(platform_id, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_ideas_user_created ON public.ai_ideas(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partnerships_user_status ON public.partnerships(user_id, status);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_period ON public.usage_tracking(user_id, period_start);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only read/update their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Platforms policies
CREATE POLICY "Users can view own platforms" ON public.platforms
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own platforms" ON public.platforms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own platforms" ON public.platforms
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own platforms" ON public.platforms
  FOR DELETE USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON public.analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.platforms
      WHERE platforms.id = analytics.platform_id
      AND platforms.user_id = auth.uid()
    )
  );

-- Content policies
CREATE POLICY "Users can view own content" ON public.content
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.platforms
      WHERE platforms.id = content.platform_id
      AND platforms.user_id = auth.uid()
    )
  );

-- AI Ideas policies
CREATE POLICY "Users can manage own ideas" ON public.ai_ideas
  FOR ALL USING (auth.uid() = user_id);

-- Partnerships policies
CREATE POLICY "Users can manage own partnerships" ON public.partnerships
  FOR ALL USING (auth.uid() = user_id);

-- Invoices policies
CREATE POLICY "Users can view own invoices" ON public.invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.partnerships
      WHERE partnerships.id = invoices.partnership_id
      AND partnerships.user_id = auth.uid()
    )
  );

-- Usage tracking policies
CREATE POLICY "Users can view own usage" ON public.usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
