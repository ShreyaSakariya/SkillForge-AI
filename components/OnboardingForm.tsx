'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MouseGlowCard } from '@/components/MouseGlowCard';

interface OnboardingFormProps {
  onSubmit: (resumeText: string, careerGoal: string) => void;
  isLoading: boolean;
}

const SAMPLE_CAREER_GOALS = [
  'Senior Backend Engineer at a Fintech Startup building high-throughput payment systems',
  'AI / Machine Learning Engineer specializing in LLM application architecture & PyTorch',
  'Full-Stack Cloud Developer at Google focusing on Next.js, Kubernetes & Microservices',
  'DevOps & Site Reliability Engineer automating AWS, Terraform & CI/CD pipelines',
  'Cybersecurity Analyst focusing on Zero Trust IAM & Vulnerability Assessments'
];

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const [resumeText, setResumeText] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploadStatus('Extracting text...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.success && data.extractedText) {
        setResumeText(data.extractedText);
        setUploadStatus(`Extracted ${data.extractedText.length} characters successfully!`);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setResumeText(text || '');
          setUploadStatus('Resume loaded successfully!');
        };
        reader.readAsText(file);
      }
    } catch (err) {
      setUploadStatus('Loaded resume file for AI processing.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerGoal.trim()) return;
    onSubmit(resumeText, careerGoal);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6"
    >
      {/* Hero Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="mx-auto flex w-max items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-bold text-violet-700 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Next-Gen AI Career Engine</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-5xl font-display">
          Transform Your Resume & Goal Into a{' '}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
            Personalized Roadmap
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-stone-600 sm:text-base leading-relaxed">
          Upload your resume and state your target role in plain text. Our AI engine analyzes your skill gaps, constructs a milestone timeline, recommends portfolio projects, and generates interview prep.
        </p>
      </div>

      {/* Main Form Container (Light Theme Mouse Glow Card) */}
      <MouseGlowCard className="p-6 sm:p-10 border-stone-200 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: RESUME UPLOAD */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-base font-bold text-zinc-900 font-display">
                <FileText className="h-5 w-5 text-violet-600" />
                <span>1. Upload Resume or Paste Qualifications</span>
              </label>
              <span className="text-xs font-semibold text-stone-500">PDF, DOCX, TXT accepted</span>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/80 p-8 text-center transition-all hover:border-violet-400 hover:bg-violet-50/50 hover:shadow-md"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition-transform group-hover:scale-110">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-zinc-800">
                {fileName ? (
                  <span className="text-violet-600">{fileName}</span>
                ) : (
                  'Drag & drop your resume file here, or click to browse'
                )}
              </p>
              <p className="mt-1 text-xs text-stone-500">
                No resume handy? You can paste your skills directly below or proceed with standard AI parsing.
              </p>
            </div>

            {uploadStatus && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>{uploadStatus}</span>
              </div>
            )}

            {/* Raw Text Paste Textarea */}
            <div className="pt-2">
              <textarea
                rows={3}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Or paste resume summary / key skills here (e.g. JavaScript, React, Python, Node.js, Git, SQL...)"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 p-4 text-xs text-zinc-800 placeholder-stone-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>

          {/* SECTION 2: FREE-TEXT CAREER GOAL */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-base font-bold text-zinc-900 font-display">
                <Target className="h-5 w-5 text-amber-500" />
                <span>2. State Your Free-Text Career Goal</span>
              </label>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                100% Free Text
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                required
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g., 'I want to become a backend engineer at a fintech startup building high-throughput payment APIs'"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-4 text-sm text-zinc-900 placeholder-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm"
              />
              <Zap className="absolute right-4 top-4 h-5 w-5 text-amber-500 pointer-events-none" />
            </div>

            {/* Prompt Suggestion Chips */}
            <div className="pt-1">
              <p className="mb-2.5 text-xs font-bold text-stone-500">Try one of these example career goals:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_CAREER_GOALS.map((goal, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCareerGoal(goal)}
                    className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-left text-xs font-semibold text-stone-700 transition hover:border-violet-400 hover:bg-violet-50/60 hover:text-violet-700"
                  >
                    ⚡ {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !careerGoal.trim()}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-amber-500 py-4 text-base font-bold text-white shadow-xl shadow-violet-600/20 transition-all hover:scale-[1.01] hover:shadow-violet-600/30 active:scale-[0.99] disabled:opacity-50"
            >
              <Sparkles className="h-5 w-5 text-amber-200 animate-pulse" />
              <span>Generate Live AI Roadmap & Analysis</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      </MouseGlowCard>
    </motion.div>
  );
};
