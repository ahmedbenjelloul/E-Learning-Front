import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CoursComponent } from './admin/cours/cours.component';

const routes: Routes = [ { path: 'admin/dashboard', component: DashboardComponent },

  { path: 'admincours', component: CoursComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
