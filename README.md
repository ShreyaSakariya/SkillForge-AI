# SkillForge AI

**AI-powered career & learning platform** — upload your resume, state your career goal in plain English, and get a fully personalized, AI-generated skill-gap analysis, learning roadmap, project suggestions, and interview prep.

Built for a hackathon (PS-01 | AI + EdTech track).

---

## What It Does

1. **Sign in** with Google (or try it instantly in Demo Mode)
2. **Upload your resume** + type your career goal as free text (e.g. *"I want to become a backend developer at a fintech company"*)
3. Get an AI-generated:
   - **Skill gap analysis** — what's missing between your resume and your goal
   - **Personalized roadmap** — phased, milestone-based learning plan (flagship feature)
   - **Project suggestions** — tied directly to your specific skill gaps
   - **Interview prep** — questions tailored to your goal and resume
4. **Track progress** with manual checkboxes and a dashboard (roadmap %, skills covered, interview readiness score, and more)

Every recommendation is generated live per-user — no templates, no static datasets, no hardcoded fallback content.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Hosting | Vercel |
| Auth | Supabase Auth — Google OAuth only |
| Database | Supabase (Postgres) |
| File storage | Supabase Storage (resume uploads) |
| AI | Google Gemini API (sole AI provider) |
| Web search (for real course/resource data) | Tavily API |
| Styling | Tailwind CSS + shadcn/ui |
| Motion | Framer Motion |

---

## Environment Variables

Create a `.env.local` in the project root (see `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
TAVILY_API_KEY=
```

- `GEMINI_API_KEY` and `TAVILY_API_KEY` are the only two AI-related keys the app uses — by design, to avoid provider confusion.
- Google OAuth itself is configured in the Supabase dashboard (Authentication → Providers → Google), not via an env var — see the Auth brief for setup steps.
- When deploying to Vercel, add the same variables again under Project Settings → Environment Variables (`.env.local` is not picked up automatically in production).
- If `GEMINI_API_KEY` is missing or invalid, the app must show a visible error — it should never silently fall back to fake/generic content.

---

## Project Docs

This repo is spec'd across several companion documents — read them in this order:

1. **`PRD.md`** — product requirements: features, user flow, data model, scope
2. **`Design_Brief.md`** — original visual direction (landing page structure, flagship roadmap treatment)
3. **`Backend_Fix_Brief.md`** — API key setup, error handling, prompt personalization requirements
4. **`Content_Fix_Brief.md`** — zero-templated-text policy, real course/resource sourcing via Tavily
5. **`Dashboard_Redesign_Brief.md`** — dashboard layout/theme (light sage/cream, sidebar nav, stat tiles, chart, gauge, profile card) — **overrides the dark-theme sections of #2**
6. **`Landing_Page_v2_Brief.md`** — landing page redesign (forest-green/lime palette, new headline, honest trust section) — **overrides the color/headline sections of #2**
7. **`Auth_Brief.md`** — real Google OAuth implementation via Supabase, protected routes, Demo Mode

Later documents override earlier ones where they conflict (e.g. the dashboard theme changed from dark to light partway through — always defer to the most recent brief on a given topic).

---

## Core Product Rules (non-negotiable, apply project-wide)

- **No templated text, anywhere.** Every phase, every roadmap step, every recommendation must come from a live Gemini call using the user's actual resume + goal — not a fixed template with the role name swapped in.
- **No silent fallbacks.** A missing/invalid API key or a failed AI call must show a visible error state, never fake or generic data.
- **Real resources only.** Courses, books, and docs recommended anywhere in the app must be real, currently-existing resources with real URLs, sourced via Tavily search — not invented by the LLM from memory.
- **Nothing static in the UI.** Every card, button, chart, and number should have appropriate motion — fade-ins, hover states, animated counters/gauges/charts. A flat, motionless render is treated as unfinished.

---

## Feature Status

| Feature | Status |
|---|---|
| Landing page | In progress — v2 redesign per `Landing_Page_v2_Brief.md` |
| Google OAuth + Demo Mode | In progress — per `Auth_Brief.md` |
| Resume upload + AI parsing | Needs Gemini key verification + audit (see `Backend_Fix_Brief.md`) |
| Skill gap analysis | Needs personalization audit |
| Personalized roadmap (flagship) | Needs templated-content audit (confirmed issue — see `Content_Fix_Brief.md`) |
| Real course/resource recommendations | Needs Tavily integration |
| Project suggestions | Needs templated-content audit |
| Interview prep | Needs templated-content audit |
| Progress tracking (checkboxes) | Built |
| Dashboard redesign | In progress — per `Dashboard_Redesign_Brief.md` |

---

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev
```

---

## Team

Built by a team of 2-4 for a 72-hour hackathon build.
