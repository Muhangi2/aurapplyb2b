import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/layout";
import {
  ProfileIcon,
  ReasoningIcon,
  ShieldIcon,
  ScaleIcon,
  TeamIcon,
  LockIcon,
  AuditTrailIcon,
} from "@/components/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurapply — The work, not the search, finds you" },
      {
        name: "description",
        content:
          "Aurapply is an AI hiring platform where roles find people, and the right conversation begins only when both sides agree to it.",
      },
      { property: "og:title", content: "Aurapply — The work, not the search, finds you" },
      {
        property: "og:description",
        content:
          "An AI hiring platform where roles find people, and the right conversation begins only when both sides agree to it.",
      },
    ],
  }),
  component: Landing,
});

/* ─────────────────────────── Section reveal ─────────────────────────── */

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-opacity duration-[400ms] ease-out ${visible ? "opacity-100" : "opacity-60"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

function Landing() {
  return (
    <PageShell>
      {/* ───── Section 1: Hero ───── */}
      <section className="relative px-6 min-h-[calc(100vh-3.5rem)] flex items-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 45%, color-mix(in oklab, var(--primary) 7%, transparent) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-[920px] text-center py-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-foreground/80 mb-8 relative">
            <span
              className="absolute inset-0 rounded-full p-[1px] -z-10"
              style={{
                background: "var(--gradient-cta)",
                WebkitMask:
                  "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
              aria-hidden
            />
            <span className="absolute inset-0 rounded-full bg-background -z-20" aria-hidden />
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            A new way to be hired
          </div>

          <h1 className="text-[52px] sm:text-7xl md:text-[88px] lg:text-[104px] font-semibold tracking-tight leading-[1.02] text-foreground">
            The work, not the search, finds you.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-[680px] mx-auto leading-relaxed">
            Aurapply is an AI hiring platform where roles find people, and the right
            conversation begins only when both sides agree to it.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/individuals"
              className="au-cta-gradient inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold"
            >
              Join the pool
            </Link>
            <Link
              to="/businesses"
              className="au-cta-gradient inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold"
              style={{ background: "linear-gradient(120deg,#1E2A5E 0%,#3B82F6 100%)" }}
            >
              Hire from the pool
            </Link>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Free for individuals. Sales-led for hiring teams.
          </p>

          <div className="mt-20 flex justify-center" aria-hidden>
            <div className="relative h-12 w-px overflow-hidden">
              <span
                className="absolute inset-x-0 top-0 h-6 w-px bg-gradient-to-b from-transparent via-primary to-transparent"
                style={{ animation: "scrollHint 2.2s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scrollHint {
            0% { transform: translateY(-100%); opacity: 0; }
            40% { opacity: 1; }
            100% { transform: translateY(200%); opacity: 0; }
          }
        `}</style>
      </section>

      {/* ───── Section 2: The new model ───── */}
      <Reveal>
        <section className="au-band px-6 py-24">
          <div className="mx-auto max-w-[1040px] text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              THE MODEL
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
              Posted role. Curated match.<br />Mutual consent.
            </h2>

            <div className="mt-16 grid gap-10 md:grid-cols-3 text-left">
              <ModelStep
                n="01"
                title="Roles are posted with structured requirements."
                body="Hiring teams describe what they need in specific, verifiable terms."
              />
              <ModelStep
                n="02"
                title="The platform finds the people who fit."
                body="Matching is initiated by the role. The AI surfaces the candidates whose profiles meet the requirements, with full reasoning."
              />
              <ModelStep
                n="03"
                title="The conversation starts only with consent."
                body="When a hiring team wants to contact a matched person, that person decides whether the conversation happens."
              />
            </div>

            <p className="mt-16 text-base md:text-lg text-muted-foreground max-w-[760px] mx-auto leading-relaxed">
              No applications. No searching. No conversation begins without both sides
              agreeing to it.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ───── Section 3: Why Aurapply ───── */}
      <Reveal>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1080px] text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              WHY AURAPPLY
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              Intelligent matching, built honestly.
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-3 text-left">
              <FeatureCard
                icon={<ReasoningIcon className="text-primary" size={48} />}
                title="Every match, explained."
                body="You see the reasoning behind every match. Both sides do."
              />
              <FeatureCard
                icon={<ShieldIcon className="text-primary" size={48} />}
                title="Consent built in."
                body="Your data is shared only when you have approved the contact."
              />
              <FeatureCard
                icon={<ScaleIcon className="text-primary" size={48} />}
                title="Tested for fairness."
                body="The matching engine is bias-tested quarterly. The methodology is published."
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* ───── Section 4: Two paths ───── */}
      <Reveal>
        <section className="au-band px-6 py-24">
          <div className="mx-auto max-w-[1080px] text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              WHICHEVER SIDE YOU ARE ON
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              The platform is open.
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-2 text-left">
              <PathCard
                to="/individuals"
                icon={<ProfileIcon className="text-primary" size={56} />}
                title="I am looking for work"
                body="Build a verified profile. Be matched to roles where you fit. Approve every contact."
                cta="Join the pool →"
              />
              <PathCard
                to="/businesses"
                icon={<TeamIcon className="text-primary" size={56} />}
                title="We are hiring"
                body="Post a role. Receive a curated shortlist of pre-verified candidates. Pay only when you hire."
                cta="Start a conversation →"
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* ───── Section 5: Closing ───── */}
      <Reveal>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[860px] text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              BUILT IN EUROPE
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
              Hiring, reimagined for the EU.
            </h2>

            <p className="mt-5 text-base text-muted-foreground max-w-[640px] mx-auto leading-relaxed">
              GDPR and EU AI Act, by design. Data stays in Europe. Reasoning is logged.
              Rights are real.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <CompliancePill icon={<LockIcon size={16} />} label="GDPR by design" />
              <CompliancePill icon={<ScaleIcon size={16} />} label="EU AI Act-ready" />
              <CompliancePill icon={<AuditTrailIcon size={16} />} label="Full audit trail" />
              <CompliancePill icon={<ShieldIcon size={16} />} label="Data stays in the EU" />
            </div>

            <div className="mt-10">
              <Link
                to="/documentation"
                className="text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Read the documentation →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </PageShell>
  );
}

/* ─────────────────────────── Subcomponents ─────────────────────────── */

function ModelStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <div className="text-sm font-semibold tracking-[0.14em] text-primary">{n}</div>
      <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-foreground leading-snug">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="group au-card au-card-hover relative overflow-hidden p-7">
      <span className="au-accent-bar-reveal" aria-hidden />
      <div className="mb-5">{icon}</div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function PathCard({
  to,
  icon,
  title,
  body,
  cta,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      to={to}
      className="group au-card au-card-hover relative overflow-hidden p-9 flex flex-col"
    >
      <span className="au-accent-bar-reveal" aria-hidden />
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{body}</p>
      <div className="mt-6 text-sm font-medium text-primary">{cta}</div>
    </Link>
  );
}

function CompliancePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-xs font-medium text-foreground/80">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}
