import { Component, OnInit } from '@angular/core';
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
          <div class="hero-avatar">
            {{ getInitials() }}
          </div>
          <div class="hero-info">
            <h1 class="hero-name">{{ user.firstName }} {{ user.lastName }}</h1>
            <p class="hero-email">{{ user.email }}</p>
            <span class="role-badge">HR Manager</span>
          </div>
        </div>
      </div>

      <div class="grid">
        <!-- Personal Information -->
        <div class="card">
          <div class="card-header-row">
            <h3 class="card-title">Personal Information</h3>
            <button class="btn-edit" (click)="toggleEdit('personal')">
              {{ editing === 'personal' ? 'Cancel' : 'Edit' }}
            </button>
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
              <span class="info-label">Phone</span>
              <span class="info-value">{{ user.phone || '+216 71 000 000' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Department</span>
              <span class="info-value">{{ user.department || 'Human Resources' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Location</span>
              <span class="info-value">Tunis, Tunisia</span>
            </div>
          </div>
        </div>

        <!-- Account Details -->
        <div class="card">
          <div class="card-header-row">
            <h3 class="card-title">Account Details</h3>
            <button class="btn-edit" (click)="toggleEdit('account')">
              {{ editing === 'account' ? 'Cancel' : 'Edit' }}
            </button>
          </div>

          <div class="info-list">
            <div class="info-row">
              <span class="info-label">Role</span>
              <span class="info-value">
                <span class="role-tag">HR Manager</span>
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">Status</span>
              <span class="info-value">
                <span class="status-dot active"></span>
                Active
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">Member Since</span>
              <span class="info-value">{{ user.createdAt || 'Sep 15, 2025' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Last Login</span>
              <span class="info-value">Feb 07, 2026 — 09:32 AM</span>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn-secondary">Change Password</button>
            <button class="btn-danger">Sign Out</button>
          </div>
        </div>
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

    /* Hero Card */
    .hero-card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
      margin-bottom: 24px;
    }

    .hero-banner {
      height: 120px;
      background: linear-gradient(135deg, #ff7900 0%, #e06800 50%, #ff9a3c 100%);
    }

    .hero-content {
      display: flex;
      align-items: flex-end;
      gap: 20px;
      padding: 0 32px 28px;
      margin-top: -40px;
    }

    .hero-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff7900, #e06800);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      border: 4px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      flex-shrink: 0;
    }

    .hero-info {
      padding-bottom: 4px;
    }

    .hero-name {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 2px;
    }

    .hero-email {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 8px;
    }

    .role-badge {
      display: inline-block;
      background: #fff7ed;
      color: #ea580c;
      padding: 4px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid #fed7aa;
    }

    /* Grid */
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .card {
      background: white;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .card-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .card-title {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .btn-edit {
      padding: 6px 16px;
      background: #f3f4f6;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-edit:hover {
      background: #e5e7eb;
    }

    .info-list {
      display: flex;
      flex-direction: column;
    }

    .info-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f0f1f3;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .info-label {
      font-size: 13px;
      color: #9ca3af;
      font-weight: 500;
    }

    .info-value {
      font-size: 14px;
      font-weight: 500;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .role-tag {
      background: #eff6ff;
      color: #2563eb;
      padding: 3px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .status-dot.active {
      background: #10b981;
    }

    .card-actions {
      display: flex;
      gap: 10px;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #f0f1f3;
    }

    .btn-secondary {
      flex: 1;
      padding: 10px;
      background: #f3f4f6;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-secondary:hover { background: #e5e7eb; }

    .btn-danger {
      flex: 1;
      padding: 10px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      color: #dc2626;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-danger:hover { background: #fee2e2; }
  `]
})
export class ProfileComponent implements OnInit {
  editing: string | null = null;

  user: any = {
    firstName: 'Salma',
    lastName: 'Mansouri',
    email: 'salma.mansouri@orange.tn',
    phone: '+216 71 123 456',
    department: 'Human Resources',
    role: 'hr',
    createdAt: 'Sep 15, 2025'
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.user = { ...this.user, ...currentUser };
    }
  }

  getInitials(): string {
    return (this.user.firstName?.[0] || 'S') + (this.user.lastName?.[0] || 'M');
  }

  toggleEdit(section: string): void {
    this.editing = this.editing === section ? null : section;
  }
}
