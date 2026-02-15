import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService, ThemeService } from '@core/services';
import { User } from '@models/user.model';

@Component({
  selector: 'app-chief-dashboard',
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
            <div class="nav-section-title">Chief Portal</div>
            <div class="nav-item">
              <a routerLink="/chief" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Dashboard
              </a>
            </div>
            <div class="nav-item">
              <a routerLink="/chief/offers" routerLinkActive="active" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                My Offers
              </a>
            </div>
            <div class="nav-item">
              <a routerLink="/chief/applications" routerLinkActive="active" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Applications
              </a>
            </div>
            <div class="nav-item">
              <a routerLink="/chief/rankings" routerLinkActive="active" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                AI Rankings
              </a>
            </div>
            <div class="nav-item">
              <a routerLink="/chief/profile" routerLinkActive="active" class="nav-link">
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
            <h2>Chief Dashboard</h2>
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
                <span class="user-role">Department Chief</span>
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
    :host { display: block; }
    .dash-layout { display: flex; min-height: 100vh; background: #f5f6f8; }

    .sidebar { width: 272px; background: #ffffff; border-right: 1px solid #f0f1f3; padding: 1.5rem; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; overflow-y: auto; }

    .sidebar-brand { display: flex; align-items: center; gap: 0.625rem; margin-bottom: 2rem; }
    .brand-mark { width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, #ff7900, #e06800); }
    .sidebar-brand span { font-weight: 800; font-size: 1.05rem; color: #111827; letter-spacing: -0.02em; }

    .user-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem; background: #fafbfc; border-radius: 14px; margin-bottom: 2rem; border: 1px solid #f0f1f3; }
    .user-avatar { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #ff7900, #ff9a40); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0; }
    .user-info { display: flex; flex-direction: column; min-width: 0; }
    .user-info strong { font-size: 0.875rem; font-weight: 700; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .user-info span { font-size: 0.75rem; color: #9ca3af; font-weight: 500; }

    .nav-section { flex: 1; }
    .nav-label { font-size: 0.7rem; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; padding: 0 0.75rem; margin-bottom: 0.5rem; display: block; }
    nav { display: flex; flex-direction: column; gap: 2px; }
    nav a { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 12px; color: #6b7280; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: all 0.2s; }
    nav a:hover { background: #fafbfc; color: #111827; }
    nav a.active { background: rgba(255,121,0,0.08); color: #e06800; font-weight: 600; }
    nav a.active svg { stroke: #ff7900; }

    .sidebar-bottom { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #f0f1f3; }
    .logout-btn { display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem; border-radius: 12px; border: none; background: none; color: #6b7280; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; }
    .logout-btn:hover { background: #fef2f2; color: #ef4444; }
    .logout-btn:hover svg { stroke: #ef4444; }

    .main-content { flex: 1; margin-left: 272px; padding: 2rem; min-height: 100vh; }

    @media (max-width: 768px) {
      .sidebar { width: 100%; position: relative; border-right: none; border-bottom: 1px solid #f0f1f3; }
      .main-content { margin-left: 0; }
      .dash-layout { flex-direction: column; }
    }
  `]
})
export class ChiefDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  themeService = inject(ThemeService);
  currentUser: User | null = null;
  ngOnInit(): void { this.currentUser = this.authService.currentUser; }
  logout(): void { this.authService.logout(); }
}
