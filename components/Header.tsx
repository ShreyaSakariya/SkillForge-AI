'use client';

import React from 'react';
import { Search, Bell, User, RefreshCw, Home, BrainCircuit, Sparkles, LogOut } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenAuth: () => void;
  onGoToLanding: () => void;
  onSignOut?: () => void;
  hasActiveData: boolean;
  userEmail?: string | null;
  careerGoal?: string;
  isDemoMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenAuth,
  onGoToLanding,
  onSignOut,
  hasActiveData,
  userEmail,
  careerGoal = 'your target career goal',
  isDemoMode = false
}) => {
  const firstName = userEmail ? userEmail.split('@')[0] : 'Explorer';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E5E0] bg-[#EDEDE7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left Side: Personalized Greeting & Dynamic Goal */}
        <div className="flex items-center gap-4">
          <div
            onClick={onGoToLanding}
            className="flex cursor-pointer items-center gap-2 sm:hidden"
            title="Landing Page"
          >
            <BrainCircuit className="h-6 w-6 text-[#4A6B5A]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-[#1F2420] sm:text-2xl font-display">
                Hello, <span className="text-[#4A6B5A]">{firstName}</span>!
              </h1>

              {/* DEMO MODE UI BADGE (Section 2.4 of Brief) */}
              {isDemoMode && (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800 hover:bg-amber-200 transition"
                  title="Sign in with Google to persist your data"
                >
                  <Sparkles className="h-3 w-3 text-amber-600" />
                  <span>Demo Mode — Sign in to save</span>
                </button>
              )}
            </div>
            <p className="text-xs text-[#7A8079] font-medium hidden sm:block">
              Track your progress toward <span className="font-bold text-[#1F2420]">{careerGoal}</span>
            </p>
          </div>
        </div>

        {/* Center/Right Side: Search Bar, Notifications, Actions */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7A8079]" />
            <input
              type="text"
              placeholder="Search skills, projects..."
              className="h-9 w-48 rounded-xl border border-[#E2E5E0] bg-white pl-8 pr-3 text-xs text-[#1F2420] placeholder-[#7A8079] focus:border-[#4A6B5A] focus:outline-none transition-all shadow-2xs"
            />
          </div>

          {/* Notifications Bell */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#E2E5E0] text-[#7A8079] hover:text-[#1F2420] hover:border-[#4A6B5A] transition-all shadow-2xs"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#4A6B5A]" />
          </button>

          {/* Landing Page Link */}
          <button
            onClick={onGoToLanding}
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-[#E2E5E0] bg-white px-3 py-1.5 text-xs font-bold text-[#1F2420] hover:border-[#4A6B5A] hover:text-[#4A6B5A] transition-all shadow-2xs"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Landing Page</span>
          </button>

          {hasActiveData && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-xl border border-[#E2E5E0] bg-white px-3 py-1.5 text-xs font-bold text-[#1F2420] hover:border-[#C0564A] hover:text-[#C0564A] transition-all shadow-2xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          )}

          {/* User Sign In / Account Button */}
          {userEmail ? (
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 rounded-xl bg-white border border-[#E2E5E0] px-3.5 py-1.5 text-xs font-bold text-[#C0564A] shadow-2xs hover:bg-[#F5E4E1] transition-all"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 rounded-xl bg-[#4A6B5A] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#3D5A4A] transition-all"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
