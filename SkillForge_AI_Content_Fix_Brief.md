# SkillForge AI — Content Genuineness Fix Brief
**For: AI coding agent / developer handoff — companion to the PRD, Design Brief, and Backend Fix Brief**
**Covers: Removing templated/mock content, real course & resource recommendations**

---

## 0. The Evidence

Screenshot proof from the live app: Phase 2/3 roadmap for a "Business Analyst" goal shows:
- Task title: *"Build End-to-End System Pipeline for Business Analyst"*
- Deliverable: *"Multi-service Business Analyst pipeline running in containerized environments"*
- Suggested Resource: *"Designing Business Analyst Production Applications"* (a book)

This is a **generic software-engineering DevOps/pipeline task template** with the string `[Role]` swapped in for "Business Analyst" — a role that has nothing to do with containerization, CI/CD, or system pipelines. Every field (task title, deliverable, "bridges gap" tag, resource title) is a template, not a genuine generation. This confirms: **the roadmap content is not actually AI-personalized for the role — it's a fixed template with find-and-replace.**

This is separate from (and in addition to) the API key / silent-fallback issue already flagged in the Backend Fix Brief. Even once the API key issue is fixed, this templating bug must be independently found and removed, since it may exist as static template data sitting alongside (or instead of) the real API call.

---

## 1. Required: Full Project-Wide Templated Content Audit

Before building the fix, the dev must **find every place in the codebase where roadmap/course/project/interview content is hardcoded, templated, or generated via string interpolation into a fixed template** (e.g. `` `Build End-to-End System Pipeline for ${role}` ``-style code). This includes but is not limited to:
- Roadmap phase titles and descriptions
- Individual step/task titles and descriptions
- "Key Deliverable Artifact" text
- "Bridges Gap" tags
- Suggested learning resources (courses, books)
- Project idea suggestions
- Interview questions
- Any other AI-labeled content anywhere in the app

**For each one found:** either (a) confirm it's a genuine live LLM call and trace why it's still producing templated-feeling output (see Section 3, prompt fix), or (b) if it's actually static/templated data with variable substitution, **remove it entirely** and replace with a real Gemini call.

**Deliverable from this audit:** a short list (even just code comments or a checklist in the PR) of what was found and fixed, so it's verifiable — not just "trust me, I fixed it."

---

## 2. Real Course/Resource Recommendations (Core Fix)

### 2.1 Requirement
Every learning resource recommended anywhere in the app (roadmap steps, dedicated resource lists, etc.) must be a **real, currently-existing course, book, or documentation resource** — not an LLM-invented title, and not a generic template. Both **online courses** (Coursera, Udemy, YouTube, official docs/tutorials, etc.) and **books/official documentation** are acceptable, whichever genuinely fits the specific skill gap best — the type shouldn't be forced, it should match what's actually the best resource for that skill.

### 2.2 How This Gets Built (uses the Tavily integration already planned in the Backend Fix Brief)
1. For each individual skill gap or roadmap step, construct a specific search query — e.g. `"best course to learn [specific skill] 2026"` or `"[specific skill] official documentation"` or `"best book on [specific skill]"` depending on what fits.
2. Call Tavily with that query, retrieve real results: title, URL, and a snippet/description.
3. Pass those real search results into the Gemini prompt as grounding context.
4. Instruct Gemini explicitly: **"Select and summarize a resource ONLY from the search results provided below. Do not invent a course, book, or resource name that is not present in these results."**
5. The final output for each resource should include: **type** (course/book/doc), **real title**, **real clickable URL**, and a short **why-this-fits** note tying it to the user's specific skill gap.
6. If Tavily returns no good results for a given query, the UI should show an honest "No specific resource found — try refining your goal" state rather than falling back to an invented one.

### 2.3 What This Fixes
- Eliminates hallucinated/outdated course names (already flagged as a risk in the original PRD).
- Eliminates the templated-content bug shown in the screenshot, since resources will now be pulled from real, role-specific search results instead of a fixed template.
- Makes resource links actually clickable and real — improves credibility for judges who might click through.

---

## 3. Prompt Fix for Roadmap/Task Content (Not Just Resources)

The task titles and deliverables themselves (not just resources) were shown to be templated too. Apply the same personalization requirements already defined in the Backend Fix Brief (Section 4) here specifically to roadmap phase/step generation:
- The prompt must include the user's actual resume skills + actual stated goal, and require every task title, description, and deliverable to be **logically specific to that role** — e.g. a Business Analyst roadmap should never mention Docker/containerization/CI/CD unless that genuinely came from the user's stated goal or resume.
- Add a self-check instruction in the prompt: *"Before finalizing, verify this step makes sense for someone pursuing [specific goal]. If it reads like generic software engineering content unrelated to the stated goal, revise it."*
- Consider few-shot examples in the prompt showing 2 clearly different roles (e.g. one technical, one non-technical) with correctly differentiated roadmap content, so the model has a concrete pattern to follow rather than defaulting to its most common training pattern (which skews toward software/DevOps content).

---

## 4. Testing Checklist

- [ ] Generate a full roadmap for 3 clearly different goals (e.g. "Business Analyst," "UX Designer," "Backend Engineer") and confirm task titles, deliverables, and resources are **substantively different in content and domain**, not just role-name swapped into the same template
- [ ] Confirm no roadmap step for a non-technical role references unrelated technical concepts (containers, CI/CD, pipelines) unless genuinely relevant
- [ ] Confirm every suggested resource has a real, working URL that matches its stated title
- [ ] Confirm resource types vary appropriately (a hands-on technical skill might get a course; a conceptual/business skill might get a book) rather than defaulting to one type everywhere
- [ ] Spot-check the audit list from Section 1 against the live app to confirm flagged templated sections were actually fixed, not just found

---
*Companion document to the SkillForge AI PRD, Design Brief, and Backend Fix Brief — hand all four to your dev agent together.*
