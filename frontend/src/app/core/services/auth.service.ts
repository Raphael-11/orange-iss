import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { User, UserRole, LoginCredentials, RegisterData, AuthResponse } from '@models/user.model';
import { LocalStorageService } from './local-storage.service';

/**
 * Authentication service
 * Handles user authentication, registration, and session management
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly storage = inject(LocalStorageService);
  
  private readonly apiUrl = environment.apiUrl;
  
  // AUTHENTICATION DISABLED FOR TESTING - Mock user data
  private mockUser: User = {
    id: '1',
    email: 'test@orange.com',
    firstName: 'Test',
    lastName: 'User',
    role: UserRole.STUDENT, // Change this to test different roles: STUDENT, DEPARTMENT_CHIEF, HR, SUPERVISOR
    isActive: true,
    isEmailVerified: true,
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  private currentUserSubject = new BehaviorSubject<User | null>(this.mockUser);
  
  /**
   * Observable stream of current user
   */
  public currentUser$ = this.currentUserSubject.asObservable();

  /**
   * Get current user value
   */
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  get isAuthenticated(): boolean {
    // AUTHENTICATION DISABLED FOR TESTING
    return true;
    
    // Original code - uncomment to re-enable
    // return !!this.storage.getToken() && !!this.currentUser;
  }

  /**
   * Check if current user has specific role
   */
  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }

  /**
   * Login user with credentials
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.storage.setToken(response.accessToken);
          this.storage.setUser(response.user);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  /**
   * Register new user
   */
  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data)
      .pipe(
        tap(response => {
          this.storage.setToken(response.accessToken);
          this.storage.setUser(response.user);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  /**
   * Logout current user
   */
  logout(): void {
    // AUTHENTICATION DISABLED FOR TESTING
    this.router.navigate(['/']);
    
    /* Original code - uncomment to re-enable
    this.storage.removeToken();
    this.storage.removeUser();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
    */
  }

  /**
   * Get current user profile
   */
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`)
      .pipe(
        tap(user => {
          this.storage.setUser(user);
          this.currentUserSubject.next(user);
        })
      );
  }

  /**
   * Refresh authentication state from storage
   */
  refreshAuthState(): void {
    const user = this.storage.getUser();
    this.currentUserSubject.next(user);
  }
}
