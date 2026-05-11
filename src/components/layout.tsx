import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AudiencePicker } from "@/components/audience-picker";
import { RecruiterNav } from "@/components/recruiter-layout";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">A</span>
      <span className="font-semibold tracking-tight text-foreground">Aurapply</span>
    </Link>
  );
}

function CandidateNav() {
  const { signOut } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const linkCls = (href: string) =>
    `px-3 py-1.5 rounded-full text-sm transition ${
      path === href ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground"
    }`;
  return (
    <div className="sticky top-4 z-40 px-4">
      <nav className="au-nav mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        <Logo />
        <div className="hidden md:flex items-center gap-1">
          <Link to="/dashboard" className={linkCls("/dashboard")}>Dashboard</Link>
          <Link to="/profile" className={linkCls("/profile")}>Profile</Link>
          <Link to="/privacy" className={linkCls("/privacy")}>Privacy</Link>
          <Link to="/settings" className={linkCls("/settings")}>Settings</Link>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            await signOut();
            nav({ to: "/" });
          }}
        >
          Sign out
        </Button>
      </nav>
    </div>
  );
}

function PublicNav() {
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [pickerOpen, setPickerOpen] = useState(false);

  const linkCls = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-sm transition ${
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <>
      <div className="sticky top-4 z-40 px-4">
        <nav className="au-nav mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
          <Logo />
          <div className="hidden md:flex items-center gap-1">
            <a href="/#candidates" className={linkCls(false)}>For candidates</a>
            <a href="/#recruiters" className={linkCls(false)}>For recruiters</a>
            <Link to="/recruiters" className={linkCls(path === "/recruiters")}>Pricing</Link>
            <a href="#" className={linkCls(false)}>About</a>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">Sign in</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => nav({ to: "/signin" })}>
                  Sign in as candidate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => nav({ to: "/signin" })}>
                  Sign in as recruiter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" onClick={() => setPickerOpen(true)}>Get started</Button>
          </div>
        </nav>
      </div>

      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Choose your path</DialogTitle>
            <DialogDescription>
              Aurapply works two ways. Pick the one that fits you.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <AudiencePicker onSelect={() => setPickerOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function TopNav() {
  const { user, userType } = useAuth();
  if (!user) return <PublicNav />;
  if (userType === "recruiter") return <RecruiterNav />;
  return <CandidateNav />;
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            EU-compliant AI recruitment. Built in Europe, for European hiring.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Candidates</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/#candidates" className="hover:text-foreground">How it works</a></li>
            <li><Link to="/signup" className="hover:text-foreground">Verify your profile</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Privacy center</Link></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Recruiters</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/#recruiters" className="hover:text-foreground">How sourcing works</a></li>
            <li><Link to="/recruiters" className="hover:text-foreground">Pricing</Link></li>
            <li><a href="#" className="hover:text-foreground">Compliance</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
            <li><a href="#" className="hover:text-foreground">Imprint</a></li>
            <li><a href="#" className="hover:text-foreground">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aurapply. All rights reserved.
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
