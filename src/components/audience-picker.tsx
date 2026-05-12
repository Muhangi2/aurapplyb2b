import { Link } from "@tanstack/react-router";
import { ProfileIcon, CompanyIcon, ArrowRightIcon } from "@/components/icons";
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
          <ProfileIcon size={20} />
        </div>
        <div className="mt-5 text-xl font-semibold tracking-tight">I&apos;m looking for work</div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Build your profile once. Get matched to roles where you fit. Recruiters reach out to you.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Button asChild size="lg" onClick={onSelect}>
            <Link to="/signup">
              Create candidate profile <ArrowRightIcon size={16} className="ml-1" />
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
          <CompanyIcon size={20} />
        </div>
        <div className="mt-5 text-xl font-semibold tracking-tight">For Businesses</div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Post a role, receive a curated shortlist of pre-matched candidates, pay only when you hire.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Button asChild size="lg" onClick={onSelect}>
            <Link to="/businesses/contact">
              Start a conversation <ArrowRightIcon size={16} className="ml-1" />
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
