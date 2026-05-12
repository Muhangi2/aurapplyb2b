
CREATE TABLE public.access_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new',
  assigned_reviewer uuid,
  internal_notes text,
  full_name text NOT NULL,
  work_email text NOT NULL,
  role text NOT NULL,
  country text NOT NULL,
  company_name text NOT NULL,
  company_size text NOT NULL,
  sector text NOT NULL,
  hires_per_year text NOT NULL,
  roles_typically text NOT NULL,
  biggest_challenge text,
  heard_from text,
  preferred_times text[] DEFAULT '{}'::text[]
);

ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can submit a request
CREATE POLICY "anyone can insert access requests"
ON public.access_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users who own at least one company can read requests (admin review surface)
CREATE POLICY "company owners can read access requests"
ON public.access_requests
FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM public.companies c WHERE c.owner_id = auth.uid()));

CREATE POLICY "company owners can update access requests"
ON public.access_requests
FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.companies c WHERE c.owner_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.companies c WHERE c.owner_id = auth.uid()));

CREATE TRIGGER access_requests_touch_updated_at
BEFORE UPDATE ON public.access_requests
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
