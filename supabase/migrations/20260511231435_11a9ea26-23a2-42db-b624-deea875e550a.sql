
-- 1. profiles: add user_type
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_type text NOT NULL DEFAULT 'candidate';

-- 2. companies
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  name text NOT NULL,
  logo_url text,
  website text,
  description text,
  industry text,
  size text,
  country text,
  locations text[] DEFAULT '{}',
  role_focus text[] DEFAULT '{}',
  departments text[] DEFAULT '{}',
  hires_per_year text,
  onboarding_complete boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner all" ON public.companies FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

-- 3. team_members
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id uuid,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'recruiter',
  status text NOT NULL DEFAULT 'invited',
  invited_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_company_member(_company_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.companies WHERE id = _company_id AND owner_id = _user_id
  ) OR EXISTS (
    SELECT 1 FROM public.team_members WHERE company_id = _company_id AND user_id = _user_id AND status = 'active'
  )
$$;

CREATE OR REPLACE FUNCTION public.is_company_admin(_company_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.companies WHERE id = _company_id AND owner_id = _user_id
  ) OR EXISTS (
    SELECT 1 FROM public.team_members WHERE company_id = _company_id AND user_id = _user_id AND status = 'active' AND role = 'admin'
  )
$$;

CREATE POLICY "members read team" ON public.team_members FOR SELECT USING (public.is_company_member(company_id, auth.uid()));
CREATE POLICY "admins manage team" ON public.team_members FOR ALL USING (public.is_company_admin(company_id, auth.uid())) WITH CHECK (public.is_company_admin(company_id, auth.uid()));

-- 4. jobs
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  created_by uuid NOT NULL,
  title text NOT NULL,
  department text,
  location_city text,
  location_country text,
  work_modes text[] DEFAULT '{}',
  employment_type text,
  seniority text,
  required_skills text[] DEFAULT '{}',
  nice_skills text[] DEFAULT '{}',
  required_experience_years int DEFAULT 0,
  required_education text,
  required_languages jsonb DEFAULT '[]'::jsonb,
  salary_min int,
  salary_max int,
  currency text DEFAULT 'EUR',
  notice_period text,
  work_authorization text,
  description text,
  batch_size int DEFAULT 8,
  prioritize jsonb DEFAULT '{}'::jsonb,
  hard_filters jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'active',
  posted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read jobs" ON public.jobs FOR SELECT USING (public.is_company_member(company_id, auth.uid()));
CREATE POLICY "admins write jobs" ON public.jobs FOR ALL USING (public.is_company_admin(company_id, auth.uid())) WITH CHECK (public.is_company_admin(company_id, auth.uid()));

-- 5. batches
CREATE TABLE public.batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  batch_number int NOT NULL DEFAULT 1,
  is_current boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read batches" ON public.batches FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND public.is_company_member(j.company_id, auth.uid()))
);
CREATE POLICY "admins write batches" ON public.batches FOR ALL USING (
  EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND public.is_company_admin(j.company_id, auth.uid()))
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND public.is_company_admin(j.company_id, auth.uid()))
);

-- 6. recruiter_matches
CREATE TABLE public.recruiter_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  candidate_anon_id text NOT NULL,
  candidate_first_name text NOT NULL,
  candidate_full_name text,
  candidate_current_role text,
  candidate_current_company text,
  candidate_years_experience int,
  candidate_location text,
  candidate_skills text[] DEFAULT '{}',
  candidate_languages jsonb DEFAULT '[]'::jsonb,
  candidate_education text,
  candidate_summary text,
  candidate_profile_updated_at timestamptz,
  candidate_id_verified boolean DEFAULT false,
  candidate_education_verified boolean DEFAULT false,
  candidate_experience_verified boolean DEFAULT false,
  match_score int NOT NULL,
  score_skills int,
  score_experience int,
  score_location int,
  score_language int,
  reasoning jsonb DEFAULT '[]'::jsonb,
  detailed_reasoning jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'in_batch',
  decline_reason text,
  decline_note text,
  contacted_at timestamptz,
  contact_subject text,
  contact_body text,
  saved boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.recruiter_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read rm" ON public.recruiter_matches FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND public.is_company_member(j.company_id, auth.uid()))
);
CREATE POLICY "admins write rm" ON public.recruiter_matches FOR ALL USING (
  EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND public.is_company_admin(j.company_id, auth.uid()))
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND public.is_company_admin(j.company_id, auth.uid()))
);

-- 7. recruiter_actions (audit log)
CREATE TABLE public.recruiter_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  company_id uuid,
  job_id uuid,
  match_id uuid,
  action_type text NOT NULL,
  payload jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.recruiter_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own action insert" ON public.recruiter_actions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own action read" ON public.recruiter_actions FOR SELECT USING (auth.uid() = user_id);

-- timestamps
CREATE TRIGGER companies_touch BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER jobs_touch BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- update handle_new_user to record user_type from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, email_verified, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email_confirmed_at IS NOT NULL,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'candidate')
  );
  RETURN NEW;
END $$;

-- ensure trigger exists on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
