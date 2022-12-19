import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Observable, Subscription, tap} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {Root} from "../../model/root";
import {data} from "autoprefixer";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  subscription : Subscription;
  uuid:number=1;

  profileForm:FormGroup= new FormGroup<any>({});
  public user:any;

  aliases:string[]=['lastName','firstName','address','phone'];
  currentUser:User={} as User;

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private formBuilder:FormBuilder
  ) {
    this.subscription=new Subscription();
    this.currentUser = this.authService.currentUserValue;

  }

  ngOnInit(): void {
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
      full_name: this.profileForm.value.lastName+' '+this.profileForm.value.firstName,
      address: this.profileForm.value.address,
      phone: this.profileForm.value.phone
    } as User;


  }

}
