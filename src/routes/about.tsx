import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import {
  ProfileIcon,
  VerifiedIcon,
  MatchStrengthIcon,
  ShieldIcon,
  ContactIcon,
  ReasoningIcon,
  ScaleIcon,
  LockIcon,
  DocumentIcon,
  HumanReviewIcon,
  EyeIcon,
} from "@/components/icons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aurapply — A better way to be matched to the right role" },
      {
        name: "description",
        content:
          "Aurapply is a European platform that matches people to roles based on what they can do — not how often they apply. Transparent matching, GDPR-native, EU AI Act-ready.",
      },
      { property: "og:title", content: "About Aurapply" },
      {
        property: "og:description",
        content:
          "European hiring, rebuilt around fit. No applications into the void. No mass outreach. No data shared without your permission.",
      },
    ],
  }),
  component: AboutPage,
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
      {children}
    </div>
  );
}

function SectionBand({
  tone = "white",
  children,
}: {
  tone?: "white" | "grey";
  children: React.ReactNode;
}) {
  return (
    <section className={tone === "grey" ? "bg-surface" : "bg-background"}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">{children}</div>
    </section>
  );
}

function ConstellationVisual() {
  // Two clusters of dots connected by selective thin lines; one matched pair highlighted.
  const left = [
    [40, 60], [70, 110], [55, 170], [95, 220], [50, 270], [85, 320],
  ];
  const right = [
    [310, 70], [285, 130], [325, 185], [275, 235], [315, 285], [290, 330],
  ];
  const links: [number, number][] = [
    [0, 1], [1, 3], [2, 0], [3, 4], [4, 5], [5, 2],
  ];
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, hsl(222 70% 28%), hsl(232 60% 22%))",
      }}>
      <svg viewBox="0 0 380 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="190" cy="200" r="170" fill="url(#glow)" />
        {links.map(([a, b], i) => (
          <line
            key={`l-${i}`}
            x1={left[a][0]} y1={left[a][1]}
            x2={right[b][0]} y2={right[b][1]}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={0.8}
          />
        ))}
        {/* highlighted matched pair */}
        <line
          x1={left[1][0]} y1={left[1][1]}
          x2={right[1][0]} y2={right[1][1]}
          stroke="rgba(160,200,255,0.9)"
          strokeWidth={1.4}
        />
        {left.map(([x, y], i) => (
          <circle key={`L-${i}`} cx={x} cy={y} r={i === 1 ? 5 : 3.2}
            fill={i === 1 ? "#cfe1ff" : "rgba(255,255,255,0.7)"} />
        ))}
        {right.map(([x, y], i) => (
          <circle key={`R-${i}`} cx={x} cy={y} r={i === 1 ? 5 : 3.2}
            fill={i === 1 ? "#cfe1ff" : "rgba(255,255,255,0.7)"} />
        ))}
      </svg>
    </div>
  );
}

function StepCard({
  n,
  Icon,
  title,
  body,
}: {
  n: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  body: string;
}) {
  return (
    <div className="au-card p-6 md:p-7 flex gap-5 items-start">
      <div className="flex flex-col items-center gap-3 shrink-0">
        <div className="text-xs font-semibold tracking-wider text-primary">{n}</div>
        <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={22} />
        </div>
      </div>
      <div>
        <div className="text-base md:text-lg font-semibold tracking-tight text-foreground">
          {title}
        </div>
        <p className="mt-2 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}

function PrincipleCard({
  Icon,
  title,
  body,
}: {
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  body: string;
}) {
  return (
    <div className="au-card p-6">
      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon size={26} />
      </div>
      <div className="mt-4 text-base font-semibold tracking-tight text-foreground">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function AboutPage() {
  return (
    <PageShell>
      {/* Section 1: Hero */}
      <SectionBand tone="white">
        <div className="grid gap-10 md:gap-14 md:grid-cols-2 items-center">
          <div>
            <Eyebrow>About Aurapply</Eyebrow>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-foreground">
              A better way to be matched
              <br /> to the right role.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Aurapply is a European platform that matches people to roles based on what they
              can do, what they have done, and where they want to work. No applications into
              the void. No mass outreach. No data shared without your permission.
            </p>
          </div>
          <ConstellationVisual />
        </div>
      </SectionBand>

      {/* Section 2: What Aurapply does */}
      <SectionBand tone="grey">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>The platform</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Matching, instead of applying.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] md:text-base text-muted-foreground leading-relaxed">
            <p>
              Aurapply is built around a simple idea: instead of applying to dozens of jobs
              hoping someone notices, you build one strong profile and let matching happen in
              the background. When a role is posted that fits you, you are matched to it. The
              hiring team sees you. You see them. The conversation starts only if both of you
              want it to.
            </p>
            <p>
              You do not browse jobs on Aurapply. You do not submit applications. You do not
              write cover letters. The platform looks at your profile and the roles being
              posted, finds the genuine matches, and brings them to you.
            </p>
            <p>
              For hiring teams, the same logic runs in reverse. They post a role with clear
              requirements, and they receive a focused shortlist of pre-matched candidates
              instead of a flood of applications they have to filter through. The platform
              does the matching work; the people do the deciding.
            </p>
          </div>
        </div>
      </SectionBand>

      {/* Section 3: How it works */}
      <SectionBand tone="white">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Five steps. From profile to conversation.
          </h2>
        </div>
        <div className="mt-10 space-y-4">
          <StepCard
            n="01"
            Icon={ProfileIcon}
            title="Build a profile."
            body="Add your experience, skills, languages, and preferences. Tell the platform what kind of work you want, where you want to work, what authorization you have, and what salary range you expect. The more specific you are, the better the matching gets. The basics take around 15 minutes."
          />
          <StepCard
            n="02"
            Icon={VerifiedIcon}
            title="Verify what you can."
            body="You can verify your identity, your education, and your work history through our trusted EU partners. Verification is free. Verified profiles are prioritized in shortlists because hiring teams trust them more. You do not have to verify everything at once; each item you verify makes your profile stronger."
          />
          <StepCard
            n="03"
            Icon={MatchStrengthIcon}
            title="A role is posted, the platform finds the matches."
            body="When a hiring team posts a role on Aurapply, the matching engine scores every consenting profile against the role's requirements. Skills, experience, education, language, location, work authorization, salary fit. If you match, you are added to the shortlist with your full reasoning visible. At this stage, the hiring team sees your skills and background but not your name."
          />
          <StepCard
            n="04"
            Icon={ShieldIcon}
            title="They ask to talk to you. You decide."
            body="When a recruiter wants to contact you, you receive a notification. You see who they are, what the role is, where it is, and why the platform matched you. You have 48 hours to decide whether you want this conversation to happen. If you say yes, your name and contact details are released and they reach out. If you say no, or you let the request expire, no contact happens and no data is shared."
          />
          <StepCard
            n="05"
            Icon={ContactIcon}
            title="The conversation belongs to you."
            body="From the moment you approve a contact, you and the hiring team communicate directly. Aurapply does not sit in the middle of your conversation, score your replies, or relay messages. The platform did its job at the match. The hiring conversation is yours."
          />
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          At every step, you can see what is happening, why, and what your options are.
        </p>
      </SectionBand>

      {/* Section 4: What we won't do */}
      <SectionBand tone="grey">
        <div className="max-w-3xl">
          <Eyebrow>What we won&apos;t do</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            The lines the platform does not cross.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <PrincipleCard
            Icon={EyeIcon}
            title="We will not show your profile to recruiters who did not match you."
            body="Your profile is not searchable. Recruiters cannot browse the candidate database, type your name into a search bar, or build a list of people to contact. They only see candidates that the matching engine identified as a fit for a role they actively posted."
          />
          <PrincipleCard
            Icon={ShieldIcon}
            title="We will not share your name until you say yes."
            body="Recruiters see your skills, experience, and match reasoning before they decide to contact you. They do not see your name, your email, or your phone number. Those are only released after you have approved the contact request."
          />
          <PrincipleCard
            Icon={ScaleIcon}
            title="We will not score your personality, tone, or face."
            body="The matching engine looks at structured information: skills, experience, education, languages, location, authorization, salary fit. It does not analyze your photo, your voice, your writing style, your facial expressions, or anything else that would be guesswork dressed up as insight."
          />
          <PrincipleCard
            Icon={LockIcon}
            title="We will not sell or share your data."
            body="Your profile is stored in the EU, used only for matching and verification, and never sold to anyone. It is not used to train external AI models. It is not shared with advertisers, data brokers, or third parties outside the matching and verification flow."
          />
        </div>
      </SectionBand>

      {/* Section 5: Principles */}
      <SectionBand tone="white">
        <div className="max-w-3xl">
          <Eyebrow>Our principles</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            What guides the platform.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <PrincipleCard
            Icon={ReasoningIcon}
            title="Transparent over efficient."
            body="Every match comes with reasoning. Every decision can be explained. If the AI cannot say why it matched you to a role, the match should not have happened. We choose explainability even when it costs us speed or simplicity."
          />
          <PrincipleCard
            Icon={ShieldIcon}
            title="Consent over convenience."
            body="Your data is not used in ways you did not approve. Your name is not released without your active consent. Your profile is not visible to recruiters who have not been matched to you. We accept friction to protect this principle."
          />
          <PrincipleCard
            Icon={ScaleIcon}
            title="Fairness as a feature."
            body="The matching engine is bias-tested quarterly across protected and proxy categories. Signals that produce disparate impact are reduced in weight or removed. We do not claim the AI is perfectly fair; we measure, correct, and publish our methodology."
          />
          <PrincipleCard
            Icon={VerifiedIcon}
            title="Verified over claimed."
            body="Credentials matter, but only when they are real. We verify identities, qualifications, and work histories through trusted EU partners. Verified profiles are prioritized in shortlists because verification is the difference between a profile and a credential."
          />
        </div>
      </SectionBand>

      {/* Section 6: Compliance */}
      <SectionBand tone="grey">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <ShieldIcon size={32} />
            </div>
            <div className="mt-5">
              <Eyebrow>Compliance</Eyebrow>
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Built for the standards European hiring expects.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] md:text-base text-muted-foreground leading-relaxed">
            <p>
              Aurapply is built around the General Data Protection Regulation and the EU AI
              Act from the foundation. Recruitment AI is classified as high-risk under the AI
              Act, which means strict obligations on transparency, human oversight, logging,
              bias testing, and documentation. We treat these as design requirements, not as
              compliance overhead.
            </p>
            <p>
              Your data stays in the EU. Every AI decision is logged and explainable. You have
              the right to request human review of any decision the AI made about your
              profile, to export your data, to correct it, or to delete your account. Hiring
              teams using Aurapply get the documentation they need for their own compliance
              obligations. We do this because European candidates and European hiring teams
              deserve to know that the platform handling their information operates by
              European standards.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              {[
                { Icon: LockIcon, label: "GDPR-compliant by design" },
                { Icon: ScaleIcon, label: "EU AI Act-ready" },
                { Icon: DocumentIcon, label: "Audit trail on every decision" },
                { Icon: HumanReviewIcon, label: "Human review available always" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5"
                >
                  <Icon size={18} className="text-primary" />
                  <span className="text-sm text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionBand>

      {/* Section 7: Company */}
      <SectionBand tone="white">
        <div className="max-w-3xl">
          <Eyebrow>Company</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            European-built, European-based.
          </h2>
          <p className="mt-5 text-[15px] md:text-base text-muted-foreground leading-relaxed">
            Aurapply is built and operated in Germany. We are a European company serving
            European hiring teams and candidates. Data stays in the EU. Support is provided in
            English and German. Additional EU languages are added as we grow.
          </p>
          <div className="mt-6 au-card p-6 text-sm space-y-2">
            <div>
              <span className="text-muted-foreground">General: </span>
              <a className="text-foreground hover:text-primary" href="mailto:hello@aurapply.com">
                hello@aurapply.com
              </a>
            </div>
            <div>
              <span className="text-muted-foreground">Compliance and data protection: </span>
              <a className="text-foreground hover:text-primary" href="mailto:dpo@aurapply.com">
                dpo@aurapply.com
              </a>
            </div>
            <div>
              <span className="text-muted-foreground">Press: </span>
              <a className="text-foreground hover:text-primary" href="mailto:press@aurapply.com">
                press@aurapply.com
              </a>
            </div>
          </div>
        </div>
      </SectionBand>

      {/* Section 8: Closing */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-28 text-center">
          <Eyebrow>Aurapply</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight au-gradient-text">
            Matching, done properly.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built in Europe, for hiring that respects everyone in it.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
