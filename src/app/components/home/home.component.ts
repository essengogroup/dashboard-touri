import { RoleEnum } from './../../model/role-enum';
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
import {Site} from "../../model/site";
import {SiteService} from "../../service/site.service";
import {Status} from "../../model/status";
import {NavigationService} from "../../shared/navigation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  users$!:Observable<Root<User[]>>;
  activites$!:Observable<Root<Activite[]>>;
  departement$!:Observable<Root<Departement[]>>;
  media$!:Observable<Root<Media[]>>;
  reservation$!:Observable<Root<Reservation[]>>;
  site$!:Observable<Root<Site[]>>;
  subscription:Subscription=new Subscription();

  users:User[]=[];
  activites:Activite[]=[];
  departements:Departement[]=[];
  medias:Media[]=[];
  reservations:Reservation[]=[];
  sites:Site[]=[];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService,
    private activiteService:ActiviteService,
    private departementService:DepartementService,
    private mediaService:MediaService,
    private reservationService:ReservationService,
    private siteService:SiteService,
    public navigationService:NavigationService
  ) { }

  ngOnInit(): void {
    this.users$=this.userService.getUsers().pipe(tap((res:Root<User[]>)=>this.users=res.data.slice(0,5)));
    this.activites$=this.activiteService.getActivites().pipe(tap((res:Root<Activite[]>)=>this.activites=res.data));
    this.departement$=this.departementService.getDepartements().pipe(tap((res:Root<Departement[]>)=>this.departements=res.data.slice(0,5)));
    this.media$=this.mediaService.getMedias().pipe(tap((res:Root<Media[]>)=>this.medias=res.data));
    this.reservation$=this.reservationService.getReservations().pipe(tap((res:Root<Reservation[]>)=>this.reservations=res.data.slice(0,5)));
    this.site$=this.siteService.getSites().pipe(tap((res:Root<Site[]>)=>this.sites=res.data.slice(0,5)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToAnotherPage(page_name:string):void{
    this.router.navigate(['dashboard',page_name]).then(()=>{});
  }

  getClass(status:string) {
    let style ={};
    switch (status) {
      case Status.PENDING:
        style = {'bg-indigo-50 text-indigo-600':true}
        break
      case Status.ACCEPTED:
        style = {'bg-green-50 text-green-600':true}
        break
      case Status.REFUSED:
        style = {'bg-red-50 text-red-600':true}
        break
      case Status.CANCELED:
        style = {'bg-orange-50  text-orange-600':true}
        break
      default:
        style={'bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600':true}
    }
    return style;
  }
  
  getRoleClass(status:string) {
    let style ={};
    switch (status) {
      case RoleEnum.ADMIN:
        style = {'bg-indigo-50 text-indigo-600':true}
        break
      case RoleEnum.USER:
        style = {'bg-green-50 text-green-600':true}
        break
      default:
        style={'bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600':true}
    }
    return style;
  }

}
