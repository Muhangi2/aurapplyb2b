import { supabase } from "@/integrations/supabase/client";

type Cand = {
  anon_id: string;
  first_name: string;
  full_name: string;
  current_role: string;
  current_company: string;
  years: number;
  location: string;
  skills: string[];
  languages: { name: string; proficiency: string }[];
  education: string;
  summary: string;
  profile_updated: string;
  id_verified: boolean;
  education_verified: boolean;
  experience_verified: boolean;
};

export const CANDIDATE_POOL: Cand[] = [
  { anon_id: "A347", first_name: "Anna", full_name: "Anna Müller", current_role: "Senior Product Manager", current_company: "Personio", years: 6, location: "Munich, Germany", skills: ["Product Strategy", "B2B SaaS", "User Research", "SQL", "Roadmapping"], languages: [{ name: "German", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "TUM, MSc Information Systems", summary: "Six years building B2B HR tooling. Strong in discovery and pricing.", profile_updated: "2026-04-28", id_verified: true, education_verified: true, experience_verified: false },
  { anon_id: "B118", first_name: "Lukas", full_name: "Lukas Hoffmann", current_role: "Product Marketing Manager", current_company: "Celonis", years: 5, location: "Heilbronn, Germany", skills: ["Positioning", "GTM", "Content", "Analytics"], languages: [{ name: "German", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "Universität Mannheim, BSc Business", summary: "PMM with enterprise SaaS focus. Led launch of 3 product lines.", profile_updated: "2026-05-02", id_verified: true, education_verified: false, experience_verified: true },
  { anon_id: "C921", first_name: "Sofia", full_name: "Sofia Bianchi", current_role: "Senior Frontend Engineer", current_company: "N26", years: 7, location: "Berlin, Germany", skills: ["React", "TypeScript", "Design Systems", "Next.js", "GraphQL"], languages: [{ name: "Italian", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }, { name: "German", proficiency: "Conversational" }], education: "Politecnico di Milano, MSc CS", summary: "Frontend platform engineer. Built design systems used across 40+ teams.", profile_updated: "2026-05-09", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "D502", first_name: "Mateusz", full_name: "Mateusz Nowak", current_role: "Backend Engineer", current_company: "Allegro", years: 4, location: "Warsaw, Poland", skills: ["Go", "PostgreSQL", "Kubernetes", "gRPC"], languages: [{ name: "Polish", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "AGH UST Krakow, MSc CS", summary: "Backend engineer focused on high-throughput systems.", profile_updated: "2026-04-15", id_verified: false, education_verified: true, experience_verified: false },
  { anon_id: "E633", first_name: "Camille", full_name: "Camille Laurent", current_role: "Engineering Manager", current_company: "Doctolib", years: 9, location: "Paris, France", skills: ["Leadership", "Hiring", "Architecture", "Python"], languages: [{ name: "French", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "École Polytechnique", summary: "Manager of managers, healthcare tech background.", profile_updated: "2026-05-04", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "F284", first_name: "Daan", full_name: "Daan de Vries", current_role: "Solutions Architect", current_company: "Adyen", years: 8, location: "Amsterdam, Netherlands", skills: ["Payments", "API Design", "Java", "Customer Engineering"], languages: [{ name: "Dutch", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }, { name: "German", proficiency: "Conversational" }], education: "TU Delft, MSc CS", summary: "Architect with a payments background, customer-facing.", profile_updated: "2026-04-30", id_verified: true, education_verified: false, experience_verified: true },
  { anon_id: "G077", first_name: "Eva", full_name: "Eva Lindqvist", current_role: "Machine Learning Engineer", current_company: "Klarna", years: 5, location: "Stockholm, Sweden", skills: ["PyTorch", "Recommender Systems", "MLOps", "Python"], languages: [{ name: "Swedish", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "KTH Royal Institute of Technology", summary: "ML engineer with production recsys experience.", profile_updated: "2026-05-07", id_verified: true, education_verified: true, experience_verified: false },
  { anon_id: "H410", first_name: "Tomás", full_name: "Tomás Costa", current_role: "Senior Product Designer", current_company: "Feedzai", years: 6, location: "Lisbon, Portugal", skills: ["Figma", "Design Systems", "Research", "Prototyping"], languages: [{ name: "Portuguese", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }, { name: "Spanish", proficiency: "Fluent" }], education: "Universidade de Lisboa, BA Design", summary: "Product designer in fintech / fraud space.", profile_updated: "2026-04-22", id_verified: false, education_verified: false, experience_verified: false },
  { anon_id: "I199", first_name: "Marta", full_name: "Marta García", current_role: "Customer Success Manager", current_company: "Factorial", years: 5, location: "Barcelona, Spain", skills: ["B2B SaaS", "Onboarding", "Retention", "HRTech"], languages: [{ name: "Spanish", proficiency: "Native" }, { name: "Catalan", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "ESADE, BBA", summary: "CSM in HR tech, mid-market accounts.", profile_updated: "2026-05-01", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "J554", first_name: "Niklas", full_name: "Niklas Berg", current_role: "Senior Product Manager", current_company: "Spotify", years: 8, location: "Stockholm, Sweden", skills: ["Product Strategy", "Consumer", "Experimentation", "SQL"], languages: [{ name: "Swedish", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "Stockholm School of Economics", summary: "Consumer PM with experimentation rigour.", profile_updated: "2026-05-03", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "K720", first_name: "Ines", full_name: "Ines Schmitt", current_role: "Talent Acquisition Lead", current_company: "Zalando", years: 7, location: "Berlin, Germany", skills: ["Tech Recruiting", "Sourcing", "DEI", "Ops"], languages: [{ name: "German", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "FU Berlin, MA Psychology", summary: "TA lead with strong process and analytics background.", profile_updated: "2026-04-18", id_verified: true, education_verified: true, experience_verified: false },
  { anon_id: "L863", first_name: "Pierre", full_name: "Pierre Moreau", current_role: "Data Engineer", current_company: "BlaBlaCar", years: 5, location: "Paris, France", skills: ["Spark", "dbt", "Snowflake", "Python", "Airflow"], languages: [{ name: "French", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "Télécom Paris", summary: "Data engineer scaling analytics platforms.", profile_updated: "2026-04-25", id_verified: false, education_verified: true, experience_verified: false },
  { anon_id: "M246", first_name: "Hanna", full_name: "Hanna Koskinen", current_role: "Senior UX Researcher", current_company: "Wolt", years: 6, location: "Helsinki, Finland", skills: ["Qualitative", "Quant", "Strategy", "Workshops"], languages: [{ name: "Finnish", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }, { name: "Swedish", proficiency: "Conversational" }], education: "Aalto University, MA HCI", summary: "Senior UXR with mobile and operations research depth.", profile_updated: "2026-05-06", id_verified: true, education_verified: false, experience_verified: true },
  { anon_id: "N512", first_name: "Andrei", full_name: "Andrei Popescu", current_role: "DevOps Engineer", current_company: "UiPath", years: 6, location: "Bucharest, Romania", skills: ["AWS", "Terraform", "Kubernetes", "CI/CD"], languages: [{ name: "Romanian", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "University Politehnica of Bucharest", summary: "Platform engineer, multi-region AWS expertise.", profile_updated: "2026-04-29", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "O339", first_name: "Greta", full_name: "Greta Rossi", current_role: "Brand Marketing Manager", current_company: "Satispay", years: 5, location: "Milan, Italy", skills: ["Brand", "Campaigns", "Content", "Partnerships"], languages: [{ name: "Italian", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "Bocconi, MSc Marketing", summary: "Brand-led marketer with consumer fintech background.", profile_updated: "2026-04-20", id_verified: false, education_verified: true, experience_verified: false },
  { anon_id: "P671", first_name: "Jonas", full_name: "Jonas Becker", current_role: "Senior Backend Engineer", current_company: "Trade Republic", years: 7, location: "Berlin, Germany", skills: ["Kotlin", "AWS", "Event Sourcing", "Microservices"], languages: [{ name: "German", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "KIT Karlsruhe, MSc CS", summary: "Backend engineer in regulated fintech.", profile_updated: "2026-05-05", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "Q094", first_name: "Sara", full_name: "Sara Jensen", current_role: "Director of Product", current_company: "Pleo", years: 11, location: "Copenhagen, Denmark", skills: ["Leadership", "Strategy", "B2B", "Hiring"], languages: [{ name: "Danish", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "CBS Copenhagen, MBA", summary: "Product director with scale-up experience.", profile_updated: "2026-05-08", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "R805", first_name: "Bastien", full_name: "Bastien Garnier", current_role: "Mobile Engineer", current_company: "Qonto", years: 5, location: "Paris, France", skills: ["Swift", "Kotlin", "Mobile Architecture"], languages: [{ name: "French", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "EPITA Paris", summary: "Mobile engineer across iOS and Android.", profile_updated: "2026-04-12", id_verified: false, education_verified: false, experience_verified: false },
  { anon_id: "S418", first_name: "Mira", full_name: "Mira Patel", current_role: "Senior Data Scientist", current_company: "Bolt", years: 6, location: "Tallinn, Estonia", skills: ["Python", "Causal Inference", "Experimentation", "SQL"], languages: [{ name: "English", proficiency: "Native" }, { name: "Estonian", proficiency: "Conversational" }], education: "University of Edinburgh, MSc Stats", summary: "Data scientist focused on marketplace dynamics.", profile_updated: "2026-05-10", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "T263", first_name: "Felix", full_name: "Felix Weber", current_role: "Product Manager", current_company: "GetYourGuide", years: 4, location: "Berlin, Germany", skills: ["Marketplace", "Growth", "SQL", "Discovery"], languages: [{ name: "German", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "WHU Otto Beisheim, MSc Mgmt", summary: "PM in two-sided marketplaces.", profile_updated: "2026-04-26", id_verified: true, education_verified: false, experience_verified: false },
  { anon_id: "U177", first_name: "Aleksandra", full_name: "Aleksandra Wójcik", current_role: "QA Lead", current_company: "DocPlanner", years: 8, location: "Warsaw, Poland", skills: ["Test Strategy", "Automation", "Cypress", "Leadership"], languages: [{ name: "Polish", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "Warsaw University of Technology", summary: "QA lead with healthtech and team scaling experience.", profile_updated: "2026-04-19", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "V552", first_name: "Olivier", full_name: "Olivier Dubois", current_role: "Sales Director", current_company: "Algolia", years: 12, location: "Paris, France", skills: ["Enterprise Sales", "Leadership", "Forecasting", "SaaS"], languages: [{ name: "French", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "HEC Paris, MBA", summary: "Enterprise sales leader, EMEA scope.", profile_updated: "2026-05-01", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "W709", first_name: "Lea", full_name: "Lea Schneider", current_role: "Senior Recruiter", current_company: "Hellofresh", years: 6, location: "Berlin, Germany", skills: ["Tech Recruiting", "Stakeholder Management", "Sourcing"], languages: [{ name: "German", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "Humboldt-Universität zu Berlin", summary: "Recruiter scaling tech orgs.", profile_updated: "2026-04-14", id_verified: false, education_verified: true, experience_verified: false },
  { anon_id: "X836", first_name: "Rasmus", full_name: "Rasmus Holm", current_role: "Engineering Lead", current_company: "Lunar", years: 9, location: "Aarhus, Denmark", skills: ["Leadership", "Go", "Architecture", "Mentoring"], languages: [{ name: "Danish", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "Aarhus University, MSc CS", summary: "Tech lead with banking platform experience.", profile_updated: "2026-05-09", id_verified: true, education_verified: true, experience_verified: true },
  { anon_id: "Y123", first_name: "Chiara", full_name: "Chiara Romano", current_role: "Operations Manager", current_company: "Cortilia", years: 7, location: "Milan, Italy", skills: ["Logistics", "Operations", "Process Design", "S&OP"], languages: [{ name: "Italian", proficiency: "Native" }, { name: "English", proficiency: "Fluent" }], education: "Politecnico di Milano, MSc Mgmt Eng", summary: "Ops manager in food logistics.", profile_updated: "2026-04-16", id_verified: true, education_verified: false, experience_verified: false },
];

function pick<T>(arr: T[], n: number): T[] {
  return arr.slice(0, n);
}

function score(c: Cand, job: any) {
  const reqSkills: string[] = job?.required_skills ?? [];
  const skillOverlap = reqSkills.length
    ? Math.round((c.skills.filter((s) => reqSkills.some((r) => r.toLowerCase() === s.toLowerCase())).length / reqSkills.length) * 100)
    : 75 + Math.floor(Math.random() * 20);
  const expReq = job?.required_experience_years ?? 0;
  const expScore = expReq === 0 ? 85 : Math.min(100, Math.round((c.years / expReq) * 90));
  const locScore = job?.location_city && c.location.toLowerCase().includes((job.location_city ?? "").toLowerCase()) ? 100 : 65 + Math.floor(Math.random() * 25);
  const langScore = 80 + Math.floor(Math.random() * 20);
  const overall = Math.round((skillOverlap * 0.4 + expScore * 0.3 + locScore * 0.15 + langScore * 0.15));
  return { overall: Math.max(55, Math.min(98, overall)), skills: skillOverlap, experience: expScore, location: locScore, language: langScore };
}

function reasoningFor(c: Cand, job: any, s: ReturnType<typeof score>) {
  const top: { kind: "ok" | "warn"; text: string }[] = [];
  const expReq = job?.required_experience_years ?? 0;
  if (expReq) {
    if (c.years >= expReq) top.push({ kind: "ok", text: `${c.years} years experience (required: ${expReq}+)` });
    else top.push({ kind: "warn", text: `${c.years} years experience (required: ${expReq}+)` });
  } else {
    top.push({ kind: "ok", text: `${c.years} years of relevant experience` });
  }
  const langs = c.languages.map((l) => `${l.name} (${l.proficiency})`).join(", ");
  top.push({ kind: "ok", text: `Languages: ${langs}` });
  const reqCity = (job?.location_city ?? "").toLowerCase();
  if (reqCity && !c.location.toLowerCase().includes(reqCity)) {
    top.push({ kind: "warn", text: `Based in ${c.location}, role is ${job.location_city} (commutable, candidate open to hybrid)` });
  } else {
    top.push({ kind: "ok", text: `Based in ${c.location}, matches role location` });
  }

  const detailed = [
    { criterion: "Skills match", score: s.skills, explanation: `Overlap with required skills (${(job?.required_skills ?? []).slice(0, 5).join(", ") || "none specified"}).` },
    { criterion: "Experience", score: s.experience, explanation: `${c.years} years vs requirement of ${expReq || "none"} years.` },
    { criterion: "Location", score: s.location, explanation: `Candidate in ${c.location}; role in ${job?.location_city ?? "unspecified"}.` },
    { criterion: "Language", score: s.language, explanation: `Candidate speaks ${langs}.` },
  ];
  return { top, detailed };
}

export async function generateBatchForJob(jobId: string, opts?: { excludePrevious?: boolean; sizeOverride?: number }) {
  const { data: job } = await supabase.from("jobs").select("*").eq("id", jobId).maybeSingle();
  if (!job) throw new Error("Job not found");

  // Mark old current batches as not current
  await supabase.from("batches").update({ is_current: false }).eq("job_id", jobId).eq("is_current", true);

  // Determine new batch number
  const { data: prev } = await supabase.from("batches").select("batch_number").eq("job_id", jobId).order("batch_number", { ascending: false }).limit(1);
  const batchNumber = ((prev?.[0]?.batch_number as number | undefined) ?? 0) + 1;

  // Insert batch
  const { data: batch, error: batchErr } = await supabase
    .from("batches")
    .insert({ job_id: jobId, batch_number: batchNumber, is_current: true })
    .select()
    .single();
  if (batchErr || !batch) throw batchErr;

  // Exclude already-shown candidates if requested
  let used: string[] = [];
  if (opts?.excludePrevious) {
    const { data: existing } = await supabase.from("recruiter_matches").select("candidate_anon_id").eq("job_id", jobId);
    used = (existing ?? []).map((r: any) => r.candidate_anon_id);
  }

  const size = opts?.sizeOverride ?? job.batch_size ?? 8;
  const available = CANDIDATE_POOL.filter((c) => !used.includes(c.anon_id));
  const pool = available.length >= size ? available : [...available, ...CANDIDATE_POOL.filter((c) => used.includes(c.anon_id))];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const chosen = pick(shuffled, size);

  const rows = chosen.map((c) => {
    const s = score(c, job);
    const r = reasoningFor(c, job, s);
    return {
      job_id: jobId,
      batch_id: batch.id,
      candidate_anon_id: c.anon_id,
      candidate_first_name: c.first_name,
      candidate_full_name: c.full_name,
      candidate_current_role: c.current_role,
      candidate_current_company: c.current_company,
      candidate_years_experience: c.years,
      candidate_location: c.location,
      candidate_skills: c.skills,
      candidate_languages: c.languages,
      candidate_education: c.education,
      candidate_summary: c.summary,
      candidate_profile_updated_at: c.profile_updated,
      candidate_id_verified: c.id_verified,
      candidate_education_verified: c.education_verified,
      candidate_experience_verified: c.experience_verified,
      match_score: s.overall,
      score_skills: s.skills,
      score_experience: s.experience,
      score_location: s.location,
      score_language: s.language,
      reasoning: r.top,
      detailed_reasoning: r.detailed,
      status: "in_batch",
    };
  });
  await supabase.from("recruiter_matches").insert(rows);
  return batch.id as string;
}

export async function logRecruiterAction(
  userId: string,
  action_type: string,
  payload: { company_id?: string; job_id?: string; match_id?: string } & Record<string, any> = {},
) {
  const { company_id, job_id, match_id, ...rest } = payload;
  await supabase.from("recruiter_actions").insert({
    user_id: userId,
    company_id: company_id ?? null,
    job_id: job_id ?? null,
    match_id: match_id ?? null,
    action_type,
    payload: rest,
  });
}
