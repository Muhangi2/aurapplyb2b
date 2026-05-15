import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
function Logo() {
  return (
    <Link to="/r/dashboard" className="text-sm font-medium tracking-tight text-foreground">
      Appointed <span className="font-normal text-muted-foreground">/ Recruiter</span>
    </Link>
  );
}

const NAV: { to: string; label: string }[] = [
  { to: "/r/dashboard", label: "Dashboard" },
  { to: "/r/candidates", label: "Candidates" },
  { to: "/r/team", label: "Team" },
  { to: "/r/company", label: "Company" },
  { to: "/r/compliance", label: "Compliance" },
  { to: "/r/billing", label: "Billing" },
  { to: "/r/settings", label: "Settings" },
];

export function RecruiterNav() {
  const { signOut } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const linkCls = (href: string) =>
    `px-2.5 py-1 text-sm transition-colors ${
      path === href || path.startsWith(href + "/")
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-12 w-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
        <Logo />
        <div className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={linkCls(n.to)}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
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
        </div>
      </nav>
    </header>
  );
}

export function RecruiterShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <RecruiterNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
