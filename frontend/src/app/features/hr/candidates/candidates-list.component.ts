import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Candidate {
  id: number;
  name: string;
  email: string;
  university: string;
  department: string;
  avatar: string;
  status: 'active' | 'hired' | 'rejected' | 'interview';
  skills: string[];
  appliedOffers: number;
}

@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Candidates</h1>
          <p class="page-subtitle">Browse and manage all applicant profiles</p>
        </div>
        <div class="header-actions">
          <div class="search-box">
            <svg width="16" height="16" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search candidates..."
              [(ngModel)]="searchQuery"
            />
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button
          *ngFor="let f of filters"
          class="tab"
          [class.active]="activeFilter === f.key"
          (click)="activeFilter = f.key"
        >
          {{ f.label }}
          <span class="tab-count">{{ f.key === 'all' ? candidates.length : countByStatus(f.key) }}</span>
        </button>
      </div>

      <!-- Candidates Grid -->
      <div class="grid">
        <div class="candidate-card" *ngFor="let c of filteredCandidates">
          <div class="card-top">
            <div class="candidate-avatar">{{ c.avatar }}</div>
            <span class="badge" [ngClass]="'badge-' + c.status">
              {{ c.status | titlecase }}
            </span>
          </div>

          <h3 class="candidate-name">{{ c.name }}</h3>
          <p class="candidate-email">{{ c.email }}</p>
          <p class="candidate-uni">{{ c.university }}</p>
          <p class="candidate-dept">{{ c.department }}</p>

          <div class="skills">
            <span class="skill-tag" *ngFor="let skill of c.skills.slice(0, 3)">{{ skill }}</span>
            <span class="skill-more" *ngIf="c.skills.length > 3">+{{ c.skills.length - 3 }}</span>
          </div>

          <div class="card-footer">
            <span class="applied-count">{{ c.appliedOffers }} offer{{ c.appliedOffers !== 1 ? 's' : '' }} applied</span>
            <a [routerLink]="['/hr/applications']" class="btn-view">View</a>
          </div>
        </div>
      </div>

      <div *ngIf="filteredCandidates.length === 0" class="empty-state">
        <p>No candidates found matching your criteria.</p>
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
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
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

    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 10px;
      padding: 10px 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      min-width: 280px;
    }

    .search-box input {
      border: none;
      outline: none;
      font-size: 14px;
      color: #111827;
      width: 100%;
      background: transparent;
      font-family: inherit;
    }

    .search-box input::placeholder {
      color: #9ca3af;
    }

    .filter-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 24px;
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

    .tab:hover { color: #111827; background: #f9fafb; }

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

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .candidate-card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      transition: all 0.2s;
    }

    .candidate-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-color: #e5e7eb;
    }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .candidate-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff7900, #e06800);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
    }

    .badge {
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 600;
    }

    .badge-active { background: #eff6ff; color: #2563eb; }
    .badge-hired { background: #ecfdf5; color: #059669; }
    .badge-rejected { background: #fef2f2; color: #dc2626; }
    .badge-interview { background: #fffbeb; color: #d97706; }

    .candidate-name {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 4px;
    }

    .candidate-email {
      font-size: 13px;
      color: #6b7280;
      margin: 0 0 8px;
    }

    .candidate-uni {
      font-size: 13px;
      color: #9ca3af;
      margin: 0 0 2px;
    }

    .candidate-dept {
      font-size: 12px;
      color: #9ca3af;
      margin: 0 0 14px;
    }

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }

    .skill-tag {
      background: #fff7ed;
      color: #ea580c;
      padding: 3px 10px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 500;
      border: 1px solid #fed7aa;
    }

    .skill-more {
      background: #f3f4f6;
      color: #6b7280;
      padding: 3px 10px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 500;
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;
      border-top: 1px solid #f0f1f3;
    }

    .applied-count {
      font-size: 12px;
      color: #9ca3af;
    }

    .btn-view {
      padding: 6px 16px;
      background: #f3f4f6;
      color: #374151;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-view:hover { background: #e5e7eb; }

    .empty-state {
      padding: 48px;
      text-align: center;
      color: #9ca3af;
      font-size: 14px;
    }
  `]
})
export class CandidatesListComponent {
  searchQuery = '';
  activeFilter = 'all';

  filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'interview', label: 'Interview' },
    { key: 'hired', label: 'Hired' },
    { key: 'rejected', label: 'Rejected' }
  ];

  candidates: Candidate[] = [
    {
      id: 1, name: 'Sami Gharbi', email: 'sami.gharbi@univ.tn',
      university: 'University of Tunis', department: 'Computer Science',
      avatar: 'SG', status: 'interview', skills: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL'], appliedOffers: 2
    },
    {
      id: 2, name: 'Ines Bouazizi', email: 'ines.bouazizi@esprit.tn',
      university: 'ESPRIT', department: 'Software Engineering',
      avatar: 'IB', status: 'active', skills: ['React', 'Java', 'Spring Boot'], appliedOffers: 1
    },
    {
      id: 3, name: 'Omar Ferjani', email: 'omar.ferjani@enit.tn',
      university: 'ENIT', department: 'Information Systems',
      avatar: 'OF', status: 'hired', skills: ['Figma', 'Adobe XD', 'CSS', 'HTML'], appliedOffers: 1
    },
    {
      id: 4, name: 'Mariem Saidi', email: 'mariem.saidi@sesame.tn',
      university: 'SESAME', department: 'Mobile Development',
      avatar: 'MS', status: 'active', skills: ['Flutter', 'Dart', 'Firebase', 'Swift'], appliedOffers: 3
    },
    {
      id: 5, name: 'Yassine Hamdi', email: 'yassine.hamdi@insat.tn',
      university: 'INSAT', department: 'Data Science',
      avatar: 'YH', status: 'rejected', skills: ['Python', 'TensorFlow', 'SQL'], appliedOffers: 1
    },
    {
      id: 6, name: 'Amira Tlili', email: 'amira.tlili@tek-up.tn',
      university: 'TEK-UP', department: 'Computer Science',
      avatar: 'AT', status: 'hired', skills: ['Angular', 'NestJS', 'Docker', 'Git'], appliedOffers: 2
    },
    {
      id: 7, name: 'Khalil Mejri', email: 'khalil.mejri@isg.tn',
      university: 'ISG Tunis', department: 'Business Intelligence',
      avatar: 'KM', status: 'active', skills: ['Power BI', 'SQL', 'Python', 'Excel'], appliedOffers: 1
    },
    {
      id: 8, name: 'Nour Ferchichi', email: 'nour.ferchichi@isi.tn',
      university: 'ISI', department: 'Networks & Security',
      avatar: 'NF', status: 'interview', skills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform'], appliedOffers: 2
    }
  ];

  get filteredCandidates(): Candidate[] {
    let result = this.candidates;

    if (this.activeFilter !== 'all') {
      result = result.filter(c => c.status === this.activeFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.university.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    return result;
  }

  countByStatus(status: string): number {
    return this.candidates.filter(c => c.status === status).length;
  }
}
