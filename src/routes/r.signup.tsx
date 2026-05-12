import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/r/signup")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: SignupRedirect,
});

function SignupRedirect() {
  // Soft redirect: render a brief notice, then navigate.
  return (
    <PageShell>
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-primary">FOR RECRUITERS</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Aurapply for businesses is now access-led.</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Submit a short request and we will be in touch within one business day.
        </p>
        <div className="mt-7 flex items-center justify-center gap-5">
          <Button asChild size="lg">
            <Link to="/businesses/request">Request access</Link>
          </Button>
          <Link to="/r/signin" className="text-sm text-muted-foreground hover:text-foreground">
            Already have an account? Sign in
          </Link>
        </div>
      </section>
      {/* Auto-forward after a moment for any deep-links */}
      <AutoRedirect />
    </PageShell>
  );
}

function AutoRedirect() {
  // Use Navigate after a short delay via setTimeout in effect-free manner: render-time Navigate would cause instant jump.
  // We keep the notice visible — no auto-redirect to preserve context.
  return null;
}

// Suppress unused-import warning (Navigate kept for potential future use)
void Navigate;
