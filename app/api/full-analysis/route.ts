import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiAnalysis, isGeminiConfigured } from '@/lib/ai/gemini';
import { generateDynamicFallbackAnalysis } from '@/lib/ai/fallback-data';
import { FullAnalysisResult } from '@/types/skillforge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rawResumeText = '', careerGoal = '' } = body;

    if (!careerGoal || !careerGoal.trim()) {
      return NextResponse.json(
        { success: false, error: 'Career goal free-text is required.' },
        { status: 400 }
      );
    }

    const cleanResumeText =
      rawResumeText.trim() ||
      'Candidate with software engineering background, version control proficiency, database design, and web development skills.';

    // Check if GEMINI_API_KEY is configured
    if (!isGeminiConfigured()) {
      console.warn('[SkillForge API] GEMINI_API_KEY not configured or invalid. Generating smart dynamic analysis.');
      const result: FullAnalysisResult = generateDynamicFallbackAnalysis(
        cleanResumeText,
        careerGoal
      );
      return NextResponse.json({
        success: true,
        isFallback: true,
        provider: 'SkillForge AI Engine (Offline Synthesizer)',
        ...result
      });
    }

    // Call Google Gemini API for live generation
    try {
      const geminiResult = await generateGeminiAnalysis(cleanResumeText, careerGoal);
      return NextResponse.json({
        success: true,
        isFallback: false,
        provider: 'Google Gemini 1.5 Flash',
        ...geminiResult
      });
    } catch (geminiError: any) {
      console.error('[API Error] Google Gemini call failed, falling back to dynamic synthesizer:', geminiError);

      const result: FullAnalysisResult = generateDynamicFallbackAnalysis(
        cleanResumeText,
        careerGoal
      );
      return NextResponse.json({
        success: true,
        isFallback: true,
        provider: 'SkillForge AI Engine (Fallback Synthesizer)',
        ...result
      });
    }
  } catch (error: any) {
    console.error('Unhandled error in full-analysis API route:', error);

    const fallback = generateDynamicFallbackAnalysis(
      '',
      'Software Engineer'
    );
    return NextResponse.json({
      success: true,
      isFallback: true,
      provider: 'SkillForge AI Engine (Safety Synthesizer)',
      ...fallback
    });
  }
}
