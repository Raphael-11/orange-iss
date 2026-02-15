import { Routes } from '@angular/router';
import { HrDashboardComponent } from './hr-dashboard.component';

export const HR_ROUTES: Routes = [
  {
    path: '',
    component: HrDashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard-home.component').then(m => m.DashboardHomeComponent)
      },
      {
        path: 'offers',
        loadComponent: () => import('./offers/offers-list.component').then(m => m.OffersListComponent)
      },
      {
        path: 'offers/:id',
        loadComponent: () => import('./offers/offer-detail.component').then(m => m.OfferDetailComponent)
      },
      {
        path: 'applications',
        loadComponent: () => import('./applications/applications-list.component').then(m => m.ApplicationsListComponent)
      },
      {
        path: 'applications/:id',
        loadComponent: () => import('./applications/application-detail.component').then(m => m.ApplicationDetailComponent)
      },
      {
        path: 'candidates',
        loadComponent: () => import('./candidates/candidates-list.component').then(m => m.CandidatesListComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  }
];
