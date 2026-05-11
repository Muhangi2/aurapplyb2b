import { Link } from "@tanstack/react-router";
import { Briefcase, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AudiencePicker({
  onSelect,
  candidateSecondary,
  recruiterSecondary,
}: {
  onSelect?: () => void;
  candidateSecondary?: { href: string; label: string };
  recruiterSecondary?: { href: string; label: string };
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Candidate card */}
      <div className="au-card p-7 flex flex-col">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          <Briefcase className="h-5 w-5" />
        </div>
        <div className="mt-5 text-xl font-semibold tracking-tight">I&apos;m looking for work</div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Build your profile once. Get matched to roles where you fit. Recruiters reach out to you.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Button asChild size="lg" onClick={onSelect}>
            <Link to="/signup">
              Create candidate profile <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          {candidateSecondary && (
            <a
              href={candidateSecondary.href}
              onClick={onSelect}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {candidateSecondary.label}
            </a>
          )}
        </div>
      </div>

      {/* Recruiter card */}
      <div className="au-card p-7 flex flex-col">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </div>
        <div className="mt-5 text-xl font-semibold tracking-tight">I&apos;m hiring</div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Post a role. Receive a shortlist of 8 pre-matched candidates with full reasoning. Contact the ones you want.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Button asChild size="lg" onClick={onSelect}>
            <Link to="/r/signup">
              Post a job <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          {recruiterSecondary && (
            <a
              href={recruiterSecondary.href}
              onClick={onSelect}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {recruiterSecondary.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
