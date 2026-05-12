import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecruiterNav } from "@/components/recruiter-layout";
import logoUrl from "@/assets/aurapply-logo.png";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={logoUrl} alt="Aurapply" className="h-7 w-7" />
      <span className="font-semibold tracking-tight text-foreground">Aurapply</span>
    </Link>
  );
}

function CandidateNav() {
  const { signOut } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const linkCls = (href: string) =>
    `px-3 py-1.5 rounded-md text-sm transition ${
      path === href ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
    }`;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-14">
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
    </header>
  );
}

function PublicNav() {
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onIndividuals = path === "/individuals";
  const onBusinesses = path === "/businesses";

  const linkCls = (active: boolean) =>
    `px-3 py-1.5 rounded-md text-sm transition ${
      active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-14">
        <Logo />
        <div className="hidden md:flex items-center gap-1">
          <Link to="/individuals" className={linkCls(onIndividuals)}>For Individuals</Link>
          <Link to="/businesses" className={linkCls(onBusinesses)}>For Businesses</Link>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">Sign in</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => nav({ to: "/signin" })}>
                Sign in as individual
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => nav({ to: "/r/signin" })}>
                Sign in as business
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {onIndividuals && (
            <Button size="sm" onClick={() => nav({ to: "/signup" })}>Create profile</Button>
          )}
          {onBusinesses && (
            <Button size="sm" onClick={() => nav({ to: "/r/signup" })}>Post a job</Button>
          )}
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
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            EU-compliant AI hiring. Built in Europe.
          </p>
          <div className="mt-4 text-xs text-muted-foreground">EN</div>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Product</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/individuals" className="hover:text-foreground">For Individuals</Link></li>
            <li><Link to="/businesses" className="hover:text-foreground">For Businesses</Link></li>
            <li><Link to="/businesses" hash="pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><a href="#" className="hover:text-foreground">Compliance</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
            <li><a href="#" className="hover:text-foreground">Imprint</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Sign in</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/signin" className="hover:text-foreground">Sign in as individual</Link></li>
            <li><Link to="/r/signin" className="hover:text-foreground">Sign in as business</Link></li>
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
