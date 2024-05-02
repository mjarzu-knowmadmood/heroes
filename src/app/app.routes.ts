import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./features/heroes/routes').then((m) => m.HEROES_ROUTES),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
