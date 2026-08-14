# SkillForge AI — Backend & AI Integration Fix Brief
**For: AI coding agent / developer handoff — companion to the PRD and Design Brief**
**Covers: API key setup, why recommendations are broken, and the fix**

---

## 0. Diagnosis: Why Every User Gets the Same/Unrelated Recommendations

The most likely root cause: **the API key is missing, invalid, or not being read correctly**, and the app is silently falling back to hardcoded/mock/placeholder content instead of failing loudly. This is a common pattern when an app is built with placeholder data first and the real API call is never fully wired up (or breaks silently).

Secondary possible cause: even if the API call IS working, the prompt itself may not be forcing the model to use the user's specific resume/goal data — resulting in generic, boilerplate-ish output that feels "the same for everyone" even when technically personalized.

**This brief fixes both.**

---

## 1. Single Provider Decision

**Use Google Gemini — and ONLY Gemini — for all AI generation** (resume parsing, skill gaps, roadmap, project ideas, interview prep). Remove any remaining OpenAI/Claude references or leftover code paths from earlier drafts. One provider, one API key, no ambiguity about which service is being called where.

**For real/current course data:** add **one additional, separate API key** for a web search service (this is on top of the single AI key — you approved a second key specifically for search). Recommended: **Tavily** — it's built specifically for feeding real-time search results into LLMs, has a generous free tier, and is simple to integrate (single API call, returns clean results ready to pass into a prompt). Alternative: SerpAPI, if the dev already has a preference.

So: **2 API keys total** — `GEMINI_API_KEY` and `TAVILY_API_KEY` (or equivalent). Not more.

---

## 2. Where the API Keys Go (explicit instructions for the dev to relay to the user)

1. In the project root, create a file named `.env.local` (Next.js convention — this file is git-ignored by default, so keys never get committed).
2. Add these two lines:
   ```
   GEMINI_API_KEY=your_actual_key_here
   TAVILY_API_KEY=your_actual_key_here
   ```
3. Also commit a `.env.example` file (with placeholder values, no real keys) so anyone cloning the repo knows what's needed:
   ```
   GEMINI_API_KEY=
   TAVILY_API_KEY=
   ```
4. **Never** call these APIs from client-side code with the key exposed — all Gemini/Tavily calls must happen in Next.js API routes or server actions, where `process.env.GEMINI_API_KEY` is only accessible server-side.
5. After deploying to Vercel, the same two keys must be added again in the Vercel project's **Settings → Environment Variables** — `.env.local` is NOT automatically picked up in production deploys.

---

## 3. Required: Loud Failure, Never Silent Fallback

This is the most important fix. Currently the app appears to fail silently and show generic/fake data. Instead:

- On app startup (or on first API call), check that `GEMINI_API_KEY` exists. If not, the relevant feature should show a clear, visible error state — e.g. *"AI features unavailable — API key not configured"* — not a blank success with fake data.
- Wrap every Gemini/Tavily call in proper try/catch. On failure (invalid key, rate limit, network error, malformed response), surface a real error banner/toast to the user: *"Something went wrong generating your roadmap — please try again."*
- **Remove any hardcoded/mock fallback data entirely** from the production code path. If a fallback was used for local development/demo purposes, gate it explicitly behind a `DEMO_MODE` flag that is OFF by default — it should never be able to silently activate in front of a real user or judge.
- Log the actual error server-side (console/logs) so the dev can debug what's failing (bad key vs. quota vs. malformed prompt vs. network) instead of guessing.

---

## 4. Prompt Fixes for Personalization

Even with a working key, prompts need to explicitly force the model to use the specific input data. General principle: **never let the model default to generic advice when specific data is available.**

For every AI call (skill gap analysis, roadmap, project ideas, interview prep), the prompt should:
- Explicitly include the user's actual extracted resume skills and their exact free-text goal in the prompt (not just "a resume was uploaded" — the actual content).
- Include an explicit instruction such as: *"You must reference at least 2-3 specific skills or experiences from the resume provided below, and tie every recommendation directly to the stated goal. Do not give generic industry-standard advice that could apply to any user — if your output could apply to someone with a completely different resume or goal, revise it."*
- For structured outputs (roadmap, project ideas), request JSON output with a schema that includes a `"personalization_note"` or similar field explaining *why* this specific recommendation fits *this* user — this forces the model to actually reason about the connection rather than pattern-matching to generic advice.
- Set temperature moderately (e.g. 0.7-0.9) — too low can make output feel repetitive/templated across different users; too high risks incoherence. Test a few values.

---

## 5. Web Search Integration for Course/Certification Recommendations

Replace pure LLM-knowledge course suggestions with a search-grounded approach:

1. After skill gaps are identified, construct search queries per gap (e.g. `"best online course [specific skill] 2026"`).
2. Call Tavily (or chosen search API) with that query, get back real, current results (titles, URLs, snippets).
3. Pass those real search results into the Gemini prompt as context, and instruct Gemini to select/summarize from the **provided real results only** — not to invent course names.
4. Display the real course name + real URL in the UI (this also solves the earlier hallucinated-link risk noted in the PRD).

This directly fixes "always the same or unrelated courses" — results will now reflect live, real course data tied to the specific skill gap, not the model's static training-data guesses.

---

## 6. Testing Checklist Before Calling This Fixed

- [ ] Remove `.env.local` temporarily → confirm app shows a clear error, not fake data
- [ ] Add a valid key → confirm real Gemini calls succeed (check server logs for actual API responses, not assumed success)
- [ ] Test with 3 clearly different resumes + 3 clearly different career goals → confirm the skill gaps, roadmap, projects, and interview questions are **substantially different** across all three, and each output references specifics from that user's actual input
- [ ] Confirm course/cert recommendations include real, clickable URLs from live search results, not just text names
- [ ] Force an API error (e.g. temporarily invalid key) → confirm the user sees a real error state, not a silent fallback

---

## 7. Note on UI/Dashboard Redesign
A separate, more detailed UI update (targeting a simpler/sleeker, less heavy-dark theme with expanded Framer Motion interactions) is coming once the specific inspiration reference is shared — this brief covers only the backend/AI fixes. Treat this brief and the upcoming UI update as independent workstreams; the AI fixes here should not wait on the UI decisions.

---
*Companion document to the SkillForge AI PRD and Design Brief — hand all three to your dev agent together.*