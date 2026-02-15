import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { OffersService, Offer, OfferStatus } from '@core/services/offers.service';

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <div class="page">
      <!-- Back Button -->
      <button class="btn-back" (click)="goBack()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Offers
      </button>

      <app-loading-spinner *ngIf="loading" message="Loading offer details..."></app-loading-spinner>

      <div *ngIf="!loading && offer" class="detail-layout">
        <!-- Header Card -->
        <div class="detail-card header-card">
          <div class="header-top">
            <div>
              <h1>{{ offer.title }}</h1>
              <p class="header-dept">{{ offer.department }}</p>
            </div>
            <span class="status-pill" [class]="'status-' + offer.status.toLowerCase()">
              {{ getStatusLabel(offer.status) }}
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="header-actions">
            <button class="btn btn-outline" (click)="editOffer()" *ngIf="canEdit(offer.status)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button class="btn btn-primary" (click)="submitOffer()" *ngIf="offer.status === 'DRAFT'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Submit for Approval
            </button>
            <button class="btn btn-danger-outline" (click)="deleteOffer()" *ngIf="canDelete(offer.status)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Delete
            </button>
          </div>
        </div>

        <!-- Rejection Warning -->
        <div *ngIf="offer.rejectionReason" class="rejection-card">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div>
            <strong>Rejection Reason</strong>
            <p>{{ offer.rejectionReason }}</p>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="info-grid">
          <div class="info-card">
            <span class="info-label">Department</span>
            <span class="info-value">{{ offer.department }}</span>
          </div>
          <div class="info-card">
            <span class="info-label">Duration</span>
            <span class="info-value">{{ offer.duration }} months</span>
          </div>
          <div class="info-card">
            <span class="info-label">Positions</span>
            <span class="info-value">{{ offer.numberOfPositions }}</span>
          </div>
          <div class="info-card">
            <span class="info-label">Start Date</span>
            <span class="info-value">{{ offer.startDate ? (offer.startDate | date: 'mediumDate') : 'Not set' }}</span>
          </div>
          <div class="info-card">
            <span class="info-label">End Date</span>
            <span class="info-value">{{ offer.endDate ? (offer.endDate | date: 'mediumDate') : 'Not set' }}</span>
          </div>
          <div class="info-card">
            <span class="info-label">Deadline</span>
            <span class="info-value">{{ offer.applicationDeadline ? (offer.applicationDeadline | date: 'mediumDate') : 'Not set' }}</span>
          </div>
        </div>

        <!-- Description -->
        <div class="detail-card">
          <h2>Description</h2>
          <p class="body-text">{{ offer.description }}</p>
        </div>

        <!-- Requirements -->
        <div class="detail-card" *ngIf="offer.requirements">
          <h2>Requirements</h2>
          <p class="body-text">{{ offer.requirements }}</p>
        </div>

        <!-- Required Skills -->
        <div class="detail-card" *ngIf="offer.requiredSkills && offer.requiredSkills.length > 0">
          <h2>Required Skills</h2>
          <div class="skills-list">
            <span class="skill-tag" *ngFor="let skill of offer.requiredSkills">{{ skill }}</span>
          </div>
        </div>

        <!-- Meta -->
        <div class="detail-card meta-card">
          <div class="meta-row">
            <span class="meta-label">Created</span>
            <span class="meta-value">{{ offer.createdAt | date: 'medium' }}</span>
          </div>
          <div class="meta-row" *ngIf="offer.approvedAt">
            <span class="meta-label">Approved</span>
            <span class="meta-value">{{ offer.approvedAt | date: 'medium' }}</span>
          </div>
          <div class="meta-row" *ngIf="offer.createdBy">
            <span class="meta-label">Created By</span>
            <span class="meta-value">{{ offer.createdBy.firstName }} {{ offer.createdBy.lastName }}</span>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div *ngIf="errorMessage" class="alert-error">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      padding: 6px 0;
      margin-bottom: 20px;
      transition: color 0.15s;
    }

    .btn-back:hover { color: #ff7900; }

    .detail-layout {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .detail-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .detail-card h2 {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 12px 0;
    }

    .body-text {
      color: #6b7280;
      font-size: 0.938rem;
      line-height: 1.7;
      margin: 0;
      white-space: pre-line;
    }

    /* Header Card */
    .header-card { padding: 28px; }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 20px;
    }

    .header-top h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
    }

    .header-dept {
      color: #6b7280;
      font-size: 0.938rem;
      margin: 0;
    }

    .status-pill {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .status-draft { background: #f3f4f6; color: #6b7280; }
    .status-pending_approval { background: #fef3c7; color: #92400e; }
    .status-approved { background: #d1fae5; color: #065f46; }
    .status-published { background: #dbeafe; color: #1e40af; }
    .status-closed { background: #e5e7eb; color: #4b5563; }
    .status-cancelled { background: #fee2e2; color: #991b1b; }

    .header-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 9px 18px;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      border: none;
    }

    .btn-outline {
      background: #fff;
      border: 1px solid #e5e7eb;
      color: #374151;
    }

    .btn-outline:hover {
      background: #f9fafb;
      border-color: #d1d5db;
    }

    .btn-primary {
      background: #ff7900;
      color: #fff;
    }

    .btn-primary:hover { background: #e06800; }

    .btn-danger-outline {
      background: #fff;
      border: 1px solid #fecaca;
      color: #dc2626;
    }

    .btn-danger-outline:hover {
      background: #fef2f2;
      border-color: #fca5a5;
    }

    /* Rejection Card */
    .rejection-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 14px;
      padding: 16px 20px;
      color: #9a3412;
    }

    .rejection-card svg {
      flex-shrink: 0;
      margin-top: 2px;
      color: #ea580c;
    }

    .rejection-card strong {
      display: block;
      margin-bottom: 4px;
      font-size: 0.875rem;
    }

    .rejection-card p {
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    /* Info Grid */
    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .info-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 14px;
      padding: 18px 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .info-label {
      display: block;
      font-size: 0.75rem;
      color: #9ca3af;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 6px;
    }

    .info-value {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
    }

    /* Skills */
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      background: #fff7ed;
      color: #e06800;
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 0.813rem;
      font-weight: 600;
      border: 1px solid #fed7aa;
    }

    /* Meta */
    .meta-card { padding: 18px 24px; }

    .meta-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }

    .meta-row + .meta-row { border-top: 1px solid #f5f6f8; }

    .meta-label { color: #9ca3af; font-size: 0.875rem; }
    .meta-value { color: #6b7280; font-size: 0.875rem; font-weight: 500; }

    /* Alert */
    .alert-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 12px;
      padding: 14px 18px;
      margin-top: 20px;
      color: #991b1b;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .page { padding: 20px 16px; }
      .info-grid { grid-template-columns: repeat(2, 1fr); }
      .header-top { flex-direction: column; }
    }

    @media (max-width: 480px) {
      .info-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class OfferDetailComponent implements OnInit {
  private readonly offersService = inject(OffersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  offer: Offer | null = null;
  loading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOffer(id);
    }
  }

  loadOffer(id: string): void {
    this.loading = true;
    this.offersService.getOfferById(id).subscribe({
      next: (offer) => {
        this.offer = offer;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading offer:', err);
        this.errorMessage = 'Failed to load offer details.';
        this.loading = false;
      }
    });
  }

  editOffer(): void {
    if (this.offer) {
      this.router.navigate(['/chief/offers/edit', this.offer.id]);
    }
  }

  submitOffer(): void {
    if (!this.offer || !confirm('Submit this offer for approval?')) return;

    this.offersService.submitForApproval(this.offer.id).subscribe({
      next: (updated) => {
        this.offer = updated;
      },
      error: (err) => {
        console.error('Error submitting offer:', err);
        this.errorMessage = 'Failed to submit offer for approval.';
      }
    });
  }

  deleteOffer(): void {
    if (!this.offer || !confirm('Delete this offer? This cannot be undone.')) return;

    this.offersService.deleteOffer(this.offer.id).subscribe({
      next: () => {
        this.router.navigate(['/chief/offers']);
      },
      error: (err) => {
        console.error('Error deleting offer:', err);
        this.errorMessage = 'Failed to delete offer.';
      }
    });
  }

  canEdit(status: OfferStatus): boolean {
    return status === OfferStatus.DRAFT || status === OfferStatus.APPROVED;
  }

  canDelete(status: OfferStatus): boolean {
    return status === OfferStatus.DRAFT;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'DRAFT': 'Draft',
      'PENDING_APPROVAL': 'Pending Approval',
      'APPROVED': 'Approved',
      'PUBLISHED': 'Published',
      'CLOSED': 'Closed',
      'CANCELLED': 'Cancelled'
    };
    return labels[status] || status;
  }

  goBack(): void {
    this.router.navigate(['/chief/offers']);
  }
}
