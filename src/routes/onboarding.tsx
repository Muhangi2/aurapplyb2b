import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { PageShell } from "@/components/layout";
import { toast } from "sonner";
import { Plus, X, Check } from "lucide-react";
import { seedMatchesIfEmpty } from "@/lib/mock-matches";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const EU_AUTH = [
  "EU citizen",
  "EU work permit",
  "Blue Card",
  "Need sponsorship",
  "Other",
];
const SKILL_SUGGESTIONS = ["Python", "React", "TypeScript", "Project Management", "Sales", "Product Marketing", "B2B SaaS", "Data Analysis", "Figma"];
const LANG_LEVELS = ["Native", "Fluent", "Professional", "Conversational", "Basic"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const LOC_PREFS = ["Remote", "Hybrid", "On-site"];

type Exp = { company: string; role: string; start_date: string; end_date: string; is_current: boolean; description: string };
type Edu = { institution: string; degree: string; field: string; start_year: string; end_year: string };
type Lang = { name: string; proficiency: string };

function Onboarding() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [years, setYears] = useState("");
  const [auth, setAuth] = useState("");

  // Step 2
  const [experiences, setExperiences] = useState<Exp[]>([
    { company: "", role: "", start_date: "", end_date: "", is_current: false, description: "" },
  ]);
  // Step 3
  const [edus, setEdus] = useState<Edu[]>([
    { institution: "", degree: "", field: "", start_year: "", end_year: "" },
  ]);
  // Step 4
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [languages, setLanguages] = useState<Lang[]>([{ name: "", proficiency: "Fluent" }]);

  // Step 5
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [locPrefs, setLocPrefs] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [notice, setNotice] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/signin" });
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data?.full_name) setName(data.full_name);
    });
  }, [user]);

  function toggle<T>(arr: T[], v: T): T[] {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }

  function addSkill(s: string) {
    const v = s.trim();
    if (!v) return;
    if (skills.includes(v)) return;
    setSkills([...skills, v]);
    setSkillInput("");
  }

  async function finish() {
    if (!user) return;
    setSubmitting(true);
    await supabase.from("profiles").update({
      full_name: name,
      city, country, current_title: title,
      years_experience: parseInt(years) || 0,
      work_authorization: auth,
      job_types: jobTypes,
      preferred_locations: locPrefs,
      salary_min: salaryMin ? parseInt(salaryMin) : null,
      salary_max: salaryMax ? parseInt(salaryMax) : null,
      notice_period: notice,
      onboarding_complete: true,
    }).eq("id", user.id);

    const expRows = experiences.filter((e) => e.company && e.role).map((e) => ({
      user_id: user.id,
      company: e.company, role: e.role,
      start_date: e.start_date || null,
      end_date: e.is_current ? null : (e.end_date || null),
      is_current: e.is_current,
      description: e.description,
    }));
    if (expRows.length) await supabase.from("experiences").insert(expRows);

    const eduRows = edus.filter((e) => e.institution).map((e) => ({
      user_id: user.id,
      institution: e.institution, degree: e.degree, field: e.field,
      start_year: e.start_year ? parseInt(e.start_year) : null,
      end_year: e.end_year ? parseInt(e.end_year) : null,
    }));
    if (eduRows.length) await supabase.from("education").insert(eduRows);

    if (skills.length) await supabase.from("skills").insert(skills.map((s) => ({ user_id: user.id, name: s })));
    const langRows = languages.filter((l) => l.name).map((l) => ({ user_id: user.id, name: l.name, proficiency: l.proficiency }));
    if (langRows.length) await supabase.from("languages").insert(langRows);

    await seedMatchesIfEmpty(user.id);
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    const score = 92;
    return (
      <PageShell>
        <div className="px-6 py-20">
          <div className="mx-auto max-w-lg au-card p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
              <Check className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Profile complete</h1>
            <p className="mt-2 text-muted-foreground">Your profile is ready. We are finding matches for you.</p>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Profile completeness</span><span className="font-medium">{score}%</span></div>
              <Progress value={score} />
            </div>
            <Button className="mt-8 w-full" onClick={() => nav({ to: "/dashboard" })}>Go to dashboard</Button>
          </div>
        </div>
      </PageShell>
    );
  }

  const pct = (step / 5) * 100;

  return (
    <PageShell>
      <div className="px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Step {step} of 5</span>
            <span className="text-muted-foreground">{Math.round(pct)}%</span>
          </div>
          <Progress value={pct} className="mt-2" />

          <div className="au-card p-8 mt-6">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold">Basic info</h2>
                  <p className="text-sm text-muted-foreground mt-1">Tell us who you are and where you work.</p>
                </div>
                <div>
                  <Label>Full name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>City</Label><Input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1.5" /></div>
                  <div><Label>Country</Label><Input value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1.5" /></div>
                </div>
                <div><Label>Current job title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Years of experience</Label><Input type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} className="mt-1.5" /></div>
                  <div>
                    <Label>Work authorization</Label>
                    <Select value={auth} onValueChange={setAuth}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{EU_AUTH.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold">Professional experience</h2>
                  <p className="text-sm text-muted-foreground mt-1">Add the roles that shaped your career.</p>
                </div>
                {experiences.map((e, i) => (
                  <div key={i} className="rounded-lg border border-border p-4 space-y-3 relative">
                    {experiences.length > 1 && (
                      <button onClick={() => setExperiences(experiences.filter((_, j) => j !== i))} className="absolute right-2 top-2 text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Company</Label><Input value={e.company} onChange={(ev) => { const c=[...experiences]; c[i].company=ev.target.value; setExperiences(c); }} className="mt-1.5" /></div>
                      <div><Label>Role</Label><Input value={e.role} onChange={(ev) => { const c=[...experiences]; c[i].role=ev.target.value; setExperiences(c); }} className="mt-1.5" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Start</Label><Input type="month" value={e.start_date} onChange={(ev) => { const c=[...experiences]; c[i].start_date=ev.target.value; setExperiences(c); }} className="mt-1.5" /></div>
                      <div>
                        <Label>End</Label>
                        <Input type="month" value={e.end_date} disabled={e.is_current} onChange={(ev) => { const c=[...experiences]; c[i].end_date=ev.target.value; setExperiences(c); }} className="mt-1.5" />
                        <label className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <Checkbox checked={e.is_current} onCheckedChange={(v) => { const c=[...experiences]; c[i].is_current=!!v; setExperiences(c); }} /> Current role
                        </label>
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={e.description} maxLength={200} onChange={(ev) => { const c=[...experiences]; c[i].description=ev.target.value; setExperiences(c); }} className="mt-1.5" rows={3} />
                      <p className="mt-1 text-xs text-muted-foreground">{e.description.length}/200</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" type="button" onClick={() => setExperiences([...experiences, { company: "", role: "", start_date: "", end_date: "", is_current: false, description: "" }])}>
                  <Plus className="h-4 w-4 mr-1" /> Add another role
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold">Education</h2>
                  <p className="text-sm text-muted-foreground mt-1">Where you studied.</p>
                </div>
                {edus.map((e, i) => (
                  <div key={i} className="rounded-lg border border-border p-4 space-y-3 relative">
                    {edus.length > 1 && (
                      <button onClick={() => setEdus(edus.filter((_, j) => j !== i))} className="absolute right-2 top-2 text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <div><Label>Institution</Label><Input value={e.institution} onChange={(ev) => { const c=[...edus]; c[i].institution=ev.target.value; setEdus(c); }} className="mt-1.5" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Degree</Label><Input value={e.degree} onChange={(ev) => { const c=[...edus]; c[i].degree=ev.target.value; setEdus(c); }} className="mt-1.5" /></div>
                      <div><Label>Field</Label><Input value={e.field} onChange={(ev) => { const c=[...edus]; c[i].field=ev.target.value; setEdus(c); }} className="mt-1.5" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Start year</Label><Input type="number" value={e.start_year} onChange={(ev) => { const c=[...edus]; c[i].start_year=ev.target.value; setEdus(c); }} className="mt-1.5" /></div>
                      <div><Label>End year</Label><Input type="number" value={e.end_year} onChange={(ev) => { const c=[...edus]; c[i].end_year=ev.target.value; setEdus(c); }} className="mt-1.5" /></div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" type="button" onClick={() => setEdus([...edus, { institution: "", degree: "", field: "", start_year: "", end_year: "" }])}>
                  <Plus className="h-4 w-4 mr-1" /> Add another
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Skills & languages</h2>
                  <p className="text-sm text-muted-foreground mt-1">What you bring to a team.</p>
                </div>
                <div>
                  <Label>Skills</Label>
                  <div className="mt-1.5 flex flex-wrap gap-2 rounded-lg border border-border bg-surface p-2 min-h-[44px]">
                    {skills.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 text-primary px-2 py-1 text-xs font-medium">
                        {s}
                        <button onClick={() => setSkills(skills.filter((x) => x !== s))}><X className="h-3 w-3" /></button>
                      </span>
                    ))}
                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); } }}
                      placeholder="Type and press Enter"
                      className="flex-1 min-w-[140px] bg-transparent outline-none text-sm px-1"
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).map((s) => (
                      <button key={s} onClick={() => addSkill(s)} className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground">+ {s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Languages</Label>
                  <div className="space-y-2 mt-1.5">
                    {languages.map((l, i) => (
                      <div key={i} className="grid grid-cols-[1fr_180px_36px] gap-2">
                        <Input placeholder="e.g. German" value={l.name} onChange={(e) => { const c=[...languages]; c[i].name=e.target.value; setLanguages(c); }} />
                        <Select value={l.proficiency} onValueChange={(v) => { const c=[...languages]; c[i].proficiency=v; setLanguages(c); }}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{LANG_LEVELS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" onClick={() => setLanguages(languages.filter((_, j) => j !== i))} disabled={languages.length === 1}><X className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" type="button" className="mt-2" onClick={() => setLanguages([...languages, { name: "", proficiency: "Fluent" }])}>
                    <Plus className="h-4 w-4 mr-1" /> Add language
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Preferences</h2>
                  <p className="text-sm text-muted-foreground mt-1">What kind of role do you want next?</p>
                </div>
                <div>
                  <Label>Job types</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {JOB_TYPES.map((j) => (
                      <button key={j} onClick={() => setJobTypes(toggle(jobTypes, j))}
                        className={`rounded-full px-3 py-1.5 text-sm border ${jobTypes.includes(j) ? "bg-primary text-primary-foreground border-primary" : "border-border bg-surface text-muted-foreground"}`}>
                        {j}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Preferred location</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {LOC_PREFS.map((j) => (
                      <button key={j} onClick={() => setLocPrefs(toggle(locPrefs, j))}
                        className={`rounded-full px-3 py-1.5 text-sm border ${locPrefs.includes(j) ? "bg-primary text-primary-foreground border-primary" : "border-border bg-surface text-muted-foreground"}`}>
                        {j}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Salary expectation (EUR/year, optional)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    <Input placeholder="Min" type="number" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
                    <Input placeholder="Max" type="number" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Notice period</Label>
                  <Select value={notice} onValueChange={setNotice}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Immediate", "2 weeks", "1 month", "2 months", "3 months", "6 months"].map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Back</Button>
              {step < 5 ? (
                <Button onClick={() => setStep(step + 1)}>Continue</Button>
              ) : (
                <Button onClick={finish} disabled={submitting}>{submitting ? "Saving…" : "Finish"}</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
