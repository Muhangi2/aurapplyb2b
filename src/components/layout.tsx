import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
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

  const linkCls = (active: boolean) =>
    `px-3 py-1.5 rounded-md text-sm transition ${
      active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
    }`;

  const productActive =
    path === "/individuals" || path === "/businesses" || path === "/recruiters";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-14">
        <Logo />
        <div className="hidden md:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className={linkCls(productActive)}>
              Product
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => nav({ to: "/individuals" })}>
                For Individuals
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => nav({ to: "/businesses" })}>
                For Businesses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => nav({ to: "/recruiters" })}>
                For Recruiters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/businesses" hash="pricing" className={linkCls(false)}>
            Pricing
          </Link>
          <Link to="/compliance" className={linkCls(path === "/compliance")}>
            Compliance
          </Link>
          <Link to="/about" className={linkCls(path === "/about")}>
            About
          </Link>
          <Link to="/contact" className={linkCls(path === "/contact")}>
            Contact
          </Link>
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
          <Button size="sm" onClick={() => nav({ to: "/signup" })}>
            Get started
          </Button>
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
            <li><Link to="/recruiters" className="hover:text-foreground">For Recruiters</Link></li>
            <li><Link to="/businesses" hash="pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/compliance" className="hover:text-foreground">Compliance</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
            <li><Link to="/imprint" className="hover:text-foreground">Imprint</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
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
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShowPromo(window.localStorage.getItem("au-promo-dismissed") !== "1");
  }, []);

  const dismissPromo = () => {
    setShowPromo(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("au-promo-dismissed", "1");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showPromo && (
        <div className="au-promo text-xs md:text-sm">
          <div className="mx-auto max-w-6xl px-6 py-2.5 flex items-center justify-center gap-3 text-center relative">
            <span className="opacity-90">New. Aurapply launches in EU markets.</span>
            <Link to="/individuals" className="font-medium underline-offset-2 hover:underline">
              Read more →
            </Link>
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={dismissPromo}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-background/20 transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
      <TopNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
