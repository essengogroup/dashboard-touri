import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {AddUpdateDepartementComponent} from "../../modal/add-update-departement/add-update-departement.component";
import {Departement} from "../../model/departement";

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css'],
})
export class DepartementComponent implements OnInit,OnDestroy {

  ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  show(departement: Departement={} as Departement) {
    this.ref = this.dialogService.open(AddUpdateDepartementComponent, {
      header: 'Choose a Product',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: departement
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
  }

}
