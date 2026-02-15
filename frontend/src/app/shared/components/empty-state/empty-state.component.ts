import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <div class="empty-illustration">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="56" fill="#fafbfc" stroke="#f0f1f3" stroke-width="2"/>
          <rect x="35" y="30" width="50" height="60" rx="6" fill="white" stroke="#e5e7eb" stroke-width="1.5"/>
          <rect x="43" y="42" width="34" height="4" rx="2" fill="#f0f1f3"/>
          <rect x="43" y="52" width="26" height="4" rx="2" fill="#f0f1f3"/>
          <rect x="43" y="62" width="30" height="4" rx="2" fill="#f0f1f3"/>
          <circle cx="85" cy="80" r="16" fill="#fff7ed" stroke="#ff7900" stroke-width="1.5"/>
          <path d="M80 80h10M85 75v10" stroke="#ff7900" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="empty-icon" *ngIf="icon">{{ icon }}</div>
      <h3>{{ title }}</h3>
      <p *ngIf="message">{{ message }}</p>
      <div class="empty-actions"><ng-content></ng-content></div>
    </div>
  `,
  styles: [`
    .empty-state { text-align: center; padding: 4rem 2rem; }
    .empty-illustration { margin-bottom: 1.5rem; opacity: 0.8; }
    .empty-icon { font-size: 3rem; margin-bottom: 0.75rem; }
    h3 { font-size: 1.125rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem; letter-spacing: -0.01em; }
    p { color: #6b7280; font-size: 0.9rem; line-height: 1.5; max-width: 360px; margin: 0 auto 1.5rem; }
    .empty-actions { display: flex; justify-content: center; gap: 0.75rem; }
  `]
})
export class EmptyStateComponent {
  @Input() icon = '';
  @Input() title = 'No items found';
  @Input() message = '';
}
