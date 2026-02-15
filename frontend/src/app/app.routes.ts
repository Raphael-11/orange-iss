import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

/**
 * Application routes configuration
 * Implements lazy loading for feature modules
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'student',
    loadChildren: () => import('./features/student/student.routes').then(m => m.STUDENT_ROUTES),
    // AUTHENTICATION DISABLED FOR TESTING
    // canActivate: [AuthGuard],
    // data: { roles: ['STUDENT'] }
  },
  {
    path: 'chief',
    loadChildren: () => import('./features/chief/chief.routes').then(m => m.CHIEF_ROUTES),
    // AUTHENTICATION DISABLED FOR TESTING
    // canActivate: [AuthGuard],
    // data: { roles: ['DEPARTMENT_CHIEF'] }
  },
  {
    path: 'hr',
    loadChildren: () => import('./features/hr/hr.routes').then(m => m.HR_ROUTES),
    // AUTHENTICATION DISABLED FOR TESTING
    // canActivate: [AuthGuard],
    // data: { roles: ['HR'] }
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./features/supervisor/supervisor.routes').then(m => m.SUPERVISOR_ROUTES),
    // AUTHENTICATION DISABLED FOR TESTING
    // canActivate: [AuthGuard],
    // data: { roles: ['SUPERVISOR'] }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
