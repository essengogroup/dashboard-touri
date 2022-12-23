import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {DashboardModule} from "./module/dashboard/dashboard.module";
import { HeaderComponent } from './components-models/header/header.component';
import { DepartementComponent } from './components/departement/departement.component';
import { UserComponent } from './components/user/user.component';
import { MediaComponent } from './components/media/media.component';
import { SortPipe } from './shared/sort.pipe';
import { ReservationComponent } from './components/reservation/reservation.component';
import { SiteComponent } from './components/site/site.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ActiviteComponent} from "./components/activite/activite.component";
import {AddUpdateDepartementComponent} from "./modal/add-update-departement/add-update-departement.component";
import {UploadComponent} from "./components-models/upload/upload.component";
import { UserModelComponent } from './components-models/user-model/user-model.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HeaderComponent,
    DepartementComponent,
    UserComponent,
    MediaComponent,
    SortPipe,
    ReservationComponent,
    SiteComponent,
    ActiviteComponent,
    AddUpdateDepartementComponent,
    UploadComponent,
    UserModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DashboardModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
