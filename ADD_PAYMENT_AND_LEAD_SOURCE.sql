-- ============================================
-- ADD MODE OF PAYMENT AND LEAD SOURCE FIELDS
-- ============================================
-- Run these SQL queries in your Supabase dashboard:
-- Go to SQL Editor → New Query → Copy & Paste → Run

-- ============================================
-- 1. ALTER ESTIMATIONS TABLE
-- ============================================
ALTER TABLE IF EXISTS public.estimations
  ADD COLUMN IF NOT EXISTS mode_of_payment TEXT DEFAULT 'Cash' CHECK (mode_of_payment IN ('Cash', 'Card', 'UPI')),
  ADD COLUMN IF NOT EXISTS lead_source TEXT;

-- Create index for mode_of_payment for faster queries
CREATE INDEX IF NOT EXISTS idx_estimations_mode_of_payment ON public.estimations (mode_of_payment);
CREATE INDEX IF NOT EXISTS idx_estimations_lead_source ON public.estimations (lead_source);

-- ============================================
-- 2. ALTER PROJECTS TABLE
-- ============================================
ALTER TABLE IF EXISTS public.projects
  ADD COLUMN IF NOT EXISTS mode_of_payment TEXT DEFAULT 'Cash' CHECK (mode_of_payment IN ('Cash', 'Card', 'UPI')),
  ADD COLUMN IF NOT EXISTS lead_source TEXT;

-- Create index for mode_of_payment for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_mode_of_payment ON public.projects (mode_of_payment);
CREATE INDEX IF NOT EXISTS idx_projects_lead_source ON public.projects (lead_source);

-- ============================================
-- 3. ALTER SERVICE_INVOICES TABLE (if exists)
-- ============================================
ALTER TABLE IF EXISTS public.service_invoices
  ADD COLUMN IF NOT EXISTS mode_of_payment TEXT DEFAULT 'Cash' CHECK (mode_of_payment IN ('Cash', 'Card', 'UPI')),
  ADD COLUMN IF NOT EXISTS lead_source TEXT;

-- Create index for mode_of_payment for faster queries
CREATE INDEX IF NOT EXISTS idx_service_invoices_mode_of_payment ON public.service_invoices (mode_of_payment);
CREATE INDEX IF NOT EXISTS idx_service_invoices_lead_source ON public.service_invoices (lead_source);

-- ============================================
-- 4. COMMON LEAD SOURCES (Optional Setup)
-- ============================================
-- Create a lookup table for lead sources (optional but recommended)
CREATE TABLE IF NOT EXISTS public.lead_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  source_name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pre-populate with common lead sources
INSERT INTO public.lead_sources (source_name, description) 
VALUES 
  ('Direct Walk-in', 'Customer walked in to showroom'),
  ('Phone Inquiry', 'Customer called with inquiry'),
  ('Website', 'Lead from company website'),
  ('Social Media', 'Lead from social media platforms'),
  ('Referral', 'Referred by existing customer'),
  ('Dealer', 'Referred by dealer/partner'),
  ('Advertisement', 'From advertisement campaign'),
  ('Trade Show', 'Met at trade show or event'),
  ('Email', 'Contact via email'),
  ('Other', 'Other source')
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. ALTER INVOICES TABLE (if exists)
-- ============================================
ALTER TABLE IF EXISTS public.invoices
  ADD COLUMN IF NOT EXISTS mode_of_payment TEXT DEFAULT 'Cash' CHECK (mode_of_payment IN ('Cash', 'Card', 'UPI')),
  ADD COLUMN IF NOT EXISTS lead_source TEXT;

-- ============================================
-- 6. ENABLE RLS AND POLICIES (if not already enabled)
-- ============================================
ALTER TABLE IF EXISTS public.lead_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "lead_sources_select_own" ON public.lead_sources;
CREATE POLICY "lead_sources_select_own" ON public.lead_sources
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "lead_sources_insert_own" ON public.lead_sources
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "lead_sources_insert_own" ON public.lead_sources
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "lead_sources_update_own" ON public.lead_sources;
CREATE POLICY "lead_sources_update_own" ON public.lead_sources
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- ============================================
-- Summary of Changes:
-- ============================================
-- 1. estimations table: Added mode_of_payment, lead_source
-- 2. projects table: Added mode_of_payment, lead_source
-- 3. service_invoices table: Added mode_of_payment, lead_source
-- 4. invoices table: Added mode_of_payment, lead_source
-- 5. lead_sources table: Created for managing lead source options
-- 6. Indexes created for performance optimization
-- 7. RLS enabled for lead_sources table
