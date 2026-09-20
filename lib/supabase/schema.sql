-- ==============================================================================
-- CHOTAPLAY MASTER DATABASE SCHEMA & SEEDING (PostgreSQL / Supabase)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CORE TABLES

-- Teachers table (links to Supabase Auth, no password stored here)
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Children profile table (V1 Parent flow: session/profile-based, NO password)
CREATE TABLE IF NOT EXISTS public.children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    external_kid_id TEXT NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 2 AND age <= 8),
    gender TEXT NOT NULL CHECK (gender IN ('boy', 'girl')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes / Grade levels
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL CHECK (slug IN ('lkg', 'ukg', 'first', 'activities', 'explore')),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Topics Catalog
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY,
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    index_num INTEGER NOT NULL,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    has_game BOOLEAN NOT NULL DEFAULT true,
    is_unlocked_default BOOLEAN NOT NULL DEFAULT false,
    unlocks_next_topic_id TEXT REFERENCES public.topics(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos table
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id TEXT UNIQUE REFERENCES public.topics(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    duration_seconds NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Games table
CREATE TABLE IF NOT EXISTS public.games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id TEXT UNIQUE REFERENCES public.topics(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Topic Completions (Server-authoritative progression)
CREATE TABLE IF NOT EXISTS public.topic_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
    video_completed_at TIMESTAMP WITH TIME ZONE,
    game_completed_at TIMESTAMP WITH TIME ZONE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(child_id, topic_id)
);

-- Game Sessions (Single-use tokens for completion gating)
CREATE TABLE IF NOT EXISTS public.game_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 3. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;

-- Public read for catalog
CREATE POLICY "Public classes read" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Public topics read" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public videos read" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public games read" ON public.games FOR SELECT USING (true);

-- Teacher policies
CREATE POLICY "Teachers can read own profile" ON public.teachers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Teachers can update own profile" ON public.teachers FOR UPDATE USING (auth.uid() = id);

-- Progression and session access policies
CREATE POLICY "Children can read own completions" ON public.topic_completions FOR SELECT USING (true);
CREATE POLICY "Children can insert/update completions" ON public.topic_completions FOR ALL USING (true);
CREATE POLICY "Children can manage game sessions" ON public.game_sessions FOR ALL USING (true);
CREATE POLICY "Allow child profile creation" ON public.children FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow child profile read" ON public.children FOR SELECT USING (true);
