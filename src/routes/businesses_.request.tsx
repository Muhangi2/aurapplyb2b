import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LockIcon, ScheduleIcon, ScaleIcon } from "@/components/icons";
import { toast } from "sonner";

export const Route = createFileRoute("/businesses_/request")({
  head: () => ({
    meta: [
      { title: "Request access — Aurapply for Recruiters" },
      {
        name: "description",
        content:
          "Submit a short request to join Aurapply. We respond within one business day.",
      },
    ],
  }),
  component: RequestAccess,
});

const ROLES = ["Head of Talent", "HR", "Recruiter", "Hiring Manager", "Founder or Executive", "Other"];
const COUNTRIES = [
  "Germany", "France", "Netherlands", "Spain", "Italy", "Sweden", "Denmark",
  "Poland", "Portugal", "Ireland", "Belgium", "Austria", "Finland", "Norway",
  "Czech Republic", "Switzerland", "United Kingdom", "Other",
];
const SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"];
const SECTORS = [
  "Technology", "Engineering", "Healthcare", "Pharmaceutical",
  "Financial Services", "Insurance", "Legal", "Logistics",
  "Manufacturing", "FMCG", "Other",
];
const HIRES = ["1-5", "6-15", "16-50", "51-100", "100+"];
const SOURCES = ["Search", "Referral", "Conference", "Direct outreach", "LinkedIn", "Other"];
const FREEMAIL = /@(gmail|yahoo|hotmail|outlook|icloud|proton(mail)?|gmx|web\.de|aol|me|live|mail|yandex)\./i;

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  work_email: z.string().trim().email("Enter a valid email").max(200),
  role: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  company_name: z.string().trim().min(1, "Required").max(150),
  company_size: z.string().min(1, "Required"),
  sector: z.string().min(1, "Required"),
  hires_per_year: z.string().min(1, "Required"),
  roles_typically: z.string().trim().min(3, "Please add a few words").max(200),
  biggest_challenge: z.string().trim().max(300).optional(),
  heard_from: z.string().optional(),
  preferred_times: z.array(z.string()).default([]),
});

type FormState = z.infer<typeof schema>;

const empty: FormState = {
  full_name: "", work_email: "", role: "", country: "",
  company_name: "", company_size: "", sector: "",
  hires_per_year: "", roles_typically: "",
  biggest_challenge: "", heard_from: "", preferred_times: [],
};

function Field({ label, error, children, hint }: { label: string; error?: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold tracking-[0.16em] text-primary uppercase pt-2">
      {children}
    </div>
  );
}

function ReassureLine({
  Icon, children,
}: { Icon: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon size={18} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed pt-1.5">{children}</p>
    </div>
  );
}

function RequestAccess() {
  const nav = useNavigate();
  const [v, setV] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [busy, setBusy] = useState(false);

  function set<K extends keyof FormState>(k: K, val: FormState[K]) {
    setV((s) => ({ ...s, [k]: val }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function toggleTime(t: string) {
    set(
      "preferred_times",
      v.preferred_times.includes(t)
        ? v.preferred_times.filter((x) => x !== t)
        : [...v.preferred_times, t],
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const parsed = schema.safeParse(v);
    if (!parsed.success) {
      const fe: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    if (FREEMAIL.test(parsed.data.work_email)) {
      setErrors({ work_email: "We work with corporate accounts; please use your work email." });
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("access_requests").insert({
      full_name: parsed.data.full_name,
      work_email: parsed.data.work_email,
      role: parsed.data.role,
      country: parsed.data.country,
      company_name: parsed.data.company_name,
      company_size: parsed.data.company_size,
      sector: parsed.data.sector,
      hires_per_year: parsed.data.hires_per_year,
      roles_typically: parsed.data.roles_typically,
      biggest_challenge: parsed.data.biggest_challenge || null,
      heard_from: parsed.data.heard_from || null,
      preferred_times: parsed.data.preferred_times,
    });
    setBusy(false);
    if (error) {
      toast.error("Could not submit your request. Please try again.");
      return;
    }
    const first = parsed.data.full_name.split(" ")[0];
    nav({ to: "/businesses/request/received", search: { name: first } });
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-[2fr_3fr] md:items-start">
        {/* LEFT */}
        <div className="md:sticky md:top-28">
          <div className="text-xs font-semibold tracking-[0.18em] text-primary">ACCESS REQUEST</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Tell us about your hiring.
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            A short form to help us understand whether Aurapply is a fit for your team. We respond
            within one business day.
          </p>
          <div className="mt-8 space-y-4">
            <ReassureLine Icon={LockIcon}>
              Your submission is stored in the EU and used only for qualification.
            </ReassureLine>
            <ReassureLine Icon={ScheduleIcon}>
              We respond within one business day.
            </ReassureLine>
            <ReassureLine Icon={ScaleIcon}>
              If we are not the right fit, we tell you and suggest alternatives.
            </ReassureLine>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <form onSubmit={onSubmit} className="au-card-elevated p-7 md:p-8 space-y-6">
          <GroupTitle>About you</GroupTitle>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" error={errors.full_name}>
              <Input value={v.full_name} onChange={(e) => set("full_name", e.target.value)} placeholder="Anna Schmidt" />
            </Field>
            <Field label="Work email" error={errors.work_email}>
              <Input type="email" value={v.work_email} onChange={(e) => set("work_email", e.target.value)} placeholder="anna@yourcompany.com" />
            </Field>
            <Field label="Role" error={errors.role}>
              <Select value={v.role} onValueChange={(x) => set("role", x)}>
                <SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger>
                <SelectContent>{ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Country" error={errors.country}>
              <Select value={v.country} onValueChange={(x) => set("country", x)}>
                <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>{COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
          </div>

          <GroupTitle>About your company</GroupTitle>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Company name" error={errors.company_name}>
              <Input value={v.company_name} onChange={(e) => set("company_name", e.target.value)} />
            </Field>
            <Field label="Company size" error={errors.company_size}>
              <Select value={v.company_size} onValueChange={(x) => set("company_size", x)}>
                <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                <SelectContent>{SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Primary sector" error={errors.sector}>
              <Select value={v.sector} onValueChange={(x) => set("sector", x)}>
                <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                <SelectContent>{SECTORS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
          </div>

          <GroupTitle>About your hiring</GroupTitle>
          <div className="space-y-5">
            <Field label="How many people do you hire per year?" error={errors.hires_per_year}>
              <Select value={v.hires_per_year} onValueChange={(x) => set("hires_per_year", x)}>
                <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                <SelectContent>{HIRES.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field
              label="What roles do you typically hire for?"
              error={errors.roles_typically}
              hint={`${v.roles_typically.length}/200`}
            >
              <Input
                maxLength={200}
                value={v.roles_typically}
                onChange={(e) => set("roles_typically", e.target.value)}
                placeholder="e.g. backend engineers, product managers, sales reps in DACH"
              />
            </Field>
            <Field
              label="What is your biggest hiring challenge right now? (optional)"
              error={errors.biggest_challenge}
              hint={`${(v.biggest_challenge ?? "").length}/300`}
            >
              <Textarea
                rows={3}
                maxLength={300}
                value={v.biggest_challenge ?? ""}
                onChange={(e) => set("biggest_challenge", e.target.value)}
                placeholder="e.g. finding senior talent in a specific stack, sourcing in multiple EU countries, compliance with hiring regulations"
              />
            </Field>
          </div>

          <GroupTitle>Logistics</GroupTitle>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="How did you hear about Aurapply? (optional)">
              <Select value={v.heard_from ?? ""} onValueChange={(x) => set("heard_from", x)}>
                <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                <SelectContent>{SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <div className="space-y-2">
              <Label className="text-sm">Preferred call times (optional)</Label>
              <div className="space-y-2 pt-1">
                {["Morning CET", "Afternoon CET", "Flexible"].map((t) => (
                  <label key={t} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={v.preferred_times.includes(t)}
                      onCheckedChange={() => toggleTime(t)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" size="lg" disabled={busy} className="w-full md:w-auto">
              {busy ? "Submitting..." : "Submit request"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              By submitting, you agree to our{" "}
              <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">privacy notice</Link>.
              We will respond by email within one business day.
            </p>
          </div>
        </form>
      </section>
    </PageShell>
  );
}
