import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1>Applications</h1>
          <p class="subtitle">Review applications submitted for your internship offers</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="stat-pills">
        <div class="stat-pill">
          <span class="stat-value">{{ applications.length }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat-pill">
          <span class="stat-value stat-amber">{{ pendingCount }}</span>
          <span class="stat-label">Pending</span>
        </div>
        <div class="stat-pill">
          <span class="stat-value stat-blue">{{ reviewCount }}</span>
          <span class="stat-label">Under Review</span>
        </div>
        <div class="stat-pill">
          <span class="stat-value stat-green">{{ acceptedCount }}</span>
          <span class="stat-label">Accepted</span>
        </div>
      </div>

      <!-- Application Cards -->
      <div class="cards-grid" *ngIf="applications.length > 0">
        <div class="app-card" *ngFor="let app of applications" (click)="viewApplication(app.id)">
          <div class="app-card-top">
            <div class="applicant-avatar">{{ getInitials(app.applicantName) }}</div>
            <div class="applicant-info">
              <h3>{{ app.applicantName }}</h3>
              <p>{{ app.applicantEmail }}</p>
            </div>
            <span class="status-pill" [class]="'status-' + app.status">
              {{ getStatusLabel(app.status) }}
            </span>
          </div>
          <div class="app-card-body">
            <div class="app-detail">
              <span class="detail-label">Applied for</span>
              <span class="detail-value">{{ app.offerTitle }}</span>
            </div>
            <div class="app-detail">
              <span class="detail-label">Applied on</span>
              <span class="detail-value">{{ app.appliedDate | date: 'mediumDate' }}</span>
            </div>
            <div class="app-detail" *ngIf="app.university">
              <span class="detail-label">University</span>
              <span class="detail-value">{{ app.university }}</span>
            </div>
          </div>
          <div class="app-card-footer">
            <button class="btn-view">
              View Details
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="applications.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <h3>No applications yet</h3>
        <p>Applications will appear here once candidates apply to your offers.</p>
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .page-header {
      margin-bottom: 24px;
    }

    .page-header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
    }

    .subtitle { color: #6b7280; font-size: 0.938rem; margin: 0; }

    /* Stats */
    .stat-pills {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .stat-pill {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 12px;
      padding: 14px 22px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .stat-value {
      font-size: 1.35rem;
      font-weight: 700;
      color: #111827;
    }

    .stat-amber { color: #d97706; }
    .stat-blue { color: #2563eb; }
    .stat-green { color: #059669; }

    .stat-label {
      font-size: 0.813rem;
      color: #9ca3af;
      font-weight: 500;
    }

    /* Cards Grid */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 16px;
    }

    .app-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .app-card:hover {
      border-color: #e5e7eb;
      box-shadow: 0 4px 12px rgba(0,0,0,0.07);
    }

    .app-card-top {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 20px 0 20px;
    }

    .applicant-avatar {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: linear-gradient(135deg, #ff7900, #e06800);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    .applicant-info {
      flex: 1;
      min-width: 0;
    }

    .applicant-info h3 {
      font-size: 0.938rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 2px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .applicant-info p {
      font-size: 0.813rem;
      color: #9ca3af;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .status-pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .status-pending { background: #fef3c7; color: #92400e; }
    .status-under_review { background: #dbeafe; color: #1e40af; }
    .status-accepted { background: #d1fae5; color: #065f46; }
    .status-rejected { background: #fee2e2; color: #991b1b; }

    .app-card-body {
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .app-detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .detail-label {
      font-size: 0.813rem;
      color: #9ca3af;
    }

    .detail-value {
      font-size: 0.875rem;
      color: #374151;
      font-weight: 500;
      text-align: right;
    }

    .app-card-footer {
      padding: 0 20px 16px 20px;
    }

    .btn-view {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: #ff7900;
      font-size: 0.813rem;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      transition: color 0.15s;
    }

    .btn-view:hover { color: #e06800; }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .empty-icon {
      color: #d1d5db;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 6px 0;
    }

    .empty-state p {
      color: #9ca3af;
      font-size: 0.938rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .page { padding: 20px 16px; }
      .cards-grid { grid-template-columns: 1fr; }
      .stat-pills { gap: 8px; }
      .stat-pill { flex: 1; min-width: 90px; padding: 10px 14px; }
    }
  `]
})
export class ApplicationsListComponent {
  private readonly router: Router;

  // Mock data
  applications = [
    {
      id: '1',
      applicantName: 'Alice Martin',
      applicantEmail: 'alice.martin@university.tn',
      university: 'ESPRIT',
      offerTitle: 'Software Development Internship',
      appliedDate: '2026-01-15',
      status: 'pending'
    },
    {
      id: '2',
      applicantName: 'Youssef Ben Ali',
      applicantEmail: 'youssef.benali@university.tn',
      university: 'INSAT',
      offerTitle: 'Data Engineering Internship',
      appliedDate: '2026-01-18',
      status: 'under_review'
    },
    {
      id: '3',
      applicantName: 'Sara Trabelsi',
      applicantEmail: 'sara.trabelsi@university.tn',
      university: 'SMU',
      offerTitle: 'Software Development Internship',
      appliedDate: '2026-01-20',
      status: 'accepted'
    },
    {
      id: '4',
      applicantName: 'Mohamed Kacem',
      applicantEmail: 'mohamed.kacem@university.tn',
      university: 'ENIT',
      offerTitle: 'Network Administration Internship',
      appliedDate: '2026-01-22',
      status: 'rejected'
    },
    {
      id: '5',
      applicantName: 'Amira Souissi',
      applicantEmail: 'amira.souissi@university.tn',
      university: 'ESPRIT',
      offerTitle: 'Data Engineering Internship',
      appliedDate: '2026-01-25',
      status: 'pending'
    }
  ];

  constructor(router: Router) {
    this.router = router;
  }

  get pendingCount(): number {
    return this.applications.filter(a => a.status === 'pending').length;
  }

  get reviewCount(): number {
    return this.applications.filter(a => a.status === 'under_review').length;
  }

  get acceptedCount(): number {
    return this.applications.filter(a => a.status === 'accepted').length;
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'pending': 'Pending',
      'under_review': 'Under Review',
      'accepted': 'Accepted',
      'rejected': 'Rejected'
    };
    return labels[status] || status;
  }

  viewApplication(id: string): void {
    this.router.navigate(['/chief/applications', id]);
  }
}
