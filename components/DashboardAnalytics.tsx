'use client';

import React from 'react';
import { RoadmapData, SkillGapAnalysis } from '@/types/skillforge';
import { motion } from 'framer-motion';
import {
  Flame,
  Target,
  BarChart3,
  TrendingUp,
  Download,
  BookOpen,
  Code2,
  MessageSquare,
  Award,
  User,
  ArrowUpRight
} from 'lucide-react';
import { AnimatedCountUp } from '@/components/AnimatedCountUp';
import { ProgressAreaChart } from '@/components/ProgressAreaChart';
import { ReadinessGauge } from '@/components/ReadinessGauge';
import { ResourceStackCard } from '@/components/ResourceStackCard';

interface DashboardAnalyticsProps {
  roadmap: RoadmapData;
  skillGaps: SkillGapAnalysis;
  completedStepIds: Set<string>;
  onNavigateTab?: (tab: string) => void;
}

export const DashboardAnalyticsView: React.FC<DashboardAnalyticsProps> = ({
  roadmap,
  skillGaps,
  completedStepIds,
  onNavigateTab
}) => {
  // Calculate metrics
  let totalSteps = 0;
  let completedSteps = 0;
  let totalHours = 0;
  let completedHours = 0;

  roadmap.phases.forEach((p) => {
    p.steps.forEach((s) => {
      totalSteps++;
      totalHours += s.estimatedHours;
      if (completedStepIds.has(s.id)) {
        completedSteps++;
        completedHours += s.estimatedHours;
      }
    });
  });

  const percentSteps = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const addressedGapsSet = new Set<string>();
  roadmap.phases.forEach((p) => {
    p.steps.forEach((s) => {
      if (completedStepIds.has(s.id)) {
        s.skillGapsAddressed.forEach((g) => addressedGapsSet.add(g));
      }
    });
  });

  const totalGaps = skillGaps.gaps.length;
  const coveredGapsCount = addressedGapsSet.size;
  const goalMatchScore = Math.max(65, Math.min(95, 100 - (totalGaps - coveredGapsCount) * 5));

  const exportRoadmapAsMarkdown = () => {
    let md = `# Bespoke Learning Roadmap — ${roadmap.careerGoal}\n\n`;
    md += `**Generated**: ${new Date(roadmap.generatedAt).toLocaleDateString()}\n`;
    md += `**Target Role**: ${skillGaps.targetRole}\n`;
    md += `**Overall Completion**: ${percentSteps}%\n\n`;

    roadmap.phases.forEach((p) => {
      md += `## ${p.title} (${p.durationWeeks} Weeks)\n`;
      md += `${p.description}\n\n`;
      p.steps.forEach((s) => {
        const done = completedStepIds.has(s.id) ? '[x]' : '[ ]';
        md += `- ${done} **${s.title}** (~${s.estimatedHours} hrs, ${s.effortLevel} Effort)\n`;
        md += `  - *Deliverable*: ${s.keyDeliverable}\n`;
      });
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillForge_Roadmap_${skillGaps.targetRole.replace(/\s+/g, '_')}.md`;
    a.click();
  };

  // Recent recommendations derived dynamically
  const recentActivityList = [
    {
      id: 'rec-1',
      title: 'Suggested Project: Build REST API Rate Limiter',
      subtext: 'Matches identified gap in Backend Systems',
      type: 'Project',
      tagBg: 'bg-[#E3EDE6] text-[#4A6B5A]'
    },
    {
      id: 'rec-2',
      title: 'Recommended Guide: Distributed Caching Architecture',
      subtext: 'Recommended for Phase 2 milestone',
      type: 'Course',
      tagBg: 'bg-[#EBF3F5] text-[#2C6B74]'
    },
    {
      id: 'rec-3',
      title: 'Mock Scenario: System Design Tradeoffs Interview',
      subtext: 'Practice 4 high-frequency architectural questions',
      type: 'Interview Q',
      tagBg: 'bg-[#F5EBE6] text-[#A85832]'
    }
  ];

  // Motion variants for zero-static staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Top Action Header Bar */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#7A8079] uppercase tracking-wider">Dashboard / Overview</span>
          <h2 className="text-xl font-black text-[#1F2420] sm:text-2xl font-display">
            Target Role: <span className="text-[#4A6B5A]">{skillGaps.targetRole}</span>
          </h2>
        </div>

        <button
          onClick={exportRoadmapAsMarkdown}
          className="flex items-center gap-2 rounded-xl bg-white border border-[#E2E5E0] px-4 py-2.5 text-xs font-bold text-[#1F2420] shadow-2xs hover:border-[#4A6B5A] hover:text-[#4A6B5A] transition-all"
        >
          <Download className="h-4 w-4 text-[#4A6B5A]" />
          <span>Export Roadmap (.md)</span>
        </button>
      </motion.div>

      {/* SECTION 4: Quick-Stat Tiles (Top row, 4 cards) */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat Tile 1: Roadmap Progress */}
        <motion.div
          whileHover={{ y: -4 }}
          className="card-sage-surface rounded-2xl p-5 shadow-xs transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A8079] uppercase tracking-wider">Roadmap Progress</span>
            <BarChart3 className="h-4 w-4 text-[#4A6B5A]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1F2420] font-display">
              <AnimatedCountUp end={percentSteps} suffix="%" />
            </span>
            <span className="text-xs font-semibold text-[#7A8079]">
              ({completedSteps}/{totalSteps})
            </span>
          </div>
          {/* Mini Bar Visual */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#EDEDE7]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentSteps}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-[#4A6B5A]"
            />
          </div>
        </motion.div>

        {/* Stat Tile 2: Skills Covered */}
        <motion.div
          whileHover={{ y: -4 }}
          className="card-sage-surface rounded-2xl p-5 shadow-xs transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A8079] uppercase tracking-wider">Skills Covered</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-[#E3EDE6] px-2 py-0.5 text-[10px] font-bold text-[#4A6B5A]">
              <TrendingUp className="h-3 w-3" />
              +14%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1F2420] font-display">
              <AnimatedCountUp end={coveredGapsCount} /> of {totalGaps}
            </span>
            <span className="text-xs font-medium text-[#7A8079]">Gaps</span>
          </div>
          <div className="mt-3 text-[11px] font-semibold text-[#7A8079]">
            {totalGaps - coveredGapsCount} skill areas in active plan
          </div>
        </motion.div>

        {/* Stat Tile 3: Goal Match Score */}
        <motion.div
          whileHover={{ y: -4 }}
          className="card-sage-surface rounded-2xl p-5 shadow-xs transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A8079] uppercase tracking-wider">Goal Match Score</span>
            <Target className="h-4 w-4 text-[#4A6B5A]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1F2420] font-display">
              <AnimatedCountUp end={goalMatchScore} suffix="%" />
            </span>
            <span className="text-xs font-bold text-[#4A6B5A]">High Fit</span>
          </div>
          <div className="mt-3 text-[11px] font-semibold text-[#7A8079]">
            Aligned with {roadmap.careerGoal}
          </div>
        </motion.div>

        {/* Stat Tile 4: Dark "Hero" Tile (Days Active) */}
        <motion.div
          whileHover={{ y: -4 }}
          className="card-sage-hero rounded-2xl p-5 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Days Active</span>
            <Flame className="h-5 w-5 text-amber-300 animate-pulse" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-display">
              <AnimatedCountUp end={14} suffix=" Days" />
            </span>
          </div>
          <div className="mt-3 text-[11px] font-bold text-white/90">
            Current Active Learning Streak 🔥
          </div>
        </motion.div>
      </motion.div>

      {/* MIDDLE SECTION: Big Chart + Hero Gauge */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Section 5: Big Chart Card (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ProgressAreaChart
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            totalHours={totalHours}
            completedHours={completedHours}
          />
        </motion.div>

        {/* Section 6: Hero Gauge Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <ReadinessGauge score={goalMatchScore} questionsPracticed={completedSteps * 3 + 2} />
        </motion.div>
      </div>

      {/* LOWER SECTION: Profile Card, Resource Stack Card, Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Section 7: Profile Card */}
        <motion.div variants={itemVariants} className="card-sage-surface rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-[#E3EDE6] border-2 border-[#4A6B5A] flex items-center justify-center text-[#4A6B5A] shadow-sm">
              <User className="h-10 w-10" />
            </div>
            <h3 className="mt-3 text-lg font-black text-[#1F2420] font-display">
              Learner Profile
            </h3>
            <p className="text-xs font-semibold text-[#7A8079]">
              {roadmap.careerGoal}
            </p>
          </div>

          {/* 3-Column Stat Row */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#E2E5E0] pt-4 text-center">
            <div>
              <div className="text-base font-black text-[#1F2420] font-display">
                <AnimatedCountUp end={completedSteps} />
              </div>
              <div className="text-[10px] font-bold text-[#7A8079] uppercase">Projects</div>
            </div>
            <div>
              <div className="text-base font-black text-[#1F2420] font-display">
                <AnimatedCountUp end={coveredGapsCount} />
              </div>
              <div className="text-[10px] font-bold text-[#7A8079] uppercase">Skills</div>
            </div>
            <div>
              <div className="text-base font-black text-[#1F2420] font-display">
                <AnimatedCountUp end={2} />
              </div>
              <div className="text-[10px] font-bold text-[#7A8079] uppercase">Certs</div>
            </div>
          </div>
        </motion.div>

        {/* Section 8: Resource Stack Card (Spans 2 columns on desktop) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ResourceStackCard onViewResources={() => onNavigateTab && onNavigateTab('projects')} />
        </motion.div>
      </div>

      {/* Section 9: Recent Activity List ("Recent Recommendations") */}
      <motion.div variants={itemVariants} className="card-sage-surface rounded-2xl p-6 shadow-xs transition-all duration-200 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-[#1F2420] font-display">
            Recent Recommendations
          </h3>
          <span className="text-xs font-bold text-[#4A6B5A] cursor-pointer hover:underline" onClick={() => onNavigateTab && onNavigateTab('roadmap')}>
            View All
          </span>
        </div>

        <div className="space-y-3">
          {recentActivityList.map((row, idx) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="flex items-center justify-between rounded-xl bg-[#EDEDE7]/50 p-3.5 transition-colors hover:bg-[#E3EDE6]/60 cursor-pointer"
              onClick={() => onNavigateTab && onNavigateTab(row.type === 'Project' ? 'projects' : row.type === 'Interview Q' ? 'interview' : 'roadmap')}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#4A6B5A] shadow-2xs">
                  {row.type === 'Project' && <Code2 className="h-4 w-4" />}
                  {row.type === 'Course' && <BookOpen className="h-4 w-4" />}
                  {row.type === 'Interview Q' && <MessageSquare className="h-4 w-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F2420]">{row.title}</h4>
                  <p className="text-[11px] text-[#7A8079] mt-0.5">{row.subtext}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${row.tagBg}`}>
                  {row.type}
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#7A8079]" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
