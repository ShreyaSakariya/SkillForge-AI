import { FullAnalysisResult } from '@/types/skillforge';
import { cleanRoleTitle } from '@/lib/utils/role-normalizer';
import { searchTavilyResources, TavilySearchResult } from '@/lib/ai/tavily';
import { PERSONALIZATION_INSTRUCTION } from '@/lib/ai/prompts';

export const isGeminiConfigured = (): boolean => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return false;
  const trimmed = apiKey.trim();
  return (
    trimmed !== '' &&
    trimmed !== 'your_actual_key_here' &&
    trimmed !== 'your-gemini-api-key-here' &&
    !trimmed.startsWith('your_') &&
    trimmed.length > 10
  );
};

export async function generateGeminiAnalysis(
  rawResumeText: string,
  careerGoal: string
): Promise<FullAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!isGeminiConfigured() || !apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not configured or is invalid. Please set a valid GEMINI_API_KEY in .env.local.'
    );
  }

  const cleanTargetRole = cleanRoleTitle(careerGoal);

  console.log(`[Gemini Engine] Generating 100% live AI analysis for role: "${cleanTargetRole}" with Gemini API...`);

  // Pre-search Tavily live search results for real course grounding BEFORE Gemini call
  let liveSearchResults: TavilySearchResult[] = [];
  try {
    liveSearchResults = await searchTavilyResources(cleanTargetRole, cleanTargetRole);
    console.log(`[Gemini Engine] Pre-fetched ${liveSearchResults.length} live search results for "${cleanTargetRole}".`);
  } catch (searchErr) {
    console.warn('[Gemini Engine] Pre-search Tavily fetch failed:', searchErr);
  }

  const searchResultsText = liveSearchResults.length > 0
    ? liveSearchResults.map((r, i) => `${i + 1}. Title: "${r.title}" | URL: ${r.url} | Snippet: ${r.content}`).join('\n')
    : 'No live web search results retrieved.';

  // Prompt Construction for Gemini API with ZERO-TEMPLATE MANDATE
  const prompt = `
You are Google Gemini, an elite AI Career & Learning Architect.
${PERSONALIZATION_INSTRUCTION}

USER RAW CAREER GOAL: "${careerGoal}"
CLEAN TARGET JOB TITLE: "${cleanTargetRole}"

CANDIDATE RESUME & BACKGROUND TEXT:
"""
${rawResumeText}
"""

REAL LIVE TAVILY SEARCH RESULTS FOR REAL COURSE GROUNDING:
"""
${searchResultsText}
"""

CRITICAL ZERO-TEMPLATE MANDATE:
1. Every single field (phase title, subtitle, phase description, step title, step description, key deliverable artifact, bridges gap tags, suggested resource title/URL, project title, tech stack, and interview question stem) MUST be 100% custom-crafted for "${cleanTargetRole}" and the candidate's exact background.
2. NEVER use generic string-interpolation templates like "Build End-to-End System Pipeline for ${cleanTargetRole}" or "Designing ${cleanTargetRole} Production Applications".
3. NON-TECHNICAL OR NON-DEVOPS ROLES (e.g. Business Analyst, Marine Biologist, UX Designer, Marketing Specialist, Financial Analyst, HR Specialist, Product Manager) MUST NEVER CONTAIN SOFTWARE ENGINEERING TASKS like Docker, Kubernetes, CI/CD pipelines, or containerization unless explicitly present in candidate's resume.
4. If real Tavily search results are provided above, select suggested learning resources ONLY from those real search results, incorporating their exact real title, description, and clickable URL.
5. Perform a self-check before finalizing: if you swapped the goal to a completely different domain and the sentence structure or deliverable shape stayed the same, revise it immediately.

Return ONLY a single valid JSON object strictly matching this schema:
{
  "resume": {
    "skills": {
      "languages": ["string"],
      "frameworks": ["string"],
      "tools": ["string"],
      "softSkills": ["string"]
    },
    "experienceSummary": "string",
    "education": [{"institution": "string", "degree": "string", "year": "string"}],
    "notableProjects": [{"title": "string", "description": "string", "techUsed": ["string"]}],
    "yearsOfExperience": number,
    "rawText": "${rawResumeText.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
  },
  "skillGapAnalysis": {
    "targetRole": "${cleanTargetRole}",
    "matchPercentage": number,
    "summary": "string",
    "personalizationNote": "string",
    "strengths": ["string"],
    "gaps": [
      {
        "id": "gap-1",
        "category": "string",
        "skillName": "string",
        "currentLevel": "None | Beginner | Intermediate",
        "targetLevel": "Advanced | Expert",
        "importance": "Critical | High | Medium",
        "reasoning": "string"
      }
    ]
  },
  "roadmap": {
    "id": "roadmap-gemini-1",
    "careerGoal": "${cleanTargetRole}",
    "generatedAt": "${new Date().toISOString()}",
    "totalEstimatedWeeks": number,
    "personalizationNote": "string",
    "phases": [
      {
        "id": "phase-1",
        "phaseNumber": 1,
        "title": "string",
        "subtitle": "string",
        "description": "string",
        "durationWeeks": number,
        "steps": [
          {
            "id": "step-1-1",
            "title": "string",
            "description": "string",
            "skillGapsAddressed": ["string"],
            "estimatedHours": number,
            "effortLevel": "Easy | Moderate | Challenging | Intense",
            "keyDeliverable": "string",
            "completed": false,
            "personalizationNote": "string",
            "suggestedResources": [
              {
                "type": "Course | Documentation | Book | Project | Video Tutorial",
                "title": "string",
                "description": "string",
                "estimatedHours": number,
                "url": "string"
              }
            ]
          }
        ]
      }
    ]
  },
  "projectSuggestions": [
    {
      "id": "proj-1",
      "title": "string",
      "description": "string",
      "targetSkillGap": "string",
      "difficulty": "Beginner | Intermediate | Advanced",
      "techStack": ["string"],
      "keyFeatures": ["string"],
      "stretchGoals": ["string"],
      "architectureOverview": "string",
      "personalizationNote": "string"
    }
  ],
  "interviewPrep": {
    "targetRole": "${cleanTargetRole}",
    "personalizationNote": "string",
    "questions": [
      {
        "id": "q-1",
        "category": "Technical | System Design | Behavioral | Domain Specific",
        "question": "string",
        "context": "string",
        "talkingPoints": ["string"],
        "modelAnswer": "string",
        "difficulty": "Easy | Medium | Hard",
        "personalizationNote": "string"
      }
    ]
  }
}
`;

  try {
    // Prioritize high-availability fast Gemini model endpoints
    const modelsToTry = [
      'gemini-3.6-flash',
      'gemini-1.5-flash',
      'gemini-flash-latest',
      'gemini-2.5-flash-lite',
      'gemini-pro-latest'
    ];
    let lastErrorText = '';
    let candidateText = '';

    for (const model of modelsToTry) {
      try {
        console.log(`[Gemini Engine] Attempting live generation with model: ${model}...`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192,
                responseMimeType: 'application/json'
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (candidateText) {
            console.log(`[Gemini Engine] Successfully generated live content using model: ${model}`);
            break;
          }
        } else {
          lastErrorText = await response.text();
          console.warn(`[Gemini Engine] Model ${model} returned status ${response.status}:`, lastErrorText.slice(0, 200));
        }
      } catch (modelErr: any) {
        console.warn(`[Gemini Engine] Error calling model ${model}:`, modelErr?.message);
      }
    }

    if (!candidateText) {
      throw new Error(`Gemini API Error across all models. Last status detail: ${lastErrorText}`);
    }

    let cleanedText = candidateText.trim();
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    }

    let parsed: FullAnalysisResult;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (parseErr: any) {
      console.error('[Gemini Engine] JSON parse error:', parseErr.message, 'Raw Snippet:', cleanedText.slice(0, 200));
      throw new Error(`Failed to parse AI response as JSON: ${parseErr.message}`);
    }

    // Clean target roles across nested objects
    if (parsed?.skillGapAnalysis) parsed.skillGapAnalysis.targetRole = cleanTargetRole;
    if (parsed?.roadmap) parsed.roadmap.careerGoal = cleanTargetRole;
    if (parsed?.interviewPrep) parsed.interviewPrep.targetRole = cleanTargetRole;

    // Ground course resources using Tavily live search if available
    if (liveSearchResults.length > 0 && parsed.roadmap?.phases) {
      let searchIdx = 0;
      parsed.roadmap.phases.forEach((phase) => {
        phase.steps.forEach((step) => {
          if (!step.suggestedResources || step.suggestedResources.length === 0) {
            step.suggestedResources = [];
          }
          if (searchIdx < liveSearchResults.length) {
            const searchRes = liveSearchResults[searchIdx % liveSearchResults.length];
            searchIdx++;
            step.suggestedResources.unshift({
              type: 'Course',
              title: searchRes.title,
              description: searchRes.content.slice(0, 140) + '...',
              estimatedHours: 10,
              url: searchRes.url
            });
          }
        });
      });
    }

    return parsed;
  } catch (err: any) {
    console.error('[Gemini Engine] Live generation failed:', err);
    throw err;
  }
}
