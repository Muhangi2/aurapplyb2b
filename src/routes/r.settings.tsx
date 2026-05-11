import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { RecruiterShell } from "@/components/recruiter-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/r/settings")({ component: RecruiterSettings });

function RecruiterSettings() {
  const { user, userType, loading } = useAuth();
  const nav = useNavigate();
  const [language, setLanguage] = useState("en");
  const [notifFreq, setNotifFreq] = useState("daily");

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/signin" });
    else if (userType === "candidate") nav({ to: "/dashboard" });
  }, [user, userType, loading, nav]);

  async function changePassword() {
    const newPw = prompt("Enter a new password (min. 8 characters):");
    if (!newPw || newPw.length < 8) return;
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) toast.error(error.message);
    else toast.success("Password updated.");
  }

  async function exportData() {
    if (!user) return;
    const [jobs, matches, actions] = await Promise.all([
      supabase.from("jobs").select("*").eq("created_by", user.id),
      supabase.from("recruiter_matches").select("*"),
      supabase.from("recruiter_actions").select("*").eq("user_id", user.id),
    ]);
    const blob = new Blob([JSON.stringify({ jobs: jobs.data, matches: matches.data, actions: actions.data }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "aurapply-recruiter-data.json";
    a.click();
  }

  async function deleteAccount() {
    if (!confirm("Permanently delete your account and all related data? This cannot be undone.")) return;
    toast.info("Deletion request submitted. Our team will process it within 30 days.");
  }

  return (
    <RecruiterShell>
      <div className="px-6 py-12 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Account, notifications and data.</p>
        </div>

        <div className="au-card p-6 space-y-4">
          <h2 className="font-semibold">Account</h2>
          <div><Label>Email</Label><Input value={user?.email ?? ""} disabled className="mt-1.5" /></div>
          <Button variant="outline" onClick={changePassword}>Change password</Button>
        </div>

        <div className="au-card p-6 space-y-4">
          <h2 className="font-semibold">Notifications</h2>
          <div>
            <Label>New match emails</Label>
            <Select value={notifFreq} onValueChange={setNotifFreq}>
              <SelectTrigger className="mt-1.5 w-60"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant</SelectItem>
                <SelectItem value="daily">Daily digest</SelectItem>
                <SelectItem value="weekly">Weekly digest</SelectItem>
                <SelectItem value="off">Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="mt-1.5 w-60"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="au-card p-6 space-y-3">
          <h2 className="font-semibold">Data</h2>
          <p className="text-sm text-muted-foreground">Export everything we hold on your recruiter account, or request account deletion.</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportData}>Export data</Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={deleteAccount}>Delete account</Button>
          </div>
        </div>
      </div>
    </RecruiterShell>
  );
}
