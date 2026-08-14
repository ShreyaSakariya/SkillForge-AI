'use client';

import React from 'react';
import {
  LayoutGrid,
  Map,
  Target,
  Code2,
  MessageSquare,
  Settings,
  RotateCcw,
  User,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

export type DashboardTab = 'overview' | 'roadmap' | 'gaps' | 'projects' | 'interview' | 'settings';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onReset: () => void;
  onOpenAuth: () => void;
  onSignOut?: () => void;
  userEmail?: string | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isDemoMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onReset,
  onOpenAuth,
  onSignOut,
  userEmail,
  isCollapsed,
  onToggleCollapse,
  isDemoMode = false
}) => {
  // Navigation order: Flagship Roadmap -> Skill Gaps -> Project Ideas -> Interview Prep -> Dashboard Overview
  const navItems: { id: DashboardTab; label: string; sublabel?: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'roadmap', label: 'Flagship Roadmap', sublabel: 'Phased milestone timeline', icon: Map },
    { id: 'gaps', label: 'Skill Gaps', sublabel: 'Competency evaluation', icon: Target },
    { id: 'projects', label: 'Project Ideas', sublabel: 'Portfolio blueprints', icon: Code2 },
    { id: 'interview', label: 'Interview Prep', sublabel: 'Q&A strategy', icon: MessageSquare },
    { id: 'overview', label: 'Dashboard Overview', sublabel: 'Performance summary', icon: LayoutGrid }
  ];

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-50 flex flex-col justify-between border-r border-[#E2E5E0] bg-white py-5 shadow-xs select-none transition-all duration-300 ${
        isCollapsed ? 'w-18 px-2' : 'w-60 px-4'
      }`}
    >
      {/* Top Brand & Header Section */}
      <div className="flex flex-col gap-5">
        {/* Brand Mark & Expand/Collapse Toggle */}
        <div className="flex items-center justify-between px-1">
          <div
            onClick={() => onTabChange('roadmap')}
            className="flex cursor-pointer items-center gap-3 group"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#3D5A4A] to-[#5A7D69] p-0.5 shadow-md shadow-[#3D5A4A]/20 transition-transform duration-200 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#1F2420]">
                <BrainCircuit className="h-5 w-5 text-[#A3C8B4]" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <span className="text-base font-black tracking-tight text-[#1F2420] font-display block leading-none">
                  SkillForge<span className="text-[#4A6B5A]"> AI</span>
                </span>
                <span className="text-[10px] text-[#7A8079] font-medium block mt-1">Navigation Menu</span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2E5E0] bg-[#EDEDE7] text-[#7A8079] hover:text-[#1F2420] hover:border-[#4A6B5A] transition-all"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* User Guidance Prompt (When expanded) */}
        {!isCollapsed && (
          <div className="rounded-xl border border-[#4A6B5A]/20 bg-[#E3EDE6]/60 p-3 text-[11px] text-[#4A6B5A] font-semibold flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-[#4A6B5A] flex-shrink-0 mt-0.5" />
            <span>Select a feature below to view your personalized roadmap & analysis.</span>
          </div>
        )}

        {/* Main Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex w-full items-center gap-3 rounded-xl py-2.5 transition-all duration-200 ${
                    isCollapsed ? 'justify-center px-0 h-11' : 'px-3'
                  } ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-[#7A8079] hover:bg-[#EDEDE7] hover:text-[#1F2420]'
                  }`}
                  aria-label={item.label}
                >
                  {/* Smooth active indicator background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarIndicator"
                      className="absolute inset-0 rounded-xl bg-[#4A6B5A] shadow-md shadow-[#4A6B5A]/25"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className={`relative z-10 flex-shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-4.5 w-4.5'}`} />

                  {/* Readable Text Label */}
                  {!isCollapsed && (
                    <div className="relative z-10 text-left overflow-hidden">
                      <div className="text-xs font-bold leading-tight">{item.label}</div>
                      {item.sublabel && (
                        <div className={`text-[10px] font-medium leading-tight mt-0.5 ${
                          isActive ? 'text-white/80' : 'text-[#7A8079]'
                        }`}>
                          {item.sublabel}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Anchored Items */}
      <div className="flex flex-col gap-2 pt-4 border-t border-[#E2E5E0] w-full">
        {/* Reset / New Analysis */}
        <button
          onClick={onReset}
          className={`flex items-center gap-3 rounded-xl py-2.5 text-[#7A8079] hover:bg-[#F5E4E1] hover:text-[#C0564A] transition-all duration-200 ${
            isCollapsed ? 'justify-center px-0 h-11' : 'px-3'
          }`}
          title="New Analysis"
        >
          <RotateCcw className="h-4.5 w-4.5 flex-shrink-0" />
          {!isCollapsed && <span className="text-xs font-bold">New Analysis</span>}
        </button>

        {/* Settings */}
        <button
          onClick={() => onTabChange('settings')}
          className={`relative flex items-center gap-3 rounded-xl py-2.5 transition-all duration-200 ${
            isCollapsed ? 'justify-center px-0 h-11' : 'px-3'
          } ${
            activeTab === 'settings'
              ? 'bg-[#4A6B5A] text-white font-bold'
              : 'text-[#7A8079] hover:bg-[#EDEDE7] hover:text-[#1F2420]'
          }`}
          title="Settings"
        >
          <Settings className="h-4.5 w-4.5 flex-shrink-0" />
          {!isCollapsed && <span className="text-xs font-bold">Settings</span>}
        </button>

        {/* User Account Profile / Sign Out */}
        {userEmail ? (
          <button
            onClick={onSignOut}
            className={`flex items-center gap-3 rounded-xl py-2 bg-[#F5E4E1]/80 border border-[#C0564A]/30 text-[#C0564A] hover:bg-[#C0564A] hover:text-white transition-all ${
              isCollapsed ? 'justify-center px-0 h-10' : 'px-3'
            }`}
            title="Sign Out"
          >
            <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
            {!isCollapsed && (
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold truncate">{userEmail.split('@')[0]}</div>
                <div className="text-[10px] font-medium">Sign Out</div>
              </div>
            )}
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className={`flex items-center gap-3 rounded-xl py-2 bg-[#E3EDE6]/60 border border-[#4A6B5A]/20 text-[#4A6B5A] hover:border-[#4A6B5A] transition-all ${
              isCollapsed ? 'justify-center px-0 h-10' : 'px-3'
            }`}
            title="Account Profile"
          >
            <User className="h-4.5 w-4.5 flex-shrink-0" />
            {!isCollapsed && (
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold truncate">{isDemoMode ? 'Demo Mode' : 'Sign In'}</div>
                <div className="text-[10px] text-[#7A8079]">{isDemoMode ? 'Click to Sign In' : 'Account Profile'}</div>
              </div>
            )}
          </button>
        )}
      </div>
    </aside>
  );
};
