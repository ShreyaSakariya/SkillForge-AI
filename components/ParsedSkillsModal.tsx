'use client';

import React from 'react';
import { StructuredResume } from '@/types/skillforge';
import { Cpu, Code2, Layers, Wrench, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { MouseGlowCard } from '@/components/MouseGlowCard';

interface ParsedSkillsModalProps {
  resume: StructuredResume;
}

export const ParsedSkillsModal: React.FC<ParsedSkillsModalProps> = ({ resume }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MouseGlowCard className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 border border-violet-200">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 font-display">LLM Resume Intelligence</h3>
              <p className="text-xs text-stone-500">Structured candidate capability extraction</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 border border-violet-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Parsed by AI</span>
          </span>
        </div>

        <p className="mb-6 text-xs text-stone-700 leading-relaxed bg-stone-50/80 p-4 rounded-2xl border border-stone-200">
          {resume.experienceSummary}
        </p>

        {/* Skills Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Languages & Frameworks */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="h-4 w-4 text-violet-600" />
                <span className="text-xs font-bold uppercase text-stone-600 tracking-wider">
                  Languages & Technologies
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-violet-200 bg-violet-50/80 px-3 py-1 text-xs font-semibold text-violet-800 shadow-2xs"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-4 w-4 text-cyan-600" />
                <span className="text-xs font-bold uppercase text-stone-600 tracking-wider">
                  Frameworks & Libraries
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.frameworks.map((fw, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-cyan-200 bg-cyan-50/80 px-3 py-1 text-xs font-semibold text-cyan-800 shadow-2xs"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & Core Competencies */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold uppercase text-stone-600 tracking-wider">
                  Tools & Platforms
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-1 text-xs font-semibold text-amber-900 shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase text-stone-600 tracking-wider">
                  Core Competencies
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.softSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-2xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MouseGlowCard>
    </motion.div>
  );
};
