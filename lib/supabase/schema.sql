-- SkillForge AI Postgres Schema for Supabase

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  career_goal TEXT,
  resume_file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Resume Data Table
CREATE TABLE IF NOT EXISTS public.resume_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  raw_text TEXT,
  structured_skills JSONB NOT NULL,
  experience_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Skill Gaps Table
CREATE TABLE IF NOT EXISTS public.skill_gaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  target_role TEXT NOT NULL,
  match_percentage INTEGER NOT NULL,
  gaps JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Roadmaps Table (Flagship Data)
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_goal TEXT NOT NULL,
  total_weeks INTEGER NOT NULL,
  roadmap_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Roadmap Progress Table
CREATE TABLE IF NOT EXISTS public.roadmap_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  step_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, roadmap_id, step_id)
);

-- 6. Project Suggestions Table
CREATE TABLE IF NOT EXISTS public.project_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  suggestions JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Interview Prep Table
CREATE TABLE IF NOT EXISTS public.interview_prep (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  questions JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_prep ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own data
CREATE POLICY "Users can manage their profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage their resume_data" ON public.resume_data FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their skill_gaps" ON public.skill_gaps FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their roadmaps" ON public.roadmaps FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their roadmap_progress" ON public.roadmap_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their project_suggestions" ON public.project_suggestions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their interview_prep" ON public.interview_prep FOR ALL USING (auth.uid() = user_id);
