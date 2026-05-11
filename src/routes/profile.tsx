import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Pencil, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { computeCompleteness } from "@/lib/mock-matches";

export const Route = createFileRoute("/profile")({ component: Profile });

function Section({ title, editing, onEdit, onSave, onCancel, children }: any) {
  return (
    <div className="au-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">{title}</h2>
        {editing ? (
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button size="sm" onClick={onSave}>Save</Button>
          </div>
        ) : (
          <Button size="sm" variant="ghost" onClick={onEdit}><Pencil className="h-4 w-4 mr-1" /> Edit</Button>
        )}
      </div>
      {children}
    </div>
  );
}

function Profile() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [exps, setExps] = useState<any[]>([]);
  const [edus, setEdus] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [langs, setLangs] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<any>({});
  const [completeness, setCompleteness] = useState(0);

  useEffect(() => { if (!loading && !user) nav({ to: "/signin" }); }, [user, loading, nav]);

  async function load() {
    if (!user) return;
    const [p, e, ed, s, l] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase.from("experiences").select("*").eq("user_id", user.id).order("start_date", { ascending: false }),
      supabase.from("education").select("*").eq("user_id", user.id).order("start_year", { ascending: false }),
      supabase.from("skills").select("*").eq("user_id", user.id),
      supabase.from("languages").select("*").eq("user_id", user.id),
    ]);
    setProfile(p.data); setExps(e.data || []); setEdus(ed.data || []); setSkills(s.data || []); setLangs(l.data || []);
    setCompleteness(computeCompleteness({
      ...p.data,
      experiences_count: e.data?.length || 0,
      education_count: ed.data?.length || 0,
      skills_count: s.data?.length || 0,
      languages_count: l.data?.length || 0,
    }));
  }
  useEffect(() => { load(); }, [user]);

  async function saveBasic() {
    await supabase.from("profiles").update(draft).eq("id", user!.id);
    setEditing(null); toast.success("Saved"); load();
  }

  async function addSkill(name: string) {
    if (!name.trim()) return;
    await supabase.from("skills").insert({ user_id: user!.id, name: name.trim() });
    load();
  }
  async function delSkill(id: string) {
    await supabase.from("skills").delete().eq("id", id); load();
  }

  if (!profile) return <PageShell><div className="px-6 py-20 text-center text-muted-foreground">Loading…</div></PageShell>;

  return (
    <PageShell>
      <div className="px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight">Your profile</h1>

          <div className="au-card p-5 mt-6">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Profile completeness</span><span className="font-medium">{completeness}%</span></div>
            <Progress value={completeness} className="mt-2" />
          </div>

          <div className="mt-6 space-y-5">
            <Section title="Basic info"
              editing={editing === "basic"}
              onEdit={() => { setDraft({ full_name: profile.full_name, city: profile.city, country: profile.country, current_title: profile.current_title, years_experience: profile.years_experience }); setEditing("basic"); }}
              onCancel={() => setEditing(null)} onSave={saveBasic}
            >
              {editing === "basic" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div><Label>Full name</Label><Input value={draft.full_name || ""} onChange={(e) => setDraft({ ...draft, full_name: e.target.value })} className="mt-1.5" /></div>
                  <div><Label>Current title</Label><Input value={draft.current_title || ""} onChange={(e) => setDraft({ ...draft, current_title: e.target.value })} className="mt-1.5" /></div>
                  <div><Label>City</Label><Input value={draft.city || ""} onChange={(e) => setDraft({ ...draft, city: e.target.value })} className="mt-1.5" /></div>
                  <div><Label>Country</Label><Input value={draft.country || ""} onChange={(e) => setDraft({ ...draft, country: e.target.value })} className="mt-1.5" /></div>
                  <div><Label>Years of experience</Label><Input type="number" value={draft.years_experience || ""} onChange={(e) => setDraft({ ...draft, years_experience: parseInt(e.target.value) || 0 })} className="mt-1.5" /></div>
                </div>
              ) : (
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  <div><dt className="text-muted-foreground">Name</dt><dd>{profile.full_name || "—"}</dd></div>
                  <div><dt className="text-muted-foreground">Title</dt><dd>{profile.current_title || "—"}</dd></div>
                  <div><dt className="text-muted-foreground">Location</dt><dd>{[profile.city, profile.country].filter(Boolean).join(", ") || "—"}</dd></div>
                  <div><dt className="text-muted-foreground">Experience</dt><dd>{profile.years_experience ?? "—"} years</dd></div>
                  <div><dt className="text-muted-foreground">Work authorization</dt><dd>{profile.work_authorization || "—"}</dd></div>
                </dl>
              )}
            </Section>

            <Section title="Experience" editing={false} onEdit={() => toast.info("Use onboarding to add new roles. Inline editing coming soon.")}>
              {exps.length === 0 ? <p className="text-sm text-muted-foreground">No experience added yet.</p> : (
                <ul className="space-y-4">
                  {exps.map((e) => (
                    <li key={e.id}>
                      <div className="font-medium">{e.role} <span className="text-muted-foreground font-normal">at {e.company}</span></div>
                      <div className="text-xs text-muted-foreground">{e.start_date || ""} – {e.is_current ? "Present" : (e.end_date || "")}</div>
                      {e.description && <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="Education" editing={false} onEdit={() => toast.info("Inline editing coming soon.")}>
              {edus.length === 0 ? <p className="text-sm text-muted-foreground">No education added yet.</p> : (
                <ul className="space-y-3">
                  {edus.map((e) => (
                    <li key={e.id}>
                      <div className="font-medium">{e.degree} {e.field && `in ${e.field}`}</div>
                      <div className="text-sm text-muted-foreground">{e.institution} • {e.start_year || ""}–{e.end_year || ""}</div>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="Skills" editing={editing === "skills"} onEdit={() => setEditing("skills")} onCancel={() => setEditing(null)} onSave={() => { setEditing(null); toast.success("Saved"); }}>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.id} className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 text-primary px-2 py-1 text-xs font-medium">
                    {s.name}
                    {editing === "skills" && <button onClick={() => delSkill(s.id)}><X className="h-3 w-3" /></button>}
                  </span>
                ))}
              </div>
              {editing === "skills" && (
                <div className="mt-3 flex gap-2">
                  <Input placeholder="Add a skill" onKeyDown={(e: any) => { if (e.key === "Enter") { addSkill(e.target.value); e.target.value = ""; } }} />
                </div>
              )}
            </Section>

            <Section title="Languages" editing={false} onEdit={() => toast.info("Inline editing coming soon.")}>
              {langs.length === 0 ? <p className="text-sm text-muted-foreground">No languages added.</p> : (
                <ul className="space-y-2 text-sm">
                  {langs.map((l) => <li key={l.id}><span className="font-medium">{l.name}</span> <span className="text-muted-foreground">— {l.proficiency}</span></li>)}
                </ul>
              )}
            </Section>

            <Section title="Preferences" editing={false} onEdit={() => toast.info("Inline editing coming soon.")}>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div><dt className="text-muted-foreground">Job types</dt><dd>{profile.job_types?.join(", ") || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Locations</dt><dd>{profile.preferred_locations?.join(", ") || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Salary</dt><dd>{profile.salary_min || profile.salary_max ? `${profile.salary_min ?? "—"} – ${profile.salary_max ?? "—"} EUR` : "—"}</dd></div>
                <div><dt className="text-muted-foreground">Notice</dt><dd>{profile.notice_period || "—"}</dd></div>
              </dl>
            </Section>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
