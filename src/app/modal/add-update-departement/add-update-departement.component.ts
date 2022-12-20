import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Departement} from "../../model/departement";
import {DepartementService} from "../../service/departement.service";

@Component({
  selector: 'app-add-update-departement',
  templateUrl: './add-update-departement.component.html',
  styleUrls: ['./add-update-departement.component.css']
})
export class AddUpdateDepartementComponent implements OnInit,OnDestroy {

  departementForm:FormGroup;

  aliases:string[] = ['name', 'description'];

  departement:Departement;
  file:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private departementService:DepartementService
  ) {
    this.departement = this.config.data;

    this.departementForm = this.formBuilder.group({
      name: [this.departement.name??'', [Validators.required]],
      description: [this.departement.description??'', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.departementForm.valid) {
      return
    }
    //const {this.file[0].src,...img_file}= this.file[0];
    this.departement.name = this.departementForm.value.name;
    this.departement.description = this.departementForm.value.description;
    //this.departement.image_path =img_file;
  }

  getFiles($event: any[]) {
    this.file=$event;
  }
}
