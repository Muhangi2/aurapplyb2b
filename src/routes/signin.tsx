import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  authErrorMessage,
  finalizeCandidateSession,
  getCandidatePostAuthPath,
  signInWithEmail,
  signInWithGoogle,
} from "@/lib/candidate-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PageShell, pageContainer } from "@/components/layout";

export const Route = createFileRoute("/signin")({ component: SignIn });

function SignIn() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    getCandidatePostAuthPath(user.id).then((path) => nav({ to: path as "/" }));
  }, [user, loading, nav]);

  async function signInGoogle() {
    setOauthLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setOauthLoading(false);
      toast.error(error.message);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { data, error } = await signInWithEmail(email, password);
    setSubmitting(false);
    if (error) return toast.error(authErrorMessage(error));
    if (data.user) {
      const { error: setupError } = await finalizeCandidateSession(data.user);
      if (setupError) return toast.error(setupError.message);
      const path = await getCandidatePostAuthPath(data.user.id);
      nav({ to: path as "/" });
    }
  }

  async function forgot() {
    if (!email) return toast.error("Enter your email first.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/settings`,
    });
    if (error) toast.error(error.message);
    else toast.success("Reset link sent if that email exists.");
  }

  return (
    <PageShell>
      <div className="py-16">
        <div className={`${pageContainer} mx-auto max-w-md`}>
          <h1 className="au-page-title text-center">Welcome back</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Sign in to your Appointed profile.
          </p>

          <div className="au-card mt-8 space-y-4 p-6">
            <Button
              variant="outline"
              type="button"
              className="w-full"
              disabled={oauthLoading || submitting}
              onClick={signInGoogle}
            >
              {oauthLoading ? "Redirecting…" : "Continue with Google"}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">or with email</span>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pw">Password</Label>
                  <button
                    type="button"
                    onClick={forgot}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="pw"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting || oauthLoading}>
                {submitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Appointed?{" "}
            <Link to="/signup" search={{ type: "candidate" }} className="text-primary hover:underline">
              Create a profile
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
