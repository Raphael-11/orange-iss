import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'orange-iss-theme';
  
  // Signal for reactive theme
  theme = signal<Theme>(this.getStoredTheme());

  constructor() {
    // Apply theme on init
    this.applyTheme(this.theme());
    
    // Watch for theme changes
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme);
      localStorage.setItem(this.THEME_KEY, currentTheme);
    });
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  /**
   * Set specific theme
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  /**
   * Get stored theme from localStorage or system preference
   */
  private getStoredTheme(): Theme {
    const stored = localStorage.getItem(this.THEME_KEY) as Theme;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }
}
