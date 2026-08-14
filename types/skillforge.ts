export interface StructuredResume {
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    softSkills: string[];
  };
  experienceSummary: string;
  education: Array<{
    institution: string;
    degree: string;
    year?: string;
  }>;
  notableProjects: Array<{
    title: string;
    description: string;
    techUsed: string[];
  }>;
  yearsOfExperience: number;
  rawText?: string;
}

export interface SkillGap {
  id: string;
  category: string;
  skillName: string;
  currentLevel: 'None' | 'Beginner' | 'Intermediate';
  targetLevel: 'Intermediate' | 'Advanced' | 'Expert';
  importance: 'Critical' | 'High' | 'Medium';
  reasoning: string;
}

export interface SkillGapAnalysis {
  targetRole: string;
  matchPercentage: number;
  gaps: SkillGap[];
  strengths: string[];
  summary: string;
  personalizationNote?: string;
}

export interface RoadmapResource {
  type: 'Course' | 'Documentation' | 'Book' | 'Project' | 'Video Tutorial';
  title: string;
  description: string;
  estimatedHours: number;
  url?: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  skillGapsAddressed: string[];
  estimatedHours: number;
  effortLevel: 'Easy' | 'Moderate' | 'Challenging' | 'Intense';
  suggestedResources: RoadmapResource[];
  keyDeliverable: string;
  completed: boolean;
  personalizationNote?: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  description: string;
  durationWeeks: number;
  steps: RoadmapStep[];
}

export interface RoadmapData {
  id: string;
  careerGoal: string;
  generatedAt: string;
  totalEstimatedWeeks: number;
  phases: RoadmapPhase[];
  personalizationNote?: string;
}

export interface ProjectSuggestion {
  id: string;
  title: string;
  description: string;
  targetSkillGap: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  keyFeatures: string[];
  stretchGoals: string[];
  architectureOverview: string;
  personalizationNote?: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'Technical' | 'System Design' | 'Behavioral' | 'Domain Specific' | 'Case / Scenario';
  question: string;
  context: string;
  talkingPoints: string[];
  modelAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  personalizationNote?: string;
}

export interface InterviewPrepData {
  targetRole: string;
  questions: InterviewQuestion[];
  personalizationNote?: string;
}

export interface FullAnalysisResult {
  resume: StructuredResume;
  skillGapAnalysis: SkillGapAnalysis;
  roadmap: RoadmapData;
  projectSuggestions: ProjectSuggestion[];
  interviewPrep: InterviewPrepData;
}
