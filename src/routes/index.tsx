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
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
            <span className="au-gradient-text">Better matching</span><br />
            <span className="text-foreground">between people and roles.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aurapply replaces blind applications and noisy sourcing with a single, transparent matching layer. Built for Europe.
          </p>

          <div className="relative mt-14">
            <span className="au-hero-glow au-float-slow" aria-hidden />
            <span className="au-hero-glow au-float-slower" aria-hidden />
            <div className="relative flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/individuals"
                className="au-cta-gradient inline-flex items-center justify-center px-8 py-3 text-sm font-semibold"
              >
                For Applicants
              </Link>
              <Link
                to="/businesses"
                className="au-cta-gradient inline-flex items-center justify-center px-8 py-3 text-sm font-semibold"
              >
                For Recruiters
              </Link>
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
