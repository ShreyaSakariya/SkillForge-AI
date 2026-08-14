'use client';

import React from 'react';
import { SkillGapAnalysis } from '@/types/skillforge';
import { Target, CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillGapAnalysisProps {
  data: SkillGapAnalysis;
}

export const SkillGapAnalysisView: React.FC<SkillGapAnalysisProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Top Banner: Match Score & Strategic Summary */}
      <div className="card-sage-surface rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Match Score Circular Badge */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E5E0] bg-[#EDEDE7]/40 p-6 text-center shadow-2xs min-w-[180px]">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-[#E2E5E0]"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  initial={{ strokeDasharray: '0, 100' }}
                  animate={{ strokeDasharray: `${data.matchPercentage}, 100` }}
                  transition={{ duration: 1, ease: 'easeOut' as any }}
                  className="text-[#4A6B5A]"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-2xl font-black text-[#1F2420] font-display">
                {data.matchPercentage}%
              </span>
            </div>
            <span className="mt-2 text-xs font-bold text-[#4A6B5A] uppercase tracking-wider">
              Role Match Score
            </span>
          </div>

          {/* Strategic Executive Summary */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E3EDE6] px-3.5 py-1 text-xs font-bold text-[#4A6B5A]">
                Target Role: {data.targetRole}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#1F2420] font-display">
              AI Career Readiness Evaluation
            </h3>
            <p className="text-xs text-[#7A8079] sm:text-sm leading-relaxed font-medium">
              {data.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Identified Profile Strengths */}
      <div className="rounded-2xl border border-[#4A6B5A]/30 bg-[#E3EDE6]/40 p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#4A6B5A] font-display">
          <ShieldCheck className="h-5 w-5 text-[#4A6B5A]" />
          <span>Validated Candidate Strengths</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.strengths.map((str, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-xl border border-[#E2E5E0] bg-white p-4 shadow-2xs">
              <CheckCircle className="h-4 w-4 text-[#4A6B5A] mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-[#1F2420]">{str}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Skill Gap Cards */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-[#1F2420] font-display">
            <Target className="h-5 w-5 text-[#4A6B5A]" />
            <span>Identified Competency Gaps</span>
          </div>
          <span className="text-xs text-[#7A8079] font-bold">{data.gaps.length} Gaps to Bridge</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {data.gaps.map((gap) => {
            let importanceStyle = 'bg-[#E3EDE6] text-[#4A6B5A]';
            if (gap.importance === 'Critical') importanceStyle = 'bg-[#F5E4E1] text-[#C0564A]';
            if (gap.importance === 'Medium') importanceStyle = 'bg-[#EBF3F5] text-[#2C6B74]';

            return (
              <div key={gap.id} className="card-sage-surface rounded-2xl p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#7A8079] uppercase tracking-wider">
                        {gap.category}
                      </span>
                      <span className={`rounded-lg px-2.5 py-0.5 text-[10px] font-extrabold ${importanceStyle}`}>
                        {gap.importance} Priority
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#1F2420] font-display">{gap.skillName}</h4>

                    {/* Level Comparison Bar */}
                    <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#E2E5E0] bg-[#EDEDE7]/50 p-3">
                      <div className="flex-1">
                        <span className="text-[10px] text-[#7A8079] uppercase font-bold">Current:</span>
                        <div className="text-xs font-bold text-[#1F2420]">{gap.currentLevel}</div>
                      </div>
                      <TrendingUp className="h-4 w-4 text-[#4A6B5A]" />
                      <div className="flex-1 text-right">
                        <span className="text-[10px] text-[#7A8079] uppercase font-bold">Target:</span>
                        <div className="text-xs font-bold text-[#4A6B5A]">{gap.targetLevel}</div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-[#7A8079] leading-relaxed font-medium">
                      {gap.reasoning}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
