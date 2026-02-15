import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-home">
      <!-- Welcome Banner -->
      <div class="welcome-banner">
        <div class="welcome-content">
          <h1 class="welcome-title">Supervisor Dashboard</h1>
          <p class="welcome-text">Monitor interns and manage evaluations</p>
        </div>
        <div class="stats-summary">
          <div class="summary-item">
            <div class="summary-number">{{ totalInterns }}</div>
            <div class="summary-label">Assigned Interns</div>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-item">
            <div class="summary-number">{{ pendingEvaluations }}</div>
            <div class="summary-label">Pending Evaluations</div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card stat-card-primary">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">+2</span>
          </div>
          <div class="stat-value">{{ totalInterns }}</div>
          <div class="stat-label">Active Interns</div>
          <div class="stat-footer">{{ activeInterns }} currently active</div>
        </div>

        <div class="stat-card stat-card-warning">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <span class="stat-badge trend-neutral">{{ pendingEvaluations }}</span>
          </div>
          <div class="stat-value">{{ pendingEvaluations }}</div>
          <div class="stat-label">Pending Evaluations</div>
          <div class="stat-footer">Due this week</div>
        </div>

        <div class="stat-card stat-card-success">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">100%</span>
          </div>
          <div class="stat-value">{{ completedEvaluations }}</div>
          <div class="stat-label">Completed</div>
          <div class="stat-footer">This month</div>
        </div>

        <div class="stat-card stat-card-info">
          <div class="stat-header">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <span class="stat-badge trend-up">+5%</span>
          </div>
          <div class="stat-value">{{ averageScore }}</div>
          <div class="stat-label">Average Score</div>
          <div class="stat-footer">Overall performance</div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="content-columns">
        <!-- My Interns -->
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              My Interns
            </h2>
            <a routerLink="/supervisor/interns" class="section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="interns-list">
            <div class="intern-item" *ngFor="let intern of myInterns">
              <div class="intern-avatar">{{ intern.name.charAt(0) }}</div>
              <div class="intern-content">
                <h3 class="intern-name">{{ intern.name }}</h3>
                <p class="intern-department">{{ intern.department }}</p>
                <div class="intern-meta">
                  <span class="status-pill" [ngClass]="'status-' + intern.status">{{ intern.statusLabel }}</span>
                  <span class="intern-duration">{{ intern.duration }}</span>
                </div>
              </div>
              <button class="intern-action" [routerLink]="['/supervisor/interns', intern.id]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Recent Evaluations -->
        <div class="content-section">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              Recent Evaluations
            </h2>
            <a routerLink="/supervisor/evaluations" class="section-link">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="evaluations-list">
            <div class="evaluation-item" *ngFor="let evaluation of recentEvaluations">
              <div class="evaluation-icon" [ngClass]="'score-' + evaluation.scoreClass">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div class="evaluation-content">
                <h3 class="evaluation-intern">{{ evaluation.internName }}</h3>
                <p class="evaluation-type">{{ evaluation.evaluationType }}</p>
                <div class="evaluation-meta">
                  <span class="evaluation-score">Score: {{ evaluation.score }}%</span>
                  <span class="evaluation-date">{{ evaluation.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Deadlines -->
      <div class="deadlines-section">
        <div class="section-header">
          <h2 class="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Upcoming Deadlines
          </h2>
        </div>

        <div class="deadlines-grid">
          <div class="deadline-card" *ngFor="let deadline of upcomingDeadlines">
            <div class="deadline-date">
              <div class="date-day">{{ deadline.day }}</div>
              <div class="date-month">{{ deadline.month }}</div>
            </div>
            <div class="deadline-content">
              <h3 class="deadline-title">{{ deadline.title }}</h3>
              <p class="deadline-intern">{{ deadline.internName }}</p>
              <span class="deadline-badge" [ngClass]="'urgency-' + deadline.urgency">{{ deadline.urgencyLabel }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2 class="actions-title">Quick Actions</h2>
        <div class="actions-grid">
          <a routerLink="/supervisor/interns" class="action-card action-primary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 class="action-title">View All Interns</h3>
            <p class="action-description">Manage assigned interns</p>
          </a>

          <a routerLink="/supervisor/evaluations" class="action-card action-secondary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <h3 class="action-title">Create Evaluation</h3>
            <p class="action-description">Submit new performance review</p>
          </a>

          <a routerLink="/supervisor/profile" class="action-card action-tertiary">
            <div class="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 class="action-title">Update Profile</h3>
            <p class="action-description">Manage your information</p>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-home {
      padding: 2rem;
      max-width: 1600px;
      margin: 0 auto;
    }

    .welcome-banner {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(52, 211, 153, 0.95));
      border-radius: 20px;
      padding: 2.5rem 3rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
      position: relative;
      overflow: hidden;
    }

    .welcome-banner::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 400px;
      height: 400px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }

    .welcome-content {
      position: relative;
      z-index: 1;
    }

    .welcome-title {
      font-size: 2.25rem;
      font-weight: 900;
      color: white;
      margin: 0 0 0.5rem 0;
    }

    .welcome-text {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
    }

    .stats-summary {
      display: flex;
      align-items: center;
      gap: 2rem;
      position: relative;
      z-index: 1;
    }

    .summary-item {
      text-align: center;
    }

    .summary-number {
      font-size: 3rem;
      font-weight: 900;
      color: white;
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .summary-label {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 600;
    }

    .summary-divider {
      width: 1px;
      height: 60px;
      background: rgba(255, 255, 255, 0.3);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .stat-card-primary::before { background: linear-gradient(90deg, #10b981, #34d399); }
    .stat-card-warning::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .stat-card-success::before { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .stat-card-info::before { background: linear-gradient(90deg, #ff7900, #ff9a40); }

    .stat-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
      border-color: rgba(16, 185, 129, 0.3);
    }

    .stat-card:hover::before {
      opacity: 1;
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #10b981;
    }

    .stat-badge {
      padding: 0.375rem 0.75rem;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .trend-up {
      background: rgba(16, 185, 129, 0.15);
      color: #10b981;
    }

    .trend-neutral {
      background: var(--hover-bg);
      color: var(--text-tertiary);
    }

    .stat-value {
      font-size: 3rem;
      font-weight: 900;
      color: var(--text-primary);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-tertiary);
      margin-bottom: 1rem;
    }

    .stat-footer {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .content-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .content-section {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: var(--shadow);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .section-title svg {
      color: #10b981;
    }

    .section-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #10b981;
      text-decoration: none;
      transition: all 0.2s;
    }

    .section-link:hover {
      gap: 0.5rem;
      color: #34d399;
    }

    .interns-list, .evaluations-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .intern-item, .evaluation-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: var(--hover-bg);
      border-radius: 12px;
      transition: all 0.2s;
    }

    .intern-item:hover, .evaluation-item:hover {
      background: var(--hover-glass);
      transform: translateX(4px);
    }

    .intern-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #10b981, #34d399);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .evaluation-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .score-high { background: linear-gradient(135deg, #10b981, #34d399); }
    .score-medium { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
    .score-low { background: linear-gradient(135deg, #ef4444, #f87171); }

    .intern-content, .evaluation-content {
      flex: 1;
      min-width: 0;
    }

    .intern-name, .evaluation-intern {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.25rem 0;
    }

    .intern-department, .evaluation-type {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0 0 0.5rem 0;
    }

    .intern-meta, .evaluation-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .status-pill {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.625rem;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .status-active { background: rgba(16, 185, 129, 0.15); color: #10b981; }
    .status-completed { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }

    .intern-duration, .evaluation-date {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .evaluation-score {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .intern-action {
      width: 40px;
      height: 40px;
      background: rgba(16, 185, 129, 0.1);
      border: none;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #10b981;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .intern-action:hover {
      background: rgba(16, 185, 129, 0.2);
      transform: translateX(2px);
    }

    .deadlines-section {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow);
    }

    .deadlines-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .deadline-card {
      background: var(--hover-bg);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      gap: 1.25rem;
      transition: all 0.2s;
    }

    .deadline-card:hover {
      background: var(--hover-glass);
      transform: translateY(-2px);
    }

    .deadline-date {
      text-align: center;
      padding: 0.75rem;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 10px;
      min-width: 60px;
    }

    .date-day {
      font-size: 1.5rem;
      font-weight: 900;
      color: #10b981;
      line-height: 1;
    }

    .date-month {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-tertiary);
      text-transform: uppercase;
      margin-top: 0.25rem;
    }

    .deadline-content {
      flex: 1;
    }

    .deadline-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.25rem 0;
    }

    .deadline-intern {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0 0 0.75rem 0;
    }

    .deadline-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.625rem;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .urgency-high { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
    .urgency-medium { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
    .urgency-low { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }

    .quick-actions {
      margin-top: 2rem;
    }

    .actions-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 1.5rem 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      background: var(--bg-glass-strong);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      padding: 2rem;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
    }

    .action-card::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .action-primary::before { background: linear-gradient(90deg, #10b981, #34d399); }
    .action-secondary::before { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .action-tertiary::before { background: linear-gradient(90deg, #ff7900, #ff9a40); }

    .action-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(16, 185, 129, 0.3);
    }

    .action-card:hover::before {
      opacity: 1;
    }

    .action-icon {
      width: 56px;
      height: 56px;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #10b981;
      margin-bottom: 1.25rem;
    }

    .action-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .action-description {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0;
    }

    @media (max-width: 1024px) {
      .content-columns {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .dashboard-home {
        padding: 1.5rem 1rem;
      }

      .welcome-banner {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
        padding: 2rem 1.5rem;
      }

      .stats-summary {
        width: 100%;
        justify-content: center;
      }

      .deadlines-grid, .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardHomeComponent implements OnInit {
  totalInterns = 8;
  activeInterns = 6;
  pendingEvaluations = 3;
  completedEvaluations = 12;
  averageScore = 87;

  myInterns = [
    { id: 1, name: 'Alice Johnson', department: 'IT Department', status: 'active', statusLabel: 'Active', duration: 'Week 4 of 12' },
    { id: 2, name: 'Bob Smith', department: 'Marketing', status: 'active', statusLabel: 'Active', duration: 'Week 8 of 12' },
    { id: 3, name: 'Carol White', department: 'Data Science', status: 'active', statusLabel: 'Active', duration: 'Week 2 of 12' },
    { id: 4, name: 'David Brown', department: 'Design Team', status: 'completed', statusLabel: 'Completed', duration: 'Finished' },
  ];

  recentEvaluations = [
    { internName: 'Alice Johnson', evaluationType: 'Mid-term Evaluation', scoreClass: 'high', score: 92, date: '2 days ago' },
    { internName: 'Bob Smith', evaluationType: 'Weekly Progress', scoreClass: 'high', score: 88, date: '5 days ago' },
    { internName: 'Carol White', evaluationType: 'Monthly Review', scoreClass: 'medium', score: 75, date: '1 week ago' },
    { internName: 'David Brown', evaluationType: 'Final Evaluation', scoreClass: 'high', score: 95, date: '2 weeks ago' },
  ];

  upcomingDeadlines = [
    { day: '15', month: 'Jan', title: 'Mid-term Evaluation', internName: 'Alice Johnson', urgency: 'high', urgencyLabel: 'Due Soon' },
    { day: '20', month: 'Jan', title: 'Weekly Report', internName: 'Bob Smith', urgency: 'medium', urgencyLabel: 'This Week' },
    { day: '28', month: 'Jan', title: 'Performance Review', internName: 'Carol White', urgency: 'low', urgencyLabel: 'Next Week' },
  ];

  ngOnInit(): void {}
}
