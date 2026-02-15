import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

interface TimelineEntry {
  action: string;
  date: string;
  by: string;
  icon: string;
}

interface ApplicationDetail {
  id: number;
  applicant: {
    name: string;
    email: string;
    phone: string;
    university: string;
    department: string;
    avatar: string;
  };
  offer: {
    title: string;
    department: string;
    chief: string;
    duration: string;
  };
  status: string;
  appliedDate: string;
  cvFileName: string;
  coverLetter: string;
  timeline: TimelineEntry[];
}

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">
      <!-- Back Button -->
      <a routerLink="/hr/applications" class="back-link">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Applications
      </a>

      <div class="content" *ngIf="application">
        <div class="layout">
          <!-- Left Column -->
          <div class="main-col">
            <!-- Applicant Profile Card -->
            <div class="card">
              <div class="profile-header">
                <div class="profile-avatar">{{ application.applicant.avatar }}</div>
                <div>
                  <h1 class="profile-name">{{ application.applicant.name }}</h1>
                  <p class="profile-uni">{{ application.applicant.university }} &middot; {{ application.applicant.department }}</p>
                </div>
                <span class="badge" [ngClass]="'badge-' + application.status">
                  {{ application.status | titlecase }}
                </span>
              </div>

              <div class="contact-grid">
                <div class="contact-item">
                  <svg width="16" height="16" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>{{ application.applicant.email }}</span>
                </div>
                <div class="contact-item">
                  <svg width="16" height="16" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>{{ application.applicant.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Offer Details Card -->
            <div class="card">
              <h3 class="card-title">Applied Offer</h3>
              <div class="offer-info">
                <div class="offer-main">
                  <h4 class="offer-name">{{ application.offer.title }}</h4>
                  <p class="offer-meta">{{ application.offer.department }} &middot; {{ application.offer.duration }}</p>
                </div>
                <span class="offer-chief">Chief: {{ application.offer.chief }}</span>
              </div>
            </div>

            <!-- Cover Letter Card -->
            <div class="card">
              <h3 class="card-title">Cover Letter</h3>
              <p class="cover-text">{{ application.coverLetter }}</p>
            </div>

            <!-- CV Section -->
            <div class="card">
              <h3 class="card-title">CV / Resume</h3>
              <div class="cv-section">
                <div class="cv-file">
                  <svg width="24" height="24" fill="none" stroke="#ff7900" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <div>
                    <span class="cv-name">{{ application.cvFileName }}</span>
                    <span class="cv-size">PDF &middot; 245 KB</span>
                  </div>
                </div>
                <button class="btn-download">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="side-col">
            <!-- Decision Card -->
            <div class="card decision-card">
              <h3 class="card-title">HR Decision</h3>
              <p class="decision-text">Make a final decision on this application.</p>
              <div class="decision-actions">
                <button class="btn-finalize" (click)="finalizeApplication()">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                  Finalize
                </button>
                <button class="btn-reject" (click)="rejectApplication()">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Reject
                </button>
              </div>
            </div>

            <!-- Timeline Card -->
            <div class="card">
              <h3 class="card-title">Activity Timeline</h3>
              <div class="timeline">
                <div class="timeline-item" *ngFor="let entry of application.timeline; let last = last">
                  <div class="timeline-connector" *ngIf="!last"></div>
                  <div class="timeline-dot">{{ entry.icon }}</div>
                  <div class="timeline-content">
                    <span class="timeline-action">{{ entry.action }}</span>
                    <span class="timeline-meta">{{ entry.by }} &middot; {{ entry.date }}</span>
                  </div>
                </div>
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

    .back-link:hover { color: #ff7900; }

    .layout {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 24px;
      align-items: start;
    }

    .main-col, .side-col {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .card-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .profile-avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff7900, #e06800);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .profile-name {
      font-size: 22px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 2px;
    }

    .profile-uni {
      font-size: 13px;
      color: #6b7280;
      margin: 0;
    }

    .badge {
      margin-left: auto;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }

    .badge-pending { background: #fffbeb; color: #d97706; }
    .badge-accepted { background: #ecfdf5; color: #059669; }
    .badge-rejected { background: #fef2f2; color: #dc2626; }
    .badge-interview { background: #eff6ff; color: #2563eb; }
    .badge-review { background: #f5f3ff; color: #7c3aed; }
    .badge-finalized { background: #ecfdf5; color: #047857; }

    .contact-grid {
      display: flex;
      gap: 24px;
      padding-top: 16px;
      border-top: 1px solid #f0f1f3;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #6b7280;
    }

    .offer-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .offer-name {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 4px;
    }

    .offer-meta {
      font-size: 13px;
      color: #6b7280;
      margin: 0;
    }

    .offer-chief {
      font-size: 13px;
      color: #9ca3af;
      white-space: nowrap;
    }

    .cover-text {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.7;
      margin: 0;
    }

    .cv-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background: #fafbfc;
      border-radius: 12px;
      border: 1px solid #f0f1f3;
    }

    .cv-file {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cv-name {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .cv-size {
      font-size: 12px;
      color: #9ca3af;
    }

    .btn-download {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: 1px solid #f0f1f3;
      background: white;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-download:hover {
      border-color: #ff7900;
      color: #ff7900;
    }

    .decision-card {
      border: 1px solid #fed7aa;
      background: #fffbf5;
    }

    .decision-text {
      font-size: 13px;
      color: #6b7280;
      margin: 0 0 16px;
    }

    .decision-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .btn-finalize, .btn-reject {
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

    .btn-finalize {
      background: #ff7900;
      color: white;
    }

    .btn-finalize:hover { background: #e06800; }

    .btn-reject {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    .btn-reject:hover { background: #fee2e2; }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .timeline-item {
      display: flex;
      gap: 12px;
      position: relative;
      padding-bottom: 20px;
    }

    .timeline-item:last-child { padding-bottom: 0; }

    .timeline-connector {
      position: absolute;
      left: 11px;
      top: 26px;
      bottom: 0;
      width: 2px;
      background: #f0f1f3;
    }

    .timeline-dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 12px;
    }

    .timeline-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-top: 2px;
    }

    .timeline-action {
      font-size: 13px;
      font-weight: 500;
      color: #111827;
    }

    .timeline-meta {
      font-size: 12px;
      color: #9ca3af;
    }
  `]
})
export class ApplicationDetailComponent implements OnInit {
  application: ApplicationDetail | null = null;

  private mockApplications: ApplicationDetail[] = [
    {
      id: 1,
      applicant: {
        name: 'Sami Gharbi',
        email: 'sami.gharbi@univ.tn',
        phone: '+216 55 123 456',
        university: 'University of Tunis',
        department: 'Computer Science',
        avatar: 'SG'
      },
      offer: {
        title: 'Full-Stack Developer Intern',
        department: 'Engineering',
        chief: 'Ahmed Ben Salah',
        duration: '6 months'
      },
      status: 'interview',
      appliedDate: 'Jan 18, 2026',
      cvFileName: 'Sami_Gharbi_CV.pdf',
      coverLetter: 'I am writing to express my strong interest in the Full-Stack Developer Intern position at Orange Digital Center. As a final-year Computer Science student at the University of Tunis, I have developed a solid foundation in web development technologies including Angular, TypeScript, and Node.js. I have completed several academic projects using these technologies and I am eager to apply my skills in a professional environment. I am particularly drawn to Orange\'s commitment to innovation and digital transformation in Tunisia.',
      timeline: [
        { action: 'Application submitted', date: 'Jan 18, 2026', by: 'Sami Gharbi', icon: '📄' },
        { action: 'Application reviewed', date: 'Jan 20, 2026', by: 'HR Team', icon: '👁' },
        { action: 'Interview scheduled', date: 'Jan 25, 2026', by: 'Ahmed Ben Salah', icon: '📅' },
        { action: 'Interview completed', date: 'Jan 28, 2026', by: 'Ahmed Ben Salah', icon: '✅' },
        { action: 'Pending HR decision', date: 'Feb 01, 2026', by: 'System', icon: '⏳' }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.application = this.mockApplications.find(a => a.id === id) || this.mockApplications[0];
  }

  finalizeApplication(): void {
    if (this.application) {
      this.application.status = 'finalized';
      this.application.timeline.push({
        action: 'Application finalized',
        date: 'Feb 07, 2026',
        by: 'HR Manager',
        icon: '🎉'
      });
    }
  }

  rejectApplication(): void {
    if (this.application) {
      this.application.status = 'rejected';
      this.application.timeline.push({
        action: 'Application rejected',
        date: 'Feb 07, 2026',
        by: 'HR Manager',
        icon: '❌'
      });
    }
  }
}
