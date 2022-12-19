import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./shared/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'sign-in',title:'login',component:LoginComponent},
  {path:'signup',title:'register',component:RegisterComponent},
  {path:'dashboard',title:'home',component:DashboardComponent,canActivate: [AuthGuard],
    children:[
      {path:'',title:'dashboard',loadChildren: () => import('./module/dashboard/dashboard.module').then(m => m.DashboardModule)},
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
