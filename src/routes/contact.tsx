import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Aurapply — Talk to a human" },
      { name: "description", content: "Reach the Aurapply team for support, sales, partnership, or press enquiries." },
      { property: "og:title", content: "Contact Aurapply" },
      { property: "og:description", content: "Talk to a real human about hiring on Aurapply." },
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
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              <span className="au-gradient-text">Talk to</span><br /> a human.
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Whether you&apos;re hiring, applying, or curious about how we handle data — we&apos;d like to hear from you.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <div>
                <div className="font-semibold text-foreground">Sales &amp; partnerships</div>
                <a href="mailto:hello@aurapply.com" className="text-primary hover:underline">hello@aurapply.com</a>
              </div>
              <div>
                <div className="font-semibold text-foreground">Support</div>
                <a href="mailto:support@aurapply.com" className="text-primary hover:underline">support@aurapply.com</a>
              </div>
              <div>
                <div className="font-semibold text-foreground">Privacy &amp; data requests</div>
                <a href="mailto:privacy@aurapply.com" className="text-primary hover:underline">privacy@aurapply.com</a>
              </div>
              <div>
                <div className="font-semibold text-foreground">Press</div>
                <a href="mailto:press@aurapply.com" className="text-primary hover:underline">press@aurapply.com</a>
              </div>
            </div>
          </div>

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
              <Textarea id="msg" required rows={6} className="mt-1.5" placeholder="Tell us a little about what you're looking for…" />
            </div>
            <Button type="submit" className="w-full" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </Button>
            <p className="text-xs text-muted-foreground">
              We reply within one business day. Your message is processed under our privacy policy.
            </p>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
