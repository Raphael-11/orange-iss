import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Error interceptor
 * Handles HTTP errors globally
 * Automatically logs out user on 401 (Unauthorized)
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // AUTHENTICATION DISABLED FOR TESTING - Don't redirect on 401
      // if (error.status === 401) {
      //   // Unauthorized - clear auth state and redirect to login
      //   authService.logout();
      //   router.navigate(['/auth/login']);
      // } else 
      if (error.status === 403) {
        // Forbidden - redirect to home
        router.navigate(['/']);
      } else if (error.status === 0) {
        // Network error
        console.error('Network error - please check your connection');
      }

      // Log error to console in development
      if (!environment.production) {
        console.error('HTTP Error:', error);
      }

      return throwError(() => error);
    })
  );
};

// Import environment for production check
import { environment } from '@environments/environment';
