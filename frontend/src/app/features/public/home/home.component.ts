import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="landing">
      <!-- ── Navbar ── -->
      <nav class="navbar">
        <div class="nav-inner">
          <a class="nav-brand" routerLink="/">
            <div class="brand-dot"></div>
            <span>Orange ISS</span>
          </a>
          <div class="nav-links">
            <a routerLink="/auth/login" class="nav-link">Sign In</a>
            <a routerLink="/auth/register" class="nav-btn">Get Started</a>
          </div>
        </div>
      </nav>

      <!-- ── Hero ── -->
      <section class="hero">
        <div class="hero-bg">
          <div class="gradient-orb orb-1"></div>
          <div class="gradient-orb orb-2"></div>
          <div class="gradient-orb orb-3"></div>
          <div class="grid-overlay"></div>
        </div>
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            AI-Powered Platform
          </div>
          <h1>Internship & PFE<br><span class="gradient-text">Management</span> Platform</h1>
          <p class="hero-sub">Streamline your internship workflow with intelligent candidate ranking, automated CV parsing, and seamless collaboration between students, supervisors, and HR.</p>
          <div class="hero-actions">
            <a routerLink="/auth/register" class="btn-hero-primary">
              Start Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a routerLink="/auth/login" class="btn-hero-secondary">Sign In</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><span class="stat-num">500+</span><span class="stat-label">Internships</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><span class="stat-num">98%</span><span class="stat-label">Match Rate</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><span class="stat-num">4.9★</span><span class="stat-label">Rating</span></div>
          </div>
        </div>
      </section>

      <!-- ── Features ── -->
      <section class="features" id="features">
        <div class="section-inner">
          <div class="section-header">
            <span class="section-tag">Features</span>
            <h2>Everything you need,<br>beautifully integrated.</h2>
            <p>A complete ecosystem for managing internships from posting to evaluation.</p>
          </div>
          <div class="feature-grid">
            <div class="feature-card" *ngFor="let f of features; let i = index" [style.animation-delay]="i * 0.1 + 's'">
              <div class="feature-icon" [style.background]="f.bg">{{ f.icon }}</div>
              <h3>{{ f.title }}</h3>
              <p>{{ f.description }}</p>
              <ul>
                <li *ngFor="let item of f.items">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff7900" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ── AI Section ── -->
      <section class="ai-section">
        <div class="section-inner">
          <div class="ai-grid">
            <div class="ai-content">
              <span class="section-tag">AI Engine</span>
              <h2>Intelligent Candidate<br><span class="gradient-text">Ranking System</span></h2>
              <p>Our AI automatically parses CVs, extracts qualifications, and ranks candidates with transparent explanations. Make data-driven decisions with confidence.</p>
              <div class="ai-features">
                <div class="ai-feat" *ngFor="let af of aiFeatures">
                  <div class="ai-feat-icon">{{ af.icon }}</div>
                  <div>
                    <strong>{{ af.title }}</strong>
                    <span>{{ af.desc }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="ai-visual">
              <div class="ai-card">
                <div class="ai-card-header">
                  <span class="ai-label">AI Score</span>
                  <span class="ai-score">94.2%</span>
                </div>
                <div class="ai-bar-group">
                  <div class="ai-bar-item" *ngFor="let bar of aiBars">
                    <span>{{ bar.label }}</span>
                    <div class="ai-bar"><div class="ai-bar-fill" [style.width]="bar.value + '%'" [style.background]="bar.color"></div></div>
                    <span class="ai-bar-val">{{ bar.value }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Footer ── -->
      <footer class="footer">
        <div class="section-inner">
          <div class="footer-inner">
            <div class="footer-brand">
              <div class="brand-dot"></div>
              <span>Orange ISS</span>
            </div>
            <p>Internship & PFE Management Platform. Powered by AI.</p>
            <p class="copyright">&copy; 2026 Orange Digital Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .landing { min-height: 100vh; background: #fafbfc; overflow-x: hidden; }

    /* ── Navbar ── */
    .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; transition: all 0.3s; }
    .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0.625rem 1.25rem; background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.3); border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .nav-brand { display: flex; align-items: center; gap: 0.625rem; text-decoration: none; font-weight: 800; font-size: 1.1rem; color: #111827; letter-spacing: -0.02em; }
    .brand-dot { width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, #ff7900, #e06800); }
    .nav-links { display: flex; align-items: center; gap: 0.5rem; }
    .nav-link { padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 600; color: #4b5563; text-decoration: none; border-radius: 10px; transition: all 0.2s; }
    .nav-link:hover { color: #111827; background: rgba(0,0,0,0.04); }
    .nav-btn { padding: 0.5rem 1.25rem; font-size: 0.875rem; font-weight: 600; color: white; background: linear-gradient(135deg, #ff7900, #e06800); border-radius: 10px; text-decoration: none; transition: all 0.2s; box-shadow: 0 2px 8px rgba(255,121,0,0.3); }
    .nav-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,121,0,0.4); }

    /* ── Hero ── */
    .hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8rem 2rem 4rem; overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; z-index: 0; }
    .gradient-orb { position: absolute; border-radius: 50%; filter: blur(100px); }
    .orb-1 { width: 700px; height: 700px; background: rgba(255,121,0,0.15); top: -20%; right: -10%; animation: float 10s ease-in-out infinite; }
    .orb-2 { width: 500px; height: 500px; background: rgba(255,154,64,0.1); bottom: -15%; left: -5%; animation: float 12s ease-in-out infinite 3s; }
    .orb-3 { width: 300px; height: 300px; background: rgba(59,130,246,0.08); top: 30%; left: 20%; animation: float 8s ease-in-out infinite 5s; }
    .grid-overlay { position: absolute; inset: 0; background-image: radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px); background-size: 40px 40px; }
    @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-25px) scale(1.03); } }

    .hero-content { position: relative; z-index: 1; text-align: center; max-width: 800px; animation: fadeUp 0.8s ease-out; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

    .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.375rem 1rem; background: rgba(255,121,0,0.08); border: 1px solid rgba(255,121,0,0.15); border-radius: 100px; font-size: 0.8rem; font-weight: 600; color: #e06800; margin-bottom: 1.5rem; }
    .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #ff7900; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

    .hero h1 { font-size: 4rem; font-weight: 800; line-height: 1.08; letter-spacing: -0.04em; color: #111827; margin-bottom: 1.5rem; }
    .gradient-text { background: linear-gradient(135deg, #ff7900, #e06000, #ff9a40); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero-sub { font-size: 1.15rem; line-height: 1.7; color: #6b7280; max-width: 600px; margin: 0 auto 2.5rem; }

    .hero-actions { display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 3rem; }
    .btn-hero-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 2rem; font-size: 1rem; font-weight: 700; color: white; background: linear-gradient(135deg, #ff7900, #e06800); border-radius: 14px; text-decoration: none; box-shadow: 0 6px 20px rgba(255,121,0,0.35); transition: all 0.25s; }
    .btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,121,0,0.45); }
    .btn-hero-secondary { padding: 0.875rem 2rem; font-size: 1rem; font-weight: 700; color: #374151; background: white; border: 1.5px solid #e5e7eb; border-radius: 14px; text-decoration: none; transition: all 0.25s; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .btn-hero-secondary:hover { border-color: #d1d5db; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

    .hero-stats { display: inline-flex; align-items: center; gap: 1.5rem; padding: 1rem 2rem; background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .stat { display: flex; flex-direction: column; align-items: center; }
    .stat-num { font-size: 1.25rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
    .stat-label { font-size: 0.75rem; color: #9ca3af; font-weight: 500; margin-top: 0.125rem; }
    .stat-divider { width: 1px; height: 32px; background: #e5e7eb; }

    /* ── Features ── */
    .features { padding: 6rem 2rem; background: white; }
    .section-inner { max-width: 1200px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 4rem; }
    .section-tag { display: inline-block; padding: 0.3rem 0.875rem; background: rgba(255,121,0,0.08); color: #e06800; font-size: 0.8rem; font-weight: 700; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; }
    .section-header h2 { font-size: 2.5rem; font-weight: 800; color: #111827; letter-spacing: -0.03em; margin-bottom: 1rem; line-height: 1.15; }
    .section-header p { font-size: 1.1rem; color: #6b7280; max-width: 500px; margin: 0 auto; }

    .feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
    .feature-card { padding: 2rem; border-radius: 20px; background: #fafbfc; border: 1px solid #f0f1f3; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); animation: fadeUp 0.6s ease-out backwards; }
    .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); border-color: rgba(255,121,0,0.15); }
    .feature-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1.25rem; }
    .feature-card h3 { font-size: 1.1rem; font-weight: 700; color: #111827; margin-bottom: 0.625rem; letter-spacing: -0.01em; }
    .feature-card > p { font-size: 0.875rem; color: #6b7280; line-height: 1.5; margin-bottom: 1rem; }
    .feature-card ul { list-style: none; padding: 0; margin: 0; }
    .feature-card li { display: flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0; font-size: 0.825rem; color: #4b5563; }

    /* ── AI Section ── */
    .ai-section { padding: 6rem 2rem; background: #fafbfc; }
    .ai-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .ai-content .section-tag { margin-bottom: 1rem; }
    .ai-content h2 { font-size: 2.25rem; font-weight: 800; color: #111827; letter-spacing: -0.03em; margin-bottom: 1.25rem; line-height: 1.15; }
    .ai-content > p { font-size: 1rem; color: #6b7280; line-height: 1.7; margin-bottom: 2rem; }

    .ai-features { display: flex; flex-direction: column; gap: 1rem; }
    .ai-feat { display: flex; align-items: flex-start; gap: 1rem; }
    .ai-feat-icon { width: 40px; height: 40px; border-radius: 12px; background: rgba(255,121,0,0.08); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
    .ai-feat strong { font-size: 0.9rem; color: #111827; display: block; margin-bottom: 0.125rem; }
    .ai-feat span { font-size: 0.8rem; color: #6b7280; }

    .ai-visual { display: flex; justify-content: center; }
    .ai-card { width: 100%; max-width: 400px; padding: 2rem; background: white; border-radius: 20px; border: 1px solid #f0f1f3; box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
    .ai-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .ai-label { font-size: 0.8rem; font-weight: 600; color: #6b7280; }
    .ai-score { font-size: 2rem; font-weight: 800; color: #10b981; letter-spacing: -0.02em; }
    .ai-bar-group { display: flex; flex-direction: column; gap: 1rem; }
    .ai-bar-item { display: grid; grid-template-columns: 80px 1fr 40px; align-items: center; gap: 0.75rem; }
    .ai-bar-item span:first-child { font-size: 0.8rem; font-weight: 500; color: #6b7280; }
    .ai-bar { height: 8px; background: #f0f1f3; border-radius: 8px; overflow: hidden; }
    .ai-bar-fill { height: 100%; border-radius: 8px; transition: width 1s ease-out; }
    .ai-bar-val { font-size: 0.8rem; font-weight: 700; color: #111827; text-align: right; }

    /* ── Footer ── */
    .footer { padding: 3rem 2rem; border-top: 1px solid #f0f1f3; }
    .footer-inner { text-align: center; }
    .footer-brand { display: inline-flex; align-items: center; gap: 0.625rem; font-weight: 800; font-size: 1.1rem; color: #111827; margin-bottom: 0.75rem; }
    .footer p { color: #9ca3af; font-size: 0.875rem; margin: 0; }
    .copyright { margin-top: 0.5rem !important; font-size: 0.8rem !important; }

    /* ── Responsive ── */
    @media (max-width: 1024px) { .feature-grid { grid-template-columns: repeat(2, 1fr); } .ai-grid { grid-template-columns: 1fr; } }
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .hero-sub { font-size: 1rem; }
      .hero-actions { flex-direction: column; align-items: center; }
      .hero-stats { flex-direction: column; gap: 0.75rem; }
      .stat-divider { width: 32px; height: 1px; }
      .feature-grid { grid-template-columns: 1fr; }
      .section-header h2 { font-size: 1.75rem; }
      .nav-inner { padding: 0.5rem 0.75rem; }
    }
  `]
})
export class HomeComponent {
  features = [
    { icon: '🎓', bg: 'rgba(59,130,246,0.1)', title: 'For Students', description: 'Browse offers, apply, and track your journey.', items: ['Browse available offers', 'Submit applications', 'Upload CV', 'Track status'] },
    { icon: '👔', bg: 'rgba(255,121,0,0.1)', title: 'For Department Chiefs', description: 'Create offers and leverage AI-powered rankings.', items: ['Create internship offers', 'Review applications', 'AI-ranked candidates', 'Accept or reject'] },
    { icon: '📋', bg: 'rgba(16,185,129,0.1)', title: 'For HR', description: 'Manage the entire pipeline from one dashboard.', items: ['Manage all offers', 'Monitor applications', 'Finalize candidates', 'Generate reports'] },
    { icon: '👨‍🏫', bg: 'rgba(139,92,246,0.1)', title: 'For Supervisors', description: 'Guide interns and submit evaluation feedback.', items: ['View assigned interns', 'Track progress', 'Provide feedback', 'Submit evaluations'] }
  ];

  aiFeatures = [
    { icon: '📄', title: 'CV Parsing', desc: 'Automatically extract skills, experience, and qualifications.' },
    { icon: '🧠', title: 'Smart Scoring', desc: 'AI ranks candidates based on offer requirements.' },
    { icon: '💡', title: 'Explanations', desc: 'Understand exactly why each candidate is ranked.' }
  ];

  aiBars = [
    { label: 'Skills', value: 92, color: '#ff7900' },
    { label: 'Experience', value: 88, color: '#3b82f6' },
    { label: 'Education', value: 95, color: '#10b981' },
    { label: 'Relevance', value: 90, color: '#8b5cf6' }
  ];
}
