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

  createDepartement(departement:Departement):Observable<any>{
    return this.httpClient.post<Root<Departement>>(`${this.BASE_URL}`,departement,{
      reportProgress: true,
      observe: 'events'});
  }

  updateDepartement(departement:Departement):Observable<any>{
    return this.httpClient.put<Root<Departement>>(`${this.BASE_URL}/${departement.id}`,departement,{
      reportProgress: true,
      observe: 'events'});
  }

  deleteDepartement(id:number):Observable<any>{
    return this.httpClient.delete<Root<Departement>>(`${this.BASE_URL}/${id}`)
  }

}
