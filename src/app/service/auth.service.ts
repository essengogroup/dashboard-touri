import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { User} from "../model/user";
import {Router} from "@angular/router";
import {catchError, Observable, Subscription, throwError} from "rxjs";
import {Root} from "../model/root";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly BASE_URL = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,public router: Router) { }

  signUp(user: User): Subscription {
    let api = `${this.BASE_URL}/register`;
    return this.httpClient.post<Root<User>>(api, user)
      .pipe(catchError(this.handleError))
      .subscribe((res:any) => {
        localStorage.setItem('access_token', res.token!);
        this.getUserProfile(res.user.id).subscribe((res:Root<User>) => {
          this.currentUser = res;
          console.log(this.currentUser);
          this.router.navigate(['profile']).then(() => {});
        });
    });
  }

  signIn(email:string,password:string) : Subscription {
    const user = {email, password}

    return this.httpClient.post<Root<User>>(`${this.BASE_URL}/login`, user)
      .subscribe((res:any) => {
          localStorage.setItem('access_token', res.token!);
          this.getUserProfile(res.user.id).subscribe((res:Root<User>) => {
            this.currentUser = res;
            console.log(this.currentUser);
            this.router.navigate(['profile']).then(() => {});
          });
        }
      );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['sign-in']).then(() => {});
    }
  }
  // User profile
  getUserProfile(id: number): Observable<Root<User>> {
    let api = `${this.BASE_URL}/user/${id}`;
    return this.httpClient.get<Root<User>>(api, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
