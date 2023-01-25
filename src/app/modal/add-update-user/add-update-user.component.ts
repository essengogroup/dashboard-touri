import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {Root} from "../../model/root";

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit ,OnDestroy{
  userForm!:FormGroup;
  user!:User;
  action:string ='';
  constructor(
    private userSerice:UserService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {}

  ngOnInit(): void {
    this.user = this.config.data.user;
    this.action = this.config.data.action;
    if(this.action==='update'){
      this.userForm = this.formBuilder.group({
        lastname: [this.user.full_name.split(' ')[0], Validators.required],
        firstname: [this.user.full_name.split(' ')[1], Validators.required],
        address: [this.user.address],
        phone: [this.user.phone],
        email: new FormControl({value: this.user.email, disabled: true}, Validators.required),
        password: [''],
        password_confirmation: [''],
      });
    }

    if(this.action==='add'){
      this.userForm = this.formBuilder.group({
        lastname: ['', Validators.required],
        firstname: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
      });
    }
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
    this.user.password = this.userForm.value.password;

    if(this.action==='update'){
      this.userSerice.updateUser(this.user).subscribe((res:Root<User>) => this.ref.close(res.data));
    }

    if(this.action==='add'){
      this.user.email = this.userForm.value.email;
      this.userSerice.createUser(this.user).subscribe((res:Root<User>) => this.ref.close(res.data));
    }
  }

  get lastname(){
    return this.userForm.get('lastname');
  }
  get firstname(){
    return this.userForm.get('firstname');
  }
  get address(){
    return this.userForm.get('address');
  }
  get phone(){
    return this.userForm.get('phone');
  }
  get email(){
    return this.userForm.get('email');
  }
  get password(){
    return this.userForm.get('password');
  }
  get password_confirmation(){
    return this.userForm.get('password_confirmation');
  }


}
