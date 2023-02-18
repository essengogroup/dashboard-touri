import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Site} from "../model/site";
import {Root} from "../model/root";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  readonly BASE_URL = `${environment.baseUrl}/site`;

  constructor(private httpClient:HttpClient) { }

  getSites():Observable<Root<Site[]>>{
    return this.httpClient.get<Root<Site[]>>(`${this.BASE_URL}`);
  }

  getSite(id:number):Observable<Root<Site>>{
    return this.httpClient.get<Root<Site>>(`${this.BASE_URL}/${id}`);
  }

  deleteSite(id:number):Observable<Root<Site>>{
    return this.httpClient.delete<Root<Site>>(`${this.BASE_URL}/${id}`);
  }

  createSite(name:string,description:string,departement_id:number,price:number):Observable<Root<Site>>{
    const data = {name,description,departement_id,price,longitude:0,latitude:0};
    return this.httpClient.post<Root<Site>>(`${this.BASE_URL}`,data);
  }

  updateSite(id:number,name:string,description:string,departement_id:number,price:number):Observable<Root<Site>>{
    const data = {name,description,departement_id,price};
    return this.httpClient.put<Root<Site>>(`${this.BASE_URL}/${id}`,data);
  }

  addActiviteToSite(site_id:number,price:number,activite_id:number,type:string='obligatoire'):Observable<any>{
    const data = {type,price,activite_id};
    return this.httpClient.post<any>(`${this.BASE_URL}/${site_id}/activite`,data);
  }

  deleteActiviteToSite(site_id:number,activite_id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.BASE_URL}/${site_id}/activite/${activite_id}`);
  }

}
