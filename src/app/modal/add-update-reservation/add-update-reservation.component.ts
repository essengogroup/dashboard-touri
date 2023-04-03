import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../../service/reservation.service";
import {SiteService} from "../../service/site.service";
import {ActiviteService} from "../../service/activite.service";
import {Reservation} from "../../model/reservation";
import {Root} from "../../model/root";
import {Site} from "../../model/site";
import {Subscription} from "rxjs";
import {Activite} from "../../model/activite";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-add-update-reservation',
  templateUrl: './add-update-reservation.component.html',
  styleUrls: ['./add-update-reservation.component.css']
})
export class AddUpdateReservationComponent implements OnInit {
  reservationForm!:FormGroup
  action:string=''
  subscription:Subscription = new Subscription()
  sites:Site[]=[]
  activites:Activite[]=[]
  users:User[]=[]
  siteSelected:Site={} as Site

  reservation:Reservation={} as Reservation

  constructor(
    private formBuilder:FormBuilder,
    private reservationService:ReservationService,
    private siteService:SiteService,
    private activiteService:ActiviteService,
    private config: DynamicDialogConfig,
    private userService:UserService,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.siteService.getSites().subscribe((res:Root<Site[]>)=>this.sites=res.data))
    this.subscription.add(this.userService.getUsers().subscribe((res:Root<User[]>)=>this.users=res.data))

    this.action = this.config.data.action;
    this.reservation = this.config.data.reservation;

    if (this.action==='add'){
      this.reservationForm = this.formBuilder.group({
        user:new FormControl( [], Validators.required),
        siteDate:['',[Validators.required]],
        commentaire:[''],
        nb_personnes:['',[Validators.required]],
        activites:new FormControl( [], Validators.required)
      })
    }

    if (this.action==="update"){
      this.siteSelected = this.reservation.site

      this.reservationForm = this.formBuilder.group({
        user:new FormControl( [...[],this.reservation.user], Validators.required),
        siteDate:new FormControl( this.reservation.site_date, Validators.required),
        commentaire:[this.reservation.commentaire],
        nb_personnes:[this.reservation.nb_personnes,[Validators.required]],
        activites:new FormControl( this.reservation.activites, Validators.required)
      })
    }

  }

  onSubmit(){
    if (!this.reservationForm.valid){
      return
    }
    console.log(this.reservationForm.value, this.siteSelected)
    let currentActivites:number[] = []

    this.reservationForm.value.activites.map((activite:Activite)=>{
      currentActivites = [...currentActivites,activite.id]
    })

    this.reservation.site_id=this.siteSelected.id
    this.reservation.site_date_id=this.reservationForm.value.siteDate.id
    this.reservation.nb_personnes=this.reservationForm.value.nb_personnes
    this.reservation.commentaire=this.reservationForm.value.commentaire
    this.reservation.activites=currentActivites


    this.reservationForm.value.user.map((user:User)=>{
      this.reservation.user_id=user.id
      this.reservationService.createReservation(this.reservation).subscribe({
        next:(res:Root<Reservation>)=>{
          this.messageService.add({severity:'success', summary:'Succès', detail:'La réservation a bien été créer'})
        }
      })
    })

  }

  get user(){
    return this.reservationForm.get('user')
  }

  get siteDate(){
    return this.reservationForm.get('siteDate')
  }

  get commentaire(){
    return this.reservationForm.get('commentaire')
  }

  get nbPersonnes(){
    return this.reservationForm.get('nb_personnes')
  }

  get activite(){
    return this.reservationForm.get('activites')
  }

  onValidateReservation() {
    this.subscription.add(
      this.reservationService.validateReservation(this.reservation.id).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:(err)=>console.error(err)
      }))
  }
  onCancelReservation() {
    this.subscription.add(
      this.reservationService.cancelReservation(this.reservation.id).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:(err)=>console.error(err)
      }))
  }
  onRefuseReservation() {
    this.subscription.add(
      this.reservationService.refuseReservation(this.reservation.id).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:(err)=>console.error(err)
      }))
  }
}
