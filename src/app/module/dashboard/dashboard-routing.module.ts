import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "../../components/profile/profile.component";
import {HomeComponent} from "../../components/home/home.component";

const routes: Routes = [
  {path:'',title:'dashboard-home',component:HomeComponent},
  {path:'profile',title:'profile',component:ProfileComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
