import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Reports & Analytics</h1>
          <p class="page-subtitle">Insights across internship offers, applications, and hiring</p>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="stats-row">
        <div class="stat-card" *ngFor="let stat of overviewStats">
          <div class="stat-icon" [style.background]="stat.bg">
            <span>{{ stat.icon }}</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
          <span class="stat-trend" [class.positive]="stat.positive" [class.negative]="!stat.positive">
            {{ stat.trend }}
          </span>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="charts-row">
        <!-- Offers by Department -->
        <div class="chart-card">
          <h3 class="chart-title">Offers by Department</h3>
          <div class="bar-chart">
            <div class="bar-item" *ngFor="let item of departmentData">
              <span class="bar-label">{{ item.label }}</span>
              <div class="bar-track">
                <div class="bar-fill" [style.width.%]="item.pct" [style.background]="item.color"></div>
              </div>
              <span class="bar-value">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- Applications by Status -->
        <div class="chart-card">
          <h3 class="chart-title">Applications by Status</h3>
          <div class="donut-chart">
            <div class="donut-center">
              <span class="donut-total">42</span>
              <span class="donut-label">Total</span>
            </div>
          </div>
          <div class="legend">
            <div class="legend-item" *ngFor="let item of statusData">
              <span class="legend-dot" [style.background]="item.color"></span>
              <span class="legend-label">{{ item.label }}</span>
              <span class="legend-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Trends -->
      <div class="chart-card full-width">
        <h3 class="chart-title">Monthly Trends</h3>
        <div class="trends-chart">
          <div class="trend-bar-group" *ngFor="let month of monthlyData">
            <div class="trend-bars">
              <div class="trend-bar offers" [style.height.px]="month.offers * 4" [title]="'Offers: ' + month.offers"></div>
              <div class="trend-bar applications" [style.height.px]="month.applications * 2" [title]="'Applications: ' + month.applications"></div>
              <div class="trend-bar hired" [style.height.px]="month.hired * 8" [title]="'Hired: ' + month.hired"></div>
            </div>
            <span class="trend-label">{{ month.month }}</span>
          </div>
        </div>
        <div class="trend-legend">
          <span class="trend-legend-item"><span class="tl-dot offers"></span> Offers</span>
          <span class="trend-legend-item"><span class="tl-dot applications"></span> Applications</span>
          <span class="trend-legend-item"><span class="tl-dot hired"></span> Hired</span>
        </div>
      </div>

      <!-- Quick Stats Table -->
      <div class="table-card">
        <h3 class="chart-title table-title">Quick Stats Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>This Month</th>
              <th>Last Month</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of quickStats">
              <td class="metric-cell">{{ row.metric }}</td>
              <td class="value-cell">{{ row.current }}</td>
              <td class="value-cell">{{ row.previous }}</td>
              <td>
                <span class="change" [class.positive]="row.positive" [class.negative]="!row.positive">
                  {{ row.change }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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

    .page-header { margin-bottom: 28px; }

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

    /* Stats Row */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .stat-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }

    .stat-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 22px;
      font-weight: 700;
      color: #111827;
    }

    .stat-label {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 2px;
    }

    .stat-trend {
      font-size: 12px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
    }

    .stat-trend.positive {
      background: #ecfdf5;
      color: #059669;
    }

    .stat-trend.negative {
      background: #fef2f2;
      color: #dc2626;
    }

    /* Charts Row */
    .charts-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    .chart-card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .chart-card.full-width {
      margin-bottom: 24px;
    }

    .chart-title {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 20px;
    }

    .table-title {
      padding: 24px 24px 0;
    }

    /* Bar Chart */
    .bar-chart {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .bar-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bar-label {
      font-size: 13px;
      color: #6b7280;
      width: 120px;
      flex-shrink: 0;
    }

    .bar-track {
      flex: 1;
      height: 10px;
      background: #f3f4f6;
      border-radius: 100px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      border-radius: 100px;
      transition: width 0.6s ease;
    }

    .bar-value {
      font-size: 13px;
      font-weight: 600;
      color: #111827;
      width: 28px;
      text-align: right;
    }

    /* Donut Chart Placeholder */
    .donut-chart {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: conic-gradient(
        #10b981 0deg 86deg,
        #f59e0b 86deg 154deg,
        #3b82f6 154deg 223deg,
        #8b5cf6 223deg 274deg,
        #ef4444 274deg 326deg,
        #9ca3af 326deg 360deg
      );
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .donut-center {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .donut-total {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
    }

    .donut-label {
      font-size: 11px;
      color: #9ca3af;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .legend-label { color: #6b7280; }
    .legend-value { font-weight: 600; color: #111827; }

    /* Trends Chart */
    .trends-chart {
      display: flex;
      align-items: flex-end;
      gap: 24px;
      height: 140px;
      padding: 0 12px;
      margin-bottom: 16px;
    }

    .trend-bar-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .trend-bars {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 120px;
    }

    .trend-bar {
      width: 14px;
      border-radius: 4px 4px 0 0;
      min-height: 4px;
    }

    .trend-bar.offers { background: #ff7900; }
    .trend-bar.applications { background: #3b82f6; }
    .trend-bar.hired { background: #10b981; }

    .trend-label {
      font-size: 11px;
      color: #9ca3af;
      font-weight: 500;
    }

    .trend-legend {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .trend-legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #6b7280;
    }

    .tl-dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      display: inline-block;
    }

    .tl-dot.offers { background: #ff7900; }
    .tl-dot.applications { background: #3b82f6; }
    .tl-dot.hired { background: #10b981; }

    /* Table */
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
      padding: 14px 24px;
      font-size: 12px;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #f0f1f3;
      background: #fafbfc;
    }

    td {
      padding: 14px 24px;
      font-size: 14px;
      color: #374151;
      border-bottom: 1px solid #f0f1f3;
    }

    tr:last-child td { border-bottom: none; }

    .metric-cell { font-weight: 500; color: #111827; }
    .value-cell { font-weight: 600; }

    .change {
      font-size: 12px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 100px;
    }

    .change.positive { background: #ecfdf5; color: #059669; }
    .change.negative { background: #fef2f2; color: #dc2626; }
  `]
})
export class ReportsComponent {
  overviewStats = [
    { label: 'Total Offers', value: '18', icon: '📋', bg: '#fff7ed', trend: '+12%', positive: true },
    { label: 'Total Applications', value: '42', icon: '📨', bg: '#eff6ff', trend: '+24%', positive: true },
    { label: 'Acceptance Rate', value: '68%', icon: '✅', bg: '#ecfdf5', trend: '+5%', positive: true },
    { label: 'Avg Time to Hire', value: '14d', icon: '⏱', bg: '#f5f3ff', trend: '-2d', positive: true }
  ];

  departmentData = [
    { label: 'Engineering', value: 7, pct: 100, color: '#ff7900' },
    { label: 'Data & AI', value: 4, pct: 57, color: '#3b82f6' },
    { label: 'Product Design', value: 3, pct: 43, color: '#8b5cf6' },
    { label: 'Mobile Apps', value: 2, pct: 29, color: '#10b981' },
    { label: 'Infrastructure', value: 2, pct: 29, color: '#f59e0b' }
  ];

  statusData = [
    { label: 'Accepted', value: 10, color: '#10b981' },
    { label: 'Pending', value: 8, color: '#f59e0b' },
    { label: 'Interview', value: 8, color: '#3b82f6' },
    { label: 'Review', value: 6, color: '#8b5cf6' },
    { label: 'Rejected', value: 6, color: '#ef4444' },
    { label: 'Draft', value: 4, color: '#9ca3af' }
  ];

  monthlyData = [
    { month: 'Sep', offers: 8, applications: 15, hired: 3 },
    { month: 'Oct', offers: 12, applications: 22, hired: 5 },
    { month: 'Nov', offers: 10, applications: 30, hired: 7 },
    { month: 'Dec', offers: 6, applications: 18, hired: 4 },
    { month: 'Jan', offers: 15, applications: 35, hired: 8 },
    { month: 'Feb', offers: 18, applications: 42, hired: 10 }
  ];

  quickStats = [
    { metric: 'New Offers Published', current: '6', previous: '4', change: '+50%', positive: true },
    { metric: 'Applications Received', current: '42', previous: '31', change: '+35%', positive: true },
    { metric: 'Interviews Scheduled', current: '12', previous: '9', change: '+33%', positive: true },
    { metric: 'Candidates Hired', current: '10', previous: '7', change: '+43%', positive: true },
    { metric: 'Avg Review Duration', current: '3.2 days', previous: '4.1 days', change: '-22%', positive: true },
    { metric: 'Offer Rejection Rate', current: '12%', previous: '8%', change: '+4%', positive: false }
  ];
}
