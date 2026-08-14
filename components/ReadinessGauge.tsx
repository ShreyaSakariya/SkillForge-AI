'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import { AnimatedCountUp } from '@/components/AnimatedCountUp';

interface ReadinessGaugeProps {
  score?: number; // 0 to 100
  questionsPracticed?: number;
  insightText?: string;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({
  score = 72,
  questionsPracticed = 14,
  insightText = 'Up 12% since last week'
}) => {
  // SVG Arc calculation for semi-circle gauge (180 degrees)
  const radius = 80;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // Half circle circumference
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="card-sage-surface rounded-2xl p-6 shadow-xs flex flex-col justify-between h-full transition-all duration-200 hover:-translate-y-1">
      {/* Header Title */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-[#1F2420] font-display">
            Interview Readiness Score
          </h3>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E3EDE6] text-[#4A6B5A]">
            <Sparkles className="h-4 w-4" />
          </span>
        </div>
        <p className="text-xs text-[#7A8079] font-medium">
          Questions Practiced: <span className="font-bold text-[#1F2420]">{questionsPracticed}</span>
        </p>
      </div>

      {/* Semi-Circular SVG Gauge */}
      <div className="relative my-4 flex flex-col items-center justify-center">
        <div className="relative w-52 h-28 flex items-end justify-center overflow-hidden">
          <svg className="w-52 h-52 transform -rotate-180" viewBox="0 0 200 200">
            {/* Background Track (Pale Gray Arc) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#EDEDE7"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Animated Gauge Arc (Sage Primary Accent) */}
            <motion.circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#4A6B5A"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.4, ease: 'easeOut' as any, delay: 0.2 }}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Big Score Text */}
          <div className="absolute bottom-1 flex flex-col items-center">
            <div className="text-3xl font-black text-[#1F2420] font-display">
              <AnimatedCountUp end={score} suffix="%" />
            </div>
            <span className="text-[10px] font-bold text-[#7A8079] uppercase tracking-wider">Readiness</span>
          </div>
        </div>
      </div>

      {/* Insight Badge Footer */}
      <div className="flex items-center gap-2 rounded-xl bg-[#E3EDE6]/80 px-3 py-2 text-xs font-bold text-[#4A6B5A]">
        <TrendingUp className="h-4 w-4 flex-shrink-0" />
        <span>{insightText}</span>
      </div>
    </div>
  );
};
