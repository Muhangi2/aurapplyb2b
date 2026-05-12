import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/r/signup")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: SignupRedirect,
});

function SignupRedirect() {
  return (
    <PageShell>
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-primary">FOR RECRUITERS</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Aurapply for businesses is now access-led.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Submit a short request and we will be in touch within one business day.
        </p>
        <div className="mt-7 flex items-center justify-center gap-5 flex-wrap">
          <Button asChild size="lg">
            <Link to="/businesses/request">Request access</Link>
          </Button>
          <Link to="/r/signin" className="text-sm text-muted-foreground hover:text-foreground">
            Already have an account? Sign in
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
