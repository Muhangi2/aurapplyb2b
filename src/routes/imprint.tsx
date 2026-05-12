import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/imprint")({
  head: () => ({
    meta: [
      { title: "Imprint — Aurapply" },
      { name: "description", content: "Legal information for Aurapply OÜ." },
      { property: "og:title", content: "Imprint — Aurapply" },
      { property: "og:description", content: "Legal information for Aurapply OÜ." },
    ],
  }),
  component: ImprintPage,
});

function ImprintPage() {
  return (
    <PageShell>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight">Imprint</h1>
          <p className="mt-2 text-sm text-muted-foreground">Information pursuant to applicable EU and national disclosure rules.</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card title="Company">
              <p>Aurapply OÜ</p>
              <p>Tartu mnt 67/1-13b</p>
              <p>10115 Tallinn, Estonia</p>
            </Card>
            <Card title="Registration">
              <p>Commercial register: 16780921</p>
              <p>VAT ID: EE102698451</p>
              <p>Managing director: J. Laine</p>
            </Card>
            <Card title="Contact">
              <p>Email: <a className="text-primary hover:underline" href="mailto:hello@aurapply.com">hello@aurapply.com</a></p>
              <p>Phone: +372 600 1234</p>
            </Card>
            <Card title="Supervisory authority">
              <p>Estonian Data Protection Inspectorate (AKI)</p>
              <p>Tatari 39, 10134 Tallinn</p>
            </Card>
          </div>

          <p className="mt-10 text-xs text-muted-foreground">
            Despite careful content control, we assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="au-card p-5 text-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-3 space-y-1 text-foreground">{children}</div>
    </div>
  );
}
