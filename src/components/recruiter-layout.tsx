import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

function Logo() {
  return (
    <Link to="/r/dashboard" className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">A</span>
      <span className="font-semibold tracking-tight text-foreground">
        Aurapply <span className="text-muted-foreground font-normal">/ Recruiter</span>
      </span>
    </Link>
  );
}

const NAV: { to: string; label: string }[] = [
  { to: "/r/dashboard", label: "Dashboard" },
  { to: "/r/candidates", label: "Candidates" },
  { to: "/r/team", label: "Team" },
  { to: "/r/company", label: "Company" },
  { to: "/r/billing", label: "Billing" },
  { to: "/r/settings", label: "Settings" },
];

export function RecruiterNav() {
  const { signOut } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const linkCls = (href: string) =>
    `px-3 py-1.5 rounded-full text-sm transition ${
      path === href || path.startsWith(href + "/")
        ? "text-foreground bg-secondary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="sticky top-4 z-40 px-4">
      <nav className="au-nav mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
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
    </div>
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
