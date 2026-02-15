import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Offer {
  id: number;
  title: string;
  department: string;
  chief: string;
  status: 'published' | 'pending' | 'draft' | 'approved';
  applications: number;
  created: string;
}

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">All Offers</h1>
          <p class="page-subtitle">Manage and review internship offers across departments</p>
        </div>
      </div>

      <!-- Stat Pills -->
      <div class="stat-pills">
        <div class="pill">
          <span class="pill-dot total"></span>
          <span class="pill-label">Total</span>
          <span class="pill-value">{{ offers.length }}</span>
        </div>
        <div class="pill">
          <span class="pill-dot published"></span>
          <span class="pill-label">Published</span>
          <span class="pill-value">{{ countByStatus('published') }}</span>
        </div>
        <div class="pill">
          <span class="pill-dot pending"></span>
          <span class="pill-label">Pending Approval</span>
          <span class="pill-value">{{ countByStatus('pending') }}</span>
        </div>
        <div class="pill">
          <span class="pill-dot approved"></span>
          <span class="pill-label">Approved</span>
          <span class="pill-value">{{ countByStatus('approved') }}</span>
        </div>
        <div class="pill">
          <span class="pill-dot draft"></span>
          <span class="pill-label">Draft</span>
          <span class="pill-value">{{ countByStatus('draft') }}</span>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button
          *ngFor="let tab of tabs"
          class="tab"
          [class.active]="activeTab === tab.key"
          (click)="activeTab = tab.key"
        >
          {{ tab.label }}
          <span class="tab-count">{{ tab.key === 'all' ? offers.length : countByStatus(tab.key) }}</span>
        </button>
      </div>

      <!-- Table Card -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Chief</th>
              <th>Status</th>
              <th>Applications</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let offer of filteredOffers">
              <td class="title-cell">{{ offer.title }}</td>
              <td>{{ offer.department }}</td>
              <td>{{ offer.chief }}</td>
              <td>
                <span class="badge" [ngClass]="'badge-' + offer.status">
                  {{ offer.status | titlecase }}
                </span>
              </td>
              <td>
                <span class="app-count">{{ offer.applications }}</span>
              </td>
              <td class="date-cell">{{ offer.created }}</td>
              <td>
                <div class="actions">
                  <a [routerLink]="['/hr/offers', offer.id]" class="btn-action btn-view">View</a>
                  <ng-container *ngIf="offer.status === 'pending'">
                    <button class="btn-action btn-approve" (click)="approveOffer(offer)">Approve</button>
                    <button class="btn-action btn-reject" (click)="rejectOffer(offer)">Reject</button>
                  </ng-container>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="filteredOffers.length === 0" class="empty-state">
          <p>No offers found for this filter.</p>
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

    .page-header {
      margin-bottom: 24px;
    }

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
      gap: 12px;
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
    }

    .pill-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .pill-dot.total { background: #ff7900; }
    .pill-dot.published { background: #10b981; }
    .pill-dot.pending { background: #f59e0b; }
    .pill-dot.approved { background: #3b82f6; }
    .pill-dot.draft { background: #9ca3af; }

    .pill-label {
      font-size: 13px;
      color: #6b7280;
    }

    .pill-value {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .filter-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 20px;
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 12px;
      padding: 4px;
      width: fit-content;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .tab {
      padding: 8px 16px;
      border: none;
      background: transparent;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      font-family: inherit;
    }

    .tab:hover {
      color: #111827;
      background: #f9fafb;
    }

    .tab.active {
      background: #ff7900;
      color: white;
    }

    .tab.active .tab-count {
      background: rgba(255,255,255,0.25);
      color: white;
    }

    .tab-count {
      font-size: 11px;
      background: #f3f4f6;
      padding: 1px 7px;
      border-radius: 100px;
      font-weight: 600;
    }

    .table-card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

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

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: #fafbfc;
    }

    .title-cell {
      font-weight: 600;
      color: #111827;
    }

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

    .badge-published {
      background: #ecfdf5;
      color: #059669;
    }

    .badge-pending {
      background: #fffbeb;
      color: #d97706;
    }

    .badge-draft {
      background: #f3f4f6;
      color: #6b7280;
    }

    .badge-approved {
      background: #eff6ff;
      color: #2563eb;
    }

    .app-count {
      background: #f3f4f6;
      padding: 2px 10px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 600;
      color: #374151;
    }

    .actions {
      display: flex;
      gap: 6px;
    }

    .btn-action {
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-view {
      background: #f3f4f6;
      color: #374151;
    }

    .btn-view:hover {
      background: #e5e7eb;
    }

    .btn-approve {
      background: #ecfdf5;
      color: #059669;
    }

    .btn-approve:hover {
      background: #d1fae5;
    }

    .btn-reject {
      background: #fef2f2;
      color: #dc2626;
    }

    .btn-reject:hover {
      background: #fee2e2;
    }

    .empty-state {
      padding: 48px;
      text-align: center;
      color: #9ca3af;
      font-size: 14px;
    }
  `]
})
export class OffersListComponent {
  activeTab: string = 'all';

  tabs = [
    { key: 'all', label: 'All' },
    { key: 'published', label: 'Published' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'draft', label: 'Draft' }
  ];

  offers: Offer[] = [
    {
      id: 1,
      title: 'Full-Stack Developer Intern',
      department: 'Engineering',
      chief: 'Ahmed Ben Salah',
      status: 'published',
      applications: 14,
      created: 'Jan 15, 2026'
    },
    {
      id: 2,
      title: 'Data Analyst Intern',
      department: 'Data & AI',
      chief: 'Fatma Khelifi',
      status: 'pending',
      applications: 0,
      created: 'Jan 22, 2026'
    },
    {
      id: 3,
      title: 'UX/UI Design Intern',
      department: 'Product Design',
      chief: 'Youssef Trabelsi',
      status: 'published',
      applications: 8,
      created: 'Jan 28, 2026'
    },
    {
      id: 4,
      title: 'DevOps Intern',
      department: 'Infrastructure',
      chief: 'Nadia Mansouri',
      status: 'draft',
      applications: 0,
      created: 'Feb 01, 2026'
    },
    {
      id: 5,
      title: 'Mobile Developer Intern',
      department: 'Mobile Apps',
      chief: 'Karim Jaziri',
      status: 'approved',
      applications: 5,
      created: 'Feb 04, 2026'
    }
  ];

  get filteredOffers(): Offer[] {
    if (this.activeTab === 'all') return this.offers;
    return this.offers.filter(o => o.status === this.activeTab);
  }

  countByStatus(status: string): number {
    return this.offers.filter(o => o.status === status).length;
  }

  approveOffer(offer: Offer): void {
    offer.status = 'approved';
  }

  rejectOffer(offer: Offer): void {
    this.offers = this.offers.filter(o => o.id !== offer.id);
  }
}
