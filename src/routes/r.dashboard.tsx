import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { RecruiterShell } from "@/components/recruiter-layout";
import { Briefcase, Users, MessageSquare, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/r/dashboard")({ component: RecruiterDashboard });

type Job = {
  id: string;
  title: string;
  location_city: string | null;
  location_country: string | null;
  status: string;
  posted_at: string;
};

function StatCard({ icon: Icon, label, value, hint }: { icon: any; label: string; value: string; hint?: string }) {
  return (
    <div className="au-card p-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="h-4 w-4" /> {label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    active: "bg-success/15 text-success",
    paused: "bg-warning/15 text-warning",
    closed: "bg-muted text-muted-foreground",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full ${map[s] ?? "bg-muted text-muted-foreground"}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>;
}

function RecruiterDashboard() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState({ active: 0, matches: 0, contacted: 0, contactedById: {} as Record<string, number>, declinedById: {} as Record<string, number>, deliveredById: {} as Record<string, number> });
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/signin" });
    else if (userType === "candidate") nav({ to: "/dashboard" });
  }, [user, userType, loading, nav]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const { data: company } = await supabase.from("companies").select("id").eq("owner_id", user.id).maybeSingle();
      if (!company) return;
      setCompanyId(company.id);
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id,title,location_city,location_country,status,posted_at")
        .eq("company_id", company.id)
        .order("posted_at", { ascending: false });
      setJobs((jobsData ?? []) as Job[]);

      const { data: rms } = await supabase
        .from("recruiter_matches")
        .select("job_id,status")
        .in("job_id", (jobsData ?? []).map((j) => j.id));
      const deliveredById: Record<string, number> = {};
      const contactedById: Record<string, number> = {};
      const declinedById: Record<string, number> = {};
      let matches = 0;
      let contacted = 0;
      (rms ?? []).forEach((m: any) => {
        deliveredById[m.job_id] = (deliveredById[m.job_id] ?? 0) + 1;
        matches++;
        if (m.status === "contacted") {
          contactedById[m.job_id] = (contactedById[m.job_id] ?? 0) + 1;
          contacted++;
        }
        if (m.status === "declined") {
          declinedById[m.job_id] = (declinedById[m.job_id] ?? 0) + 1;
        }
      });
      setStats({
        active: (jobsData ?? []).filter((j) => j.status === "active").length,
        matches,
        contacted,
        deliveredById,
        contactedById,
        declinedById,
      });
    })();
  }, [user]);

  return (
    <RecruiterShell>
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Recruiter dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Your active hiring at a glance.</p>
          </div>
          <Button onClick={() => nav({ to: "/r/jobs/new" })}>Post a job</Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard icon={Briefcase} label="Active job postings" value={String(stats.active)} />
          <StatCard icon={Users} label="Matches this month" value={String(stats.matches)} />
          <StatCard icon={MessageSquare} label="Candidates contacted" value={String(stats.contacted)} />
          <StatCard icon={BarChart3} label="Response rate" value="38%" hint="Trailing 30 days" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 au-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Active job postings</h2>
              <Button size="sm" variant="ghost" onClick={() => nav({ to: "/r/jobs/new" })}>New job</Button>
            </div>

            {jobs.length === 0 ? (
              <div className="mt-6 border border-dashed border-border rounded-xl p-10 text-center">
                <p className="text-sm text-muted-foreground">No job postings yet.</p>
                <Button className="mt-4" onClick={() => nav({ to: "/r/jobs/new" })}>Post your first job</Button>
              </div>
            ) : (
              <div className="mt-4 divide-y divide-border">
                {jobs.map((j) => (
                  <Link
                    key={j.id}
                    to="/r/jobs/$id"
                    params={{ id: j.id }}
                    className="grid grid-cols-12 gap-3 py-4 items-center hover:bg-secondary/40 -mx-2 px-2 rounded-lg"
                  >
                    <div className="col-span-5">
                      <div className="font-medium">{j.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {[j.location_city, j.location_country].filter(Boolean).join(", ") || "Location TBD"} · Posted {new Date(j.posted_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="col-span-2"><StatusBadge s={j.status} /></div>
                    <div className="col-span-1 text-sm text-center">{stats.deliveredById[j.id] ?? 0}<div className="text-[10px] text-muted-foreground">matched</div></div>
                    <div className="col-span-2 text-sm text-center">{stats.contactedById[j.id] ?? 0}<div className="text-[10px] text-muted-foreground">contacted</div></div>
                    <div className="col-span-2 text-sm text-center">{stats.declinedById[j.id] ?? 0}<div className="text-[10px] text-muted-foreground">declined</div></div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="au-card p-6">
              <h3 className="font-semibold">Recent activity</h3>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="text-muted-foreground">8 new candidates matched to <span className="text-foreground">Senior Product Manager</span>.</li>
                <li className="text-muted-foreground">A candidate at Personio accepted your outreach.</li>
                <li className="text-muted-foreground">Your job posting <span className="text-foreground">Senior Engineer</span> is expiring in 3 days.</li>
              </ul>
            </div>
            <div className="au-card p-6">
              <h3 className="font-semibold">Quick links</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/r/team" className="text-primary hover:underline">Team management</Link></li>
                <li><Link to="/r/billing" className="text-primary hover:underline">Billing</Link></li>
                <li><Link to="/r/company" className="text-primary hover:underline">Company profile</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </RecruiterShell>
  );
}
