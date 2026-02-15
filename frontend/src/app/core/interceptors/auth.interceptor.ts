import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

/**
 * Authentication interceptor
 * Adds JWT token to outgoing HTTP requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // AUTHENTICATION DISABLED FOR TESTING
  // TODO: Re-enable authentication before production
  return next(req);
  
  /* Original code - uncomment to re-enable
  const storage = inject(LocalStorageService);
  const token = storage.getToken();

  // Clone request and add authorization header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
  */
};
