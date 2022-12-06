import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full' },
  {path:'index',redirectTo:'/'},
  {path:'',title:'home',component:AppComponent,
    children:[
      {path:'dashboard',title:'dashboard',component:DashboardComponent},
      {path:'sign-in',title:'sign-in',component:LoginComponent},
      {path:'signup',title:'register',component:RegisterComponent},
      {path:'profile',title:'profile',component:ProfileComponent},
      {path:'**',title:'not found',component:NotFoundComponent}
    ]
  },
  {path:'not-found',title:'not-found',component:NotFoundComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
