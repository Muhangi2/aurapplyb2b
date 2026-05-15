-- One active consent row per user and consent type
CREATE UNIQUE INDEX IF NOT EXISTS consents_user_type_active_idx
  ON public.consents (user_id, consent_type)
  WHERE revoked_at IS NULL;
