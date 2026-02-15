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
          <h1 class="welcome-title">HR Dashboard</h1>
          <p class="welcome-text">Manage applications, candidates, and recruitment process</p>
        </div>
        <div class="stats-summary">
          <div class="summary-item">
            <div class="summary-number">{{ totalApplications }}</div>
            <div class="summary-label">Total Applications</div>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-item">
            <div class="summary-number">{{ pendingReviews }}</div>
            <div class="summary-label">Pending Reviews</div>
          </div>
        </div>
      </div>

      <!-- Stats Grid --><div class="stats-grid">
        <div class="stat-card stat-card-primary">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">+12%</span>
          </div>
          <div class="stat-value">156</div>
          <div class="stat-label">Total Candidates</div>
          <div class="stat-footer">+18 this month</div>
        </div>

        <div class="stat-card stat-card-warning">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <span class="stat-badge trend-neutral">24</span>
          </div>
          <div class="stat-value">24</div>
          <div class="stat-label">Pending Reviews</div>
          <div class="stat-footer">Requires attention</div>
        </div>

        <div class="stat-card stat-card-success">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">+8%</span>
          </div>
          <div class="stat-value">42</div>
          <div class="stat-label">Accepted</div>
          <div class="stat-footer">+3 this week</div>
        </div>

        <div class="stat-card stat-card-info">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">+5</span>
          </div>
          <div class="stat-value">18</div>
          <div class="stat-label">Active Offers</div>
          <div class="stat-footer">Across departments</div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="content-columns">
        <!-- Recent Applications -->
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Recent Applications
            </h2>
            <a routerLink="/hr/applications" class="section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="applications-list">
            <div class="application-item" *ngFor="let app of recentApplications">
              <div class="app-avatar">{{ app.candidateName.charAt(0) }}</div>
              <div class="app-content">
                <h3 class="app-title">{{ app.candidateName }}</h3>
                <p class="app-subtitle">{{ app.offerTitle }}</p>
                <div class="app-meta">
                  <span class="status-pill" [ngClass]="'status-' + app.status">{{ app.statusLabel }}</span>
                  <span class="app-date">{{ app.date }}</span>
                </div>
              </div>
              <button class="app-action" [routerLink]="['/hr/applications', app.id]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Top Candidates -->
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Top Candidates
            </h2>
            <a routerLink="/hr/candidates" class="section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="candidates-list">
            <div class="candidate-item" *ngFor="let candidate of topCandidates">
              <div class="candidate-rank">{{ candidate.rank }}</div>
              <div class="candidate-avatar">{{ candidate.name.charAt(0) }}</div>
              <div class="candidate-content">
                <h3 class="candidate-name">{{ candidate.name }}</h3>
                <p class="candidate-position">{{ candidate.position }}</p>
              </div>
              <div class="candidate-score">
                <div class="score-circle" [style.--score]="candidate.score + '%'">
                  <span class="score-value">{{ candidate.score }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Offers Overview -->
      <div class="offers-overview">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Active Offers
          </h2>
          <a routerLink="/hr/offers" class="section-link">
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div class="offers-grid">
          <div class="offer-card" *ngFor="let offer of activeOffers">
            <div class="offer-header">
              <span class="offer-badge">{{ offer.applicants }} applicants</span>
              <span class="offer-status">Active</span>
            </div>
            <h3 class="offer-title">{{ offer.title }}</h3>
            <p class="offer-department">{{ offer.department }}</p>
            <div class="offer-progress">
              <div class="progress-bar">
                <div class="progress-fill" [style.width]="(offer.applicants / offer.positions * 100) + '%'"></div>
              </div>
              <span class="progress-label">{{ offer.applicants }}/{{ offer.positions }} positions</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2 class="actions-title">Quick Actions</h2>
        <div class="actions-grid">
          <a routerLink="/hr/applications" class="action-card action-primary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h3 class="action-title">Review Applications</h3>
            <p class="action-description">Process pending applications</p>
          </a>

          <a routerLink="/hr/candidates" class="action-card action-secondary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 class="action-title">View Candidates</h3>
            <p class="action-description">Browse candidate profiles</p>
          </a>

          <a routerLink="/hr/reports" class="action-card action-tertiary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <h3 class="action-title">Generate Reports</h3>
            <p class="action-description">View recruitment analytics</p>
          </a>

          <a routerLink="/hr/offers" class="action-card action-accent">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <h3 class="action-title">Manage Offers</h3>
            <p class="action-description">View and edit job offers</p>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-home {
      padding: 2rem;
      max-width: 1600px;
      margin: 0 auto;
    }

    .welcome-banner {
      background: linear-gradient(135deg, rgba(255, 121, 0, 0.95), rgba(255, 154, 64, 0.95));
      border-radius: 20px;
      padding: 2.5rem 3rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 20px 40px rgba(255, 121, 0, 0.3);
      position: relative;
      overflow: hidden;
    }

    .welcome-banner::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 400px;
      height: 400px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }

    .welcome-content {
      position: relative;
      z-index: 1;
    }

    .welcome-title {
      font-size: 2.25rem;
      font-weight: 900;
      color: white;
      margin: 0 0 0.5rem 0;
    }

    .welcome-text {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
    }

    .stats-summary {
      display: flex;
      align-items: center;
      gap: 2rem;
      position: relative;
      z-index: 1;
    }

    .summary-item {
      text-align: center;
    }

    .summary-number {
      font-size: 3rem;
      font-weight: 900;
      color: white;
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .summary-label {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 600;
    }

    .summary-divider {
      width: 1px;
      height: 60px;
      background: rgba(255, 255, 255, 0.3);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .stat-card-primary::before { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .stat-card-warning::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .stat-card-success::before { background: linear-gradient(90deg, #10b981, #34d399); }
    .stat-card-info::before { background: linear-gradient(90deg, #ff7900, #ff9a40); }

    .stat-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
      border-color: rgba(255, 121, 0, 0.3);
    }

    .stat-card:hover::before {
      opacity: 1;
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      background: rgba(255, 121, 0, 0.1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff7900;
    }

    .stat-badge {
      padding: 0.375rem 0.75rem;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .trend-up {
      background: rgba(16, 185, 129, 0.15);
      color: #10b981;
    }

    .trend-neutral {
      background: var(--hover-bg);
      color: var(--text-tertiary);
    }

    .stat-value {
      font-size: 3rem;
      font-weight: 900;
      color: var(--text-primary);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-tertiary);
      margin-bottom: 1rem;
    }

    .stat-footer {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .content-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .content-section {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: var(--shadow);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .section-title svg {
      color: #ff7900;
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

    .applications-list, .candidates-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .application-item, .candidate-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: var(--hover-bg);
      border-radius: 12px;
      transition: all 0.2s;
    }

    .application-item:hover, .candidate-item:hover {
      background: var(--hover-glass);
      transform: translateX(4px);
    }

    .app-avatar, .candidate-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #ff7900, #ff9a40);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .candidate-rank {
      width: 32px;
      height: 32px;
      background: rgba(255, 121, 0, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff7900;
      font-size: 0.875rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .app-content, .candidate-content {
      flex: 1;
      min-width: 0;
    }

    .app-title, .candidate-name {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.25rem 0;
    }

    .app-subtitle, .candidate-position {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0 0 0.5rem 0;
    }

    .app-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .status-pill {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.625rem;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .status-pending { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
    .status-reviewing { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
    .status-accepted { background: rgba(16, 185, 129, 0.15); color: #10b981; }

    .app-date {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .app-action {
      width: 40px;
      height: 40px;
      background: rgba(255, 121, 0, 0.1);
      border: none;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff7900;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .app-action:hover {
      background: rgba(255, 121, 0, 0.2);
      transform: translateX(2px);
    }

    .candidate-score {
      flex-shrink: 0;
    }

    .score-circle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: conic-gradient(#ff7900 0% var(--score), var(--hover-bg) var(--score) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .score-circle::before {
      content: '';
      position: absolute;
      width: 44px;
      height: 44px;
      background: var(--bg-glass-strong);
      border-radius: 50%;
    }

    .score-value {
      position: relative;
      z-index: 1;
      font-size: 0.875rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .offers-overview {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow);
    }

    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .offer-card {
      background: var(--hover-bg);
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.2s;
    }

    .offer-card:hover {
      background: var(--hover-glass);
      transform: translateY(-2px);
    }

    .offer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .offer-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: #ff7900;
      background: rgba(255, 121, 0, 0.1);
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
    }

    .offer-status {
      font-size: 0.75rem;
      font-weight: 600;
      color: #10b981;
      text-transform: uppercase;
    }

    .offer-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .offer-department {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0 0 1rem 0;
    }

    .offer-progress {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: var(--hover-bg);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #ff7900, #ff9a40);
      border-radius: 4px;
      transition: width 0.3s;
    }

    .progress-label {
      font-size: 0.8125rem;
      color: var(--text-tertiary);
      font-weight: 600;
    }

    .quick-actions {
      margin-top: 2rem;
    }

    .actions-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 1.5rem 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
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
      position: relative;
      overflow: hidden;
    }

    .action-card::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .action-primary::before { background: linear-gradient(90deg, #ff7900, #ff9a40); }
    .action-secondary::before { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .action-tertiary::before { background: linear-gradient(90deg, #10b981, #34d399); }
    .action-accent::before { background: linear-gradient(90deg, #a855f7, #c084fc); }

    .action-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(255, 121, 0, 0.3);
    }

    .action-card:hover::before {
      opacity: 1;
    }

    .action-icon {
      width: 56px;
      height: 56px;
      background: rgba(255, 121, 0, 0.1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff7900;
      margin-bottom: 1.25rem;
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

    @media (max-width: 1024px) {
      .content-columns {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .dashboard-home {
        padding: 1.5rem 1rem;
      }

      .welcome-banner {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
        padding: 2rem 1.5rem;
      }

      .stats-summary {
        width: 100%;
        justify-content: center;
      }

      .offers-grid, .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardHomeComponent implements OnInit {
  totalApplications = 156;
  pendingReviews = 24;

  recentApplications = [
    { id: 1, candidateName: 'John Doe', offerTitle: 'Full Stack Developer', status: 'pending', statusLabel: 'Pending', date: '2 hours ago' },
    { id: 2, candidateName: 'Sarah Smith', offerTitle: 'UX Designer', status: 'reviewing', statusLabel: 'Reviewing', date: '5 hours ago' },
    { id: 3, candidateName: 'Mike Johnson', offerTitle: 'Data Analyst', status: 'accepted', statusLabel: 'Accepted', date: '1 day ago' },
    { id: 4, candidateName: 'Emma Wilson', offerTitle: 'Marketing Intern', status: 'pending', statusLabel: 'Pending', date: '1 day ago' },
  ];

  topCandidates = [
    { rank: 1, name: 'Alice Cooper', position: 'Full Stack Developer', score: 95 },
    { rank: 2, name: 'Bob Martin', position: 'Data Scientist', score: 92 },
    { rank: 3, name: 'Carol White', position: 'UX Designer', score: 89 },
    { rank: 4, name: 'David Brown', position: 'Backend Developer', score: 87 },
  ];

  activeOffers = [
    { id: 1, title: 'Full Stack Developer Intern', department: 'IT Department', applicants: 18, positions: 3 },
    { id: 2, title: 'UX/UI Designer', department: 'Design Team', applicants: 12, positions: 2 },
    { id: 3, title: 'Data Analyst', department: 'Analytics', applicants: 24, positions: 4 },
    { id: 4, title: 'Marketing Specialist', department: 'Marketing', applicants: 9, positions: 2 },
  ];

  ngOnInit(): void {}
}
