import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface Milestone {
  title: string;
  completed: boolean;
  dueDate: string;
}

interface InternDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  internshipTitle: string;
  department: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  milestones: Milestone[];
  notes: string[];
}

@Component({
  selector: 'app-intern-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="detail-page" *ngIf="intern">
      <!-- Back Button -->
      <button class="btn-back" (click)="goBack()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Interns
      </button>

      <div class="detail-grid">
        <!-- Profile Card -->
        <div class="card profile-card">
          <div class="profile-header">
            <div class="avatar">{{ getInitials() }}</div>
            <div class="profile-info">
              <h2>{{ intern.firstName }} {{ intern.lastName }}</h2>
              <span class="status-badge" [ngClass]="'status-' + intern.status.toLowerCase()">{{ intern.status }}</span>
            </div>
          </div>
          <div class="profile-details">
            <div class="detail-row">
              <span class="detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <span class="detail-text">{{ intern.email }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </span>
              <span class="detail-text">{{ intern.phone }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 4 3 6 3s6-2 6-3v-5"/></svg>
              </span>
              <span class="detail-text">{{ intern.university }}</span>
            </div>
          </div>
        </div>

        <!-- Internship Info Card -->
        <div class="card internship-card">
          <h3 class="card-title">Internship Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Title</span>
              <span class="info-value highlight">{{ intern.internshipTitle }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Department</span>
              <span class="info-value">{{ intern.department }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Start Date</span>
              <span class="info-value">{{ intern.startDate }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">End Date</span>
              <span class="info-value">{{ intern.endDate }}</span>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-header">
              <span class="progress-label">Overall Progress</span>
              <span class="progress-value">{{ intern.progress }}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" [style.width.%]="intern.progress"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Milestones & Notes Row -->
      <div class="detail-grid" style="margin-top: 20px;">
        <!-- Milestones Card -->
        <div class="card">
          <h3 class="card-title">Milestones & Tasks</h3>
          <div class="milestones-list">
            <div class="milestone-item" *ngFor="let m of intern.milestones" (click)="toggleMilestone(m)">
              <div class="checkbox" [class.checked]="m.completed">
                <svg *ngIf="m.completed" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="milestone-content">
                <span class="milestone-title" [class.completed-text]="m.completed">{{ m.title }}</span>
                <span class="milestone-due">Due: {{ m.dueDate }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes Card -->
        <div class="card">
          <h3 class="card-title">Notes</h3>
          <div class="notes-list">
            <div class="note-item" *ngFor="let note of intern.notes">
              <div class="note-bullet"></div>
              <p>{{ note }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-bar">
        <button class="btn-primary" (click)="writeEvaluation()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Write Evaluation
        </button>
        <button class="btn-secondary" (click)="sendFeedback()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Send Feedback
        </button>
      </div>
    </div>
  `,
  styles: [`
    .detail-page {
      padding: 32px;
      background: #f5f6f8;
      min-height: 100%;
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      margin-bottom: 24px;
      transition: all 0.2s;
    }

    .btn-back:hover {
      color: #ff7900;
      border-color: #ff7900;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      padding: 24px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 20px;
    }

    /* Profile Card */
    .profile-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #ff7900;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .profile-info h2 {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 6px;
    }

    .status-badge {
      font-size: 12px;
      font-weight: 600;
      padding: 3px 12px;
      border-radius: 20px;
    }

    .status-active { background: #ecfdf5; color: #059669; }
    .status-completed { background: #eff6ff; color: #2563eb; }
    .status-upcoming { background: #fefce8; color: #ca8a04; }

    .profile-details {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .detail-text {
      font-size: 14px;
      color: #6b7280;
    }

    /* Internship Card */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-label {
      font-size: 12px;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .info-value {
      font-size: 14px;
      color: #111827;
      font-weight: 500;
    }

    .info-value.highlight {
      color: #ff7900;
      font-weight: 600;
    }

    .progress-section { margin-top: 8px; }

    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .progress-label {
      font-size: 13px;
      color: #9ca3af;
      font-weight: 500;
    }

    .progress-value {
      font-size: 13px;
      font-weight: 700;
      color: #ff7900;
    }

    .progress-track {
      height: 8px;
      background: #f0f1f3;
      border-radius: 8px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #ff7900, #e06800);
      border-radius: 8px;
      transition: width 0.4s ease;
    }

    /* Milestones */
    .milestones-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .milestone-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;
      border: 1px solid #f0f1f3;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .milestone-item:hover {
      background: #f9fafb;
    }

    .checkbox {
      width: 22px;
      height: 22px;
      min-width: 22px;
      border-radius: 6px;
      border: 2px solid #d1d5db;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
      transition: all 0.2s;
    }

    .checkbox.checked {
      background: #059669;
      border-color: #059669;
    }

    .milestone-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .milestone-title {
      font-size: 14px;
      color: #111827;
      font-weight: 500;
    }

    .milestone-title.completed-text {
      text-decoration: line-through;
      color: #9ca3af;
    }

    .milestone-due {
      font-size: 12px;
      color: #9ca3af;
    }

    /* Notes */
    .notes-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .note-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 10px;
    }

    .note-bullet {
      width: 8px;
      height: 8px;
      min-width: 8px;
      border-radius: 50%;
      background: #ff7900;
      margin-top: 6px;
    }

    .note-item p {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
      line-height: 1.5;
    }

    /* Action Bar */
    .action-bar {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #ff7900;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary:hover {
      background: #e06800;
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #fff;
      color: #ff7900;
      border: 1px solid #ff7900;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: #fff7ed;
    }
  `]
})
export class InternDetailComponent implements OnInit {
  intern: InternDetail | null = null;

  private mockInterns: InternDetail[] = [
    {
      id: '1',
      firstName: 'Amira',
      lastName: 'Ben Salah',
      email: 'amira.bensalah@univ.tn',
      phone: '+216 55 123 456',
      university: 'University of Tunis',
      internshipTitle: 'Frontend Development Intern',
      department: 'Digital & IT',
      progress: 72,
      startDate: '2026-01-15',
      endDate: '2026-06-15',
      status: 'Active',
      milestones: [
        { title: 'Complete onboarding training', completed: true, dueDate: '2026-01-22' },
        { title: 'Finish UI component library', completed: true, dueDate: '2026-02-15' },
        { title: 'Implement dashboard module', completed: false, dueDate: '2026-03-15' },
        { title: 'Write unit tests', completed: false, dueDate: '2026-04-15' },
        { title: 'Final presentation', completed: false, dueDate: '2026-06-10' }
      ],
      notes: [
        'Amira is making excellent progress on the component library. Shows strong attention to detail.',
        'Recommended pairing with senior dev for the dashboard module.',
        'Need to schedule mid-term review by March 1st.'
      ]
    },
    {
      id: '2',
      firstName: 'Mohamed',
      lastName: 'Trabelsi',
      email: 'mohamed.trabelsi@smu.tn',
      phone: '+216 50 987 654',
      university: 'South Mediterranean University',
      internshipTitle: 'Data Engineering Intern',
      department: 'Data & Analytics',
      progress: 100,
      startDate: '2025-07-01',
      endDate: '2025-12-31',
      status: 'Completed',
      milestones: [
        { title: 'Data pipeline setup', completed: true, dueDate: '2025-07-30' },
        { title: 'ETL module development', completed: true, dueDate: '2025-09-15' },
        { title: 'Dashboard integration', completed: true, dueDate: '2025-11-01' },
        { title: 'Documentation & handoff', completed: true, dueDate: '2025-12-20' }
      ],
      notes: [
        'Outstanding performance. Delivered all milestones ahead of schedule.',
        'Recommended for full-time position.'
      ]
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.intern = this.mockInterns.find(i => i.id === id) || this.mockInterns[0];
  }

  getInitials(): string {
    if (!this.intern) return '';
    return this.intern.firstName.charAt(0) + this.intern.lastName.charAt(0);
  }

  toggleMilestone(milestone: Milestone): void {
    milestone.completed = !milestone.completed;
  }

  goBack(): void {
    this.router.navigate(['/supervisor/interns']);
  }

  writeEvaluation(): void {
    this.router.navigate(['/supervisor/evaluations', 'new']);
  }

  sendFeedback(): void {
    alert('Feedback dialog coming soon!');
  }
}
