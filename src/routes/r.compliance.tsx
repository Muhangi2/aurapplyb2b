import { createFileRoute } from "@tanstack/react-router";
import { RecruiterShell } from "@/components/recruiter-layout";
import { Button } from "@/components/ui/button";
import {
  ScaleIcon,
  DocumentIcon,
  DownloadIcon,
  ShieldIcon,
  AuditTrailIcon,
  ContactIcon,
} from "@/components/icons";
import { toast } from "sonner";

export const Route = createFileRoute("/r/compliance")({
  component: RecruiterCompliance,
});

type Doc = {
  title: string;
  desc: string;
  updated: string;
  size: string;
};

const DOCS: Doc[] = [
  {
    title: "Methodology overview",
    desc: "How matching works: criteria, weights, recency, verification, and human oversight points.",
    updated: "2026-04-01",
    size: "PDF · 1.4 MB",
  },
  {
    title: "Bias testing report (quarterly)",
    desc: "Most recent bias-testing summary across protected categories with mitigations and trend deltas.",
    updated: "2026-04-15",
    size: "PDF · 920 KB",
  },
  {
    title: "DPIA inputs for deployers",
    desc: "Pre-filled inputs you can plug into your own Data Protection Impact Assessment.",
    updated: "2026-03-20",
    size: "DOCX · 380 KB",
  },
  {
    title: "AI Act deployer guidance",
    desc: "Plain-language summary of your obligations as a deployer, mapped to Appointed's controls.",
    updated: "2026-03-20",
    size: "PDF · 760 KB",
  },
  {
    title: "GDPR data processing addendum",
    desc: "Standard DPA covering candidate data processing, EU hosting, and sub-processors.",
    updated: "2026-02-10",
    size: "PDF · 540 KB",
  },
  {
    title: "Service agreement template",
    desc: "Reference copy of the service agreement signed at provisioning.",
    updated: "2026-02-10",
    size: "PDF · 410 KB",
  },
];

function fmtDate(s: string) {
  const d = new Date(s);
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}

function RecruiterCompliance() {
  return (
    <RecruiterShell>
      <div className="px-6 py-10 max-w-5xl mx-auto">
        {/* Overview */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-primary">COMPLIANCE</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Documentation and assurance for your team.
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
              Appointed is built around the EU AI Act's high-risk requirements and the GDPR. The
              documents below cover everything your procurement, legal, and compliance teams need
              for vendor due diligence, DPIAs, and ongoing oversight. They are refreshed on a
              regular cadence; see the update timestamps on each document.
            </p>
          </div>
          <div className="hidden md:grid h-16 w-16 place-items-center rounded-xl bg-primary/10 text-primary">
            <ScaleIcon size={36} />
          </div>
        </div>

        {/* Document library */}
        <div className="mt-10">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-primary">DOCUMENT LIBRARY</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {DOCS.map((d) => (
              <div key={d.title} className="au-card au-card-hover p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <DocumentIcon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-tight">{d.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                      <div className="text-xs text-muted-foreground">
                        Updated {fmtDate(d.updated)} · {d.size}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          toast.info("Document download will open shortly. Contact your point of contact if you need it now.")
                        }
                      >
                        <DownloadIcon size={14} /> Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quarterly updates */}
        <div className="mt-12 au-band rounded-2xl">
          <div className="p-7 grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
              <AuditTrailIcon size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Quarterly compliance updates</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Bias testing results and methodology revisions are published every quarter. Opt in
                to be emailed when a new version is available.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast.success("You will be notified when documentation refreshes.")}
            >
              Notify me
            </Button>
          </div>
        </div>

        {/* Contact box */}
        <div className="mt-8 au-card-elevated p-7">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
              <ContactIcon size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Questions about compliance?</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                Contact your point of contact or our DPO directly at{" "}
                <a href="mailto:dpo@appointed.com" className="text-primary hover:underline">
                  dpo@appointed.com
                </a>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldIcon size={14} className="text-primary" />
          All documents and processing are EU-hosted.
        </div>
      </div>
    </RecruiterShell>
  );
}
