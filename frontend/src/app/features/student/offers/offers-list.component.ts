import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { OffersService, Offer } from '@core/services/offers.service';

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, EmptyStateComponent],
  template: `
    <div class="page">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Available Offers</h1>
          <p class="page-subtitle">Browse and apply to internship opportunities</p>
        </div>
        <div class="header-stats" *ngIf="!loading && offers.length > 0">
          <div class="stat-pill">
            <span class="stat-number">{{ offers.length }}</span>
            <span class="stat-label">Open positions</span>
          </div>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="filters-bar">
        <div class="search-wrapper">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            class="search-input"
            placeholder="Search offers by title, department..."
            [(ngModel)]="searchTerm"
            (input)="filterOffers()"
          />
        </div>
      </div>

      <!-- Loading -->
      <app-loading-spinner *ngIf="loading" message="Loading offers..."></app-loading-spinner>

      <!-- Error State -->
      <div class="error-banner" *ngIf="error">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <span>{{ error }}</span>
        <button class="retry-btn" (click)="loadOffers()">Retry</button>
      </div>

      <!-- Offers Grid -->
      <div class="offers-grid" *ngIf="!loading && filteredOffers.length > 0">
        <div class="offer-card" *ngFor="let offer of filteredOffers; let i = index" (click)="viewOffer(offer.id)">
          <!-- Card accent bar -->
          <div class="card-accent"></div>

          <div class="card-content">
            <div class="card-top">
              <span class="status-badge" [ngClass]="{
                'badge-open': offer.status === 'PUBLISHED' || offer.status === 'APPROVED',
                'badge-closed': offer.status === 'CLOSED' || offer.status === 'DRAFT'
              }">
                <span class="badge-dot"></span>
                {{ offer.status === 'PUBLISHED' ? 'Open' : offer.status }}
              </span>
              <span class="positions-tag" *ngIf="offer.numberOfPositions">
                {{ offer.numberOfPositions }} {{ offer.numberOfPositions === 1 ? 'position' : 'positions' }}
              </span>
            </div>

            <h3 class="card-title">{{ offer.title }}</h3>

            <p class="card-description">{{ offer.description | slice:0:120 }}{{ offer.description && offer.description.length > 120 ? '...' : '' }}</p>

            <div class="card-meta">
              <div class="meta-item" *ngIf="offer.department">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>{{ offer.department }}</span>
              </div>
              <div class="meta-item" *ngIf="offer.duration">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{{ offer.duration }} months</span>
              </div>
              <div class="meta-item" *ngIf="offer.applicationDeadline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Due {{ offer.applicationDeadline | date:'mediumDate' }}</span>
              </div>
            </div>

            <!-- Skills preview -->
            <div class="skills-row" *ngIf="offer.requiredSkills && offer.requiredSkills.length > 0">
              <span class="skill-chip" *ngFor="let skill of offer.requiredSkills | slice:0:3">{{ skill }}</span>
              <span class="skill-more" *ngIf="offer.requiredSkills.length > 3">+{{ offer.requiredSkills.length - 3 }}</span>
            </div>
          </div>

          <div class="card-footer">
            <span class="view-link">View details
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <app-empty-state
        *ngIf="!loading && filteredOffers.length === 0 && !error"
        title="No offers available"
        message="There are currently no internship offers available. Please check back later."
      ></app-empty-state>
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
      margin-bottom: 28px;
    }

    .page-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 6px 0;
      letter-spacing: -0.025em;
    }

    .page-subtitle {
      font-size: 0.938rem;
      color: #6b7280;
      margin: 0;
      font-weight: 400;
    }

    .header-stats {
      flex-shrink: 0;
    }

    .stat-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fff7ed;
      border: 1px solid #ffedd5;
      border-radius: 100px;
      padding: 8px 18px;
    }

    .stat-number {
      font-size: 1.125rem;
      font-weight: 700;
      color: #ff7900;
    }

    .stat-label {
      font-size: 0.813rem;
      color: #9a6b3c;
      font-weight: 500;
    }

    /* Filters */
    .filters-bar {
      margin-bottom: 28px;
    }

    .search-wrapper {
      position: relative;
      max-width: 420px;
    }

    .search-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 12px 16px 12px 44px;
      border: 1px solid #f0f1f3;
      border-radius: 12px;
      font-size: 0.875rem;
      font-family: 'Inter', sans-serif;
      color: #111827;
      background: #fff;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .search-input::placeholder {
      color: #9ca3af;
    }

    .search-input:focus {
      border-color: #ff7900;
      box-shadow: 0 0 0 3px rgba(255, 121, 0, 0.08);
    }

    /* Error banner */
    .error-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 12px;
      margin-bottom: 24px;
      font-size: 0.875rem;
      color: #991b1b;
    }

    .retry-btn {
      margin-left: auto;
      background: none;
      border: 1px solid #fca5a5;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 0.813rem;
      color: #dc2626;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.15s;
    }

    .retry-btn:hover {
      background: #fee2e2;
    }

    /* Grid */
    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 20px;
    }

    /* Card */
    .offer-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      cursor: pointer;
      transition: box-shadow 0.2s, transform 0.2s;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .offer-card:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
      transform: translateY(-2px);
    }

    .card-accent {
      height: 3px;
      background: linear-gradient(90deg, #ff7900, #ffad5c);
    }

    .card-content {
      padding: 22px 24px 16px;
      flex: 1;
    }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
    }

    .badge-open {
      background: #ecfdf5;
      color: #065f46;
    }

    .badge-open .badge-dot {
      background: #10b981;
    }

    .badge-closed {
      background: #f3f4f6;
      color: #6b7280;
    }

    .badge-closed .badge-dot {
      background: #9ca3af;
    }

    .positions-tag {
      font-size: 0.75rem;
      font-weight: 500;
      color: #6b7280;
      background: #f9fafb;
      padding: 4px 10px;
      border-radius: 6px;
    }

    .card-title {
      font-size: 1.063rem;
      font-weight: 650;
      color: #111827;
      margin: 0 0 10px 0;
      line-height: 1.4;
    }

    .card-description {
      font-size: 0.85rem;
      color: #6b7280;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }

    .card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 14px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.788rem;
      color: #9ca3af;
      font-weight: 450;
    }

    .skills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 2px;
    }

    .skill-chip {
      padding: 3px 10px;
      background: #fff7ed;
      color: #c2410c;
      border-radius: 6px;
      font-size: 0.725rem;
      font-weight: 550;
    }

    .skill-more {
      padding: 3px 8px;
      color: #9ca3af;
      font-size: 0.725rem;
      font-weight: 500;
    }

    .card-footer {
      padding: 14px 24px;
      border-top: 1px solid #f5f5f5;
    }

    .view-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.813rem;
      font-weight: 600;
      color: #ff7900;
      transition: gap 0.2s;
    }

    .offer-card:hover .view-link {
      gap: 10px;
    }

    @media (max-width: 768px) {
      .page {
        padding: 20px 16px;
      }

      .page-header {
        flex-direction: column;
        gap: 16px;
      }

      .offers-grid {
        grid-template-columns: 1fr;
      }

      .search-wrapper {
        max-width: 100%;
      }
    }
  `]
})
export class OffersListComponent implements OnInit {
  private readonly offersService = inject(OffersService);
  private readonly router = inject(Router);

  loading = false;
  offers: Offer[] = [];
  filteredOffers: Offer[] = [];
  searchTerm = '';
  error: string | null = null;

  ngOnInit(): void {
    this.loadOffers();
  }

  /**
   * Load published offers from API
   */
  loadOffers(): void {
    this.loading = true;
    this.error = null;

    this.offersService.getPublishedOffers().subscribe({
      next: (offers) => {
        this.offers = offers;
        this.filteredOffers = offers;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading offers:', err);
        this.error = 'Failed to load offers. Please try again later.';
        this.loading = false;
      }
    });
  }

  /**
   * Filter offers by search term
   */
  filterOffers(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredOffers = this.offers;
      return;
    }
    this.filteredOffers = this.offers.filter(o =>
      o.title?.toLowerCase().includes(term) ||
      o.department?.toLowerCase().includes(term) ||
      o.description?.toLowerCase().includes(term)
    );
  }

  /**
   * Navigate to offer detail page
   */
  viewOffer(offerId: string): void {
    this.router.navigate(['/student/offers', offerId]);
  }
}
