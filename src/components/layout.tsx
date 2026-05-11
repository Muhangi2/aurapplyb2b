import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">A</span>
      <span className="font-semibold tracking-tight text-foreground">Aurapply</span>
    </Link>
  );
}

export function TopNav() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const linkCls = (href: string) =>
    `px-3 py-1.5 rounded-full text-sm transition ${
      path === href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="sticky top-4 z-40 px-4">
      <nav className="au-nav mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        <Logo />
        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <Link to="/dashboard" className={linkCls("/dashboard")}>Dashboard</Link>
              <Link to="/profile" className={linkCls("/profile")}>Profile</Link>
              <Link to="/privacy" className={linkCls("/privacy")}>Privacy</Link>
              <Link to="/settings" className={linkCls("/settings")}>Settings</Link>
            </>
          ) : (
            <>
              <Link to="/" className={linkCls("/")}>Home</Link>
              <a href="/#how" className="px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:text-foreground">How it works</a>
              <Link to="/recruiters" className={linkCls("/recruiters")}>For recruiters</Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {user ? (
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
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => nav({ to: "/signin" })}>Sign in</Button>
              <Button size="sm" onClick={() => nav({ to: "/signup" })}>Create profile</Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            EU-compliant AI recruitment, designed around the candidate.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/recruiters">For recruiters</Link></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Legal</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Imprint</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Language</div>
          <select className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm" disabled>
            <option>English</option>
          </select>
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
