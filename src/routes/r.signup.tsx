import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/r/signup")({ component: RecruiterSignUp });

const SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"];
const INDUSTRIES = ["Healthcare", "Logistics", "Tech", "Finance", "FMCG", "Food", "Insurance", "Legal", "Other"];
const COUNTRIES = ["Germany", "France", "Netherlands", "Spain", "Italy", "Sweden", "Denmark", "Poland", "Portugal", "Ireland", "Belgium", "Austria", "Other"];

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

function RecruiterSignUp() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [size, setSize] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [terms, setTerms] = useState(false);
  const [aiAct, setAiAct] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) nav({ to: "/r/onboarding" });
  }, [user, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!terms || !aiAct) return toast.error("Please accept the required acknowledgments to continue.");
    if (!size || !industry || !country) return toast.error("Please complete all company fields.");
    if (password.length < 8) return toast.error("Password must be at least 8 characters.");

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/r/onboarding`,
        data: { full_name: companyName, user_type: "recruiter" },
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
        { user_id: data.user.id, consent_type: "ai_act_deployer" },
      ];
      if (marketing) consents.push({ user_id: data.user.id, consent_type: "product_updates" });
      await supabase.from("consents").insert(consents);

      await supabase.from("companies").insert({
        owner_id: data.user.id,
        name: companyName,
        size,
        industry,
        country,
      });
    }
    toast.success("Recruiter account created.");
    nav({ to: "/r/onboarding" });
  }

  return (
    <PageShell>
      <div className="px-6 py-16">
        <div className="mx-auto max-w-xl">
          <Link to="/signup" className="text-xs text-muted-foreground hover:text-foreground">← Choose a different account type</Link>
          <h1 className="text-3xl font-semibold tracking-tight text-center mt-4">Create your recruiter account</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">For companies hiring through Aurapply.</p>

          <div className="au-card p-6 mt-8 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <SocialBtn provider="google" />
              <SocialBtn provider="linkedin" />
            </div>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-surface px-2 text-xs text-muted-foreground">or with email</span></div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="company">Company name</Label>
                <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pw">Password</Label>
                <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="mt-1.5" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Company size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{INDUSTRIES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{COUNTRIES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex gap-3 text-sm">
                  <Checkbox checked={terms} onCheckedChange={(v) => setTerms(!!v)} className="mt-0.5" />
                  <span className="text-muted-foreground">
                    I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>. <span className="text-foreground">Required.</span>
                  </span>
                </label>
                <label className="flex gap-3 text-sm rounded-lg border border-border p-3 bg-secondary/40">
                  <Checkbox checked={aiAct} onCheckedChange={(v) => setAiAct(!!v)} className="mt-0.5" />
                  <span className="text-foreground">
                    I understand that Aurapply provides AI-powered candidate matching, and that as the employer making hiring decisions, I am responsible for the final selection of candidates I contact. I commit to reviewing the reasoning provided for each match and exercising my own judgment.
                    <span className="block mt-1 text-xs text-muted-foreground">EU AI Act deployer acknowledgment. Required.</span>
                  </span>
                </label>
                <label className="flex gap-3 text-sm">
                  <Checkbox checked={marketing} onCheckedChange={(v) => setMarketing(!!v)} className="mt-0.5" />
                  <span className="text-muted-foreground">Occasional product updates. Optional.</span>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account…" : "Create recruiter account"}
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
