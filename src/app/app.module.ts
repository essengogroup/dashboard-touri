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
import { AddUpdateUserComponent } from './modal/add-update-user/add-update-user.component';
import { AddUpdateSiteComponent } from './modal/add-update-site/add-update-site.component';
import { AddUpdateReservationComponent } from './modal/add-update-reservation/add-update-reservation.component';
import { AddUpdateMediaComponent } from './modal/add-update-media/add-update-media.component';
import { AddUpdateActiviteComponent } from './modal/add-update-activite/add-update-activite.component';
import { SidebarComponent } from './components-models/sidebar/sidebar.component';
import { OthersComponent } from './components/others/others.component';
import { TruncatePipe } from './shared/truncate.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipe } from './shared/filter.pipe';
import { LoadBeforeAuthGuard } from './shared/load-before-auth.guard';
import { AuthGuard } from './shared/auth.guard';
import {ProgressBarModule} from 'primeng/progressbar';

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
    UserModelComponent,
    AddUpdateUserComponent,
    AddUpdateSiteComponent,
    AddUpdateReservationComponent,
    AddUpdateMediaComponent,
    AddUpdateActiviteComponent,
    SidebarComponent,
    OthersComponent,
    TruncatePipe,
    FilterPipe
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
        NgxPaginationModule,
        ProgressBarModule
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
