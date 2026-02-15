import { Routes } from '@angular/router';
import { SupervisorDashboardComponent } from './supervisor-dashboard.component';

export const SUPERVISOR_ROUTES: Routes = [
  {
    path: '',
    component: SupervisorDashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard-home.component').then(m => m.DashboardHomeComponent)
      },
      {
        path: 'interns',
        loadComponent: () => import('./interns/interns-list.component').then(m => m.InternsListComponent)
      },
      {
        path: 'interns/:id',
        loadComponent: () => import('./interns/intern-detail.component').then(m => m.InternDetailComponent)
      },
      {
        path: 'evaluations',
        loadComponent: () => import('./evaluations/evaluations-list.component').then(m => m.EvaluationsListComponent)
      },
      {
        path: 'evaluations/:id',
        loadComponent: () => import('./evaluations/evaluation-form.component').then(m => m.EvaluationFormComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  }
];
