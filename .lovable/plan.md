## Goal
Convert the recruiter side of Aurapply into a sales-gated experience while leaving the candidate flow untouched.

## Scope of changes

### 1. Audience picker (`src/components/audience-picker.tsx`)
- Update right-card title to "For Businesses", description to the new copy, CTA label to "Request access", and route the CTA to `/businesses/request` instead of `/r/signup`. Keep left card unchanged.

### 2. `/businesses` page (`src/routes/businesses.tsx`)
Full content rewrite preserving the design system (royal blue/navy, light grey bands, icon set, gradient hero):
- New hero (FOR RECRUITERS eyebrow, "Curated hiring. Pay only when you hire.", new sub, "Request access" CTA → `/businesses/request`, secondary "Sign in" → `/r/signin`, fine-print line).
- Replace `ShortlistMockup` with an abstract SVG node-constellation composition.
- Section 1: How it works (3 steps — request access, qualification call, post & hire).
- Section 2 (light grey band): "Why we work with you, not just for you" — 2-col, icon + 3 paragraphs.
- Section 3: Pricing — 3 columns (post free / review free / pay only when you hire) + supporting paragraph.
- Section 4: Matching engine — 3 numbered cards.
- Section 5 (light grey band): Compliance — 2-col with scale icon.
- Section 6: Who we work with — 4 sector lines + qualifying paragraph.
- Section 7: FAQ — 6 accordion items per spec.
- Final CTA: "Hire from your best-fit eight." → `/businesses/request`.

### 3. New `/businesses/request` page (`src/routes/businesses.request.tsx`)
Two-column layout. Left: explanation + 3 reassurance lines with icons. Right: form with grouped fields:
- About you: name, work email (block freemail with polite message), role dropdown, country dropdown.
- Company: name, size, sector.
- Hiring: hires/year, roles typed for, biggest challenge.
- Logistics: source, preferred call times (checkboxes).
- Submit inserts into `access_requests` table; on success navigate to `/businesses/request/received?name=<first>`.
- Zod validation, char limits.

### 4. New `/businesses/request/received` page (`src/routes/businesses.request.received.tsx`)
Centered confirmation with gradient burst + checkmark, headline, body using first name from query string, "What happens next" 3-step list, subtle "Return to home" link.

### 5. Redirect old `/r/signup` (`src/routes/r.signup.tsx`)
Replace contents with a small page that on mount navigates to `/businesses/request` and shows the explanatory note. Keep `/r/signin` untouched.

### 6. New `/r/compliance` page (`src/routes/r.compliance.tsx`)
Inside recruiter shell. Overview, document library cards (6 docs, download buttons stubbed), quarterly updates section, contact box for DPO.

### 7. First-login welcome block on `/r/dashboard` (`src/routes/r.dashboard.tsx`)
Add a welcome focus block that appears when the recruiter has no jobs posted yet: greeting, 3-step getting-started panel (company profile / first role / compliance docs), point-of-contact line. Hides once first job exists.

### 8. Recruiter nav (`src/components/recruiter-layout.tsx`)
Add "Compliance" entry pointing to `/r/compliance`.

### 9. Database migration
Create `public.access_requests` table:
- id, created_at, updated_at, status (default 'new'), assigned_reviewer (uuid nullable), internal_notes (text)
- full_name, work_email, role, country
- company_name, company_size, sector
- hires_per_year, roles_typically, biggest_challenge
- heard_from, preferred_times (text[])
- RLS: anyone (anon + auth) can INSERT; only authenticated users with company-admin role on any company can SELECT/UPDATE (use existing `is_company_admin` is per-company; instead allow service role for now and a permissive admin policy gated by a new helper or simply restrict to `auth.uid() IS NOT NULL AND EXISTS company owner`). For MVP: INSERT open to public, SELECT/UPDATE restricted to authenticated users who own at least one company.
- Trigger for `updated_at`.

### Out of scope for this turn
- `/admin/access-requests` admin panel and templates page (mentioned in spec as MVP scaffolding) — will defer unless requested, since no existing `/admin` area exists in the codebase. I'll note this and skip building that admin view; data is captured and viewable via Lovable Cloud backend in the meantime.

## Technical notes
- Use existing `PageShell`, `au-card`, `au-band`, `au-cta-gradient`, icon components.
- Form uses `zod` + react state (no react-hook-form to keep it light); insert via `supabase.from('access_requests').insert(...)`.
- Freemail block: client-side regex against gmail.com, yahoo.com, hotmail.com, outlook.com, icloud.com, proton.me, gmx.*, web.de.
- Constellation SVG: inline SVG, no new asset.

## Confirm
Will skip building the `/admin/access-requests` admin panel + email templates page this round (the spec marks it MVP-manual and there's no existing admin scaffolding). Everything else above will ship. OK to proceed?