import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { RecruiterShell } from "@/components/recruiter-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/r/team")({ component: TeamPage });

const ROLES = ["admin", "recruiter", "viewer"];

function TeamPage() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("recruiter");

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/signin" });
    else if (userType === "candidate") nav({ to: "/dashboard" });
  }, [user, userType, loading, nav]);

  async function load() {
    if (!user) return;
    const { data: c } = await supabase.from("companies").select("id").eq("owner_id", user.id).maybeSingle();
    if (!c) return;
    setCompanyId(c.id);
    const { data: ms } = await supabase.from("team_members").select("*").eq("company_id", c.id).order("created_at");
    setMembers(ms ?? []);
  }
  useEffect(() => { load(); }, [user]);

  async function invite() {
    if (!email || !companyId || !user) return;
    await supabase.from("team_members").insert({ company_id: companyId, email, role, status: "invited", invited_by: user.id });
    setEmail("");
    toast.success("Invitation sent.");
    load();
  }
  async function changeRole(id: string, newRole: string) {
    await supabase.from("team_members").update({ role: newRole }).eq("id", id);
    load();
  }
  async function remove(id: string) {
    await supabase.from("team_members").delete().eq("id", id);
    load();
  }

  return (
    <RecruiterShell>
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage who has access to this recruiter account.</p>

        <div className="au-card p-6 mt-6">
          <h2 className="font-semibold">Invite a teammate</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="anna@company.com" className="mt-1.5" />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>{ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-end"><Button onClick={invite}>Send invitation</Button></div>
        </div>

        <div className="au-card mt-6 divide-y divide-border">
          {members.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No team members yet.</div>}
          {members.map((m) => (
            <div key={m.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">{m.email}</div>
                <div className="text-xs text-muted-foreground">Status: {m.status}</div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={m.role} onValueChange={(v) => changeRole(m.id, v)}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>{ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
                <Button size="sm" variant="ghost" onClick={() => remove(m.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Roles: Admin (full access), Recruiter (post jobs and contact candidates), Viewer (read-only).</p>
      </div>
    </RecruiterShell>
  );
}
