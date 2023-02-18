import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Activite} from "../model/activite";
import {Observable} from "rxjs";
import {Root} from "../model/root";
import {Departement} from "../model/departement";

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  readonly BASE_URL = `${environment.baseUrl}/activite`;
  constructor(private httpClient:HttpClient) { }

  getActivites():Observable<Root<Activite[]>>{
    return this.httpClient.get<Root<Activite[]>>(`${this.BASE_URL}`)
  }

  getActivite(id:number):Observable<Root<Activite>>{
    return this.httpClient.get<Root<Activite>>(`${this.BASE_URL}/${id}`)
  }

  createActivite(activite:Activite):Observable<any>{
    return this.httpClient.post<Root<Activite>>(`${this.BASE_URL}`,activite,{
      reportProgress: true,
      observe: 'events'});
  }

  updateActivite(activite:Activite):Observable<any>{
    return this.httpClient.put<Root<Activite>>(`${this.BASE_URL}/${activite.id}`,activite,{
      reportProgress: true,
      observe: 'events'});
  }

  deleteActivite(activite_id:number):Observable<any>{
    return this.httpClient.delete<Root<Activite>>(`${this.BASE_URL}/${activite_id}`)
  }
}
