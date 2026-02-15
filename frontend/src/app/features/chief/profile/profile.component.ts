import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <!-- Hero Card -->
      <div class="hero-card">
        <div class="hero-banner"></div>
        <div class="hero-content">
          <div class="avatar">
            {{ user ? getInitials(user.firstName, user.lastName) : '--' }}
          </div>
          <div class="hero-info">
            <h1 *ngIf="user">{{ user.firstName }} {{ user.lastName }}</h1>
            <h1 *ngIf="!user">Loading...</h1>
            <div class="role-badge">Department Chief</div>
          </div>
        </div>
      </div>

      <div class="profile-grid" *ngIf="user">
        <!-- Personal Information -->
        <div class="profile-card">
          <div class="card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Personal Information
          </div>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">First Name</span>
              <span class="info-value">{{ user.firstName }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Last Name</span>
              <span class="info-value">{{ user.lastName }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email</span>
              <span class="info-value">{{ user.email }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Role</span>
              <span class="info-value role-text">Department Chief</span>
            </div>
          </div>
        </div>

        <!-- Account Details -->
        <div class="profile-card">
          <div class="card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Account Details
          </div>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">Account Status</span>
              <span class="info-value">
                <span class="status-dot" [class.active]="user.isActive"></span>
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">Email Verified</span>
              <span class="info-value">
                <span class="status-dot" [class.active]="user.isEmailVerified"></span>
                {{ user.isEmailVerified ? 'Verified' : 'Not Verified' }}
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">Last Login</span>
              <span class="info-value">{{ user.lastLogin ? (user.lastLogin | date: 'medium') : 'Never' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Member Since</span>
              <span class="info-value">{{ user.createdAt | date: 'mediumDate' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    /* Hero Card */
    .hero-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
      margin-bottom: 24px;
    }

    .hero-banner {
      height: 120px;
      background: linear-gradient(135deg, #ff7900, #e06800, #ff9a40);
    }

    .hero-content {
      display: flex;
      align-items: flex-end;
      gap: 20px;
      padding: 0 28px 24px 28px;
      margin-top: -40px;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      background: #fff;
      border: 4px solid #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: #ff7900;
      flex-shrink: 0;
    }

    .hero-info {
      padding-bottom: 4px;
    }

    .hero-info h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 8px 0;
    }

    .role-badge {
      display: inline-block;
      padding: 4px 14px;
      background: #fff7ed;
      color: #e06800;
      border: 1px solid #fed7aa;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    /* Profile Grid */
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .profile-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 18px 24px;
      border-bottom: 1px solid #f5f6f8;
      font-size: 0.938rem;
      font-weight: 600;
      color: #111827;
    }

    .card-header svg { color: #ff7900; }

    .info-list { padding: 8px 0; }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
    }

    .info-row + .info-row { border-top: 1px solid #f9fafb; }

    .info-label {
      font-size: 0.875rem;
      color: #9ca3af;
    }

    .info-value {
      font-size: 0.875rem;
      color: #111827;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .role-text { color: #ff7900; }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #d1d5db;
    }

    .status-dot.active { background: #059669; }

    @media (max-width: 768px) {
      .page { padding: 20px 16px; }
      .profile-grid { grid-template-columns: 1fr; }
      .hero-content { padding: 0 20px 20px 20px; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);

  user: User | null = null;

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  getInitials(firstName: string, lastName: string): string {
    return ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase();
  }
}
