import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {AddUpdateDepartementComponent} from "../../modal/add-update-departement/add-update-departement.component";
import {Departement} from "../../model/departement";
import {Observable, Subscription} from "rxjs";
import {Root} from "../../model/root";
import {DepartementService} from "../../service/departement.service";
import {NavigationService} from "../../shared/navigation.service";

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css'],
})
export class DepartementComponent implements OnInit,OnDestroy {

  ref!: DynamicDialogRef;
  departements: Departement[] = []
  departement$!:Observable<Root<Departement[]>>
  subscription:Subscription=new Subscription();

  p: number = 1;
  itemsPerPage:number = 5

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private departementService:DepartementService,
    public navigationService:NavigationService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.fetchDepartments()
  }

  fetchDepartments() {
    this.departement$= this.departementService.getDepartements();
    this.subscription.add(this.departementService.getDepartements().subscribe((res:Root<Departement[]>)=> this.departements= res.data));
  }

  show(departement: Departement={} as Departement, action: string = 'add') {
    this.ref = this.dialogService.open(AddUpdateDepartementComponent, {
      header: 'Departement',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: {departement, action}
    });

    this.ref.onClose.subscribe((res) => {
      this.fetchDepartments()
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

  confirmDelete(department: Departement) {
    this.confirmationService.confirm({
      message: `Voulez-vous supprimer le departement ${department.name}?`,
      header: 'Confirmer la suppression',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.departementService.deleteDepartement(department.id).subscribe((res:Root<Departement>)=>{
          this.fetchDepartments()
          this.messageService.add({severity:'success', summary: 'Succès', detail: `Le departement ${department.name} a été supprimé avec succès`});
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
