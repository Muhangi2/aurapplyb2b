import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ScaleIcon,
  ShieldIcon,
  RegenerateIcon,
  WarningIcon,
  CheckmarkIcon,
  type IconProps,
} from "@/components/icons";
import { toast } from "sonner";

export const Route = createFileRoute("/businesses")({
  head: () => ({
    meta: [
      { title: "For Businesses — Aurapply" },
      { name: "description", content: "Hire from a curated pool of eight pre-matched, pre-verified candidates per role. EU AI Act-ready." },
      { property: "og:title", content: "For Businesses — Aurapply" },
      { property: "og:description", content: "Replace inbound noise with eight matched candidates per role. Compliance built in." },
    ],
  }),
  component: Businesses,
});

function ShortlistMockup() {
  const items = [
    { id: "A347", role: "Senior Product Manager · 6y", score: 92, top: "Strong B2B SaaS background", verified: true },
    { id: "B118", role: "Product Marketing · 5y", score: 86, top: "GTM in HR tech", verified: true },
    { id: "T263", role: "Product Manager · 4y", score: 78, top: "Marketplace experience", verified: false },
  ];
  return (
    <div className="au-card p-5 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Shortlist · 8 candidates</div>
        <div className="text-xs text-muted-foreground">Batch 1</div>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((c) => (
          <div key={c.id} className="border border-border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">#{c.id}</span>
                {c.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-success bg-success/10 rounded-full px-1.5 py-0.5">
                    <CheckmarkIcon size={10} /> Verified
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold tabular-nums">{c.score}%</span>
            </div>
            <div className="mt-1.5 text-sm">{c.role}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.top}</div>
            <div className="mt-2 h-1 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${c.score}%` }} />
            </div>
          </div>
        ))}
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

function PriceCard({
  name,
  price,
  desc,
  highlighted,
  cta,
  onClick,
}: {
  name: string;
  price: string;
  desc: string;
  highlighted?: boolean;
  cta: string;
  onClick: () => void;
}) {
  return (
    <div className={`au-card p-6 flex flex-col ${highlighted ? "ring-2 ring-primary" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{name}</div>
        {highlighted && <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Most teams</span>}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{price}</div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
      <Button className="mt-6" variant={highlighted ? "default" : "outline"} onClick={onClick}>{cta}</Button>
    </div>
  );
}

function Businesses() {
  const [contactOpen, setContactOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleEnterprise() {
    setContactOpen(true);
  }
  function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setContactOpen(false);
      toast.success("Thanks. Our team will be in touch within one business day.");
    }, 600);
  }

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-5 items-center">
          <div className="md:col-span-3">
            <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">For Businesses</div>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Hire from a curated pool. Not a flood of applications.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Aurapply replaces the noise of inbound applications with eight pre-matched, pre-verified candidates per role. You see the reasoning, you make the call, you stay compliant with the EU AI Act.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Button asChild size="lg"><Link to="/r/signup">Post a job</Link></Button>
              <Link to="/r/signin" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">EU AI Act-ready. GDPR-compliant. Built for serious hiring.</p>
          </div>
          <div className="md:col-span-2">
            <div className="relative">
              <div className="au-gradient-panel absolute inset-x-2 inset-y-6 md:inset-y-8" aria-hidden />
              <div className="relative pt-6 pb-6 px-2">
                <ShortlistMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How sourcing works */}
      <section className="px-6 py-20 au-band border-y border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
            Three steps. From job posted to shortlist in minutes.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Step n={1} t="Post the role." d="Define the requirements, must-haves, and preferences. Clear criteria, not fluffy job descriptions. The matching engine cares about specifics." />
            <Step n={2} t="Receive your shortlist." d="Within minutes, get eight matched candidates with full reasoning. Match strength per criterion, verification status, gaps clearly flagged. Anonymous until you decide to contact." />
            <Step n={3} t="Review, contact, refine." d="Review the reasoning, contact the candidates you want. Not a fit? Reject the batch and we regenerate with adjusted criteria. No quotas, no penalties." />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">Built for serious hiring teams.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Why icon={ScaleIcon} t="Built-in compliance" d="Aurapply is designed around the EU AI Act (Annex III, recruitment) and GDPR. Audit trails, human-in-the-loop, transparent reasoning, candidate rights. The compliance work is already done." />
            <Why icon={ShieldIcon} t="Pre-verified candidates" d="Identity, education, and employment verified through trusted EU providers before candidates reach you. Less vetting, fewer late-stage surprises, faster time to hire." />
            <Why icon={RegenerateIcon} t="Reject and resample, freely" d="If a batch is not the right fit, regenerate with adjusted criteria. No quotas, no extra fees, no algorithmic penalty for being selective. Get the shortlist that actually works." />
            <Why icon={WarningIcon} t="Honest matching, not hype" d="Partial matches are flagged clearly. The system tells you what fits and what does not, so you can make decisions faster. No inflated scores, no padded shortlists." />
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="px-6 py-20 au-band border-y border-border">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">EU AI Act, handled.</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>Recruitment AI is classified as high-risk under the EU AI Act (Annex III, Section 4). From August 2026, this triggers obligations on documentation, human oversight, logging, bias testing, and transparency. Most platforms are scrambling to retrofit compliance. Aurapply is built around these requirements from the foundation.</p>
            <p>As the platform provider, we handle the heaviest compliance lift: technical documentation, CE marking, bias testing infrastructure, audit logs, and registration in the EU AI database. As the deployer using the platform, you get the documentation you need for your own procurement and DPIA processes.</p>
            <p>Compliance documentation is available to enterprise customers under NDA. Smaller customers get the standard documentation package. Either way, you can show your legal and compliance teams exactly how the platform meets EU obligations.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Pricing built for how you hire.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <PriceCard
              name="SMB"
              price="€450 / month"
              desc="For companies hiring 5–15 people per year. Unlimited matches across up to 5 active roles, standard compliance documentation."
              cta="Get started"
              onClick={() => (window.location.href = "/r/signup?tier=smb")}
            />
            <PriceCard
              name="Growth"
              price="€2,000 / month"
              desc="For companies hiring 30–100 people per year. Up to 25 active roles, verified-candidate access, ATS integration, priority support."
              highlighted
              cta="Get started"
              onClick={() => (window.location.href = "/r/signup?tier=growth")}
            />
            <PriceCard
              name="Enterprise"
              price="Custom"
              desc="For higher-volume and regulated-sector hiring. Deep ATS integration, dedicated CSM, full compliance package, SLA."
              cta="Contact sales"
              onClick={handleEnterprise}
            />
          </div>
          <p className="mt-8 text-sm text-muted-foreground max-w-2xl">
            All plans include the full audit trail, bias testing transparency, and human-in-the-loop infrastructure. Compliance is not a tier.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 au-band border-y border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Questions businesses ask.</h2>
          <Accordion type="single" collapsible className="mt-10">
            {[
              ["How fast do we get our first shortlist?", "Usually within minutes of posting. The matching engine runs against the active candidate pool in real time."],
              ["What if the eight candidates are not a fit?", "Reject and regenerate. Adjust criteria, widen the search, or tighten it. No fees, no limits."],
              ["How does the EU AI Act apply to us as the employer?", "As the deployer, you are responsible for the final hiring decision and for using the platform with appropriate oversight. Aurapply provides the infrastructure: reasoning, audit trails, and documentation. We will walk your team through the deployer obligations during onboarding."],
              ["What integrations do you support?", "Personio, BambooHR, and Greenhouse on the Growth tier. Workday and SAP SuccessFactors on Enterprise. More integrations on request."],
              ["Where is candidate data stored?", "In the EU. Encrypted at rest and in transit. Access controls and audit logging on every read."],
              ["Can we get compliance documentation for our procurement team?", "Yes. Standard documentation is available to all customers; full documentation including DPIA inputs and CE marking evidence is available to Growth and Enterprise customers under NDA."],
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
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Hire from your best-fit eight.</h2>
          <div className="mt-10">
            <Button asChild size="lg" className="px-8"><Link to="/r/signup">Post your first job</Link></Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">Free trial of your first role. No card required.</p>
        </div>
      </section>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact sales</DialogTitle>
            <DialogDescription>Tell us a bit about your hiring needs. We will reply within one business day.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitContact} className="space-y-4 mt-2">
            <div>
              <Label htmlFor="cname">Name <span className="text-muted-foreground">*</span></Label>
              <Input id="cname" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="cemail">Work email <span className="text-muted-foreground">*</span></Label>
              <Input id="cemail" type="email" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="ccompany">Company <span className="text-muted-foreground">*</span></Label>
              <Input id="ccompany" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="cmsg">What are you hiring for?</Label>
              <Textarea id="cmsg" rows={4} className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Sending…" : "Send"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
