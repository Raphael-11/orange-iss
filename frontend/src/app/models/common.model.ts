/**
 * API response wrapper interface
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * API error response interface
 */
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

/**
 * Notification type enumeration
 */
export enum NotificationType {
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  APPLICATION_ACCEPTED = 'APPLICATION_ACCEPTED',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  OFFER_APPROVED = 'OFFER_APPROVED',
  OFFER_REJECTED = 'OFFER_REJECTED',
  DEADLINE_REMINDER = 'DEADLINE_REMINDER',
  EVALUATION_REQUIRED = 'EVALUATION_REQUIRED'
}

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
