import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit ,OnDestroy{
  userForm:FormGroup;
  user:User;
  alias:string[] = ['lastname', 'firstname', 'address', 'phone', 'email', 'password', 'password_confirmation'];
  constructor(
    private userSerice:UserService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.userForm = this.formBuilder.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      address: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.user = this.config.data;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return
    }

    this.user.full_name = this.userForm.value.lastname + ' ' + this.userForm.value.firstname;
    this.user.address = this.userForm.value.address;
    this.user.phone = this.userForm.value.phone;
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;

    console.log(this.user);
  }


}
