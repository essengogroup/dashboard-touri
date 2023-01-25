import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Media} from "../../model/media";
import {MediaService} from "../../service/media.service";
import {Root} from "../../model/root";
import {Departement} from "../../model/departement";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {AddUpdateMediaComponent} from "../../modal/add-update-media/add-update-media.component";
import {NavigationService} from "../../shared/navigation.service";

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

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  displayCustom: boolean=false;
  activeIndex: number = 0;
  itemsPerPage : number = 12;
  p: number = 1;

  constructor(
    private mediaService:MediaService,
    private messageService:MessageService,
    private dialogService:DialogService,
    public navigationService:NavigationService
  ) { }

  ngOnInit(): void {
    this.fetchMedias();
  }

  fetchMedias() {
    this.media$ = this.mediaService.getMedias().pipe(tap((res:Root<Media[]>) => this.medias = res.data));
    this.subscription.add(this.mediaService.getMedias().subscribe((res:Root<Media[]>) => this.medias = res.data));
  }


  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
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
