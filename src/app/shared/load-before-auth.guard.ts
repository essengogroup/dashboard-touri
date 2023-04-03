import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadBeforeAuthGuard implements CanLoad {

  constructor(private authService:AuthService, private router: Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (!this.authService.isAdmin) {
        this.router.navigate(['sign-in']);
        return false;
      }
    return true;
  }
}
