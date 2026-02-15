import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { OffersService, CreateOfferDto } from '@core/services/offers.service';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingSpinnerComponent],
  template: `
    <div class="page">
      <!-- Back Button -->
      <button class="btn-back" (click)="goBack()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Offers
      </button>

      <div class="page-title">
        <h1>{{ isEditMode ? 'Edit Offer' : 'Create New Offer' }}</h1>
        <p class="subtitle">{{ isEditMode ? 'Update the details of your internship offer' : 'Fill in the details to create a new internship offer' }}</p>
      </div>

      <app-loading-spinner *ngIf="loading" message="Loading..."></app-loading-spinner>

      <form *ngIf="!loading" [formGroup]="offerForm" (ngSubmit)="onSubmit()" class="form-layout">
        <!-- Section: Basic Information -->
        <div class="form-card">
          <div class="section-header">
            <div class="section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <div>
              <h2>Basic Information</h2>
              <p>Core details about the internship offer</p>
            </div>
          </div>

          <div class="field">
            <label for="title">Offer Title <span class="req">*</span></label>
            <input type="text" id="title" formControlName="title" placeholder="e.g., Software Development Internship" />
            <div class="field-error" *ngIf="offerForm.get('title')?.invalid && offerForm.get('title')?.touched">
              Title is required
            </div>
          </div>

          <div class="field">
            <label for="description">Description <span class="req">*</span></label>
            <textarea id="description" formControlName="description" rows="4" placeholder="Describe the internship opportunity..."></textarea>
            <div class="field-error" *ngIf="offerForm.get('description')?.invalid && offerForm.get('description')?.touched">
              Description is required (minimum 10 characters)
            </div>
          </div>

          <div class="field">
            <label for="requirements">Requirements</label>
            <textarea id="requirements" formControlName="requirements" rows="3" placeholder="List the requirements for this position..."></textarea>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="department">Department <span class="req">*</span></label>
              <input type="text" id="department" formControlName="department" placeholder="e.g., IT Department" />
              <div class="field-error" *ngIf="offerForm.get('department')?.invalid && offerForm.get('department')?.touched">
                Department is required
              </div>
            </div>
            <div class="field">
              <label for="numberOfPositions">Positions</label>
              <input type="number" id="numberOfPositions" formControlName="numberOfPositions" min="1" placeholder="1" />
            </div>
          </div>
        </div>

        <!-- Section: Schedule -->
        <div class="form-card">
          <div class="section-header">
            <div class="section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div>
              <h2>Schedule &amp; Duration</h2>
              <p>Timeline details for the internship</p>
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="duration">Duration (months) <span class="req">*</span></label>
              <input type="number" id="duration" formControlName="duration" min="1" max="12" placeholder="3" />
              <div class="field-error" *ngIf="offerForm.get('duration')?.invalid && offerForm.get('duration')?.touched">
                Duration must be between 1 and 12 months
              </div>
            </div>
            <div class="field">
              <label for="applicationDeadline">Application Deadline</label>
              <input type="date" id="applicationDeadline" formControlName="applicationDeadline" />
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="startDate">Start Date</label>
              <input type="date" id="startDate" formControlName="startDate" />
            </div>
            <div class="field">
              <label for="endDate">End Date</label>
              <input type="date" id="endDate" formControlName="endDate" />
            </div>
          </div>
        </div>

        <!-- Section: Skills -->
        <div class="form-card">
          <div class="section-header">
            <div class="section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div>
              <h2>Required Skills</h2>
              <p>Add skills candidates should have</p>
            </div>
          </div>

          <div class="skills-input-row">
            <input
              type="text"
              [(ngModel)]="newSkill"
              [ngModelOptions]="{standalone: true}"
              (keyup.enter)="addSkill()"
              placeholder="Type a skill and press Enter"
            />
            <button type="button" class="btn-add-skill" (click)="addSkill()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
          </div>

          <div class="skills-chips" *ngIf="skillsArray.length > 0">
            <span class="skill-chip" *ngFor="let skill of skillsArray.controls; let i = index">
              {{ skill.value }}
              <button type="button" class="chip-remove" (click)="removeSkill(i)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </span>
          </div>

          <div class="skills-empty" *ngIf="skillsArray.length === 0">
            No skills added yet. Type a skill above and press Enter.
          </div>
        </div>

        <!-- Error Message -->
        <div *ngIf="errorMessage" class="alert-error">
          {{ errorMessage }}
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" class="btn btn-cancel" (click)="goBack()">Cancel</button>
          <button type="submit" class="btn btn-submit" [disabled]="offerForm.invalid || submitting">
            {{ submitting ? 'Saving...' : (isEditMode ? 'Update Offer' : 'Create Offer') }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .page {
      max-width: 820px;
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
      margin-bottom: 16px;
      transition: color 0.15s;
    }

    .btn-back:hover { color: #ff7900; }

    .page-title {
      margin-bottom: 28px;
    }

    .page-title h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
    }

    .subtitle { color: #6b7280; font-size: 0.938rem; margin: 0; }

    .form-layout {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Form Card */
    .form-card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .section-header {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f5f6f8;
    }

    .section-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff7ed;
      border-radius: 10px;
      color: #ff7900;
      flex-shrink: 0;
    }

    .section-header h2 {
      font-size: 1.05rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 2px 0;
    }

    .section-header p {
      font-size: 0.813rem;
      color: #9ca3af;
      margin: 0;
    }

    /* Fields */
    .field {
      margin-bottom: 20px;
    }

    .field:last-child { margin-bottom: 0; }

    .field label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 6px;
    }

    .req { color: #ef4444; }

    .field input,
    .field textarea {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 0.938rem;
      color: #111827;
      background: #fff;
      transition: border-color 0.15s, box-shadow 0.15s;
      box-sizing: border-box;
    }

    .field input:focus,
    .field textarea:focus {
      outline: none;
      border-color: #ff7900;
      box-shadow: 0 0 0 3px rgba(255, 121, 0, 0.1);
    }

    .field input::placeholder,
    .field textarea::placeholder {
      color: #d1d5db;
    }

    .field textarea {
      resize: vertical;
      min-height: 80px;
    }

    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .field-error {
      color: #ef4444;
      font-size: 0.813rem;
      margin-top: 4px;
    }

    /* Skills */
    .skills-input-row {
      display: flex;
      gap: 10px;
      margin-bottom: 14px;
    }

    .skills-input-row input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 0.938rem;
      color: #111827;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .skills-input-row input:focus {
      outline: none;
      border-color: #ff7900;
      box-shadow: 0 0 0 3px rgba(255, 121, 0, 0.1);
    }

    .btn-add-skill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .btn-add-skill:hover {
      background: #e5e7eb;
    }

    .skills-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #fff7ed;
      color: #e06800;
      padding: 6px 10px 6px 14px;
      border-radius: 100px;
      font-size: 0.838rem;
      font-weight: 600;
      border: 1px solid #fed7aa;
    }

    .chip-remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: none;
      border: none;
      color: #e06800;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.15s;
      padding: 0;
    }

    .chip-remove:hover {
      background: rgba(224, 104, 0, 0.15);
      color: #c2410c;
    }

    .skills-empty {
      color: #9ca3af;
      font-size: 0.875rem;
      text-align: center;
      padding: 14px;
    }

    /* Alert */
    .alert-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 12px;
      padding: 14px 18px;
      color: #991b1b;
      font-size: 0.875rem;
    }

    /* Actions */
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 8px;
    }

    .btn {
      padding: 10px 24px;
      border: none;
      border-radius: 10px;
      font-size: 0.938rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-cancel {
      background: #f3f4f6;
      color: #6b7280;
      border: 1px solid #e5e7eb;
    }

    .btn-cancel:hover { background: #e5e7eb; }

    .btn-submit {
      background: #ff7900;
      color: #fff;
    }

    .btn-submit:hover:not(:disabled) { background: #e06800; }

    @media (max-width: 640px) {
      .page { padding: 20px 16px; }
      .form-card { padding: 20px; }
      .field-row { grid-template-columns: 1fr; }
      .form-actions { flex-direction: column-reverse; }
      .btn { width: 100%; text-align: center; }
    }
  `]
})
export class OfferFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly offersService = inject(OffersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  offerForm!: FormGroup;
  loading = false;
  submitting = false;
  isEditMode = false;
  offerId: string | null = null;
  newSkill = '';
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.initForm();

    // Check if we're in edit mode
    this.offerId = this.route.snapshot.paramMap.get('id');
    if (this.offerId) {
      this.isEditMode = true;
      this.loadOffer(this.offerId);
    }
  }

  /**
   * Initialize form with validators
   */
  initForm(): void {
    this.offerForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      requirements: [''],
      department: ['', [Validators.required]],
      duration: [3, [Validators.required, Validators.min(1), Validators.max(12)]],
      numberOfPositions: [1, [Validators.min(1)]],
      startDate: [''],
      endDate: [''],
      applicationDeadline: [''],
      requiredSkills: this.fb.array([])
    });
  }

  /**
   * Get skills form array
   */
  get skillsArray(): FormArray {
    return this.offerForm.get('requiredSkills') as FormArray;
  }

  /**
   * Add skill to array
   */
  addSkill(): void {
    const skill = this.newSkill.trim();
    if (skill && !this.skillsArray.value.includes(skill)) {
      this.skillsArray.push(this.fb.control(skill));
      this.newSkill = '';
    }
  }

  /**
   * Remove skill from array
   */
  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  /**
   * Load offer data for editing
   */
  loadOffer(id: string): void {
    this.loading = true;
    this.offersService.getOfferById(id).subscribe({
      next: (offer) => {
        this.offerForm.patchValue({
          title: offer.title,
          description: offer.description,
          requirements: offer.requirements || '',
          department: offer.department,
          duration: offer.duration,
          numberOfPositions: offer.numberOfPositions,
          startDate: offer.startDate ? offer.startDate.split('T')[0] : '',
          endDate: offer.endDate ? offer.endDate.split('T')[0] : '',
          applicationDeadline: offer.applicationDeadline ? offer.applicationDeadline.split('T')[0] : ''
        });

        // Add skills
        if (offer.requiredSkills) {
          offer.requiredSkills.forEach(skill => {
            this.skillsArray.push(this.fb.control(skill));
          });
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading offer:', err);
        this.errorMessage = 'Failed to load offer data.';
        this.loading = false;
      }
    });
  }

  /**
   * Submit form
   */
  onSubmit(): void {
    if (this.offerForm.invalid) {
      Object.keys(this.offerForm.controls).forEach(key => {
        this.offerForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.errorMessage = null;

    const formValue = this.offerForm.value;
    const offerData: CreateOfferDto = {
      title: formValue.title,
      description: formValue.description,
      requirements: formValue.requirements || undefined,
      department: formValue.department,
      duration: formValue.duration,
      numberOfPositions: formValue.numberOfPositions || 1,
      startDate: formValue.startDate || undefined,
      endDate: formValue.endDate || undefined,
      applicationDeadline: formValue.applicationDeadline || undefined,
      requiredSkills: formValue.requiredSkills.length > 0 ? formValue.requiredSkills : undefined
    };

    const request = this.isEditMode && this.offerId
      ? this.offersService.updateOffer(this.offerId, offerData)
      : this.offersService.createOffer(offerData);

    request.subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/chief/offers']);
      },
      error: (err) => {
        console.error('Error saving offer:', err);
        this.errorMessage = err.error?.message || 'Failed to save offer. Please try again.';
        this.submitting = false;
      }
    });
  }

  /**
   * Navigate back
   */
  goBack(): void {
    this.router.navigate(['/chief/offers']);
  }
}
