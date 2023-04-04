import { Component } from '@angular/core';
import { NavigationService } from './shared/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard-touri';
  constructor(public navigationService:NavigationService) {}
}
