import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './pages/heroes-page/heroes-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroUpsertComponent } from './components/hero-upsert/hero-upsert.component';

const routes: Routes = [
  { path: '', component: HeroesListComponent },
  { path: 'add', component: HeroUpsertComponent },
  { path: 'update/:id', component: HeroUpsertComponent },
];

@NgModule({
  declarations: [],
  imports: [HttpClientModule, RouterModule.forChild(routes)],
})
export class HeroesModule {}
