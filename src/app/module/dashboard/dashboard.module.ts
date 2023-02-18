import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from "primeng/toast";

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {FileUploadModule} from "primeng/fileupload";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MultiSelectModule} from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import {DropdownModule} from "primeng/dropdown";
import {TabViewModule} from 'primeng/tabview';
import {GalleriaModule} from "primeng/galleria";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from 'primeng/button';
import {RippleModule} from "primeng/ripple";
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToastModule,
    FileUploadModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ChipModule,
    DropdownModule,
    TabViewModule,
    GalleriaModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ProgressSpinnerModule
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService
  ],
  exports: [
    ToastModule,
    FileUploadModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ChipModule,
    DropdownModule,
    TabViewModule,
    GalleriaModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ProgressSpinnerModule
  ]
})
export class DashboardModule { }
