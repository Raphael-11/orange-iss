import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, EmptyStateComponent],
  template: `
    <div class="page">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">My Applications</h1>
          <p class="page-subtitle">Track the status of your internship applications</p>
        </div>
        <div class="header-actions" *ngIf="!loading && applications.length > 0">
          <div class="stat-pills">
            <div class="stat-pill">
              <span class="stat-number">{{ applications.length }}</span>
              <span class="stat-label">Total</span>
            </div>
            <div class="stat-pill stat-pending">
              <span class="stat-number">{{ getCountByStatus('pending') }}</span>
              <span class="stat-label">Pending</span>
            </div>
            <div class="stat-pill stat-accepted">
              <span class="stat-number">{{ getCountByStatus('accepted') }}</span>
              <span class="stat-label">Accepted</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <app-loading-spinner *ngIf="loading" message="Loading applications..."></app-loading-spinner>

      <!-- Applications List -->
      <div class="applications-list" *ngIf="!loading && applications.length > 0">
        <div class="application-card" *ngFor="let application of applications">
          <div class="card-left">
            <!-- Status indicator -->
            <div class="status-indicator" [ngClass]="'indicator-' + application.status"></div>
          </div>

          <div class="card-body">
            <div class="card-top-row">
              <div class="card-info">
                <h3 class="card-title">{{ application.offerTitle }}</h3>
                <div class="card-meta">
                  <span class="meta-item" *ngIf="application.department">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    {{ application.department }}
                  </span>
                  <span class="meta-item" *ngIf="application.duration">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {{ application.duration }} months
                  </span>
                  <span class="meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Applied {{ application.createdAt | date:'mediumDate' }}
                  </span>
                </div>
              </div>

              <div class="card-right">
                <span class="status-badge" [ngClass]="'badge-' + application.status">
                  <span class="badge-dot"></span>
                  {{ formatStatus(application.status) }}
                </span>
              </div>
            </div>

            <div class="card-footer">
              <button class="details-btn">
                View details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="empty-wrapper" *ngIf="!loading && applications.length === 0">
        <div class="empty-card">
          <div class="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
          </div>
          <h3 class="empty-title">No applications yet</h3>
          <p class="empty-text">You haven't applied to any offers yet. Browse available offers to get started.</p>
          <a class="browse-btn" routerLink="/student/offers">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Browse Offers
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 1000px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    /* Header */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .page-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 6px 0;
      letter-spacing: -0.025em;
    }

    .page-subtitle {
      font-size: 0.938rem;
      color: #6b7280;
      margin: 0;
      font-weight: 400;
    }

    .stat-pills {
      display: flex;
      gap: 8px;
    }

    .stat-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: #f9fafb;
      border: 1px solid #f0f1f3;
      border-radius: 100px;
    }

    .stat-pill.stat-pending {
      background: #fffbeb;
      border-color: #fef3c7;
    }

    .stat-pill.stat-accepted {
      background: #ecfdf5;
      border-color: #d1fae5;
    }

    .stat-number {
      font-size: 0.938rem;
      font-weight: 700;
      color: #111827;
    }

    .stat-pending .stat-number {
      color: #d97706;
    }

    .stat-accepted .stat-number {
      color: #059669;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #9ca3af;
      font-weight: 500;
    }

    /* Applications List */
    .applications-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Card */
    .application-card {
      display: flex;
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      overflow: hidden;
      transition: box-shadow 0.2s, transform 0.15s;
    }

    .application-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      transform: translateY(-1px);
    }

    .card-left {
      width: 4px;
      flex-shrink: 0;
    }

    .status-indicator {
      width: 100%;
      height: 100%;
    }

    .indicator-pending {
      background: #f59e0b;
    }

    .indicator-under_review {
      background: #3b82f6;
    }

    .indicator-accepted {
      background: #10b981;
    }

    .indicator-rejected {
      background: #ef4444;
    }

    .indicator-withdrawn {
      background: #9ca3af;
    }

    .card-body {
      flex: 1;
      padding: 20px 24px;
    }

    .card-top-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 14px;
    }

    .card-title {
      font-size: 1.063rem;
      font-weight: 650;
      color: #111827;
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }

    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.788rem;
      color: #9ca3af;
      font-weight: 450;
    }

    .card-right {
      flex-shrink: 0;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
    }

    .badge-pending {
      background: #fffbeb;
      color: #92400e;
    }

    .badge-pending .badge-dot {
      background: #f59e0b;
    }

    .badge-under_review {
      background: #eff6ff;
      color: #1e40af;
    }

    .badge-under_review .badge-dot {
      background: #3b82f6;
    }

    .badge-accepted {
      background: #ecfdf5;
      color: #065f46;
    }

    .badge-accepted .badge-dot {
      background: #10b981;
    }

    .badge-rejected {
      background: #fef2f2;
      color: #991b1b;
    }

    .badge-rejected .badge-dot {
      background: #ef4444;
    }

    .badge-withdrawn {
      background: #f3f4f6;
      color: #6b7280;
    }

    .badge-withdrawn .badge-dot {
      background: #9ca3af;
    }

    .card-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 12px;
      border-top: 1px solid #f5f5f5;
    }

    .details-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: #ff7900;
      font-size: 0.813rem;
      font-weight: 600;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      padding: 4px 2px;
      transition: gap 0.2s;
    }

    .details-btn:hover {
      gap: 10px;
    }

    /* Empty State */
    .empty-wrapper {
      display: flex;
      justify-content: center;
      padding-top: 40px;
    }

    .empty-card {
      text-align: center;
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 56px 48px;
      max-width: 440px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    .empty-icon {
      margin-bottom: 20px;
    }

    .empty-title {
      font-size: 1.125rem;
      font-weight: 650;
      color: #374151;
      margin: 0 0 8px 0;
    }

    .empty-text {
      font-size: 0.875rem;
      color: #9ca3af;
      line-height: 1.6;
      margin: 0 0 28px 0;
    }

    .browse-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 24px;
      background: #ff7900;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;
    }

    .browse-btn:hover {
      background: #e06800;
    }

    @media (max-width: 768px) {
      .page {
        padding: 20px 16px;
      }

      .page-header {
        flex-direction: column;
      }

      .stat-pills {
        flex-wrap: wrap;
      }

      .card-top-row {
        flex-direction: column;
      }

      .card-body {
        padding: 16px 18px;
      }
    }
  `]
})
export class ApplicationsListComponent {
  loading = false;
  applications: any[] = [];

  constructor() {
    // Placeholder - will be replaced with actual API call
  }

  /**
   * Get count of applications by status
   */
  getCountByStatus(status: string): number {
    return this.applications.filter(a => a.status === status).length;
  }

  /**
   * Format status string for display
   */
  formatStatus(status: string): string {
    if (!status) return '';
    return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
