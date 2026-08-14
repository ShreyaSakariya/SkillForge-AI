# SkillForge AI — Landing Page Redesign Brief v2 (Clause Inspo)
**For: AI coding agent / developer handoff — companion to all prior briefs**
**Supersedes:** the landing page color palette and headline copy from the original Design Brief. Layout structure (sections order, hero-mockup-as-visual concept) from that brief still applies unless noted otherwise below.

---

## 0. Source of Truth
Inspiration: a SaaS landing page (dark-green/cream, minimal nav, grid-pattern background, bold underlined headline, floating decorative circular elements around the hero text, dual CTA buttons, trust bar). Every element below is extracted from that reference and adapted to fit decisions already locked (no fake social proof, no dropdown nav, feature-based visuals instead of fake people photos).

---

## 1. Color Palette (replaces the violet/amber palette from the original Design Brief)

| Role | Value | Notes |
|---|---|---|
| Background | `#F3F2ED` (warm off-white/cream) | Matches inspo's neutral canvas |
| Primary (headline, buttons, nav accents) | `#1B3B2F` (deep forest green) | Replaces the violet/amber primary |
| Accent (underline highlight, small pops) | `#C9F31D` (lime/chartreuse) | Used sparingly — headline underline, tiny accent details only, never as a large fill |
| Secondary button | White fill, `#1B3B2F` border + text | Matches inspo's outlined "Get a Demo"-style button |
| Body text | `#4A4F49` (warm gray-green) | |
| Card/section backgrounds | White or very pale cream (`#FAFAF7`) | For section breaks / feature cards |

**Note:** this is a full palette swap for the landing page only. It does not affect the dashboard's sage/cream system (already locked in the Dashboard Redesign Brief) — the two are visually distinct systems by design (marketing page vs. in-product), which is a common and acceptable pattern.

---

## 2. Navigation
- Flat, simple nav — **no dropdown menus** (already decided against the inspo's Solutions/Customers dropdowns).
- Left: logo mark + wordmark.
- Center/right: **How It Works**, **Features** (plain links, no dropdowns).
- Far right: **Sign In** (text/ghost button) + **Get Started** (filled forest-green button) — matches inspo's Log In / Start Now pairing.

---

## 3. Hero Section

### 3.1 Layout (from inspo)
- Small pill badge above the headline (already exists — reuse "Next-Gen Career Intelligence Engine" or similar, styled in the new green/lime palette).
- Large, bold, centered headline — **one word or short phrase underlined** in the lime accent color (matches inspo's underline-on-"manage" treatment).
- Subheading below: one to two sentences, plain language, matches inspo's direct explanatory tone.
- Two CTA buttons, centered: **"Get Started"** (filled, primary) + **"Sign In"** (outlined/secondary) — per your decision, these replace the inspo's "Start for Free" / "Get a Demo" since we have no demo to book.
- Grid-pattern background behind the whole hero (subtle, low-contrast lines — decorative texture, not a functional grid).

### 3.2 New Headline Copy
Write 2-3 real options in this more direct tone (dev/copywriter should pick or refine at build time — do not just reuse the old headline):
- *"One tool to plan your career and land the job."* (direct adaptation of inspo's structure)
- *"Stop guessing. Start building your career."*
- *"Your resume, your goal, your roadmap — built by AI."*

Underline the emotionally key word/phrase (e.g. underline "land the job," "your roadmap," etc., depending on which headline is chosen) in the lime accent, exactly matching the inspo's single-underline treatment.

### 3.3 Floating Decorative Elements (replaces inspo's floating people photos)
- Per your decision: **replace circular people-photos with circular icon/illustration badges** representing core app features — one for Resume, one for Roadmap, one for Skill Gaps, one for Interview Prep.
- Same visual treatment as inspo: circular frame, soft shadow, small directional arrow/pointer accent next to each, positioned floating around the headline (two upper corners, two lower corners).
- These are purely decorative/thematic — not testimonials, not implying real users, consistent with the no-fake-social-proof rule.
- Apply the same subtle scroll/idle motion as the rest of the site (gentle float/parallax) — ties into the broader "nothing static" motion requirement already established for the dashboard; apply the same principle here.

---

## 4. Trust/Proof Section (replaces inspo's "100+ companies" logo bar)

Per your decision: **no fake company logos.** Replace with an honest equivalent:
- Headline: *"Built for every career path"*
- A row of role/industry icons (not company logos) — e.g. icons representing Software Engineering, Design, Business/Analytics, Marketing, Data — communicating breadth of applicability without fabricating adoption numbers or specific company partnerships.
- Optionally pair with one honest stat already approved in the original Design Brief's stats section (e.g. "4 AI-powered features," "Personalized in under a minute") if it fits naturally near this section — don't duplicate the dedicated stats section, just keep tone consistent.

---

## 5. Remaining Sections (unchanged from original Design Brief, re-skinned in new palette)
- **How It Works** — same 3-4 step structure, re-skinned in forest-green/cream.
- **Features** — same 4-card grid, re-skinned.
- **Stats/Proof section** — same honest stats approach as originally specified, re-skinned.
- **Final CTA** — same structure, re-skinned, buttons matching the new "Get Started" / "Sign In" pairing.
- **Footer** — same minimal structure, re-skinned.

---

## 6. Motion
Same standard as the rest of the app (see Dashboard Redesign Brief Section 11 — "Zero Static Elements Policy"): scroll-triggered fade/slide-ins per section, hover lift on buttons/cards, floating decorative badges should have subtle idle motion, nothing on this page should render as a flat static block.

---
*Companion document to the SkillForge AI PRD, Design Brief, Backend Fix Brief, Content Fix Brief, and Dashboard Redesign Brief. This document overrides the landing-page color/headline sections of the original Design Brief; all other prior decisions (sections order, hero-as-product-mockup concept, no functional interactive widget) remain in effect.*
