import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { OffersService, Offer, OfferStatus } from '@core/services/offers.service';

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, EmptyStateComponent],
  template: `
    <div class="page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-left">
          <h1>My Offers</h1>
          <p class="subtitle">Manage your internship offers and track their status</p>
        </div>
        <button class="btn-create" routerLink="/chief/offers/create">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create New Offer
        </button>
      </div>

      <!-- Stat Pills -->
      <div class="stat-pills" *ngIf="!loading && offers.length > 0">
        <div class="stat-pill">
          <span class="stat-value">{{ offers.length }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat-pill">
          <span class="stat-value stat-draft">{{ draftCount }}</span>
          <span class="stat-label">Draft</span>
        </div>
        <div class="stat-pill">
          <span class="stat-value stat-published">{{ publishedCount }}</span>
          <span class="stat-label">Published</span>
        </div>
        <div class="stat-pill">
          <span class="stat-value stat-pending">{{ pendingCount }}</span>
          <span class="stat-label">Pending</span>
        </div>
      </div>

      <app-loading-spinner *ngIf="loading" message="Loading offers..."></app-loading-spinner>

      <!-- Offers Table -->
      <div *ngIf="!loading && offers.length > 0" class="table-card">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let offer of offers">
                <tr>
                  <td>
                    <div class="offer-title">{{ offer.title }}</div>
                    <div class="offer-meta">{{ offer.numberOfPositions }} position(s)</div>
                  </td>
                  <td class="text-body">{{ offer.department }}</td>
                  <td class="text-body">{{ offer.duration }} months</td>
                  <td>
                    <span class="status-pill" [class]="'status-' + offer.status.toLowerCase()">
                      {{ getStatusLabel(offer.status) }}
                    </span>
                  </td>
                  <td class="text-muted">{{ offer.createdAt | date: 'mediumDate' }}</td>
                  <td>
                    <div class="actions">
                      <button class="action-btn" (click)="viewOffer(offer.id)" title="View Details">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button class="action-btn" (click)="editOffer(offer.id)" [disabled]="!canEdit(offer.status)" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button *ngIf="offer.status === 'DRAFT'" class="action-btn action-success" (click)="submitOffer(offer.id)" title="Submit for Approval">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </button>
                      <button class="action-btn action-danger" (click)="deleteOffer(offer.id)" [disabled]="!canDelete(offer.status)" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- Rejection Reason Row -->
                <tr *ngIf="offer.rejectionReason" class="rejection-row">
                  <td colspan="6">
                    <div class="rejection-card">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      <div>
                        <strong>Rejection Reason:</strong> {{ offer.rejectionReason }}
                      </div>
                    </div>
                  </td>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>
      </div>

      <app-empty-state
        *ngIf="!loading && offers.length === 0"
        title="No offers yet"
        message="You haven't created any offers. Click the button above to create your first offer."
      ></app-empty-state>

      <div *ngIf="errorMessage" class="alert-error">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .header-left h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
    }

    .subtitle {
      color: #6b7280;
      font-size: 0.938rem;
      margin: 0;
    }

    .btn-create {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #ff7900;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 0.938rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-create:hover {
      background: #e06800;
    }

    /* Stat Pills */
    .stat-pills {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .stat-pill {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 12px;
      padding: 14px 22px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .stat-value {
      font-size: 1.35rem;
      font-weight: 700;
      color: #111827;
    }

    .stat-draft { color: #6b7280; }
    .stat-published { color: #0891b2; }
    .stat-pending { color: #d97706; }

    .stat-label {
      font-size: 0.813rem;
      color: #9ca3af;
      font-weight: 500;
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

    table {
      width: 100%;
      border-collapse: collapse;
    }

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

    td {
      padding: 14px 18px;
      border-bottom: 1px solid #f5f6f8;
      vertical-align: middle;
    }

    tbody tr:hover { background: #fafbfc; }
    tbody tr:last-child td { border-bottom: none; }

    .offer-title {
      font-weight: 600;
      color: #111827;
      font-size: 0.938rem;
      margin-bottom: 2px;
    }

    .offer-meta {
      font-size: 0.813rem;
      color: #9ca3af;
    }

    .text-body { color: #6b7280; font-size: 0.875rem; }
    .text-muted { color: #9ca3af; font-size: 0.813rem; }

    /* Status Pills */
    .status-pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    .status-draft { background: #f3f4f6; color: #6b7280; }
    .status-pending_approval { background: #fef3c7; color: #92400e; }
    .status-approved { background: #d1fae5; color: #065f46; }
    .status-published { background: #dbeafe; color: #1e40af; }
    .status-closed { background: #e5e7eb; color: #4b5563; }
    .status-cancelled { background: #fee2e2; color: #991b1b; }

    /* Action Buttons */
    .actions {
      display: flex;
      gap: 6px;
    }

    .action-btn {
      width: 34px;
      height: 34px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.15s;
    }

    .action-btn:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #d1d5db;
      color: #111827;
    }

    .action-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .action-success {
      color: #059669;
      border-color: #a7f3d0;
    }

    .action-success:hover:not(:disabled) {
      background: #ecfdf5;
      border-color: #6ee7b7;
      color: #047857;
    }

    .action-danger {
      color: #dc2626;
      border-color: #fecaca;
    }

    .action-danger:hover:not(:disabled) {
      background: #fef2f2;
      border-color: #fca5a5;
      color: #b91c1c;
    }

    /* Rejection Card */
    .rejection-row td {
      padding: 0 18px 14px 18px;
      border-bottom: 1px solid #f5f6f8;
    }

    .rejection-card {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 10px;
      padding: 12px 16px;
      color: #9a3412;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .rejection-card svg {
      flex-shrink: 0;
      margin-top: 2px;
      color: #ea580c;
    }

    /* Alert */
    .alert-error {
      display: flex;
      align-items: center;
      gap: 10px;
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

      .page-header {
        flex-direction: column;
        align-items: stretch;
      }

      .btn-create { justify-content: center; }

      .table-scroll { overflow-x: scroll; }
      table { min-width: 780px; }

      .stat-pills { gap: 8px; }

      .stat-pill {
        flex: 1;
        min-width: 100px;
        padding: 10px 14px;
      }
    }
  `]
})
export class OffersListComponent implements OnInit {
  private readonly offersService = inject(OffersService);
  private readonly router = inject(Router);

  loading = false;
  offers: Offer[] = [];
  errorMessage: string | null = null;

  get draftCount(): number {
    return this.offers.filter(o => o.status === OfferStatus.DRAFT).length;
  }

  get publishedCount(): number {
    return this.offers.filter(o => o.status === OfferStatus.PUBLISHED).length;
  }

  get pendingCount(): number {
    return this.offers.filter(o => o.status === OfferStatus.PENDING_APPROVAL).length;
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  /**
   * Load all offers created by the chief
   */
  loadOffers(): void {
    this.loading = true;
    this.errorMessage = null;

    this.offersService.getAllOffers().subscribe({
      next: (offers) => {
        this.offers = offers;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading offers:', err);
        this.errorMessage = 'Failed to load offers. Please try again.';
        this.loading = false;
      }
    });
  }

  /**
   * View offer details
   */
  viewOffer(offerId: string): void {
    this.router.navigate(['/chief/offers', offerId]);
  }

  /**
   * Edit offer
   */
  editOffer(offerId: string): void {
    this.router.navigate(['/chief/offers/edit', offerId]);
  }

  /**
   * Submit offer for approval
   */
  submitOffer(offerId: string): void {
    if (!confirm('Are you sure you want to submit this offer for approval?')) {
      return;
    }

    this.offersService.submitForApproval(offerId).subscribe({
      next: () => {
        this.loadOffers();
      },
      error: (err) => {
        console.error('Error submitting offer:', err);
        this.errorMessage = 'Failed to submit offer for approval.';
      }
    });
  }

  /**
   * Delete offer
   */
  deleteOffer(offerId: string): void {
    if (!confirm('Are you sure you want to delete this offer? This action cannot be undone.')) {
      return;
    }

    this.offersService.deleteOffer(offerId).subscribe({
      next: () => {
        this.loadOffers();
      },
      error: (err) => {
        console.error('Error deleting offer:', err);
        this.errorMessage = 'Failed to delete offer.';
      }
    });
  }

  /**
   * Check if offer can be edited
   */
  canEdit(status: OfferStatus): boolean {
    return status === OfferStatus.DRAFT || status === OfferStatus.APPROVED;
  }

  /**
   * Check if offer can be deleted
   */
  canDelete(status: OfferStatus): boolean {
    return status === OfferStatus.DRAFT;
  }

  /**
   * Get human-readable status label
   */
  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'DRAFT': 'Draft',
      'PENDING_APPROVAL': 'Pending',
      'APPROVED': 'Approved',
      'PUBLISHED': 'Published',
      'CLOSED': 'Closed',
      'CANCELLED': 'Cancelled'
    };
    return labels[status] || status;
  }
}
