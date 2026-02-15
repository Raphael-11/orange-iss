/**
 * User role enumeration
 * Matches backend UserRole enum
 */
export enum UserRole {
  STUDENT = 'STUDENT',
  DEPARTMENT_CHIEF = 'DEPARTMENT_CHIEF',
  HR = 'HR',
  SUPERVISOR = 'SUPERVISOR'
}

/**
 * User interface
 * Represents authenticated user data
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data interface
 */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

/**
 * Authentication response interface
 */
export interface AuthResponse {
  accessToken: string;
  user: User;
}
