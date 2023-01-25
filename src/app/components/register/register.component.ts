import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  registerForm:FormGroup;
  subscription:Subscription;

  constructor(private formBuilder:FormBuilder, private authService:AuthService) {
    this.registerForm = this.formBuilder.group({
      lastName: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      password_confirmation: ['',[Validators.required]]
    });
    this.subscription= new Subscription();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if(!this.registerForm.valid){
      return;
    }

    const user : User={
      lastName: this.registerForm.value.lastName,
      firstName: this.registerForm.value.firstName,
      full_name: this.registerForm.value.lastName+' '+this.registerForm.value.firstName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      password_confirmation: this.registerForm.value.password_confirmation,
    } as User;

  this.subscription=this.authService.signUp(user);
}

  get lastName() { return this.registerForm.get('lastName'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get password_confirmation() { return this.registerForm.get('password_confirmation'); }

}
