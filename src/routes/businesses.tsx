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
  ScaleIcon,
  TeamIcon,
  JobPostingIcon,
  ShortlistIcon,
  VerifiedIcon,
  ArrowRightIcon,
} from "@/components/icons";

export const Route = createFileRoute("/businesses")({
  head: () => ({
    meta: [
      { title: "For Recruiters — Aurapply" },
      {
        name: "description",
        content:
          "Sales-led AI sourcing for serious EU hiring teams. Curated shortlists, no subscription. Pay only when you hire.",
      },
      { property: "og:title", content: "For Recruiters — Aurapply" },
      {
        property: "og:description",
        content:
          "Curated hiring across the EU. Request access, take a short qualification call, then post roles and hire.",
      },
    ],
  }),
  component: Businesses,
});

function Constellation() {
  // Abstract node-constellation in royal blue / indigo / sky
  const nodes = [
    { x: 60, y: 70, r: 5, c: "var(--primary)", o: 1 },
    { x: 140, y: 40, r: 3, c: "#6366f1", o: 0.85 },
    { x: 230, y: 90, r: 6, c: "var(--primary)", o: 0.95 },
    { x: 100, y: 150, r: 4, c: "#818cf8", o: 0.7 },
    { x: 200, y: 180, r: 5, c: "#38bdf8", o: 0.85 },
    { x: 280, y: 200, r: 3, c: "#6366f1", o: 0.6 },
    { x: 320, y: 110, r: 4, c: "#38bdf8", o: 0.55 },
    { x: 50, y: 220, r: 3, c: "#818cf8", o: 0.5 },
    { x: 170, y: 260, r: 4, c: "var(--primary)", o: 0.75 },
    { x: 260, y: 260, r: 3, c: "#6366f1", o: 0.45 },
  ];
  const edges = [
    [0, 1], [1, 2], [0, 3], [2, 3], [3, 4], [4, 5], [2, 6],
    [4, 8], [3, 7], [7, 8], [8, 9], [5, 9], [6, 5], [1, 6],
  ];
  return (
    <svg viewBox="0 0 360 320" className="w-full max-w-md mx-auto">
      <defs>
        <radialGradient id="constGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="180" cy="160" r="140" fill="url(#constGlow)" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--primary)"
          strokeOpacity={0.18}
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.c} fillOpacity={n.o} />
      ))}
    </svg>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="au-card p-6">
      <div className="text-xs font-semibold tracking-[0.18em] text-primary">STEP {n}</div>
      <h3 className="mt-2 font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function PriceCol({
  Icon,
  title,
  body,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="au-card au-card-hover p-6">
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon size={24} />
      </div>
      <h3 className="mt-5 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function NumberedCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="au-card p-6">
      <div className="text-3xl font-semibold tracking-tight text-primary">{n}</div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function SectorLine({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start py-2.5 border-b border-border/60 last:border-0">
      <span className="mt-2 inline-block h-px w-5 bg-primary/60 shrink-0" />
      <span className="text-sm text-foreground/90 leading-relaxed">{children}</span>
    </li>
  );
}

function Businesses() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative">
        <div className="au-hero-glow" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-primary">FOR RECRUITERS</div>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Curated hiring. <br />
              <span className="text-primary">Pay only when you hire.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Aurapply is a sales-led AI sourcing platform for serious hiring teams across Europe.
              Pre-matched, pre-verified candidates delivered for each role. No subscription, no
              setup fee, no commitment. You pay a placement fee only when you hire.
            </p>
            <div className="mt-7 flex items-center gap-5 flex-wrap">
              <Button asChild size="lg">
                <Link to="/businesses/request">
                  Request access <ArrowRightIcon size={16} className="ml-1" />
                </Link>
              </Button>
              <Link to="/r/signin" className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
                Sign in
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground/90 max-w-md leading-relaxed">
              Access is granted after a short qualification call. We work with teams hiring across
              the EU in technology, engineering, healthcare, finance, and other regulated sectors.
            </p>
          </div>
          <div className="relative">
            <div className="au-card-elevated p-8 bg-gradient-to-br from-primary/5 via-background to-indigo-500/5">
              <Constellation />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 - HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.18em] text-primary">HOW IT WORKS</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Three steps. From request to first hire.</h2>
          <p className="mt-3 text-muted-foreground">
            A short, structured access process, then sourcing that works.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Step
            n="01"
            title="Request access."
            body="Tell us briefly about your team and what you hire for. We review requests within one business day. If we are a fit, we schedule a short qualification call."
          />
          <Step
            n="02"
            title="Qualification call."
            body="A 30-minute call where we walk you through the matching methodology, the pricing model, the compliance setup, and answer your questions. If both sides are aligned, your account is provisioned the same day."
          />
          <Step
            n="03"
            title="Post roles, receive shortlists, hire."
            body="Once you have an account, post roles freely, receive matched candidates within minutes, contact whoever you want, regenerate batches when needed. You only pay when you hire, with a 12% placement fee on first-year salary."
          />
        </div>
      </section>

      {/* SECTION 2 - WHY SALES-LED (light grey band) */}
      <section className="au-band">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-primary">OUR APPROACH</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Why we work with you, not just for you.
            </h2>
            <div className="mt-8 grid h-16 w-16 place-items-center rounded-xl bg-primary/10 text-primary">
              <TeamIcon size={36} />
            </div>
          </div>
          <div className="space-y-5 text-[15px] text-foreground/85 leading-relaxed">
            <p>
              Aurapply is not a self-serve tool. Every hiring team we work with goes through a
              short qualification process before getting an account. This is deliberate, and it
              benefits both sides.
            </p>
            <p>
              For you, it means we understand your hiring patterns, your sectors, your compliance
              context, and your role requirements before you post your first job. Your first
              shortlist is calibrated to your needs, not generic.
            </p>
            <p>
              For us, it means we work with hiring teams who are serious about quality, compliance,
              and matching. We do not chase volume, we build long-term relationships. The teams
              that use Aurapply tend to keep using it because the matching gets better the longer
              we work together.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - PRICING */}
      <section className="mx-auto max-w-6xl px-6 py-20" id="pricing">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.18em] text-primary">PRICING</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            No subscription. Pay only when you hire.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <PriceCol
            Icon={JobPostingIcon}
            title="Posting roles is free."
            body="Once your account is provisioned, post as many roles as you need. No card required, no monthly minimum, no setup fee."
          />
          <PriceCol
            Icon={ShortlistIcon}
            title="Reviewing is free."
            body="Review shortlists, see the AI reasoning for each candidate, regenerate batches, contact whoever you want. Still free."
          />
          <PriceCol
            Icon={VerifiedIcon}
            title="Pay only when you hire."
            body="When you hire a candidate sourced through Aurapply, you pay a one-time placement fee of 12% of first-year salary. That is the entire pricing model."
          />
        </div>
        <p className="mt-8 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Most teams hire their first candidate through Aurapply within 30 days of provisioning. If
          you do not, you have lost nothing. This pricing exists because we are confident in the
          matching.
        </p>
      </section>

      {/* SECTION 4 - MATCHING */}
      <section className="au-band">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-[0.18em] text-primary">THE MATCHING ENGINE</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Methodology, not magic.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <NumberedCard
              n="01"
              title="Structured criteria, transparent weights."
              body="The AI scores candidates on the criteria you specify: skills, experience, education, language, location, authorization, salary fit. Each criterion has a transparent weight you can see and adjust. No personality scoring, no tone analysis, no inferred traits."
            />
            <NumberedCard
              n="02"
              title="Recency and verification, bias-tested."
              body="Candidates with profiles updated in the last 60 days are prioritized over dormant ones. Verified profiles are prioritized over unverified ones. Both signals are bias-tested quarterly to ensure they do not produce disparate impact across protected categories."
            />
            <NumberedCard
              n="03"
              title="Reasoning visible, decisions auditable."
              body="You see why each candidate was matched, criterion by criterion. So does the candidate. So does our audit log. Every decision is interrogable. This is what 'high-risk AI with human oversight' looks like in practice."
            />
          </div>
        </div>
      </section>

      {/* SECTION 5 - COMPLIANCE */}
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2 md:items-start">
        <div>
          <div className="text-xs font-semibold tracking-[0.18em] text-primary">COMPLIANCE</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">EU AI Act, handled.</h2>
          <div className="mt-8 grid h-16 w-16 place-items-center rounded-xl bg-primary/10 text-primary">
            <ScaleIcon size={36} />
          </div>
        </div>
        <div className="space-y-5 text-[15px] text-foreground/85 leading-relaxed">
          <p>
            Recruitment AI is classified as high-risk under the EU AI Act (Annex III, Section 4).
            From August 2026, this triggers obligations on documentation, human oversight, logging,
            bias testing, and transparency. Aurapply is built around these requirements from the
            foundation.
          </p>
          <p>
            As the platform provider, we handle the heaviest compliance lift: technical
            documentation, CE marking, bias testing infrastructure, audit logs, and registration in
            the EU AI database. Once you have an account, you have access to the full compliance
            documentation package you need for your own procurement and DPIA processes.
          </p>
          <p>
            On your qualification call, we walk your team through how Aurapply's compliance approach
            maps to your specific obligations as a deployer. If your legal team has detailed
            questions, we connect them with ours.
          </p>
        </div>
      </section>

      {/* SECTION 6 - WHO WE WORK WITH */}
      <section className="au-band">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-primary">WHO WE WORK WITH</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Hiring teams across regulated and technical sectors.
            </h2>
            <ul className="mt-7">
              <SectorLine>Technology and engineering teams hiring in DACH and across the EU</SectorLine>
              <SectorLine>Healthcare and pharmaceutical organizations with structured hiring processes</SectorLine>
              <SectorLine>Financial services and insurance teams with strict compliance requirements</SectorLine>
              <SectorLine>Logistics, manufacturing, and FMCG companies with high-volume specialist hiring</SectorLine>
            </ul>
            <p className="mt-7 text-sm text-muted-foreground leading-relaxed">
              Aurapply works best for teams hiring 5+ roles per year in roles where match quality
              matters more than candidate volume. If you are running occasional one-off hires,
              Aurapply may not be the right fit, and we will tell you so.
            </p>
          </div>
          <div className="au-card-elevated p-8 bg-gradient-to-br from-primary/5 via-background to-indigo-500/5">
            <Constellation />
          </div>
        </div>
      </section>

      {/* SECTION 7 - FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-xs font-semibold tracking-[0.18em] text-primary">QUESTIONS</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Common questions before requesting access.
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem value="q1">
            <AccordionTrigger>Why isn't there a self-serve signup?</AccordionTrigger>
            <AccordionContent>
              Aurapply is built around match quality and long-term hiring partnerships, not
              high-volume self-serve usage. The short qualification process ensures we understand
              your hiring needs before you post your first role, and it ensures we only work with
              teams where Aurapply can genuinely deliver value.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>How long does the access process take?</AccordionTrigger>
            <AccordionContent>
              Most requests receive a response within one business day. The qualification call is
              30 minutes. If both sides are aligned, your account is provisioned the same day as
              the call. Total time from request to working account is typically 2-5 business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>What does it cost to use Aurapply?</AccordionTrigger>
            <AccordionContent>
              Nothing, until you hire. Posting roles, reviewing candidates, contacting them,
              regenerating shortlists, all free. When you hire someone sourced through Aurapply,
              you pay a one-time fee of 12% of first-year salary. No subscription, no setup fee, no
              platform fee.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>What happens if a candidate we hire does not work out?</AccordionTrigger>
            <AccordionContent>
              Standard practice is a 90-day replacement guarantee. If a candidate hired through
              Aurapply leaves or is terminated within 90 days, we source a replacement at no
              additional placement fee. Details in the service agreement at provisioning.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q5">
            <AccordionTrigger>How does Aurapply integrate with our existing ATS?</AccordionTrigger>
            <AccordionContent>
              Aurapply is a sourcing layer, not a replacement for your ATS. Candidate details
              export cleanly to Workday, SuccessFactors, Personio, Greenhouse, and other systems.
              Direct integrations with major ATSes are on our roadmap; for now, export and import
              is clean and well-documented.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q6">
            <AccordionTrigger>Who do we work with on the Aurapply side?</AccordionTrigger>
            <AccordionContent>
              Each customer is assigned a dedicated point of contact for both account and
              compliance questions. For larger teams, we also assign a CSM for ongoing match
              quality calibration. You will not be passed between support queues.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-primary">REQUEST ACCESS</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight">
          Hire from your best-fit eight.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Submit a brief request. We respond within one business day.
        </p>
        <div className="mt-7 flex justify-center">
          <Button asChild size="lg">
            <Link to="/businesses/request">
              Request access <ArrowRightIcon size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          No commitment. No subscription. No risk in asking.
        </p>
      </section>
    </PageShell>
  );
}
