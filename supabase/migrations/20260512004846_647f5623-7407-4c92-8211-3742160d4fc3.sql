DROP POLICY IF EXISTS "members read team" ON public.team_members;

CREATE POLICY "admins read team"
ON public.team_members
FOR SELECT
USING (public.is_company_admin(company_id, auth.uid()));