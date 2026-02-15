import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
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
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  }
];
