import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SocialBtn({ provider }: { provider: "google" | "linkedin" }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => toast.info(`${provider === "google" ? "Google" : "LinkedIn"} sign-up — coming soon`)}
    >
      Sign up with {provider === "google" ? "Google" : "LinkedIn"}
    </Button>
  );
}

function SignUp() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) nav({ to: "/onboarding" });
  }, [user, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!terms || !aiConsent) {
      toast.error("Please accept the required consents to continue.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: name },
      },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      const consents = [
        { user_id: data.user.id, consent_type: "terms_privacy" },
        { user_id: data.user.id, consent_type: "ai_matching" },
      ];
      if (marketing) consents.push({ user_id: data.user.id, consent_type: "product_updates" });
      await supabase.from("consents").insert(consents);
    }
    toast.success("Account created.");
    nav({ to: "/onboarding" });
  }

  return (
    <PageShell>
      <div className="px-6 py-16">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-center">Create your profile</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Once. We will handle the rest.
          </p>

          <div className="au-card p-6 mt-8 space-y-4">
            <div className="grid gap-3">
              <SocialBtn provider="google" />
              <SocialBtn provider="linkedin" />
            </div>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-surface px-2 text-xs text-muted-foreground">or with email</span></div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pw">Password</Label>
                <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="mt-1.5" />
                <p className="mt-1 text-xs text-muted-foreground">Minimum 8 characters.</p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex gap-3 text-sm">
                  <Checkbox checked={terms} onCheckedChange={(v) => setTerms(!!v)} className="mt-0.5" />
                  <span className="text-muted-foreground">
                    I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>. <span className="text-foreground">Required.</span>
                  </span>
                </label>
                <label className="flex gap-3 text-sm">
                  <Checkbox checked={aiConsent} onCheckedChange={(v) => setAiConsent(!!v)} className="mt-0.5" />
                  <span className="text-muted-foreground">
                    I consent to AI-based profile matching. Your profile will be analysed by an automated system to surface relevant roles. You can revoke this at any time. <span className="text-foreground">Required to use Aurapply.</span>
                  </span>
                </label>
                <label className="flex gap-3 text-sm">
                  <Checkbox checked={marketing} onCheckedChange={(v) => setMarketing(!!v)} className="mt-0.5" />
                  <span className="text-muted-foreground">
                    I would like to receive occasional product updates. Optional.
                  </span>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account…" : "Create account"}
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
