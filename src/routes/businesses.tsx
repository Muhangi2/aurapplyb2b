import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { VerifiedIcon, MatchesIcon, ShieldIcon, ArrowRightIcon } from "@/components/icons";

export const Route = createFileRoute("/businesses")({
  head: () => ({
    meta: [
      { title: "Aurapply for hiring teams" },
      {
        name: "description",
        content:
          "Aurapply works with selected hiring teams across Europe to deliver curated shortlists of pre-matched, pre-verified candidates.",
      },
      { property: "og:title", content: "Aurapply for hiring teams" },
      {
        property: "og:description",
        content:
          "Curated shortlists of pre-matched, pre-verified candidates for serious EU hiring teams.",
      },
    ],
  }),
  component: Businesses,
});

function BrandComposition() {
  // Quiet intelligence: a contained gradient panel with a constellation of
  // small dots and thin lines, where one tight cluster reads as "selected".
  return (
    <div className="relative w-full max-w-[520px] aspect-[4/5]">
      <div
        className="absolute inset-0 rounded-[40px_8px_40px_40px] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--primary) 0%, #4f46e5 55%, #312e81 100%)",
          boxShadow:
            "0 40px 80px -30px color-mix(in oklab, var(--primary) 55%, transparent)",
        }}
      >
        {/* Subtle inner sheen */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,0.18), transparent 55%)",
          }}
        />
        {/* Constellation */}
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="pickHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background field — faint dots */}
          {[
            [60, 80], [110, 60], [180, 110], [260, 70], [320, 130],
            [340, 230], [70, 200], [50, 320], [120, 360], [220, 410],
            [310, 380], [360, 320], [200, 200], [150, 180], [280, 290],
            [90, 280], [240, 350], [330, 90], [40, 150], [380, 200],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.6" fill="#ffffff" fillOpacity={0.28} />
          ))}

          {/* Background field — thin connections */}
          <g stroke="#ffffff" strokeOpacity="0.10" strokeWidth="0.6">
            <line x1="60" y1="80" x2="180" y2="110" />
            <line x1="180" y1="110" x2="260" y2="70" />
            <line x1="260" y1="70" x2="320" y2="130" />
            <line x1="70" y1="200" x2="150" y2="180" />
            <line x1="150" y1="180" x2="200" y2="200" />
            <line x1="50" y1="320" x2="120" y2="360" />
            <line x1="120" y1="360" x2="220" y2="410" />
            <line x1="220" y1="410" x2="310" y2="380" />
            <line x1="310" y1="380" x2="360" y2="320" />
          </g>

          {/* Selected cluster — slightly highlighted */}
          <circle cx="220" cy="240" r="68" fill="url(#pickHalo)" />
          <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1">
            <line x1="200" y1="220" x2="240" y2="230" />
            <line x1="240" y1="230" x2="235" y2="265" />
            <line x1="235" y1="265" x2="200" y2="220" />
            <line x1="240" y1="230" x2="265" y2="215" />
          </g>
          <circle cx="200" cy="220" r="3.5" fill="#ffffff" />
          <circle cx="240" cy="230" r="4" fill="#ffffff" />
          <circle cx="235" cy="265" r="3" fill="#ffffff" />
          <circle cx="265" cy="215" r="2.5" fill="#ffffff" fillOpacity="0.85" />
        </svg>
      </div>
    </div>
  );
}

function Marker({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon size={18} className="text-primary" />
      <span className="text-sm font-medium text-foreground/85">{label}</span>
    </div>
  );
}

function Businesses() {
  return (
    <PageShell>
      <section className="relative">
        <div className="au-hero-glow" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-6 min-h-[calc(100vh-7rem)] grid gap-12 md:grid-cols-2 md:items-center py-16 md:py-0">
          {/* LEFT */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.22em] text-primary">
              AURAPPLY FOR HIRING TEAMS
            </div>
            <h1 className="mt-5 text-4xl md:text-[3.25rem] font-semibold tracking-tight leading-[1.05] text-foreground">
              Matched candidates.
              <br />
              Pre-verified. Ready to hire.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Aurapply works with selected hiring teams across Europe to deliver curated shortlists
              of pre-matched, pre-verified candidates for each role.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Marker Icon={VerifiedIcon} label="Pre-verified candidates." />
              <Marker Icon={MatchesIcon} label="Curated matching." />
              <Marker Icon={ShieldIcon} label="EU compliance built in." />
            </div>

            <div className="mt-12 flex items-center gap-6">
              <Button asChild size="lg">
                <Link to="/businesses/contact">
                  Start a conversation <ArrowRightIcon size={16} className="ml-1" />
                </Link>
              </Button>
              <Link
                to="/r/signin"
                className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end">
            <BrandComposition />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
