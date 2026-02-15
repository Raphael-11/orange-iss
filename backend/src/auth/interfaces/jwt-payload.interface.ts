import { UserRole } from '../../common/enums';

/**
 * JWT payload interface
 * Defines the structure of data stored in JWT tokens
 */
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: UserRole;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}
