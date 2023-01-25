import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {NavigationService} from "../../shared/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchText:string = '';
  constructor(
    public authService:AuthService,
    public navigationService:NavigationService
  ) { }

  ngOnInit(): void {
  }

  onSearch($event: string) {
    this.searchText = $event;
    this.navigationService.searchText = this.searchText;
  }


}
