import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from "primeng/toast";

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {FileUploadModule} from "primeng/fileupload";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToastModule,
    FileUploadModule,
    ConfirmDialogModule
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService
  ],
  exports: [
    ToastModule,
    FileUploadModule,
    ConfirmDialogModule
  ]
})
export class DashboardModule { }
