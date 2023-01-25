import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "../../components/profile/profile.component";
import {HomeComponent} from "../../components/home/home.component";
import {DepartementComponent} from "../../components/departement/departement.component";
import {MediaComponent} from "../../components/media/media.component";
import {UserComponent} from "../../components/user/user.component";
import {ReservationComponent} from "../../components/reservation/reservation.component";
import {SiteComponent} from "../../components/site/site.component";
import {ActiviteComponent} from "../../components/activite/activite.component";
import {OthersComponent} from "../../components/others/others.component";

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',title:'dashboard-home',component:HomeComponent},
  {path:'user',title:'user',component:UserComponent},
  {path:'departement',title:'departement',component:DepartementComponent},
  {path:'site',title:'site',component:SiteComponent},
  {path:'activite',title:'activite',component:ActiviteComponent},
  {path:'media',title:'media',component:MediaComponent},
  {path:'reservation',title:'reservation',component:ReservationComponent},
  {path:'profile',title:'profile',component:ProfileComponent},
  {path:'others',title:'others',component:OthersComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
