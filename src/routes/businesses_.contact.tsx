import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { PageShell, pageContainer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/businesses_/contact")({
  head: () => ({
    meta: [
      { title: "Start a conversation — Appointed" },
      {
        name: "description",
        content: "Tell us briefly about your team. We will be in touch within one business day.",
      },
    ],
  }),
  component: BusinessesContact,
});

const ROLES = [
  "Head of Talent",
  "HR Lead",
  "Recruiter",
  "Hiring Manager",
  "Founder or Executive",
  "Other",
];
const COUNTRIES = [
  "Germany", "France", "Netherlands", "Spain", "Italy", "Sweden", "Denmark",
  "Poland", "Portugal", "Ireland", "Belgium", "Austria", "Finland", "Norway",
  "Czech Republic", "Switzerland", "United Kingdom", "Other",
];
const FREEMAIL = /@(gmail|yahoo|hotmail|outlook|icloud|proton(mail)?|gmx|web\.de|aol|me|live|mail|yandex)\./i;

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  work_email: z.string().trim().email("Enter a valid email").max(200),
  company_name: z.string().trim().min(1, "Required").max(150),
  role: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  roles_typically: z.string().trim().min(3, "Please add a few words").max(200),
  notes: z.string().trim().max(300).optional(),
});

type FormState = z.infer<typeof schema>;

const empty: FormState = {
  full_name: "", work_email: "", company_name: "", role: "", country: "",
  roles_typically: "", notes: "",
};

function Field({
  label, error, children, hint,
}: { label: string; error?: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ReassureLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-border pl-4">
      {children}
    </p>
  );
}

function BusinessesContact() {
  const nav = useNavigate();
  const [v, setV] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [busy, setBusy] = useState(false);

  function set<K extends keyof FormState>(k: K, val: FormState[K]) {
    setV((s) => ({ ...s, [k]: val }));
    setErrors((e) => ({ ...e, [k]: undefined }));
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
      company_size: "n/a",
      sector: "n/a",
      hires_per_year: "n/a",
      roles_typically: parsed.data.roles_typically,
      biggest_challenge: parsed.data.notes || null,
      heard_from: null,
      preferred_times: [],
    });
    setBusy(false);
    if (error) {
      toast.error("Could not send your message. Please try again.");
      return;
    }
    const first = parsed.data.full_name.split(" ")[0];
    nav({ to: "/businesses/contact/sent", search: { name: first } });
  }

  return (
    <PageShell>
      <section className={`${pageContainer} py-16 grid gap-12 md:grid-cols-[2fr_3fr] md:items-start`}>
        <div className="md:sticky md:top-28">
          <div className="text-[11px] font-semibold tracking-[0.22em] text-primary">GET IN TOUCH</div>
          <h1 className="au-page-title mt-3">
            Start a conversation.
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Tell us briefly about your team. We will be in touch within one business day.
          </p>
          <div className="mt-8 space-y-4">
            <ReassureLine>
              Your details stay in the EU and are used only for this conversation.
            </ReassureLine>
            <ReassureLine>We respond within one business day.</ReassureLine>
            <ReassureLine>Initial calls are 30 minutes.</ReassureLine>
          </div>
        </div>

        <form onSubmit={onSubmit} className="au-card-elevated p-7 md:p-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" error={errors.full_name}>
              <Input value={v.full_name} onChange={(e) => set("full_name", e.target.value)} />
            </Field>
            <Field label="Work email" error={errors.work_email}>
              <Input
                type="email"
                value={v.work_email}
                onChange={(e) => set("work_email", e.target.value)}
                placeholder="you@yourcompany.com"
              />
            </Field>
            <Field label="Company name" error={errors.company_name}>
              <Input value={v.company_name} onChange={(e) => set("company_name", e.target.value)} />
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

          <Field
            label="What roles are you hiring for?"
            error={errors.roles_typically}
            hint={`${v.roles_typically.length}/200`}
          >
            <Input
              maxLength={200}
              value={v.roles_typically}
              onChange={(e) => set("roles_typically", e.target.value)}
              placeholder="e.g. senior backend engineers and product managers in DACH"
            />
          </Field>

          <Field
            label="Anything else we should know? (optional)"
            error={errors.notes}
            hint={`${(v.notes ?? "").length}/300`}
          >
            <Textarea
              rows={3}
              maxLength={300}
              value={v.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
            />
          </Field>

          <div className="pt-2">
            <Button type="submit" size="lg" disabled={busy}>
              {busy ? "Sending..." : "Send"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              By submitting, you agree to our{" "}
              <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
                privacy notice
              </Link>.
            </p>
          </div>
        </form>
      </section>
    </PageShell>
  );
}
