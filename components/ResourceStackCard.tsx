'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

interface ResourceStackCardProps {
  onViewResources?: () => void;
}

export const ResourceStackCard: React.FC<ResourceStackCardProps> = ({ onViewResources }) => {
  return (
    <div className="card-sage-surface rounded-2xl p-6 shadow-xs relative overflow-hidden transition-all duration-200 hover:-translate-y-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side Info */}
        <div className="space-y-4 z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E3EDE6] px-3 py-1 text-xs font-bold text-[#4A6B5A]">
            <Award className="h-4 w-4" />
            <span>Achievement Vault</span>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#1F2420] font-display">
              Your Earned Resources
            </h3>
            <p className="mt-1 text-xs text-[#7A8079] leading-relaxed">
              Curated guides, verified skill certificates, and AI-powered project blueprints saved to your portfolio.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewResources}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4A6B5A] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#4A6B5A]/20 transition-colors hover:bg-[#3D5A4A]"
          >
            <span>View All Resources</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </motion.button>
        </div>

        {/* Right Side Stacked Layered Cards */}
        <div className="relative h-44 flex items-center justify-center">
          {/* Layer 3 (Bottom Stacked Card) */}
          <motion.div
            initial={{ rotate: -12, y: 10, opacity: 0 }}
            animate={{ rotate: -12, y: 10, opacity: 0.6 }}
            whileHover={{ rotate: -16, y: 14 }}
            className="absolute w-48 h-28 rounded-xl bg-[#3D5A4A] p-4 text-white shadow-md border border-white/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A3C8B4]">Skill Certificate</span>
              <ShieldCheck className="h-4 w-4 text-[#A3C8B4]" />
            </div>
            <div className="mt-4 text-xs font-extrabold font-display">System Architecture</div>
          </motion.div>

          {/* Layer 2 (Middle Stacked Card) */}
          <motion.div
            initial={{ rotate: 6, y: 4, opacity: 0 }}
            animate={{ rotate: 6, y: 4, opacity: 0.85 }}
            whileHover={{ rotate: 9, y: 0 }}
            className="absolute w-48 h-28 rounded-xl bg-[#5A7D69] p-4 text-white shadow-lg border border-white/25"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200">AI Blueprint</span>
              <BookOpen className="h-4 w-4 text-amber-200" />
            </div>
            <div className="mt-4 text-xs font-extrabold font-display">Full-Stack AI Agent</div>
          </motion.div>

          {/* Layer 1 (Top Stacked Card) */}
          <motion.div
            initial={{ rotate: -2, y: -6, opacity: 0 }}
            animate={{ rotate: -2, y: -6, opacity: 1 }}
            whileHover={{ rotate: 0, y: -10, scale: 1.03 }}
            className="absolute w-48 h-28 rounded-xl bg-gradient-to-tr from-[#3D5A4A] to-[#4A6B5A] p-4 text-white shadow-xl border border-white/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E3EDE6]">SkillForge Verified</span>
              <Award className="h-5 w-5 text-amber-300 animate-pulse" />
            </div>
            <div className="mt-3 text-sm font-black font-display text-white">Full Stack Engineer</div>
            <div className="mt-1 text-[10px] font-bold text-[#E3EDE6]">Ready to Deploy</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
