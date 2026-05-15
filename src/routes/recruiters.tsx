import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, pageContainer } from "@/components/layout";
import { MarketingHero, ProductDemo } from "@/components/product-demo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/recruiters")({
  head: () => ({
    meta: [
      { title: "For recruiters — Appointed" },
      {
        name: "description",
        content:
          "Appointed for in-house recruiters and agencies — eight pre-matched, pre-verified candidates per role.",
      },
      { property: "og:title", content: "Appointed for recruiters" },
      {
        property: "og:description",
        content:
          "Eight pre-matched, pre-verified candidates per role. Transparent reasoning. EU-compliant.",
      },
    ],
  }),
  component: RecruitersPage,
});

const POINTS = [
  {
    title: "Eight, not eight hundred",
    body: "Each role gets capped at the eight strongest matches. No CV firehose, no inbox bankruptcy.",
  },
  {
    title: "Reasoning, not a black box",
    body: "Every match comes with the why — skills, signals, and gaps. Defensible, auditable, contestable.",
  },
  {
    title: "Reach out in one click",
    body: "Contact a matched candidate directly inside Appointed. No paid plan to send a first message.",
  },
  {
    title: "EU-compliant by design",
    body: "GDPR-native, EU AI Act-ready. Human review on every AI-assisted surfacing.",
  },
];

function RecruitersPage() {
  return (
    <PageShell>
      <section className="py-16 sm:py-20 lg:py-24">
        <div className={pageContainer}>
          <MarketingHero
            eyebrow="For in-house teams & agencies"
            title={
              <>
                Stop sourcing.
                <br />
                Start meeting the right people.
              </>
            }
            lead="Post a role. Receive eight pre-matched, pre-verified candidates with the reasoning behind each match. Reach out from one place."
            demo={<ProductDemo variant="hiring" />}
          >
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/businesses/contact">Start a conversation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/businesses">See pricing</Link>
              </Button>
            </div>
          </MarketingHero>
        </div>
      </section>

      <section className="au-band border-y border-border py-16 md:py-20">
        <div className={pageContainer}>
          <div className="grid gap-5 md:grid-cols-2">
            {POINTS.map((p) => (
              <div key={p.title} className="au-card p-6">
                <div className="text-base font-semibold tracking-tight">{p.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <ProductDemo variant="scoring" />
          </div>
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Already on Appointed?{" "}
            <Link to="/r/signin" className="text-primary hover:underline">
              Sign in to your team
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
