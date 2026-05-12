import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
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
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    `px-3 py-1.5 rounded-full text-sm transition-colors ${
      active ? "text-foreground font-medium" : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2" : "py-0"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "max-w-5xl mx-auto px-5 h-12 au-nav"
            : "max-w-6xl px-6 h-14 border-b border-border bg-background/85 backdrop-blur"
        }`}
      >
        <Logo />
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <Link key={item.to} to={item.to} className={linkCls(item.match(path))}>
              {item.label}
            </Link>
          ))}
          <Link
            to="/signin"
            className="ml-2 px-3 py-1.5 rounded-full text-sm font-medium text-foreground hover:text-primary transition-colors"
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
    <footer className="mt-24 bg-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-2">
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Product</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/individuals" className="hover:text-primary transition-colors">For Individuals</Link></li>
            <li><Link to="/businesses" className="hover:text-primary transition-colors">For Hiring Teams</Link></li>
            <li><Link to="/documentation" className="hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link to="/documentation/how-matching-works" className="hover:text-primary transition-colors">How matching works</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-3 text-foreground">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/documentation/eu-ai-act-compliance" className="hover:text-primary transition-colors">Compliance</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
            <li><Link to="/imprint" className="hover:text-primary transition-colors">Imprint</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/r/signin" className="hover:text-primary transition-colors">Hiring team sign-in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <Logo />
          <div className="hidden sm:block">Built in Europe. Data stays in Europe.</div>
          <div>© {new Date().getFullYear()} Aurapply</div>
        </div>
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
            <Link to="/about" className="font-medium underline-offset-2 hover:underline">
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
