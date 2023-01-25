import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Root} from "../../model/root";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {AddUpdateUserComponent} from "../../modal/add-update-user/add-update-user.component";
import {NavigationService} from "../../shared/navigation.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit,OnDestroy {
  users$!:Observable<Root<User[]>>;
  subscription:Subscription=new Subscription();
  users:User[]=[];
  ref!: DynamicDialogRef;

  p: number = 1;
  itemsPerPage:number = 5

  constructor(
    private userService:UserService,
    private messageService:MessageService,
    private dialogService:DialogService,
    private confirmationService: ConfirmationService,
    public navigationService:NavigationService
    ) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers() {
    this.users$=this.userService.getUsers();
    this.subscription.add(this.users$.subscribe((res:Root<User[]>)=>this.users=res.data));
  }

  show(user: User={} as User, action: string='add') {
    this.ref = this.dialogService.open(AddUpdateUserComponent, {
      header: 'Utilisateurs',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true,
      data: {user,action}
    });

    this.ref.onClose.subscribe((res) => {
      this.fetchUsers()
      console.log(res);
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
    });
  }

  confirmDelete(user:User) {
    this.confirmationService.confirm({
      message: `Voulez-vous supprimer l'utilisateur ${user.full_name}?`,
      header: 'Confirmer la suppression',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe({
          next: (res: Root<User>) => {

            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: `${user.full_name} a été supprimé`,
            });
            this.users$ = this.userService.getUsers();
            this.subscription.add(this.users$.subscribe((res: Root<User[]>) => this.users = res.data));
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${user.full_name} n'a pas été supprimé`,
              life: 3000
            });

            console.log(err);
          }
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

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.subscription.unsubscribe();
  }
}
