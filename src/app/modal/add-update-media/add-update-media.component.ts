import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MediaService} from "../../service/media.service";
import {Media} from "../../model/media";
import {SiteService} from "../../service/site.service";
import {Site} from "../../model/site";
import {Subscription} from "rxjs";
import {Root} from "../../model/root";

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

  file:any[] = [];

  constructor(
    private mediaService:MediaService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private siteService:SiteService
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
      this.media.path = this.file.length == 0?"null":this.file[0].src;
      this.mediaService.createMedia(this.media).subscribe({
        next:(res)=>{
          console.log("Res ==>",res)
          this.ref.close();
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
