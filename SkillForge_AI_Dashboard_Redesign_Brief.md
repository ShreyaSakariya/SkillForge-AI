# SkillForge AI — Dashboard Redesign Brief (Dribbble Inspo Extraction)
**For: AI coding agent / developer handoff — companion to the PRD, Design Brief, Backend Fix Brief, and Content Fix Brief**
**Covers: Full dashboard visual/layout overhaul based on inspo reference**
**Supersedes:** the dark-theme dashboard direction in the earlier Design Brief. The dashboard is now **light-themed**, matching the landing page — the app is no longer dual-themed (light landing / dark app). Everything is light now.

---

## 0. Source of Truth
Inspiration: a light, calm finance-dashboard UI (cream background, sage-green accents, soft rounded cards, generous whitespace, mixed card-size grid, left icon sidebar). Every element below is extracted directly from that reference and mapped to SkillForge's actual data — nothing here is invented filler.

---

## 1. Color Palette (replaces dark palette from the earlier Design Brief)

| Role | Value | Notes |
|---|---|---|
| Page background | `#EDEDE7` (soft warm cream/gray) | Matches inspo's neutral canvas |
| Card surface | `#FFFFFF` | Clean white cards on the cream base |
| Primary accent | `#4A6B5A` (sage/forest green) | Replaces the finance app's green — this becomes SkillForge's primary UI accent for charts, progress, buttons |
| Secondary accent (highlight card) | Deep sage gradient (`#3D5A4A` → `#5A7D69`) | Used for the one "hero" stat tile (inspo's dark green "Activity" tile) |
| Positive/increase badge | `#4A6B5A` on pale green `#E3EDE6` | e.g. "+2.45%"-style badges |
| Negative/decrease badge | `#C0564A` on pale red `#F5E4E1` | e.g. "-4.75%"-style badges |
| Headline text | `#1F2420` (near-black, warm tone) | |
| Body/muted text | `#7A8079` | |

**Reconciling with brand identity:** the earlier violet/cyan/amber brand gradient from the landing page brief should stay ONLY on the landing page. The dashboard adopts this new sage/cream system as its own distinct "in-product" identity — similar to how many products use a bold marketing palette on the landing page and a calmer, more functional palette in the actual app. Keep the logo mark consistent across both (it can sit on either background).

---

## 2. Navigation: Left Icon Sidebar (replaces top tab bar)

- Vertical sidebar, icon-only (with tooltips on hover), fixed left edge, full height, white or very light background, subtle right border.
- Icons top to bottom, mapped to SkillForge sections:
  1. **Dashboard/Home** (grid icon) — overview page (this redesign spec)
  2. **Roadmap** (map/route icon) — the flagship feature
  3. **Skill Gaps** (target icon)
  4. **Projects** (code/folder icon)
  5. **Interview Prep** (chat/message icon)
  6. *(spacer)*
  7. **Settings** (gear icon) — bottom-anchored
  8. **Sign out** (exit icon) — bottom-anchored
  9. **User avatar** (bottom-most) — click opens profile/account
- Top brand mark (SkillForge logo, small) sits above the nav icons, matching current logo treatment.
- Active section gets a filled/dark circular background behind its icon (as in inspo).

---

## 3. Header

- Greeting: **"Hello, [First Name]!"** — large, friendly, using the display font from the earlier Design Brief.
- Subtext: **"Track your progress toward [career goal]"** (dynamically pulls the user's actual stated goal — ties back to the Content Fix Brief's personalization requirement, not a generic subtitle).
- Right side: search bar (optional — can be scoped out if not needed for MVP), a notifications bell, and the user avatar/menu trigger.

---

## 4. Section: Quick-Stat Tiles (top row, 4 cards)

Mirrors the inspo's 4 small tiles (3 white + 1 dark "hero" tile). Order and content:

1. **Roadmap Progress** — large %, small sparkline/bar visual (mirrors "Spent this month" tile with its mini bar chart)
2. **Skills Covered** — count (e.g. "12 of 18"), small upward trend line (mirrors "New clients" tile)
3. **Goal Match Score** — %, small icon (mirrors "Earnings" tile with its icon)
4. **Days Active** (the dark "hero" tile, sage-gradient fill, white text) — streak-style count with a small trend sparkline (mirrors the "Activity" tile treatment — this is the one visually distinct/bold tile in the row)

Each tile: label (small, muted) → big number (bold) → small supporting visual. Keep consistent padding/radius across all four.

---

## 5. Section: Big Chart Card — "Roadmap Progress Over Time"

- Mirrors the inspo's "Balance" card: large card, title top-left, a small filter/dropdown top-right (e.g. "Weekly / Monthly" toggle), two inline mini-stats above the chart (mirrors "Saves 43.50%" / "Balance $52,422" — ours: e.g. **"Steps Completed"** + **"Est. Time Remaining"**), then a smooth line/area chart below showing roadmap completion % trending over time.
- Use the sage primary accent for the line, soft gradient fill underneath (matches inspo's soft wave-fill treatment).
- Status pill next to the card title (inspo: "On track" with checkmark) — ours: same pattern, e.g. "On Track" / "Behind Schedule" based on actual pace vs. roadmap timeline.

---

## 6. Section: Hero Gauge Card — "Interview Readiness Score"

- Mirrors the inspo's "Earnings" gauge card: title top, one supporting stat line (mirrors "Total Expense $6078.76" — ours: e.g. "Questions Practiced: 14"), one-line insight text (mirrors "Profit is 34% more than last month" — ours: e.g. "Up 12% since last week"), then the large semi-circular gauge with the score in the center (e.g. "72%").
- Gauge fill uses the sage primary accent; unfilled portion in pale gray.

---

## 7. Section: Profile Card

- Mirrors the inspo's profile card exactly in structure: avatar (top, circular), name (bold, large), email (muted, below name), then a 3-column stat row at the bottom.
- Our 3 stats: **Projects Built**, **Skills Gained**, **Certifications/Resources Completed** — each with a bold number and small label, matching the inspo's Projects/Followers/Following layout.

---

## 8. Section: Decorative "Resource Stack" Card (replaces inspo's credit-card wallet)

- Mirrors the inspo's "Available Credit Card in Wallet" card structure: left side has a heading ("Your Earned Resources" or similar) + short supporting line + a CTA button; right side has a layered/stacked 3D-style visual.
- Instead of stacked credit cards, illustrate a **stack of layered "certificate/resource" cards** — e.g. simplified card shapes representing completed courses/resources, fanned/stacked at an angle with soft shadows, same visual treatment (semi-transparent top layers, solid bottom layer) as the inspo.
- CTA button: e.g. **"View All Resources"** (replaces "Add New Card").

---

## 9. Section: Recent Activity List (replaces inspo's "Your Transfers")

- Same list structure as inspo: card title top ("Recent Recommendations"), then 3 rows, each with a bold primary line, a muted timestamp/subtext line, and a right-aligned badge.
- Content: **recent AI-generated recommendations** — e.g. "New project suggested: Build a REST API rate limiter" / "New course found: ..." — each row's right badge could show a small tag like "New" or a relevance indicator instead of the inspo's +/-% (that specific badge style doesn't map — use a simple colored tag instead, e.g. "Project" / "Course" / "Interview Q" tag per row to indicate recommendation type).

---

## 10. What Gets Dropped From the Inspo
- The "Keep you safe / Update your security" CTA card has **no equivalent** in SkillForge and should be dropped entirely — do not force a replacement into that grid slot. Adjust the grid layout to remain balanced with 8 cards instead of 9 (e.g. let the Recent Activity or Profile card span slightly wider to fill the space, or move to a cleaner 2-column-plus-sidebar-cards layout — dev's call based on what looks balanced).

---

## 11. Motion — Zero Static Elements Policy

This is a hard requirement, same weight as the "zero templated text" policy in the Content Fix Brief: **nothing in this dashboard should feel static.** Every element that reasonably can move, respond, or transition must do so — a flat, motionless render is treated as unfinished, not acceptable-but-plain. Use Framer Motion throughout. Specifically:

- **On page load:** every card fades + lifts in with a staggered delay (not all at once) — sidebar icons, header, stat tiles, chart card, gauge, profile card, resource-stack card, activity list should each animate in sequentially, giving the whole dashboard a "assembling" feel rather than popping in as a static block.
- **Stat tile numbers:** count up from 0 to their real value on load (e.g. Roadmap Progress ticks up to its %, Days Active ticks up to its count) — never just appear as a static final number.
- **Gauge (Interview Readiness Score):** the arc fills from empty to its value with an eased animation, not a snap.
- **Big chart (Roadmap Progress line):** the line/area draws in on load (path animation), not a static pre-rendered chart image.
- **Every card, everywhere:** hover state = subtle lift (translateY) + soft shadow increase + slight border/accent brighten. No card should look identical in resting vs. hover state.
- **Sidebar icons:** smooth background-fill transition on hover and on active-state change (not an instant snap between states); active icon indicator should slide/morph into position when switching sections, not jump.
- **Buttons (e.g. "View All Resources," CTA buttons):** hover = fill/gradient shift + slight scale; click = brief press-down/pop feedback.
- **Recent Activity list rows:** each row fades/slides in individually (staggered), and gets a subtle hover highlight per row.
- **Resource-stack card:** the layered cards can have a subtle idle float/parallax on mouse move for extra polish, matching the inspo's tactile, dimensional feel — optional but encouraged if time allows.
- **Roadmap page carryover:** progress ring, timeline dots, and step "Mark Done" interactions (already specified in the original Design Brief) must follow this same zero-static standard — re-verify they weren't left flat during the light-theme re-skin.
- **Rendering quality bar:** animations must be smooth (60fps-targeted, no jank) — prefer GPU-friendly properties (transform, opacity) over layout-triggering properties (width, top/left) for all motion work, and test on a mid-range device/throttled CPU before considering this section done.

---

## 12. What Stays the Same
- All underlying features, data, and AI-generation requirements from the PRD, Backend Fix Brief, and Content Fix Brief are unchanged — this is purely a visual/layout redesign of the dashboard shell around that same real data.
- The Roadmap page itself (the flagship feature, with phases/steps/timeline) is a separate view from this dashboard/overview page — apply the same light sage/cream palette and card style there too, but its detailed layout (phase timeline, step cards) from the original Design Brief still applies structurally; just re-skin it in this new light palette instead of the old dark one.

---
*Companion document to the SkillForge AI PRD, Design Brief, Backend Fix Brief, and Content Fix Brief — hand all five to your dev agent together. This document's palette/theme decisions override the dark-theme sections of the original Design Brief.*
