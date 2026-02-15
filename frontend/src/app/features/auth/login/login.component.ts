import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UserRole } from '@models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <!-- Animated background -->
      <div class="bg-mesh">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>

      <div class="auth-wrapper">
        <!-- Left: Branding -->
        <div class="auth-brand">
          <div class="brand-content">
            <div class="logo">
              <div class="logo-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="10" fill="white" fill-opacity="0.2"/>
                  <circle cx="20" cy="20" r="10" fill="white"/>
                </svg>
              </div>
              <span class="logo-text">Orange ISS</span>
            </div>
            <h1>Welcome<br>Back.</h1>
            <p>Access your internship management portal with intelligent AI-powered candidate ranking.</p>
            <div class="brand-features">
              <div class="feature-pill"><span class="pill-dot"></span> AI Rankings</div>
              <div class="feature-pill"><span class="pill-dot"></span> Smart Matching</div>
              <div class="feature-pill"><span class="pill-dot"></span> CV Parsing</div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="auth-form-panel">
          <div class="form-container">
            <div class="form-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to continue</p>
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label class="form-label" for="email">Email Address</label>
                <div class="input-wrapper" [class.focused]="emailFocused" [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <input id="email" type="email" formControlName="email" placeholder="you&#64;example.com"
                    (focus)="emailFocused=true" (blur)="emailFocused=false" />
                </div>
                <div class="field-error" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                  <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <div class="input-wrapper" [class.focused]="passFocused" [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input id="password" [type]="showPassword ? 'text' : 'password'" formControlName="password" placeholder="Enter your password"
                    (focus)="passFocused=true" (blur)="passFocused=false" />
                  <button type="button" class="toggle-pass" (click)="showPassword=!showPassword" tabindex="-1">
                    <svg *ngIf="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg *ngIf="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  </button>
                </div>
                <div class="field-error" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                  <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
                </div>
              </div>

              <div class="server-error" *ngIf="errorMessage">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {{ errorMessage }}
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg submit-btn" [disabled]="loginForm.invalid || loading" [class.loading]="loading">
                <span class="btn-text" *ngIf="!loading">Sign In</span>
                <span class="btn-loader" *ngIf="loading">
                  <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                </span>
              </button>
            </form>

            <div class="auth-footer">
              <p>Don't have an account? <a routerLink="/auth/register">Create one</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0f0f11;
      position: relative;
      overflow: hidden;
    }

    .bg-mesh {
      position: fixed;
      inset: 0;
      z-index: 0;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.5;
      animation: float 8s ease-in-out infinite;
    }
    .orb-1 { width: 500px; height: 500px; background: #ff7900; top: -10%; left: -5%; animation-delay: 0s; }
    .orb-2 { width: 400px; height: 400px; background: #ff5500; bottom: -10%; right: -5%; animation-delay: 3s; }
    .orb-3 { width: 300px; height: 300px; background: #ff9a40; top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: 5s; }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }

    .auth-wrapper {
      position: relative;
      z-index: 1;
      display: flex;
      width: 100%;
      max-width: 960px;
      min-height: 600px;
      border-radius: 24px;
      overflow: hidden;
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(40px);
      -webkit-backdrop-filter: blur(40px);
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
      margin: 1rem;
    }

    /* ── Left brand panel ── */
    .auth-brand {
      flex: 1;
      background: linear-gradient(160deg, #ff7900 0%, #e06000 50%, #cc5500 100%);
      padding: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .auth-brand::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .brand-content {
      position: relative;
      z-index: 1;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
    }
    .logo-text { color: white; font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }

    .auth-brand h1 {
      color: white;
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1rem;
      letter-spacing: -0.03em;
    }

    .auth-brand p {
      color: rgba(255,255,255,0.8);
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .brand-features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .feature-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.9rem;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 100px;
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .pill-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #fff;
    }

    /* ── Right form panel ── */
    .auth-form-panel {
      flex: 1;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
    }

    .form-container {
      width: 100%;
      max-width: 380px;
    }

    .form-header {
      margin-bottom: 2rem;
    }
    .form-header h2 {
      font-size: 1.75rem;
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.03em;
      margin-bottom: 0.375rem;
    }
    .form-header p { color: #6b7280; font-size: 0.9rem; margin: 0; }

    .form-group { margin-bottom: 1.25rem; }
    .form-label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 0.375rem; }

    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0 1rem;
      background: #f9fafb;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .input-wrapper.focused { border-color: #ff7900; box-shadow: 0 0 0 3px rgba(255,121,0,0.1); background: white; }
    .input-wrapper.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
    .input-icon { color: #9ca3af; flex-shrink: 0; }
    .input-wrapper.focused .input-icon { color: #ff7900; }

    .input-wrapper input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      padding: 0.75rem 0;
      font-size: 0.95rem;
      font-family: inherit;
      color: #111827;
    }
    .input-wrapper input::placeholder { color: #9ca3af; }

    .toggle-pass {
      background: none;
      border: none;
      cursor: pointer;
      color: #9ca3af;
      padding: 0.25rem;
      display: flex;
      transition: color 0.2s;
    }
    .toggle-pass:hover { color: #6b7280; }

    .field-error {
      margin-top: 0.375rem;
      font-size: 0.78rem;
      font-weight: 500;
      color: #ef4444;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .server-error {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.2);
      border-radius: 10px;
      color: #ef4444;
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .submit-btn {
      margin-top: 0.5rem;
      height: 48px;
      font-size: 0.95rem;
      border-radius: 12px;
    }
    .submit-btn.loading { pointer-events: none; }

    .btn-loader { display: flex; gap: 4px; align-items: center; }
    .btn-loader .dot {
      width: 6px; height: 6px; border-radius: 50%; background: white;
      animation: bounce 1.2s ease-in-out infinite;
    }
    .btn-loader .dot:nth-child(2) { animation-delay: 0.2s; }
    .btn-loader .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 1; }
    }

    .auth-footer {
      margin-top: 2rem;
      text-align: center;
    }
    .auth-footer p { color: #6b7280; font-size: 0.875rem; margin: 0; }
    .auth-footer a { color: #ff7900; font-weight: 600; text-decoration: none; transition: color 0.2s; }
    .auth-footer a:hover { color: #e06800; }

    @media (max-width: 768px) {
      .auth-wrapper { flex-direction: column; max-width: 480px; min-height: auto; }
      .auth-brand { padding: 2rem; }
      .auth-brand h1 { font-size: 2rem; }
      .auth-form-panel { padding: 2rem; }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  showPassword = false;
  emailFocused = false;
  passFocused = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        switch (response.user.role) {
          case UserRole.STUDENT: this.router.navigate(['/student']); break;
          case UserRole.DEPARTMENT_CHIEF: this.router.navigate(['/chief']); break;
          case UserRole.HR: this.router.navigate(['/hr']); break;
          case UserRole.SUPERVISOR: this.router.navigate(['/supervisor']); break;
          default: this.router.navigate(['/']);
        }
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Invalid email or password';
        this.loading = false;
      }
    });
  }
}
