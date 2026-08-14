'use client';

import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { Header } from '@/components/Header';
import { Sidebar, DashboardTab } from '@/components/Sidebar';
import { AuthModal } from '@/components/AuthModal';
import { OnboardingForm } from '@/components/OnboardingForm';
import { LoadingPipeline } from '@/components/LoadingPipeline';
import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { SkillGapAnalysisView } from '@/components/SkillGapAnalysis';
import { ProjectSuggestionsView } from '@/components/ProjectSuggestions';
import { InterviewPrepView } from '@/components/InterviewPrep';
import { DashboardAnalyticsView } from '@/components/DashboardAnalytics';
import { ParsedSkillsModal } from '@/components/ParsedSkillsModal';
import { FullAnalysisResult } from '@/types/skillforge';
import { isSupabaseConfigured, supabase, signOutUser } from '@/lib/supabase/client';
import {
  Sparkles,
  AlertCircle,
  ArrowLeft,
  Cpu,
  Settings,
  ShieldCheck,
  Zap,
  Bell,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SkillForgeApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [analysisResult, setAnalysisResult] = useState<FullAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('roadmap');
  const [completedStepIds, setCompletedStepIds] = useState<Set<string>>(new Set());
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // SECTION 2.2: Supabase Session Listener & Persistence across page reloads
  useEffect(() => {
    if (isSupabaseConfigured() && supabase) {
      // 1. Fetch initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUserEmail(session.user.email || 'authenticated.user@skillforge.ai');
          setIsDemoMode(false);
        }
      });

      // 2. Subscribe to auth state changes (OAuth redirects, login, logout)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUserEmail(session.user.email || 'authenticated.user@skillforge.ai');
          setIsDemoMode(false);
        } else {
          setUserEmail(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const handleFormSubmit = async (resumeText: string, careerGoal: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/full-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawResumeText: resumeText, careerGoal })
      });

      let data: any;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error('Failed to parse response JSON:', jsonErr);
        throw new Error('Server returned an unexpected response format. Please try again.');
      }

      if (data && data.success) {
        setAnalysisResult({
          resume: data.resume,
          skillGapAnalysis: data.skillGapAnalysis,
          roadmap: data.roadmap,
          projectSuggestions: data.projectSuggestions,
          interviewPrep: data.interviewPrep
        });
        setProviderName(data.provider || (data.isFallback ? 'Dynamic Synthesizer' : 'AI Engine'));
        setActiveTab('roadmap'); // Redirect directly to Flagship Roadmap first
      } else {
        setErrorMessage(data?.error || 'Failed to complete AI analysis.');
      }
    } catch (err: any) {
      console.error('Analysis request error:', err);
      setErrorMessage(err?.message || 'Network error occurred while generating roadmap.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStep = (stepId: string) => {
    setCompletedStepIds((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setCompletedStepIds(new Set());
    setErrorMessage(null);
    setActiveTab('roadmap');
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUserEmail(null);
    setIsDemoMode(false);
    handleReset();
    setViewMode('landing');
  };

  const handleAuthSuccess = (email: string, isDemo = false) => {
    setUserEmail(email);
    setIsDemoMode(isDemo);
  };

  // Render Landing Page Mode
  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onGetStarted={() => setViewMode('app')}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // Render Light Cream Dashboard App Layout with Fixed Left Sidebar
  return (
    <div className="min-h-screen bg-[#EDEDE7] text-[#1F2420] font-sans selection:bg-[#4A6B5A] selection:text-white">
      {/* Fixed Vertical Icon + Text Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onReset={handleReset}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        userEmail={userEmail}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isDemoMode={isDemoMode}
      />

      {/* Main App Canvas Container (Padded left dynamically for sidebar width) */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? 'pl-18' : 'pl-60'
      }`}>
        {/* Header */}
        <Header
          onReset={handleReset}
          onOpenAuth={() => setIsAuthOpen(true)}
          onGoToLanding={() => setViewMode('landing')}
          onSignOut={handleSignOut}
          hasActiveData={Boolean(analysisResult)}
          userEmail={userEmail}
          careerGoal={analysisResult?.roadmap.careerGoal}
          isDemoMode={isDemoMode}
        />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />

        {/* Main Content Area */}
        <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-8">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#C0564A]/30 bg-[#F5E4E1] p-5 text-sm font-medium text-[#C0564A] shadow-xs">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-[#C0564A] mt-0.5" />
              <div className="flex-1 space-y-1">
                <h4 className="font-bold font-display">AI Feature Unavailable</h4>
                <p className="text-xs leading-relaxed">{errorMessage}</p>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs font-bold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* State 1: Loading Pipeline */}
          {isLoading && <LoadingPipeline />}

          {/* State 2: Onboarding Form (When no analysis exists) */}
          {!isLoading && !analysisResult && (
            <div className="space-y-4">
              <button
                onClick={() => setViewMode('landing')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#7A8079] hover:text-[#4A6B5A] transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Landing Page</span>
              </button>

              <OnboardingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          )}

          {/* State 3: Light-Themed Dashboard Application */}
          {!isLoading && analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Active AI Engine Notice */}
              <div className="flex items-center justify-between rounded-xl border border-[#E2E5E0] bg-white px-5 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <Cpu className="h-4 w-4 text-[#4A6B5A]" />
                  <span className="text-xs font-bold text-[#1F2420] font-display">
                    Active AI Engine: <span className="text-[#4A6B5A]">{providerName || 'Live Model'}</span>
                  </span>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-[#E3EDE6] px-3 py-0.5 text-[11px] font-bold text-[#4A6B5A]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Bespoke Synthesis</span>
                </span>
              </div>

              {/* Resume Capabilities Summary */}
              <ParsedSkillsModal resume={analysisResult.resume} />

              {/* View Rendering */}
              <div className="pt-2">
                {activeTab === 'overview' && (
                  <DashboardAnalyticsView
                    roadmap={analysisResult.roadmap}
                    skillGaps={analysisResult.skillGapAnalysis}
                    completedStepIds={completedStepIds}
                    onNavigateTab={(tab) => setActiveTab(tab as DashboardTab)}
                  />
                )}

                {activeTab === 'roadmap' && (
                  <RoadmapTimeline
                    roadmap={analysisResult.roadmap}
                    completedStepIds={completedStepIds}
                    onToggleStep={handleToggleStep}
                  />
                )}

                {activeTab === 'gaps' && (
                  <SkillGapAnalysisView data={analysisResult.skillGapAnalysis} />
                )}

                {activeTab === 'projects' && (
                  <ProjectSuggestionsView projects={analysisResult.projectSuggestions} />
                )}

                {activeTab === 'interview' && (
                  <InterviewPrepView data={analysisResult.interviewPrep} />
                )}

                {activeTab === 'settings' && (
                  <div className="card-sage-surface rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#E2E5E0] pb-4">
                      <Settings className="h-6 w-6 text-[#4A6B5A]" />
                      <h3 className="text-xl font-bold text-[#1F2420] font-display">Application Settings</h3>
                    </div>

                    <div className="space-y-4 max-w-xl">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#EDEDE7]/50 border border-[#E2E5E0]">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="h-5 w-5 text-[#4A6B5A]" />
                          <div>
                            <div className="text-xs font-bold text-[#1F2420]">Active Session</div>
                            <div className="text-xs text-[#7A8079]">
                              {userEmail ? (isDemoMode ? `${userEmail} (Demo Mode)` : userEmail) : 'Guest Mode (Local State)'}
                            </div>
                          </div>
                        </div>
                        {userEmail ? (
                          <button
                            onClick={handleSignOut}
                            className="rounded-lg bg-white border border-[#E2E5E0] px-3 py-1 text-xs font-bold text-[#C0564A] hover:bg-[#F5E4E1]"
                          >
                            Sign Out
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsAuthOpen(true)}
                            className="rounded-lg bg-white border border-[#E2E5E0] px-3 py-1 text-xs font-bold text-[#4A6B5A] hover:bg-[#E3EDE6]"
                          >
                            Sign In
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#EDEDE7]/50 border border-[#E2E5E0]">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-[#4A6B5A]" />
                          <div>
                            <div className="text-xs font-bold text-[#1F2420]">AI Engine Provider</div>
                            <div className="text-xs text-[#7A8079]">{providerName || 'Live AI Engine'}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#4A6B5A]">Connected</span>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#EDEDE7]/50 border border-[#E2E5E0]">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-[#4A6B5A]" />
                          <div>
                            <div className="text-xs font-bold text-[#1F2420]">Milestone Notifications</div>
                            <div className="text-xs text-[#7A8079]">In-app progress indicators & streak alerts</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#4A6B5A]">Enabled</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 border-t border-[#E2E5E0] bg-white py-6 text-center text-xs text-[#7A8079] font-medium">
          <p>SkillForge AI — Personalized Career & Learning Engine</p>
        </footer>
      </div>
    </div>
  );
};
