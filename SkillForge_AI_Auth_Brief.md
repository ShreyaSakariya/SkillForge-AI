# SkillForge AI — Real Authentication Implementation Brief
**For: AI coding agent / developer handoff — companion to all prior briefs**
**Covers: Replacing the current demo/mock login with real, functional Google OAuth**

---

## 0. The Problem
The current sign-in is a demo/mock — it doesn't create real accounts, doesn't persist real sessions, and isn't tied to real user data. This needs to become a genuinely functional authentication system before this can be called a real product, even for a hackathon demo.

---

## 1. Scope (explicitly locked)

- **Auth method: Google OAuth only.** No email/password signup, no separate password handling, no email verification, no password reset flow — all explicitly out of scope for this build.
- **Provider: Supabase Auth**, already the planned stack (see original PRD) — Supabase has built-in Google OAuth support, so this does not require standing up a separate auth service.
- **Keep a "Try Demo" guest path** alongside real Google auth — this lets judges/testers explore the product instantly without going through OAuth, while real users get a persistent, real account via Google.

---

## 2. Implementation Steps

### 2.1 Supabase + Google Cloud Setup
1. In the Google Cloud Console, create OAuth 2.0 credentials (OAuth Client ID) for a Web application.
2. Add the authorized redirect URI Supabase provides (found in Supabase Dashboard → Authentication → Providers → Google) — this is typically `https://<your-project>.supabase.co/auth/v1/callback`.
3. Copy the Google Client ID and Client Secret into Supabase Dashboard → Authentication → Providers → Google, and enable the provider.
4. No additional API key needs to be added to `.env.local` for this — Supabase handles the OAuth token exchange server-side once configured in its dashboard. Only the existing `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (already required for any Supabase usage) are needed in the app itself.

### 2.2 Frontend Integration
- "Sign In" and "Get Started" buttons (landing page) and any in-app "Sign In" trigger should call Supabase's `signInWithOAuth({ provider: 'google' })`.
- On successful auth, Supabase redirects back to the app with a real session — the app should read this session (via Supabase's client-side session listener or server-side session check) and treat the user as authenticated from that point on.
- Store no custom session logic — rely on Supabase's session management (it handles token refresh automatically).

### 2.3 Protected Routes
- The dashboard and all feature pages (Roadmap, Skill Gaps, Projects, Interview Prep, Settings) must check for a real Supabase session before rendering.
- If no session exists and the user is not in "Try Demo" mode, redirect to the landing page (or a dedicated sign-in prompt) rather than showing the dashboard with empty/broken data.
- Use Supabase's recommended pattern for Next.js (middleware-based session check, or server component session check depending on the App Router setup already in place) — don't hand-roll a custom auth-guard from scratch.

### 2.4 "Try Demo" Guest Path
- A clearly labeled "Try Demo" option (separate from real Google sign-in) lets a user explore the app without authenticating.
- Demo mode should be visibly labeled as such in the UI (e.g. a small badge: "Demo Mode — sign in to save your progress") so it's never confused with a real, persisted account.
- Demo mode data does NOT need to persist to Supabase — it can run against the real AI pipeline (per the Backend Fix Brief and Content Fix Brief — no fake/templated content even in demo mode) but doesn't need a saved user record. Progress/roadmap state can live in local/session state only for demo users.
- Real Google-authenticated users get full persistence — resume, roadmap, progress checkboxes, etc. saved to Supabase tied to their real `user_id`.

### 2.5 Sign Out
- Real users: a working "Sign Out" (already scoped in the Dashboard Redesign Brief's sidebar) calls Supabase's `signOut()` and redirects to the landing page.
- Demo users: "Sign Out" simply clears local demo state and returns to the landing page (no real session to destroy).

---

## 3. What This Does NOT Include (explicitly out of scope)
- Email/password authentication
- Email verification flows
- Password reset / forgot-password flows
- Multi-provider auth (Facebook, GitHub, etc.) — Google only
- Account settings/profile editing beyond what's already in the Dashboard Redesign Brief's profile card

---

## 4. Testing Checklist
- [ ] Clicking "Get Started" or "Sign In" triggers a real Google OAuth popup/redirect, not a mock screen
- [ ] After successful Google sign-in, a real user record exists in Supabase (verify in the Supabase dashboard)
- [ ] Refreshing the page after sign-in keeps the user logged in (real session persistence, not lost on refresh)
- [ ] Visiting a protected route (e.g. `/dashboard`) while logged out redirects to sign-in/landing, not a broken/empty page
- [ ] "Try Demo" works without requiring Google sign-in, and is visibly labeled as demo mode in the UI
- [ ] A real signed-in user's resume upload, roadmap, and progress actually persist across sessions (log out, log back in, data is still there)
- [ ] "Sign Out" actually ends the real Supabase session (not just a UI state change) — verify by checking that a protected route redirects again after sign-out

---
*Companion document to the SkillForge AI PRD, Design Brief, Backend Fix Brief, Content Fix Brief, Dashboard Redesign Brief, and Landing Page Redesign Brief v2 — hand all six to your dev agent together.*
