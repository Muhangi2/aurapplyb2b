import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/signin")({ component: SignIn });

function SignIn() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) nav({ to: "/dashboard" });
  }, [user, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    nav({ to: "/dashboard" });
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
      <div className="px-6 py-16">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-center">Welcome back</h1>
          <div className="au-card p-6 mt-8 space-y-4">
            <div className="grid gap-3">
              <Button variant="outline" type="button" onClick={() => toast.info("Google sign-in — coming soon")}>Sign in with Google</Button>
              <Button variant="outline" type="button" onClick={() => toast.info("LinkedIn sign-in — coming soon")}>Sign in with LinkedIn</Button>
            </div>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-surface px-2 text-xs text-muted-foreground">or with email</span></div>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="pw">Password</Label>
                  <button type="button" onClick={forgot} className="text-xs text-primary hover:underline">Forgot password?</button>
                </div>
                <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
            </form>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Aurapply? <Link to="/signup" className="text-primary hover:underline">Create a profile</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
