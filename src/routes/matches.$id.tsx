import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/matches/$id")({ component: MatchDetail });

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}%</span></div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function MatchDetail() {
  const { id } = Route.useParams();
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [m, setM] = useState<any>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => { if (!loading && !user) nav({ to: "/signin" }); }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    supabase.from("matches").select("*").eq("id", id).maybeSingle().then(({ data }) => setM(data));
  }, [user, id]);

  if (!m) return <PageShell><div className="px-6 py-20 text-center text-muted-foreground">Loading…</div></PageShell>;

  async function decline() {
    await supabase.from("matches").update({ declined: true }).eq("id", id);
    toast.success("Match declined.");
    nav({ to: "/dashboard" });
  }
  async function save() {
    await supabase.from("matches").update({ saved: !m.saved }).eq("id", id);
    setM({ ...m, saved: !m.saved });
    toast.success(m.saved ? "Removed from saved." : "Saved for later.");
  }
  async function submitReview() {
    setReviewOpen(false);
    setReviewText("");
    toast.success("Human review request submitted.");
  }

  return (
    <PageShell>
      <div className="px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to dashboard</Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="au-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">{m.company}</div>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">{m.role}</h1>
                    <div className="mt-1 text-sm text-muted-foreground">{m.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-semibold tabular-nums">{m.match_score}%</div>
                    <div className="text-xs text-muted-foreground">match strength</div>
                  </div>
                </div>
              </div>

              {m.status === "reached_out" && m.recruiter_email && (
                <div className="au-card p-6 border-primary/30">
                  <div className="flex items-center gap-2 text-primary"><Mail className="h-4 w-4" /><span className="font-medium">Recruiter reached out</span></div>
                  <div className="mt-3 text-sm">
                    <div><span className="text-muted-foreground">From:</span> {m.recruiter_name} &lt;{m.recruiter_email}&gt;</div>
                    <p className="mt-3 leading-relaxed">{m.recruiter_message}</p>
                  </div>
                  <Button className="mt-4" onClick={() => (window.location.href = `mailto:${m.recruiter_email}`)}>Reply</Button>
                </div>
              )}

              <div className="au-card p-6">
                <h2 className="font-semibold">About this role</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{m.description}</p>
              </div>

              <div className="au-card p-6">
                <h2 className="font-semibold">Why you were matched</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {(m.reasoning || []).map((r: string, i: number) => (
                    <li key={i} className="flex gap-2"><span className="text-primary mt-1">•</span><span>{r}</span></li>
                  ))}
                </ul>
              </div>

              <div className="au-card p-6 space-y-4">
                <h2 className="font-semibold">Score breakdown</h2>
                <ScoreBar label="Skills" value={m.score_skills || 0} />
                <ScoreBar label="Experience" value={m.score_experience || 0} />
                <ScoreBar label="Location" value={m.score_location || 0} />
                <ScoreBar label="Language" value={m.score_language || 0} />
              </div>
            </div>

            <aside className="space-y-3">
              <Button className="w-full" variant="outline" onClick={save}>{m.saved ? "Saved" : "Save for later"}</Button>
              <Button className="w-full" variant="outline" onClick={decline}>Decline this match</Button>
              <Button className="w-full" variant="ghost" onClick={() => setReviewOpen(true)}>Request human review</Button>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Under Article 22 of the GDPR you have the right to contest a decision based solely on automated processing.
              </p>
            </aside>
          </div>
        </div>
      </div>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request human review</DialogTitle>
            <DialogDescription>
              You can contest this AI-generated match. A member of our team will review the decision and respond within 14 days, in line with Article 22 of the GDPR.
            </DialogDescription>
          </DialogHeader>
          <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={5} placeholder="Tell us why you think this match is incorrect or should be reviewed." />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReviewOpen(false)}>Cancel</Button>
            <Button onClick={submitReview} disabled={!reviewText.trim()}>Submit request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
