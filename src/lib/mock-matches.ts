import { supabase } from "@/integrations/supabase/client";

const COMPANIES = [
  { name: "Siemens", role: "Senior Product Manager", location: "Munich, Germany" },
  { name: "N26", role: "Backend Engineer", location: "Berlin, Germany" },
  { name: "Personio", role: "Product Marketing Manager", location: "Munich, Germany" },
  { name: "Spotify", role: "Senior Frontend Engineer", location: "Stockholm, Sweden" },
  { name: "Klarna", role: "Engineering Manager", location: "Stockholm, Sweden" },
  { name: "Mistral AI", role: "Machine Learning Engineer", location: "Paris, France" },
  { name: "Adyen", role: "Solutions Architect", location: "Amsterdam, Netherlands" },
  { name: "Celonis", role: "Customer Success Manager", location: "Munich, Germany" },
];

const STATUSES = ["viewing", "viewing", "reached_out", "viewing", "expired"];

const DESC = `We are looking for an experienced professional to join our team in a senior role. You will collaborate cross-functionally with engineering, design, and go-to-market teams across European markets. The role is hybrid with regular travel to our headquarters. Strong written and spoken communication in English is required, and an additional European language is a plus. We offer competitive compensation, equity, and a structured growth path.`;

export async function seedMatchesIfEmpty(userId: string) {
  const { count } = await supabase.from("matches").select("*", { count: "exact", head: true }).eq("user_id", userId);
  if ((count ?? 0) > 0) return;

  const rows = COMPANIES.map((c, i) => {
    const score = 70 + Math.floor(Math.random() * 28);
    return {
      user_id: userId,
      company: c.name,
      role: c.role,
      location: c.location,
      description: DESC,
      match_score: score,
      score_skills: 70 + Math.floor(Math.random() * 30),
      score_experience: 70 + Math.floor(Math.random() * 30),
      score_location: 80 + Math.floor(Math.random() * 20),
      score_language: 80 + Math.floor(Math.random() * 20),
      reasoning: [
        `Your experience aligns with the seniority required for this role`,
        `Location compatibility with ${c.location}`,
        `Skills overlap with the role requirements`,
        `Language profile matches the team's working language`,
      ],
      status: STATUSES[i % STATUSES.length],
      recruiter_name: i % 3 === 0 ? "Anna Müller" : null,
      recruiter_email: i % 3 === 0 ? `talent@${c.name.toLowerCase().replace(/\s/g, "")}.com` : null,
      recruiter_message:
        i % 3 === 0
          ? `Hi, your profile stood out for our ${c.role} opening. Would you be open to a 20-minute intro call next week?`
          : null,
    };
  });

  await supabase.from("matches").insert(rows);
}

export function computeCompleteness(p: {
  full_name?: string | null;
  city?: string | null;
  current_title?: string | null;
  years_experience?: number | null;
  experiences_count: number;
  education_count: number;
  skills_count: number;
  languages_count: number;
  job_types?: string[] | null;
}): number {
  const checks = [
    !!p.full_name,
    !!p.city,
    !!p.current_title,
    (p.years_experience ?? 0) > 0,
    p.experiences_count > 0,
    p.education_count > 0,
    p.skills_count >= 3,
    p.languages_count > 0,
    (p.job_types?.length ?? 0) > 0,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}
