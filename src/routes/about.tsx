import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, pageContainer } from "@/components/layout";
import { MarketingHero, ProductDemo } from "@/components/product-demo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Appointed — Matching, done properly." },
      {
        name: "description",
        content:
          "A European platform built around fair, transparent matching between people and roles.",
      },
      { property: "og:title", content: "About Appointed" },
      {
        property: "og:description",
        content:
          "A European platform built around fair, transparent matching between people and roles.",
      },
    ],
  }),
  component: AboutPage,
});

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
    <section className={tone === "grey" ? "bg-surface-alt" : "bg-background"}>
      <div
        className={`${pageContainer} ${compact ? "py-12 md:py-16" : "py-16 md:py-20"}`}
      >
        {children}
      </div>
    </section>
  );
}

function PrincipleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="au-card p-6">
      <div className="text-base font-semibold tracking-tight text-foreground">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <SectionBand>
        <MarketingHero
          eyebrow="About Appointed"
          title={
            <>
              Matching,
              <br /> done properly.
            </>
          }
          lead="A European platform built around fair, transparent matching between people and roles."
          demo={<ProductDemo variant="scoring" />}
        />
      </SectionBand>

      <SectionBand tone="grey">
        <div className="mx-auto max-w-2xl text-center">
          <p className="au-eyebrow">What we do</p>
          <h2 className="au-section-title mt-4">We replace applications with matching.</h2>
          <p className="au-lead mt-4">
            Appointed matches people to roles based on what they can do and where they want to
            work. The hiring conversation happens only when both sides agree.
          </p>
        </div>
        <div className="mt-14">
          <ProductDemo variant="matching" />
        </div>
      </SectionBand>

      <SectionBand>
        <div className="mx-auto max-w-2xl text-center">
          <p className="au-eyebrow">Principles</p>
          <h2 className="au-section-title mt-4">What guides the platform.</h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <PrincipleCard
            title="Transparent matching."
            body="Every match comes with reasoning the platform can explain."
          />
          <PrincipleCard
            title="Consent first."
            body="Your data is not shared until you actively approve it."
          />
          <PrincipleCard
            title="Tested for fairness."
            body="The matching engine is bias-tested across protected categories."
          />
          <PrincipleCard
            title="Verified credentials."
            body="Identities, qualifications, and experience verified by EU partners."
          />
        </div>
      </SectionBand>

      <SectionBand tone="grey">
        <div className="mx-auto max-w-2xl text-center">
          <p className="au-eyebrow">Compliance</p>
          <h2 className="au-section-title mt-4">Built for European standards.</h2>
          <p className="au-lead mt-4">
            Appointed is designed around GDPR and the EU AI Act. Data stays in the EU. Every
            decision is logged and explainable.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {["GDPR by design", "EU AI Act-ready", "Full audit trail", "Human review available"].map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full border border-border bg-background px-3.5 py-2 text-sm text-foreground"
                >
                  {label}
                </span>
              ),
            )}
          </div>
          <div className="mt-8">
            <Link
              to="/documentation"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Read the documentation →
            </Link>
          </div>
        </div>
      </SectionBand>

      <SectionBand compact>
        <div className="mx-auto max-w-xl py-8 text-center md:py-12">
          <p className="au-eyebrow">Appointed</p>
          <h2 className="au-section-title mt-4">European-built. European-based.</h2>
          <p className="mt-4 text-base text-muted-foreground">
            <a href="mailto:hello@appointed.com" className="transition hover:text-foreground">
              hello@appointed.com
            </a>
          </p>
        </div>
      </SectionBand>
    </PageShell>
  );
}
