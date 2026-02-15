/**
 * User roles enum
 * Defines all possible user roles in the system
 */
export enum UserRole {
  STUDENT = 'STUDENT',
  DEPARTMENT_CHIEF = 'DEPARTMENT_CHIEF',
  HR = 'HR',
  SUPERVISOR = 'SUPERVISOR',
}

/**
 * Offer status enum
 * Defines the lifecycle states of an internship/PFE offer
 */
export enum OfferStatus {
  PENDING = 'PENDING', // Awaiting HR approval
  APPROVED = 'APPROVED', // Approved by HR but not yet published
  PUBLISHED = 'PUBLISHED', // Active and visible to students
  REJECTED = 'REJECTED', // Rejected by HR
  CLOSED = 'CLOSED', // No longer accepting applications
}

/**
 * Offer type enum
 * Distinguishes between internship and PFE offers
 */
export enum OfferType {
  INTERNSHIP = 'INTERNSHIP',
  PFE = 'PFE',
}

/**
 * Application status enum
 * Tracks the lifecycle of a student application
 */
export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED', // Application submitted by student
  UNDER_REVIEW = 'UNDER_REVIEW', // Being reviewed by department chief
  SHORTLISTED = 'SHORTLISTED', // Selected by AI ranking
  ACCEPTED = 'ACCEPTED', // Accepted by department chief
  REJECTED = 'REJECTED', // Rejected by department chief
  WITHDRAWN = 'WITHDRAWN', // Withdrawn by student
}

/**
 * Notification type enum
 * Categorizes different types of system notifications
 */
export enum NotificationType {
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  APPLICATION_ACCEPTED = 'APPLICATION_ACCEPTED',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  OFFER_APPROVED = 'OFFER_APPROVED',
  OFFER_REJECTED = 'OFFER_REJECTED',
  DEADLINE_REMINDER = 'DEADLINE_REMINDER',
  EVALUATION_REQUIRED = 'EVALUATION_REQUIRED',
}

/**
 * File mime types allowed for CV upload
 */
export const ALLOWED_CV_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

/**
 * Maximum file size for CV uploads (5MB)
 */
export const MAX_CV_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Maximum number of offers per department chief
 */
export const MAX_OFFERS_PER_CHIEF = 3;

/**
 * Skill level enum
 * Represents proficiency levels for required skills
 */
export enum SkillLevel {
  BEGINNER = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
  EXPERT = 4,
  MASTER = 5,
}
