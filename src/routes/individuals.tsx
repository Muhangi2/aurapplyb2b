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
  ReasoningIcon,
  VerifiedIcon,
  ShieldIcon,
  MatchStrengthIcon,
  HumanReviewIcon,
  CheckmarkIcon,
  type IconProps,
} from "@/components/icons";

export const Route = createFileRoute("/individuals")({
  head: () => ({
    meta: [
      { title: "For Individuals — Aurapply" },
      {
        name: "description",
        content:
          "Build one professional profile. Aurapply's AI matches you to roles where you actually fit, and recruiters reach out directly. Free for individuals, always.",
      },
      { property: "og:title", content: "For Individuals — Aurapply" },
      {
        property: "og:description",
        content: "Stop applying. Start being matched. Free for individuals, always.",
      },
    ],
  }),
  component: Individuals,
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
      {children}
    </div>
  );
}

function ProfileMockup() {
  return (
    <div className="au-card p-6 w-full max-w-sm mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-base font-semibold">Anna M.</div>
          <div className="text-sm text-muted-foreground">Senior Product Marketing Manager</div>
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
        {["Product Marketing", "B2B SaaS", "German", "English"].map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
          >
            {t}
          </span>
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
      <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
        {String(n).padStart(2, "0")}
      </div>
      <div className="mt-4 text-base font-semibold">{t}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}

function Why({
  icon: Icon,
  t,
  d,
  accentDot,
}: {
  icon: React.ComponentType<IconProps>;
  t: string;
  d: string;
  accentDot?: boolean;
}) {
  return (
    <div className="relative overflow-hidden au-card au-card-hover p-6">
      <span className="au-accent-bar-reveal" aria-hidden />
      <Icon size={22} className="text-primary" accentDot={accentDot} />
      <div className="mt-4 font-semibold">{t}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}

function ProfileTip({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="au-card p-6">
      <div className="text-3xl font-semibold tracking-tight text-primary tabular-nums">{n}</div>
      <div className="mt-3 text-base font-semibold">{t}</div>
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
            <Eyebrow>For Individuals</Eyebrow>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Stop applying. Start being matched.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Build your professional profile once. Aurapply&apos;s AI matches you to roles
              where your skills, experience, and preferences actually fit, and recruiters reach
              out to you. No more applications into the void, no more chasing jobs that are not
              right.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Button asChild size="lg">
                <Link to="/signup">Create your profile</Link>
              </Button>
              <Link to="/signin" className="text-sm text-muted-foreground hover:text-foreground">
                Sign in
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground max-w-md">
              Free for individuals, always. We are paid by the companies that hire through us,
              never by candidates.
            </p>
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
      <section className="px-6 py-20 au-band border-y border-border">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
            Three steps. No more application black holes.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Aurapply replaces the cycle of applying, waiting, and being ghosted with a simple
            matching layer that works in the background.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Step
              n={1}
              t="Build a verified profile."
              d="Add your experience, skills, languages, and preferences. Verify your identity, education, and work history through our trusted EU partners. Verified profiles are prioritized in recruiter shortlists, which means you get seen first."
            />
            <Step
              n={2}
              t="AI matches you to roles that fit."
              d="When a recruiter posts a role, Aurapply's matching engine scores every consenting profile against the requirements. If you fit, you appear in the recruiter's shortlist with full reasoning: which criteria you matched, which you partially matched, and what made you a strong fit. No black box."
            />
            <Step
              n={3}
              t="Recruiters reach out, you decide."
              d="When a recruiter wants to talk, they contact you directly with the role and details. You decide whether to engage. No spam, no mass outreach, no chasing applications. The right conversations come to you."
            />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Why Aurapply</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
            Built around how hiring should work.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Why
              icon={ReasoningIcon}
              t="Transparent matching"
              d="You see exactly why you were matched, criterion by criterion. Skills, experience, location, language, salary fit, all explained. If you were matched at 87%, you know what makes up the 87% and what makes up the missing 13%."
            />
            <Why
              icon={VerifiedIcon}
              accentDot
              t="Verified credentials"
              d="We verify your identity, education, and work history through trusted EU providers. Verified profiles get prioritized in recruiter shortlists. We handle the verification process, you get the credibility."
            />
            <Why
              icon={ShieldIcon}
              t="Your data, your control"
              d="Revoke any consent at any time. Request human review of any AI decision. Export your data, correct it, or delete your account. Your rights under GDPR are built into the product, not buried in a policy."
            />
            <Why
              icon={MatchStrengthIcon}
              t="No application fatigue"
              d="One profile, ongoing matching. You do not submit fifty applications, you do not get ghosted, you do not write the same cover letter ten times. The right opportunities find you, and you decide which ones to engage with."
            />
          </div>
        </div>
      </section>

      {/* Honest about AI */}
      <section className="px-6 py-20 au-band border-y border-border">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Transparency</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Honest about the AI.
            </h2>
            <div className="mt-8">
              <HumanReviewIcon size={64} className="text-primary" />
            </div>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Aurapply uses AI to match candidates to roles. EU law requires us to be transparent
              about this, and we agree with the requirement. So here is what the AI actually does
              and does not do.
            </p>
            <p>
              The AI scores how well your profile matches each role&apos;s stated requirements.
              It looks at skills, experience, education, languages, location, work authorization,
              and salary fit. It does not judge your personality, your tone of voice, your facial
              expressions, your communication style, or anything else that would be guesswork.
            </p>
            <p>
              If you disagree with how the AI handled your profile for a specific role, every
              match has a &ldquo;Request human review&rdquo; button. A real reviewer on our team
              will look at the decision and respond to you within a few business days. You can
              also see, at any time, the full reasoning the AI used for any match you appeared
              in.
            </p>
          </div>
        </div>
      </section>

      {/* Profile quality */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Profile quality</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
            The profiles that get matched most.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <ProfileTip
              n="01"
              t="Specific, not generic."
              d="List concrete skills, technologies, and methodologies. ‘Led B2B SaaS product launches across DACH’ beats ‘experienced marketing professional.’ The AI matches on specifics."
            />
            <ProfileTip
              n="02"
              t="Up to date."
              d="Profiles updated in the last 60 days are prioritized. Recently active candidates get matched first. Five minutes a month keeps your profile competitive."
            />
            <ProfileTip
              n="03"
              t="Verified where it matters."
              d="Verified identity, education, and recent employment make a profile stand out. Verification is free and runs in the background, you do not need to do it all at once."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 au-band border-y border-border">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Questions individuals ask.
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {[
              [
                "Is Aurapply free for individuals?",
                "Yes. Always. The platform is paid by the companies that hire through it. You will never be asked to pay for an account, for matches, for verification, or for any platform feature.",
              ],
              [
                "How long does it take to build a profile?",
                "Around 15 minutes for the basics: experience, skills, languages, preferences. Verification runs in the background and takes a few days depending on the document or institution. You do not need to wait for verification to be matched, but verified profiles do get prioritized.",
              ],
              [
                "What happens to my data?",
                "Stored in the EU, encrypted at rest and in transit, used only for matching and verification. You can export it, correct it, or delete it at any time. We never sell your data, we never share it with third parties for advertising, and recruiters only see your full profile after they decide to contact you.",
              ],
              [
                "Can I see which companies have viewed my profile?",
                "Yes. Every match, every profile view, and every recruiter contact is logged in your dashboard. You see the full picture of how the platform is working for you.",
              ],
              [
                "Can I be matched to roles in other countries?",
                "Yes, if your preferences include them. Aurapply supports EU-wide matching, with work authorization filtering so you only see roles you can actually take.",
              ],
              [
                "What if I think the AI made a wrong decision about my profile?",
                "Use the ‘Request human review’ button on any match (or non-match) where you think the AI got it wrong. A real reviewer on our team will look at the decision, the reasoning, and your profile, then respond to you with an explanation. Decisions can be overturned if the review finds an error.",
              ],
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Get started</Eyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Build your profile. Be found.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            It takes 15 minutes. The right opportunities come to you, on your terms.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="au-cta-gradient px-8 border-0">
              <Link to="/signup">Create your profile</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            No applications. No fees. No surveillance.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
