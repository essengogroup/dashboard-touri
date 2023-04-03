import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Root} from "../../model/root";
import {Activite} from "../../model/activite";
import {ActiviteService} from "../../service/activite.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {AddUpdateActiviteComponent} from "../../modal/add-update-activite/add-update-activite.component";
import {NavigationService} from "../../shared/navigation.service";
import {Departement} from "../../model/departement";

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit , OnDestroy {

  activites$!: Observable<Root<Activite[]>>;
  subscription: Subscription = new Subscription();
  activites: Activite[] = [];

  ref!: DynamicDialogRef;

  p: number = 1;
  itemsPerPage:number = 5

  constructor(
    private activiteService: ActiviteService,
    private dialogService: DialogService,
    private messageService: MessageService,
    public navigationService:NavigationService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit(): void {
    this.fetchActivite()
  }

  fetchActivite(){
    this.activites$ = this.activiteService.getActivites();
    this.subscription.add(this.activiteService.getActivites().subscribe((res:Root<Activite[]>)=>{
      this.activites = res.data
    }))
  }

  show(activite: Activite = {} as Activite,action:string = "add") {
    this.ref = this.dialogService.open(AddUpdateActiviteComponent, {
      header: 'Activites',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: {activite, action}
    });

    this.ref.onClose.subscribe((res) => {
      this.ngOnInit();
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}`});
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.subscription.unsubscribe();
  }

  confirmDelete(activite: Activite) {
    this.confirmationService.confirm({
      message: `Voulez-vous supprimer l'activite ${activite.name}?`,
      header: 'Confirmer la suppression',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.activiteService.deleteActivite(activite.id).subscribe((res:Root<Departement>)=>{
          this.fetchActivite()
          this.messageService.add({severity:'success', summary: 'Succès', detail: `L'activité ${activite.name} a été supprimé avec succès`});
        })
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
}
