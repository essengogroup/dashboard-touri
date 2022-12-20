import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {Root} from "../../model/root";
import {Observable, Subscription, tap} from "rxjs";
import {ActiviteService} from "../../service/activite.service";
import {Activite} from "../../model/activite";
import {Departement} from "../../model/departement";
import {DepartementService} from "../../service/departement.service";
import {Media} from "../../model/media";
import {MediaService} from "../../service/media.service";
import {ReservationService} from "../../service/reservation.service";
import {Reservation} from "../../model/reservation";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  users$!:Observable<Root<User[]>>
  departements:Departement[]=[];
  activites$!:Observable<Root<Activite[]>>
  departement$!:Observable<Root<Departement[]>>;
  media$!:Observable<Root<Media[]>>;
  reservation$!:Observable<Root<Reservation[]>>;
  subscription:Subscription=new Subscription();

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService,
    private activiteService:ActiviteService,
    private departementService:DepartementService,
    private mediaService:MediaService,
    private reservationService:ReservationService
  ) { }

  ngOnInit(): void {
    this.users$=this.userService.getUsers();
    this.activites$=this.activiteService.getActivites();
    this.departement$=this.departementService.getDepartements().pipe(tap((data)=>this.departements=data.data));
    this.media$=this.mediaService.getMedias();
    this.reservation$=this.reservationService.getReservations();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToAnotherPage(page_name:string):void{
    this.router.navigate([page_name], {relativeTo:this.route}).then(()=>{});
  }

}
