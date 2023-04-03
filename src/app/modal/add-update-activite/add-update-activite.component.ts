import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ActiviteService} from "../../service/activite.service";
import {Activite} from "../../model/activite";
import {MessageService} from "primeng/api";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import { FileUpload } from 'src/app/model/file-upload';

@Component({
  selector: 'app-add-update-activite',
  templateUrl: './add-update-activite.component.html',
  styleUrls: ['./add-update-activite.component.css']
})
export class AddUpdateActiviteComponent implements OnInit {
  activiteForm!:FormGroup;
  activite!:Activite;
  action:string =""
  file:FileUpload[] = [];

  constructor(
    private activiteService:ActiviteService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService:MessageService,
  ) {

  }

  ngOnInit(): void {

    this.activite = this.config.data.activite;
    this.action = this.config.data.action;

    if (this.action === "add"){
      this.activiteForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['']
      });
    }

    if (this.action==="update"){
      this.activiteForm = this.formBuilder.group({
        name: [this.activite.name, [Validators.required]],
        description: [this.activite.description],
        path: [this.activite.image_path],
      });
    }

  }

  onSubmit() {
    if (!this.activiteForm.valid) {
      this.messageService.add({severity:'info', summary:'Info', detail:`Certains champ du formulaire sont vide.`})
      return
    }
    this.activite.name = this.activiteForm.value.name;
    this.activite.description = this.activiteForm.value.description;

    if (this.action==="add"){
      this.activite.image_path = this.file.length == 0?"null":this.file[0].file;

      this.activiteService.createActivite(this.activite).subscribe(
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
              if(event.status==200){
                this.messageService.add({severity:'success', summary:'Succès', detail:'Cette activité a été créer avec succès'});
                this.ref.close();
              }
              if(event.statusText!== 'OK'){
                this.messageService.add({severity:'error', summary:'Erreur', detail:'Cette activité existe déjà'})
              }
          }
        })
    }

    if (this.action==="update"){
      this.activite.image_path =this.file.length==0?this.activite.image_path:this.file[0].file;

      this.activiteService.updateActivite(this.activite).subscribe(
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
              if(event.status==200){
                this.messageService.add({severity:'success', summary:'Succès', detail:'Cette activité a été modifier avec succès'});
                this.ref.close();
              }
              if(event.statusText!== 'OK'){
                this.messageService.add({severity:'error', summary:'Erreur', detail:'Cette activité existe déjà'})
              }
          }
        })
    }

  }

  getFile($event: any[]) {
    this.file = $event
  }

  get name() {
    return this.activiteForm.get('name');
  }

  get description() {
    return this.activiteForm.get('description');
  }
}
