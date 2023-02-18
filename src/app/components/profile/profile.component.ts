import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {Root} from "../../model/root";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  subscription : Subscription = new Subscription();
  uuid:number=1;

  profileForm:FormGroup= new FormGroup<any>({});
  public user:any;

  aliases:string[]=['lastName','firstName','address','phone'];
  currentUser:User={} as User;

  isVisibilbleForm:boolean = false

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {

    this.currentUser = this.authService.currentUserValue;

    this.profileForm=this.formBuilder.group({
      lastName:[this.currentUser.full_name.split(' ')[0],[Validators.required]],
      firstName:[this.currentUser.full_name.split(' ')[1],[Validators.required]],
      address:[this.currentUser.address],
      phone:[this.currentUser.phone]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit():void{
    if(!this.profileForm.valid){
      return;
    }

    console.log(this.profileForm.value);

    const user : User={
      id:this.currentUser.id,
      full_name: this.profileForm.value.lastName+' '+this.profileForm.value.firstName,
      address: this.profileForm.value.address,
      phone: this.profileForm.value.phone,
    } as User;

    this.userService.updateUser(user).subscribe({
      next: (data:Root<User>)=>{
        console.log(data);
        this.onShowForm()
      }
    });

  }

  onShowForm(){
    this.isVisibilbleForm = !this.isVisibilbleForm
  }

  get lastName(){
    return this.profileForm.get('lastName')
  }
  get firstName(){
    return this.profileForm.get('firstName')
  }
  get address(){
    return this.profileForm.get('address')
  }
  get phone(){
    return this.profileForm.get('phone')
  }

}
