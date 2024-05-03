import { Route } from '@angular/router';

export const HEROES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/heroes-admin/heroes-admin.component').then(
        (m) => m.HeroesAdminComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/hero-upsert/hero-upsert.component').then(
        (m) => m.HeroUpsertComponent
      ),
  },
  {
    path: 'update/:heroId',
    loadComponent: () =>
      import('./pages/hero-upsert/hero-upsert.component').then(
        (m) => m.HeroUpsertComponent
      ),
  },
];
