import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import { RecruiterShell } from "@/components/recruiter-layout";
import { generateBatchForJob, logRecruiterAction } from "@/lib/recruiter-mocks";
import { VerifiedIcon, WarningIcon, ShieldIcon, ContactIcon, CloseIcon, InProgressIcon } from "@/components/icons";

export const Route = createFileRoute("/r/jobs/$id")({ component: JobDetail });

const DECLINE_REASONS = [
  "Missing required skill",
  "Wrong experience level",
  "Location issue",
  "Salary expectations mismatch",
  "Other",
];

type Match = any;
type Job = any;
type Batch = { id: string; batch_number: number; is_current: boolean; created_at: string };

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    active: "bg-success/15 text-success",
    paused: "bg-warning/15 text-warning",
    closed: "bg-muted text-muted-foreground",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full ${map[s] ?? "bg-muted text-muted-foreground"}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>;
}

function VerifBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-success bg-success/10 px-2 py-0.5 rounded-full">
      <ShieldIcon size={12} /> {label}
    </span>
  );
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-semibold tabular-nums">{score}%</div>
      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function ReasonRow({ kind, text }: { kind: "ok" | "warn"; text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      {kind === "ok" ? <VerifiedIcon size={16} accentDot={false} className="text-success mt-0.5 shrink-0" /> : <WarningIcon size={16} className="text-warning mt-0.5 shrink-0" />}
      <span className={kind === "ok" ? "text-foreground" : "text-foreground"}>{text}</span>
    </div>
  );
}

function CandidateCard({
  m,
  onView,
  onContact,
  onDecline,
}: {
  m: Match;
  onView: () => void;
  onContact: () => void;
  onDecline: () => void;
}) {
  const reasons: { kind: "ok" | "warn"; text: string }[] = (m.reasoning ?? []).slice(0, 3);
  const initials = (m.candidate_first_name?.[0] ?? "?") + (m.candidate_anon_id?.[0] ?? "");
  const verifs = [
    m.candidate_id_verified && "ID verified",
    m.candidate_education_verified && "Education verified",
    m.candidate_experience_verified && "Experience verified",
  ].filter(Boolean) as string[];

  const isContacted = m.status === "contacted";
  const isDeclined = m.status === "declined";

  return (
    <div className={`au-card p-5 ${isContacted ? "border-primary/30" : ""} ${isDeclined ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-foreground font-semibold text-sm shrink-0">
          {initials.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="font-semibold">
              {isContacted && m.candidate_full_name ? m.candidate_full_name : `${m.candidate_first_name} · ${m.candidate_anon_id}`}
            </div>
            {isContacted && <span className="text-[11px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">Contacted</span>}
            {isDeclined && <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Not a fit</span>}
          </div>
          <div className="text-sm text-muted-foreground mt-0.5">
            {m.candidate_current_role} at {m.candidate_current_company} · {m.candidate_years_experience} yrs · {m.candidate_location}
          </div>
          {verifs.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">{verifs.map((v) => <VerifBadge key={v} label={v} />)}</div>
          )}
        </div>
        <ScoreBar score={m.match_score} />
      </div>

      <div className="mt-4 space-y-1.5">
        {reasons.map((r, i) => <ReasonRow key={i} kind={r.kind} text={r.text} />)}
      </div>

      {!isDeclined && !isContacted && (
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={onView}>View full profile</Button>
          <Button size="sm" onClick={onContact}>Contact this candidate</Button>
          <Button size="sm" variant="ghost" className="text-muted-foreground ml-auto" onClick={onDecline}>Not a fit</Button>
        </div>
      )}
      {isContacted && (
        <div className="mt-5 text-xs text-muted-foreground flex items-center gap-2">
          <ContactIcon size={14} /> Outreach sent {m.contacted_at && new Date(m.contacted_at).toLocaleString()}
        </div>
      )}
      {isDeclined && (
        <div className="mt-5 text-xs text-muted-foreground">Reason: {m.decline_reason}{m.decline_note && ` — ${m.decline_note}`}</div>
      )}
    </div>
  );
}

function JobDetail() {
  const { id } = Route.useParams();
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [extraMatches, setExtraMatches] = useState<Match[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [profileMatch, setProfileMatch] = useState<Match | null>(null);
  const [contactMatch, setContactMatch] = useState<Match | null>(null);
  const [declineMatch, setDeclineMatch] = useState<Match | null>(null);
  const [regenOpen, setRegenOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/signin" });
    else if (userType === "candidate") nav({ to: "/dashboard" });
  }, [user, userType, loading, nav]);

  async function loadAll() {
    const { data: j } = await supabase.from("jobs").select("*").eq("id", id).maybeSingle();
    setJob(j);
    const { data: bs } = await supabase.from("batches").select("*").eq("job_id", id).order("batch_number", { ascending: false });
    setBatches((bs ?? []) as Batch[]);
    const current = (bs ?? []).find((b: any) => b.is_current);
    if (current) {
      const { data: ms } = await supabase.from("recruiter_matches").select("*").eq("batch_id", current.id).order("match_score", { ascending: false });
      setMatches(ms ?? []);
    } else {
      setMatches([]);
    }
  }

  useEffect(() => { if (user) loadAll(); }, [user, id]);

  const currentBatch = useMemo(() => batches.find((b) => b.is_current), [batches]);
  const previousBatches = useMemo(() => batches.filter((b) => !b.is_current), [batches]);

  async function handleRegenerate() {
    if (!user) return;
    setGenerating(true);
    setRegenOpen(false);
    try {
      await generateBatchForJob(id, { excludePrevious: true });
      await logRecruiterAction(user.id, "batch_regenerated", { job_id: id });
      await loadAll();
      setShowMore(false);
      setExtraMatches([]);
      toast.success("New batch generated.");
    } catch (e: any) {
      toast.error(e?.message ?? "Could not generate batch");
    } finally {
      setGenerating(false);
    }
  }

  async function loadMore() {
    if (!currentBatch) return;
    // Generate a separate "expansion" batch that doesn't replace current — use temporary batch
    setShowMore(true);
    if (extraMatches.length > 0) return;
    setGenerating(true);
    try {
      // Build temp matches from pool excluding shown ones
      const { data: shown } = await supabase.from("recruiter_matches").select("candidate_anon_id").eq("job_id", id);
      const shownIds = new Set((shown ?? []).map((s: any) => s.candidate_anon_id));
      const { CANDIDATE_POOL } = await import("@/lib/recruiter-mocks");
      const remaining = CANDIDATE_POOL.filter((c) => !shownIds.has(c.anon_id)).slice(0, 12);
      const synthetic = remaining.map((c) => ({
        id: `extra-${c.anon_id}`,
        candidate_anon_id: c.anon_id,
        candidate_first_name: c.first_name,
        candidate_full_name: c.full_name,
        candidate_current_role: c.current_role,
        candidate_current_company: c.current_company,
        candidate_years_experience: c.years,
        candidate_location: c.location,
        candidate_skills: c.skills,
        candidate_languages: c.languages,
        candidate_education: c.education,
        candidate_summary: c.summary,
        candidate_id_verified: c.id_verified,
        candidate_education_verified: c.education_verified,
        candidate_experience_verified: c.experience_verified,
        match_score: 60 + Math.floor(Math.random() * 25),
        score_skills: 60 + Math.floor(Math.random() * 30),
        score_experience: 60 + Math.floor(Math.random() * 30),
        score_location: 60 + Math.floor(Math.random() * 30),
        score_language: 70 + Math.floor(Math.random() * 25),
        reasoning: [
          { kind: "ok", text: `${c.years} years experience` },
          { kind: "ok", text: `Based in ${c.location}` },
          { kind: "warn", text: "Lower match against required skill set" },
        ],
        detailed_reasoning: [],
        status: "in_batch",
        ephemeral: true,
      }));
      setExtraMatches(synthetic);
      if (user) await logRecruiterAction(user.id, "show_more_clicked", { job_id: id });
    } finally {
      setGenerating(false);
    }
  }

  async function changeJobStatus(status: string) {
    if (!user) return;
    await supabase.from("jobs").update({ status }).eq("id", id);
    await logRecruiterAction(user.id, "job_status_changed", { job_id: id, status });
    setJob({ ...job, status });
  }

  async function handleViewProfile(m: Match) {
    setProfileMatch(m);
    if (user && !m.ephemeral) await logRecruiterAction(user.id, "profile_viewed", { job_id: id, match_id: m.id });
  }

  return (
    <RecruiterShell>
      <div className="px-6 py-10 max-w-6xl mx-auto">
        <Link to="/r/dashboard" className="text-xs text-muted-foreground hover:text-foreground">← Back to dashboard</Link>
        {!job ? (
          <div className="mt-8 text-sm text-muted-foreground">Loading job…</div>
        ) : (
          <>
            <div className="mt-3 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight">{job.title}</h1>
                  <StatusBadge s={job.status} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {[job.location_city, job.location_country].filter(Boolean).join(", ") || "Location TBD"} · {job.seniority} · {job.employment_type} · Posted {new Date(job.posted_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {job.status === "active" ? (
                  <Button size="sm" variant="outline" onClick={() => changeJobStatus("paused")}>Pause</Button>
                ) : job.status === "paused" ? (
                  <Button size="sm" variant="outline" onClick={() => changeJobStatus("active")}>Resume</Button>
                ) : null}
                {job.status !== "closed" && (
                  <Button size="sm" variant="outline" onClick={() => changeJobStatus("closed")}>Close</Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => toast.info("Share preview link copied (placeholder)")}>Share preview</Button>
              </div>
            </div>

            <Tabs defaultValue="batch" className="mt-8">
              <TabsList>
                <TabsTrigger value="batch">Current batch</TabsTrigger>
                <TabsTrigger value="previous">Previous batches</TabsTrigger>
                <TabsTrigger value="details">Job details</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="batch" className="mt-6">
                {generating && matches.length === 0 ? (
                  <div className="au-card p-10 text-center">
                    <InProgressIcon size={24} className="mx-auto text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">Generating your first batch of matches…</p>
                  </div>
                ) : matches.length === 0 ? (
                  <div className="au-card p-10 text-center text-sm text-muted-foreground">
                    No batch yet.
                    <div className="mt-4"><Button onClick={handleRegenerate}>Generate first batch</Button></div>
                  </div>
                ) : (
                  <>
                    <div className="text-xs text-muted-foreground mb-3">
                      Batch #{currentBatch?.batch_number} · {matches.length} candidates · Generated {currentBatch && new Date(currentBatch.created_at).toLocaleString()}
                    </div>
                    <div className="space-y-4">
                      {matches.map((m) => (
                        <CandidateCard
                          key={m.id}
                          m={m}
                          onView={() => handleViewProfile(m)}
                          onContact={() => setContactMatch(m)}
                          onDecline={() => setDeclineMatch(m)}
                        />
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-3 flex-wrap">
                      <Button variant="outline" onClick={() => setRegenOpen(true)} disabled={generating}>Request a new batch</Button>
                      <Button variant="ghost" onClick={loadMore} disabled={generating || showMore}>
                        {showMore ? "Showing more candidates" : "Show me more candidates"}
                      </Button>
                    </div>

                    {showMore && (
                      <div className="mt-8">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Additional candidates</div>
                        <div className="space-y-4">
                          {extraMatches.map((m) => (
                            <CandidateCard
                              key={m.id}
                              m={m}
                              onView={() => handleViewProfile(m)}
                              onContact={() => toast.info("Promote this candidate into the active batch to contact them.")}
                              onDecline={() => toast.info("Tracked. We will weight this signal for future batches.")}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="previous" className="mt-6 space-y-4">
                {previousBatches.length === 0 ? (
                  <div className="au-card p-8 text-center text-sm text-muted-foreground">No previous batches yet.</div>
                ) : (
                  previousBatches.map((b) => <PreviousBatchCard key={b.id} batch={b} jobId={id} />)
                )}
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <div className="au-card p-6 text-sm">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Required skills</div>
                      <div className="mt-2">{(job.required_skills ?? []).join(", ") || "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Nice to have</div>
                      <div className="mt-2">{(job.nice_skills ?? []).join(", ") || "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Experience</div>
                      <div className="mt-2">{job.required_experience_years}+ years</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Education</div>
                      <div className="mt-2">{job.required_education}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Compensation</div>
                      <div className="mt-2">{job.salary_min || job.salary_max ? `${job.currency} ${job.salary_min ?? "?"} – ${job.salary_max ?? "?"}` : "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Notice / Authorization</div>
                      <div className="mt-2">{job.notice_period} · {job.work_authorization}</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Description</div>
                    <div className="mt-2 whitespace-pre-wrap text-muted-foreground">{job.description || "—"}</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="au-card p-6 text-sm space-y-3">
                  <div><span className="text-muted-foreground">Batch size:</span> {job.batch_size}</div>
                  <div><span className="text-muted-foreground">Prioritize:</span> {Object.entries(job.prioritize ?? {}).filter(([, v]) => v).map(([k]) => k.replace("_", " ")).join(", ") || "none"}</div>
                  <div><span className="text-muted-foreground">Hard filters:</span> {Object.entries(job.hard_filters ?? {}).filter(([, v]) => v && v !== "").map(([k, v]) => `${k.replace("_", " ")}${typeof v === "string" ? `: ${v}` : ""}`).join(", ") || "none"}</div>
                  <p className="text-xs text-muted-foreground pt-2">Editing matching settings is coming soon. Use “Request a new batch” to adjust on the fly.</p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      {/* Profile slide-over */}
      <Sheet open={!!profileMatch} onOpenChange={(o) => !o && setProfileMatch(null)}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          {profileMatch && (
            <>
              <SheetHeader>
                <SheetTitle>
                  {profileMatch.status === "contacted" && profileMatch.candidate_full_name ? profileMatch.candidate_full_name : `${profileMatch.candidate_first_name} · ${profileMatch.candidate_anon_id}`}
                </SheetTitle>
                <SheetDescription>
                  {profileMatch.candidate_current_role} at {profileMatch.candidate_current_company}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-5 space-y-5 text-sm">
                <div className="flex items-center gap-3 flex-wrap">
                  <ScoreBar score={profileMatch.match_score} />
                  {profileMatch.candidate_id_verified && <VerifBadge label="ID verified" />}
                  {profileMatch.candidate_education_verified && <VerifBadge label="Education verified" />}
                  {profileMatch.candidate_experience_verified && <VerifBadge label="Experience verified" />}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Summary</div>
                  <p className="mt-1 text-muted-foreground">{profileMatch.candidate_summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Experience</div>
                    <div className="mt-1">{profileMatch.candidate_years_experience} years</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                    <div className="mt-1">{profileMatch.candidate_location}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Education</div>
                    <div className="mt-1">{profileMatch.candidate_education}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Skills</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(profileMatch.candidate_skills ?? []).map((s: string) => (
                        <span key={s} className="text-xs bg-secondary px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Languages</div>
                    <div className="mt-1">{(profileMatch.candidate_languages ?? []).map((l: any) => `${l.name} (${l.proficiency})`).join(", ")}</div>
                  </div>
                  {profileMatch.candidate_profile_updated_at && (
                    <div className="col-span-2 text-xs text-muted-foreground">
                      Profile last updated {new Date(profileMatch.candidate_profile_updated_at).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-5">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">AI matching reasoning</div>
                  <div className="mt-3 space-y-3">
                    {(profileMatch.detailed_reasoning ?? []).map((d: any, i: number) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{d.criterion}</span>
                          <span className="tabular-nums">{d.score}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-primary" style={{ width: `${d.score}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{d.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {!profileMatch.ephemeral && profileMatch.status !== "contacted" && profileMatch.status !== "declined" && (
                  <div className="border-t border-border pt-5 flex gap-2 flex-wrap">
                    <Button onClick={() => { setContactMatch(profileMatch); setProfileMatch(null); }}>Contact candidate</Button>
                    <Button variant="outline" onClick={() => { setDeclineMatch(profileMatch); setProfileMatch(null); }}>Not a fit</Button>
                    <Button
                      variant="ghost"
                      onClick={async () => {
                        await supabase.from("recruiter_matches").update({ saved: !profileMatch.saved }).eq("id", profileMatch.id);
                        if (user) await logRecruiterAction(user.id, "match_saved", { job_id: id, match_id: profileMatch.id });
                        toast.success(profileMatch.saved ? "Removed from saved" : "Saved for later");
                        loadAll();
                        setProfileMatch(null);
                      }}
                    >
                      {profileMatch.saved ? "Unsave" : "Save for later"}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Contact modal */}
      <ContactModal
        match={contactMatch}
        job={job}
        onClose={() => setContactMatch(null)}
        onSent={async (subject, body) => {
          if (!contactMatch || !user) return;
          await supabase
            .from("recruiter_matches")
            .update({ status: "contacted", contacted_at: new Date().toISOString(), contact_subject: subject, contact_body: body })
            .eq("id", contactMatch.id);
          await logRecruiterAction(user.id, "candidate_contacted", { job_id: id, match_id: contactMatch.id, subject });
          toast.success("Outreach sent. The candidate will be notified.");
          setContactMatch(null);
          loadAll();
        }}
      />

      {/* Decline modal */}
      <Dialog open={!!declineMatch} onOpenChange={(o) => !o && setDeclineMatch(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark as not a fit</DialogTitle>
            <DialogDescription>Help calibrate future matches. The candidate is not notified.</DialogDescription>
          </DialogHeader>
          {declineMatch && (
            <DeclineForm
              onCancel={() => setDeclineMatch(null)}
              onSubmit={async (reason, note) => {
                if (!user) return;
                await supabase
                  .from("recruiter_matches")
                  .update({ status: "declined", decline_reason: reason, decline_note: note })
                  .eq("id", declineMatch.id);
                await logRecruiterAction(user.id, "candidate_declined", { job_id: id, match_id: declineMatch.id, reason });
                toast.success("Feedback recorded.");
                setDeclineMatch(null);
                loadAll();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Regenerate modal */}
      <Dialog open={regenOpen} onOpenChange={setRegenOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request a new batch</DialogTitle>
            <DialogDescription>
              We will replace these candidates with a fresh batch. The current candidates remain available in Previous batches.
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>You can also adjust matching criteria first by editing the job. For now, generating a fresh batch will draw from the broader candidate pool, excluding those already shown.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegenOpen(false)}>Cancel</Button>
            <Button onClick={handleRegenerate}>Generate new batch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RecruiterShell>
  );
}

function PreviousBatchCard({ batch, jobId }: { batch: Batch; jobId: string }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Match[]>([]);
  useEffect(() => {
    if (!open) return;
    supabase.from("recruiter_matches").select("*").eq("batch_id", batch.id).then(({ data }) => setItems(data ?? []));
  }, [open, batch.id]);
  return (
    <div className="au-card p-5">
      <button className="w-full text-left flex items-center justify-between" onClick={() => setOpen(!open)}>
        <div>
          <div className="font-medium">Batch #{batch.batch_number}</div>
          <div className="text-xs text-muted-foreground">Generated {new Date(batch.created_at).toLocaleString()}</div>
        </div>
        <div className="text-xs text-muted-foreground">{open ? "Hide" : "View"}</div>
      </button>
      {open && (
        <div className="mt-4 divide-y divide-border">
          {items.map((m) => (
            <div key={m.id} className="py-3 flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">{m.candidate_first_name} · {m.candidate_anon_id}</div>
                <div className="text-xs text-muted-foreground">{m.candidate_current_role} · {m.candidate_location}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{m.match_score}%</span>
                <span className="text-xs">
                  {m.status === "contacted" ? "Contacted" : m.status === "declined" ? `Declined: ${m.decline_reason}` : "Reviewed"}
                </span>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="py-3 text-sm text-muted-foreground">No candidates.</div>}
        </div>
      )}
    </div>
  );
}

function ContactModal({
  match,
  job,
  onClose,
  onSent,
}: {
  match: Match | null;
  job: Job | null;
  onClose: () => void;
  onSent: (subject: string, body: string) => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (match && job) {
      setSubject(`A potential match for ${job.title} at your company`);
      setBody(
        `Hi ${match.candidate_first_name},\n\nYour background as ${match.candidate_current_role} caught our attention for our open ${job.title} role in ${job.location_city || "our team"}. Would you be open to a short intro call?\n\nBest,\nThe hiring team`,
      );
      setConfirmed(false);
    }
  }, [match, job]);

  if (!match) return null;

  return (
    <Dialog open={!!match} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Contact {match.candidate_first_name} · {match.candidate_anon_id}</DialogTitle>
          <DialogDescription>A final check before we share your message with the candidate.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-secondary/40 p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Matching reasoning</div>
            <div className="mt-2 space-y-1.5">
              {(match.reasoning ?? []).map((r: any, i: number) => <ReasonRow key={i} kind={r.kind} text={r.text} />)}
            </div>
            {(match.detailed_reasoning ?? []).length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {(match.detailed_reasoning ?? []).map((d: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-muted-foreground">{d.criterion}</span>
                    <span className="tabular-nums">{d.score}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="flex items-start gap-3 text-sm rounded-lg border border-border p-3">
            <Checkbox checked={confirmed} onCheckedChange={(v) => setConfirmed(!!v)} className="mt-0.5" />
            <span>I have reviewed this candidate's profile and the AI matching reasoning.</span>
          </label>

          <div>
            <Label>Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} className="mt-1.5" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button disabled={!confirmed || !subject || !body} onClick={() => onSent(subject, body)}>Send outreach</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeclineForm({ onSubmit, onCancel }: { onSubmit: (reason: string, note: string) => void; onCancel: () => void }) {
  const [reason, setReason] = useState(DECLINE_REASONS[0]);
  const [note, setNote] = useState("");
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {DECLINE_REASONS.map((r) => (
          <label key={r} className="flex items-center gap-3 text-sm border border-border rounded-lg px-3 py-2 cursor-pointer">
            <input type="radio" checked={reason === r} onChange={() => setReason(r)} className="accent-primary" />
            {r}
          </label>
        ))}
      </div>
      <div>
        <Label>Optional note</Label>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} className="mt-1.5" />
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSubmit(reason, note)}>Submit feedback</Button>
      </DialogFooter>
    </div>
  );
}
