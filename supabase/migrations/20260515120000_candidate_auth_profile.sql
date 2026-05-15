-- Ensure new auth users get candidate profile metadata from sign-up / OAuth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_type text;
BEGIN
  v_type := COALESCE(NEW.raw_user_meta_data->>'user_type', 'candidate');
  IF v_type NOT IN ('candidate', 'recruiter') THEN
    v_type := 'candidate';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, email_verified, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
    NEW.email_confirmed_at IS NOT NULL,
    v_type
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    email_verified = EXCLUDED.email_verified,
    user_type = COALESCE(public.profiles.user_type, EXCLUDED.user_type);

  RETURN NEW;
END;
$$;
