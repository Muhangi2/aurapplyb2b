import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { RecruiterNav } from "@/components/recruiter-layout";
export const pageContainer =
  "mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className={`font-medium tracking-tight text-foreground ${compact ? "text-sm" : "text-sm"}`}
    >
      Appointed
    </Link>
  );
}

function CandidateNav() {
  const { signOut } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const linkCls = (href: string) =>
    `px-2.5 py-1 text-sm transition-colors ${
      path === href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <nav className="mx-auto flex h-12 w-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
        <Logo />
        <div className="hidden items-center gap-0.5 md:flex">
          <Link to="/dashboard" className={linkCls("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/profile" className={linkCls("/profile")}>
            Profile
          </Link>
          <Link to="/privacy" className={linkCls("/privacy")}>
            Privacy
          </Link>
          <Link to="/settings" className={linkCls("/settings")}>
            Settings
          </Link>
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
    </header>
  );
}

function PublicNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  const items: { to: string; label: string; match: (p: string) => boolean }[] = [
    { to: "/about", label: "About", match: (p) => p === "/about" },
    {
      to: "/documentation/eu-ai-act-compliance",
      label: "Compliance",
      match: (p) => p === "/documentation/eu-ai-act-compliance",
    },
    { to: "/documentation", label: "Documentation", match: (p) => p === "/documentation" },
    { to: "/contact", label: "Contact", match: (p) => p === "/contact" },
  ];

  const linkCls = (active: boolean) =>
    `px-2.5 py-1 text-sm transition-colors ${
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-12 w-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
        <Logo />
        <div className="flex items-center gap-0.5">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hidden sm:inline-flex ${linkCls(item.match(path))}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/signup"
            search={{ type: "candidate" }}
            className="hidden px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Create profile
          </Link>
          <Link
            to="/signin"
            className="ml-1 px-2.5 py-1 text-sm text-foreground transition-colors hover:text-primary"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
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
    <footer className="mt-auto border-t border-border bg-background">
      <div className="border-b border-border px-6 py-12 text-center sm:px-8 lg:px-12">
        <p className="au-eyebrow text-primary">For hiring teams</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-foreground">
          Curated shortlists, pre-verified candidates.
        </p>
        <div className="mt-5">
          <Button asChild>
            <Link to="/businesses">Register your company</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-6 py-12 sm:grid-cols-2 sm:px-8 lg:px-12">
        <div>
          <div className="text-xs font-medium text-foreground">Product</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/individuals" className="transition-colors hover:text-foreground">
                For Individuals
              </Link>
            </li>
            <li>
              <Link to="/businesses" className="transition-colors hover:text-foreground">
                For Hiring Teams
              </Link>
            </li>
            <li>
              <Link to="/documentation" className="transition-colors hover:text-foreground">
                Documentation
              </Link>
            </li>
            <li>
              <Link
                to="/documentation/how-matching-works"
                className="transition-colors hover:text-foreground"
              >
                How matching works
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-medium text-foreground">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/documentation/eu-ai-act-compliance"
                className="transition-colors hover:text-foreground"
              >
                Compliance
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/imprint" className="transition-colors hover:text-foreground">
                Imprint
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/r/signin" className="transition-colors hover:text-foreground">
                Hiring team sign-in
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8 lg:px-12">
          <Logo compact />
          <span className="text-center">Built in Europe. Data stays in Europe.</span>
          <span>© {new Date().getFullYear()} Appointed</span>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
