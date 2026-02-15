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
          <h1 class="welcome-title">Chief Dashboard</h1>
          <p class="welcome-text">Manage department offers, reviews, and rankings</p>
        </div>
        <div class="stats-summary">
          <div class="summary-item">
            <div class="summary-number">{{ departmentOffers }}</div>
            <div class="summary-label">Department Offers</div>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-item">
            <div class="summary-number">{{ pendingApprovals }}</div>
            <div class="summary-label">Pending Approvals</div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card stat-card-primary">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">+5</span>
          </div>
          <div class="stat-value">{{ departmentOffers }}</div>
          <div class="stat-label">Active Offers</div>
          <div class="stat-footer">{{ draftOffers }} drafts pending</div>
        </div>

        <div class="stat-card stat-card-warning">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <span class="stat-badge trend-neutral">{{ totalApplications }}</span>
          </div>
          <div class="stat-value">{{ totalApplications }}</div>
          <div class="stat-label">Total Applications</div>
          <div class="stat-footer">{{ reviewsNeeded }} need review</div>
        </div>

        <div class="stat-card stat-card-success">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">{{ rankedCount }}</span>
          </div>
          <div class="stat-value">{{ rankedCount }}</div>
          <div class="stat-label">Candidates Ranked</div>
          <div class="stat-footer">{{ pendingRankings }} pending</div>
        </div>

        <div class="stat-card stat-card-info">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">+12%</span>
          </div>
          <div class="stat-value">{{ acceptedCandidates }}</div>
          <div class="stat-label">Accepted</div>
          <div class="stat-footer">This month</div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="content-columns">
        <!-- Pending Approvals -->
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Pending Approvals
            </h2>
            <a routerLink="/chief/offers" class="section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="approval-list">
            <div class="approval-item" *ngFor="let approval of pendingApprovalsList">
              <div class="approval-type-icon" [ngClass]="'icon-' + approval.type">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <div class="approval-content">
                <h3 class="approval-title">{{ approval.title }}</h3>
                <p class="approval-subtitle">{{ approval.submittedBy }} • {{ approval.date }}</p>
              </div>
              <div class="approval-actions">
                <button class="btn-approve">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </button>
                <button class="btn-reject">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Rankings -->
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
              Recent Rankings
            </h2>
            <a routerLink="/chief/rankings" class="section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="rankings-list">
            <div class="ranking-item" *ngFor="let ranking of recentRankings; let i = index">
              <div class="ranking-position" [ngClass]="'position-' + (i + 1)">
                <span class="position-number">{{ i + 1 }}</span>
              </div>
              <div class="ranking-content">
                <h3 class="ranking-name">{{ ranking.candidateName }}</h3>
                <p class="ranking-offer">{{ ranking.offerTitle }}</p>
                <div class="ranking-scores">
                  <span class="score-item">AI: {{ ranking.aiScore }}%</span>
                  <span class="score-divider">•</span>
                  <span class="score-item">Overall: {{ ranking.overallScore }}%</span>
                </div>
              </div>
              <div class="ranking-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Department Offers -->
      <div class="offers-overview">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Department Offers
          </h2>
          <a routerLink="/chief/offers" class="section-link">
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div class="offers-grid">
          <div class="offer-card" *ngFor="let offer of activeOffersList">
            <div class="offer-status-badge" [ngClass]="'status-' + offer.status">
              {{ offer.statusLabel }}
            </div>
            <h3 class="offer-title">{{ offer.title }}</h3>
            <div class="offer-meta">
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                {{ offer.applicants }} applicants
              </span>
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {{ offer.deadline }}
              </span>
            </div>
            <div class="offer-footer">
              <span class="positions-count">{{ offer.positions }} positions</span>
              <button class="btn-view" [routerLink]="['/chief/offers', offer.id]">
                View
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2 class="actions-title">Quick Actions</h2>
        <div class="actions-grid">
          <a routerLink="/chief/offers/create" class="action-card action-primary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <h3 class="action-title">Create New Offer</h3>
            <p class="action-description">Post a new internship opportunity</p>
          </a>

          <a routerLink="/chief/applications" class="action-card action-secondary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h3 class="action-title">Review Applications</h3>
            <p class="action-description">Evaluate candidate submissions</p>
          </a>

          <a routerLink="/chief/rankings" class="action-card action-tertiary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 class="action-title">Manage Rankings</h3>
            <p class="action-description">View and adjust candidate rankings</p>
          </a>

          <a routerLink="/chief/profile" class="action-card action-accent">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 class="action-title">Department Profile</h3>
            <p class="action-description">Update department information</p>
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
      background: linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(192, 132, 252, 0.95));
      border-radius: 20px;
      padding: 2.5rem 3rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
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

    .stat-card-primary::before { background: linear-gradient(90deg, #a855f7, #c084fc); }
    .stat-card-warning::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .stat-card-success::before { background: linear-gradient(90deg, #10b981, #34d399); }
    .stat-card-info::before { background: linear-gradient(90deg, #ff7900, #ff9a40); }

    .stat-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
      border-color: rgba(168, 85, 247, 0.3);
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
      background: rgba(168, 85, 247, 0.1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a855f7;
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
      color: #a855f7;
    }

    .section-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #a855f7;
      text-decoration: none;
      transition: all 0.2s;
    }

    .section-link:hover {
      gap: 0.5rem;
      color: #c084fc;
    }

    .approval-list, .rankings-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .approval-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: var(--hover-bg);
      border-radius: 12px;
      transition: all 0.2s;
    }

    .approval-item:hover {
      background: var(--hover-glass);
    }

    .approval-type-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .icon-offer { background: linear-gradient(135deg, #a855f7, #c084fc); }
    .icon-ranking { background: linear-gradient(135deg, #3b82f6, #60a5fa); }

    .approval-content {
      flex: 1;
      min-width: 0;
    }

    .approval-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.25rem 0;
    }

    .approval-subtitle {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0;
    }

    .approval-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .btn-approve, .btn-reject {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-approve {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    .btn-approve:hover {
      background: rgba(16, 185, 129, 0.2);
      transform: scale(1.05);
    }

    .btn-reject {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .btn-reject:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: scale(1.05);
    }

    .ranking-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: var(--hover-bg);
      border-radius: 12px;
      transition: all 0.2s;
    }

    .ranking-item:hover {
      background: var(--hover-glass);
      transform: translateX(4px);
    }

    .ranking-position {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 900;
      color: white;
      flex-shrink: 0;
    }

    .position-1 { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
    .position-2 { background: linear-gradient(135deg, #94a3b8, #64748b); }
    .position-3 { background: linear-gradient(135deg, #fb923c, #f97316); }
    .position-4 { background: linear-gradient(135deg, #a855f7, #c084fc); }

    .position-number {
      font-size: 1.25rem;
    }

    .ranking-content {
      flex: 1;
      min-width: 0;
    }

    .ranking-name {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.25rem 0;
    }

    .ranking-offer {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0 0 0.5rem 0;
    }

    .ranking-scores {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
    }

    .score-item {
      color: var(--text-secondary);
      font-weight: 600;
    }

    .score-divider {
      color: var(--text-muted);
    }

    .ranking-badge {
      width: 40px;
      height: 40px;
      background: rgba(168, 85, 247, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a855f7;
      flex-shrink: 0;
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
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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

    .offer-status-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }

    .status-active { background: rgba(16, 185, 129, 0.15); color: #10b981; }
    .status-draft { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }

    .offer-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 1rem 0;
    }

    .offer-meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-tertiary);
    }

    .meta-item svg {
      color: var(--text-muted);
    }

    .offer-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--border-glass);
    }

    .positions-count {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .btn-view {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 1rem;
      background: rgba(168, 85, 247, 0.1);
      color: #a855f7;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-view:hover {
      background: rgba(168, 85, 247, 0.2);
      gap: 0.5rem;
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

    .action-primary::before { background: linear-gradient(90deg, #a855f7, #c084fc); }
    .action-secondary::before { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .action-tertiary::before { background: linear-gradient(90deg, #10b981, #34d399); }
    .action-accent::before { background: linear-gradient(90deg, #ff7900, #ff9a40); }

    .action-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(168, 85, 247, 0.3);
    }

    .action-card:hover::before {
      opacity: 1;
    }

    .action-icon {
      width: 56px;
      height: 56px;
      background: rgba(168, 85, 247, 0.1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a855f7;
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
  departmentOffers = 12;
  draftOffers = 3;
  totalApplications = 87;
  reviewsNeeded = 15;
  rankedCount = 64;
  pendingRankings = 8;
  acceptedCandidates = 23;
  pendingApprovals = 5;

  pendingApprovalsList = [
    { id: 1, title: 'Backend Developer Intern', type: 'offer', submittedBy: 'John Smith', date: '2 hours ago' },
    { id: 2, title: 'AI Rankings for Data Science Position', type: 'ranking', submittedBy: 'Sarah Johnson', date: '5 hours ago' },
    { id: 3, title: 'UX Designer Internship', type: 'offer', submittedBy: 'Mike Williams', date: '1 day ago' },
  ];

  recentRankings = [
    { candidateName: 'Alice Cooper', offerTitle: 'Full Stack Developer', aiScore: 95, overallScore: 92 },
    { candidateName: 'Bob Martin', offerTitle: 'Data Scientist', aiScore: 91, overallScore: 89 },
    { candidateName: 'Carol White', offerTitle: 'Frontend Developer', aiScore: 88, overallScore: 86 },
    { candidateName: 'David Brown', offerTitle: 'Backend Developer', aiScore: 85, overallScore: 83 },
  ];

  activeOffersList = [
    { id: 1, title: 'Full Stack Developer Intern', status: 'active', statusLabel: 'Active', applicants: 24, positions: 3, deadline: '15 days' },
    { id: 2, title: 'Data Science Analyst', status: 'active', statusLabel: 'Active', applicants: 18, positions: 2, deadline: '20 days' },
    { id: 3, title: 'UX/UI Designer', status: 'draft', statusLabel: 'Draft', applicants: 0, positions: 2, deadline: 'Not published' },
    { id: 4, title: 'Backend Developer', status: 'active', statusLabel: 'Active', applicants: 15, positions: 2, deadline: '10 days' },
  ];

  ngOnInit(): void {}
}
