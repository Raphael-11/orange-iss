import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums';

/**
 * Roles decorator key
 * Used to mark routes with required roles
 */
export const ROLES_KEY = 'roles';

/**
 * Roles decorator
 * Marks a route with required user roles for access control
 * @param roles Array of UserRole enum values
 * @example Roles(UserRole.DEPARTMENT_CHIEF, UserRole.HR)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
