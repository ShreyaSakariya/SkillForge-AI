'use client';

import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, signInWithGoogle } from '@/lib/supabase/client';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, isDemo?: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);

    if (configured) {
      try {
        await signInWithGoogle();
      } catch (err: any) {
        console.error('Google Sign In Error:', err);
        setErrorMessage(err?.message || 'Failed to initialize Google authentication. Please try again.');
        setLoading(false);
      }
    } else {
      // Fallback preview mode if env vars not provided
      setTimeout(() => {
        setLoading(false);
        onSuccess('google.user@skillforge.ai', false);
        onClose();
      }, 600);
    }
  };

  const handleDemoSignIn = () => {
    onSuccess('demo.explorer@skillforge.ai', true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2420]/60 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#E2E5E0] bg-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-[#7A8079] hover:bg-[#EDEDE7] hover:text-[#1F2420] transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3EDE6] border border-[#4A6B5A]/30 text-[#4A6B5A]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1F2420] font-display">
            Welcome to SkillForge AI
          </h3>
          <p className="mt-1.5 text-xs text-[#7A8079] font-medium leading-relaxed">
            Sign in with Google to save your personalized roadmaps, track skill progress, and persist user achievements.
          </p>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#C0564A]/30 bg-[#F5E4E1] p-3 text-xs text-[#C0564A] font-semibold">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-[#C0564A]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* PROMINENT GOOGLE OAUTH BUTTON */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-[#E2E5E0] bg-white py-3.5 px-4 text-sm font-bold text-[#1F2420] shadow-2xs transition-all hover:border-[#4A6B5A] hover:bg-[#EDEDE7]/40 active:scale-95 disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E2E5E0]" />
            <span className="text-[10px] font-bold text-[#7A8079] uppercase tracking-wider">OR TRY INSTANTLY</span>
            <div className="h-px flex-1 bg-[#E2E5E0]" />
          </div>

          {/* TRY DEMO GUEST SHORTCUT */}
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E3EDE6] border border-[#4A6B5A]/30 py-3 text-xs font-bold text-[#4A6B5A] hover:bg-[#4A6B5A] hover:text-white transition-all duration-200"
          >
            <Sparkles className="h-4 w-4" />
            <span>Try Demo Mode (Instant Access)</span>
          </button>

          <p className="text-[11px] text-[#7A8079] text-center font-medium mt-2">
            Demo mode generates full real AI analysis without requiring Google account sign-in.
          </p>
        </div>
      </div>
    </div>
  );
};
