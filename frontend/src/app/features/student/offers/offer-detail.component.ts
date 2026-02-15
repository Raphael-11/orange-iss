import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { OffersService, Offer } from '@core/services/offers.service';

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <div class="page">
      <app-loading-spinner *ngIf="loading" message="Loading offer details..."></app-loading-spinner>

      <div *ngIf="!loading && offer" class="offer-detail">
        <!-- Back navigation -->
        <button class="back-btn" (click)="goBack()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to offers
        </button>

        <!-- Hero Header Card -->
        <div class="hero-card">
          <div class="hero-accent"></div>
          <div class="hero-body">
            <div class="hero-top">
              <span class="status-badge" [ngClass]="{
                'badge-open': offer.status === 'PUBLISHED',
                'badge-closed': offer.status === 'CLOSED' || offer.status === 'DRAFT'
              }">
                <span class="badge-dot"></span>
                {{ offer.status === 'PUBLISHED' ? 'Open' : offer.status }}
              </span>
              <span class="deadline-tag" *ngIf="offer.applicationDeadline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Deadline: {{ offer.applicationDeadline | date:'mediumDate' }}
              </span>
            </div>
            <h1 class="hero-title">{{ offer.title }}</h1>
            <div class="hero-meta">
              <div class="meta-chip" *ngIf="offer.department">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                {{ offer.department }}
              </div>
              <div class="meta-chip" *ngIf="offer.duration">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ offer.duration }} months
              </div>
              <div class="meta-chip" *ngIf="offer.numberOfPositions">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                {{ offer.numberOfPositions }} {{ offer.numberOfPositions === 1 ? 'position' : 'positions' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Content Grid -->
        <div class="content-grid">
          <!-- Main Column -->
          <div class="main-col">
            <!-- Description -->
            <div class="section-card">
              <h2 class="section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                Description
              </h2>
              <p class="section-text">{{ offer.description }}</p>
            </div>

            <!-- Requirements -->
            <div class="section-card" *ngIf="offer.requirements">
              <h2 class="section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Requirements
              </h2>
              <p class="section-text">{{ offer.requirements }}</p>
            </div>

            <!-- Required Skills -->
            <div class="section-card" *ngIf="offer.requiredSkills && offer.requiredSkills.length > 0">
              <h2 class="section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Required Skills
              </h2>
              <div class="skills-grid">
                <span class="skill-tag" *ngFor="let skill of offer.requiredSkills">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="side-col">
            <!-- Info Card -->
            <div class="info-card">
              <h3 class="info-card-title">Offer Details</h3>
              <div class="info-rows">
                <div class="info-row" *ngIf="offer.department">
                  <span class="info-label">Department</span>
                  <span class="info-value">{{ offer.department }}</span>
                </div>
                <div class="info-row" *ngIf="offer.duration">
                  <span class="info-label">Duration</span>
                  <span class="info-value">{{ offer.duration }} months</span>
                </div>
                <div class="info-row" *ngIf="offer.numberOfPositions">
                  <span class="info-label">Positions</span>
                  <span class="info-value">{{ offer.numberOfPositions }}</span>
                </div>
                <div class="info-row" *ngIf="offer.startDate">
                  <span class="info-label">Start Date</span>
                  <span class="info-value">{{ offer.startDate | date:'mediumDate' }}</span>
                </div>
                <div class="info-row" *ngIf="offer.endDate">
                  <span class="info-label">End Date</span>
                  <span class="info-value">{{ offer.endDate | date:'mediumDate' }}</span>
                </div>
                <div class="info-row" *ngIf="offer.applicationDeadline">
                  <span class="info-label">Deadline</span>
                  <span class="info-value deadline">{{ offer.applicationDeadline | date:'mediumDate' }}</span>
                </div>
              </div>
            </div>

            <!-- Apply CTA -->
            <div class="cta-card">
              <h3 class="cta-title">Interested in this position?</h3>
              <p class="cta-text">Submit your application now and take the next step in your career.</p>
              <button class="apply-btn" (click)="applyToOffer()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Apply Now
              </button>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="error-banner">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          {{ error }}
        </div>
      </div>

      <!-- Not Found -->
      <div *ngIf="!loading && !offer && !error" class="not-found">
        <div class="not-found-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
        <h2 class="not-found-title">Offer Not Found</h2>
        <p class="not-found-text">The offer you are looking for does not exist or has been removed.</p>
        <button class="back-link-btn" (click)="goBack()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Offers
        </button>
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    /* Back Button */
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      padding: 6px 2px;
      margin-bottom: 20px;
      font-family: 'Inter', sans-serif;
      transition: color 0.15s;
    }

    .back-btn:hover {
      color: #ff7900;
    }

    /* Hero Card */
    .hero-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      margin-bottom: 24px;
    }

    .hero-accent {
      height: 4px;
      background: linear-gradient(90deg, #ff7900, #ffad5c);
    }

    .hero-body {
      padding: 28px 32px;
    }

    .hero-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 0.775rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .badge-dot {
      width: 7px;
      height: 7px;
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

    .deadline-tag {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.788rem;
      color: #9ca3af;
      font-weight: 450;
    }

    .hero-title {
      font-size: 1.625rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 16px 0;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }

    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .meta-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: #f9fafb;
      border: 1px solid #f0f1f3;
      border-radius: 8px;
      font-size: 0.813rem;
      color: #374151;
      font-weight: 500;
    }

    /* Content Grid */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 24px;
      align-items: start;
    }

    /* Section Cards */
    .section-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      margin-bottom: 20px;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.063rem;
      font-weight: 650;
      color: #111827;
      margin: 0 0 16px 0;
    }

    .section-text {
      font-size: 0.9rem;
      color: #4b5563;
      line-height: 1.7;
      margin: 0;
      white-space: pre-line;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      padding: 7px 16px;
      background: #fff7ed;
      color: #c2410c;
      border: 1px solid #ffedd5;
      border-radius: 100px;
      font-size: 0.813rem;
      font-weight: 550;
    }

    /* Sidebar */
    .info-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      margin-bottom: 20px;
    }

    .info-card-title {
      font-size: 0.938rem;
      font-weight: 650;
      color: #111827;
      margin: 0 0 18px 0;
      padding-bottom: 14px;
      border-bottom: 1px solid #f0f1f3;
    }

    .info-rows {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .info-label {
      font-size: 0.825rem;
      color: #9ca3af;
      font-weight: 450;
    }

    .info-value {
      font-size: 0.875rem;
      color: #111827;
      font-weight: 600;
    }

    .info-value.deadline {
      color: #ea580c;
    }

    /* CTA Card */
    .cta-card {
      background: linear-gradient(135deg, #fff7ed 0%, #ffffff 100%);
      border: 1px solid #ffedd5;
      border-radius: 16px;
      padding: 28px 24px;
      text-align: center;
    }

    .cta-title {
      font-size: 1rem;
      font-weight: 650;
      color: #111827;
      margin: 0 0 8px 0;
    }

    .cta-text {
      font-size: 0.825rem;
      color: #6b7280;
      line-height: 1.5;
      margin: 0 0 20px 0;
    }

    .apply-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 13px 24px;
      background: #ff7900;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 0.938rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }

    .apply-btn:hover {
      background: #e06800;
    }

    .apply-btn:active {
      transform: scale(0.98);
    }

    /* Error Banner */
    .error-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 12px;
      margin-top: 20px;
      font-size: 0.875rem;
      color: #991b1b;
    }

    /* Not Found */
    .not-found {
      text-align: center;
      padding: 80px 24px;
    }

    .not-found-icon {
      margin-bottom: 20px;
    }

    .not-found-title {
      font-size: 1.25rem;
      font-weight: 650;
      color: #374151;
      margin: 0 0 8px 0;
    }

    .not-found-text {
      font-size: 0.9rem;
      color: #9ca3af;
      margin: 0 0 28px 0;
    }

    .back-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 22px;
      border: 1px solid #f0f1f3;
      border-radius: 10px;
      background: #fff;
      color: #ff7900;
      font-size: 0.875rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .back-link-btn:hover {
      border-color: #ff7900;
      box-shadow: 0 0 0 3px rgba(255, 121, 0, 0.08);
    }

    @media (max-width: 900px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .hero-body {
        padding: 24px 20px;
      }

      .page {
        padding: 20px 16px;
      }
    }
  `]
})
export class OfferDetailComponent implements OnInit {
  private readonly offersService = inject(OffersService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  loading = false;
  offer: Offer | null = null;
  error: string | null = null;

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId) {
      this.loadOffer(offerId);
    }
  }

  /**
   * Load offer details from API
   */
  loadOffer(id: string): void {
    this.loading = true;
    this.error = null;

    this.offersService.getOfferById(id).subscribe({
      next: (offer) => {
        this.offer = offer;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading offer:', err);
        this.error = 'Failed to load offer details.';
        this.loading = false;
      }
    });
  }

  /**
   * Navigate back to offers list
   */
  goBack(): void {
    this.router.navigate(['/student/offers']);
  }

  /**
   * Apply to this offer
   * TODO: Implement application submission
   */
  applyToOffer(): void {
    console.log('Applying to offer:', this.offer?.id);
    // Will be implemented with Applications module
    alert('Application feature coming soon!');
  }
}
