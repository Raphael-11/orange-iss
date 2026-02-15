import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';

/**
 * Local storage service
 * Handles browser localStorage operations with type safety
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly TOKEN_KEY = environment.jwtTokenKey;
  private readonly USER_KEY = environment.userDataKey;

  /**
   * Store JWT token
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Retrieve JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Remove JWT token
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Store user data
   */
  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Retrieve user data
   */
  getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) {
      return null;
    }
    
    try {
      return JSON.parse(userData) as User;
    } catch {
      return null;
    }
  }

  /**
   * Remove user data
   */
  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Clear all stored data
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * Store generic data
   */
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve generic data
   */
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  /**
   * Remove specific item
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
