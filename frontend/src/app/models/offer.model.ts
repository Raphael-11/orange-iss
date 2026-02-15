/**
 * Offer status enumeration
 */
export enum OfferStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  CLOSED = 'CLOSED'
}

/**
 * Offer type enumeration
 */
export enum OfferType {
  INTERNSHIP = 'INTERNSHIP',
  PFE = 'PFE'
}

/**
 * Required skill interface
 */
export interface RequiredSkill {
  skill: string;
  level: number; // 1-5
  weight: number; // 0-1
}

/**
 * Offer interface
 */
export interface Offer {
  id: string;
  title: string;
  description: string;
  type: OfferType;
  duration: number; // in weeks
  location: string;
  department: string;
  requiredSkills: RequiredSkill[];
  status: OfferStatus;
  createdBy: string;
  approvedBy: string | null;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create offer DTO
 */
export interface CreateOfferDto {
  title: string;
  description: string;
  type: OfferType;
  duration: number;
  location: string;
  department: string;
  requiredSkills: RequiredSkill[];
  deadline: Date;
}

/**
 * Update offer DTO
 */
export interface UpdateOfferDto extends Partial<CreateOfferDto> {}
