import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Application {
  id: number;
  applicant: string;
  email: string;
  offer: string;
  department: string;
  status: 'pending' | 'accepted' | 'rejected' | 'interview' | 'review' | 'finalized';
  date: string;
  avatar: string;
}

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">All Applications</h1>
          <p class="page-subtitle">Review and manage candidate applications</p>
        </div>
      </div>

      <!-- Stat Pills -->
      <div class="stat-pills">
        <button
          *ngFor="let f of filters"
          class="pill"
          [class.active]="activeFilter === f.key"
          (click)="activeFilter = f.key"
        >
          <span class="pill-dot" [style.background]="f.color"></span>
          <span class="pill-label">{{ f.label }}</span>
          <span class="pill-value">{{ f.key === 'all' ? applications.length : countByStatus(f.key) }}</span>
        </button>
      </div>

      <!-- Table Card -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Offer</th>
              <th>Department</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let app of filteredApplications">
              <td>
                <div class="applicant-cell">
                  <div class="avatar">{{ app.avatar }}</div>
                  <div>
                    <div class="applicant-name">{{ app.applicant }}</div>
                    <div class="applicant-email">{{ app.email }}</div>
                  </div>
                </div>
              </td>
              <td class="offer-cell">{{ app.offer }}</td>
              <td>{{ app.department }}</td>
              <td>
                <span class="badge" [ngClass]="'badge-' + app.status">
                  {{ app.status | titlecase }}
                </span>
              </td>
              <td class="date-cell">{{ app.date }}</td>
              <td>
                <div class="actions">
                  <a [routerLink]="['/hr/applications', app.id]" class="btn-action btn-view">View</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="filteredApplications.length === 0" class="empty-state">
          <p>No applications match this filter.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page {
      padding: 32px;
      background: #f5f6f8;
      min-height: 100vh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .page-header { margin-bottom: 24px; }

    .page-title {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px;
    }

    .page-subtitle {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }

    .stat-pills {
      display: flex;
      gap: 10px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 100px;
      padding: 8px 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .pill:hover { border-color: #d1d5db; }

    .pill.active {
      border-color: #ff7900;
      background: #fff7ed;
    }

    .pill-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .pill-label { font-size: 13px; color: #6b7280; }
    .pill-value { font-size: 14px; font-weight: 600; color: #111827; }

    .table-card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
    }

    table { width: 100%; border-collapse: collapse; }

    th {
      text-align: left;
      padding: 14px 20px;
      font-size: 12px;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #f0f1f3;
      background: #fafbfc;
    }

    td {
      padding: 16px 20px;
      font-size: 14px;
      color: #374151;
      border-bottom: 1px solid #f0f1f3;
    }

    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #fafbfc; }

    .applicant-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff7900, #e06800);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .applicant-name {
      font-weight: 600;
      color: #111827;
      font-size: 14px;
    }

    .applicant-email {
      font-size: 12px;
      color: #9ca3af;
    }

    .offer-cell { font-weight: 500; }

    .date-cell {
      color: #9ca3af;
      font-size: 13px;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
    }

    .badge-pending { background: #fffbeb; color: #d97706; }
    .badge-accepted { background: #ecfdf5; color: #059669; }
    .badge-rejected { background: #fef2f2; color: #dc2626; }
    .badge-interview { background: #eff6ff; color: #2563eb; }
    .badge-review { background: #f5f3ff; color: #7c3aed; }
    .badge-finalized { background: #ecfdf5; color: #047857; }

    .actions { display: flex; gap: 6px; }

    .btn-action {
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-view { background: #f3f4f6; color: #374151; }
    .btn-view:hover { background: #e5e7eb; }

    .empty-state {
      padding: 48px;
      text-align: center;
      color: #9ca3af;
      font-size: 14px;
    }
  `]
})
export class ApplicationsListComponent {
  activeFilter = 'all';

  filters = [
    { key: 'all', label: 'All', color: '#ff7900' },
    { key: 'pending', label: 'Pending', color: '#f59e0b' },
    { key: 'interview', label: 'Interview', color: '#3b82f6' },
    { key: 'review', label: 'In Review', color: '#7c3aed' },
    { key: 'accepted', label: 'Accepted', color: '#10b981' },
    { key: 'rejected', label: 'Rejected', color: '#ef4444' }
  ];

  applications: Application[] = [
    {
      id: 1,
      applicant: 'Sami Gharbi',
      email: 'sami.gharbi@univ.tn',
      offer: 'Full-Stack Developer Intern',
      department: 'Engineering',
      status: 'interview',
      date: 'Jan 18, 2026',
      avatar: 'SG'
    },
    {
      id: 2,
      applicant: 'Ines Bouazizi',
      email: 'ines.bouazizi@esprit.tn',
      offer: 'Full-Stack Developer Intern',
      department: 'Engineering',
      status: 'pending',
      date: 'Jan 20, 2026',
      avatar: 'IB'
    },
    {
      id: 3,
      applicant: 'Omar Ferjani',
      email: 'omar.ferjani@enit.tn',
      offer: 'UX/UI Design Intern',
      department: 'Product Design',
      status: 'accepted',
      date: 'Jan 30, 2026',
      avatar: 'OF'
    },
    {
      id: 4,
      applicant: 'Mariem Saidi',
      email: 'mariem.saidi@sesame.tn',
      offer: 'Mobile Developer Intern',
      department: 'Mobile Apps',
      status: 'review',
      date: 'Feb 02, 2026',
      avatar: 'MS'
    },
    {
      id: 5,
      applicant: 'Yassine Hamdi',
      email: 'yassine.hamdi@insat.tn',
      offer: 'Data Analyst Intern',
      department: 'Data & AI',
      status: 'rejected',
      date: 'Feb 03, 2026',
      avatar: 'YH'
    },
    {
      id: 6,
      applicant: 'Amira Tlili',
      email: 'amira.tlili@tek-up.tn',
      offer: 'Full-Stack Developer Intern',
      department: 'Engineering',
      status: 'finalized',
      date: 'Feb 05, 2026',
      avatar: 'AT'
    }
  ];

  get filteredApplications(): Application[] {
    if (this.activeFilter === 'all') return this.applications;
    return this.applications.filter(a => a.status === this.activeFilter);
  }

  countByStatus(status: string): number {
    return this.applications.filter(a => a.status === status).length;
  }
}
