/**
 * Appointed illustrations.
 *
 * Built entirely from inline SVG in brand colors. No stock photography,
 * no AI faces, no 3D scenes. Each piece falls into one of three roles:
 *
 *  1. Mockups        — stylized snippets of the product (cards, lists)
 *  2. Brand marks    — abstract geometric compositions (focus block decor)
 *  3. Iconographic   — empty-state scenes built from icon-language pieces
 */
import * as React from "react";
import { cn } from "@/lib/utils";

/* ───────────────────────────── Company mark ─────────────────────────────
 * Deterministic, brand-friendly identity mark for a company name. Used in
 * match cards as a "logo placeholder" that still feels like a real brand.
 */
const MARK_PALETTE: Array<{ bg: string; fg: string }> = [
  { bg: "#1E40AF", fg: "#FFFFFF" }, // royal blue
  { bg: "#0EA5E9", fg: "#0F172A" }, // sky
  { bg: "#10B981", fg: "#0F172A" }, // emerald
  { bg: "#4F46E5", fg: "#FFFFFF" }, // indigo
  { bg: "#F59E0B", fg: "#0F172A" }, // amber
  { bg: "#8B5CF6", fg: "#FFFFFF" }, // violet
  { bg: "#1E3A8A", fg: "#FFFFFF" }, // deep navy
  { bg: "#F97316", fg: "#0F172A" }, // coral
];

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function CompanyMark({
  name,
  size = 36,
  className,
  rounded = 8,
}: {
  name: string;
  size?: number;
  className?: string;
  rounded?: number;
}) {
  const initial = (name || "?").trim().charAt(0).toUpperCase() || "?";
  const palette = MARK_PALETTE[hashString(name || "x") % MARK_PALETTE.length];
  return (
    <div
      role="img"
      aria-label={name}
      className={cn("inline-grid place-items-center font-semibold tracking-tight shrink-0", className)}
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        background: palette.bg,
        color: palette.fg,
        fontSize: Math.round(size * 0.42),
        boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.06)",
      }}
    >
      {initial}
    </div>
  );
}

/* ───────────────────────────── Match strength bar ───────────────────────
 * Colored by tier — emerald (≥85), royal blue (70–84), amber (<70).
 */
export function MatchStrengthBar({
  value,
  className,
  width = "100%",
}: {
  value: number;
  className?: string;
  width?: number | string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const tier = v >= 85 ? "emerald" : v >= 70 ? "blue" : "amber";
  const fill =
    tier === "emerald"
      ? "linear-gradient(90deg, #10B981, #059669)"
      : tier === "blue"
        ? "linear-gradient(90deg, #1E40AF, #4F46E5)"
        : "linear-gradient(90deg, #F59E0B, #F97316)";
  return (
    <div
      className={cn("h-1.5 rounded-full bg-[var(--surface-inset)] overflow-hidden", className)}
      style={{ width }}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${v}%`, background: fill }}
      />
    </div>
  );
}

/* ───────────────────────────── Brand constellation ──────────────────────
 * Abstract geometric mark placed in the top-right of dashboard focus
 * blocks. Three variants tell a small visual story per state.
 */
type Variant = "incomplete" | "active" | "structured";

export function BrandConstellation({
  variant = "active",
  size = 96,
  className,
}: {
  variant?: Variant;
  size?: number;
  className?: string;
}) {
  const blue = "#1E40AF";
  const indigo = "#4F46E5";
  const sky = "#0EA5E9";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {variant === "incomplete" && (
        <>
          {/* Faded, scattered: profile not yet whole */}
          <circle cx="22" cy="28" r="5" fill={blue} opacity="0.85" />
          <circle cx="62" cy="20" r="4" fill={indigo} opacity="0.45" />
          <circle cx="80" cy="50" r="3" fill={sky} opacity="0.30" />
          <circle cx="40" cy="62" r="4.5" fill={indigo} opacity="0.55" />
          <circle cx="72" cy="78" r="5" fill={blue} opacity="0.20" />
          <line x1="22" y1="28" x2="40" y2="62" stroke={blue} strokeWidth="1" opacity="0.25" strokeDasharray="2 2" />
        </>
      )}
      {variant === "active" && (
        <>
          {/* Connected: matches flowing */}
          <line x1="20" y1="22" x2="55" y2="44" stroke={blue} strokeWidth="1" opacity="0.45" />
          <line x1="55" y1="44" x2="82" y2="28" stroke={indigo} strokeWidth="1" opacity="0.45" />
          <line x1="55" y1="44" x2="40" y2="78" stroke={sky} strokeWidth="1" opacity="0.45" />
          <line x1="55" y1="44" x2="80" y2="74" stroke={blue} strokeWidth="1" opacity="0.35" />
          <circle cx="20" cy="22" r="4.5" fill={blue} />
          <circle cx="82" cy="28" r="3.5" fill={indigo} />
          <circle cx="40" cy="78" r="3.5" fill={sky} />
          <circle cx="80" cy="74" r="3" fill={indigo} opacity="0.7" />
          <circle cx="55" cy="44" r="6" fill="white" stroke={blue} strokeWidth="1.5" />
          <circle cx="55" cy="44" r="2" fill={blue} />
        </>
      )}
      {variant === "structured" && (
        <>
          {/* Grid: structure, first job posted */}
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => {
              const opacity = (r + c) % 2 === 0 ? 0.85 : 0.4;
              const fill = r === 1 && c === 1 ? blue : (r + c) % 2 === 0 ? indigo : sky;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={18 + c * 24}
                  y={18 + r * 24}
                  width="14"
                  height="14"
                  rx="3"
                  fill={fill}
                  opacity={opacity}
                />
              );
            })
          )}
        </>
      )}
    </svg>
  );
}

/* ───────────────────────────── Empty state: no matches ──────────────────
 * Iconographic composition: profile node connected by dashed lines to job
 * nodes — one solid (potential match), the rest faded (still searching).
 */
export function EmptyMatchesIllustration({
  size = 140,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const blue = "#1E40AF";
  const muted = "#94A3B8";
  return (
    <svg
      width={size}
      height={(size * 100) / 160}
      viewBox="0 0 160 100"
      fill="none"
      aria-hidden="true"
      className={cn("mx-auto", className)}
    >
      {/* Connecting lines */}
      <path d="M52 50 L110 22" stroke={muted} strokeWidth="1.2" strokeDasharray="3 3" />
      <path d="M52 50 L110 50" stroke={blue} strokeWidth="1.5" />
      <path d="M52 50 L110 78" stroke={muted} strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Profile node (left) */}
      <g transform="translate(26 32)">
        <rect width="36" height="36" rx="10" fill="white" stroke={blue} strokeWidth="1.5" />
        <circle cx="18" cy="14" r="4.5" fill="none" stroke={blue} strokeWidth="1.5" />
        <path d="M9 28c1.4-3.6 4.5-5.5 9-5.5s7.6 1.9 9 5.5" stroke={blue} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Job nodes (right) — top faded, middle active, bottom faded */}
      {[
        { y: 4, opacity: 0.35 },
        { y: 32, opacity: 1 },
        { y: 60, opacity: 0.35 },
      ].map((j, i) => (
        <g key={i} transform={`translate(110 ${j.y})`} opacity={j.opacity}>
          <rect width="36" height="36" rx="8" fill="white" stroke={blue} strokeWidth="1.5" />
          <path d="M10 12h16M10 17h12M10 22h14M10 27h10" stroke={blue} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

/* ───────────────────────────── Empty state: no jobs posted ──────────────
 * Recruiter-side: stack of three job-card silhouettes, the topmost
 * highlighted as the "first to post".
 */
export function EmptyJobsIllustration({
  size = 140,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const blue = "#1E40AF";
  const indigo = "#4F46E5";
  const muted = "#CBD5E1";
  return (
    <svg
      width={size}
      height={(size * 100) / 160}
      viewBox="0 0 160 100"
      fill="none"
      aria-hidden="true"
      className={cn("mx-auto", className)}
    >
      <rect x="40" y="18" width="80" height="14" rx="3" fill="white" stroke={muted} strokeWidth="1.2" />
      <rect x="34" y="36" width="92" height="14" rx="3" fill="white" stroke={muted} strokeWidth="1.2" />
      <g>
        <rect x="28" y="54" width="104" height="34" rx="6" fill="white" stroke={blue} strokeWidth="1.5" />
        <rect x="36" y="62" width="44" height="6" rx="2" fill={blue} />
        <rect x="36" y="74" width="74" height="4" rx="2" fill={indigo} opacity="0.5" />
        <rect x="36" y="80" width="56" height="4" rx="2" fill={indigo} opacity="0.3" />
      </g>
    </svg>
  );
}

/* ───────────────────────────── Milestone burst ──────────────────────────
 * Quiet celebratory pattern: one expanding ring, an icon center, headline
 * and primary action. No confetti, no sound.
 */
export function MilestoneBurst({
  icon,
  headline,
  description,
  action,
  variant = "brand",
  className,
}: {
  icon: React.ReactNode;
  headline: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "brand" | "success" | "ai";
  className?: string;
}) {
  const ring =
    variant === "success"
      ? "from-[#1E40AF] to-[#10B981]"
      : variant === "ai"
        ? "from-[#1E40AF] to-[#8B5CF6]"
        : "from-[#1E40AF] to-[#4F46E5]";
  return (
    <div className={cn("text-center", className)}>
      <div className="relative mx-auto h-24 w-24">
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-br opacity-20 animate-[ping_1.5s_ease-out_1]",
            ring
          )}
        />
        <span
          aria-hidden
          className={cn("absolute inset-3 rounded-full bg-gradient-to-br", ring)}
        />
        <div className="absolute inset-0 grid place-items-center text-white">{icon}</div>
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">{headline}</h2>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
