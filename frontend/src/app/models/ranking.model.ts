/**
 * AI ranking result interface
 */
export interface AIRanking {
  id: string;
  offerId: string;
  applicationId: string;
  overallScore: number;
  skillMatchScore: number;
  educationScore: number;
  experienceScore: number;
  explanation: AIExplanation;
  matchedSkills: string[];
  missingSkills: MissingSkill[];
  rankedAt: Date;
}

/**
 * AI explanation interface
 */
export interface AIExplanation {
  summary: string;
  strengths: string[];
  gaps: MissingSkill[];
  detailedBreakdown: any;
}

/**
 * Missing skill interface
 */
export interface MissingSkill {
  skill: string;
  importance: number;
  level: number;
}

/**
 * Ranked candidate interface
 */
export interface RankedCandidate {
  rank: number;
  applicationId: string;
  studentId: string;
  studentName: string;
  overallScore: number;
  breakdown: {
    skillMatch: number;
    education: number;
    experience: number;
    descriptionMatch: number;
  };
  explanation: AIExplanation;
  isAnonymous: boolean;
}
