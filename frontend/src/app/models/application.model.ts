/**
 * Application status enumeration
 */
export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN'
}

/**
 * Parsed CV data interface
 */
export interface ParsedCVData {
  skills: string[];
  education: any[];
  experience: any[];
  rawText: string;
}

/**
 * Application interface
 */
export interface Application {
  id: string;
  offerId: string;
  studentId: string;
  cvPath: string;
  coverLetter: string | null;
  parsedData: ParsedCVData | null;
  aiScore: number | null;
  aiExplanation: any | null;
  status: ApplicationStatus;
  appliedAt: Date;
  reviewedAt: Date | null;
}

/**
 * Create application DTO
 */
export interface CreateApplicationDto {
  offerId: string;
  coverLetter?: string;
}
