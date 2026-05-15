import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const REQUIRED_CONSENTS = ["terms_privacy", "ai_matching"] as const;

export function authRedirectUrl(path = "/auth/callback") {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

export async function signInWithGoogle(nextPath?: string) {
  const redirectTo = nextPath
    ? `${authRedirectUrl()}?next=${encodeURIComponent(nextPath)}`
    : authRedirectUrl();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      scopes: "email profile",
    },
  });
  return { error };
}

export async function signUpWithEmail(opts: {
  email: string;
  password: string;
  fullName: string;
  marketing?: boolean;
}) {
  return supabase.auth.signUp({
    email: opts.email,
    password: opts.password,
    options: {
      emailRedirectTo: authRedirectUrl(),
      data: {
        full_name: opts.fullName.trim(),
        user_type: "candidate",
        terms_accepted: true,
        ai_matching_accepted: true,
        marketing_opt_in: !!opts.marketing,
      },
    },
  });
}

export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function hasRequiredConsents(userId: string) {
  const { data, error } = await supabase
    .from("consents")
    .select("consent_type, granted, revoked_at")
    .eq("user_id", userId)
    .in("consent_type", [...REQUIRED_CONSENTS]);

  if (error) return false;

  const active = new Set(
    (data ?? [])
      .filter((c) => c.granted && !c.revoked_at)
      .map((c) => c.consent_type),
  );
  return REQUIRED_CONSENTS.every((t) => active.has(t));
}

export async function recordCandidateConsents(
  userId: string,
  opts: { marketing?: boolean },
) {
  const { data: existing } = await supabase
    .from("consents")
    .select("consent_type")
    .eq("user_id", userId)
    .is("revoked_at", null);

  const have = new Set((existing ?? []).map((c) => c.consent_type));

  const rows: {
    user_id: string;
    consent_type: string;
    granted: boolean;
  }[] = [];

  for (const type of REQUIRED_CONSENTS) {
    if (!have.has(type)) {
      rows.push({ user_id: userId, consent_type: type, granted: true });
    }
  }

  if (opts.marketing && !have.has("product_updates")) {
    rows.push({ user_id: userId, consent_type: "product_updates", granted: true });
  }

  if (rows.length === 0) return { error: null };

  const { error } = await supabase.from("consents").insert(rows);
  return { error };
}

export async function ensureCandidateProfile(user: User, fullName?: string) {
  const name =
    fullName?.trim() ||
    (user.user_metadata?.full_name as string | undefined)?.trim() ||
    user.email?.split("@")[0] ||
    "";

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name: name || null,
      user_type: "candidate",
      email_verified: !!user.email_confirmed_at,
    },
    { onConflict: "id" },
  );
  return { error };
}

/** After any candidate sign-in: profile row, metadata, consents from email signup. */
export async function finalizeCandidateSession(user: User, fullName?: string) {
  const metaType = user.user_metadata?.user_type as string | undefined;
  if (metaType === "recruiter") return { error: null };

  const { error: profileError } = await ensureCandidateProfile(user, fullName);
  if (profileError) return { error: profileError };

  await supabase.auth.updateUser({
    data: {
      user_type: "candidate",
      full_name:
        fullName?.trim() ||
        (user.user_metadata?.full_name as string | undefined) ||
        undefined,
    },
  });

  const meta = user.user_metadata;
  if (meta?.terms_accepted && meta?.ai_matching_accepted) {
    const ok = await hasRequiredConsents(user.id);
    if (!ok) {
      const { error } = await recordCandidateConsents(user.id, {
        marketing: !!meta.marketing_opt_in,
      });
      if (error) return { error };
    }
  }

  return { error: null };
}

export async function getCandidatePostAuthPath(userId: string) {
  const [{ data: profile }, consentsOk] = await Promise.all([
    supabase
      .from("profiles")
      .select("onboarding_complete, user_type")
      .eq("id", userId)
      .maybeSingle(),
    hasRequiredConsents(userId),
  ]);

  if (profile?.user_type === "recruiter") return "/r/dashboard";

  if (!consentsOk) return "/signup?type=candidate&step=consents";

  if (!profile?.onboarding_complete) return "/onboarding";

  return "/dashboard";
}

export function authErrorMessage(error: { message: string }) {
  const msg = error.message.toLowerCase();
  if (msg.includes("email not confirmed")) {
    return "Confirm your email first — check your inbox for the link from Appointed.";
  }
  if (msg.includes("invalid login credentials")) {
    return "Email or password is incorrect.";
  }
  return error.message;
}
