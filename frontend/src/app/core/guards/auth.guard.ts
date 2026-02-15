import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Authentication guard
 * Protects routes that require authentication
 * Checks if user is authenticated and has required role
 */
export const AuthGuard: CanActivateFn = (route, state) => {
  // AUTHENTICATION DISABLED FOR TESTING
  // TODO: Re-enable authentication before production
  return true;
  
  /* Original code - uncomment to re-enable
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated) {
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Check role-based access if roles are specified in route data
  const requiredRoles = route.data['roles'] as string[];
  if (requiredRoles && requiredRoles.length > 0) {
    const userRole = authService.currentUser?.role;
    if (!userRole || !requiredRoles.includes(userRole)) {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
  */
};
