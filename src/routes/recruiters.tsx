import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/recruiters")({
  component: () => (
    <PageShell>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
            Coming soon
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight">For recruiters</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The recruiter side of Aurapply is in private development. Post a role, review matched candidates with full reasoning, and reach out directly. Compliant by design.
          </p>
          <Link to="/" className="mt-8 inline-block text-sm text-primary hover:underline">← Back to home</Link>
        </div>
      </section>
    </PageShell>
  ),
});
