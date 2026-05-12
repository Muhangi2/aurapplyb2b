import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/layout";
import { supabase } from "@/integrations/supabase/client";
import {
  ProfileIcon,
  CompanyIcon,
  LocationIcon,
  VerifiedIcon,
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
      { title: "Aurapply — The AI hiring platform Europe trusts" },
      {
        name: "description",
        content:
          "Intelligent, transparent matching between people and roles. GDPR and EU AI Act by design.",
      },
      { property: "og:title", content: "Aurapply — The AI hiring platform Europe trusts" },
      {
        property: "og:description",
        content: "Intelligent, transparent matching between people and roles.",
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

/* ─────────────────────────── Count-up ─────────────────────────── */

function CountUp({
  value,
  suffix = "",
  duration = 800,
}: {
  value: number | null;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || value == null) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, started]);

  useEffect(() => {
    if (!started || value == null) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  if (value == null) {
    return (
      <span ref={ref} className="text-base font-medium text-muted-foreground tracking-wide">
        Launching
      </span>
    );
  }
  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─────────────────────────── Live stats hook ─────────────────────────── */

type Stats = {
  profiles: number | null;
  sectors: number | null;
  countries: number | null;
  verifiedPct: number | null;
};

function useLiveStats(): Stats {
  const [stats, setStats] = useState<Stats>({
    profiles: null,
    sectors: null,
    countries: null,
    verifiedPct: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Profiles count (anon will be limited by RLS — handled below)
        const { count: profiles } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        const { count: sectors } = await supabase
          .from("companies")
          .select("industry", { count: "exact", head: true });

        // We can't reliably aggregate distinct values via REST. Use null → "Launching"
        // unless we have a meaningful profile count to derive from.
        const ready = (profiles ?? 0) > 25;

        if (!cancelled) {
          setStats({
            profiles: ready ? profiles : null,
            sectors: ready ? (sectors ?? null) : null,
            countries: null,
            verifiedPct: null,
          });
        }
      } catch {
        if (!cancelled) {
          setStats({ profiles: null, sectors: null, countries: null, verifiedPct: null });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}

/* ─────────────────────────── Page ─────────────────────────── */

function Landing() {
  const stats = useLiveStats();

  return (
    <PageShell>
      {/* ───── Section 1: Hero ───── */}
      <section className="relative px-6 min-h-[calc(100vh-3.5rem)] flex items-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 45%, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-[880px] text-center py-20">
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
            AI matching, live across Europe
          </div>

          <h1 className="text-[56px] sm:text-7xl md:text-[88px] font-semibold tracking-tight leading-[1.02] text-foreground">
            The AI hiring platform<br />
            <span className="au-gradient-text">Europe trusts.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Intelligent, transparent matching between people and roles.
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

      {/* ───── Section 2: Live signal ───── */}
      <Reveal>
        <section className="au-band px-6 py-20">
          <div className="mx-auto max-w-[960px] text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              INSIDE AURAPPLY
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              A growing pool of European talent.
            </h2>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<ProfileIcon className="text-primary" size={28} />} value={stats.profiles} label="Profiles in the pool" />
              <StatCard icon={<CompanyIcon className="text-primary" size={28} />} value={stats.sectors} label="Sectors represented" />
              <StatCard icon={<LocationIcon className="text-primary" size={28} />} value={stats.countries} label="Countries served" />
              <StatCard icon={<VerifiedIcon className="text-primary" size={28} accentDot={false} />} value={stats.verifiedPct} suffix="%" label="Verified profiles" />
            </div>

            <p className="mt-10 text-sm text-muted-foreground">We do not inflate.</p>
          </div>
        </section>
      </Reveal>

      {/* ───── Section 3: What makes Aurapply different ───── */}
      <Reveal>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[1080px] text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              WHY AURAPPLY
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              AI matching, without the AI nonsense.
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-3 text-left">
              <FeatureCard
                icon={<ReasoningIcon className="text-primary" size={48} />}
                title="Every match, explained."
                body="You see the reasoning. Always."
              />
              <FeatureCard
                icon={<ShieldIcon className="text-primary" size={48} />}
                title="Consent built in."
                body="No data shared without your active approval."
              />
              <FeatureCard
                icon={<ScaleIcon className="text-primary" size={48} />}
                title="Tested for fairness."
                body="Quarterly bias testing, published methodology."
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

      {/* ───── Section 5: Compliance closing ───── */}
      <Reveal>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[860px] text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              BUILT FOR EUROPE
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
              GDPR and EU AI Act, by design.
            </h2>

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

function StatCard({
  icon,
  value,
  suffix,
  label,
}: {
  icon: React.ReactNode;
  value: number | null;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="au-card p-6 text-left">
      <div className="mb-4">{icon}</div>
      <div className="min-h-[3rem] flex items-end">
        <CountUp value={value} suffix={suffix} />
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
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
