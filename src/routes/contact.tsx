import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageContainer } from "@/components/layout";
import { ProductDemo } from "@/components/product-demo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Appointed — Talk to a human" },
      {
        name: "description",
        content:
          "Reach the Appointed team for support, sales, partnership, or press enquiries.",
      },
      { property: "og:title", content: "Contact Appointed" },
      {
        property: "og:description",
        content: "Talk to a real human about hiring on Appointed.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Thanks — we'll be in touch within one business day.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  }

  return (
    <PageShell>
      <section className="py-16 sm:py-20">
        <div className={`${pageContainer} grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start`}>
          <div>
            <p className="au-eyebrow">Contact</p>
            <h1 className="au-page-title mt-4">Talk to a human.</h1>
            <p className="au-lead mt-4">
              Whether you&apos;re hiring, applying, or curious about how we handle data — we&apos;d
              like to hear from you.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <div>
                <div className="font-semibold text-foreground">Sales &amp; partnerships</div>
                <a href="mailto:hello@appointed.com" className="text-primary hover:underline">
                  hello@appointed.com
                </a>
              </div>
              <div>
                <div className="font-semibold text-foreground">Support</div>
                <a href="mailto:support@appointed.com" className="text-primary hover:underline">
                  support@appointed.com
                </a>
              </div>
              <div>
                <div className="font-semibold text-foreground">Privacy &amp; data requests</div>
                <a href="mailto:privacy@appointed.com" className="text-primary hover:underline">
                  privacy@appointed.com
                </a>
              </div>
              <div>
                <div className="font-semibold text-foreground">Press</div>
                <a href="mailto:press@appointed.com" className="text-primary hover:underline">
                  press@appointed.com
                </a>
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-8">
            <form onSubmit={submit} className="au-card p-6 md:p-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company (optional)</Label>
                <Input id="company" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="msg">How can we help?</Label>
                <Textarea
                  id="msg"
                  required
                  rows={6}
                  className="mt-1.5"
                  placeholder="Tell us a little about what you're looking for…"
                />
              </div>
              <Button type="submit" className="w-full" disabled={sending}>
                {sending ? "Sending…" : "Send message"}
              </Button>
              <p className="text-xs text-muted-foreground">
                We reply within one business day. Your message is processed under our privacy
                policy.
              </p>
            </form>
            <ProductDemo variant="inbox" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
