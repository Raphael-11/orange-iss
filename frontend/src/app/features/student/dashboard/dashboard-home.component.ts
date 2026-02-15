import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-home">
      <!-- Welcome Banner -->
    <div class="welcome-banner">
        <div class="welcome-content">
          <h1 class="welcome-title">Welcome back! 👋</h1>
          <p class="welcome-text">Track your applications and discover new opportunities</p>
        </div>
        <div class="welcome-illustration">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="url(#gradient1)" opacity="0.2"/>
            <circle cx="100" cy="100" r="60" fill="url(#gradient2)" opacity="0.3"/>
            <path d="M100 60 L120 90 H80 Z" fill="#ff7900" opacity="0.8"/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff7900;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ff9a40;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff9a40;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ffb366;stop-opacity:1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">24</div>
            <div class="stat-label">Available Offers</div>
            <div class="stat-change positive">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              +3 this week
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">8</div>
            <div class="stat-label">My Applications</div>
            <div class="stat-change neutral">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              No change
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">3</div>
            <div class="stat-label">Pending Reviews</div>
            <div class="stat-change neutral">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Under review
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">2</div>
            <div class="stat-label">Accepted</div>
            <div class="stat-change positive">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              +1 today
            </div>
          </div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="content-columns">
        <!-- Left Column - Recent Offers -->
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">Recent Offers</h2>
            <a routerLink="/student/offers" class="section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>
          
          <div class="offers-list">
            <div class="offer-item" *ngFor="let offer of recentOffers">
              <div class="offer-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div class="offer-content">
                <h3 class="offer-title">{{ offer.title }}</h3>
                <div class="offer-meta">
                  <span>{{ offer.department }}</span>
                  <span class="dot">•</span>
                  <span>{{ offer.duration }} months</span>
                </div>
              </div>
              <button class="offer-action" [routerLink]="['/student/offers', offer.id]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column - Application Status -->
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">Application Status</h2>
            <a routerLink="/student/applications" class="section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="status-list">
            <div class="status-item" *ngFor="let app of applications">
              <div class="status-indicator" [ngClass]="'status-' + app.status"></div>
              <div class="status-content">
                <h3 class="status-title">{{ app.offerTitle }}</h3>
                <div class="status-meta">
                  <span class="status-badge" [ngClass]="'badge-' + app.status">{{ app.statusLabel }}</span>
                  <span class="status-date">{{ app.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2 class="actions-title">Quick Actions</h2>
        <div class="actions-grid">
          <a routerLink="/student/offers" class="action-card">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <h3 class="action-title">Browse Offers</h3>
            <p class="action-description">Discover new internship opportunities</p>
          </a>

          <a routerLink="/student/applications" class="action-card">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h3 class="action-title">My Applications</h3>
            <p class="action-description">Track your application status</p>
          </a>

          <a routerLink="/student/profile" class="action-card">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 class="action-title">Update Profile</h3>
            <p class="action-description">Keep your information current</p>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-home {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .welcome-banner {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem 2.5rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow);
    }

    .welcome-title {
      font-size: 2rem;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .welcome-text {
      font-size: 1rem;
      color: var(--text-tertiary);
      margin: 0;
    }

    .welcome-illustration {
      width: 120px;
      height: 120px;
      flex-shrink: 0;
    }

    .welcome-illustration svg {
      width: 100%;
      height: 100%;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 1.75rem;
      display: flex;
      gap: 1.25rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow);
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(255, 121, 0, 0.3);
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon-blue { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
    .stat-icon-orange { background: rgba(255, 121, 0, 0.15); color: #ff7900; }
    .stat-icon-purple { background: rgba(168, 85, 247, 0.15); color: #a855f7; }
    .stat-icon-green { background: rgba(16, 185, 129, 0.15); color: #10b981; }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-tertiary);
      margin-bottom: 0.5rem;
    }

    .stat-change {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
    }

    .stat-change.positive {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    .stat-change.neutral {
      background: var(--hover-bg);
      color: var(--text-tertiary);
    }

    .content-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .content-section {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 1.75rem;
      box-shadow: var(--shadow);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }

    .section-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #ff7900;
      text-decoration: none;
      transition: all 0.2s;
    }

    .section-link:hover {
      gap: 0.5rem;
      color: #ff9a40;
    }

    .offers-list, .status-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .offer-item, .status-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--hover-bg);
      border-radius: 12px;
      transition: all 0.2s;
    }

    .offer-item:hover, .status-item:hover {
      background: var(--hover-glass);
      transform: translateX(4px);
    }

    .offer-icon {
      width: 40px;
      height: 40px;
      background: rgba(255, 121, 0, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .offer-content {
      flex: 1;
      min-width: 0;
    }

    .offer-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.25rem 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .offer-meta {
      font-size: 0.8125rem;
      color: var(--text-tertiary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dot {
      color: var(--text-muted);
    }

    .offer-action {
      width: 36px;
      height: 36px;
      background: rgba(255, 121, 0, 0.1);
      border: none;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff7900;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .offer-action:hover {
      background: rgba(255, 121, 0, 0.2);
      transform: translateX(2px);
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .status-pending { background: #f59e0b; }
    .status-accepted { background: #10b981; }
    .status-rejected { background: #ef4444; }
    .status-reviewing { background: #3b82f6; }

    .status-content {
      flex: 1;
    }

    .status-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .status-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .status-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.625rem;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .badge-pending { background: rgba(245, 158, 11, 0.15); color: #f59e0b;  }
    .badge-accepted { background: rgba(16, 185, 129, 0.15); color: #10b981; }
    .badge-rejected { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
    .badge-reviewing { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }

    .status-date {
      font-size: 0.8125rem;
      color: var(--text-tertiary);
    }

    .quick-actions {
      margin-top: 2rem;
    }

    .actions-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 1.5rem 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow);
    }

    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(255, 121, 0, 0.3);
    }

    .action-icon {
      width: 48px;
      height: 48px;
      background: rgba(255, 121, 0, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff7900;
      margin-bottom: 1rem;
    }

    .action-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .action-description {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0;
    }

    @media (max-width: 768px) {
      .dashboard-home {
        padding: 1.5rem 1rem;
      }

      .welcome-banner {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .welcome-illustration {
        width: 80px;
        height: 80px;
      }

      .content-columns {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardHomeComponent implements OnInit {
  recentOffers = [
    { id: 1, title: 'Full Stack Developer Intern', department: 'IT Department', duration: 6 },
    { id: 2, title: 'UX/UI Designer Internship', department: 'Design Team', duration: 4 },
    { id: 3, title: 'Data Analyst Position', department: 'Analytics', duration: 5 },
    { id: 4, title: 'Marketing Intern', department: 'Marketing', duration: 3 },
  ];

  applications = [
    { id: 1, offerTitle: 'Full Stack Developer Intern', status: 'reviewing', statusLabel: 'Under Review', date: '2 days ago' },
    { id: 2, offerTitle: 'Mobile App Developer', status: 'accepted', statusLabel: 'Accepted', date: '1 week ago' },
    { id: 3, offerTitle: 'Frontend Developer Intern', status: 'pending', statusLabel: 'Pending', date: '3 days ago' },
  ];

  ngOnInit(): void {}
}
