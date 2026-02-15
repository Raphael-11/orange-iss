import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-supervisor-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-page">
      <!-- Hero Card -->
      <div class="hero-card">
        <div class="hero-banner"></div>
        <div class="hero-content">
          <div class="avatar">{{ getInitials() }}</div>
          <div class="hero-info">
            <h1>{{ user.firstName }} {{ user.lastName }}</h1>
            <span class="role-badge">Supervisor</span>
          </div>
        </div>
      </div>

      <div class="info-grid">
        <!-- Personal Information -->
        <div class="card">
          <h3 class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Personal Information
          </h3>
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
              <span class="info-value role-text">{{ user.role }}</span>
            </div>
          </div>
        </div>

        <!-- Account Details -->
        <div class="card">
          <h3 class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            Account Details
          </h3>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">Account Status</span>
              <span class="status-active-badge" *ngIf="user.isActive">Active</span>
              <span class="status-inactive-badge" *ngIf="!user.isActive">Inactive</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email Verified</span>
              <span class="info-value">{{ user.isEmailVerified ? 'Yes' : 'No' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Last Login</span>
              <span class="info-value">{{ user.lastLogin || 'Never' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Member Since</span>
              <span class="info-value">{{ user.createdAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page {
      padding: 32px;
      background: #f5f6f8;
      min-height: 100%;
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
      background: linear-gradient(135deg, #ff7900 0%, #e06800 50%, #ff9a40 100%);
    }

    .hero-content {
      display: flex;
      align-items: flex-end;
      gap: 20px;
      padding: 0 32px 28px;
      margin-top: -40px;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #fff;
      border: 4px solid #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      color: #ff7900;
      letter-spacing: 1px;
    }

    .hero-info {
      padding-bottom: 4px;
    }

    .hero-info h1 {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 6px;
    }

    .role-badge {
      display: inline-block;
      background: #fff7ed;
      color: #ff7900;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 14px;
      border-radius: 20px;
      border: 1px solid #fed7aa;
    }

    /* Info Cards */
    .info-grid {
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
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 20px;
    }

    .info-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid #f0f1f3;
    }

    .info-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .info-row:first-child {
      padding-top: 0;
    }

    .info-label {
      font-size: 13px;
      color: #9ca3af;
      font-weight: 500;
    }

    .info-value {
      font-size: 14px;
      color: #111827;
      font-weight: 500;
    }

    .role-text {
      color: #ff7900;
      font-weight: 600;
    }

    .status-active-badge {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      background: #ecfdf5;
      color: #059669;
    }

    .status-inactive-badge {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      background: #fff1f2;
      color: #e11d48;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 'sup-001',
    email: 'nabil.mansouri@orange.tn',
    firstName: 'Nabil',
    lastName: 'Mansouri',
    role: 'SUPERVISOR' as any,
    isActive: true,
    isEmailVerified: true,
    lastLogin: new Date('2026-02-07T09:30:00'),
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2026-02-07')
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const current = this.authService.currentUser;
    if (current) {
      this.user = current;
    }
  }

  getInitials(): string {
    return this.user.firstName.charAt(0) + this.user.lastName.charAt(0);
  }
}
