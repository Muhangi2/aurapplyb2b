import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, pageContainer } from "@/components/layout";
import { getDoc, DOCS, type Block } from "@/lib/documentation-content";

export const Route = createFileRoute("/documentation_/$slug")({
  loader: ({ params }) => {
    const doc = getDoc(params.slug);
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => {
    const doc = loaderData?.doc;
    const title = doc ? `${doc.title} — Documentation — Appointed` : "Documentation — Appointed";
    const description = doc?.subtitle ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <div className={`${pageContainer} py-32 text-center`}>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Document not found.
        </h1>
        <p className="mt-3 text-muted-foreground">
          The document you are looking for does not exist.
        </p>
        <Link
          to="/documentation"
          className="mt-6 inline-block text-sm font-medium text-primary hover:underline underline-offset-4"
        >
          Back to documentation
        </Link>
      </div>
    </PageShell>
  ),
  errorComponent: ({ error }) => (
    <PageShell>
      <div className={`${pageContainer} py-32 text-center`}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Something went wrong.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </PageShell>
  ),
  component: DocumentPage,
});

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="mt-12 text-2xl font-semibold tracking-tight text-foreground scroll-mt-24"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="mt-8 text-base font-semibold tracking-tight text-foreground"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-4 text-[15px] leading-[1.75] text-foreground/85">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul
          key={i}
          className="mt-4 space-y-2 text-[15px] leading-[1.7] text-foreground/85 list-disc pl-5 marker:text-primary/60"
        >
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={i}
          className="mt-4 space-y-2 text-[15px] leading-[1.7] text-foreground/85 list-decimal pl-5 marker:text-primary/70 marker:font-medium"
        >
          {block.items.map((item, j) => (
            <li key={j} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );
  }
}

function DocumentPage() {
  const { doc } = Route.useLoaderData();
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const idx = DOCS.findIndex((d) => d.slug === doc.slug);
  const prev = idx > 0 ? DOCS[idx - 1] : null;
  const next = idx < DOCS.length - 1 ? DOCS[idx + 1] : null;

  return (
    <PageShell>
      <article className="bg-background">
        <div className={`${pageContainer} max-w-3xl pt-12 pb-20 md:pt-16`}>
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground">
            <Link to="/documentation" className="hover:text-foreground transition">
              Documentation
            </Link>
            <span className="mx-2 opacity-50">›</span>
            <span className="text-foreground/80">{doc.title}</span>
          </nav>

          {/* Title block */}
          <header className="mt-6 pb-8 border-b border-border">
            <h1 className="au-page-title">
              {doc.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              {doc.subtitle}
            </p>
          </header>

          {/* Body */}
          <div className="pt-2">{doc.body.map(renderBlock)}</div>

          {/* Feedback */}
          <div className="mt-16 pt-8 border-t border-border">
            {feedback ? (
              <div className="text-sm text-muted-foreground">
                Thanks for the feedback.
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Was this helpful?
                </span>
                <button
                  type="button"
                  onClick={() => setFeedback("up")}
                  aria-label="Helpful"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 10v11" />
                    <path d="M14 4v6h6l-3 11h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2l4-4Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedback("down")}
                  aria-label="Not helpful"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 14V3" />
                    <path d="M10 20v-6H4l3-11h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2l-4 4Z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Prev / Next */}
          {(prev || next) && (
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  to="/documentation/$slug"
                  params={{ slug: prev.slug }}
                  className="group rounded-xl border border-border bg-background p-4 hover:border-primary/40 transition"
                >
                  <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    Previous
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground group-hover:text-primary transition">
                    {prev.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to="/documentation/$slug"
                  params={{ slug: next.slug }}
                  className="group rounded-xl border border-border bg-background p-4 sm:text-right hover:border-primary/40 transition"
                >
                  <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    Next
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground group-hover:text-primary transition">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* Back to hub */}
          <div className="mt-10">
            <Link
              to="/documentation"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              ← All documentation
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
