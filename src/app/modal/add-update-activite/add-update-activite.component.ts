import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ActiviteService} from "../../service/activite.service";
import {Activite} from "../../model/activite";

@Component({
  selector: 'app-add-update-activite',
  templateUrl: './add-update-activite.component.html',
  styleUrls: ['./add-update-activite.component.css']
})
export class AddUpdateActiviteComponent implements OnInit {
  activiteForm:FormGroup;
  activite:Activite;
  alias:string[] = ['name', 'description'];
  constructor(
    private activiteService:ActiviteService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.activiteForm = formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });
    this.activite = this.config.data;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.activiteForm.valid) {
      return
    }
    this.activite.name = this.activiteForm.value.name;
    this.activite.description = this.activiteForm.value.description;

    console.log(this.activite);
  }

  getFile($event: any[]) {
    console.log($event);
  }
}
