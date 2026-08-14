# SkillForge AI — Product Requirements Document (PRD)
**For: AI coding agent / developer handoff**
**Project type:** Hackathon MVP (72-hour build)
**Team:** 2-4 members, mixed skill level

---

## 1. One-Line Pitch
An AI-powered career and learning platform where a student uploads their resume, states a career goal in free text, and gets a fully personalized roadmap, skill-gap analysis, project suggestions, and interview prep — all generated live by an LLM, with progress tracked on a dashboard.

## 2. Problem Statement
Students struggle to identify skill gaps, build learning roadmaps, and prepare industry-ready portfolios. Existing platforms give generic, one-size-fits-all recommendations instead of adaptive, personalized guidance.

## 3. Goals for This Build
- Ship a working, demo-able MVP in ~72 hours.
- Every recommendation must be genuinely AI-generated and personalized (no static "if X then Y" logic standing in for AI).
- One feature — the **personalized roadmap** — should be the most polished, highest-effort part of the product. Everything else should be solid but simpler.
- UI should feel premium, interactive, and high-end — not a bare-bones hackathon UI. Micro-interactions matter.

## 4. Explicitly Out of Scope (do not build)
- No real/live course or certification database or search — course/cert names are LLM-generated from its own knowledge.
- No gamification (no streaks, badges, points).
- No predefined career tracks/dropdowns — career goal is 100% free text.
- No admin panel, no multi-tenant/org features, no payments.

---

## 5. Tech Stack (locked — do not deviate)

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Hosting | Vercel |
| Auth | Supabase Auth (email + Google login) |
| Database | Supabase (Postgres) |
| File storage | Supabase Storage (resume uploads) |
| AI | OpenAI API (or Claude API) — used for every "intelligent" feature |
| Styling | Tailwind CSS + shadcn/ui components |
| Animation/micro-interactions | Framer Motion |

**Rationale:** Next.js + Supabase gives one team a single language (TS), no separate backend service to deploy, and auth/DB/storage in one dashboard — minimizing coordination overhead for a mixed-skill hackathon team. Vercel is zero-config with Next.js.

---

## 6. Core User Flow

1. **Sign up / log in** — real auth via Supabase (email or Google).
2. **Onboarding** — user uploads resume (PDF/DOCX) and types their career goal in free text (e.g., *"I want to become a backend developer at a fintech company"*).
3. **Resume parsing** — raw extracted resume text is sent directly to the LLM, which returns structured skills/experience data (no separate parsing library — LLM does the structuring).
4. **Skill gap analysis** — LLM compares extracted skills against the stated goal and identifies gaps.
5. **Personalized roadmap generation** *(flagship feature — most design/dev effort goes here)* — LLM generates a structured, phased/milestone-based roadmap to close the gaps and reach the goal.
6. **Project recommendations** — LLM suggests specific project ideas tied directly to the identified skill gaps.
7. **Interview prep** — LLM generates interview questions (ideally with model answers/talking points) tailored to the goal + resume.
8. **Progress tracking** — user manually checks off roadmap steps as complete.
9. **Dashboard** — charts showing % roadmap complete and skills covered vs. gaps remaining.

---

## 7. Feature Requirements in Detail

### 7.1 Resume Upload & Skill Extraction
- Accept PDF/DOCX upload.
- Extract raw text (library) → send full raw text to LLM.
- LLM returns structured JSON: skills list, experience summary, education, notable projects.
- Store structured result in Supabase, linked to user.

### 7.2 Career Goal Input
- Simple free-text field — no dropdowns, no presets.
- Stored alongside the user's profile; used as context in every downstream AI prompt.

### 7.3 Skill Gap Analysis
- Input: structured resume skills + free-text goal.
- Output: list of gaps (missing skills, weak areas) — LLM-generated, not rule-based.
- Displayed clearly to the user before the roadmap (sets up the "why" behind the roadmap).

### 7.4 Personalized Roadmap (FLAGSHIP FEATURE)
- Input: skill gaps + goal + resume context.
- Output: structured roadmap — phases/milestones, each with concrete steps, suggested resources/topics, and estimated effort.
- **This is the feature to invest the most UI polish and prompt-engineering effort into.** Should feel visually rich (timeline/stepper UI, not a plain bullet list), interactive, and clearly personalized (references the user's actual goal and gaps, not generic advice).
- Roadmap steps must be checkable (see progress tracking).

### 7.5 Project Recommendations
- Input: identified skill gaps.
- Output: LLM-generated specific project ideas designed to close those exact gaps (not generic "build a to-do app" suggestions — tie explicitly to the gap).

### 7.6 Interview Prep
- Input: career goal + resume.
- Output: LLM-generated interview questions relevant to the target role, tailored using resume context.
- Consider including model answers or key talking points per question if time allows.

### 7.7 Progress Tracking & Dashboard
- Manual checkboxes on roadmap steps — no AI re-evaluation needed for MVP.
- Dashboard shows:
  - % of roadmap completed (chart)
  - Skills covered vs. skills still gapped (chart)
- Keep this section clean and minimal — it is not the flagship feature, don't over-invest here.

---

## 8. AI Integration Notes
- All "intelligence" comes from live LLM calls (OpenAI or Claude API) — no static datasets substituting for AI in judged features.
- Known risk: since courses/certs are LLM-generated from its own knowledge (no live search), it may hallucinate outdated or incorrect specific course names/links.
  - **Mitigation to implement:** prompt the LLM to recommend resource *types* (e.g., "an intermediate Udemy course on system design") rather than asserting specific named courses with fake URLs — avoids presenting hallucinated links as fact.
- Every AI-generated output should be structured (JSON) so it can be rendered in clean UI components, not just dumped as raw LLM text.

## 9. Design / UX Requirements
- Visual style: **premium, highly interactive, high-end feel** — this is a stated priority, not a nice-to-have.
- Use micro-interactions throughout (hover states, transitions, animated progress indicators, smooth step reveals on the roadmap) via Framer Motion.
- Avoid a generic/templated hackathon look — invest real design effort, especially on the roadmap view and onboarding flow, since those are what judges will see first and longest.

## 10. Data Model (starting point — adjust as needed)
Suggested Supabase tables:
- `users` (via Supabase Auth)
- `profiles` — user_id, career_goal, resume_file_url, created_at
- `resume_data` — user_id, structured_skills (jsonb), experience_summary, raw_text
- `skill_gaps` — user_id, gaps (jsonb)
- `roadmaps` — user_id, roadmap_json (phases/steps), generated_at
- `roadmap_progress` — user_id, step_id, completed (boolean)
- `project_suggestions` — user_id, suggestions (jsonb)
- `interview_prep` — user_id, questions (jsonb)

## 11. Judging Criteria to Optimize For
Per the problem statement, judges emphasize:
1. **Recommendation quality** — outputs must feel genuinely personalized, not generic. Prompt engineering matters more than UI polish here.
2. **Usability** — flow from upload → goal → roadmap → dashboard must be frictionless.
3. **AI integration** — depth and correctness of LLM use across all features.
4. **Personalization** — every output should visibly reference the user's actual resume/goal, not boilerplate.
5. **Overall UX** — premium feel, micro-interactions, polish (especially on the roadmap view).

## 12. Suggested Team Split (2-4 people)
- 1 person: Frontend UI/UX + Framer Motion micro-interactions
- 1 person: AI prompt engineering + API routes (resume parsing, roadmap gen, projects, interview Q&A)
- 1 person: Supabase (auth, DB schema, storage) + deployment
- 1 person (if available): Dashboard/analytics + QA/polish/demo prep

## 13. Deliverable for Demo
A deployed (Vercel) live URL where a judge can:
1. Sign up
2. Upload a resume + type a goal
3. See skill gaps generated in real time
4. See a polished, personalized roadmap
5. Check off a step and see the dashboard update
6. View project suggestions and interview questions

---
*End of PRD. Any ambiguity not covered here should default to: keep it simple, keep the AI real (not mocked), and put polish into the roadmap feature above all else.*
