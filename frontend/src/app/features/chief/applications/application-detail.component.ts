import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <!-- Back Button -->
      <button class="btn-back" (click)="goBack()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Applications
      </button>

      <div class="detail-layout" *ngIf="application">
        <!-- Header -->
        <div class="detail-card header-card">
          <div class="header-row">
            <div class="avatar-lg">{{ getInitials(application.applicantName) }}</div>
            <div class="header-info">
              <h1>{{ application.applicantName }}</h1>
              <p class="header-email">{{ application.applicantEmail }}</p>
            </div>
            <span class="status-pill" [class]="'status-' + application.status">
              {{ getStatusLabel(application.status) }}
            </span>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="info-grid">
          <div class="info-card">
            <span class="info-label">University</span>
            <span class="info-value">{{ application.university }}</span>
          </div>
          <div class="info-card">
            <span class="info-label">Applied For</span>
            <span class="info-value">{{ application.offerTitle }}</span>
          </div>
          <div class="info-card">
            <span class="info-label">Applied On</span>
            <span class="info-value">{{ application.appliedDate | date: 'mediumDate' }}</span>
          </div>
          <div class="info-card">
            <span class="info-label">Department</span>
            <span class="info-value">{{ application.department }}</span>
          </div>
        </div>

        <!-- Cover Letter -->
        <div class="detail-card" *ngIf="application.coverLetter">
          <h2>Cover Letter</h2>
          <p class="body-text">{{ application.coverLetter }}</p>
        </div>

        <!-- CV Download -->
        <div class="detail-card">
          <h2>Resume / CV</h2>
          <button class="btn-download">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </button>
        </div>

        <!-- Actions -->
        <div class="detail-card actions-card" *ngIf="application.status === 'pending' || application.status === 'under_review'">
          <h2>Actions</h2>
          <p class="actions-hint">Review this application and take action</p>
          <div class="action-buttons">
            <button class="btn btn-accept" (click)="acceptApplication()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Accept
            </button>
            <button class="btn btn-reject" (click)="rejectApplication()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Reject
            </button>
          </div>
        </div>

        <!-- Decision Banner -->
        <div class="decision-banner accepted" *ngIf="application.status === 'accepted'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          This application has been accepted.
        </div>

        <div class="decision-banner rejected" *ngIf="application.status === 'rejected'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          This application has been rejected.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 860px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      padding: 6px 0;
      margin-bottom: 20px;
      transition: color 0.15s;
    }

    .btn-back:hover { color: #ff7900; }

    .detail-layout {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .detail-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .detail-card h2 {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 14px 0;
    }

    .body-text {
      color: #6b7280;
      font-size: 0.938rem;
      line-height: 1.7;
      margin: 0;
      white-space: pre-line;
    }

    /* Header Card */
    .header-card { padding: 28px; }

    .header-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .avatar-lg {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: linear-gradient(135deg, #ff7900, #e06800);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .header-info { flex: 1; }

    .header-info h1 {
      font-size: 1.375rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
    }

    .header-email { color: #9ca3af; font-size: 0.875rem; margin: 0; }

    .status-pill {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      white-space: nowrap;
    }

    .status-pending { background: #fef3c7; color: #92400e; }
    .status-under_review { background: #dbeafe; color: #1e40af; }
    .status-accepted { background: #d1fae5; color: #065f46; }
    .status-rejected { background: #fee2e2; color: #991b1b; }

    /* Info Grid */
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }

    .info-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 14px;
      padding: 18px 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .info-label {
      display: block;
      font-size: 0.75rem;
      color: #9ca3af;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 6px;
    }

    .info-value {
      font-size: 0.938rem;
      font-weight: 600;
      color: #111827;
    }

    /* Download Button */
    .btn-download {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-download:hover {
      background: #e5e7eb;
    }

    /* Actions */
    .actions-card { padding: 24px 28px; }

    .actions-hint {
      font-size: 0.875rem;
      color: #9ca3af;
      margin: 0 0 16px 0;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 22px;
      border: none;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-accept {
      background: #059669;
      color: #fff;
    }

    .btn-accept:hover { background: #047857; }

    .btn-reject {
      background: #fff;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    .btn-reject:hover {
      background: #fef2f2;
    }

    /* Decision Banner */
    .decision-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 20px;
      border-radius: 14px;
      font-size: 0.938rem;
      font-weight: 500;
    }

    .decision-banner.accepted {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    .decision-banner.rejected {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    @media (max-width: 640px) {
      .page { padding: 20px 16px; }
      .info-grid { grid-template-columns: 1fr; }
      .header-row { flex-wrap: wrap; }
      .action-buttons { flex-direction: column; }
      .btn { justify-content: center; }
    }
  `]
})
export class ApplicationDetailComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  application: any = null;

  // Mock data store
  private readonly mockApplications: any[] = [
    {
      id: '1',
      applicantName: 'Alice Martin',
      applicantEmail: 'alice.martin@university.tn',
      university: 'ESPRIT',
      department: 'IT Department',
      offerTitle: 'Software Development Internship',
      appliedDate: '2026-01-15',
      status: 'pending',
      coverLetter: 'I am a passionate software engineering student with experience in Angular and Node.js. I would love the opportunity to contribute to your team and grow as a developer during this internship.'
    },
    {
      id: '2',
      applicantName: 'Youssef Ben Ali',
      applicantEmail: 'youssef.benali@university.tn',
      university: 'INSAT',
      department: 'Data Department',
      offerTitle: 'Data Engineering Internship',
      appliedDate: '2026-01-18',
      status: 'under_review',
      coverLetter: 'With a strong background in data science and machine learning, I am eager to apply my skills in a real-world environment. My experience with Python and SQL makes me a strong candidate.'
    },
    {
      id: '3',
      applicantName: 'Sara Trabelsi',
      applicantEmail: 'sara.trabelsi@university.tn',
      university: 'SMU',
      department: 'IT Department',
      offerTitle: 'Software Development Internship',
      appliedDate: '2026-01-20',
      status: 'accepted',
      coverLetter: null
    },
    {
      id: '4',
      applicantName: 'Mohamed Kacem',
      applicantEmail: 'mohamed.kacem@university.tn',
      university: 'ENIT',
      department: 'Network Department',
      offerTitle: 'Network Administration Internship',
      appliedDate: '2026-01-22',
      status: 'rejected',
      coverLetter: null
    },
    {
      id: '5',
      applicantName: 'Amira Souissi',
      applicantEmail: 'amira.souissi@university.tn',
      university: 'ESPRIT',
      department: 'Data Department',
      offerTitle: 'Data Engineering Internship',
      appliedDate: '2026-01-25',
      status: 'pending',
      coverLetter: 'I am a final year student with a focus on big data technologies. I have hands-on experience with Apache Spark, Hadoop, and various ETL pipelines.'
    }
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.application = this.mockApplications.find(a => a.id === id) || this.mockApplications[0];
    }
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

  acceptApplication(): void {
    if (this.application && confirm('Accept this application?')) {
      this.application = { ...this.application, status: 'accepted' };
    }
  }

  rejectApplication(): void {
    if (this.application && confirm('Reject this application?')) {
      this.application = { ...this.application, status: 'rejected' };
    }
  }

  goBack(): void {
    this.router.navigate(['/chief/applications']);
  }
}
