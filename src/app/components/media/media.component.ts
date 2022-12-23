import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Media} from "../../model/media";
import {MediaService} from "../../service/media.service";
import {Root} from "../../model/root";
import {Departement} from "../../model/departement";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {AddUpdateMediaComponent} from "../../modal/add-update-media/add-update-media.component";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit,OnDestroy {
  media$!: Observable<Root<Media[]>>;
  subscription:Subscription=new Subscription();
  medias: Media[] = [];
  ref!: DynamicDialogRef;
  constructor(
    private mediaService:MediaService,
    private messageService:MessageService,
    private dialogService:DialogService
  ) { }

  ngOnInit(): void {
    this.media$ = this.mediaService.getMedias().pipe(tap((res:Root<Media[]>) => this.medias = res.data));
  }

  show(media: Media={} as Media) {
    this.ref = this.dialogService.open(AddUpdateMediaComponent, {
      header: 'Medias',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: media
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
