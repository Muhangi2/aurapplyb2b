import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, pageContainer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MarketingHero, ProductDemo } from "@/components/product-demo";

export const Route = createFileRoute("/businesses")({
  head: () => ({
    meta: [
      { title: "Appointed for hiring teams" },
      {
        name: "description",
        content:
          "Appointed works with selected hiring teams across Europe to deliver curated shortlists of pre-matched, pre-verified candidates.",
      },
      { property: "og:title", content: "Appointed for hiring teams" },
      {
        property: "og:description",
        content:
          "Curated shortlists of pre-matched, pre-verified candidates for serious EU hiring teams.",
      },
    ],
  }),
  component: Businesses,
});

function Businesses() {
  return (
    <PageShell>
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className={pageContainer}>
          <MarketingHero
            eyebrow="For hiring teams"
            title={
              <>
                Matched candidates.
                <br />
                Pre-verified. Ready to hire.
              </>
            }
            lead="Appointed works with selected hiring teams across Europe to deliver curated shortlists of pre-matched, pre-verified candidates for each role."
            demo={<ProductDemo variant="hiring" />}
          >
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>Pre-verified candidates</li>
              <li>Curated matching</li>
              <li>EU compliance built in</li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link to="/businesses/contact">Start a conversation</Link>
              </Button>
              <Link
                to="/r/signin"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Sign in
              </Link>
            </div>
          </MarketingHero>
        </div>
      </section>
    </PageShell>
  );
}
