import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardMainPageComponent } from './pages/dashboard-main-page/dashboard-main-page.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardMainPageComponent },
    ]),
  ],
})
export class DashboardModule {}
