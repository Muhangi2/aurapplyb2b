import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, pageContainer } from "@/components/layout";
import { MarketingHero, ProductDemo } from "@/components/product-demo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/individuals")({
  head: () => ({
    meta: [
      { title: "For Individuals — Appointed" },
      {
        name: "description",
        content:
          "Build one professional profile. Appointed's AI matches you to roles where you actually fit, and recruiters reach out directly. Free for individuals, always.",
      },
      { property: "og:title", content: "For Individuals — Appointed" },
      {
        property: "og:description",
        content: "Stop applying. Start being matched. Free for individuals, always.",
      },
    ],
  }),
  component: Individuals,
});

function SectionBand({
  tone = "white",
  children,
}: {
  tone?: "white" | "grey";
  children: React.ReactNode;
}) {
  return (
    <section className={tone === "grey" ? "au-band border-y border-border" : ""}>
      <div className={`${pageContainer} py-16 md:py-20`}>{children}</div>
    </section>
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

function Why({ t, d }: { t: string; d: string }) {
  return (
    <div className="au-card p-6">
      <div className="font-semibold">{t}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
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
      <section className="py-16 sm:py-20 lg:py-24">
        <div className={pageContainer}>
          <MarketingHero
            eyebrow="For Individuals"
            title={
              <>
                Stop applying.
                <br />
                Start being matched.
              </>
            }
            lead="Build your professional profile once. Appointed's AI matches you to roles where your skills, experience, and preferences actually fit — and recruiters reach out to you."
            demo={<ProductDemo variant="profile" />}
          >
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link to="/signup">Create your profile</Link>
              </Button>
              <Link
                to="/signin"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Sign in
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground max-w-md">
              Free for individuals, always. We are paid by the companies that hire through us,
              never by candidates.
            </p>
          </MarketingHero>
        </div>
      </section>

      <SectionBand tone="grey">
        <p className="au-eyebrow">How it works</p>
        <h2 className="au-section-title mt-4 max-w-2xl">
          Three steps. No more application black holes.
        </h2>
        <p className="au-lead mt-4 max-w-2xl">
          Appointed replaces the cycle of applying, waiting, and being ghosted with a simple
          matching layer that works in the background.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Step
            n={1}
            t="Build a verified profile."
            d="Add your experience, skills, languages, and preferences. Verify your identity, education, and work history through our trusted EU partners. Verified profiles are prioritized in recruiter shortlists."
          />
          <Step
            n={2}
            t="AI matches you to roles that fit."
            d="When a recruiter posts a role, Appointed scores every consenting profile against the requirements. If you fit, you appear in the shortlist with full reasoning — which criteria you matched, which you partially matched, and what made you a strong fit."
          />
          <Step
            n={3}
            t="Recruiters reach out, you decide."
            d="When a recruiter wants to talk, they contact you directly with the role and details. You decide whether to engage. No spam, no mass outreach, no chasing applications."
          />
        </div>
        <div className="mt-14">
          <ProductDemo variant="matching" />
        </div>
      </SectionBand>

      <SectionBand>
        <p className="au-eyebrow">Why Appointed</p>
        <h2 className="au-section-title mt-4 max-w-2xl">
          Built around how hiring should work.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Why
            t="Transparent matching"
            d="You see exactly why you were matched, criterion by criterion. Skills, experience, location, language, salary fit — all explained."
          />
          <Why
            t="Verified credentials"
            d="We verify your identity, education, and work history through trusted EU providers. Verified profiles get prioritized in recruiter shortlists."
          />
          <Why
            t="Your data, your control"
            d="Revoke any consent at any time. Request human review of any AI decision. Export your data, correct it, or delete your account."
          />
          <Why
            t="No application fatigue"
            d="One profile, ongoing matching. You do not submit fifty applications or write the same cover letter ten times. The right opportunities find you."
          />
        </div>
      </SectionBand>

      <SectionBand tone="grey">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="au-eyebrow">Transparency</p>
            <h2 className="au-section-title mt-4">Honest about the AI.</h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Appointed uses AI to match candidates to roles. EU law requires us to be transparent
              about this, and we agree with the requirement.
            </p>
            <p>
              The AI scores how well your profile matches each role&apos;s stated requirements. It
              does not judge your personality, tone of voice, facial expressions, or anything else
              that would be guesswork.
            </p>
            <p>
              If you disagree with how the AI handled your profile for a specific role, every match
              has a &ldquo;Request human review&rdquo; button. A real reviewer will look at the
              decision and respond within a few business days.
            </p>
          </div>
        </div>
        <div className="mt-14">
          <ProductDemo variant="scoring" />
        </div>
      </SectionBand>

      <SectionBand>
        <p className="au-eyebrow">Profile quality</p>
        <h2 className="au-section-title mt-4 max-w-2xl">
          The profiles that get matched most.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <ProfileTip
            n="01"
            t="Specific, not generic."
            d="List concrete skills, technologies, and methodologies. The AI matches on specifics."
          />
          <ProfileTip
            n="02"
            t="Up to date."
            d="Profiles updated in the last 60 days are prioritized. Five minutes a month keeps your profile competitive."
          />
          <ProfileTip
            n="03"
            t="Verified where it matters."
            d="Verified identity, education, and recent employment make a profile stand out. Verification runs in the background."
          />
        </div>
        <div className="mt-14">
          <ProductDemo variant="inbox" />
        </div>
      </SectionBand>

      <SectionBand tone="grey">
        <div className="mx-auto max-w-2xl">
          <p className="au-eyebrow">Questions</p>
          <h2 className="au-section-title mt-4">Questions individuals ask.</h2>
          <Accordion type="single" collapsible className="mt-10">
            {[
              [
                "Is Appointed free for individuals?",
                "Yes. Always. The platform is paid by the companies that hire through it. You will never be asked to pay for an account, for matches, for verification, or for any platform feature.",
              ],
              [
                "How long does it take to build a profile?",
                "Around 15 minutes for the basics. Verification runs in the background and takes a few days depending on the document or institution.",
              ],
              [
                "What happens to my data?",
                "Stored in the EU, encrypted at rest and in transit, used only for matching and verification. You can export it, correct it, or delete it at any time.",
              ],
              [
                "Can I see which companies have viewed my profile?",
                "Yes. Every match, every profile view, and every recruiter contact is logged in your dashboard.",
              ],
              [
                "Can I be matched to roles in other countries?",
                "Yes, if your preferences include them. Appointed supports EU-wide matching, with work authorization filtering.",
              ],
              [
                "What if I think the AI made a wrong decision?",
                "Use the ‘Request human review’ button on any match where you think the AI got it wrong. A real reviewer will look at the decision and respond with an explanation.",
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
      </SectionBand>

      <section className="py-20 md:py-24">
        <div className={`${pageContainer} mx-auto max-w-2xl text-center`}>
          <p className="au-eyebrow">Get started</p>
          <h2 className="au-section-title mt-4">Build your profile. Be found.</h2>
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
