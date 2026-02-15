import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

interface OfferDetail {
  id: number;
  title: string;
  description: string;
  department: string;
  chief: string;
  status: 'published' | 'pending' | 'draft' | 'approved';
  duration: string;
  skills: string[];
  startDate: string;
  endDate: string;
  applications: number;
  created: string;
  location: string;
  type: string;
}

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">
      <!-- Back Button -->
      <a routerLink="/hr/offers" class="back-link">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Offers
      </a>

      <div class="content" *ngIf="offer">
        <!-- Top Section -->
        <div class="top-row">
          <div class="main-card">
            <div class="card-header">
              <div>
                <span class="badge" [ngClass]="'badge-' + offer.status">
                  {{ offer.status | titlecase }}
                </span>
                <h1 class="offer-title">{{ offer.title }}</h1>
                <p class="offer-meta">
                  {{ offer.department }} &middot; {{ offer.location }} &middot; {{ offer.type }}
                </p>
              </div>
            </div>

            <div class="section">
              <h3 class="section-title">Description</h3>
              <p class="section-text">{{ offer.description }}</p>
            </div>

            <div class="section">
              <h3 class="section-title">Required Skills</h3>
              <div class="skills">
                <span class="skill-tag" *ngFor="let skill of offer.skills">{{ skill }}</span>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Duration</span>
                <span class="info-value">{{ offer.duration }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Start Date</span>
                <span class="info-value">{{ offer.startDate }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">End Date</span>
                <span class="info-value">{{ offer.endDate }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Created</span>
                <span class="info-value">{{ offer.created }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Chief</span>
                <span class="info-value">{{ offer.chief }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Department</span>
                <span class="info-value">{{ offer.department }}</span>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <!-- Applications Card -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">Applications</h3>
              <div class="app-count-display">
                <span class="big-number">{{ offer.applications }}</span>
                <span class="app-label">applicants</span>
              </div>
              <a routerLink="/hr/applications" class="btn-secondary">View All Applications</a>
            </div>

            <!-- Status / Approval Card -->
            <div class="sidebar-card" *ngIf="offer.status === 'pending'">
              <h3 class="sidebar-title">Approval Required</h3>
              <p class="sidebar-text">This offer is pending HR approval before it can be published.</p>
              <div class="approval-actions">
                <button class="btn-approve" (click)="approveOffer()">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                  Approve
                </button>
                <button class="btn-reject" (click)="rejectOffer()">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Reject
                </button>
              </div>
            </div>

            <div class="sidebar-card" *ngIf="offer.status !== 'pending'">
              <h3 class="sidebar-title">Status</h3>
              <div class="status-display">
                <span class="badge large" [ngClass]="'badge-' + offer.status">
                  {{ offer.status | titlecase }}
                </span>
              </div>
            </div>
          </div>
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

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: #6b7280;
      text-decoration: none;
      margin-bottom: 24px;
      font-weight: 500;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: #ff7900;
    }

    .top-row {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 24px;
      align-items: start;
    }

    .main-card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .card-header {
      margin-bottom: 28px;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .badge.large {
      font-size: 14px;
      padding: 6px 16px;
    }

    .badge-published { background: #ecfdf5; color: #059669; }
    .badge-pending { background: #fffbeb; color: #d97706; }
    .badge-draft { background: #f3f4f6; color: #6b7280; }
    .badge-approved { background: #eff6ff; color: #2563eb; }

    .offer-title {
      font-size: 26px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 6px;
    }

    .offer-meta {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }

    .section {
      margin-bottom: 28px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .section-text {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.7;
      margin: 0;
    }

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      background: #fff7ed;
      color: #ea580c;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid #fed7aa;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding-top: 24px;
      border-top: 1px solid #f0f1f3;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-label {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-value {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .sidebar-card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .sidebar-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px;
    }

    .sidebar-text {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.6;
      margin: 0 0 16px;
    }

    .app-count-display {
      text-align: center;
      padding: 16px 0;
    }

    .big-number {
      display: block;
      font-size: 42px;
      font-weight: 700;
      color: #ff7900;
    }

    .app-label {
      font-size: 13px;
      color: #9ca3af;
    }

    .btn-secondary {
      display: block;
      text-align: center;
      padding: 10px;
      background: #f3f4f6;
      color: #374151;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.2s;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
    }

    .approval-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .btn-approve, .btn-reject {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-approve {
      background: #059669;
      color: white;
    }

    .btn-approve:hover {
      background: #047857;
    }

    .btn-reject {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    .btn-reject:hover {
      background: #fee2e2;
    }

    .status-display {
      text-align: center;
      padding: 8px 0;
    }
  `]
})
export class OfferDetailComponent implements OnInit {
  offer: OfferDetail | null = null;

  private mockOffers: OfferDetail[] = [
    {
      id: 1,
      title: 'Full-Stack Developer Intern',
      description: 'Join our engineering team to work on cutting-edge web applications using Angular and NestJS. You will collaborate with senior developers on real-world projects, participate in code reviews, and contribute to the development of our core platform. This internship provides hands-on experience with modern development practices including CI/CD, microservices, and cloud deployment.',
      department: 'Engineering',
      chief: 'Ahmed Ben Salah',
      status: 'published',
      duration: '6 months',
      skills: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'Git'],
      startDate: 'Mar 01, 2026',
      endDate: 'Aug 31, 2026',
      applications: 14,
      created: 'Jan 15, 2026',
      location: 'Tunis, Tunisia',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'Data Analyst Intern',
      description: 'Work with our Data & AI team to analyze business data, build dashboards, and develop machine learning models. You will gain experience with data pipelines, statistical analysis, and data visualization tools.',
      department: 'Data & AI',
      chief: 'Fatma Khelifi',
      status: 'pending',
      duration: '4 months',
      skills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Pandas'],
      startDate: 'Apr 01, 2026',
      endDate: 'Jul 31, 2026',
      applications: 0,
      created: 'Jan 22, 2026',
      location: 'Tunis, Tunisia',
      type: 'Full-time'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.offer = this.mockOffers.find(o => o.id === id) || this.mockOffers[0];
  }

  approveOffer(): void {
    if (this.offer) {
      this.offer.status = 'approved';
    }
  }

  rejectOffer(): void {
    this.router.navigate(['/hr/offers']);
  }
}
