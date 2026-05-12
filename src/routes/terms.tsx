import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Aurapply" },
      { name: "description", content: "The terms governing the use of Aurapply by individuals and businesses." },
      { property: "og:title", content: "Terms of Service — Aurapply" },
      { property: "og:description", content: "The terms governing the use of Aurapply." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <article className="px-6 py-20">
        <div className="mx-auto max-w-3xl prose-aurapply">
          <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: 12 May 2026</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted-foreground">
            <Section title="1. Who we are">
              Aurapply is operated by Aurapply OÜ, a company registered in the European Union. By using Aurapply you agree to these Terms together with our <a className="text-primary hover:underline" href="/privacy-policy">Privacy Policy</a>.
            </Section>
            <Section title="2. Accounts">
              You are responsible for the accuracy of the information in your account and for keeping your credentials safe. You must be at least 16 years old to create an Aurapply account.
            </Section>
            <Section title="3. Matching service">
              Aurapply uses automated matching to surface roles to candidates and candidates to recruiters. Matches are suggestions, not offers — neither party is obliged to engage. Decisions to interview, offer, or hire remain with the recruiter and the candidate.
            </Section>
            <Section title="4. Acceptable use">
              You agree not to misrepresent your identity, scrape the platform, attempt to deanonymise other users, post unlawful or discriminatory job content, or use Aurapply to send unsolicited commercial messages.
            </Section>
            <Section title="5. Recruiter obligations">
              Recruiters posting roles confirm that postings comply with applicable employment, equality, and data-protection law in their jurisdiction. Recruiters must not request information that is prohibited under EU non-discrimination rules.
            </Section>
            <Section title="6. Fees">
              Some recruiter features are paid. Pricing, billing periods, and refund terms are described at the point of subscription. Individual accounts are free.
            </Section>
            <Section title="7. Intellectual property">
              You retain ownership of the content you upload. You grant Aurapply a limited licence to process that content strictly to provide the matching service.
            </Section>
            <Section title="8. Termination">
              You may delete your account at any time from <a className="text-primary hover:underline" href="/privacy">Privacy &amp; consent</a>. We may suspend accounts that breach these Terms.
            </Section>
            <Section title="9. Liability">
              Aurapply is provided &quot;as is&quot;. We do not guarantee employment outcomes. Liability is limited to the maximum extent permitted by EU consumer law.
            </Section>
            <Section title="10. Governing law">
              These Terms are governed by the laws of Estonia. Disputes go to the competent courts of Tallinn, without prejudice to mandatory consumer protections in your country of residence.
            </Section>
            <Section title="11. Changes">
              We will notify you of material changes by email at least 30 days before they take effect.
            </Section>
            <Section title="12. Contact">
              Questions? <a className="text-primary hover:underline" href="/contact">Contact us</a> or write to <a className="text-primary hover:underline" href="mailto:legal@aurapply.com">legal@aurapply.com</a>.
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
      <p className="mt-2">{children}</p>
    </div>
  );
}
