import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, Lock, Scale, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pt-20 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            EU-compliant • GDPR & EU AI Act
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
            Stop applying.<br />Start being matched.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build your professional profile once. Our AI matches you to jobs where you fit, and recruiters reach out directly. EU-compliant, transparent, candidate-first.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/signup">Create profile <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how">How it works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 py-20 bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-primary">How it works</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Three steps. No applications.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Build a verified profile", d: "Add your experience, education, skills, and preferences. Verify what matters to stand out." },
              { n: "02", t: "AI matches you to relevant roles", d: "Our matching engine surfaces openings where your profile genuinely fits — with reasoning." },
              { n: "03", t: "Recruiters reach out when there is fit", d: "You stay in control. Decline, save, or contest any match at any time." },
            ].map((s) => (
              <div key={s.n} className="au-card p-6">
                <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
                <div className="mt-3 text-lg font-semibold">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-primary">Why Aurapply</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Built for candidates who value their time and data.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { i: Sparkles, t: "Transparent matching", d: "See exactly why you were matched to each role, broken down by skills, experience, location, and language." },
              { i: ShieldCheck, t: "Verified credentials", d: "Stand out with verified education and experience. Recruiters know your profile is real." },
              { i: Lock, t: "Your data, your control", d: "Revoke any consent and delete your account at any time. No dark patterns." },
              { i: Scale, t: "Built for EU compliance", d: "Designed around the GDPR and the EU AI Act. Including the right to contest automated decisions." },
            ].map((f) => (
              <div key={f.t} className="au-card p-6 flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.i className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{f.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiters teaser */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-border bg-[oklch(0.43_0.18_264)] text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-sm font-medium opacity-80">For recruiters</div>
              <h3 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">Find candidates who fit. Skip the inbox flood.</h3>
            </div>
            <Button asChild variant="secondary" size="lg">
              <Link to="/recruiters">Learn more <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
