import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import {
  VerifiedIcon,
  ShieldIcon,
  ReasoningIcon,
  ScaleIcon,
  LockIcon,
  DocumentIcon,
  HumanReviewIcon,
} from "@/components/icons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aurapply — Matching, done properly." },
      {
        name: "description",
        content:
          "A European platform built around fair, transparent matching between people and roles.",
      },
      { property: "og:title", content: "About Aurapply" },
      {
        property: "og:description",
        content:
          "A European platform built around fair, transparent matching between people and roles.",
      },
    ],
  }),
  component: AboutPage,
});

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div
      className={`text-xs font-semibold uppercase tracking-[0.16em] text-primary ${
        center ? "text-center" : ""
      }`}
    >
      {children}
    </div>
  );
}

function SectionBand({
  tone = "white",
  children,
  compact = false,
}: {
  tone?: "white" | "grey";
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={tone === "grey" ? "bg-surface" : "bg-background"}>
      <div
        className={`mx-auto max-w-6xl px-6 ${
          compact ? "py-16 md:py-20" : "py-24 md:py-32"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function ConstellationVisual() {
  const left = [
    [40, 60], [70, 110], [55, 170], [95, 220], [50, 270], [85, 320],
  ];
  const right = [
    [310, 70], [285, 130], [325, 185], [275, 235], [315, 285], [290, 330],
  ];
  const links: [number, number][] = [
    [0, 1], [1, 3], [2, 0], [3, 4], [4, 5], [5, 2],
  ];
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, hsl(222 70% 28%), hsl(232 60% 22%))",
      }}
    >
      <svg viewBox="0 0 380 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="about-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="190" cy="200" r="170" fill="url(#about-glow)" />
        {links.map(([a, b], i) => (
          <line
            key={`l-${i}`}
            x1={left[a][0]} y1={left[a][1]}
            x2={right[b][0]} y2={right[b][1]}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={0.8}
          />
        ))}
        <line
          x1={left[1][0]} y1={left[1][1]}
          x2={right[1][0]} y2={right[1][1]}
          stroke="rgba(160,200,255,0.9)"
          strokeWidth={1.4}
        />
        {left.map(([x, y], i) => (
          <circle key={`L-${i}`} cx={x} cy={y} r={i === 1 ? 5 : 3.2}
            fill={i === 1 ? "#cfe1ff" : "rgba(255,255,255,0.7)"} />
        ))}
        {right.map(([x, y], i) => (
          <circle key={`R-${i}`} cx={x} cy={y} r={i === 1 ? 5 : 3.2}
            fill={i === 1 ? "#cfe1ff" : "rgba(255,255,255,0.7)"} />
        ))}
      </svg>
    </div>
  );
}

function PrincipleCard({
  Icon,
  title,
  body,
}: {
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  body: string;
}) {
  return (
    <div className="au-card p-6">
      <div className="text-primary">
        <Icon size={32} />
      </div>
      <div className="mt-5 text-base font-semibold tracking-tight text-foreground">
        {title}
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function AboutPage() {
  return (
    <PageShell>
      {/* 1. Hero */}
      <SectionBand tone="white">
        <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-center">
          <div>
            <Eyebrow>About Aurapply</Eyebrow>
            <h1 className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02] text-foreground">
              Matching,
              <br /> done properly.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
              A European platform built around fair, transparent matching between
              people and roles.
            </p>
          </div>
          <ConstellationVisual />
        </div>
      </SectionBand>

      {/* 2. What we do */}
      <SectionBand tone="grey">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow center>What we do</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            We replace applications with matching.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Aurapply matches people to roles based on what they can do and where
            they want to work. The hiring conversation happens only when both
            sides agree.
          </p>
        </div>
      </SectionBand>

      {/* 3. Principles */}
      <SectionBand tone="white">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow center>Principles</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            What guides the platform.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <PrincipleCard
            Icon={ReasoningIcon}
            title="Transparent matching."
            body="Every match comes with reasoning the platform can explain."
          />
          <PrincipleCard
            Icon={ShieldIcon}
            title="Consent first."
            body="Your data is not shared until you actively approve it."
          />
          <PrincipleCard
            Icon={ScaleIcon}
            title="Tested for fairness."
            body="The matching engine is bias-tested across protected categories."
          />
          <PrincipleCard
            Icon={VerifiedIcon}
            title="Verified credentials."
            body="Identities, qualifications, and experience verified by EU partners."
          />
        </div>
      </SectionBand>

      {/* 4. Compliance */}
      <SectionBand tone="grey">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow center>Compliance</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            Built for European standards.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Aurapply is designed around GDPR and the EU AI Act. Data stays in the
            EU. Every decision is logged and explainable.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { Icon: LockIcon, label: "GDPR by design" },
              { Icon: ScaleIcon, label: "EU AI Act-ready" },
              { Icon: DocumentIcon, label: "Full audit trail" },
              { Icon: HumanReviewIcon, label: "Human review available" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2"
              >
                <Icon size={16} className="text-primary" />
                <span className="text-sm text-foreground">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/documentation"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Read the documentation →
            </Link>
          </div>
        </div>
      </SectionBand>

      {/* 5. Closing */}
      <SectionBand tone="white" compact>
        <div className="mx-auto max-w-[640px] text-center py-8 md:py-12">
          <Eyebrow center>Aurapply</Eyebrow>
          <h2 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            European-built. European-based.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            <a
              href="mailto:hello@aurapply.com"
              className="hover:text-foreground transition"
            >
              hello@aurapply.com
            </a>
          </p>
        </div>
      </SectionBand>
    </PageShell>
  );
}
