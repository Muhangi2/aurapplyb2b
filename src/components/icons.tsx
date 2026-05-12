/**
 * Aurapply icon library.
 *
 * Construction rules (uniform across the set):
 * - 24x24 viewBox, line-based, stroke="currentColor", strokeWidth 1.5
 * - rounded line caps and joins
 * - geometric, readable at 16px
 * - select status icons carry a single small filled accent dot in royal blue
 *   (the `accentDot` slot) — used consistently, never decoratively
 *
 * Color is inherited from text color. Pass `className="text-primary"` etc.
 * Size via `size={n}` (default 24) or any width/height/className override.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  /** Render the consistent royal-blue accent dot in the bottom-right (only on icons that opt in). */
  accentDot?: boolean;
};

function Svg({
  size = 24,
  className,
  children,
  accentDot,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      {...rest}
    >
      {children}
      {accentDot ? (
        <circle cx="19" cy="19" r="2.2" fill="var(--primary)" stroke="none" />
      ) : null}
    </svg>
  );
}

/* ─────────────────────────── Navigation & structure ─────────────────────────── */

export const HomeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 11 12 4l8.5 7" />
    <path d="M5 10v9h14v-9" />
    <path d="M10 19v-5h4v5" />
  </Svg>
);

export const ProfileIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="3.5" />
    <path d="M5 19c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" />
  </Svg>
);

export const JobsIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="6.5" width="17" height="13" rx="2" />
    <path d="M9 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v1.5" />
    <path d="M3.5 12h17" />
  </Svg>
);

export const MatchesIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="7" cy="12" r="3" />
    <circle cx="17" cy="12" r="3" />
    <path d="M10 12h4" />
  </Svg>
);

export const CandidatesIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="9" r="3" />
    <path d="M3.5 18c.9-2.6 3-4 5.5-4s4.6 1.4 5.5 4" />
    <circle cx="17" cy="8" r="2.2" />
    <path d="M16 13.5c2 .3 3.5 1.5 4.2 3.5" />
  </Svg>
);

export const TeamIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="2.6" />
    <circle cx="6" cy="10" r="2.2" />
    <circle cx="18" cy="10" r="2.2" />
    <path d="M8.5 18c.6-2 1.9-3 3.5-3s2.9 1 3.5 3" />
    <path d="M3 18c.4-1.5 1.4-2.4 3-2.6" />
    <path d="M21 18c-.4-1.5-1.4-2.4-3-2.6" />
  </Svg>
);

export const CompanyIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20V7l7-3v16" />
    <path d="M11 10h8a1 1 0 0 1 1 1v9" />
    <path d="M4 20h17" />
    <path d="M14 13h2M14 16h2M7 9v.01M7 12v.01M7 15v.01" />
  </Svg>
);

export const SettingsIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2.5" />
    <path d="M19.4 13.6a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.5 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </Svg>
);

export const SignOutIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 5h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4" />
    <path d="M10 16l-4-4 4-4" />
    <path d="M6 12h11" />
  </Svg>
);

export const SearchIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.3-4.3" />
  </Svg>
);

export const FilterIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5h16l-6 8v6l-4-2v-4z" />
  </Svg>
);

export const SortIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 5v14M7 19l-3-3M7 19l3-3" />
    <path d="M17 19V5M17 5l-3 3M17 5l3 3" />
  </Svg>
);

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const BackIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Svg>
);

export const ForwardIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 6l6 6-6 6" />
  </Svg>
);

export const ExpandIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 10l4-4 4 4" />
    <path d="M8 14l4 4 4-4" />
  </Svg>
);

export const CollapseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 14l4-4 4 4" />
    <path d="M8 10l4-4 4 4" transform="translate(0 10)" />
  </Svg>
);

/* ─────────────────────────── Status & state ─────────────────────────── */

export const VerifiedIcon = (p: IconProps) => (
  <Svg {...p} accentDot={p.accentDot ?? true}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.2 2.6 2.6L16 9.8" />
  </Svg>
);

export const PendingIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" strokeDasharray="2 2.5" />
  </Svg>
);

export const WarningIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4 2.8 19.5a1 1 0 0 0 .9 1.5h16.6a1 1 0 0 0 .9-1.5L12 4Z" />
    <path d="M12 10v4.5" />
    <path d="M12 17.6v.01" />
  </Svg>
);

export const ErrorIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </Svg>
);

export const InfoIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5" />
    <path d="M12 8v.01" />
  </Svg>
);

export const InProgressIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

/* ─────────────────────────── Actions ─────────────────────────── */

export const EditIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20h4l10-10-4-4L4 16v4Z" />
    <path d="m13.5 6.5 4 4" />
  </Svg>
);

export const DeleteIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16" />
    <path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2" />
    <path d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
    <path d="M10 11v6M14 11v6" />
  </Svg>
);

export const DownloadIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v11" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 19h14" />
  </Svg>
);

export const UploadIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 19V8" />
    <path d="m7 13 5-5 5 5" />
    <path d="M5 19h14" />
  </Svg>
);

export const ShareIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="m8.2 11 7.6-3.8M8.2 13l7.6 3.8" />
  </Svg>
);

export const CopyIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Svg>
);

export const RefreshIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.5" />
    <path d="M4 4v4.5h4.5" />
    <path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.5" />
    <path d="M20 20v-4.5h-4.5" />
  </Svg>
);

export const RegenerateIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12a8 8 0 0 1 13.5-5.8" />
    <path d="M18 4v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.5 5.8" />
    <path d="M6 20v-4h4" />
  </Svg>
);

export const ContactIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7c0-1.1.9-2 2-2h2.5l1.5 4-2 1c.7 2 2.3 3.6 4.3 4.3l1-2 4 1.5V16a2 2 0 0 1-2 2A12 12 0 0 1 4 7Z" />
  </Svg>
);

export const MessageIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V6Z" />
  </Svg>
);

export const ScheduleIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17" />
    <path d="M8 3.5v4M16 3.5v4" />
  </Svg>
);

export const ArchiveIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="4" rx="1" />
    <path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
    <path d="M10 13h4" />
  </Svg>
);

export const SaveIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h11l3 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    <path d="M7 4v5h8V4" />
    <path d="M7 14h10" />
  </Svg>
);

export const FavoriteIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 5 2.5 4.7 5.2.7-3.8 3.6.9 5.1L12 17l-4.8 2.1.9-5.1L4.3 10.4l5.2-.7L12 5Z" />
  </Svg>
);

/* ─────────────────────────── Match & AI ─────────────────────────── */

export const MatchStrengthIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="9" strokeDasharray="2 3" opacity="0.5" />
  </Svg>
);

export const ReasoningIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="6" cy="7" r="1.2" />
    <circle cx="6" cy="12" r="1.2" />
    <circle cx="6" cy="17" r="1.2" />
    <path d="M10 7h10M10 12h10M10 17h7" />
  </Svg>
);

export const AIProcessingIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 14c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
    <path d="M3 9c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" opacity="0.55" />
  </Svg>
);

export const HumanReviewIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10" cy="9" r="3" />
    <path d="M4.5 18c.8-2.7 3-4.2 5.5-4.2" />
    <circle cx="16.5" cy="16.5" r="3" />
    <path d="m18.7 18.7 2.3 2.3" />
  </Svg>
);

export const AuditTrailIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 4 8 4-8 4-8-4 8-4Z" />
    <path d="m4 12 8 4 8-4" />
    <path d="m4 16 8 4 8-4" />
  </Svg>
);

/* ─────────────────────────── Profile & credentials ─────────────────────────── */

export const IdentityIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="3.5" />
    <path d="M5 20c1.2-3.5 3.8-5.5 7-5.5s5.8 2 7 5.5" />
  </Svg>
);

export const EducationIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m2.5 10 9.5-4 9.5 4-9.5 4-9.5-4Z" />
    <path d="M7 12.5V17c2 1.5 8 1.5 10 0v-4.5" />
    <path d="M21.5 10v5" />
  </Svg>
);

export const ExperienceIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="7" width="17" height="12" rx="2" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
  </Svg>
);

export const SkillIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12V5h7l9 9-7 7-9-9Z" />
    <circle cx="8" cy="9" r="1.2" />
  </Svg>
);

export const LanguagesIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V5Z" />
    <path d="M8 9h7M8 12h5" />
  </Svg>
);

export const LocationIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);

/* ─────────────────────────── Recruiter & business ─────────────────────────── */

export const JobPostingIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5" />
    <path d="M8 13h8M8 16h6" />
  </Svg>
);

export const ShortlistIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="6" y="6" width="13" height="14" rx="2" />
    <path d="M5 4h12" opacity="0.6" />
    <path d="M9 11h7M9 14h5" />
  </Svg>
);

export const PipelineIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="9" width="4" height="6" rx="1" />
    <rect x="10" y="9" width="4" height="6" rx="1" />
    <rect x="17" y="9" width="4" height="6" rx="1" />
    <path d="M7 12h3M14 12h3" />
  </Svg>
);

export const TeamMembersIcon = TeamIcon;

export const IntegrationIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="18" cy="6" r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <circle cx="18" cy="18" r="2.2" />
    <path d="M8 6h8M6 8v8M18 8v8M8 18h8" />
  </Svg>
);

/* ─────────────────────────── Compliance & trust ─────────────────────────── */

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 5 6v6c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" />
  </Svg>
);

export const LockIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
  </Svg>
);

export const EyeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const ScaleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v16" />
    <path d="M5 8h14" />
    <path d="M5 8 2.5 14a3 3 0 0 0 5 0L5 8Z" />
    <path d="m19 8-2.5 6a3 3 0 0 0 5 0L19 8Z" />
    <path d="M8 20h8" />
  </Svg>
);

export const DocumentIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5" />
    <path d="M8 13h8M8 16h6M8 10h3" />
  </Svg>
);

export const CheckmarkIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const EuStarsIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    {/* minimal arrangement of 4 small star marks (simplified to dots) */}
    <circle cx="12" cy="6" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="17.2" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="15" cy="16" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="9" cy="16" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="6.8" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

export const SparkleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v5M12 15v5M4 12h5M15 12h5" />
    <path d="m6.5 6.5 3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" opacity="0.6" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);
