import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance — GDPR & EU AI Act-ready hiring" },
      { name: "description", content: "How Aurapply meets the requirements of the GDPR, the EU AI Act, and EU non-discrimination rules in hiring." },
      { property: "og:title", content: "Compliance — Aurapply" },
      { property: "og:description", content: "GDPR-native, EU AI Act-ready, audit-friendly by design." },
    ],
  }),
  component: CompliancePage,
});

const PILLARS = [
  {
    tag: "GDPR",
    title: "Lawful, transparent, minimal",
    body: "Granular, revocable consents. Purpose-limited processing. Data subject rights handled in-product — export, rectify, erase, port, object.",
  },
  {
    tag: "EU AI Act",
    title: "High-risk hiring, handled honestly",
    body: "Hiring is classified as a high-risk AI use case. We document model purpose, training data sources, evaluation, and known limitations. Human review is available on every AI-surfaced decision.",
  },
  {
    tag: "Non-discrimination",
    title: "Bias monitored, not assumed away",
    body: "We don&apos;t use protected attributes as match features. We audit outcome distributions and publish disparity metrics to recruiter customers on request.",
  },
  {
    tag: "Security",
    title: "EU hosting, encryption, least privilege",
    body: "Data hosted in the EU. Encrypted in transit and at rest. Production access is logged and scoped. Annual third-party penetration tests.",
  },
];

const CERTS = [
  { label: "ISO 27001", note: "In progress, target Q4 2026" },
  { label: "SOC 2 Type II", note: "In progress, target Q1 2027" },
  { label: "EU Data Residency", note: "Live" },
  { label: "DPA on request", note: "Live" },
];

function CompliancePage() {
  return (
    <PageShell>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-coral to-violet" />
            Compliance
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            <span className="au-gradient-text">Built for the rules</span><br />
            <span className="text-foreground">European hiring expects.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            Aurapply is engineered around the GDPR, the EU AI Act, and EU non-discrimination law. Compliance isn&apos;t a checkbox at the end — it shapes the data model.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.tag} className="au-card p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">{p.tag}</div>
                <div className="mt-2 text-lg font-semibold tracking-tight">{p.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: p.body }} />
              </div>
            ))}
          </div>

          <div className="mt-12 au-card p-8">
            <div className="text-sm font-semibold tracking-tight">Certifications &amp; documents</div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {CERTS.map((c) => (
                <div key={c.label} className="flex items-center justify-between border-b border-border py-3 last:border-0 sm:border-0 sm:py-0">
                  <div className="text-sm font-medium">{c.label}</div>
                  <div className="text-xs text-muted-foreground">{c.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button asChild><Link to="/contact">Request our DPA</Link></Button>
            <Button asChild variant="outline"><Link to="/privacy-policy">Read the privacy policy</Link></Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
