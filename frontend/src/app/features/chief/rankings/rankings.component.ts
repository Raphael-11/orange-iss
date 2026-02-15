import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1>AI Rankings</h1>
          <p class="subtitle">AI-powered candidate ranking based on skills matching and profile analysis</p>
        </div>
      </div>

      <!-- Info Card -->
      <div class="info-card">
        <div class="info-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </div>
        <div>
          <h3>How AI Ranking Works</h3>
          <p>Our AI system analyzes each candidate's CV, skills, and experience to produce a compatibility score for each offer. The ranking considers skills match, relevant experience, education level, and overall profile strength. Scores are updated automatically when new applications are received.</p>
        </div>
      </div>

      <!-- Offer Selector -->
      <div class="offer-selector-card">
        <label>Ranking for Offer:</label>
        <div class="selector-row">
          <button
            *ngFor="let offer of offers; let i = index"
            class="offer-tab"
            [class.active]="selectedOffer === i"
            (click)="selectedOffer = i"
          >
            {{ offer }}
          </button>
        </div>
      </div>

      <!-- Rankings Table -->
      <div class="table-card">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th class="col-rank">Rank</th>
                <th>Candidate</th>
                <th>AI Score</th>
                <th>Skills Match</th>
                <th>Experience</th>
                <th>Overall</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let candidate of candidates; let i = index">
                <td>
                  <span class="rank-badge" [class]="'rank-' + (i + 1)">{{ i + 1 }}</span>
                </td>
                <td>
                  <div class="candidate-cell">
                    <div class="candidate-avatar">{{ getInitials(candidate.name) }}</div>
                    <div>
                      <div class="candidate-name">{{ candidate.name }}</div>
                      <div class="candidate-uni">{{ candidate.university }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="score-cell">
                    <div class="score-bar-bg">
                      <div class="score-bar-fill" [style.width.%]="candidate.aiScore" [class]="getScoreClass(candidate.aiScore)"></div>
                    </div>
                    <span class="score-text" [class]="getScoreClass(candidate.aiScore)">{{ candidate.aiScore }}%</span>
                  </div>
                </td>
                <td>
                  <div class="score-cell">
                    <div class="score-bar-bg">
                      <div class="score-bar-fill" [style.width.%]="candidate.skillsMatch" [class]="getScoreClass(candidate.skillsMatch)"></div>
                    </div>
                    <span class="score-text">{{ candidate.skillsMatch }}%</span>
                  </div>
                </td>
                <td>
                  <div class="score-cell">
                    <div class="score-bar-bg">
                      <div class="score-bar-fill" [style.width.%]="candidate.experience" [class]="getScoreClass(candidate.experience)"></div>
                    </div>
                    <span class="score-text">{{ candidate.experience }}%</span>
                  </div>
                </td>
                <td>
                  <span class="overall-badge" [class]="getScoreClass(candidate.overall)">
                    {{ candidate.overall }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .page-header {
      margin-bottom: 24px;
    }

    .page-header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
    }

    .subtitle { color: #6b7280; font-size: 0.938rem; margin: 0; }

    /* Info Card */
    .info-card {
      display: flex;
      gap: 16px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 20px;
    }

    .info-icon {
      flex-shrink: 0;
      color: #2563eb;
      margin-top: 2px;
    }

    .info-card h3 {
      font-size: 0.938rem;
      font-weight: 600;
      color: #1e40af;
      margin: 0 0 6px 0;
    }

    .info-card p {
      font-size: 0.875rem;
      color: #3b82f6;
      line-height: 1.6;
      margin: 0;
    }

    /* Offer Selector */
    .offer-selector-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 14px;
      padding: 18px 22px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .offer-selector-card label {
      display: block;
      font-size: 0.813rem;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 10px;
    }

    .selector-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .offer-tab {
      padding: 8px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #fff;
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    .offer-tab.active {
      background: #ff7900;
      color: #fff;
      border-color: #ff7900;
    }

    .offer-tab:hover:not(.active) {
      background: #f9fafb;
      border-color: #d1d5db;
    }

    /* Table Card */
    .table-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
    }

    .table-scroll { overflow-x: auto; }

    table { width: 100%; border-collapse: collapse; }

    thead { background: #f9fafb; }

    th {
      text-align: left;
      padding: 13px 18px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #f0f1f3;
    }

    .col-rank { width: 60px; text-align: center; }

    td {
      padding: 14px 18px;
      border-bottom: 1px solid #f5f6f8;
      vertical-align: middle;
    }

    tbody tr:hover { background: #fafbfc; }
    tbody tr:last-child td { border-bottom: none; }

    /* Rank Badge */
    .rank-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      font-size: 0.813rem;
      font-weight: 700;
      background: #f3f4f6;
      color: #6b7280;
    }

    .rank-1 { background: #fef3c7; color: #92400e; }
    .rank-2 { background: #e5e7eb; color: #4b5563; }
    .rank-3 { background: #fed7aa; color: #9a3412; }

    /* Candidate Cell */
    .candidate-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .candidate-avatar {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #ff7900, #e06800);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.75rem;
      flex-shrink: 0;
    }

    .candidate-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #111827;
      margin-bottom: 1px;
    }

    .candidate-uni {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    /* Score Bars */
    .score-cell {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 120px;
    }

    .score-bar-bg {
      flex: 1;
      height: 6px;
      background: #f3f4f6;
      border-radius: 100px;
      overflow: hidden;
    }

    .score-bar-fill {
      height: 100%;
      border-radius: 100px;
      transition: width 0.4s ease;
    }

    .score-bar-fill.score-high { background: #059669; }
    .score-bar-fill.score-medium { background: #d97706; }
    .score-bar-fill.score-low { background: #dc2626; }

    .score-text {
      font-size: 0.813rem;
      font-weight: 600;
      color: #6b7280;
      min-width: 36px;
      text-align: right;
    }

    /* Overall Badge */
    .overall-badge {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 0.813rem;
      font-weight: 700;
    }

    .overall-badge.score-high { background: #d1fae5; color: #065f46; }
    .overall-badge.score-medium { background: #fef3c7; color: #92400e; }
    .overall-badge.score-low { background: #fee2e2; color: #991b1b; }

    @media (max-width: 768px) {
      .page { padding: 20px 16px; }
      .table-scroll { overflow-x: scroll; }
      table { min-width: 700px; }
    }
  `]
})
export class RankingsComponent {
  selectedOffer = 0;

  offers = [
    'Software Development Internship',
    'Data Engineering Internship',
    'Network Administration Internship'
  ];

  candidates = [
    { name: 'Sara Trabelsi', university: 'SMU', aiScore: 94, skillsMatch: 92, experience: 88, overall: 92 },
    { name: 'Alice Martin', university: 'ESPRIT', aiScore: 88, skillsMatch: 85, experience: 90, overall: 87 },
    { name: 'Youssef Ben Ali', university: 'INSAT', aiScore: 82, skillsMatch: 80, experience: 78, overall: 80 },
    { name: 'Amira Souissi', university: 'ESPRIT', aiScore: 76, skillsMatch: 72, experience: 82, overall: 76 },
    { name: 'Mohamed Kacem', university: 'ENIT', aiScore: 65, skillsMatch: 60, experience: 70, overall: 65 }
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getScoreClass(score: number): string {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  }
}
