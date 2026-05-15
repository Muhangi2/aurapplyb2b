import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, pageContainer } from "@/components/layout";
import { ProductDemo } from "@/components/product-demo";
import { DOC_GROUPS, DOCS, getDoc } from "@/lib/documentation-content";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation — Appointed" },
      {
        name: "description",
        content:
          "Reference documents for hiring teams, legal and compliance reviewers, and partners evaluating Appointed.",
      },
      { property: "og:title", content: "Documentation — Appointed" },
      {
        property: "og:description",
        content:
          "How Appointed works, in detail. Methodology, compliance, and service documentation.",
      },
    ],
  }),
  component: DocumentationHub,
});

function DocumentationHub() {
  return (
    <PageShell>
      <section className="py-16 sm:py-20">
        <div className={pageContainer}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-start">
            <div>
              <p className="au-eyebrow text-primary">Documentation</p>
              <h1 className="au-page-title mt-4">How Appointed works, in detail.</h1>
              <p className="au-lead mt-4">
                Reference documents for hiring teams, legal and compliance reviewers, and partners
                evaluating the platform.
              </p>
              <div className="mt-6 text-xs text-muted-foreground">
                {DOCS.length} documents · last updated{" "}
                {new Date().toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="min-w-0">
              <ProductDemo variant="matching" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <div className={pageContainer}>
          <div className="space-y-12">
            {DOC_GROUPS.map((group) => (
              <div key={group.label}>
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {group.label}
                </div>
                <ul className="divide-y divide-border rounded-xl border border-border bg-background">
                  {group.slugs.map((slug) => {
                    const doc = getDoc(slug);
                    if (!doc) return null;
                    return (
                      <li key={slug}>
                        <Link
                          to="/documentation/$slug"
                          params={{ slug }}
                          className="group block px-5 py-5 transition hover:bg-surface"
                        >
                          <div className="text-base font-semibold tracking-tight text-foreground transition group-hover:text-primary">
                            {doc.title}
                          </div>
                          <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {doc.description}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
