import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if (!this.authService.isLoggedIn) {
      window.alert("Access not allowed!");
      this.router.navigate(['sign-in']).then(() => {}); 
    }

    if(!this.authService.isAdmin){
      window.alert("Access not allowed!");
      this.router.navigate(['sign-in']).then(() => {});
    }

    return true;
  }

}
