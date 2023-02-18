import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Root} from "../../model/root";
import {Reservation} from "../../model/reservation";
import {ReservationService} from "../../service/reservation.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {AddUpdateReservationComponent} from "../../modal/add-update-reservation/add-update-reservation.component";
import {NavigationService} from "../../shared/navigation.service";
import {Status} from "../../model/status";

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
    public navigationService:NavigationService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.fetchReservations()
  }

  fetchReservations() {
    this.reservation$=this.reservationService.getReservations();
    this.subscription.add(this.reservationService.getReservations().subscribe((res:Root<Reservation[]>)=>{
      this.reservations=res.data
      console.log(res.data)
    }));
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
      this.fetchReservations()
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

  onValidateReservation(reservation:Reservation) {

    this.confirmationService.confirm({
      message: `Voulez-vous accepter la réservation de ${reservation.user.full_name}?`,
      header: 'Confirmer votre choix',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.subscription.add(this.reservationService.validateReservation(reservation.id).subscribe({
          next:(res)=>{
            this.messageService.add({severity:'success', summary:'Succès', detail:'La réservation a bien été acceptée.'});
            this.fetchReservations()
          },
          error:(err)=>console.error(err)
        }))
      },
      reject: (type:any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Annulation', detail:'Vous avez annuler la suppression'});
            break;
        }
      }
    });
  }

  onCancelReservation(reservation:Reservation) {
    this.confirmationService.confirm({
      message: `Voulez-vous annuler la réservation de ${reservation.user.full_name}?`,
      header: 'Confirmer votre choix',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.subscription.add(this.reservationService.cancelReservation(reservation.id).subscribe({
          next:(res)=>{
            this.messageService.add({severity:'success', summary:'Succès', detail:'La réservation a bien été annulée.'});
            this.fetchReservations()
          },
          error:(err)=>console.error(err)
        }))
      },
      reject: (type:any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Annulation', detail:'Vous avez annuler la suppression'});
            break;
        }
      }
    });
  }

  onRefuseReservation(reservation:Reservation) {

    this.confirmationService.confirm({
      message: `Voulez-vous refuser la réservation de ${reservation.user.full_name}?`,
      header: 'Confirmer votre choix',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.subscription.add(this.reservationService.refuseReservation(reservation.id).subscribe({
          next:(res)=>{
            this.messageService.add({severity:'success', summary:'Succès', detail:'La réservation a bien été réfusée.'});
            this.fetchReservations()
          },
          error:(err)=>console.error(err)
        }))
      },
      reject: (type:any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Annulation', detail:'Vous avez annuler la suppression'});
            break;
        }
      }
    });

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
}
