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
      <!-- Profile Header Card -->
      <div class="profile-hero" *ngIf="user">
        <div class="hero-accent"></div>
        <div class="hero-body">
          <div class="avatar">
            <span class="avatar-text">{{ getInitials() }}</span>
          </div>
          <div class="hero-info">
            <h1 class="hero-name">{{ user.firstName }} {{ user.lastName }}</h1>
            <p class="hero-email">{{ user.email }}</p>
            <div class="hero-badges">
              <span class="role-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>
                Student
              </span>
              <span class="status-badge" [ngClass]="user.isActive ? 'badge-active' : 'badge-inactive'">
                <span class="badge-dot"></span>
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
              <span class="verified-badge" *ngIf="user.isEmailVerified">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="content-grid" *ngIf="user">
        <!-- Personal Information -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Personal Information
            </h2>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">First Name</label>
              <div class="form-display">{{ user.firstName }}</div>
            </div>
            <div class="form-group">
              <label class="form-label">Last Name</label>
              <div class="form-display">{{ user.lastName }}</div>
            </div>
            <div class="form-group full-width">
              <label class="form-label">Email Address</label>
              <div class="form-display">
                <span>{{ user.email }}</span>
                <span class="verified-icon" *ngIf="user.isEmailVerified">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Details -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Account Details
            </h2>
          </div>
          <div class="details-list">
            <div class="detail-row">
              <span class="detail-label">Account ID</span>
              <span class="detail-value mono">{{ user.id | slice:0:8 }}...</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Role</span>
              <span class="detail-value">
                <span class="role-tag">{{ user.role }}</span>
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Account Status</span>
              <span class="detail-value">
                <span class="status-dot" [ngClass]="user.isActive ? 'dot-active' : 'dot-inactive'"></span>
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email Verification</span>
              <span class="detail-value" [style.color]="user.isEmailVerified ? '#059669' : '#d97706'">
                {{ user.isEmailVerified ? 'Verified' : 'Not Verified' }}
              </span>
            </div>
            <div class="detail-row" *ngIf="user.lastLogin">
              <span class="detail-label">Last Login</span>
              <span class="detail-value">{{ user.lastLogin | date:'medium' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Member Since</span>
              <span class="detail-value">{{ user.createdAt | date:'mediumDate' }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Quick Actions
            </h2>
          </div>
          <div class="actions-grid">
            <button class="action-card">
              <div class="action-icon" style="background: #fff7ed;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <div class="action-info">
                <span class="action-title">Browse Offers</span>
                <span class="action-desc">Find internship opportunities</span>
              </div>
              <svg class="action-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <button class="action-card">
              <div class="action-icon" style="background: #eff6ff;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div class="action-info">
                <span class="action-title">My Applications</span>
                <span class="action-desc">Track your submissions</span>
              </div>
              <svg class="action-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <button class="action-card">
              <div class="action-icon" style="background: #fef2f2;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div class="action-info">
                <span class="action-title">Change Password</span>
                <span class="action-desc">Update your credentials</span>
              </div>
              <svg class="action-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- No User State -->
      <div class="no-user" *ngIf="!user">
        <div class="no-user-card">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <h3>Unable to load profile</h3>
          <p>Please sign in to view your profile information.</p>
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
    .profile-hero {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      margin-bottom: 24px;
    }

    .hero-accent {
      height: 80px;
      background: linear-gradient(135deg, #ff7900 0%, #ffad5c 50%, #fff7ed 100%);
    }

    .hero-body {
      display: flex;
      align-items: flex-end;
      gap: 24px;
      padding: 0 32px 28px;
      margin-top: -40px;
    }

    .avatar {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: #ff7900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 4px solid #fff;
      box-shadow: 0 2px 12px rgba(255, 121, 0, 0.25);
    }

    .avatar-text {
      font-size: 1.75rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 1px;
    }

    .hero-info {
      padding-top: 44px;
    }

    .hero-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
      letter-spacing: -0.02em;
    }

    .hero-email {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0 0 12px 0;
    }

    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .role-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      background: #fff7ed;
      color: #c2410c;
      border: 1px solid #ffedd5;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .badge-active {
      background: #ecfdf5;
      color: #065f46;
    }

    .badge-active .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      display: inline-block;
    }

    .badge-inactive {
      background: #f3f4f6;
      color: #6b7280;
    }

    .badge-inactive .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #9ca3af;
      display: inline-block;
    }

    .verified-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #d1fae5;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    /* Content Grid */
    .content-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Section Cards */
    .section-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    .section-header {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f1f3;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.063rem;
      font-weight: 650;
      color: #111827;
      margin: 0;
    }

    /* Form Grid */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-label {
      display: block;
      font-size: 0.788rem;
      font-weight: 550;
      color: #9ca3af;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .form-display {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: #f9fafb;
      border: 1px solid #f0f1f3;
      border-radius: 12px;
      font-size: 0.9rem;
      color: #111827;
      font-weight: 500;
    }

    .verified-icon {
      display: flex;
      align-items: center;
    }

    /* Details List */
    .details-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid #f9fafb;
    }

    .detail-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .detail-row:first-child {
      padding-top: 0;
    }

    .detail-label {
      font-size: 0.85rem;
      color: #9ca3af;
      font-weight: 450;
    }

    .detail-value {
      font-size: 0.875rem;
      color: #111827;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .detail-value.mono {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.813rem;
      color: #6b7280;
    }

    .role-tag {
      padding: 3px 10px;
      background: #fff7ed;
      color: #c2410c;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      display: inline-block;
    }

    .dot-active {
      background: #10b981;
    }

    .dot-inactive {
      background: #9ca3af;
    }

    /* Actions Grid */
    .actions-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .action-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 12px;
      cursor: pointer;
      transition: border-color 0.15s, box-shadow 0.15s;
      text-align: left;
      font-family: 'Inter', sans-serif;
      width: 100%;
    }

    .action-card:hover {
      border-color: #e5e7eb;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .action-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .action-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .action-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #111827;
    }

    .action-desc {
      font-size: 0.75rem;
      color: #9ca3af;
      font-weight: 400;
    }

    .action-arrow {
      flex-shrink: 0;
      transition: transform 0.15s;
    }

    .action-card:hover .action-arrow {
      transform: translateX(2px);
    }

    /* No User */
    .no-user {
      display: flex;
      justify-content: center;
      padding-top: 60px;
    }

    .no-user-card {
      text-align: center;
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 56px 48px;
      max-width: 400px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    .no-user-card h3 {
      font-size: 1.125rem;
      font-weight: 650;
      color: #374151;
      margin: 16px 0 8px;
    }

    .no-user-card p {
      font-size: 0.875rem;
      color: #9ca3af;
      margin: 0;
    }

    @media (max-width: 768px) {
      .page {
        padding: 20px 16px;
      }

      .hero-body {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0 20px 24px;
      }

      .hero-info {
        padding-top: 12px;
      }

      .hero-badges {
        justify-content: center;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .section-card {
        padding: 20px;
      }

      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);

  user: User | null = null;

  ngOnInit(): void {
    this.user = this.authService.currentUser;

    // Also subscribe to user changes
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  /**
   * Get user initials for avatar
   */
  getInitials(): string {
    if (!this.user) return '?';
    const first = this.user.firstName?.charAt(0) || '';
    const last = this.user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase();
  }
}
