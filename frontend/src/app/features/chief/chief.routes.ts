import { Routes } from '@angular/router';
import { ChiefDashboardComponent } from './chief-dashboard.component';

export const CHIEF_ROUTES: Routes = [
  {
    path: '',
    component: ChiefDashboardComponent,
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
        path: 'offers/create',
        loadComponent: () => import('./offers/offer-form.component').then(m => m.OfferFormComponent)
      },
      {
        path: 'offers/:id',
        loadComponent: () => import('./offers/offer-detail.component').then(m => m.OfferDetailComponent)
      },
      {
        path: 'offers/:id/edit',
        loadComponent: () => import('./offers/offer-form.component').then(m => m.OfferFormComponent)
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
        path: 'rankings',
        loadComponent: () => import('./rankings/rankings.component').then(m => m.RankingsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  }
];
