import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { AudiencePicker } from "@/components/audience-picker";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileCheck2, Scale, FileSearch, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="au-card p-6">
      <div className="text-xs font-mono text-muted-foreground">{n}</div>
      <div className="mt-3 text-lg font-semibold">{t}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}

function Why({ t, d }: { t: string; d: string }) {
  return (
    <div className="au-card p-6">
      <div className="font-semibold">{t}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}

function Landing() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pt-16 pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            EU-compliant • GDPR &amp; EU AI Act
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
            Hiring or being hired,<br />done properly.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aurapply is the EU-compliant AI platform that matches the right candidates to the right roles. Transparent, verified, candidate-first.
          </p>
        </div>
        <div className="mx-auto max-w-5xl mt-12">
          <AudiencePicker
            candidateSecondary={{ href: "#candidates", label: "How matching works" }}
            recruiterSecondary={{ href: "#recruiters", label: "How sourcing works" }}
          />
        </div>
      </section>

      {/* For candidates */}
      <section id="candidates" className="px-6 py-20 bg-surface border-y border-border scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-primary">For candidates</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Stop applying. Start being matched.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step n="01" t="Build a verified profile" d="Add your experience, skills, and credentials. Verify your identity and qualifications to stand out." />
            <Step n="02" t="AI matches you to relevant roles" d="When a recruiter posts a job that fits your profile, you appear in their shortlist with transparent reasoning." />
            <Step n="03" t="Recruiters reach out directly" d="No more applying into a void. If a recruiter is interested, they contact you with the role and details." />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Why t="Transparent matching" d="You see exactly why you were matched, criterion by criterion. No black box." />
            <Why t="Verified credentials" d="Verified profiles get prioritized in shortlists. We handle the verification, you get the credibility." />
            <Why t="Your data, your control" d="Revoke consents, contest decisions, delete your account anytime. EU rights, fully respected." />
            <Why t="No application fatigue" d="One profile, ongoing matches. You do not chase jobs; the right ones find you." />
          </div>

          <div className="mt-10 au-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-lg font-semibold">Ready to be matched?</div>
            <Button asChild size="lg">
              <Link to="/signup">Create candidate profile <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For recruiters */}
      <section id="recruiters" className="px-6 py-20 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-primary">For recruiters</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Source better. Skip the inbox flood.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step n="01" t="Post your role" d="Define the requirements, the must-haves, and your preferences. We do not need a fluffy job description, we need clear criteria." />
            <Step n="02" t="Receive your shortlist" d="Within minutes, get 8 matched candidates with full reasoning, verification status, and match strength per criterion." />
            <Step n="03" t="Review, contact, refine" d="Review the reasoning, contact the ones you want, request a fresh batch if the fit is not right." />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Why t="Built-in compliance" d="Designed around the EU AI Act and GDPR. Audit trails, human-in-the-loop, transparent reasoning by default." />
            <Why t="Pre-verified candidates" d="Reduce vetting overhead. Identity, education, and experience verification handled before candidates reach you." />
            <Why t="Reject and resample" d="Not the right fit? Regenerate the batch with adjusted criteria. No quota, no penalty." />
            <Why t="Honest matching" d="We flag partial matches openly. You see what fits and what does not, so you make better decisions faster." />
          </div>

          <div className="mt-10 au-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-lg font-semibold">Ready to source better?</div>
            <Button asChild size="lg">
              <Link to="/r/signup">Post a job <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="px-6 py-20 bg-surface border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-primary">Built for the EU</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold">European standards, by default.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { i: ShieldCheck, t: "GDPR-compliant by design" },
              { i: Scale, t: "EU AI Act-ready" },
              { i: FileCheck2, t: "Verified credentials" },
              { i: FileSearch, t: "Audit trail on every decision" },
            ].map((p) => (
              <div key={p.t} className="au-card p-5 flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <p.i className="h-4.5 w-4.5" />
                </div>
                <div className="text-sm font-medium">{p.t}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-muted-foreground leading-relaxed">
            Aurapply is built in Europe, for European hiring. Every part of the platform is designed around the standards European candidates, recruiters, and regulators expect.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
