import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/aurapply-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurapply — Stop searching. Let the work find you." },
      {
        name: "description",
        content:
          "Aurapply is the AI hiring platform where roles come to you, not the other way around. Free, always. Built in Europe.",
      },
      { property: "og:title", content: "Aurapply — Stop searching. Let the work find you." },
      {
        property: "og:description",
        content:
          "The AI hiring platform where roles come to you, not the other way around.",
      },
    ],
  }),
  component: Landing,
});

const NAV = [
  { label: "About", to: "/about" as const },
  { label: "Compliance", to: "/documentation/$slug" as const, params: { slug: "eu-ai-act-compliance" } },
  { label: "Documentation", to: "/documentation" as const },
  { label: "Contact", to: "/contact" as const },
  { label: "Sign in", to: "/signin" as const },
];

/* ─────────────────────────── Page ─────────────────────────── */

function Landing() {
  return (
    <div
      className="w-full bg-white text-slate-700 selection:bg-blue-500/20 selection:text-blue-900"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <FloatingNav />
      <Hero />
      <Footer />
    </div>
  );
}

/* ─────────────────────────── Nav ─────────────────────────── */

function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "max-w-5xl rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.18)] px-5 py-2.5"
            : "max-w-6xl rounded-full bg-transparent border border-transparent px-6 py-3"
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="Aurapply" className="h-7 w-auto" />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-1.5">
          {NAV.map((item) =>
            item.label === "Sign in" ? (
              <Link
                key={item.label}
                to={item.to as "/signin"}
                className="ml-2 rounded-full bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-[#0b1f56] transition-colors"
              >
                Sign in
              </Link>
            ) : (
              <Link
                key={item.label}
                to={item.to as any}
                params={item.params as any}
                className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-full transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(37,99,235,0.08), rgba(37,99,235,0.04) 35%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, #000 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, #000 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[920px] text-center">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/60 backdrop-blur-sm relative">
          <span
            className="absolute inset-0 rounded-full p-px pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.55), rgba(79,70,229,0.55))",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
            aria-hidden
          />
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 animate-ping" style={{ animationDuration: "1.5s" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
          </span>
          <span className="text-xs font-medium text-slate-700 tracking-tight">
            AI-first hiring, live in Europe
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mt-8 text-slate-900 font-semibold tracking-tight leading-[1.02] text-[52px] sm:text-[72px] lg:text-[96px]"
        >
          Stop searching.
          <br />
          Let the work find you.
        </h1>

        {/* Subhead */}
        <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
          Aurapply is the AI hiring platform where roles come to you, not the other way around.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            to="/individuals"
            className="inline-flex items-center justify-center rounded-full text-white text-base font-medium px-8 py-4 shadow-[0_12px_30px_-12px_rgba(37,99,235,0.55)] hover:shadow-[0_16px_36px_-12px_rgba(11,31,86,0.6)] transition-all"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #0b1f56 100%)",
            }}
          >
            Join the pool
          </Link>
          <p className="text-sm text-slate-500">Free, always. Built in Europe.</p>
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────── Footer ─────────────────────────── */

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/70">
      {/* Top strip — hiring teams call-out */}
      <div className="px-6 py-20 sm:py-24 border-b border-slate-200/70">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold tracking-[0.18em] uppercase text-blue-700">
            For hiring teams
          </div>
          <p className="mt-4 text-slate-900 font-semibold tracking-tight text-2xl sm:text-[28px] leading-snug">
            Curated shortlists, pre-verified candidates. Pay only when you hire.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/businesses"
              className="inline-flex items-center justify-center rounded-full text-white text-sm font-medium px-6 py-3 shadow-[0_10px_24px_-12px_rgba(37,99,235,0.5)] hover:shadow-[0_14px_28px_-12px_rgba(11,31,86,0.55)] transition-all"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #0b1f56 100%)",
              }}
            >
              Register your company
            </Link>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-12">
          <FooterCol
            heading="Product"
            links={[
              { label: "For Individuals", to: "/individuals" },
              { label: "For Hiring Teams", to: "/businesses" },
              { label: "Documentation", to: "/documentation" },
              { label: "How matching works", to: "/documentation/$slug", params: { slug: "how-matching-works" } },
            ]}
          />
          <FooterCol
            heading="Company"
            links={[
              { label: "About", to: "/about" },
              { label: "Compliance", to: "/documentation/$slug", params: { slug: "eu-ai-act-compliance" } },
              { label: "Privacy", to: "/privacy" },
              { label: "Terms", to: "/terms" },
              { label: "Imprint", to: "/imprint" },
              { label: "Contact", to: "/contact" },
              { label: "Hiring team sign-in", to: "/r/signin" },
            ]}
          />
        </div>
      </div>

      {/* Compliance pills */}
      <div className="px-6 py-10 border-t border-slate-200/70">
        <div className="mx-auto max-w-5xl flex flex-wrap justify-center gap-3">
          <CompliancePill icon={<LockIcon />} label="GDPR by design" />
          <CompliancePill icon={<ScaleIcon />} label="EU AI Act-ready" />
          <CompliancePill icon={<DocumentIcon />} label="Full audit trail" />
          <CompliancePill icon={<ShieldIcon />} label="Data stays in the EU" />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="px-6 py-6 border-t border-slate-200/70">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 items-center gap-3 text-xs text-slate-500">
          <div className="flex justify-center sm:justify-start">
            <img src={logoUrl} alt="Aurapply" className="h-5 w-auto opacity-80" />
          </div>
          <div className="text-center">Built in Europe. Data stays in Europe.</div>
          <div className="text-center sm:text-right">© Aurapply 2026</div>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = { label: string; to: string; params?: Record<string, string> };

function FooterCol({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-900">
        {heading}
      </div>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to as any}
              params={l.params as any}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompliancePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400 transition-colors">
      <span className="text-slate-500">{icon}</span>
      {label}
    </span>
  );
}

/* ─────────── Inline icons ─────────── */

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </svg>
  );
}
function ScaleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v17" />
      <path d="M5 21h14" />
      <path d="M5 8h14" />
      <path d="M5 8l-3 6a4 4 0 0 0 6 0z" />
      <path d="M19 8l-3 6a4 4 0 0 0 6 0z" />
    </svg>
  );
}
function DocumentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" />
    </svg>
  );
}
