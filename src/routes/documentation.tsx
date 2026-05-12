import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { DOC_GROUPS, DOCS, getDoc } from "@/lib/documentation-content";
import { ForwardIcon } from "@/components/icons";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation — Aurapply" },
      {
        name: "description",
        content:
          "Reference documents for hiring teams, legal and compliance reviewers, and partners evaluating Aurapply.",
      },
      { property: "og:title", content: "Documentation — Aurapply" },
      {
        property: "og:description",
        content:
          "How Aurapply works, in detail. Methodology, compliance, and service documentation.",
      },
    ],
  }),
  component: DocumentationHub,
});

function DocumentationHub() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Documentation
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-foreground">
            How Aurapply works, in detail.
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-[640px] mx-auto leading-relaxed">
            Reference documents for hiring teams, legal and compliance reviewers,
            and partners evaluating the platform.
          </p>
          <div className="mt-6 text-xs text-muted-foreground">
            {DOCS.length} documents · last updated{" "}
            {new Date().toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </section>

      {/* Document list */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[880px] px-6 py-16 md:py-20">
          <div className="space-y-12">
            {DOC_GROUPS.map((group) => (
              <div key={group.label}>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-4">
                  {group.label}
                </div>
                <ul className="divide-y divide-border rounded-xl border border-border bg-background">
                  {group.slugs.map((slug) => {
                    const doc = getDoc(slug);
                    if (!doc) return null;
                    const Icon = doc.icon;
                    return (
                      <li key={slug}>
                        <Link
                          to="/documentation/$slug"
                          params={{ slug }}
                          className="group flex items-start gap-4 px-5 py-5 transition hover:bg-surface"
                        >
                          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                            <Icon size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition">
                              {doc.title}
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                              {doc.description}
                            </div>
                          </div>
                          <ForwardIcon
                            size={16}
                            className="mt-2 text-muted-foreground/60 group-hover:text-primary transition shrink-0"
                          />
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
