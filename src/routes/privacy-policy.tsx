import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Aurapply" },
      { name: "description", content: "How Aurapply collects, processes, and protects personal data under the GDPR." },
      { property: "og:title", content: "Privacy Policy — Aurapply" },
      { property: "og:description", content: "GDPR-native privacy policy for Aurapply." },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <PageShell>
      <article className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: 12 May 2026</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted-foreground">
            <Section title="Controller">
              Aurapply OÜ acts as the data controller for personal data submitted by individual users and as a data processor for personal data handled on behalf of recruiter customers.
            </Section>
            <Section title="What we collect">
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Account data: name, email, password hash.</li>
                <li>Profile data: experience, skills, location, preferences.</li>
                <li>Recruiter data: company name, billing details, posted roles.</li>
                <li>Usage data: pages viewed, matches surfaced, actions taken.</li>
                <li>Technical data: IP, browser, device for security and abuse prevention.</li>
              </ul>
            </Section>
            <Section title="How we use it">
              To provide the matching service, secure the platform, process payments, comply with legal obligations, and — only with your explicit consent — to send product updates.
            </Section>
            <Section title="Legal bases">
              Performance of contract, legitimate interest, legal obligation, and consent. Each consent is granular and revocable from <a className="text-primary hover:underline" href="/privacy">your privacy settings</a>.
            </Section>
            <Section title="AI-assisted decisions">
              Matching is AI-assisted but not fully automated. Recruiters decide who to contact. Candidates decide which roles to engage with. You can request human review of any AI-surfaced match.
            </Section>
            <Section title="Sharing">
              Recruiter access to your profile happens only after a match and is logged. We use a small set of EU-based subprocessors for hosting, email, and analytics; the current list is available on request.
            </Section>
            <Section title="Retention">
              Profile data is kept while your account is active and for 30 days after deletion to allow recovery. Aggregate, non-identifying analytics are kept longer.
            </Section>
            <Section title="Your rights">
              Access, rectification, erasure, portability, restriction, objection, and the right to lodge a complaint with your local supervisory authority.
            </Section>
            <Section title="International transfers">
              Personal data is hosted within the EU. Where a transfer outside the EEA is unavoidable, we rely on Standard Contractual Clauses.
            </Section>
            <Section title="Contact">
              For privacy questions or to exercise any right, write to <a className="text-primary hover:underline" href="mailto:privacy@aurapply.com">privacy@aurapply.com</a>.
            </Section>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}
