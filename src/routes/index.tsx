import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/aurapply-logo.png";

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

/* ─────────────────────────── Page ─────────────────────────── */

function Landing() {
  return (
    <div
      className="min-h-screen w-full bg-white text-slate-700 selection:bg-blue-500/20 selection:text-blue-900"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <LightNav />

      {/* ───── Hero ───── */}
      <main className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background detail */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[520px] bg-blue-500/10 blur-[120px] rounded-full opacity-70" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse at 50% 30%, #000 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 30%, #000 40%, transparent 80%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-[11px] font-medium tracking-[0.14em] text-blue-700 uppercase">
              A new way to be hired
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-6 leading-[1.04]">
            The work, not the search,
            <br />
            <span className="text-slate-400">finds you.</span>
          </h1>

          {/* Subhead */}
          <p className="max-w-xl text-base md:text-lg text-slate-600 mb-10 leading-relaxed">
            Aurapply is an AI hiring platform where roles find people, and the
            right conversation begins only when both sides agree to it.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <Link
              to="/individuals"
              className="px-6 py-2.5 bg-slate-900 text-white font-medium text-sm rounded-md hover:bg-slate-800 transition-all shadow-sm"
            >
              Join the pool
            </Link>
            <Link
              to="/businesses"
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 font-medium text-sm rounded-md hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Hire from the pool
            </Link>
          </div>

          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.18em] mb-16">
            Free for individuals · Sales-led for hiring teams
          </p>

          {/* Product surface hint */}
          <ProductSurface />
        </div>
      </main>

      {/* ───── The model ───── */}
      <Section eyebrow="The model" title={<>Posted role. Curated match. <span className="text-slate-400">Mutual consent.</span></>}>
        <div className="mt-14 grid gap-8 md:grid-cols-3 text-left">
          <ModelStep
            n="01"
            title="Roles are posted with structured requirements."
            body="Hiring teams describe what they need in specific, verifiable terms."
          />
          <ModelStep
            n="02"
            title="The platform finds the people who fit."
            body="Matching is initiated by the role. The AI surfaces candidates whose profiles meet the requirements, with full reasoning."
          />
          <ModelStep
            n="03"
            title="The conversation starts only with consent."
            body="When a hiring team wants to contact a matched person, that person decides whether the conversation happens."
          />
        </div>
        <p className="mt-14 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          No applications. No searching. No conversation begins without both
          sides agreeing to it.
        </p>
      </Section>

      {/* ───── Why ───── */}
      <Section eyebrow="Why Aurapply" title={<>Intelligent matching, built honestly.</>}>
        <div className="mt-14 grid gap-4 md:grid-cols-3 text-left">
          <FeatureCard
            label="01 / Reasoning"
            title="Every match, explained."
            body="You see the reasoning behind every match. Both sides do."
          />
          <FeatureCard
            label="02 / Consent"
            title="Consent, built in."
            body="Your data is shared only when you have approved the contact."
          />
          <FeatureCard
            label="03 / Fairness"
            title="Tested for fairness."
            body="The matching engine is bias-tested quarterly. The methodology is published."
          />
        </div>
      </Section>

      {/* ───── Two paths ───── */}
      <Section eyebrow="Whichever side you are on" title={<>The platform is open.</>}>
        <div className="mt-14 grid gap-4 md:grid-cols-2 text-left">
          <PathCard
            to="/individuals"
            tag="For individuals"
            title="I am looking for work."
            body="Build a verified profile. Be matched to roles where you fit. Approve every contact."
            cta="Join the pool"
          />
          <PathCard
            to="/businesses"
            tag="For hiring teams"
            title="We are hiring."
            body="Post a role. Receive a curated shortlist of pre-verified candidates. Pay only when you hire."
            cta="Start a conversation"
          />
        </div>
      </Section>

      {/* ───── Compliance ───── */}
      <Section eyebrow="Built in Europe" title={<>Hiring, reimagined for the EU.</>}>
        <p className="mt-5 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          GDPR and EU AI Act, by design. Data stays in Europe. Reasoning is
          logged. Rights are real.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <Pill label="GDPR by design" />
          <Pill label="EU AI Act-ready" />
          <Pill label="Full audit trail" />
          <Pill label="Data stays in the EU" />
        </div>
        <div className="mt-10">
          <Link
            to="/documentation"
            className="text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors"
          >
            Read the documentation →
          </Link>
        </div>
      </Section>

      <LightFooter />
    </div>
  );
}

/* ─────────────────────────── Nav ─────────────────────────── */

function LightNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-slate-200/80 bg-white/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="" className="h-6 w-6 rounded-sm" />
          <span className="font-semibold tracking-tight text-slate-900 text-sm">
            Aurapply
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/documentation/eu-ai-act-compliance">Compliance</NavLink>
            <NavLink to="/documentation">Documentation</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <div className="h-4 w-px bg-slate-200 hidden md:block" />
          <Link
            to="/signin"
            className="text-xs font-medium text-slate-900 hover:text-blue-700 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
    >
      {children}
    </Link>
  );
}

/* ─────────────────────────── Section ─────────────────────────── */

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative px-6 py-24 border-t border-slate-100">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-[10px] font-semibold tracking-[0.22em] text-blue-700 uppercase">
          {eyebrow}
        </div>
        <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.08]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────── Pieces ─────────────────────────── */

function ProductSurface() {
  return (
    <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-1 shadow-xl shadow-slate-900/5">
      <div className="bg-slate-50 rounded-lg border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
            Active matches
          </div>
        </div>
        <div className="p-6 space-y-3">
          <MatchRow
            initial="S"
            initialClass="bg-blue-50 border-blue-100 text-blue-700"
            title="Senior Backend Engineer"
            meta="Matched with a Series B fintech · Dublin"
            badge={{
              text: "98% MATCH",
              cls: "bg-blue-50 text-blue-700 border-blue-100",
            }}
          />
          <MatchRow
            initial="L"
            initialClass="bg-violet-50 border-violet-100 text-violet-700"
            title="Product Designer"
            meta="Matched with a developer-tools company · Remote EU"
            badge={{
              text: "PENDING CONSENT",
              cls: "bg-slate-50 text-slate-500 border-slate-200",
            }}
            dimmed
          />
          <MatchRow
            initial="A"
            initialClass="bg-emerald-50 border-emerald-100 text-emerald-700"
            title="Staff Data Scientist"
            meta="Matched with a healthtech scale-up · Berlin"
            badge={{
              text: "94% MATCH",
              cls: "bg-emerald-50 text-emerald-700 border-emerald-100",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MatchRow({
  initial,
  initialClass,
  title,
  meta,
  badge,
  dimmed = false,
}: {
  initial: string;
  initialClass: string;
  title: string;
  meta: string;
  badge: { text: string; cls: string };
  dimmed?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg bg-white border border-slate-100 ${
        dimmed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`w-10 h-10 rounded-md flex items-center justify-center border ${initialClass}`}
        >
          <span className="font-bold text-xs">{initial}</span>
        </div>
        <div className="text-left min-w-0">
          <div className="text-sm font-medium text-slate-900 truncate">{title}</div>
          <div className="text-xs text-slate-500 truncate">{meta}</div>
        </div>
      </div>
      <div
        className={`shrink-0 px-2 py-1 rounded text-[10px] font-bold border ${badge.cls}`}
      >
        {badge.text}
      </div>
    </div>
  );
}

function ModelStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="border-t border-slate-200 pt-6">
      <div
        className="text-[11px] font-semibold tracking-[0.18em] text-blue-700"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      >
        {n}
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 leading-snug">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}

function FeatureCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
      <div
        className="text-[10px] font-semibold tracking-[0.18em] text-slate-500 uppercase"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      >
        {label}
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}

function PathCard({
  to,
  tag,
  title,
  body,
  cta,
}: {
  to: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      to={to}
      className="group relative p-8 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
    >
      <div
        className="text-[10px] font-semibold tracking-[0.18em] text-blue-700 uppercase"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      >
        {tag}
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
      <div className="mt-6 text-sm font-medium text-slate-900 inline-flex items-center gap-1.5">
        {cta}
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
      {label}
    </div>
  );
}

/* ─────────────────────────── Footer ─────────────────────────── */

function LightFooter() {
  return (
    <footer className="border-t border-slate-100 mt-12 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="" className="h-6 w-6 rounded-sm" />
            <span className="font-semibold tracking-tight text-slate-900">
              Aurapply
            </span>
          </Link>
          <p className="mt-4 text-slate-600 max-w-sm leading-relaxed">
            An AI hiring platform where roles find people, and the right
            conversation begins only when both sides agree to it.
          </p>
        </div>
        <div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-slate-500 uppercase mb-4">
            Product
          </div>
          <ul className="space-y-2.5 text-slate-600">
            <li><Link to="/individuals" className="hover:text-slate-900 transition-colors">For Individuals</Link></li>
            <li><Link to="/businesses" className="hover:text-slate-900 transition-colors">For Hiring Teams</Link></li>
            <li><Link to="/documentation" className="hover:text-slate-900 transition-colors">Documentation</Link></li>
            <li><Link to="/documentation/eu-ai-act-compliance" className="hover:text-slate-900 transition-colors">Compliance</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-slate-500 uppercase mb-4">
            Company
          </div>
          <ul className="space-y-2.5 text-slate-600">
            <li><Link to="/about" className="hover:text-slate-900 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link></li>
            <li><Link to="/r/signin" className="hover:text-slate-900 transition-colors">Hiring team sign-in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4 text-xs text-slate-500">
          <div>Built in Europe. Data stays in Europe.</div>
          <div>© {new Date().getFullYear()} Aurapply</div>
        </div>
      </div>
    </footer>
  );
}
