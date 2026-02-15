import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-page">
      <!-- Header -->
      <div class="page-header">
        <button class="btn-back" (click)="cancel()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </button>
        <h1>{{ isEdit ? 'Edit Evaluation' : 'New Evaluation' }}</h1>
      </div>

      <form [formGroup]="evalForm" (ngSubmit)="onSubmit()">
        <!-- Select Intern -->
        <div class="card">
          <h3 class="card-title">Intern Selection</h3>
          <div class="form-group">
            <label class="form-label">Select Intern</label>
            <select formControlName="internId" class="form-select">
              <option value="" disabled>Choose an intern...</option>
              <option *ngFor="let intern of internsList" [value]="intern.id">
                {{ intern.name }} — {{ intern.internship }}
              </option>
            </select>
            <span class="error-text" *ngIf="evalForm.get('internId')?.touched && evalForm.get('internId')?.invalid">
              Please select an intern
            </span>
          </div>
        </div>

        <!-- Rating Sections -->
        <div class="card">
          <h3 class="card-title">Performance Ratings</h3>
          <p class="card-subtitle">Rate the intern from 1 (Poor) to 5 (Excellent)</p>

          <div class="ratings-grid">
            <div class="rating-section" *ngFor="let cat of ratingCategories">
              <label class="rating-label">{{ cat.label }}</label>
              <div class="stars-row">
                <button
                  type="button"
                  *ngFor="let star of [1,2,3,4,5]"
                  class="star-btn"
                  [class.filled]="getRatingValue(cat.controlName) >= star"
                  (click)="setRating(cat.controlName, star)"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" [attr.fill]="getRatingValue(cat.controlName) >= star ? '#ff7900' : 'none'" [attr.stroke]="getRatingValue(cat.controlName) >= star ? '#ff7900' : '#d1d5db'" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>
                <span class="rating-num">{{ getRatingValue(cat.controlName) }}/5</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div class="card">
          <h3 class="card-title">Detailed Feedback</h3>

          <div class="form-group">
            <label class="form-label">General Comments</label>
            <textarea formControlName="comments" class="form-textarea" rows="4" placeholder="Write your overall assessment..."></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Strengths</label>
              <textarea formControlName="strengths" class="form-textarea" rows="3" placeholder="Key strengths observed..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Areas for Improvement</label>
              <textarea formControlName="improvements" class="form-textarea" rows="3" placeholder="Areas that need development..."></textarea>
            </div>
          </div>
        </div>

        <!-- Recommendation -->
        <div class="card">
          <h3 class="card-title">Final Recommendation</h3>
          <div class="form-group">
            <label class="form-label">Recommendation</label>
            <select formControlName="recommendation" class="form-select">
              <option value="" disabled>Select a recommendation...</option>
              <option value="hire">Hire — Recommend for full-time position</option>
              <option value="extend">Extend — Extend internship period</option>
              <option value="do_not_hire">Do Not Hire — Not recommended</option>
            </select>
          </div>
        </div>

        <!-- Buttons -->
        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn-submit" [disabled]="evalForm.invalid">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            {{ isEdit ? 'Update Evaluation' : 'Submit Evaluation' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-page {
      padding: 32px;
      background: #f5f6f8;
      min-height: 100%;
      max-width: 820px;
    }

    .page-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 28px;
    }

    .page-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-back:hover {
      color: #ff7900;
      border-color: #ff7900;
    }

    .card {
      background: #fff;
      border: 1px solid #f0f1f3;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      padding: 24px;
      margin-bottom: 20px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 4px;
    }

    .card-subtitle {
      font-size: 13px;
      color: #9ca3af;
      margin: 0 0 20px;
    }

    .form-group {
      margin-bottom: 18px;
      flex: 1;
    }

    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 6px;
    }

    .form-select,
    .form-textarea {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 14px;
      color: #111827;
      background: #fff;
      transition: border-color 0.2s;
      font-family: inherit;
      box-sizing: border-box;
    }

    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #ff7900;
      box-shadow: 0 0 0 3px rgba(255,121,0,0.08);
    }

    .form-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .error-text {
      font-size: 12px;
      color: #e11d48;
      margin-top: 4px;
      display: block;
    }

    /* Ratings */
    .ratings-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .rating-section {
      padding: 14px;
      border: 1px solid #f0f1f3;
      border-radius: 12px;
      background: #fafbfc;
    }

    .rating-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 10px;
    }

    .stars-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .star-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px;
      display: flex;
      align-items: center;
      transition: transform 0.15s;
    }

    .star-btn:hover {
      transform: scale(1.2);
    }

    .rating-num {
      margin-left: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #6b7280;
    }

    /* Actions */
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;
    }

    .btn-cancel {
      padding: 12px 24px;
      background: #fff;
      color: #6b7280;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-cancel:hover {
      color: #111827;
      border-color: #d1d5db;
    }

    .btn-submit {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 28px;
      background: #ff7900;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-submit:hover:not(:disabled) {
      background: #e06800;
    }

    .btn-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class EvaluationFormComponent implements OnInit {
  evalForm!: FormGroup;
  isEdit = false;

  internsList = [
    { id: '1', name: 'Amira Ben Salah', internship: 'Frontend Development' },
    { id: '2', name: 'Mohamed Trabelsi', internship: 'Data Engineering' },
    { id: '3', name: 'Yasmine Khelifi', internship: 'DevOps' },
    { id: '4', name: 'Karim Bouazizi', internship: 'Backend Development' }
  ];

  ratingCategories = [
    { label: 'Technical Skills', controlName: 'technicalSkills' },
    { label: 'Communication', controlName: 'communication' },
    { label: 'Initiative', controlName: 'initiative' },
    { label: 'Teamwork', controlName: 'teamwork' },
    { label: 'Overall Performance', controlName: 'overall' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = id !== 'new' && id !== null;

    this.evalForm = this.fb.group({
      internId: ['', Validators.required],
      technicalSkills: [0, [Validators.required, Validators.min(1)]],
      communication: [0, [Validators.required, Validators.min(1)]],
      initiative: [0, [Validators.required, Validators.min(1)]],
      teamwork: [0, [Validators.required, Validators.min(1)]],
      overall: [0, [Validators.required, Validators.min(1)]],
      comments: ['', Validators.required],
      strengths: [''],
      improvements: [''],
      recommendation: ['', Validators.required]
    });

    if (this.isEdit) {
      this.evalForm.patchValue({
        internId: '3',
        technicalSkills: 3,
        communication: 4,
        initiative: 3,
        teamwork: 4,
        overall: 3,
        comments: 'Yasmine shows strong aptitude for DevOps processes and tooling.',
        strengths: 'Quick learner, strong CI/CD fundamentals',
        improvements: 'Needs more exposure to cloud infrastructure',
        recommendation: 'extend'
      });
    }
  }

  getRatingValue(controlName: string): number {
    return this.evalForm.get(controlName)?.value || 0;
  }

  setRating(controlName: string, value: number): void {
    this.evalForm.get(controlName)?.setValue(value);
    this.evalForm.get(controlName)?.markAsTouched();
  }

  onSubmit(): void {
    if (this.evalForm.valid) {
      console.log('Evaluation submitted:', this.evalForm.value);
      this.router.navigate(['/supervisor/evaluations']);
    }
  }

  cancel(): void {
    this.router.navigate(['/supervisor/evaluations']);
  }
}
