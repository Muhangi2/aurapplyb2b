import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { RecruiterShell } from "@/components/recruiter-layout";
import { generateBatchForJob, logRecruiterAction } from "@/lib/recruiter-mocks";

export const Route = createFileRoute("/r/jobs/new")({ component: NewJob });

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const SENIORITY = ["Entry", "Mid", "Senior", "Lead", "Executive"];
const EDUCATION = ["No requirement", "Bachelor's", "Master's", "PhD"];
const NOTICE = ["Immediate", "Up to 1 month", "Up to 3 months", "Flexible"];
const AUTHZ = ["EU citizen", "EU work permit", "Sponsorship available", "No restriction"];
const LANG_PROF = ["Conversational", "Fluent", "Native"];

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`flex-1 h-1 rounded-full ${i < step ? "bg-primary" : "bg-border"}`} />
      ))}
      <span className="ml-3">Step {step} of {total}</span>
    </div>
  );
}

function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");
  function add() {
    const v = input.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput("");
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs">
            {t}
            <button type="button" onClick={() => onChange(value.filter((v) => v !== t))} className="text-muted-foreground hover:text-foreground">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder={placeholder} />
        <Button type="button" variant="outline" onClick={add}>Add</Button>
      </div>
    </div>
  );
}

function NewJob() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const TOTAL = 6;

  // Step 1
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [workModes, setWorkModes] = useState<string[]>(["Hybrid"]);
  const [employment, setEmployment] = useState("Full-time");
  const [seniority, setSeniority] = useState("Mid");

  // Step 2
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [niceSkills, setNiceSkills] = useState<string[]>([]);
  const [years, setYears] = useState(3);
  const [education, setEducation] = useState("No requirement");
  const [languages, setLanguages] = useState<{ name: string; proficiency: string }[]>([]);
  const [langName, setLangName] = useState("");
  const [langProf, setLangProf] = useState("Fluent");

  // Step 3
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [noticePeriod, setNoticePeriod] = useState("Flexible");
  const [authz, setAuthz] = useState("EU citizen");

  // Step 4
  const [description, setDescription] = useState("");

  // Step 5
  const [batchSize, setBatchSize] = useState(8);
  const [prioritize, setPrioritize] = useState({
    recently_updated: true,
    verified: true,
    salary: false,
    location: true,
  });
  const [hardFilters, setHardFilters] = useState({ work_authorization: false, certification: "" });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/signin" });
    else if (userType === "candidate") nav({ to: "/dashboard" });
  }, [user, userType, loading, nav]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const { data } = await supabase.from("companies").select("id").eq("owner_id", user.id).maybeSingle();
      if (data) setCompanyId(data.id);
    })();
  }, [user]);

  function toggleMode(m: string) {
    setWorkModes(workModes.includes(m) ? workModes.filter((x) => x !== m) : [...workModes, m]);
  }

  function addLanguage() {
    if (!langName.trim()) return;
    setLanguages([...languages, { name: langName.trim(), proficiency: langProf }]);
    setLangName("");
  }

  function next() {
    if (step === 1 && !title) return toast.error("Job title is required.");
    if (step === 2 && requiredSkills.length === 0) return toast.error("Add at least one required skill.");
    setStep(Math.min(TOTAL, step + 1));
  }

  async function publish() {
    if (!companyId || !user) return;
    setSubmitting(true);
    const { data: job, error } = await supabase
      .from("jobs")
      .insert({
        company_id: companyId,
        created_by: user.id,
        title,
        department,
        location_city: city,
        location_country: country,
        work_modes: workModes,
        employment_type: employment,
        seniority,
        required_skills: requiredSkills,
        nice_skills: niceSkills,
        required_experience_years: years,
        required_education: education,
        required_languages: languages,
        salary_min: salaryMin ? parseInt(salaryMin) : null,
        salary_max: salaryMax ? parseInt(salaryMax) : null,
        currency,
        notice_period: noticePeriod,
        work_authorization: authz,
        description,
        batch_size: batchSize,
        prioritize,
        hard_filters: hardFilters,
        status: "active",
      })
      .select()
      .single();
    if (error || !job) {
      toast.error(error?.message ?? "Failed to publish");
      setSubmitting(false);
      return;
    }
    await logRecruiterAction(user.id, "job_created", { company_id: companyId, job_id: job.id });
    try {
      await generateBatchForJob(job.id);
      await logRecruiterAction(user.id, "batch_generated", { job_id: job.id, batch_number: 1 });
    } catch (e: any) {
      toast.error("Job published but match generation failed: " + (e?.message ?? "unknown"));
    }
    toast.success("Job posted. Generating your first batch.");
    nav({ to: "/r/jobs/$id", params: { id: job.id } });
  }

  return (
    <RecruiterShell>
      <div className="px-6 py-12 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight">Post a job</h1>
        <p className="text-sm text-muted-foreground mt-1">Define the role; we generate a candidate shortlist for review.</p>
        <div className="mt-6"><StepIndicator step={step} total={TOTAL} /></div>

        <div className="au-card p-8 mt-6 space-y-5">
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold">Role basics</h2>
              <div>
                <Label>Job title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" placeholder="Senior Product Manager" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <Input value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1.5" placeholder="Product" />
                </div>
                <div>
                  <Label>Employment type</Label>
                  <Select value={employment} onValueChange={setEmployment}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>{EMPLOYMENT_TYPES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1.5" placeholder="Munich" />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1.5" placeholder="Germany" />
                </div>
              </div>
              <div>
                <Label>Work mode</Label>
                <div className="flex gap-3 mt-2">
                  {["Remote", "Hybrid", "On-site"].map((m) => (
                    <label key={m} className="flex items-center gap-2 text-sm border border-border rounded-lg px-3 py-2 cursor-pointer">
                      <Checkbox checked={workModes.includes(m)} onCheckedChange={() => toggleMode(m)} />
                      {m}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label>Seniority</Label>
                <Select value={seniority} onValueChange={setSeniority}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{SENIORITY.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold">Requirements</h2>
              <div>
                <Label>Required skills</Label>
                <div className="mt-2"><TagInput value={requiredSkills} onChange={setRequiredSkills} placeholder="Add a skill and press Enter" /></div>
              </div>
              <div>
                <Label>Nice-to-have skills</Label>
                <div className="mt-2"><TagInput value={niceSkills} onChange={setNiceSkills} placeholder="Optional" /></div>
              </div>
              <div>
                <Label>Required years of experience: <span className="text-foreground font-medium">{years}</span></Label>
                <Slider value={[years]} min={0} max={15} step={1} onValueChange={(v) => setYears(v[0])} className="mt-3" />
              </div>
              <div>
                <Label>Required education</Label>
                <Select value={education} onValueChange={setEducation}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{EDUCATION.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Required languages</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {languages.map((l, i) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs">
                      {l.name} ({l.proficiency})
                      <button type="button" onClick={() => setLanguages(languages.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-foreground">×</button>
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Input className="col-span-1" value={langName} onChange={(e) => setLangName(e.target.value)} placeholder="German" />
                  <Select value={langProf} onValueChange={setLangProf}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{LANG_PROF.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                  <Button type="button" variant="outline" onClick={addLanguage}>Add</Button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold">Compensation and details</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Salary min</Label>
                  <Input type="number" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} className="mt-1.5" placeholder="60000" />
                </div>
                <div>
                  <Label>Salary max</Label>
                  <Input type="number" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} className="mt-1.5" placeholder="90000" />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>{["EUR", "GBP", "USD", "CHF", "SEK", "DKK", "PLN"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">Optional but recommended; helps candidates self-select.</p>
              <div>
                <Label>Acceptable notice period</Label>
                <Select value={noticePeriod} onValueChange={setNoticePeriod}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{NOTICE.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Work authorization required</Label>
                <Select value={authz} onValueChange={setAuthz}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{AUTHZ.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-lg font-semibold">Job description</h2>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={14} placeholder="Describe the role, the team, day-to-day, what success looks like…" />
              <div className="text-xs text-muted-foreground text-right">{description.length} characters</div>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-lg font-semibold">Matching preferences</h2>
              <div>
                <Label>Candidates per batch: <span className="text-foreground font-medium">{batchSize}</span></Label>
                <Slider value={[batchSize]} min={5} max={15} step={1} onValueChange={(v) => setBatchSize(v[0])} className="mt-3" />
              </div>
              <div>
                <Label>Prioritize</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { key: "recently_updated", label: "Recently updated profiles", hint: "Candidates active in the last 30 days." },
                    { key: "verified", label: "Verified credentials", hint: "ID, education or experience verified." },
                    { key: "salary", label: "Salary fit", hint: "Candidates whose expectations sit inside your range." },
                    { key: "location", label: "Location fit", hint: "Candidates already in or near the role city." },
                  ].map((p) => (
                    <label key={p.key} className="flex items-start gap-3 text-sm border border-border rounded-lg px-3 py-2.5">
                      <Checkbox checked={(prioritize as any)[p.key]} onCheckedChange={(v) => setPrioritize({ ...prioritize, [p.key]: !!v })} className="mt-0.5" />
                      <div>
                        <div className="font-medium">{p.label}</div>
                        <div className="text-xs text-muted-foreground">{p.hint}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label>Hard filters</Label>
                <p className="text-xs text-muted-foreground mt-1">Anything below is a non-negotiable filter, not a preference.</p>
                <label className="flex items-start gap-3 text-sm border border-border rounded-lg px-3 py-2.5 mt-2">
                  <Checkbox checked={hardFilters.work_authorization} onCheckedChange={(v) => setHardFilters({ ...hardFilters, work_authorization: !!v })} className="mt-0.5" />
                  <div>
                    <div className="font-medium">Strict work authorization</div>
                    <div className="text-xs text-muted-foreground">Only show candidates matching: {authz}.</div>
                  </div>
                </label>
                <div className="mt-2">
                  <Label className="text-xs">Required certification (optional)</Label>
                  <Input value={hardFilters.certification} onChange={(e) => setHardFilters({ ...hardFilters, certification: e.target.value })} className="mt-1.5" placeholder="e.g. CFA, AWS Certified Architect" />
                </div>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <h2 className="text-lg font-semibold">Review and publish</h2>
              <div className="space-y-4 text-sm">
                <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Role</div><div className="font-medium mt-1">{title || "—"} · {seniority} · {employment}</div><div className="text-muted-foreground">{[city, country].filter(Boolean).join(", ")} · {workModes.join(", ")}</div></div>
                <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Required</div><div className="mt-1">{requiredSkills.join(", ") || "—"}</div><div className="text-muted-foreground">{years}+ years · {education}</div></div>
                {niceSkills.length > 0 && <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Nice to have</div><div className="mt-1">{niceSkills.join(", ")}</div></div>}
                {languages.length > 0 && <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Languages</div><div className="mt-1">{languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}</div></div>}
                {(salaryMin || salaryMax) && <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Compensation</div><div className="mt-1">{currency} {salaryMin || "?"} – {salaryMax || "?"}</div></div>}
                <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Description</div><div className="mt-1 whitespace-pre-wrap text-muted-foreground">{description.slice(0, 280)}{description.length > 280 && "…"}</div></div>
                <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Matching</div><div className="mt-1">Batch size {batchSize} · Prioritize: {Object.entries(prioritize).filter(([, v]) => v).map(([k]) => k.replace("_", " ")).join(", ") || "none"}</div></div>
              </div>
            </>
          )}

          <div className="pt-4 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Back</Button>
            {step < TOTAL ? (
              <Button onClick={next}>Continue</Button>
            ) : (
              <Button onClick={publish} disabled={submitting}>{submitting ? "Publishing…" : "Publish job"}</Button>
            )}
          </div>
        </div>
      </div>
    </RecruiterShell>
  );
}
