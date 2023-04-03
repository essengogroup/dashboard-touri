import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./shared/auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { LoadBeforeAuthGuard } from './shared/load-before-auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'sign-in',title:'login',component:LoginComponent},
  {path:'sign-up',title:'register',component:RegisterComponent},
  {path:'dashboard',title:'home',component:DashboardComponent,canActivate: [AuthGuard], canLoad:[LoadBeforeAuthGuard],
    children:[
      {path:'',title:'dashboard',loadChildren: () => import('./module/dashboard/dashboard.module').then(m => m.DashboardModule)},
    ]
  },
  {path:'not-found',title:'not-found',component:NotFoundComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers:[AuthGuard,LoadBeforeAuthGuard]
})
export class AppRoutingModule { }
