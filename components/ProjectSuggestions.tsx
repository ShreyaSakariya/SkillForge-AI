'use client';

import React from 'react';
import { ProjectSuggestion } from '@/types/skillforge';
import { Target, Cpu, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectSuggestionsProps {
  projects: ProjectSuggestion[];
}

export const ProjectSuggestionsView: React.FC<ProjectSuggestionsProps> = ({ projects }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header Banner */}
      <div className="card-sage-surface rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#4A6B5A]">
          <Sparkles className="h-4 w-4" />
          <span>Gap-Targeted Portfolio Builder</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-[#1F2420] sm:text-3xl font-display">
          AI Portfolio Project Recommendations
        </h2>
        <p className="mt-1 text-xs text-[#7A8079] font-medium">
          Custom-crafted by AI analysis to bridge your exact identified skill gaps and demonstrate production readiness to hiring teams.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {projects.map((proj) => (
          <div key={proj.id} className="card-sage-surface rounded-2xl p-6 sm:p-8 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-[#E3EDE6] px-3.5 py-1 text-xs font-bold text-[#4A6B5A]">
                  <Target className="h-3.5 w-3.5" />
                  <span>Bridges Gap: {proj.targetSkillGap}</span>
                </span>
              </div>

              <span className="rounded-xl border border-[#E2E5E0] bg-[#EDEDE7] px-3 py-1 text-xs font-bold text-[#1F2420]">
                {proj.difficulty} Level
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="mt-5 text-xl font-bold text-[#1F2420] font-display hover:text-[#4A6B5A] transition-colors">
              {proj.title}
            </h3>
            <p className="mt-2 text-xs text-[#7A8079] sm:text-sm leading-relaxed font-medium">
              {proj.description}
            </p>

            {/* Architecture Concept */}
            <div className="mt-5 rounded-2xl border border-[#E2E5E0] bg-[#EDEDE7]/40 p-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-[#4A6B5A] font-display">
                <Cpu className="h-4 w-4" />
                <span>System Architecture Overview:</span>
              </div>
              <p className="text-xs text-[#1F2420] leading-relaxed font-mono">
                {proj.architectureOverview}
              </p>
            </div>

            {/* Recommended Tech Stack */}
            <div className="mt-5">
              <span className="text-[11px] font-bold text-[#7A8079] uppercase tracking-wider block mb-2">
                Recommended Tech Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {proj.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-xl border border-[#E2E5E0] bg-white px-3 py-1 text-xs font-bold text-[#1F2420] shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features & Stretch Goals */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 pt-5 border-t border-[#E2E5E0]">
              <div>
                <span className="text-xs font-bold text-[#1F2420] block mb-2.5 font-display">Core Features to Implement:</span>
                <ul className="space-y-2">
                  {proj.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-[#7A8079] font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[#4A6B5A] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold text-[#4A6B5A] block mb-2.5 font-display">Stretch Goals (High Impact):</span>
                <ul className="space-y-2">
                  {proj.stretchGoals.map((sg, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-[#7A8079] font-medium">
                      <ChevronRight className="h-4 w-4 text-[#4A6B5A] flex-shrink-0" />
                      <span>{sg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
