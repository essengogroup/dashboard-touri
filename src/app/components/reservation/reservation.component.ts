import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Root} from "../../model/root";
import {Reservation} from "../../model/reservation";
import {ReservationService} from "../../service/reservation.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {AddUpdateReservationComponent} from "../../modal/add-update-reservation/add-update-reservation.component";
import {NavigationService} from "../../shared/navigation.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit,OnDestroy {

  reservation$!:Observable<Root<Reservation[]>>;
  subscription:Subscription=new Subscription();
  reservations:Reservation[]=[];
  ref!: DynamicDialogRef;
  itemsPerPage: number = 5;
  p: number = 1;
  constructor(
    private reservationService:ReservationService,
    private messageService:MessageService,
    private dialogService:DialogService,
    public navigationService:NavigationService
  ) { }

  ngOnInit(): void {
    this.fetchReservations()
  }

  fetchReservations() {
    this.reservation$=this.reservationService.getReservations();
    this.subscription.add(this.reservationService.getReservations().subscribe((res:Root<Reservation[]>)=>this.reservations=res.data));
  }

  show(reservation: Reservation={} as Reservation,action:string = 'add') {
    this.ref = this.dialogService.open(AddUpdateReservationComponent, {
      header: 'Reservations',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: {reservation,action},
    });

    this.ref.onClose.subscribe((res) => {
      console.log(res);
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.subscription.unsubscribe();
  }

  confirmDelete(reservation: Reservation) {

  }
}
