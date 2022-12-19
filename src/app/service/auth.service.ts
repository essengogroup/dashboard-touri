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
  currentUser:User = {} as User;

  constructor(private httpClient: HttpClient,public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
  }

  signUp(user: User): Subscription {
    let api = `${this.BASE_URL}/register`;
    return this.httpClient.post<Root<User>>(api, user)
      .pipe(catchError(this.handleError))
      .subscribe((res:any) => {
        localStorage.setItem('access_token', res.token!);
        this.setUserToLocalStorage(res.user);
        this.getUserProfile(res.user.id).subscribe((res:Root<User>) => {
          this.currentUser = res.data;
          this.router.navigate(['dashboard','profile']).then(() => {});
        });
    });
  }

  signIn(email:string,password:string) : Subscription {
    const user = {email, password}

    return this.httpClient.post<Root<User>>(`${this.BASE_URL}/login`, user)
      .subscribe((res:any) => {
          localStorage.setItem('access_token', res.token!);
          this.setUserToLocalStorage(res.user);
          this.getUserProfile(res.user.id).subscribe((res:Root<User>) => {
            this.currentUser = res.data;
            this.router.navigate(['dashboard','profile']).then(() => {});
          });
        }
      );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  setUserToLocalStorage(user:User):void {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  get currentUserValue(): User {
    return this.currentUser;
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('user');
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
