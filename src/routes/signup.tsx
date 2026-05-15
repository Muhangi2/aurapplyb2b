import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PageShell, pageContainer } from "@/components/layout";
import {
  ensureCandidateProfile,
  finalizeCandidateSession,
  getCandidatePostAuthPath,
  recordCandidateConsents,
  signInWithGoogle,
  signUpWithEmail,
} from "@/lib/candidate-auth";

type Search = {
  type?: "candidate" | "recruiter";
  step?: "consents";
};

export const Route = createFileRoute("/signup")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    type:
      s.type === "candidate" || s.type === "recruiter"
        ? (s.type as Search["type"])
        : undefined,
    step: s.step === "consents" ? "consents" : undefined,
  }),
  component: SignUp,
});

function Chooser() {
  return (
    <PageShell>
      <div className="py-16">
        <div className={`${pageContainer} mx-auto max-w-2xl`}>
          <h1 className="au-page-title text-center">Create your account</h1>
          <p className="au-lead mt-2 text-center">Tell us how you will use Appointed.</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              to="/signup"
              search={{ type: "candidate" }}
              className="au-card p-6 text-left transition hover:border-primary group"
            >
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                For candidates
              </div>
              <div className="mt-2 text-lg font-semibold">I am looking for work</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Build one strong profile. Receive curated role matches with full reasoning.
              </p>
              <div className="mt-6 text-sm text-primary group-hover:underline">
                Continue as candidate →
              </div>
            </Link>
            <Link
              to="/businesses/contact"
              className="au-card p-6 text-left transition hover:border-primary group"
            >
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                For recruiters
              </div>
              <div className="mt-2 text-lg font-semibold">I am hiring</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Post a role and receive AI-matched shortlists with full reasoning.
              </p>
              <div className="mt-6 text-sm text-primary group-hover:underline">
                Continue as recruiter →
              </div>
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function ConsentFields({
  terms,
  setTerms,
  aiConsent,
  setAiConsent,
  marketing,
  setMarketing,
}: {
  terms: boolean;
  setTerms: (v: boolean) => void;
  aiConsent: boolean;
  setAiConsent: (v: boolean) => void;
  marketing: boolean;
  setMarketing: (v: boolean) => void;
}) {
  return (
    <div className="space-y-3 pt-2">
      <label className="flex gap-3 text-sm">
        <Checkbox checked={terms} onCheckedChange={(v) => setTerms(!!v)} className="mt-0.5" />
        <span className="text-muted-foreground">
          I agree to the{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          . <span className="text-foreground">Required.</span>
        </span>
      </label>
      <label className="flex gap-3 text-sm">
        <Checkbox checked={aiConsent} onCheckedChange={(v) => setAiConsent(!!v)} className="mt-0.5" />
        <span className="text-muted-foreground">
          I consent to AI-based profile matching. You can revoke this at any time.{" "}
          <span className="text-foreground">Required to use Appointed.</span>
        </span>
      </label>
      <label className="flex gap-3 text-sm">
        <Checkbox checked={marketing} onCheckedChange={(v) => setMarketing(!!v)} className="mt-0.5" />
        <span className="text-muted-foreground">
          I would like to receive occasional product updates. Optional.
        </span>
      </label>
    </div>
  );
}

function OAuthConsentStep() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [terms, setTerms] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/signin" });
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user || loading) return;
    getCandidatePostAuthPath(user.id).then((path) => {
      if (!path.includes("step=consents")) nav({ to: path as "/" });
    });
  }, [user, loading, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!terms || !aiConsent) {
      toast.error("Please accept the required consents to continue.");
      return;
    }
    setSubmitting(true);
    await ensureCandidateProfile(user);
    const { error } = await recordCandidateConsents(user.id, { marketing });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    const path = await getCandidatePostAuthPath(user.id);
    nav({ to: path as "/" });
  }

  if (loading || !user) {
    return (
      <PageShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="py-16">
        <div className={`${pageContainer} mx-auto max-w-md`}>
          <h1 className="au-page-title text-center">Almost there</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Review and accept the required agreements to finish setting up your Appointed profile.
          </p>
          <form onSubmit={submit} className="au-card mt-8 space-y-4 p-6">
            <ConsentFields
              terms={terms}
              setTerms={setTerms}
              aiConsent={aiConsent}
              setAiConsent={setAiConsent}
              marketing={marketing}
              setMarketing={setMarketing}
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Saving…" : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

function CandidateSignUpForm() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    getCandidatePostAuthPath(user.id).then((path) => nav({ to: path as "/" }));
  }, [user, loading, nav]);

  async function signUpGoogle() {
    setOauthLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setOauthLoading(false);
      toast.error(error.message);
    }
  }

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
    setLoadingForm(true);
    const { data, error } = await signUpWithEmail({
      email,
      password,
      fullName: name,
      marketing,
    });
    if (error) {
      toast.error(error.message);
      setLoadingForm(false);
      return;
    }

    if (data.session && data.user) {
      const { error: setupError } = await finalizeCandidateSession(data.user, name);
      if (setupError) {
        toast.error(setupError.message);
        setLoadingForm(false);
        return;
      }
      const path = await getCandidatePostAuthPath(data.user.id);
      toast.success("Account created.");
      nav({ to: path as "/" });
      return;
    }

    setLoadingForm(false);
    toast.success("Check your email to confirm your account, then sign in.");
    nav({ to: "/signin" });
  }

  return (
    <PageShell>
      <div className="py-16">
        <div className={`${pageContainer} mx-auto max-w-md`}>
          <Link
            to="/signup"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← Choose a different account type
          </Link>
          <h1 className="au-page-title mt-4 text-center">Create your candidate profile</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Once. We will handle the rest.
          </p>

          <div className="au-card mt-8 space-y-4 p-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={oauthLoading || loadingForm}
              onClick={signUpGoogle}
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
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
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
              <div>
                <Label htmlFor="pw">Password</Label>
                <Input
                  id="pw"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="mt-1.5"
                />
                <p className="mt-1 text-xs text-muted-foreground">Minimum 8 characters.</p>
              </div>

              <ConsentFields
                terms={terms}
                setTerms={setTerms}
                aiConsent={aiConsent}
                setAiConsent={setAiConsent}
                marketing={marketing}
                setMarketing={setMarketing}
              />

              <Button type="submit" className="w-full" disabled={loadingForm || oauthLoading}>
                {loadingForm ? "Creating account…" : "Create account"}
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function SignUp() {
  const { type, step } = Route.useSearch();

  if (step === "consents") return <OAuthConsentStep />;
  if (!type) return <Chooser />;
  if (type === "candidate") return <CandidateSignUpForm />;
  return <Chooser />;
}
