import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService, ThemeService } from '@core/services';
import { User } from '@models/user.model';

@Component({
  selector: 'app-supervisor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="dashboard-layout">
      <aside class="dashboard-sidebar">
        <div class="sidebar-header">
          <a class="sidebar-brand" routerLink="/">
            <div class="brand-icon">O</div>
            <span>Orange ISS</span>
          </a>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Supervisor Portal</div>
            <div class="nav-item">
              <a routerLink="/supervisor" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Dashboard
              </a>
            </div>
            <div class="nav-item">
              <a routerLink="/supervisor/interns" routerLinkActive="active" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
                My Interns
              </a>
            </div>
            <div class="nav-item">
              <a routerLink="/supervisor/evaluations" routerLinkActive="active" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Evaluations
              </a>
            </div>
            <div class="nav-item">
              <a routerLink="/supervisor/profile" routerLinkActive="active" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Profile
              </a>
            </div>
          </div>
        </nav>

        <div class="sidebar-footer">
          <button class="btn btn-ghost btn-block" (click)="logout()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      <main class="dashboard-main">
        <header class="dashboard-header">
          <div class="header-left">
            <h2>Supervisor Dashboard</h2>
          </div>
          <div class="header-right">
            <button 
              class="theme-toggle" 
              (click)="themeService.toggleTheme()"
              [class.dark]="themeService.theme() === 'dark'"
              title="Toggle theme">
              <div class="toggle-slider">
                @if (themeService.theme() === 'light') {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                } @else {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                }
              </div>
            </button>
            <div class="header-user" *ngIf="currentUser">
              <div class="user-avatar">{{ currentUser.firstName?.charAt(0) }}{{ currentUser.lastName?.charAt(0) }}</div>
              <div class="user-info">
                <span class="user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
                <span class="user-role">Supervisor</span>
              </div>
            </div>
          </div>
        </header>
        <div class="dashboard-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; }
  `]
})
export class SupervisorDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  themeService = inject(ThemeService);
  currentUser: User | null = null;
  ngOnInit(): void { this.currentUser = this.authService.currentUser; }
  logout(): void { this.authService.logout(); }
}
