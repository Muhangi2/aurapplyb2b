import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EyeIcon,
  ShieldIcon,
  LockIcon,
  MessageIcon,
  CheckmarkIcon,
  VerifiedIcon,
  type IconProps,
} from "@/components/icons";

export const Route = createFileRoute("/individuals")({
  head: () => ({
    meta: [
      { title: "For Individuals — Aurapply" },
      { name: "description", content: "Build one profile. Get matched to roles where you actually fit. Recruiters reach out directly." },
      { property: "og:title", content: "For Individuals — Aurapply" },
      { property: "og:description", content: "Stop applying. Start being matched. Free for individuals, always." },
    ],
  }),
  component: Individuals,
});

function ProfileMockup() {
  return (
    <div className="au-card p-6 w-full max-w-sm mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-base font-semibold">Anna M.</div>
          <div className="text-sm text-muted-foreground">Senior Product Manager</div>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-success bg-success/10 rounded-full px-2 py-0.5">
          <CheckmarkIcon size={12} /> Verified
        </span>
      </div>
      <div className="mt-5">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Match strength</span>
          <span className="font-medium tabular-nums">92%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary" style={{ width: "92%" }} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {["Product Strategy", "B2B SaaS", "User Research", "SQL", "German"].map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{t}</span>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-2 text-xs text-center">
        <div>
          <VerifiedIcon size={16} className="text-success mx-auto" accentDot={false} />
          <div className="mt-1 text-muted-foreground">Identity</div>
        </div>
        <div>
          <VerifiedIcon size={16} className="text-success mx-auto" accentDot={false} />
          <div className="mt-1 text-muted-foreground">Education</div>
        </div>
        <div>
          <VerifiedIcon size={16} className="text-success mx-auto" accentDot={false} />
          <div className="mt-1 text-muted-foreground">Experience</div>
        </div>
      </div>
    </div>
  );
}

function Step({ n, t, d }: { n: number; t: string; d: string }) {
  return (
    <div className="au-card p-6">
      <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-medium">{n}</div>
      <div className="mt-4 text-base font-semibold">{t}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}

function Why({ icon: Icon, t, d }: { icon: React.ComponentType<IconProps>; t: string; d: string }) {
  return (
    <div className="relative overflow-hidden au-card au-card-hover p-6">
      <span className="au-accent-bar-reveal" aria-hidden />
      <Icon size={20} className="text-primary" />
      <div className="mt-4 font-semibold">{t}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}

function Individuals() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-5 items-center">
          <div className="md:col-span-3">
            <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">For Individuals</div>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Stop applying. Start being matched.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Build your professional profile once, and Aurapply&apos;s AI matches you to roles where your skills, experience, and preferences actually fit. Recruiters reach out directly. You see exactly why you were matched.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Button asChild size="lg"><Link to="/signup">Create your profile</Link></Button>
              <Link to="/signin" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Free for individuals. Always.</p>
          </div>
          <div className="md:col-span-2">
            <div className="relative">
              <div className="au-gradient-panel absolute inset-x-2 inset-y-6 md:inset-y-8" aria-hidden />
              <div className="relative pt-6 pb-6 px-2">
                <ProfileMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
            Three steps. No more application black holes.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Step n={1} t="Build a verified profile." d="Add your experience, skills, languages, and preferences. Verify your identity, education, and work history. Verified profiles get prioritized in shortlists, which means recruiters see you first." />
            <Step n={2} t="AI matches you to roles that fit." d="When a recruiter posts a role, Aurapply's matching system scores your profile against the requirements. You appear in their shortlist when there is genuine fit. No spray-and-pray, no inflated job alerts." />
            <Step n={3} t="Recruiters reach out directly." d="If a recruiter wants to talk, they message you with the role and details. You decide whether to engage. No more applying into a void; the right conversations come to you." />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
            Built around how hiring should work.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Why icon={EyeIcon} t="Transparent matching" d="You see exactly why you were matched to a role, criterion by criterion. Skills, experience, location, language, salary fit. No black box, no mystery score." />
            <Why icon={ShieldIcon} t="Verified credentials" d="We verify your identity, education, and work history through trusted EU providers. Verified profiles stand out, and recruiters trust them more. We handle the process, you get the credibility." />
            <Why icon={LockIcon} t="Your data, your control" d="Revoke any consent at any time. Request human review of any AI decision. Export your data. Delete your account. Your rights under GDPR are built into the product, not buried in a policy." />
            <Why icon={MessageIcon} t="No application fatigue" d="One profile, ongoing matching. You do not chase jobs, you do not submit fifty applications, you do not get ghosted. The right opportunities find you." />
          </div>
        </div>
      </section>

      {/* Honest about AI */}
      <section className="px-6 py-20 bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Honest about the AI.</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>Aurapply uses AI to match candidates to roles. We are required by EU law (the EU AI Act) to be transparent about this, and we agree with the requirement.</p>
            <p>The AI scores how well your profile fits each role&apos;s requirements. It does not judge your personality, your tone, your communication style, or your face. It looks at structured criteria, and it explains its reasoning to both you and the recruiter.</p>
            <p>If you disagree with how the AI handled your profile for a specific role, you can request human review. A real person on our team will look at the decision and respond to you.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Questions individuals ask.</h2>
          <Accordion type="single" collapsible className="mt-10">
            {[
              ["Is Aurapply free for individuals?", "Yes. Always. The platform is paid by the companies that hire through it."],
              ["How long does the profile take to build?", "Around 15 minutes for the basics. Verification takes a few days depending on the document or institution, but it runs in the background."],
              ["What happens to my data?", "Stored in the EU, encrypted, used only for matching and verification. You can export, correct, or delete it at any time. We never sell it."],
              ["Can I see which companies have viewed my profile?", "Yes. Every match, view, and contact is logged in your dashboard."],
              ["Can I be matched to roles in other countries?", "Yes, if your preferences include them. We support EU-wide matching, with work authorization filtering."],
              ["What if I think the AI made a wrong decision?", "Use the 'Request human review' button on any match (or non-match). A real reviewer on our team will respond within a few business days."],
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Build your profile. Be found.</h2>
          <div className="mt-10">
            <Button asChild size="lg" className="px-8"><Link to="/signup">Create your profile</Link></Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">No applications. No fees. No surveillance.</p>
        </div>
      </section>
    </PageShell>
  );
}
