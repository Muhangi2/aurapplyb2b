import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/r/signin")({ component: BusinessSignIn });

function BusinessSignIn() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) nav({ to: "/r/dashboard" });
  }, [user, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    nav({ to: "/r/dashboard" });
  }

  return (
    <PageShell>
      <div className="px-6 py-16">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-center">Sign in to your team</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">For businesses hiring on Aurapply.</p>
          <div className="au-card p-6 mt-8 space-y-4">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="email">Work email <span className="text-muted-foreground">*</span></Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pw">Password <span className="text-muted-foreground">*</span></Label>
                <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
            </form>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Aurapply? <Link to="/businesses/contact" className="text-primary hover:underline">Start a conversation</Link>
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Looking for an individual account? <Link to="/signin" className="text-primary hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
