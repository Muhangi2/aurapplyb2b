import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { RecruiterShell } from "@/components/recruiter-layout";

export const Route = createFileRoute("/r/onboarding")({ component: RecruiterOnboarding });

function Steps({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {[1, 2, 3].map((n) => (
        <div key={n} className={`flex-1 h-1 rounded-full ${n <= step ? "bg-primary" : "bg-border"}`} />
      ))}
      <span className="ml-3">Step {step} of 3</span>
    </div>
  );
}

function RecruiterOnboarding() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [companyId, setCompanyId] = useState<string | null>(null);

  // Step 1
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState("");

  // Step 2
  const [roleFocus, setRoleFocus] = useState("");
  const [departments, setDepartments] = useState("");
  const [hires, setHires] = useState("");

  // Step 3
  const [invites, setInvites] = useState("");

  useEffect(() => {
    if (!loading && !user) nav({ to: "/signin" });
  }, [user, loading, nav]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const { data } = await supabase
        .from("companies")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setCompanyId(data.id);
        setName(data.name ?? "");
        setWebsite(data.website ?? "");
        setLogoUrl(data.logo_url ?? "");
        setDescription(data.description ?? "");
        setLocations((data.locations ?? []).join(", "));
        setRoleFocus((data.role_focus ?? []).join(", "));
        setDepartments((data.departments ?? []).join(", "));
        setHires(data.hires_per_year ?? "");
        if (data.onboarding_complete) nav({ to: "/r/dashboard" });
      }
    })();
  }, [user, nav]);

  async function saveStep1() {
    if (!name) return toast.error("Company name is required.");
    if (!companyId) return toast.error("Company not found.");
    const { error } = await supabase
      .from("companies")
      .update({
        name,
        website,
        logo_url: logoUrl,
        description,
        locations: locations.split(",").map((s) => s.trim()).filter(Boolean),
      })
      .eq("id", companyId);
    if (error) return toast.error(error.message);
    setStep(2);
  }
  async function saveStep2() {
    if (!companyId) return;
    const { error } = await supabase
      .from("companies")
      .update({
        role_focus: roleFocus.split(",").map((s) => s.trim()).filter(Boolean),
        departments: departments.split(",").map((s) => s.trim()).filter(Boolean),
        hires_per_year: hires,
      })
      .eq("id", companyId);
    if (error) return toast.error(error.message);
    setStep(3);
  }
  async function finish() {
    if (!companyId || !user) return;
    const emails = invites.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
    if (emails.length) {
      await supabase.from("team_members").insert(
        emails.map((email) => ({ company_id: companyId, email, role: "recruiter", status: "invited", invited_by: user.id })),
      );
    }
    await supabase.from("companies").update({ onboarding_complete: true }).eq("id", companyId);
    toast.success("Setup complete.");
    nav({ to: "/r/dashboard" });
  }

  return (
    <RecruiterShell>
      <div className="px-6 py-12 max-w-2xl mx-auto">
        <Steps step={step} />
        <div className="au-card p-8 mt-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Company profile</h2>
                <p className="text-sm text-muted-foreground mt-1">This is what candidates will see when you reach out.</p>
              </div>
              <div>
                <Label>Company name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Logo URL</Label>
                <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://…/logo.png" className="mt-1.5" />
                <p className="text-xs text-muted-foreground mt-1">Paste a public URL. File upload coming soon.</p>
              </div>
              <div>
                <Label>Website</Label>
                <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://…" className="mt-1.5" />
              </div>
              <div>
                <Label>Short description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1.5" />
              </div>
              <div>
                <Label>Primary hiring locations</Label>
                <Input value={locations} onChange={(e) => setLocations(e.target.value)} placeholder="Munich, Berlin, Remote (EU)" className="mt-1.5" />
                <p className="text-xs text-muted-foreground mt-1">Comma separated.</p>
              </div>
              <div className="pt-2 flex justify-end">
                <Button onClick={saveStep1}>Continue</Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Hiring focus</h2>
                <p className="text-sm text-muted-foreground mt-1">Helps us calibrate matches from the start.</p>
              </div>
              <div>
                <Label>Typical role types</Label>
                <Input value={roleFocus} onChange={(e) => setRoleFocus(e.target.value)} placeholder="Engineering, Product, Sales" className="mt-1.5" />
              </div>
              <div>
                <Label>Primary departments</Label>
                <Input value={departments} onChange={(e) => setDepartments(e.target.value)} placeholder="Engineering, Marketing" className="mt-1.5" />
              </div>
              <div>
                <Label>Average hires per year</Label>
                <Input value={hires} onChange={(e) => setHires(e.target.value)} placeholder="20" className="mt-1.5" />
              </div>
              <div className="pt-2 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={saveStep2}>Continue</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Invite your team</h2>
                <p className="text-sm text-muted-foreground mt-1">Optional. You can do this later.</p>
              </div>
              <div>
                <Label>Email addresses</Label>
                <Textarea value={invites} onChange={(e) => setInvites(e.target.value)} rows={4} placeholder="anna@company.com, marc@company.com" className="mt-1.5" />
                <p className="text-xs text-muted-foreground mt-1">Comma or newline separated. Invitations are placeholders for now.</p>
              </div>
              <div className="pt-2 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={finish}>Skip</Button>
                  <Button onClick={finish}>Finish</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </RecruiterShell>
  );
}
