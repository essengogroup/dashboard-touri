import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Departement} from "../model/departement";
import {Root} from "../model/root";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  readonly BASE_URL = `${environment.baseUrl}/departement`;

  constructor(private httpClient:HttpClient) { }

  getDepartements():Observable<Root<Departement[]>>{
    return this.httpClient.get<Root<Departement[]>>(`${this.BASE_URL}`)
  }

  getDepartement(id:number):Observable<Root<Departement>>{
    return this.httpClient.get<Root<Departement>>(`${this.BASE_URL}/${id}`)
  }

}
