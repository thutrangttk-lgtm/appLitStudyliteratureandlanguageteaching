-- ============================================================================
-- SUPABASE POSTGRES SCHEMA & RLS SECURITY POLICIES (IDEMPOTENT & SAFE)
-- App: Literature and Language Teaching Master's Learning Hub
-- Target Storage Bucket: appLitStudyliteratureandlanguageteaching
-- Instructor / Admin: Ms. Trần Thị Thu Trang
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector"; -- Vector support for PDF chunk embeddings (pgvector)

-- ----------------------------------------------------------------------------
-- 1. USER PROFILES & ROLE-BASED ACCESS CONTROL (RBAC)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
    avatar_url TEXT,
    program TEXT DEFAULT 'Master of Arts in Literature & Language Teaching',
    cohort TEXT DEFAULT 'CHTA.HCE2608',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin or teacher
CREATE OR REPLACE FUNCTION public.is_admin_or_teacher(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_uuid AND role IN ('admin', 'teacher')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles RLS Policies
DROP POLICY IF EXISTS "Public profile reading for authenticated users" ON public.profiles;
CREATE POLICY "Public profile reading for authenticated users"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update any profile role" ON public.profiles;
CREATE POLICY "Admins can update any profile role"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (public.is_admin_or_teacher(auth.uid()));

-- Automatically create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Ms. Trần Thị Thu Trang'),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ----------------------------------------------------------------------------
-- 2. PRIVATE STORAGE POLICIES FOR BUCKET: appLitStudyliteratureandlanguageteaching
-- ----------------------------------------------------------------------------

-- Ensure storage bucket configuration exists for appLitStudyliteratureandlanguageteaching without recreating or deleting data
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'appLitStudyliteratureandlanguageteaching',
    'appLitStudyliteratureandlanguageteaching',
    false, -- Private bucket as required
    104857600, -- 100MB limit
    ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET public = false;

-- RLS Policy 1: Authenticated Students/Teachers can read PDF objects from appLitStudyliteratureandlanguageteaching bucket
DROP POLICY IF EXISTS "Authenticated users can read PDFs from appLitStudyliteratureandlanguageteaching" ON storage.objects;
CREATE POLICY "Authenticated users can read PDFs from appLitStudyliteratureandlanguageteaching"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'appLitStudyliteratureandlanguageteaching');

-- RLS Policy 2: Admin/Teacher can upload PDF files into appLitStudyliteratureandlanguageteaching bucket
DROP POLICY IF EXISTS "Admins/Teachers can upload PDFs to appLitStudyliteratureandlanguageteaching" ON storage.objects;
CREATE POLICY "Admins/Teachers can upload PDFs to appLitStudyliteratureandlanguageteaching"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'appLitStudyliteratureandlanguageteaching'
        AND public.is_admin_or_teacher(auth.uid())
    );

-- RLS Policy 3: Admin/Teacher can update or delete PDF files in appLitStudyliteratureandlanguageteaching bucket
DROP POLICY IF EXISTS "Admins/Teachers can modify/delete PDFs in appLitStudyliteratureandlanguageteaching" ON storage.objects;
CREATE POLICY "Admins/Teachers can modify/delete PDFs in appLitStudyliteratureandlanguageteaching"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'appLitStudyliteratureandlanguageteaching'
        AND public.is_admin_or_teacher(auth.uid())
    );

DROP POLICY IF EXISTS "Admins/Teachers can delete PDFs in appLitStudyliteratureandlanguageteaching" ON storage.objects;
CREATE POLICY "Admins/Teachers can delete PDFs in appLitStudyliteratureandlanguageteaching"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'appLitStudyliteratureandlanguageteaching'
        AND public.is_admin_or_teacher(auth.uid())
    );


-- ----------------------------------------------------------------------------
-- 3. GLOBAL APP BRANDING SETTINGS (app_settings)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instructor_name TEXT NOT NULL DEFAULT 'Ms. Trần Thị Thu Trang',
    instructor_title TEXT NOT NULL DEFAULT 'Master of English Language Teaching & Pedagogy Specialist',
    admin_photo_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    school_info TEXT NOT NULL DEFAULT 'Hanoi University of Education - Department of English Pedagogy (CHTA.HCE2608)',
    program_name TEXT NOT NULL DEFAULT 'Master of Arts in Literature & Language Teaching (MA ELT)',
    copyright_notice TEXT NOT NULL DEFAULT '© 2026 Ms. Trần Thị Thu Trang - Literature & Language Teaching Master''s Learning Hub. All rights reserved.',
    storage_bucket_name TEXT NOT NULL DEFAULT 'appLitStudyliteratureandlanguageteaching',
    pdf_service_authenticated BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read app_settings" ON public.app_settings;
CREATE POLICY "Public read app_settings"
    ON public.app_settings FOR SELECT
    TO authenticated, anon
    USING (true);

DROP POLICY IF EXISTS "Admin update app_settings" ON public.app_settings;
CREATE POLICY "Admin update app_settings"
    ON public.app_settings FOR ALL
    TO authenticated
    USING (public.is_admin_or_teacher(auth.uid()));

-- Insert initial settings seed row if empty
INSERT INTO public.app_settings (instructor_name, storage_bucket_name)
SELECT 'Ms. Trần Thị Thu Trang', 'appLitStudyliteratureandlanguageteaching'
WHERE NOT EXISTS (SELECT 1 FROM public.app_settings);


-- ----------------------------------------------------------------------------
-- 4. TEXTBOOK INGESTION & VECTOR RAG FOUNDATION TABLES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.book_chapters (
    id TEXT PRIMARY KEY,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    page_start INTEGER NOT NULL,
    page_end INTEGER NOT NULL,
    description TEXT,
    topics_count INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.book_chapters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read book_chapters" ON public.book_chapters;
CREATE POLICY "Anyone can read book_chapters"
    ON public.book_chapters FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE TABLE IF NOT EXISTS public.book_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id TEXT REFERENCES public.book_chapters(id),
    page_number INTEGER NOT NULL,
    chunk_index INTEGER NOT NULL,
    book_title TEXT DEFAULT 'Literature and Language Teaching: A Guide for Teachers and Trainers',
    author TEXT DEFAULT 'Gillian Lazar',
    year INTEGER DEFAULT 1993,
    excerpt TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    verification_hash TEXT NOT NULL,
    embedding vector(1536), -- Vector embeddings for AI RAG semantic search
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.book_chunks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read book_chunks for RAG" ON public.book_chunks;
CREATE POLICY "Authenticated users can read book_chunks for RAG"
    ON public.book_chunks FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Admin/Teacher can insert/update book_chunks" ON public.book_chunks;
CREATE POLICY "Admin/Teacher can insert/update book_chunks"
    ON public.book_chunks FOR ALL
    TO authenticated
    USING (public.is_admin_or_teacher(auth.uid()));


-- ----------------------------------------------------------------------------
-- 5. PARTICIPANT ACTIVITY & STUDY SESSION AUDITING
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    duration_minutes INTEGER DEFAULT 0,
    active_feature TEXT NOT NULL,
    device_info TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users insert own study_sessions" ON public.study_sessions;
CREATE POLICY "Users insert own study_sessions"
    ON public.study_sessions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own sessions or Admin views all" ON public.study_sessions;
CREATE POLICY "Users view own sessions or Admin views all"
    ON public.study_sessions FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id OR public.is_admin_or_teacher(auth.uid()));

CREATE TABLE IF NOT EXISTS public.learning_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.learning_activity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users log learning_activity" ON public.learning_activity;
CREATE POLICY "Users log learning_activity"
    ON public.learning_activity FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own activity or Admin views all" ON public.learning_activity;
CREATE POLICY "Users view own activity or Admin views all"
    ON public.learning_activity FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id OR public.is_admin_or_teacher(auth.uid()));


-- ----------------------------------------------------------------------------
-- 6. PRIVATE PARTICIPANT WORKSPACE (Notes, Writing Drafts, Review Attempts)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.private_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    lesson_title TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.private_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict user isolation for private_notes" ON public.private_notes;
CREATE POLICY "Strict user isolation for private_notes"
    ON public.private_notes FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.writing_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    prompt_id TEXT NOT NULL,
    title TEXT NOT NULL,
    current_content TEXT NOT NULL,
    target_word_count INTEGER DEFAULT 800,
    versions JSONB DEFAULT '[]'::jsonb,
    ai_feedback JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.writing_drafts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Strict user isolation for writing_drafts" ON public.writing_drafts;
CREATE POLICY "Strict user isolation for writing_drafts"
    ON public.writing_drafts FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.review_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    type TEXT NOT NULL,
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    confidence TEXT DEFAULT 'medium',
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.review_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own review_attempts or Admin reads all" ON public.review_attempts;
CREATE POLICY "Users manage own review_attempts or Admin reads all"
    ON public.review_attempts FOR ALL
    TO authenticated
    USING (auth.uid() = user_id OR public.is_admin_or_teacher(auth.uid()));

-- ============================================================================
-- END OF IDEMPOTENT SCHEMA DEFINITION
-- ============================================================================
