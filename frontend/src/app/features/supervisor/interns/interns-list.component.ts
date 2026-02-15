import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Intern {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  internshipTitle: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Upcoming';
}

@Component({
  selector: 'app-interns-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="interns-page">
      <!-- Header -->
      <div class="page-header">
        <div class="header-left">
          <h1>My Interns</h1>
          <span class="count-badge">{{ filteredInterns.length }}</span>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button
          *ngFor="let tab of tabs"
          class="tab-btn"
          [class.active]="activeTab === tab"
          (click)="filterByTab(tab)"
        >
          {{ tab }}
          <span class="tab-count">{{ getCountForTab(tab) }}</span>
        </button>
      </div>

      <!-- Interns Grid -->
      <div class="interns-grid">
        <div class="intern-card" *ngFor="let intern of filteredInterns">
          <div class="card-top">
            <div class="avatar" [style.background]="getAvatarColor(intern)">
              {{ getInitials(intern) }}
            </div>
            <span class="status-badge" [ngClass]="'status-' + intern.status.toLowerCase()">
              {{ intern.status }}
            </span>
          </div>

          <div class="card-body">
            <h3 class="intern-name">{{ intern.firstName }} {{ intern.lastName }}</h3>
            <p class="intern-email">{{ intern.email }}</p>
            <p class="intern-university">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 4 3 6 3s6-2 6-3v-5"/></svg>
              {{ intern.university }}
            </p>
            <p class="internship-title">{{ intern.internshipTitle }}</p>

            <div class="progress-section">
              <div class="progress-header">
                <span class="progress-label">Progress</span>
                <span class="progress-value">{{ intern.progress }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" [style.width.%]="intern.progress"></div>
              </div>
            </div>

            <div class="dates-row">
              <div class="date-item">
                <span class="date-label">Start</span>
                <span class="date-value">{{ intern.startDate }}</span>
              </div>
              <div class="date-item">
                <span class="date-label">End</span>
                <span class="date-value">{{ intern.endDate }}</span>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn-details" (click)="viewDetails(intern.id)">
              View Details
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .interns-page {
      padding: 32px;
      background: #f5f6f8;
      min-height: 100%;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-left h1 {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }

    .count-badge {
      background: #ff7900;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      padding: 2px 10px;
      border-radius: 20px;
    }

    .filter-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 28px;
    }

    .tab-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border: 1px solid #f0f1f3;
      border-radius: 10px;
      background: #fff;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
    }

    .tab-btn:hover {
      border-color: #ff7900;
      color: #ff7900;
    }

    .tab-btn.active {
      background: #ff7900;
      color: #fff;
      border-color: #ff7900;
    }

    .tab-btn.active .tab-count {
      background: rgba(255,255,255,0.25);
      color: #fff;
    }

    .tab-count {
      font-size: 12px;
      font-weight: 600;
      background: #f5f6f8;
      color: #9ca3af;
      padding: 1px 7px;
      border-radius: 8px;
    }

    .interns-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .intern-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
      transition: box-shadow 0.2s;
    }

    .intern-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 0;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .status-badge {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
    }

    .status-active {
      background: #ecfdf5;
      color: #059669;
    }

    .status-completed {
      background: #eff6ff;
      color: #2563eb;
    }

    .status-upcoming {
      background: #fefce8;
      color: #ca8a04;
    }

    .card-body {
      padding: 16px 20px;
    }

    .intern-name {
      font-size: 17px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 4px;
    }

    .intern-email {
      font-size: 13px;
      color: #9ca3af;
      margin: 0 0 8px;
    }

    .intern-university {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      color: #6b7280;
      margin: 0 0 4px;
    }

    .internship-title {
      font-size: 14px;
      font-weight: 500;
      color: #ff7900;
      margin: 0 0 14px;
    }

    .progress-section {
      margin-bottom: 14px;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .progress-label {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 500;
    }

    .progress-value {
      font-size: 12px;
      font-weight: 600;
      color: #111827;
    }

    .progress-track {
      height: 6px;
      background: #f0f1f3;
      border-radius: 6px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #ff7900, #e06800);
      border-radius: 6px;
      transition: width 0.4s ease;
    }

    .dates-row {
      display: flex;
      gap: 24px;
    }

    .date-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .date-label {
      font-size: 11px;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .date-value {
      font-size: 13px;
      color: #6b7280;
      font-weight: 500;
    }

    .card-actions {
      padding: 12px 20px 16px;
      border-top: 1px solid #f0f1f3;
    }

    .btn-details {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      padding: 10px;
      background: #fff;
      border: 1px solid #ff7900;
      color: #ff7900;
      font-size: 14px;
      font-weight: 600;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-details:hover {
      background: #ff7900;
      color: #fff;
    }
  `]
})
export class InternsListComponent {
  tabs: string[] = ['All', 'Active', 'Completed'];
  activeTab = 'All';

  interns: Intern[] = [
    {
      id: '1',
      firstName: 'Amira',
      lastName: 'Ben Salah',
      email: 'amira.bensalah@univ.tn',
      university: 'University of Tunis',
      internshipTitle: 'Frontend Development Intern',
      progress: 72,
      startDate: '2026-01-15',
      endDate: '2026-06-15',
      status: 'Active'
    },
    {
      id: '2',
      firstName: 'Mohamed',
      lastName: 'Trabelsi',
      email: 'mohamed.trabelsi@smu.tn',
      university: 'South Mediterranean University',
      internshipTitle: 'Data Engineering Intern',
      progress: 100,
      startDate: '2025-07-01',
      endDate: '2025-12-31',
      status: 'Completed'
    },
    {
      id: '3',
      firstName: 'Yasmine',
      lastName: 'Khelifi',
      email: 'yasmine.khelifi@esprit.tn',
      university: 'ESPRIT',
      internshipTitle: 'DevOps Intern',
      progress: 45,
      startDate: '2026-01-01',
      endDate: '2026-07-01',
      status: 'Active'
    },
    {
      id: '4',
      firstName: 'Karim',
      lastName: 'Bouazizi',
      email: 'karim.bouazizi@insat.tn',
      university: 'INSAT',
      internshipTitle: 'Backend Development Intern',
      progress: 0,
      startDate: '2026-03-01',
      endDate: '2026-08-31',
      status: 'Upcoming'
    }
  ];

  filteredInterns: Intern[] = [...this.interns];

  constructor(private router: Router) {}

  filterByTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'All') {
      this.filteredInterns = [...this.interns];
    } else {
      this.filteredInterns = this.interns.filter(i => i.status === tab);
    }
  }

  getCountForTab(tab: string): number {
    if (tab === 'All') return this.interns.length;
    return this.interns.filter(i => i.status === tab).length;
  }

  getInitials(intern: Intern): string {
    return intern.firstName.charAt(0) + intern.lastName.charAt(0);
  }

  getAvatarColor(intern: Intern): string {
    const colors = ['#ff7900', '#2563eb', '#059669', '#7c3aed'];
    const idx = this.interns.indexOf(intern) % colors.length;
    return colors[idx];
  }

  viewDetails(id: string): void {
    this.router.navigate(['/supervisor/interns', id]);
  }
}
