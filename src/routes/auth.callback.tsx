import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { finalizeCandidateSession, getCandidatePostAuthPath } from "@/lib/candidate-auth";
import { PageShell } from "@/components/layout";

type Search = { next?: string };

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  component: AuthCallback,
});

function AuthCallback() {
  const nav = useNavigate();
  const { next } = Route.useSearch();
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    let cancelled = false;

    async function finish() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          if (!cancelled) {
            setMessage(error.message);
          }
          return;
        }
      } else if (window.location.hash.includes("access_token")) {
        const { error } = await supabase.auth.getSession();
        if (error) {
          if (!cancelled) setMessage(error.message);
          return;
        }
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        if (!cancelled) {
          setMessage(sessionError?.message ?? "Could not complete sign-in. Try again.");
          setTimeout(() => nav({ to: "/signin" }), 2500);
        }
        return;
      }

      const user = session.user;
      const metaType = user.user_metadata?.user_type as string | undefined;

      if (metaType !== "recruiter") {
        const { error: setupError } = await finalizeCandidateSession(
          user,
          user.user_metadata?.full_name as string | undefined,
        );
        if (setupError && !cancelled) {
          setMessage(setupError.message);
          return;
        }
      }

      const destination =
        next && next.startsWith("/") && !next.startsWith("//")
          ? next
          : await getCandidatePostAuthPath(user.id);

      if (!cancelled) nav({ to: destination as "/" });
    }

    finish();
    return () => {
      cancelled = true;
    };
  }, [nav, next]);

  return (
    <PageShell>
      <div className="flex min-h-[40vh] items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </PageShell>
  );
}
