import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { RecruiterShell } from "@/components/recruiter-layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/r/candidates")({ component: CandidatesPipeline });

function CandidatesPipeline() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [jobs, setJobs] = useState<any[]>([]);

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
      const { data: js } = await supabase.from("jobs").select("id,title").eq("company_id", company.id);
      setJobs(js ?? []);
      const { data: ms } = await supabase
        .from("recruiter_matches")
        .select("*, jobs!inner(id,title,company_id)")
        .eq("jobs.company_id", company.id)
        .in("status", ["contacted", "declined", "saved"])
        .order("contacted_at", { ascending: false, nullsFirst: false });
      setRows(ms ?? []);
    })();
  }, [user]);

  const filtered = rows.filter((r) => (statusFilter === "all" || r.status === statusFilter) && (jobFilter === "all" || r.job_id === jobFilter));

  return (
    <RecruiterShell>
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight">Candidates pipeline</h1>
        <p className="text-sm text-muted-foreground mt-1">Everyone you have engaged with, across all jobs.</p>

        <div className="mt-6 flex gap-3 flex-wrap">
          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-60"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All jobs</SelectItem>
              {jobs.map((j) => <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
              <SelectItem value="saved">Saved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="au-card mt-6 divide-y divide-border">
          {filtered.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No candidates yet.</div>}
          {filtered.map((m) => (
            <div key={m.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">
                  {m.status === "contacted" && m.candidate_full_name ? m.candidate_full_name : `${m.candidate_first_name} · ${m.candidate_anon_id}`}
                </div>
                <div className="text-xs text-muted-foreground">{m.candidate_current_role} · {m.candidate_location} · {m.jobs?.title}</div>
              </div>
              <div className="text-xs text-muted-foreground">
                {m.status === "contacted" ? `Contacted ${m.contacted_at ? new Date(m.contacted_at).toLocaleDateString() : ""}` : m.status === "declined" ? `Declined: ${m.decline_reason}` : "Saved"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RecruiterShell>
  );
}
