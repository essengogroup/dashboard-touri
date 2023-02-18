import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SiteService} from "../../service/site.service";
import {Site} from "../../model/site";
import {DepartementService} from "../../service/departement.service";
import {MediaService} from "../../service/media.service";
import {ActiviteService} from "../../service/activite.service";
import {Departement} from "../../model/departement";
import {Subscription} from "rxjs";
import {Root} from "../../model/root";
import {Media} from "../../model/media";
import {Activite} from "../../model/activite";
import {MessageService} from "primeng/api";
import {SiteDateService} from "../../service/site-date.service";
import * as moment from 'moment';
import {SiteDate} from "../../model/site-date";

@Component({
  selector: 'app-add-update-site',
  templateUrl: './add-update-site.component.html',
  styleUrls: ['./add-update-site.component.css']
})
export class AddUpdateSiteComponent implements OnInit {
  site!:Site;
  siteForm!:FormGroup;
  activiteForm!:FormGroup;
  siteDateForm!:FormGroup;
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
    private messageService:MessageService,
    private siteDateService:SiteDateService
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
        departement: [this.site.departement, [Validators.required]],
        activites: new FormControl( this.site.activites, Validators.required),
      })
    }


    if(this.action==='add'){
      this.siteForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: ['', [Validators.required]],
        departement: ['', [Validators.required]],
        activites: new FormControl([],Validators.required)
      })
    }

    console.log(this.site)

    this.activiteForm = this.formBuilder.group({
      activites: new FormControl([],Validators.required),
      price: ['', [Validators.required]],
      type: ['', [Validators.required]]
    })

    this.siteDateForm=this.formBuilder.group({
      date_:['',[Validators.required]],
      start_time:['',[Validators.required]],
      end_time:['',[Validators.required]]
    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.ref.close();
  }

  onSiteDateSubmit(){
    if (!this.siteDateForm.valid){
      return
    }

    if (!this.site.id){
      return;
    }

    const siteDate :SiteDate = this.siteDateForm.value
    siteDate.site_id = this.site.id
    siteDate.date_ = moment(this.siteDateForm.value.date_).format("YYYY-MM-DD")

    this.siteDateService.addDateToSite(siteDate).subscribe({
      next:(res)=>this.messageService.add({severity:'success', summary:'Succès', detail:'Cette date a été ajouté à ce site'}),
      error:(err)=>this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur s\'est produite'})

    })

  }

  onActiviteSubmit(){
    if (!this.activiteForm.valid){
      return
    }

    const activiteFormData = this.activiteForm.value

    activiteFormData.activites.map((activite:Activite)=>{
      this.siteService.addActiviteToSite(this.site.id,activiteFormData.price,activite.id,activiteFormData.type.name)
        .subscribe({
          next: (res) => {},
          error: err => {
            if (err === "Activite already exists"){
              this.messageService.add({severity:'info', summary:'Info', detail:`${activite.name} a déjà été attribué.`})
            }
          },
          complete: () => this.messageService.add({severity:'success', summary:'Succès', detail:'Les activités ont bien été ajouté aux site'})
        })
    })

    this.ngOnInit()

  }

  onSubmit() {
    if (!this.siteForm.valid) {
      return
    }
    console.log(this.siteForm.value);

    this.site.name = this.siteForm.value.name
    this.site.description = this.siteForm.value.description
    this.site.price = this.siteForm.value.price
    this.site.departement = this.siteForm.value.departement

    if (this.action === 'add'){

      this.siteService.createSite(this.site.name,this.site.description,this.site.departement.id,this.site.price)
        .subscribe({
          next: (res:Root<Site>) => {
            this.site = res.data

            this.siteForm.value.activites.map((activiteItem:Activite)=>{
              console.log(activiteItem.id," <==> ",res.data.id)
              this.siteService.addActiviteToSite(res.data.id,this.siteForm.value.price,activiteItem.id)
                .subscribe({
                  next: (res) => console.log("==>",res),
                  error: err => console.log(err)
                })
            })
          }
        })

    }

    if (this.action === 'update'){
      this.site.activites = this.site.activites.filter(activiteItem=>this.siteForm.value.activites.indexOf(activiteItem)<0)

      this.siteService.updateSite(this.site.id,this.site.name,this.site.description,this.site.departement.id,this.site.price)
        .subscribe((res:Root<Site>)=>{
          this.site.activites.map((activite:Activite)=>{
            this.siteService.deleteActiviteToSite(res.data.id,activite.id)
              .subscribe({
                next: (res) => {
                  console.log(res)
                },
                error: err => console.log(err)
              })
          })
      })
    }

    this.ref.close()
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

  get department(){
    return this.siteForm.get('departement')
  }

  get activite(){
    return this.siteForm.get('activites')
  }

  get startDate(){
    return this.siteDateForm.get('date_')
  }

  get startTime(){
    return this.siteDateForm.get('start_time')
  }

  get endTime(){
    return this.siteDateForm.get('end_time')
  }

  confirmDelete(siteDate: SiteDate) {
    this.siteDateService.deleteSiteDate(siteDate.id).subscribe((res:Root<SiteDate>)=>{
      this.messageService.add({severity:'success', summary:'Succès', detail:'Cette date a été retirer de ce site'});
    })
  }
}
