import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Evaluation {
  id: string;
  internName: string;
  internship: string;
  date: string;
  score: number;
  status: 'Submitted' | 'Draft' | 'Pending';
}

@Component({
  selector: 'app-evaluations-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="evaluations-page">
      <!-- Header -->
      <div class="page-header">
        <div class="header-text">
          <h1>Evaluations</h1>
          <p class="subtitle">Track and manage intern performance evaluations</p>
        </div>
        <button class="btn-create" (click)="createNew()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Evaluation
        </button>
      </div>

      <!-- Table Card -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Intern Name</th>
              <th>Internship</th>
              <th>Date</th>
              <th>Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let ev of evaluations">
              <td>
                <div class="intern-cell">
                  <div class="mini-avatar" [style.background]="getAvatarColor(ev)">
                    {{ getInitials(ev.internName) }}
                  </div>
                  <span class="intern-name">{{ ev.internName }}</span>
                </div>
              </td>
              <td class="text-muted">{{ ev.internship }}</td>
              <td class="text-muted">{{ ev.date }}</td>
              <td>
                <div class="score-display">
                  <div class="score-bar-track">
                    <div class="score-bar-fill" [style.width.%]="ev.score * 20" [style.background]="getScoreColor(ev.score)"></div>
                  </div>
                  <span class="score-num">{{ ev.score }}/5</span>
                </div>
              </td>
              <td>
                <span class="status-badge" [ngClass]="'status-' + ev.status.toLowerCase()">
                  {{ ev.status }}
                </span>
              </td>
              <td>
                <div class="action-btns">
                  <button class="btn-icon" title="View" (click)="viewEvaluation(ev.id)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button class="btn-icon" *ngIf="ev.status === 'Draft'" title="Edit" (click)="editEvaluation(ev.id)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .evaluations-page {
      padding: 32px;
      background: #f5f6f8;
      min-height: 100%;
    }

    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 28px;
    }

    .header-text h1 {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px;
    }

    .subtitle {
      font-size: 14px;
      color: #9ca3af;
      margin: 0;
    }

    .btn-create {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      background: #ff7900;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-create:hover {
      background: #e06800;
    }

    .table-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #f9fafb;
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
    }

    td {
      padding: 16px 20px;
      font-size: 14px;
      color: #111827;
      border-bottom: 1px solid #f0f1f3;
      vertical-align: middle;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr:hover {
      background: #fafbfc;
    }

    .text-muted {
      color: #6b7280;
    }

    .intern-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .mini-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
    }

    .intern-name {
      font-weight: 500;
      color: #111827;
    }

    .score-display {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .score-bar-track {
      width: 80px;
      height: 6px;
      background: #f0f1f3;
      border-radius: 6px;
      overflow: hidden;
    }

    .score-bar-fill {
      height: 100%;
      border-radius: 6px;
      transition: width 0.3s;
    }

    .score-num {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
    }

    .status-badge {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      display: inline-block;
    }

    .status-submitted {
      background: #ecfdf5;
      color: #059669;
    }

    .status-draft {
      background: #fefce8;
      color: #ca8a04;
    }

    .status-pending {
      background: #fff1f2;
      color: #e11d48;
    }

    .action-btns {
      display: flex;
      gap: 6px;
    }

    .btn-icon {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 8px;
      cursor: pointer;
      color: #6b7280;
      transition: all 0.15s;
    }

    .btn-icon:hover {
      border-color: #ff7900;
      color: #ff7900;
    }
  `]
})
export class EvaluationsListComponent {
  evaluations: Evaluation[] = [
    {
      id: '1',
      internName: 'Amira Ben Salah',
      internship: 'Frontend Development',
      date: '2026-02-01',
      score: 4.2,
      status: 'Submitted'
    },
    {
      id: '2',
      internName: 'Mohamed Trabelsi',
      internship: 'Data Engineering',
      date: '2025-12-20',
      score: 4.8,
      status: 'Submitted'
    },
    {
      id: '3',
      internName: 'Yasmine Khelifi',
      internship: 'DevOps',
      date: '2026-02-05',
      score: 3.5,
      status: 'Draft'
    },
    {
      id: '4',
      internName: 'Karim Bouazizi',
      internship: 'Backend Development',
      date: '2026-02-07',
      score: 0,
      status: 'Pending'
    },
    {
      id: '5',
      internName: 'Amira Ben Salah',
      internship: 'Frontend Development',
      date: '2026-01-15',
      score: 3.9,
      status: 'Submitted'
    }
  ];

  constructor(private router: Router) {}

  getInitials(name: string): string {
    return name.split(' ').map(w => w.charAt(0)).slice(0, 2).join('');
  }

  getAvatarColor(ev: Evaluation): string {
    const colors = ['#ff7900', '#2563eb', '#059669', '#7c3aed', '#dc2626'];
    const idx = this.evaluations.indexOf(ev) % colors.length;
    return colors[idx];
  }

  getScoreColor(score: number): string {
    if (score >= 4) return '#059669';
    if (score >= 3) return '#ff7900';
    return '#9ca3af';
  }

  viewEvaluation(id: string): void {
    this.router.navigate(['/supervisor/evaluations', id]);
  }

  editEvaluation(id: string): void {
    this.router.navigate(['/supervisor/evaluations', id]);
  }

  createNew(): void {
    this.router.navigate(['/supervisor/evaluations', 'new']);
  }
}
