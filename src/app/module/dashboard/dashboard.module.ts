import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from "primeng/toast";

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToastModule,
    FileUploadModule,
  ],
  providers: [
    DialogService,
    MessageService
  ],
  exports: [
    ToastModule,
    FileUploadModule,
  ]
})
export class DashboardModule { }
