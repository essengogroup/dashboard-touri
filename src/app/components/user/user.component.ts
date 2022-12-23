import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Root} from "../../model/root";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {AddUpdateUserComponent} from "../../modal/add-update-user/add-update-user.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {
  users$!:Observable<Root<User[]>>;
  subscription:Subscription=new Subscription();
  users:User[]=[];
  ref!: DynamicDialogRef;
  constructor(
    private userService:UserService,
    private messageService:MessageService,
    private dialogService:DialogService
    ) { }

  ngOnInit(): void {
    this.users$=this.userService.getUsers().pipe(tap((res:Root<User[]>)=>this.users=res.data));
  }

  show(user: User={} as User) {
    this.ref = this.dialogService.open(AddUpdateUserComponent, {
      header: 'Utilisateurs',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: user
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
