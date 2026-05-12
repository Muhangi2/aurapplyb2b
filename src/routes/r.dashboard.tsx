import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { RecruiterShell } from "@/components/recruiter-layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowRightIcon, ShieldIcon, AIProcessingIcon, DocumentIcon } from "@/components/icons";

export const Route = createFileRoute("/r/dashboard")({ component: RecruiterDashboard });

type Job = {
  id: string;
  title: string;
  location_city: string | null;
  location_country: string | null;
  status: string;
  posted_at: string;
};

const TOUR_SLIDES = [
  { t: "Post a clear role.", d: "Define skills, must-haves, location, and seniority. The matching engine cares about specifics, not buzzwords." },
  { t: "Receive eight matched candidates.", d: "Within minutes. Each with full reasoning, criterion-by-criterion match strength, and verification status." },
  { t: "Review with confidence.", d: "Anonymous until you contact. Reasoning is always visible. Partial matches are flagged honestly." },
  { t: "Reject and resample, freely.", d: "Not a fit? Regenerate the batch with adjusted criteria. No quotas, no penalties." },
];

function StatusDot({ s }: { s: string }) {
  const map: Record<string, string> = { active: "bg-success", paused: "bg-warning", closed: "bg-muted-foreground/40" };
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${map[s] ?? "bg-muted-foreground/40"}`} />;
}

function RecruiterDashboard() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [profileName, setProfileName] = useState<string>("");
  const [stats, setStats] = useState({ pipeline: 0, contactedById: {} as Record<string, number>, deliveredById: {} as Record<string, number> });
  const [tourOpen, setTourOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/r/signin" });
    else if (userType === "candidate") nav({ to: "/dashboard" });
  }, [user, userType, loading, nav]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const [pRes, cRes] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
        supabase.from("companies").select("id,name").eq("owner_id", user.id).maybeSingle(),
      ]);
      setProfileName(pRes.data?.full_name ?? "");
      const company = cRes.data;
      if (!company) return;
      setCompanyName(company.name ?? "");

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id,title,location_city,location_country,status,posted_at")
        .eq("company_id", company.id)
        .order("posted_at", { ascending: false });
      const list = (jobsData ?? []) as Job[];
      setJobs(list);

      if (list.length) {
        const { data: rms } = await supabase
          .from("recruiter_matches")
          .select("job_id,status")
          .in("job_id", list.map((j) => j.id));
        const deliveredById: Record<string, number> = {};
        const contactedById: Record<string, number> = {};
        let pipeline = 0;
        (rms ?? []).forEach((m: any) => {
          deliveredById[m.job_id] = (deliveredById[m.job_id] ?? 0) + 1;
          if (m.status === "contacted") contactedById[m.job_id] = (contactedById[m.job_id] ?? 0) + 1;
          if (["delivered", "viewed", "contacted"].includes(m.status)) pipeline++;
        });
        setStats({ pipeline, deliveredById, contactedById });
      }
    })();
  }, [user]);

  const firstName = profileName?.split(" ")[0] ?? "";
  const activeJobs = jobs.filter((j) => j.status === "active");
  const hasJobs = jobs.length > 0;

  function dayssince(d: string) {
    return Math.max(0, Math.floor((Date.now() - new Date(d).getTime()) / 86_400_000));
  }

  return (
    <RecruiterShell>
      <div className="px-6 py-10 max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back{firstName ? `, ${firstName}` : ""}.</h1>
            <p className="mt-1 text-muted-foreground">
              {companyName || "Your team"} has {activeJobs.length} active role{activeJobs.length === 1 ? "" : "s"} and {stats.pipeline} candidate{stats.pipeline === 1 ? "" : "s"} in pipeline.
            </p>
          </div>
          {hasJobs && <Button onClick={() => nav({ to: "/r/jobs/new" })}>Post a new role</Button>}
        </div>

        {/* Focus block */}
        <div className="mt-8">
          {!hasJobs ? (
            <div className="au-card p-8">
              <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Get started</div>
              <h2 className="mt-2 text-xl font-semibold">Post your first role and get a shortlist in minutes.</h2>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
                Aurapply will return eight matched candidates with full reasoning. Anonymous until you decide to contact.
              </p>
              <div className="mt-6 flex items-center gap-5">
                <Button onClick={() => nav({ to: "/r/jobs/new" })}>Post a job</Button>
                <button onClick={() => { setSlide(0); setTourOpen(true); }} className="text-sm text-primary hover:underline">
                  Take a quick product tour
                </button>
              </div>
            </div>
          ) : (
            <div className="au-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Active roles</h2>
                <span className="text-xs text-muted-foreground">{activeJobs.length} of {jobs.length}</span>
              </div>
              <div className="mt-4 divide-y divide-border">
                {jobs.map((j) => (
                  <Link
                    key={j.id}
                    to="/r/jobs/$id"
                    params={{ id: j.id }}
                    className="grid grid-cols-12 gap-3 py-4 items-center hover:bg-secondary/40 -mx-2 px-2 rounded-lg group"
                  >
                    <div className="col-span-5 min-w-0">
                      <div className="flex items-center gap-2">
                        <StatusDot s={j.status} />
                        <span className="font-medium truncate">{j.title}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {[j.location_city, j.location_country].filter(Boolean).join(", ") || "Location TBD"}
                      </div>
                    </div>
                    <div className="col-span-2 text-sm text-center">
                      <div className="tabular-nums">{stats.deliveredById[j.id] ?? 0}</div>
                      <div className="text-[10px] text-muted-foreground">batches</div>
                    </div>
                    <div className="col-span-2 text-sm text-center">
                      <div className="tabular-nums">{stats.contactedById[j.id] ?? 0}</div>
                      <div className="text-[10px] text-muted-foreground">contacted</div>
                    </div>
                    <div className="col-span-2 text-sm text-center text-muted-foreground">
                      {dayssince(j.posted_at)}d ago
                    </div>
                    <div className="col-span-1 text-right">
                      <ArrowRightIcon size={16} className="text-muted-foreground inline group-hover:text-primary transition" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Secondary row */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="au-card p-5">
            <div className="text-sm font-medium">Pipeline summary</div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Matched</span>
                <span className="tabular-nums font-medium">{Object.values(stats.deliveredById).reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Contacted</span>
                <span className="tabular-nums font-medium">{Object.values(stats.contactedById).reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">In conversation</span>
                <span className="tabular-nums font-medium">—</span>
              </div>
            </div>
          </div>

          <div className="au-card p-5">
            <div className="text-sm font-medium flex items-center gap-2"><AIProcessingIcon size={16} className="text-muted-foreground" /> Team activity</div>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>You posted a role this week.</li>
              <li>1 teammate reviewed candidates today.</li>
              <li>2 candidates contacted in the last 7 days.</li>
            </ul>
            <Link to="/r/team" className="mt-3 inline-block text-xs text-primary hover:underline">View team →</Link>
          </div>

          <div className="au-card p-5">
            <div className="text-sm font-medium flex items-center gap-2"><ShieldIcon size={16} className="text-success" /> Compliance status</div>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Audit trail</span>
                <span className="text-success text-xs">Healthy</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">DPIA documentation</span>
                <span className="text-success text-xs">Up to date</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Bias testing</span>
                <span className="text-success text-xs">Quarterly</span>
              </li>
            </ul>
            <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              <DocumentIcon size={12} /> View compliance documentation
            </a>
          </div>
        </div>
      </div>

      <Dialog open={tourOpen} onOpenChange={setTourOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{TOUR_SLIDES[slide].t}</DialogTitle>
            <DialogDescription className="leading-relaxed pt-2">
              {TOUR_SLIDES[slide].d}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-1.5">
              {TOUR_SLIDES.map((_, i) => (
                <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === slide ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {slide > 0 && <Button variant="ghost" size="sm" onClick={() => setSlide(slide - 1)}>Back</Button>}
              {slide < TOUR_SLIDES.length - 1 ? (
                <Button size="sm" onClick={() => setSlide(slide + 1)}>Next</Button>
              ) : (
                <Button size="sm" onClick={() => { setTourOpen(false); nav({ to: "/r/jobs/new" }); }}>
                  Post a job
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </RecruiterShell>
  );
}
