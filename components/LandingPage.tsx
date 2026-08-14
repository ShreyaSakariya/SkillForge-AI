'use client';

import React from 'react';
import {
  BrainCircuit,
  Milestone,
  Target,
  Code2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Terminal,
  Cpu,
  Layers,
  FileText,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onOpenAuth
}) => {
  return (
    <div className="min-h-screen bg-[#F3F2ED] text-[#1B3B2F] font-sans selection:bg-[#C9F31D] selection:text-[#1B3B2F] overflow-x-hidden">
      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#1B3B2F]/10 bg-[#F3F2ED]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          {/* Logo Mark */}
          <div
            onClick={onGetStarted}
            className="flex cursor-pointer items-center gap-3 group"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1B3B2F] p-0.5 shadow-md transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#1B3B2F]">
                <BrainCircuit className="h-6 w-6 text-[#C9F31D]" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#1B3B2F] font-display">
                SkillForge<span className="text-[#1B3B2F]"> AI</span>
              </span>
              <p className="text-[10px] text-[#4A4F49] font-medium hidden sm:block">
                Next-Gen Career Intelligence
              </p>
            </div>
          </div>

          {/* Center Links (Plain links, no dropdowns) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-[#4A4F49]">
            <a href="#how-it-works" className="hover:text-[#1B3B2F] transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-[#1B3B2F] transition-colors">
              Features
            </a>
            <a href="#career-paths" className="hover:text-[#1B3B2F] transition-colors">
              Career Paths
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="rounded-xl px-4 py-2 text-xs font-bold text-[#1B3B2F] hover:bg-[#1B3B2F]/5 transition"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 rounded-xl bg-[#1B3B2F] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#254F40] active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#C9F31D]" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 bg-grid-pattern">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 relative z-10">
          {/* Small Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1B3B2F]/20 bg-white px-4 py-1.5 text-xs font-bold text-[#1B3B2F] shadow-2xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#C9F31D] animate-pulse" />
            <span>Next-Gen Career Intelligence Engine</span>
          </motion.div>

          {/* Large Bold Headline with Lime Accent Underline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-[#1B3B2F] sm:text-6xl font-display leading-[1.1]"
          >
            Your resume, your goal, your roadmap —{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">built by AI</span>
              <span className="absolute left-0 bottom-1.5 h-3 w-full bg-[#C9F31D] -z-0 rounded-xs" />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-[#4A4F49] sm:text-lg font-medium leading-relaxed"
          >
            Stop guessing. Let AI analyze your experience, identify your exact skill gaps, and generate a bespoke milestone roadmap to land your dream role.
          </motion.p>

          {/* Dual CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={onGetStarted}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#1B3B2F] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#254F40] active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4 text-[#C9F31D]" />
            </button>

            <button
              onClick={onOpenAuth}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border-2 border-[#1B3B2F] bg-white px-8 py-3.5 text-sm font-bold text-[#1B3B2F] shadow-xs transition hover:bg-[#FAFAF7] active:scale-95"
            >
              <span>Sign In</span>
            </button>
          </motion.div>
        </div>

        {/* FLOATING DECORATIVE FEATURE BADGES (SECTION 3.3 OF BRIEF) */}
        {/* Upper Left: Resume Badge */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:flex absolute top-24 left-12 z-20 items-center gap-3 rounded-2xl border border-[#1B3B2F]/15 bg-white p-3.5 shadow-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3B2F] text-[#C9F31D]">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1B3B2F]">Resume Parsing</div>
            <div className="text-[10px] text-[#4A4F49]">Extracts key capabilities</div>
          </div>
        </motion.div>

        {/* Upper Right: Roadmap Badge */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="hidden lg:flex absolute top-28 right-12 z-20 items-center gap-3 rounded-2xl border border-[#1B3B2F]/15 bg-white p-3.5 shadow-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3B2F] text-[#C9F31D]">
            <Milestone className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1B3B2F]">Bespoke Roadmap</div>
            <div className="text-[10px] text-[#4A4F49]">Phased weekly milestones</div>
          </div>
        </motion.div>

        {/* Lower Left: Skill Gap Badge */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="hidden lg:flex absolute bottom-12 left-20 z-20 items-center gap-3 rounded-2xl border border-[#1B3B2F]/15 bg-white p-3.5 shadow-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3B2F] text-[#C9F31D]">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1B3B2F]">Skill Gap Analysis</div>
            <div className="text-[10px] text-[#4A4F49]">Target role match %</div>
          </div>
        </motion.div>

        {/* Lower Right: Interview Prep Badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="hidden lg:flex absolute bottom-16 right-20 z-20 items-center gap-3 rounded-2xl border border-[#1B3B2F]/15 bg-white p-3.5 shadow-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3B2F] text-[#C9F31D]">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1B3B2F]">Interview Q&A</div>
            <div className="text-[10px] text-[#4A4F49]">Tailored model answers</div>
          </div>
        </motion.div>
      </section>

      {/* TRUST / PROOF SECTION (SECTION 4 OF BRIEF: "BUILT FOR EVERY CAREER PATH") */}
      <section id="career-paths" className="py-12 border-y border-[#1B3B2F]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#4A4F49] uppercase tracking-wider">
              Built for every career path
            </span>
          </div>

          {/* Role/Industry Icon Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            <div className="flex items-center gap-3 rounded-2xl border border-[#1B3B2F]/10 bg-[#FAFAF7] p-4 transition hover:border-[#1B3B2F]/30">
              <Code2 className="h-5 w-5 text-[#1B3B2F]" />
              <span className="text-xs font-bold text-[#1B3B2F]">Software Engineering</span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#1B3B2F]/10 bg-[#FAFAF7] p-4 transition hover:border-[#1B3B2F]/30">
              <Cpu className="h-5 w-5 text-[#1B3B2F]" />
              <span className="text-xs font-bold text-[#1B3B2F]">Data Science & AI</span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#1B3B2F]/10 bg-[#FAFAF7] p-4 transition hover:border-[#1B3B2F]/30">
              <Layers className="h-5 w-5 text-[#1B3B2F]" />
              <span className="text-xs font-bold text-[#1B3B2F]">Product & Design</span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#1B3B2F]/10 bg-[#FAFAF7] p-4 transition hover:border-[#1B3B2F]/30">
              <Terminal className="h-5 w-5 text-[#1B3B2F]" />
              <span className="text-xs font-bold text-[#1B3B2F]">DevOps & Cloud</span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#1B3B2F]/10 bg-[#FAFAF7] p-4 transition hover:border-[#1B3B2F]/30">
              <ShieldCheck className="h-5 w-5 text-[#1B3B2F]" />
              <span className="text-xs font-bold text-[#1B3B2F]">Systems Architecture</span>
            </div>
          </div>

          {/* Honest Metric Highlights */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 text-center border-t border-[#1B3B2F]/10 pt-8">
            <div>
              <div className="text-3xl font-black text-[#1B3B2F] font-display">4 AI Engines</div>
              <div className="text-xs text-[#4A4F49] font-medium mt-1">Roadmap, Gaps, Projects, Interview Q&A</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#1B3B2F] font-display">&lt; 1 Minute</div>
              <div className="text-xs text-[#4A4F49] font-medium mt-1">Real-time bespoke roadmap generation</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#1B3B2F] font-display">100% Bespoke</div>
              <div className="text-xs text-[#4A4F49] font-medium mt-1">Tailored to your specific resume & target role</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-[#1B3B2F] px-3.5 py-1 text-xs font-bold text-[#C9F31D]">
              Streamlined Process
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#1B3B2F] sm:text-4xl font-display">
              How SkillForge AI Works
            </h2>
            <p className="mt-2 text-xs text-[#4A4F49] sm:text-sm font-medium">
              Transform your raw experience into a concrete career execution strategy in four simple steps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="rounded-3xl border border-[#1B3B2F]/10 bg-white p-6 shadow-2xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3B2F] text-[#C9F31D] text-lg font-black font-display">
                01
              </div>
              <h3 className="text-lg font-bold text-[#1B3B2F] font-display">Upload Experience</h3>
              <p className="text-xs text-[#4A4F49] leading-relaxed font-medium">
                Paste or upload your raw resume. SkillForge extracts your programming languages, frameworks, tools, and experience level.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl border border-[#1B3B2F]/10 bg-white p-6 shadow-2xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3B2F] text-[#C9F31D] text-lg font-black font-display">
                02
              </div>
              <h3 className="text-lg font-bold text-[#1B3B2F] font-display">State Career Goal</h3>
              <p className="text-xs text-[#4A4F49] leading-relaxed font-medium">
                Specify your desired role (e.g., Senior Full-Stack Engineer, AI Researcher, Lead Architect).
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl border border-[#1B3B2F]/10 bg-white p-6 shadow-2xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3B2F] text-[#C9F31D] text-lg font-black font-display">
                03
              </div>
              <h3 className="text-lg font-bold text-[#1B3B2F] font-display">AI Deep Synthesis</h3>
              <p className="text-xs text-[#4A4F49] leading-relaxed font-medium">
                Our multi-agent AI synthesizes market requirements, evaluates competency gaps, and designs your optimal path.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-3xl border border-[#1B3B2F]/10 bg-white p-6 shadow-2xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3B2F] text-[#C9F31D] text-lg font-black font-display">
                04
              </div>
              <h3 className="text-lg font-bold text-[#1B3B2F] font-display">Execute & Track</h3>
              <p className="text-xs text-[#4A4F49] leading-relaxed font-medium">
                Follow your phased milestone timeline, build targeted portfolio projects, and practice tailored interview questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 sm:py-28 bg-white border-t border-[#1B3B2F]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-[#E3EDE6] px-3.5 py-1 text-xs font-bold text-[#1B3B2F]">
              Comprehensive Suite
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#1B3B2F] sm:text-4xl font-display">
              Four Core Career Engines
            </h2>
            <p className="mt-2 text-xs text-[#4A4F49] sm:text-sm font-medium">
              Everything you need to systematically upgrade your skill set and ace technical interviews.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Feature 1 */}
            <div className="rounded-3xl border border-[#1B3B2F]/15 bg-[#FAFAF7] p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3B2F] text-[#C9F31D] mb-6">
                <Milestone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1B3B2F] font-display">
                Milestone Learning Roadmap
              </h3>
              <p className="mt-2 text-xs text-[#4A4F49] sm:text-sm leading-relaxed font-medium">
                Phased weekly timelines detailing specific topics, deliverables, and estimated hours required to bridge identified gaps.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-xs text-[#1B3B2F] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#1B3B2F]" />
                  <span>Phased week-by-week progress</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#1B3B2F] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#1B3B2F]" />
                  <span>Interactive step completion checkboxes</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="rounded-3xl border border-[#1B3B2F]/15 bg-[#FAFAF7] p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3B2F] text-[#C9F31D] mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1B3B2F] font-display">
                Skill Gap Matrix
              </h3>
              <p className="mt-2 text-xs text-[#4A4F49] sm:text-sm leading-relaxed font-medium">
                Deep competency evaluation comparing your current skill level against hiring target requirements with clear priority tags.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-xs text-[#1B3B2F] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#1B3B2F]" />
                  <span>Role match percentage score</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#1B3B2F] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#1B3B2F]" />
                  <span>Critical, High & Medium priority tagging</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="rounded-3xl border border-[#1B3B2F]/15 bg-[#FAFAF7] p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3B2F] text-[#C9F31D] mb-6">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1B3B2F] font-display">
                Portfolio Project Blueprints
              </h3>
              <p className="mt-2 text-xs text-[#4A4F49] sm:text-sm leading-relaxed font-medium">
                Targeted project ideas designed specifically to bridge your gaps, complete with architecture overview, tech stack, and stretch goals.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-xs text-[#1B3B2F] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#1B3B2F]" />
                  <span>Architectural design specs</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#1B3B2F] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#1B3B2F]" />
                  <span>High-impact stretch feature ideas</span>
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="rounded-3xl border border-[#1B3B2F]/15 bg-[#FAFAF7] p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3B2F] text-[#C9F31D] mb-6">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1B3B2F] font-display">
                Interview Readiness Strategy
              </h3>
              <p className="mt-2 text-xs text-[#4A4F49] sm:text-sm leading-relaxed font-medium">
                High-frequency technical and behavioral questions tailored to your background, complete with model answers and must-hit talking points.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-xs text-[#1B3B2F] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#1B3B2F]" />
                  <span>Interviewer intent & context breakdown</span>
                </li>
                <li className="flex items-center gap-2 text-xs text-[#1B3B2F] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#1B3B2F]" />
                  <span>Practice mode tracking & score gauge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 sm:py-24 bg-[#1B3B2F] text-white text-center relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-[#C9F31D]">
            <Sparkles className="h-4 w-4" />
            <span>Ready to accelerate your career?</span>
          </div>

          <h2 className="text-3xl font-black sm:text-5xl font-display leading-tight">
            Build your personalized career roadmap in under 60 seconds.
          </h2>

          <p className="mx-auto max-w-xl text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
            No guess work. No generic advice. Get live AI analysis engineered for your exact target role.
          </p>

          <div className="pt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onGetStarted}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#C9F31D] px-8 py-4 text-sm font-bold text-[#1B3B2F] shadow-lg transition hover:bg-[#b5dc18] active:scale-95"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4 text-[#1B3B2F]" />
            </button>

            <button
              onClick={onOpenAuth}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-white/10 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition active:scale-95"
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1B3B2F]/10 bg-[#F3F2ED] py-8 text-center text-xs text-[#4A4F49] font-medium">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-[#1B3B2F]" />
            <span className="font-bold text-[#1B3B2F] font-display">SkillForge AI</span>
          </div>
          <p>© {new Date().getFullYear()} SkillForge AI — Personalized Career & Learning Engine</p>
        </div>
      </footer>
    </div>
  );
};
