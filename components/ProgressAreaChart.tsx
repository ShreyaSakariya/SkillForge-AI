'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { AnimatedCountUp } from '@/components/AnimatedCountUp';

interface ProgressAreaChartProps {
  completedSteps: number;
  totalSteps: number;
  totalHours: number;
  completedHours: number;
}

export const ProgressAreaChart: React.FC<ProgressAreaChartProps> = ({
  completedSteps,
  totalSteps,
  totalHours,
  completedHours
}) => {
  const [filterMode, setFilterMode] = useState<'weekly' | 'monthly'>('weekly');

  const percentComplete = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const hoursRemaining = Math.max(0, totalHours - completedHours);

  // SVG Area Chart points setup
  const chartPointsWeekly = [
    { label: 'W1', value: 10 },
    { label: 'W2', value: 25 },
    { label: 'W3', value: 40 },
    { label: 'W4', value: 55 },
    { label: 'W5', value: 70 },
    { label: 'W6', value: Math.max(70, percentComplete) }
  ];

  const chartPointsMonthly = [
    { label: 'Month 1', value: 15 },
    { label: 'Month 2', value: 45 },
    { label: 'Month 3', value: Math.max(45, percentComplete) }
  ];

  const activePoints = filterMode === 'weekly' ? chartPointsWeekly : chartPointsMonthly;

  // Build SVG path
  const svgWidth = 500;
  const svgHeight = 160;
  const paddingX = 30;
  const paddingY = 20;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const pointsFormatted = activePoints.map((pt, idx) => {
    const x = paddingX + (idx / (activePoints.length - 1)) * chartWidth;
    const y = svgHeight - paddingY - (pt.value / 100) * chartHeight;
    return { x, y, value: pt.value, label: pt.label };
  });

  const pathD = pointsFormatted.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${pointsFormatted[pointsFormatted.length - 1].x} ${svgHeight - paddingY} L ${pointsFormatted[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="card-sage-surface rounded-2xl p-6 shadow-xs transition-all duration-200 hover:-translate-y-1">
      {/* Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-extrabold text-[#1F2420] font-display">
            Roadmap Progress
          </h3>
          {/* Status Pill Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3EDE6] px-3 py-1 text-xs font-bold text-[#4A6B5A]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>On Track</span>
          </span>
        </div>

        {/* Weekly / Monthly Toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-[#EDEDE7] p-1">
          <button
            onClick={() => setFilterMode('weekly')}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              filterMode === 'weekly'
                ? 'bg-white text-[#1F2420] shadow-2xs'
                : 'text-[#7A8079] hover:text-[#1F2420]'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setFilterMode('monthly')}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              filterMode === 'monthly'
                ? 'bg-white text-[#1F2420] shadow-2xs'
                : 'text-[#7A8079] hover:text-[#1F2420]'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Inline Stats Row */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-b border-[#E2E5E0] pb-5">
        <div>
          <span className="text-xs font-bold text-[#7A8079] uppercase tracking-wider">Steps Completed</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1F2420] font-display">
              <AnimatedCountUp end={completedSteps} /> / {totalSteps}
            </span>
            <span className="text-xs font-bold text-[#4A6B5A]">
              (<AnimatedCountUp end={percentComplete} suffix="%" />)
            </span>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-[#7A8079] uppercase tracking-wider">Est. Time Remaining</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1F2420] font-display">
              <AnimatedCountUp end={hoursRemaining} suffix=" hrs" />
            </span>
            <span className="text-xs font-medium text-[#7A8079]">
              (of ~{totalHours} total)
            </span>
          </div>
        </div>
      </div>

      {/* Smooth Line / Area Chart Visual */}
      <div className="relative mt-4 pt-2">
        <svg className="w-full h-44 overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          <defs>
            <linearGradient id="sageChartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A6B5A" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4A6B5A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#E2E5E0" strokeDasharray="4 4" strokeWidth="1" />
          <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="#E2E5E0" strokeDasharray="4 4" strokeWidth="1" />
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#E2E5E0" strokeWidth="1" />

          {/* Soft Gradient Area Fill */}
          <motion.path
            d={areaD}
            fill="url(#sageChartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Line path drawing animation */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#4A6B5A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' as any }}
          />

          {/* Data Points */}
          {pointsFormatted.map((pt, idx) => (
            <g key={idx} className="group">
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill="#FFFFFF"
                stroke="#4A6B5A"
                strokeWidth="3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
              />
              <text
                x={pt.x}
                y={svgHeight - 4}
                textAnchor="middle"
                className="text-[11px] font-bold fill-[#7A8079]"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
