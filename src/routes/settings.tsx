import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: Settings });

function Settings() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [freq, setFreq] = useState("weekly");
  const [emailMatches, setEmailMatches] = useState(true);
  const [emailRecruiters, setEmailRecruiters] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  useEffect(() => { if (!loading && !user) nav({ to: "/signin" }); }, [user, loading, nav]);
  useEffect(() => { if (user) setEmail(user.email || ""); }, [user]);

  async function changeEmail() {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) return toast.error(error.message);
    toast.success("Confirmation email sent.");
  }
  async function changePassword() {
    if (pw.length < 8) return toast.error("Min 8 characters.");
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return toast.error(error.message);
    setPw(""); toast.success("Password updated.");
  }

  if (!user) return null;

  return (
    <PageShell>
      <div className="px-6 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

          <div className="au-card p-6 mt-6 space-y-4">
            <h2 className="font-semibold">Account</h2>
            <div>
              <Label>Email</Label>
              <div className="mt-1.5 flex gap-2">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                <Button onClick={changeEmail} variant="outline">Update</Button>
              </div>
            </div>
            <div>
              <Label>New password</Label>
              <div className="mt-1.5 flex gap-2">
                <Input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="Min. 8 characters" />
                <Button onClick={changePassword} variant="outline">Change</Button>
              </div>
            </div>
          </div>

          <div className="au-card p-6 mt-6 space-y-4">
            <h2 className="font-semibold">Notifications</h2>
            <div>
              <Label>Email frequency</Label>
              <Select value={freq} onValueChange={setFreq}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly digest</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3 pt-2">
              {[
                { l: "New match notifications", v: emailMatches, set: setEmailMatches },
                { l: "Recruiter messages", v: emailRecruiters, set: setEmailRecruiters },
                { l: "Product updates", v: emailUpdates, set: setEmailUpdates },
              ].map((it) => (
                <div key={it.l} className="flex items-center justify-between text-sm">
                  <span>{it.l}</span>
                  <Switch checked={it.v} onCheckedChange={it.set} />
                </div>
              ))}
            </div>
          </div>

          <div className="au-card p-6 mt-6">
            <h2 className="font-semibold">Language</h2>
            <Select value="en" disabled>
              <SelectTrigger className="mt-3"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="en">English</SelectItem></SelectContent>
            </Select>
          </div>

          <div className="au-card p-6 mt-6">
            <h2 className="font-semibold">Danger zone</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage account deletion in the privacy center.</p>
            <Button variant="outline" className="mt-3" onClick={() => nav({ to: "/privacy" })}>Open privacy center</Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
