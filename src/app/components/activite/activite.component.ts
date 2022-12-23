import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Root} from "../../model/root";
import {Activite} from "../../model/activite";
import {ActiviteService} from "../../service/activite.service";
import {Departement} from "../../model/departement";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {AddUpdateActiviteComponent} from "../../modal/add-update-activite/add-update-activite.component";

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

  constructor(
    private activiteService: ActiviteService,
    private dialogService: DialogService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.activites$ = this.activiteService.getActivites().pipe(tap((res: Root<Activite[]>) => this.activites = res.data));
  }

  show(activite: Activite = {} as Activite) {
    this.ref = this.dialogService.open(AddUpdateActiviteComponent, {
      header: 'Activites',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: activite
    });

    this.ref.onClose.subscribe((res) => {
      console.log(res);
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
}
