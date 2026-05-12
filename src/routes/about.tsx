import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aurapply — EU-built hiring, rebuilt around fit" },
      { name: "description", content: "Aurapply is a European hiring platform replacing blind applications and noisy sourcing with transparent, AI-assisted matching." },
      { property: "og:title", content: "About Aurapply" },
      { property: "og:description", content: "European hiring, rebuilt around fit. Transparent matching, GDPR-native, EU AI Act-ready." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-coral to-violet" />
            About Aurapply
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            <span className="au-gradient-text">European hiring,</span> rebuilt around fit.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Aurapply is a small team of product, AI, and HR people based in Europe. We built Aurapply because the traditional model of CVs, ATS pipelines, and cold outreach quietly wastes everyone&apos;s time — candidates send into the void, and recruiters drown in noise.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="au-card p-6">
              <div className="text-sm font-semibold tracking-tight">Our mission</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Replace the application funnel with a transparent matching layer. Candidates build one profile. Companies post one role. The match is shown to both sides with the reasoning behind it.
              </p>
            </div>
            <div className="au-card p-6">
              <div className="text-sm font-semibold tracking-tight">Why Europe first</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                The GDPR and EU AI Act set a higher bar for automated hiring decisions. We treat that as a feature, not friction — every match is explainable, every decision contestable, every consent revocable.
              </p>
            </div>
          </div>

          <div className="mt-12 au-card p-8">
            <div className="text-sm font-semibold tracking-tight">Principles</div>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" /><span><strong className="text-foreground">Transparency over opacity.</strong> <span className="text-muted-foreground">Every match comes with the reasoning. No black-box scoring.</span></span></li>
              <li className="flex gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" /><span><strong className="text-foreground">Consent over capture.</strong> <span className="text-muted-foreground">You decide what is shared, with whom, and for how long.</span></span></li>
              <li className="flex gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" /><span><strong className="text-foreground">Human review, by default.</strong> <span className="text-muted-foreground">Any AI-assisted decision can be reviewed by a person.</span></span></li>
              <li className="flex gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /><span><strong className="text-foreground">Fewer, better matches.</strong> <span className="text-muted-foreground">We cap the funnel on purpose so every conversation matters.</span></span></li>
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button asChild><Link to="/individuals">For individuals</Link></Button>
            <Button asChild variant="outline"><Link to="/businesses">For businesses</Link></Button>
            <Button asChild variant="ghost"><Link to="/contact">Contact us →</Link></Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
