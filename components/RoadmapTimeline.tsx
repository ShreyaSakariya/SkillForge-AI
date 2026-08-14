'use client';

import React, { useState } from 'react';
import { RoadmapData } from '@/types/skillforge';
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  Flame,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface RoadmapTimelineProps {
  roadmap: RoadmapData;
  completedStepIds: Set<string>;
  onToggleStep: (stepId: string) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  roadmap,
  completedStepIds,
  onToggleStep
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const toggleExpand = (stepId: string) => {
    setExpandedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const handleStepClick = (stepId: string, currentCompleted: boolean) => {
    onToggleStep(stepId);
    if (!currentCompleted) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4A6B5A', '#3D5A4A', '#5A7D69', '#E3EDE6']
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  // Calculate stats
  let totalSteps = 0;
  let completedCount = 0;

  roadmap.phases.forEach((phase) => {
    phase.steps.forEach((step) => {
      totalSteps++;
      if (completedStepIds.has(step.id)) completedCount++;
    });
  });

  const percentComplete = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* FLAGSHIP ROADMAP HEADER SUMMARY CARD */}
      <div className="card-sage-surface rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E3EDE6] px-3.5 py-1 text-xs font-bold text-[#4A6B5A]">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Flagship AI Milestone Roadmap</span>
            </div>
            <h2 className="text-2xl font-black text-[#1F2420] sm:text-4xl font-display">
              {roadmap.careerGoal}
            </h2>
            <p className="text-xs text-[#7A8079] max-w-2xl leading-relaxed font-medium">
              Bespoke timeline engineered to systematically eliminate identified skill gaps over {roadmap.totalEstimatedWeeks} weeks.
            </p>
          </div>

          {/* SAGE PROGRESS RING HIGHLIGHT MOMENT */}
          <div className="flex items-center gap-4 rounded-2xl border border-[#E2E5E0] bg-[#EDEDE7]/40 p-5">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-[#E2E5E0]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  initial={{ strokeDasharray: '0, 100' }}
                  animate={{ strokeDasharray: `${percentComplete}, 100` }}
                  transition={{ duration: 1.2, ease: 'easeOut' as any }}
                  className="text-[#4A6B5A]"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-base font-black text-[#4A6B5A] font-display">{percentComplete}%</span>
                <span className="text-[9px] uppercase font-bold text-[#7A8079]">Done</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#1F2420]">
                {completedCount} of {totalSteps} Steps Complete
              </div>
              <div className="text-xs text-[#7A8079] mt-0.5 font-medium">
                {totalSteps - completedCount} milestones remaining
              </div>
              <div className="mt-2 text-[10px] font-bold text-[#4A6B5A] flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-[#4A6B5A]" />
                <span>{roadmap.totalEstimatedWeeks} Weeks Active Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE PHASES CONTAINER */}
      <div className="space-y-10">
        {roadmap.phases.map((phase) => (
          <div key={phase.id} className="relative">
            {/* Phase Badge Bar */}
            <div className="sticky top-16 z-20 mb-6 flex items-center justify-between rounded-2xl border border-[#E2E5E0] bg-white/95 px-6 py-4 shadow-2xs backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#4A6B5A] text-xs font-black text-white shadow-xs font-display">
                  {phase.phaseNumber}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#1F2420] sm:text-lg font-display">{phase.title}</h3>
                  <p className="text-xs text-[#7A8079] font-medium">{phase.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-[#E3EDE6] px-3 py-1.5 text-xs font-bold text-[#4A6B5A]">
                <Clock className="h-3.5 w-3.5" />
                <span>{phase.durationWeeks} Weeks</span>
              </div>
            </div>

            {/* Vertical Timeline Container */}
            <div className="relative pl-6 sm:pl-10 space-y-6">
              {/* Vertical Connector Line */}
              <div className="absolute left-2.5 top-4 bottom-4 w-0.5 bg-[#E2E5E0] sm:left-4" />

              {phase.steps.map((step) => {
                const isCompleted = completedStepIds.has(step.id);
                const isExpanded = expandedSteps[step.id] ?? true;

                let effortBadgeStyle = 'bg-[#E3EDE6] text-[#4A6B5A]';
                if (step.effortLevel === 'Challenging' || step.effortLevel === 'Intense') {
                  effortBadgeStyle = 'bg-[#F5E4E1] text-[#C0564A]';
                }

                return (
                  <div key={step.id} className="relative">
                    {/* Circle Node on Timeline */}
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleStepClick(step.id, isCompleted)}
                      className={`absolute -left-6 top-6 z-10 flex h-8 w-8 sm:-left-10 items-center justify-center rounded-full border-2 transition-colors ${
                        isCompleted
                          ? 'border-[#4A6B5A] bg-[#4A6B5A] text-white shadow-xs'
                          : 'border-[#7A8079] bg-white text-[#7A8079] hover:border-[#4A6B5A] hover:text-[#4A6B5A]'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </motion.button>

                    {/* Step Card */}
                    <div
                      className={`card-sage-surface rounded-2xl p-6 transition-all duration-200 ${
                        isCompleted
                          ? 'border-[#4A6B5A]/40 bg-[#E3EDE6]/20 shadow-2xs'
                          : 'hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${effortBadgeStyle}`}>
                              {step.effortLevel} Effort
                            </span>
                            <span className="flex items-center gap-1 text-xs font-semibold text-[#7A8079] bg-[#EDEDE7] px-2 py-0.5 rounded-lg">
                              <Clock className="h-3 w-3 text-[#4A6B5A]" />
                              <span>~{step.estimatedHours} hrs</span>
                            </span>
                          </div>
                          <h4 className={`text-base font-bold sm:text-xl font-display ${isCompleted ? 'line-through text-[#7A8079]' : 'text-[#1F2420]'}`}>
                            {step.title}
                          </h4>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStepClick(step.id, isCompleted)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                              isCompleted
                                ? 'bg-[#E3EDE6] text-[#4A6B5A]'
                                : 'bg-[#4A6B5A] text-white hover:bg-[#3D5A4A]'
                            }`}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                          </motion.button>

                          <button
                            onClick={() => toggleExpand(step.id)}
                            className="rounded-xl border border-[#E2E5E0] bg-[#EDEDE7] p-2 text-[#7A8079] hover:text-[#1F2420]"
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Step Description */}
                      <p className="mt-3 text-xs text-[#7A8079] sm:text-sm leading-relaxed font-medium">
                        {step.description}
                      </p>

                      {/* Skill Gaps Badges */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-[#7A8079]">Bridges Gap:</span>
                        {step.skillGapsAddressed.map((gap, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1.5 rounded-full bg-[#E3EDE6] px-3 py-0.5 text-[11px] font-bold text-[#4A6B5A]"
                          >
                            <Target className="h-3 w-3" />
                            <span>{gap}</span>
                          </span>
                        ))}
                      </div>

                      {/* Expanded Section */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 space-y-5 rounded-2xl border border-[#E2E5E0] bg-[#EDEDE7]/40 p-5"
                          >
                            {/* Key Deliverable */}
                            <div className="flex items-start gap-3">
                              <Award className="h-5 w-5 text-[#4A6B5A] mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-xs font-bold text-[#4A6B5A] uppercase tracking-wide">Key Deliverable Artifact:</span>
                                <p className="text-xs text-[#1F2420] mt-1 font-semibold">{step.keyDeliverable}</p>
                              </div>
                            </div>

                            {/* Suggested Learning Resources */}
                            <div>
                              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#1F2420]">
                                <BookOpen className="h-4 w-4 text-[#4A6B5A]" />
                                <span>Suggested Learning Resources:</span>
                              </div>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {step.suggestedResources.map((res, idx) => (
                                  <div
                                    key={idx}
                                    className="flex flex-col justify-between rounded-xl border border-[#E2E5E0] bg-white p-3.5 transition hover:border-[#4A6B5A] shadow-2xs"
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="rounded-md bg-[#E3EDE6] px-2 py-0.5 text-[10px] font-bold text-[#4A6B5A]">
                                          {res.type}
                                        </span>
                                        <span className="text-[10px] text-[#7A8079] font-semibold">{res.estimatedHours} hrs</span>
                                      </div>
                                      <h5 className="text-xs font-bold text-[#1F2420] mt-1">{res.title}</h5>
                                      <p className="mt-1 text-[11px] text-[#7A8079] leading-tight font-medium">{res.description}</p>
                                      {res.url && res.url !== '#' && (
                                        <a
                                          href={res.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#4A6B5A] hover:underline"
                                        >
                                          <span>Visit Resource</span>
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
