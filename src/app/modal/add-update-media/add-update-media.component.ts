import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MediaService} from "../../service/media.service";
import {Media} from "../../model/media";
import {SiteService} from "../../service/site.service";
import {Site} from "../../model/site";
import {Subscription} from "rxjs";
import {Root} from "../../model/root";
import { HttpResponse } from '@angular/common/http';
import {MessageService} from "primeng/api";
import { FileUpload } from 'src/app/model/file-upload';

@Component({
  selector: 'app-add-update-media',
  templateUrl: './add-update-media.component.html',
  styleUrls: ['./add-update-media.component.css']
})
export class AddUpdateMediaComponent implements OnInit ,OnDestroy{
  mediaForm!:FormGroup;
  media!:Media;
  action: string = '';
  sites:Site[]=[]
  subscription : Subscription = new Subscription()

  file:FileUpload[] = [];

  constructor(
    private mediaService:MediaService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private siteService:SiteService,
    private messageService:MessageService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.siteService.getSites().subscribe((res:Root<Site[]>)=>this.sites=res.data))

    this.media = this.config.data.media;
    this.action = this.config.data.action;

    if (this.action === 'add') {
      this.mediaForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        is_main: [false, [Validators.required]],
        site: ['', [Validators.required]]
      })
    }


  }

  ngOnDestroy() {
    this.ref.close();
    this.subscription.unsubscribe()
  }

  onSubmit() {
    if (!this.mediaForm.valid) {
      return
    }

    this.media.site_id=this.mediaForm.value.site.id
    this.media.type = this.mediaForm.value.type.name;
    this.media.name = this.mediaForm.value.name;
    this.media.is_main = this.mediaForm.value.is_main;

    if (this.action === 'add') {
      this.media.path = this.file.length == 0?"null":this.file[0].file;
      this.mediaService.createMedia(this.media).subscribe({
        next:(res)=>{
          if(res instanceof HttpResponse){
            if(res.status==200){
              this.messageService.add({severity:'success', summary:'Succès', detail:'Le Media a été créer avec succès'});
              this.ref.close();
            }
            if(res.statusText!== 'OK'){
              this.messageService.add({severity:'error', summary:'Erreur', detail:'Un problème est survenu lors de la création du media'})
            }
          }
        },
        error:(err)=>console.error(err)
      })
    }
  }

  getFile($event: any[]) {
    this.file = $event
  }

  get name() {
    return this.mediaForm.get('name');
  }

  get type() {
    return this.mediaForm.get('type');
  }

  get is_main() {
    return this.mediaForm.get('is_main');
  }
  get site_id() {
    return this.mediaForm.get('site');
  }
}
