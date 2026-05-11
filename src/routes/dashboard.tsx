import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import { computeCompleteness, seedMatchesIfEmpty } from "@/lib/mock-matches";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const STATUS_LABELS: Record<string, { text: string; tone: string }> = {
  viewing: { text: "Recruiter viewing your profile", tone: "text-primary bg-primary/10" },
  reached_out: { text: "Recruiter reached out", tone: "text-success bg-success/10" },
  expired: { text: "Match expired", tone: "text-muted-foreground bg-muted" },
};

function Dashboard() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [completeness, setCompleteness] = useState(0);
  const [verifyOpen, setVerifyOpen] = useState(false);

  useEffect(() => { if (!loading && !user) nav({ to: "/signin" }); }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      await seedMatchesIfEmpty(user.id);
      const [p, m, exp, edu, sk, lg] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("matches").select("*").eq("user_id", user.id).eq("declined", false).order("matched_at", { ascending: false }),
        supabase.from("experiences").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("education").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("skills").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("languages").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setProfile(p.data);
      setMatches(m.data || []);
      setCompleteness(
        computeCompleteness({
          ...p.data,
          experiences_count: exp.count || 0,
          education_count: edu.count || 0,
          skills_count: sk.count || 0,
          languages_count: lg.count || 0,
        })
      );
    })();
  }, [user]);

  if (!user) return null;

  return (
    <PageShell>
      <div className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}.</h1>
          <p className="mt-1 text-muted-foreground">Your matching activity at a glance.</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {/* Completeness */}
              <div className="au-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Profile completeness</div>
                    <div className="mt-1 text-3xl font-semibold">{completeness}%</div>
                  </div>
                  {completeness < 100 && (
                    <Button onClick={() => nav({ to: "/profile" })} variant="outline">Complete your profile</Button>
                  )}
                </div>
                <Progress value={completeness} className="mt-4" />
              </div>

              {/* Verification */}
              <div className="au-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Verification</h2>
                  <span className="text-xs text-muted-foreground">Verified profiles get more matches</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    { k: "Email", v: profile?.email_verified },
                    { k: "Identity", v: profile?.id_verified },
                    { k: "Education", v: profile?.education_verified },
                    { k: "Experience", v: profile?.experience_verified },
                  ].map((it) => (
                    <div key={it.k} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                      <div className="flex items-center gap-2 text-sm">
                        {it.v ? <Check className="h-4 w-4 text-success" /> : <AlertCircle className="h-4 w-4 text-muted-foreground" />}
                        <span>{it.k}</span>
                        <span className={`text-xs ${it.v ? "text-success" : "text-muted-foreground"}`}>{it.v ? "verified" : "not verified"}</span>
                      </div>
                      {!it.v && <Button size="sm" variant="ghost" onClick={() => setVerifyOpen(true)}>Verify</Button>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Matches */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent matches</h2>
                  <span className="text-sm text-muted-foreground">{matches.length} active</span>
                </div>
                <div className="grid gap-3">
                  {matches.map((m) => {
                    const s = STATUS_LABELS[m.status] || STATUS_LABELS.viewing;
                    return (
                      <Link key={m.id} to="/matches/$id" params={{ id: m.id }} className="au-card p-5 hover:border-primary/40 transition group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{m.company}</span>
                              <span className={`rounded-full px-2 py-0.5 text-xs ${s.tone}`}>{s.text}</span>
                            </div>
                            <div className="mt-1 text-foreground">{m.role}</div>
                            <div className="mt-0.5 text-sm text-muted-foreground">{m.location} • {new Date(m.matched_at).toLocaleDateString()}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-2xl font-semibold tabular-nums">{m.match_score}%</div>
                            <div className="mt-1 h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${m.match_score}%` }} />
                            </div>
                            <div className="mt-2 text-xs text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                              View <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="au-card p-5">
                <div className="text-sm text-muted-foreground">Profile snapshot</div>
                <div className="mt-2 font-semibold">{profile?.full_name || "—"}</div>
                <div className="text-sm text-muted-foreground">{profile?.current_title || "—"}</div>
                <div className="text-sm text-muted-foreground">{[profile?.city, profile?.country].filter(Boolean).join(", ") || "—"}</div>
                <div className="mt-4 grid gap-2 text-sm">
                  <Link className="text-primary hover:underline" to="/profile">Edit profile</Link>
                  <Link className="text-primary hover:underline" to="/privacy">Manage consents</Link>
                  <Link className="text-primary hover:underline" to="/settings">Settings</Link>
                </div>
              </div>

              <div className="au-card p-5">
                <div className="text-sm font-medium mb-3">Recent activity</div>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3"><ShieldCheck className="h-4 w-4 text-primary mt-0.5" /><span>Your profile was matched to {Math.min(3, matches.length)} new roles this week.</span></li>
                  <li className="flex gap-3"><ShieldCheck className="h-4 w-4 text-primary mt-0.5" /><span>A recruiter at Personio viewed your profile.</span></li>
                  <li className="flex gap-3"><ShieldCheck className="h-4 w-4 text-primary mt-0.5" /><span>Update your skills to improve match quality.</span></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification coming soon</DialogTitle>
            <DialogDescription>
              We are integrating identity, education and experience verification with EU providers. You will be notified when this is available.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setVerifyOpen(false)}>Got it</Button>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
