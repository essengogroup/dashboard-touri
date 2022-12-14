import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{

  loginForm:FormGroup;
  subscription : Subscription;
  aliases : string[] = ['email','password'];

  constructor(private formBuilder:FormBuilder, private authService:AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    });

    this.subscription= new Subscription();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if(!this.loginForm.valid){
      return;
    }
    this.subscription=this.authService.signIn(this.loginForm.value.email,this.loginForm.value.password);
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
}
