import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Root} from "../../model/root";
import {Site} from "../../model/site";
import {SiteService} from "../../service/site.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {AddUpdateSiteComponent} from "../../modal/add-update-site/add-update-site.component";
import {NavigationService} from "../../shared/navigation.service";
import {Departement} from "../../model/departement";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit,OnDestroy {
  site$!:Observable<Root<Site[]>>;
  subscription:Subscription=new Subscription();
  sites:Site[]=[];
  ref!: DynamicDialogRef;

  p: number = 1;
  itemsPerPage:number = 5

  constructor(
    private siteService:SiteService,
    private messageService:MessageService,
    private dialogService:DialogService,
    private confirmationService: ConfirmationService,
    public navigationService:NavigationService
  ) { }

  ngOnInit(): void {
    this.fetchSites()
  }

  fetchSites() {
    this.site$=this.siteService.getSites()
    this.subscription.add(this.siteService.getSites().subscribe((res:Root<Site[]>)=>this.sites=res.data));
  }

  show(site: Site={} as Site, action: string='add') {
    this.ref = this.dialogService.open(AddUpdateSiteComponent, {
      header: 'Sites',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: {site,action}
    });

    this.ref.onClose.subscribe((res) => {
      console.log(res);
      this.fetchSites()
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

  confirmDelete(site: Site) {
    this.confirmationService.confirm({
      message: `Voulez-vous supprimer le site ${site.name}?`,
      header: 'Confirmer la suppression',
      icon: 'pi pi-info-circle',
      accept: () => {
       this.siteService.deleteSite(site.id).subscribe((res:Root<Site>)=>{
          this.messageService.add({severity:'success', summary:'Succès', detail:'Site supprimé avec succès'});
          this.fetchSites();
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
