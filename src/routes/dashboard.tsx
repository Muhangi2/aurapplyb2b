import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ShieldCheck, ArrowRight, Activity } from "lucide-react";
import { computeCompleteness, seedMatchesIfEmpty } from "@/lib/mock-matches";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const STATUS_LABELS: Record<string, { text: string; tone: string }> = {
  viewing: { text: "Recruiter viewing your profile", tone: "text-primary bg-primary/10" },
  reached_out: { text: "Recruiter reached out", tone: "text-success bg-success/10" },
  expired: { text: "Match expired", tone: "text-muted-foreground bg-muted" },
};

function ImpactItem({ title, hint, href }: { title: string; hint: string; href: string }) {
  return (
    <Link
      to={href as any}
      className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border hover:border-primary/40 transition group"
    >
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>
      </div>
      <span className="text-xs text-primary inline-flex items-center gap-1 self-center">
        Complete now <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function Dashboard() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [completeness, setCompleteness] = useState(0);
  const [counts, setCounts] = useState({ exp: 0, edu: 0, sk: 0, lg: 0 });

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/signin" });
    else if (userType === "recruiter") nav({ to: "/r/dashboard" });
  }, [user, userType, loading, nav]);

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
      const c = { exp: exp.count || 0, edu: edu.count || 0, sk: sk.count || 0, lg: lg.count || 0 };
      setCounts(c);
      setCompleteness(
        computeCompleteness({
          ...p.data,
          experiences_count: c.exp,
          education_count: c.edu,
          skills_count: c.sk,
          languages_count: c.lg,
        })
      );
    })();
  }, [user]);

  if (!user) return null;

  const firstName = profile?.full_name?.split(" ")[0] ?? "";
  const activeMatches = matches.length;
  const profileIncomplete = completeness < 70;

  // Build impact items based on what's missing
  const impactItems: { title: string; hint: string; href: string }[] = [];
  if (!profile?.id_verified) impactItems.push({ title: "Add verified identity", hint: "Improves match quality by ~20%", href: "/profile" });
  if (counts.exp === 0) impactItems.push({ title: "Add your last role", hint: "Improves match quality by ~15%", href: "/profile" });
  if (!profile?.education_verified) impactItems.push({ title: "Verify your education", hint: "Recruiters trust verified profiles 3x more", href: "/profile" });
  if (counts.sk < 3) impactItems.push({ title: "Add at least 3 skills", hint: "Skills are how the matching engine finds you", href: "/profile" });
  if (counts.lg === 0) impactItems.push({ title: "Add your languages", hint: "Required for language-sensitive roles", href: "/profile" });
  const top3 = impactItems.slice(0, 3);

  return (
    <PageShell>
      <div className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Greeting */}
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back{firstName ? `, ${firstName}` : ""}.</h1>
          <p className="mt-1 text-muted-foreground">
            You have {activeMatches} active match{activeMatches === 1 ? "" : "es"} and your profile is {completeness}% complete.
          </p>

          {/* Focus block */}
          <div className="mt-8">
            {profileIncomplete ? (
              <div className="au-card p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Next step</div>
                    <h2 className="mt-2 text-xl font-semibold">Finish your profile to start matching well.</h2>
                    <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
                      A complete, verified profile gets prioritized in recruiter shortlists. Three quick wins below.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-3xl font-semibold tabular-nums">{completeness}%</div>
                    <div className="text-xs text-muted-foreground">complete</div>
                  </div>
                </div>
                <Progress value={completeness} className="mt-5" />
                <div className="mt-6 grid gap-3">
                  {top3.length === 0 ? (
                    <div className="text-sm text-muted-foreground">You are nearly there. Open your profile to finish the remaining details.</div>
                  ) : (
                    top3.map((it) => <ImpactItem key={it.title} {...it} />)
                  )}
                </div>
              </div>
            ) : activeMatches === 0 ? (
              <div className="au-card p-8 text-center">
                <div className="mx-auto h-10 w-10 grid place-items-center rounded-full bg-primary/10">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold">Your profile is live.</h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  We are matching it against new roles as they are posted. You will get an email and a dashboard notification the moment your first match comes in.
                </p>
                <div className="mt-6 flex items-center justify-center gap-5">
                  <Button asChild variant="outline"><Link to="/profile">Refine your preferences</Link></Button>
                  <Link to="/profile" className="text-sm text-primary hover:underline">Strengthen your profile</Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your most recent matches</h2>
                  <span className="text-sm text-muted-foreground">{activeMatches} active</span>
                </div>
                <div className="grid gap-3">
                  {matches.slice(0, 5).map((m) => {
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
                            <div className="mt-0.5 text-sm text-muted-foreground">{m.location} · {new Date(m.matched_at).toLocaleDateString()}</div>
                            <div className="mt-2 text-sm text-muted-foreground line-clamp-1">{m.reasoning?.[0]}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-2xl font-semibold tabular-nums">{m.match_score}%</div>
                            <div className="mt-1 h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${m.match_score}%` }} />
                            </div>
                            <div className="mt-2 text-xs text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                              View match <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {matches.length > 5 && (
                  <div className="mt-4">
                    <Link to="/profile" className="text-sm text-primary hover:underline">See all matches →</Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Secondary row */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="au-card p-5">
              <div className="text-sm font-medium">Verification status</div>
              <div className="mt-3 space-y-2 text-sm">
                {[
                  { k: "Email", v: profile?.email_verified },
                  { k: "Identity", v: profile?.id_verified },
                  { k: "Education", v: profile?.education_verified },
                  { k: "Experience", v: profile?.experience_verified },
                ].map((it) => (
                  <div key={it.k} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Check className={`h-3.5 w-3.5 ${it.v ? "text-success" : "text-muted-foreground/40"}`} />
                      {it.k}
                    </span>
                    {!it.v && <Link to="/profile" className="text-xs text-primary hover:underline">Complete</Link>}
                  </div>
                ))}
              </div>
            </div>

            <div className="au-card p-5">
              <div className="text-sm font-medium flex items-center gap-2"><Activity className="h-4 w-4 text-muted-foreground" /> Recent activity</div>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                <li>Profile matched to {Math.min(3, activeMatches)} new roles this week.</li>
                <li>A recruiter viewed your profile.</li>
                <li>Your skills were updated.</li>
              </ul>
            </div>

            <div className="au-card p-5">
              <div className="text-sm font-medium flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-muted-foreground" /> Tips to improve matching</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {completeness < 100
                  ? "Adding 5+ skills and 1 verified credential typically improves match quality by 25–40%."
                  : "Keep your preferences current. Updated preferences in the last 30 days perform best."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
