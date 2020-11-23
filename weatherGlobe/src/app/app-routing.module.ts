import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SearchPlaceComponent } from './search-place/search-place.component';


const routes: Routes = [
    {path: '', redirectTo: 'logged', pathMatch: 'full'},
    { path: "logged", component: MainDashboardComponent },
    { path: "search", component: SearchPlaceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
