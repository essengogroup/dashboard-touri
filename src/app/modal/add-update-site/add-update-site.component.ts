import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SiteService} from "../../service/site.service";
import {Site} from "../../model/site";
import {DepartementService} from "../../service/departement.service";
import {MediaService} from "../../service/media.service";
import {ActiviteService} from "../../service/activite.service";
import {Departement} from "../../model/departement";
import {Observable, Subscription} from "rxjs";
import {Root} from "../../model/root";
import {Media} from "../../model/media";
import {Activite} from "../../model/activite";

@Component({
  selector: 'app-add-update-site',
  templateUrl: './add-update-site.component.html',
  styleUrls: ['./add-update-site.component.css']
})
export class AddUpdateSiteComponent implements OnInit {
  site!:Site;
  siteForm!:FormGroup;
  action:string ='';

  departements: Departement[] = []
  medias:Media[] = []
  activites:Activite[]= []
  subscription:Subscription=new Subscription();

  constructor(
    private siteService:SiteService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private departmentService:DepartementService,
    private mediaService:MediaService,
    private activiteService:ActiviteService,
  ) {}

  ngOnInit(): void {

    this.subscription.add(this.departmentService.getDepartements().subscribe((res:Root<Departement[]>)=>this.departements = res.data ))
    this.subscription.add(this.mediaService.getMedias().subscribe((res:Root<Media[]>)=>this.medias = res.data ))
    this.subscription.add(this.activiteService.getActivites().subscribe((res:Root<Activite[]>)=>this.activites = res.data ))

    this.site= this.config.data.site;
    this.action = this.config.data.action;

    if(this.action==='update'){
      this.siteForm = this.formBuilder.group({
        name: [this.site.name, [Validators.required]],
        description: [this.site.description, [Validators.required]],
        price: [this.site.price, [Validators.required]],
        departement_id: [this.site.departement, [Validators.required]],
        media_id: new FormControl( this.site.medias, Validators.required),
        activite_id: new FormControl( this.site.activites, Validators.required),
      })
    }


    if(this.action==='add'){
      this.siteForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: ['', [Validators.required]],
        departement_id: ['', [Validators.required]],
        media_id: new FormControl([],Validators.required),
        activite_id: new FormControl([],Validators.required)
      })
    }
  }


  ngOnDestroy() {
    this.ref.close();
    this.subscription.unsubscribe()
  }

  onSubmit() {
    if (!this.siteForm.valid) {
      return
    }
    console.log(this.siteForm.value);

    this.site.name = this.siteForm.value.name
    this.site.description = this.siteForm.value.description
    this.site.price = this.siteForm.value.price
    this.site.departement = {id:this.siteForm.value.departement_id} as Departement
    this.site.medias = [{id:this.siteForm.value.media_id} as Media] as Media[]
    this.site.activites = [{id:this.siteForm.value.activite_id} as Activite] as Activite[]

    if (this.action === 'add'){
      this.siteService.createSite(this.siteForm.value).subscribe((res:Root<Site>)=>{
        console.log(res)
      })
    }

    if (this.action === 'update'){
      this.siteService.updateSite(this.site).subscribe((res:Root<Site>)=>{
        console.log(res)
      })
    }

    this.ngOnDestroy()
  }

  get name(){
    return this.siteForm.get('name')
  }

  get description(){
    return this.siteForm.get('description')
  }

  get price(){
    return this.siteForm.get('price')
  }

  get media(){
    return this.siteForm.get('media_id')
  }

  get department(){
    return this.siteForm.get('departement_id')
  }

  get activite(){
    return this.siteForm.get('activite_id')
  }

}
