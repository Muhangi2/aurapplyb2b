import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { RecruiterShell } from "@/components/recruiter-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/r/company")({ component: CompanyPage });

function CompanyPage() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [c, setC] = useState<any>(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/signin" });
    else if (userType === "candidate") nav({ to: "/dashboard" });
  }, [user, userType, loading, nav]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const { data } = await supabase.from("companies").select("*").eq("owner_id", user.id).maybeSingle();
      setC(data);
    })();
  }, [user]);

  async function save() {
    if (!c) return;
    const { error } = await supabase
      .from("companies")
      .update({
        name: c.name,
        website: c.website,
        logo_url: c.logo_url,
        description: c.description,
        locations: typeof c.locations === "string" ? c.locations.split(",").map((s: string) => s.trim()).filter(Boolean) : c.locations,
      })
      .eq("id", c.id);
    if (error) toast.error(error.message);
    else toast.success("Company profile saved.");
  }

  if (!c) return <RecruiterShell><div className="px-6 py-12 max-w-3xl mx-auto text-sm text-muted-foreground">Loading…</div></RecruiterShell>;

  return (
    <RecruiterShell>
      <div className="px-6 py-12 max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Company profile</h1>
            <p className="text-sm text-muted-foreground mt-1">Shown to candidates when you reach out.</p>
          </div>
          <Button variant="outline" onClick={() => setPreview(!preview)}>{preview ? "Edit" : "Preview"}</Button>
        </div>

        {preview ? (
          <div className="au-card p-6 mt-6">
            <div className="flex items-center gap-4">
              {c.logo_url ? <img src={c.logo_url} alt={c.name} className="h-12 w-12 rounded-lg object-contain border border-border" /> : <div className="h-12 w-12 rounded-lg bg-secondary grid place-items-center font-semibold">{c.name?.[0]}</div>}
              <div>
                <div className="font-semibold text-lg">{c.name}</div>
                {c.website && <a href={c.website} className="text-xs text-primary hover:underline">{c.website}</a>}
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground whitespace-pre-wrap">{c.description}</p>
            {(c.locations ?? []).length > 0 && <div className="mt-4 text-xs text-muted-foreground">Locations: {(c.locations ?? []).join(", ")}</div>}
          </div>
        ) : (
          <div className="au-card p-6 mt-6 space-y-4">
            <div><Label>Company name</Label><Input value={c.name ?? ""} onChange={(e) => setC({ ...c, name: e.target.value })} className="mt-1.5" /></div>
            <div><Label>Logo URL</Label><Input value={c.logo_url ?? ""} onChange={(e) => setC({ ...c, logo_url: e.target.value })} className="mt-1.5" /></div>
            <div><Label>Website</Label><Input value={c.website ?? ""} onChange={(e) => setC({ ...c, website: e.target.value })} className="mt-1.5" /></div>
            <div><Label>Description</Label><Textarea rows={4} value={c.description ?? ""} onChange={(e) => setC({ ...c, description: e.target.value })} className="mt-1.5" /></div>
            <div><Label>Locations</Label><Input value={Array.isArray(c.locations) ? c.locations.join(", ") : c.locations ?? ""} onChange={(e) => setC({ ...c, locations: e.target.value })} className="mt-1.5" /><p className="text-xs text-muted-foreground mt-1">Comma separated.</p></div>
            <div className="flex justify-end"><Button onClick={save}>Save</Button></div>
          </div>
        )}
      </div>
    </RecruiterShell>
  );
}
