import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Root} from "../../model/root";
import {Site} from "../../model/site";
import {SiteService} from "../../service/site.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {AddUpdateSiteComponent} from "../../modal/add-update-site/add-update-site.component";

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
  constructor(
    private siteService:SiteService,
    private messageService:MessageService,
    private dialogService:DialogService
  ) { }

  ngOnInit(): void {
    this.site$=this.siteService.getSites().pipe(tap((res:Root<Site[]>)=>this.sites=res.data));
  }

  show(site: Site={} as Site) {
    this.ref = this.dialogService.open(AddUpdateSiteComponent, {
      header: 'Sites',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: site
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

}
