import { Routes } from '@angular/router';
import { DashboardMainPageComponent } from './modules/dashboard/pages/dashboard-main-page/dashboard-main-page.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./modules/heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
