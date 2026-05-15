import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/privacy")({ component: Privacy });

const CONSENT_LABELS: Record<string, { title: string; desc: string }> = {
  terms_privacy: { title: "Terms & Privacy", desc: "Required to use Appointed." },
  ai_matching: { title: "AI-based matching", desc: "Allow our AI to analyse your profile and surface relevant roles." },
  product_updates: { title: "Product updates", desc: "Receive occasional product news. Optional." },
  data_sharing: { title: "Data sharing with recruiters", desc: "Allow matched recruiters to view your full profile." },
  identity_verification: { title: "Identity verification", desc: "Coming soon. Verify your identity through an EU provider." },
};
const KNOWN = ["terms_privacy", "ai_matching", "data_sharing", "product_updates", "identity_verification"];

function Privacy() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [consents, setConsents] = useState<any[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => { if (!loading && !user) nav({ to: "/signin" }); }, [user, loading, nav]);

  async function load() {
    if (!user) return;
    const { data } = await supabase.from("consents").select("*").eq("user_id", user.id);
    setConsents(data || []);
  }
  useEffect(() => { load(); }, [user]);

  function consentFor(t: string) { return consents.find((c) => c.consent_type === t && !c.revoked_at); }

  async function toggle(t: string, on: boolean) {
    if (!user) return;
    const existing = consentFor(t);
    if (on && !existing) {
      await supabase.from("consents").insert({ user_id: user.id, consent_type: t });
    } else if (!on && existing) {
      await supabase.from("consents").update({ revoked_at: new Date().toISOString(), granted: false }).eq("id", existing.id);
    }
    toast.success(on ? "Consent granted" : "Consent revoked");
    load();
  }

  async function deleteAccount() {
    setDeleteOpen(false);
    toast.success("Account deletion requested. We will confirm by email.");
  }

  if (!user) return null;

  return (
    <PageShell>
      <div className="px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Privacy & consent</h1>
          <p className="mt-2 text-muted-foreground">Control how your data is used. Revoke anything, anytime.</p>

          <div className="au-card p-6 mt-8">
            <h2 className="font-semibold mb-4">Your consents</h2>
            <div className="space-y-4">
              {KNOWN.map((t) => {
                const c = consentFor(t);
                const meta = CONSENT_LABELS[t];
                return (
                  <div key={t} className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
                    <div>
                      <div className="font-medium">{meta.title}</div>
                      <p className="text-sm text-muted-foreground mt-0.5">{meta.desc}</p>
                      {c && <p className="text-xs text-muted-foreground mt-1">Granted {new Date(c.granted_at).toLocaleDateString()}</p>}
                    </div>
                    <Switch checked={!!c} onCheckedChange={(v) => toggle(t, v)} disabled={t === "terms_privacy"} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="au-card p-6 mt-6">
            <h2 className="font-semibold">Your data rights</h2>
            <p className="mt-1 text-sm text-muted-foreground">Under the GDPR, you have the right to access, rectify, port, and erase your data.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button variant="outline" onClick={() => toast.success("Your data export will be sent by email.")}>Download my data</Button>
              <Button variant="outline" onClick={() => toast.info("Open any match and request human review.")}>Request human review of an AI decision</Button>
              <Button variant="destructive" onClick={() => setDeleteOpen(true)} className="sm:col-span-2">Delete my account</Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This permanently removes your profile, matches, consents, and history. Recruiters will no longer be able to see you. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={deleteAccount}>Yes, delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
