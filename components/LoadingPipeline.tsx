'use client';

import React, { useEffect, useState } from 'react';
import { BrainCircuit, CheckCircle2, Loader2, Target, Cpu, Code2, MessageSquare, Milestone } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 1, label: 'Parsing & Structuring Resume Data', icon: Cpu, detail: 'Extracting technical skills, experience & domain credentials...' },
  { id: 2, label: 'Conducting Skill Gap Evaluation', icon: Target, detail: 'Comparing candidate baseline against target role requirements...' },
  { id: 3, label: 'Constructing Flagship Roadmap', icon: Milestone, detail: 'Designing phased milestone timeline & resource recommendations...' },
  { id: 4, label: 'Designing Portfolio Blueprints', icon: Code2, detail: 'Mapping hands-on project ideas directly to identified gaps...' },
  { id: 5, label: 'Synthesizing Interview Strategy', icon: MessageSquare, detail: 'Generating role-tailored technical Q&A with model answers...' }
];

export const LoadingPipeline: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < PIPELINE_STEPS.length - 1 ? prev + 1 : prev));
    }, 2800); // 2.8s per step pacing for smooth user progression

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto my-12 max-w-2xl px-4 text-center">
      <div className="card-sage-surface relative overflow-hidden rounded-3xl p-8 shadow-md">
        {/* Central Brand Icon */}
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#3D5A4A] to-[#5A7D69] p-0.5 shadow-md shadow-[#3D5A4A]/20">
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#1F2420]">
            <BrainCircuit className="h-10 w-10 text-[#A3C8B4] animate-pulse" />
          </div>
        </div>

        <h3 className="text-2xl font-black text-[#1F2420] font-display">
          SkillForge AI Engine is Active
        </h3>
        <p className="mt-1 text-xs text-[#7A8079] font-medium">
          Generating bespoke career roadmap, skill gaps, and interview prep...
        </p>

        {/* Paced Pipeline Steps List */}
        <div className="mt-8 space-y-3 text-left">
          {PIPELINE_STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-300 ${
                  isCurrent
                    ? 'border-[#4A6B5A] bg-[#E3EDE6]/60 shadow-2xs scale-[1.01]'
                    : isDone
                    ? 'border-[#E2E5E0] bg-white opacity-90'
                    : 'border-[#E2E5E0]/60 bg-[#EDEDE7]/40 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                      isDone
                        ? 'bg-[#E3EDE6] text-[#4A6B5A]'
                        : isCurrent
                        ? 'bg-[#4A6B5A] text-white shadow-xs'
                        : 'bg-[#EDEDE7] text-[#7A8079]'
                    }`}
                  >
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F2420]">{step.label}</h4>
                    <p className="text-[11px] text-[#7A8079] font-medium mt-0.5">{step.detail}</p>
                  </div>
                </div>

                <div>
                  {isDone ? (
                    <CheckCircle2 className="h-5 w-5 text-[#4A6B5A]" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-[#4A6B5A] animate-spin" />
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#D5D8D2]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
