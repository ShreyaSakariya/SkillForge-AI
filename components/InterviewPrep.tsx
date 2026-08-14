'use client';

import React, { useState } from 'react';
import { InterviewPrepData } from '@/types/skillforge';
import { CheckCircle2, Sparkles, ChevronDown, ChevronUp, BookOpen, Lightbulb, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InterviewPrepProps {
  data: InterviewPrepData;
}

export const InterviewPrepView: React.FC<InterviewPrepProps> = ({ data }) => {
  const [openQuestionIds, setOpenQuestionIds] = useState<Record<string, boolean>>({});
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  const toggleQuestion = (id: string) => {
    setOpenQuestionIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Top Banner */}
      <div className="card-sage-surface rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#4A6B5A]">
          <Sparkles className="h-4 w-4" />
          <span>Tailored Technical & Behavioral Q&A</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-[#1F2420] sm:text-3xl font-display">
          AI Interview Preparation Strategy
        </h2>
        <p className="mt-1 text-xs text-[#7A8079] font-medium">
          Questions tailored to your resume background and your target role ({data.targetRole}), complete with model answers and key talking points.
        </p>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {data.questions.map((q) => {
          const isOpen = openQuestionIds[q.id] ?? true;
          const isMastered = masteredIds.has(q.id);

          let difficultyBadge = 'bg-[#E3EDE6] text-[#4A6B5A]';
          if (q.difficulty === 'Medium') difficultyBadge = 'bg-[#EBF3F5] text-[#2C6B74]';
          if (q.difficulty === 'Hard') difficultyBadge = 'bg-[#F5E4E1] text-[#C0564A]';

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-all ${
                isMastered
                  ? 'border-[#4A6B5A]/40 bg-[#E3EDE6]/20 shadow-2xs'
                  : 'card-sage-surface shadow-xs'
              }`}
            >
              {/* Question Card Header */}
              <div
                onClick={() => toggleQuestion(q.id)}
                className="flex cursor-pointer items-start justify-between gap-4 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E3EDE6] text-[#4A6B5A] flex-shrink-0 mt-0.5">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-lg bg-[#E3EDE6] px-2.5 py-0.5 text-[10px] font-bold text-[#4A6B5A]">
                        {q.category}
                      </span>
                      <span className={`rounded-lg px-2.5 py-0.5 text-[10px] font-extrabold ${difficultyBadge}`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <h3 className={`text-base font-bold sm:text-lg font-display ${isMastered ? 'line-through text-[#7A8079]' : 'text-[#1F2420]'}`}>
                      {q.question}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleMastered(q.id, e)}
                    className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition ${
                      isMastered
                        ? 'border-[#4A6B5A] bg-[#E3EDE6] text-[#4A6B5A]'
                        : 'border-[#E2E5E0] bg-[#EDEDE7] text-[#1F2420] hover:border-[#4A6B5A] hover:text-[#4A6B5A]'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{isMastered ? 'Mastered' : 'Mark Practice'}</span>
                  </button>

                  <div className="rounded-xl p-1.5 text-[#7A8079]">
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>

              {/* Accordion Body */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[#E2E5E0] p-6 space-y-4 bg-[#EDEDE7]/40 rounded-b-2xl"
                  >
                    {/* Context / Intent */}
                    <div className="rounded-xl border border-[#E2E5E0] bg-white p-4">
                      <span className="text-[11px] font-bold text-[#7A8079] uppercase tracking-wider block mb-1">
                        Interviewer Intent / Context:
                      </span>
                      <p className="text-xs text-[#1F2420] leading-relaxed font-medium">
                        {q.context}
                      </p>
                    </div>

                    {/* Must-Hit Talking Points */}
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold text-[#4A6B5A] font-display">
                        <Lightbulb className="h-4 w-4 text-[#4A6B5A]" />
                        <span>Must-Hit Key Talking Points:</span>
                      </div>
                      <ul className="space-y-2 pl-1">
                        {q.talkingPoints.map((tp, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-[#7A8079] font-medium">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#4A6B5A] flex-shrink-0" />
                            <span>{tp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Model Answer */}
                    <div className="rounded-xl border border-[#4A6B5A]/30 bg-[#E3EDE6]/40 p-5">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold text-[#4A6B5A] font-display">
                        <BookOpen className="h-4 w-4 text-[#4A6B5A]" />
                        <span>Model Answer Walkthrough:</span>
                      </div>
                      <p className="text-xs text-[#1F2420] leading-relaxed italic font-medium">
                        "{q.modelAnswer}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
