import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user";
import {NavigationService} from "../../shared/navigation.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:User = {} as User;
  constructor(
    private authService:AuthService,
    public navigationService:NavigationService
  ) {
    this.user = this.authService.currentUserValue;
    this.user.profile_picture=this.user.profile_picture??'https://picsum.photos/id/237/200/300'
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.doLogout();
  }


}
