import { useEffect, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ProductDemoVariant = "matching" | "hiring" | "profile" | "scoring" | "inbox";

function useDemoHover() {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    bind: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}

function LogLine({
  prefix,
  children,
  highlight,
  active,
  hovered,
  delay,
}: {
  prefix: string;
  children: ReactNode;
  highlight?: boolean;
  active?: boolean;
  hovered?: boolean;
  delay: number;
}) {
  return (
    <p
      className={cn(
        "match-demo-log",
        highlight && "text-foreground",
        active && hovered && "match-demo-log--typing",
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="text-primary">{prefix}</span> {children}
    </p>
  );
}

function MatchingDemoBody({ hovered }: { hovered: boolean }) {
  const gradId = useId();
  const [activeRow, setActiveRow] = useState(0);
  const matches = [
    { name: "Anna M.", role: "Senior PM · Berlin", score: 94, status: "shortlisted" },
    { name: "Jonas K.", role: "Senior PM · Berlin", score: 91, status: "shortlisted" },
    { name: "Sofia L.", role: "Senior PM · Berlin", score: 88, status: "review" },
    { name: "Marco R.", role: "Senior PM · Berlin", score: 72, status: "filtered" },
  ];

  useEffect(() => {
    const ms = hovered ? 1400 : 2800;
    const id = window.setInterval(() => setActiveRow((r) => (r + 1) % matches.length), ms);
    return () => window.clearInterval(id);
  }, [hovered, matches.length]);

  return (
    <>
      <div className="grid md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px]">
        <div className="space-y-2 border-b border-border p-4 font-mono text-[11px] leading-relaxed text-muted-foreground md:border-b-0 md:border-r">
          <LogLine prefix="▸" delay={0}>
            Role posted: Senior Product Manager
          </LogLine>
          <LogLine prefix="▸" active hovered={hovered} delay={0.12}>
            {hovered ? "Scoring 847 profiles…" : "Scoring 847 consenting profiles…"}
          </LogLine>
          <LogLine prefix="▸" delay={0.24}>
            Applying skills, location, seniority weights
          </LogLine>
          <LogLine prefix="✓" highlight delay={0.36}>
            8 candidates above threshold
          </LogLine>
          <LogLine prefix="▸" active hovered={hovered} delay={0.48}>
            Generating match reasoning for recruiters…
          </LogLine>
          <p
            className={cn(
              "match-demo-log mt-3 rounded border border-border bg-[#fafafa] px-2.5 py-2 text-[10px] text-foreground/80",
              hovered && "border-primary/30 bg-primary/5",
            )}
            style={{ animationDelay: "0.6s" }}
          >
            Human review available · full audit trail · no protected attributes in features
          </p>
        </div>
        <div className="p-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Top matches
          </p>
          <ul className="space-y-1.5">
            {matches.map((m, i) => {
              const isActive = activeRow === i;
              return (
                <li key={m.name}>
                  <div
                    className={cn(
                      "match-demo-row flex items-center justify-between gap-2 rounded border px-2 py-1.5 text-[11px] transition-colors",
                      isActive
                        ? "border-primary/40 bg-primary/5"
                        : "border-border bg-white hover:border-foreground/20",
                      hovered && isActive && "match-demo-row--pulse",
                    )}
                    style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                    onMouseEnter={() => setActiveRow(i)}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{m.name}</p>
                      <p className="truncate text-[10px] text-muted-foreground">{m.role}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p
                        className={cn(
                          "font-medium tabular-nums",
                          m.score >= 90 ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {m.score}%
                      </p>
                      <p className="text-[9px] capitalize text-muted-foreground">{m.status}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="match-demo-flow border-t border-border bg-[#fafafa] px-4 py-3">
        <svg viewBox="0 0 560 72" className="h-14 w-full text-border" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0b1f56" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {[
            { x1: 80, y1: 36, x2: 200, y2: 18, d: 0 },
            { x1: 80, y1: 36, x2: 200, y2: 36, d: 0.15 },
            { x1: 80, y1: 36, x2: 200, y2: 54, d: 0.3 },
            { x1: 280, y1: 36, x2: 480, y2: 36, d: 0.6, b: true },
          ].map((l) => (
            <line
              key={l.d}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={`url(#${gradId})`}
              strokeWidth={l.b ? 1.2 : 1}
              className="match-demo-flow-line"
              style={{ animationDelay: `${l.d}s` }}
            />
          ))}
          <rect x="48" y="24" width="64" height="24" rx="4" fill="white" stroke="currentColor" strokeWidth="1" />
          <text x="80" y="40" textAnchor="middle" fontSize="9" fill="#0a0a0a">
            Role
          </text>
          <rect x="448" y="24" width="64" height="24" rx="4" fill="white" stroke="currentColor" strokeWidth="1" />
          <text x="480" y="40" textAnchor="middle" fontSize="9" fill="#0a0a0a">
            Shortlist
          </text>
        </svg>
      </div>
    </>
  );
}

function HiringDemoInner({ hovered }: { hovered: boolean }) {
  const rows = [
    { name: "Anna M.", fit: "Strong", score: 94 },
    { name: "Jonas K.", fit: "Strong", score: 91 },
    { name: "Sofia L.", fit: "Good", score: 88 },
    { name: "Elena P.", fit: "Good", score: 86 },
  ];
  return (
    <div className="grid md:grid-cols-[1fr_200px]">
      <div className="space-y-2 border-b border-border p-4 font-mono text-[11px] text-muted-foreground md:border-b-0 md:border-r">
        <LogLine prefix="▸" delay={0}>
          Role: Senior Product Manager · Berlin
        </LogLine>
        <LogLine prefix="▸" active hovered={hovered} delay={0.12}>
          Shortlist capped at 8 candidates
        </LogLine>
        <LogLine prefix="✓" highlight delay={0.24}>
          Pre-verification checks passed
        </LogLine>
        <LogLine prefix="▸" delay={0.36}>
          Reasoning attached to each profile
        </LogLine>
      </div>
      <div className="p-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Your shortlist
        </p>
        <ul className="space-y-1.5">
          {rows.map((r, i) => (
            <li
              key={r.name}
              className="match-demo-row rounded border border-border px-2 py-1.5 text-[11px]"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <p className="font-medium text-foreground">{r.name}</p>
              <p className="mt-0.5 flex justify-between text-[10px] text-muted-foreground">
                <span>{r.fit}</span>
                <span className="tabular-nums text-primary">{r.score}%</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProfileDemoInner({ hovered }: { hovered: boolean }) {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2">
      <div className="match-demo-log rounded border border-border p-4 text-[11px]">
        <p className="font-medium text-foreground">Anna M.</p>
        <p className="mt-1 text-muted-foreground">Senior Product Marketing Manager</p>
        <p className="mt-3 text-[10px] uppercase tracking-wide text-muted-foreground">Match strength</p>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <span
            className={cn(
              "match-demo-bar-fill block h-full rounded-full bg-primary",
              hovered && "w-[92%]",
            )}
            style={{ width: hovered ? undefined : "72%" }}
          />
        </div>
        <p className="mt-1 tabular-nums text-primary">{hovered ? "92%" : "72%"}</p>
      </div>
      <div className="space-y-2 font-mono text-[11px] text-muted-foreground">
        <LogLine prefix="▸" delay={0}>
          Profile completeness: 96%
        </LogLine>
        <LogLine prefix="✓" highlight delay={0.12}>
          Identity verified
        </LogLine>
        <LogLine prefix="✓" highlight delay={0.24}>
          Experience verified
        </LogLine>
        <LogLine prefix="▸" active hovered={hovered} delay={0.36}>
          Listening for matching roles…
        </LogLine>
        <div className="mt-2 flex flex-wrap gap-1">
          {["B2B SaaS", "German", "Berlin", "Product"].map((t) => (
            <span key={t} className="rounded border border-border px-1.5 py-0.5 text-[10px]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoringDemoInner({ hovered }: { hovered: boolean }) {
  const criteria = [
    { label: "Skills", weight: 30, score: 94 },
    { label: "Experience", weight: 25, score: 88 },
    { label: "Location", weight: 20, score: 100 },
    { label: "Languages", weight: 15, score: 90 },
    { label: "Compensation", weight: 10, score: 82 },
  ];
  return (
    <div className="grid md:grid-cols-[1fr_180px]">
      <div className="space-y-3 border-b border-border p-4 md:border-b-0 md:border-r">
        {criteria.map((c, i) => (
          <div key={c.label} className="match-demo-log text-[11px]" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex justify-between text-muted-foreground">
              <span>{c.label}</span>
              <span className="tabular-nums text-foreground">{c.weight}% weight</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
              <span
                className="match-demo-bar-fill block h-full rounded-full bg-primary"
                style={{ width: hovered ? `${c.score}%` : `${c.score * 0.7}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center p-4 text-center">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Overall</p>
        <p className="match-demo-score mt-1 text-3xl font-medium tabular-nums text-primary">
          {hovered ? "91" : "84"}%
        </p>
        <p className="mt-2 text-[10px] text-muted-foreground">Explainable · criterion-level</p>
      </div>
    </div>
  );
}

function InboxDemoInner({ hovered }: { hovered: boolean }) {
  const messages = [
    { from: "Acme GmbH", role: "Senior PM", time: "2h ago", new: true },
    { from: "Northline", role: "Product Lead", time: "1d ago", new: true },
    { from: "Studio 42", role: "PMM", time: "3d ago", new: false },
  ];
  return (
    <div className="divide-y divide-border">
      {messages.map((m, i) => (
        <div
          key={m.from}
          className={cn(
            "match-demo-row flex items-start justify-between gap-3 px-4 py-3 text-[11px] transition-colors",
            m.new && hovered && "bg-primary/5",
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div>
            <p className="font-medium text-foreground">{m.from}</p>
            <p className="mt-0.5 text-muted-foreground">{m.role} — match invitation</p>
          </div>
          <span className="shrink-0 text-[10px] text-muted-foreground">{m.time}</span>
        </div>
      ))}
    </div>
  );
}

function DemoWithHover({
  title,
  ariaLabel,
  children,
}: {
  title: string;
  ariaLabel: string;
  children: (hovered: boolean) => ReactNode;
}) {
  const { hovered, bind } = useDemoHover();
  return (
    <div
      className={cn("match-demo relative w-full", hovered && "match-demo--hover")}
      {...bind}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="match-demo-chrome flex items-center gap-3 border-b border-border bg-[#fafafa] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="match-demo-dot h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="match-demo-dot match-demo-dot--delay h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="match-demo-dot match-demo-dot--delay-2 h-2.5 w-2.5 rounded-full bg-neutral-300" />
        </div>
        <span className="text-[11px] text-muted-foreground">
          {title}
          {hovered && (
            <span className="match-demo-cursor ml-0.5 inline-block h-3 w-px bg-primary align-middle" />
          )}
        </span>
      </div>
      {children(hovered)}
      <div className="match-demo-shine pointer-events-none absolute inset-0 rounded-lg" aria-hidden />
    </div>
  );
}

export function ProductDemo({ variant = "matching" }: { variant?: ProductDemoVariant }) {
  switch (variant) {
    case "hiring":
      return (
        <DemoWithHover
          title="appointed — hiring workspace"
          ariaLabel="Preview of hiring team shortlist workflow"
        >
          {(hovered) => <HiringDemoInner hovered={hovered} />}
        </DemoWithHover>
      );
    case "profile":
      return (
        <DemoWithHover
          title="appointed — candidate profile"
          ariaLabel="Preview of candidate profile and match strength"
        >
          {(hovered) => <ProfileDemoInner hovered={hovered} />}
        </DemoWithHover>
      );
    case "scoring":
      return (
        <DemoWithHover
          title="appointed — match scoring"
          ariaLabel="Preview of criterion-based match scoring"
        >
          {(hovered) => <ScoringDemoInner hovered={hovered} />}
        </DemoWithHover>
      );
    case "inbox":
      return (
        <DemoWithHover
          title="appointed — role invitations"
          ariaLabel="Preview of incoming role match invitations"
        >
          {(hovered) => <InboxDemoInner hovered={hovered} />}
        </DemoWithHover>
      );
    default:
      return (
        <DemoWithHover
          title="appointed — matching engine"
          ariaLabel="Preview of matching engine scoring candidates for a role"
        >
          {(hovered) => <MatchingDemoBody hovered={hovered} />}
        </DemoWithHover>
      );
  }
}

export function MatchingDemo() {
  return <ProductDemo variant="matching" />;
}

/** Two-column marketing hero: copy + product screenshot */
export function MarketingHero({
  eyebrow,
  title,
  lead,
  children,
  demo,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  children?: ReactNode;
  demo: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-start lg:gap-12 xl:gap-16",
        className,
      )}
    >
      <div>
        <p className="au-eyebrow">{eyebrow}</p>
        <h1 className="au-page-title mt-4">{title}</h1>
        <p className="au-lead mt-4 max-w-lg">{lead}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
      <div className="min-w-0">{demo}</div>
    </div>
  );
}
