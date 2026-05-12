import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PageShell } from "@/components/layout";
import { CheckmarkIcon } from "@/components/icons";

const search = z.object({ name: z.string().optional() });

export const Route = createFileRoute("/businesses_/request_/received")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Request received — Aurapply" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Received,
});

function Received() {
  const { name } = Route.useSearch();
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="relative mx-auto h-32 w-32">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%)",
            }}
          />
          <div
            className="absolute inset-3 rounded-full grid place-items-center text-white"
            style={{
              background: "linear-gradient(135deg, var(--primary), #4f46e5)",
              boxShadow: "0 18px 40px -16px color-mix(in oklab, var(--primary) 60%, transparent)",
            }}
          >
            <CheckmarkIcon size={44} />
          </div>
        </div>

        <h1 className="mt-10 text-4xl font-semibold tracking-tight">Request received.</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Thank you{name ? `, ${name}` : ""}. We will review your request and respond by email
          within one business day. If we are a fit, we will share a link to schedule a 30-minute
          qualification call at your convenience.
        </p>

        <div className="mt-12 au-card p-7 text-left">
          <div className="text-xs font-semibold tracking-[0.18em] text-primary">WHAT HAPPENS NEXT</div>
          <ol className="mt-4 space-y-3 text-sm text-foreground/85">
            <li className="flex gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">1</span>
              We review your request (within 1 business day).
            </li>
            <li className="flex gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">2</span>
              We email you with our response and, if applicable, a calendar link.
            </li>
            <li className="flex gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">3</span>
              If we are aligned, your account is provisioned the same day as your call.
            </li>
          </ol>
        </div>

        <div className="mt-12">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
            Return to home
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
