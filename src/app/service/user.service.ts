import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Root} from "../model/root";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BASE_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getUser(id:number): Observable<Root<User>>{
    return this.httpClient.get<Root<User>>(`${this.BASE_URL}/users/${id}`);
  }

  getUsers(): Observable<Root<User[]>>{
    return this.httpClient.get<Root<User[]>>(`${this.BASE_URL}/users`);
  }

  createUser(user: User): Observable<Root<User>>{
    return this.httpClient.post<Root<User>>(`${this.BASE_URL}/users`, user);
  }

  updateUser(user: User): Observable<Root<User>>{
    return this.httpClient.put<Root<User>>(`${this.BASE_URL}/users`, user);
  }

  deleteUser(id: number): Observable<Root<User>>{
    return this.httpClient.delete<Root<User>>(`${this.BASE_URL}/users/${id}`);
  }
}
