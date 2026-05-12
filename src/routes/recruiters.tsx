import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/recruiters")({
  head: () => ({
    meta: [
      { title: "For recruiters — Aurapply" },
      { name: "description", content: "Aurapply for in-house recruiters and agencies — eight pre-matched, pre-verified candidates per role." },
      { property: "og:title", content: "Aurapply for recruiters" },
      { property: "og:description", content: "Eight pre-matched, pre-verified candidates per role. Transparent reasoning. EU-compliant." },
    ],
  }),
  component: RecruitersPage,
});

const POINTS = [
  { title: "Eight, not eight hundred", body: "Each role gets capped at the eight strongest matches. No CV firehose, no inbox bankruptcy." },
  { title: "Reasoning, not a black box", body: "Every match comes with the why — skills, signals, and gaps. Defensible, auditable, contestable." },
  { title: "Reach out in one click", body: "Contact a matched candidate directly inside Aurapply. No paid plan to send a first message." },
  { title: "EU-compliant by design", body: "GDPR-native, EU AI Act-ready. Human review on every AI-assisted surfacing." },
];

function RecruitersPage() {
  return (
    <PageShell>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-coral to-violet" />
            For in-house teams &amp; agencies
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            <span className="au-gradient-text">Stop sourcing.</span><br />
            <span className="text-foreground">Start meeting the right people.</span>
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            Post a role. Receive eight pre-matched, pre-verified candidates with the reasoning behind each match. Reach out from one place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild><Link to="/r/signup">Post your first role</Link></Button>
            <Button asChild variant="outline"><Link to="/businesses">See pricing</Link></Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl grid gap-5 md:grid-cols-2">
          {POINTS.map((p) => (
            <div key={p.title} className="au-card p-6">
              <div className="text-base font-semibold tracking-tight">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">
            Already on Aurapply? <Link to="/r/signin" className="text-primary hover:underline">Sign in to your team</Link>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
