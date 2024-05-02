import { Route } from '@angular/router';

export const HEROES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/heroes-page/heroes-page.component').then(
        (m) => m.HeroesPageComponent
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
    path: 'update/:id',
    loadComponent: () =>
      import('./pages/hero-upsert/hero-upsert.component').then(
        (m) => m.HeroUpsertComponent
      ),
  },
];
