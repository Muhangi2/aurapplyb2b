import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PageShell } from "@/components/layout";
import { CheckmarkIcon } from "@/components/icons";

const search = z.object({ name: z.string().optional() });

export const Route = createFileRoute("/businesses_/contact_/sent")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Message sent — Aurapply" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Sent,
});

function Sent() {
  const { name } = Route.useSearch();
  return (
    <PageShell>
      <section className="mx-auto max-w-xl px-6 py-28 text-center">
        <div className="relative mx-auto h-20 w-20">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%)",
            }}
          />
          <div
            className="absolute inset-2 rounded-full grid place-items-center text-white"
            style={{
              background: "linear-gradient(135deg, var(--primary), #4f46e5)",
              boxShadow:
                "0 14px 30px -12px color-mix(in oklab, var(--primary) 55%, transparent)",
            }}
          >
            <CheckmarkIcon size={28} />
          </div>
        </div>

        <h1 className="mt-10 text-3xl font-semibold tracking-tight">
          Thank you{name ? `, ${name}` : ""}.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We have your message. You will hear from us within one business day.
        </p>

        <div className="mt-12">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            Return to home
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
