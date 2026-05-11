import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { RecruiterShell } from "@/components/recruiter-layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";

export const Route = createFileRoute("/r/billing")({ component: BillingPage });

const TIERS = [
  { name: "SMB", price: "€450", per: "/month", current: true, features: ["Up to 5 active jobs", "Unlimited matches", "Standard support"] },
  { name: "Growth", price: "€2,000", per: "/month", current: false, features: ["Up to 25 active jobs", "Verified candidate access", "Basic ATS integration", "Priority support"] },
  { name: "Enterprise", price: "Custom", per: "", current: false, features: ["Unlimited jobs", "SAML SSO", "Dedicated CSM", "Custom DPA"] },
];

function BillingPage() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/signin" });
    else if (userType === "candidate") nav({ to: "/dashboard" });
  }, [user, userType, loading, nav]);

  return (
    <RecruiterShell>
      <div className="px-6 py-12 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Choose the plan that fits your hiring volume.</p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {TIERS.map((t) => (
            <div key={t.name} className={`au-card p-6 ${t.current ? "border-primary" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{t.name}</div>
                {t.current && <span className="text-[11px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">Current plan</span>}
              </div>
              <div className="mt-4">
                <span className="text-3xl font-semibold tracking-tight">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.per}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 text-success mt-0.5 shrink-0" /> <span>{f}</span></li>
                ))}
              </ul>
              <Button
                className="w-full mt-6"
                variant={t.current ? "outline" : "default"}
                onClick={() => toast.info(t.name === "Enterprise" ? "Our team will be in touch." : "Subscription management is a placeholder.")}
              >
                {t.current ? "Manage subscription" : t.name === "Enterprise" ? "Contact sales" : "Upgrade"}
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Billing in EUR, exclusive of VAT. Invoiced monthly. EU-based processor.
        </p>
      </div>
    </RecruiterShell>
  );
}
