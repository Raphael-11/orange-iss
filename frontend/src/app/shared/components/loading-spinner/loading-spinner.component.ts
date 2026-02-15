import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [class.overlay]="overlay">
      <div class="spinner-wrap">
        <div class="spinner"></div>
        <div class="spinner-inner"></div>
      </div>
      <p *ngIf="message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .spinner-container { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; gap: 1.25rem; }
    .spinner-container.overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; }
    .spinner-wrap { position: relative; width: 48px; height: 48px; }
    .spinner { position: absolute; inset: 0; border: 3px solid #f0f1f3; border-top-color: #ff7900; border-radius: 50%; animation: spin 0.7s linear infinite; }
    .spinner-inner { position: absolute; inset: 8px; border: 3px solid #f0f1f3; border-bottom-color: #ff9a40; border-radius: 50%; animation: spin 1.1s linear infinite reverse; }
    @keyframes spin { to { transform: rotate(360deg); } }
    p { color: #6b7280; font-size: 0.875rem; font-weight: 500; margin: 0; }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message = '';
  @Input() overlay = false;
}
