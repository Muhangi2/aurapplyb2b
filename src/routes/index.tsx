import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, pageContainer } from "@/components/layout";
import { ProductDemo } from "@/components/product-demo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Appointed — Stop searching. Let the work find you." },
      {
        name: "description",
        content:
          "Appointed is the AI hiring platform where roles come to you, not the other way around.",
      },
      { property: "og:title", content: "Appointed — Stop searching. Let the work find you." },
      {
        property: "og:description",
        content:
          "The AI hiring platform where roles come to you, not the other way around.",
      },
    ],
  }),
  component: Landing,
});

function HeroGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 35%, #000 15%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 35%, #000 15%, transparent 80%)",
      }}
    />
  );
}

function Landing() {
  return (
    <PageShell>
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <HeroGrid />
        <div className={`relative ${pageContainer}`}>
          <div className="lg:grid lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-start lg:gap-12 xl:gap-16">
            <div>
              <p className="au-eyebrow">AI-first hiring</p>
              <h1 className="au-page-title mt-4">
                Stop searching.
                <br />
                Let the work find you.
              </h1>
              <p className="au-lead mt-4 max-w-lg">
                Appointed is the AI hiring platform where roles come to you, not the other way
                around.
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link to="/signup" search={{ type: "candidate" }}>
                    Join the pool
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-12 min-w-0 lg:mt-0">
              <ProductDemo variant="matching" />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
