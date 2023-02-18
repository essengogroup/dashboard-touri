import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Departement} from "../../model/departement";
import {DepartementService} from "../../service/departement.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-update-departement',
  templateUrl: './add-update-departement.component.html',
  styleUrls: ['./add-update-departement.component.css']
})
export class AddUpdateDepartementComponent implements OnInit,OnDestroy {

  departementForm!:FormGroup;
  action:string ='';
  departement!:Departement;
  file:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private departementService:DepartementService,
    private messageService:MessageService,
  ) {}


  ngOnInit(): void {
    this.departement = this.config.data.departement;
    this.action = this.config.data.action;

    if(this.action==='update'){
      this.departementForm = this.formBuilder.group({
        name: [this.departement.name, Validators.required],
        description: [this.departement.description, Validators.required],
        image_path: [this.departement.image_path],
      });
    }

    if(this.action==='add'){
      this.departementForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]]
      });
    }
  }

  ngOnDestroy() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.departementForm.valid) {
      this.messageService.add({severity:'info', summary:'Info', detail:`Certains champ du formulaire sont vide.`})
      return;
    }

    this.departement.name = this.departementForm.value.name;
    this.departement.description = this.departementForm.value.description;

    if(this.action==='add'){

      this.departement.image_path = this.file.length == 0?"null":this.file[0].src;

      this.departementService.createDepartement(this.departement).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              let d  = Math.round(event.loaded / event.total! * 100);
              console.log(`Uploaded! ${d}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
          }
        })
    }

    if (this.action === 'update') {

      this.departement.image_path =this.file.length==0?this.departement.image_path:this.file[0].src;

      this.departementService.updateDepartement(this.departement).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              let d  = Math.round(event.loaded / event.total! * 100);
              console.log(`Uploaded! ${d}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
          }
        })
    }
    this.ref.close()
  }

  getFiles($event: any[]) {
    this.file=$event;
  }

  get name() {
    return this.departementForm.get('name');
  }

  get description() {
    return this.departementForm.get('description');
  }

}
