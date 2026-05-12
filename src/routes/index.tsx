import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurapply — Better matching between people and roles" },
      { name: "description", content: "EU-compliant AI hiring platform. Built for individuals looking for work and for organizations doing the hiring." },
      { property: "og:title", content: "Aurapply — Better matching between people and roles" },
      { property: "og:description", content: "EU-compliant AI hiring platform. Built for Europe." },
    ],
  }),
  component: Landing,
});

const TRUSTED_BY = [
  "Acme Labs",
  "Northwind",
  "Helios",
  "Lumen Group",
  "Vela",
  "Orbit AI",
  "Kestrel",
  "Pareto",
];

function Landing() {
  return (
    <PageShell>
      <section className="px-6 min-h-[calc(100vh-3.5rem)] flex items-center">
        <div className="mx-auto max-w-5xl w-full py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground shadow-sm">
            <span className="au-pulse-dot h-1.5 w-1.5 rounded-full bg-gradient-to-r from-coral to-violet" />
            EU-Compliant AI Hiring Platform
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
            <span className="au-gradient-text">Better matching</span><br />
            <span className="text-foreground">between people and roles.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aurapply replaces blind applications and noisy sourcing with a single, transparent matching layer. Built for Europe.
          </p>

          <div className="relative mt-14">
            <span className="au-hero-glow au-float-slow" aria-hidden />
            <span className="au-hero-glow au-float-slower" aria-hidden />
            <div className="relative grid gap-5 md:grid-cols-2 text-left">
              <AudienceCard
                to="/individuals"
                icon={ProfileIcon}
                title="For Individuals"
                description="Build one profile. Get matched to roles where you actually fit."
              />
              <AudienceCard
                to="/businesses"
                icon={CompanyIcon}
                title="For Businesses"
                description="Post a role. Receive eight pre-matched, pre-verified candidates."
              />
            </div>
          </div>

          <p className="mt-10 text-sm text-muted-foreground max-w-xl mx-auto">
            Not sure which path is yours? Aurapply works for individuals looking for work and for organizations doing the hiring.
          </p>

          <div className="mt-12 au-marquee" aria-label="Trusted by European teams">
            <div className="au-marquee-track">
              {[...TRUSTED_BY, ...TRUSTED_BY].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-sm font-medium tracking-wide text-muted-foreground/70 whitespace-nowrap"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-10 text-xs text-muted-foreground">
            Built for GDPR, EU AI Act, and the standards European hiring expects.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
