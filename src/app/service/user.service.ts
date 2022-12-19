import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Root} from "../model/root";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BASE_URL = `${environment.baseUrl}/user`;

  constructor(private httpClient: HttpClient) { }

  getUser(id:number): Observable<Root<User>>{
    return this.httpClient.get<Root<User>>(`${this.BASE_URL}/${id}`)
      .pipe(catchError(this.handleError<Root<User>>('user')));
  }

  getUsers(): Observable<Root<User[]>>{
    return this.httpClient.get<Root<User[]>>(`${this.BASE_URL}`)
      .pipe(catchError(this.handleError<Root<User[]>>('users')));;
  }

  createUser(user: User): Observable<Root<User>>{
    return this.httpClient.post<Root<User>>(`${this.BASE_URL}`, user);
  }

  updateUser(user: User): Observable<Root<User>>{
    return this.httpClient.put<Root<User>>(`${this.BASE_URL}`, user);
  }

  deleteUser(id: number): Observable<Root<User>>{
    return this.httpClient.delete<Root<User>>(`${this.BASE_URL}/${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`failed: ${error.message}`);
      return of(result as T);
    };
  }
}
