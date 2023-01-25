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

  createSite(site:Site):Observable<any>{
    return this.httpClient.post<Root<Site>>(`${this.BASE_URL}`,site,{
      reportProgress: true,
      observe: 'events'});
  }

  updateSite(site:Site):Observable<any>{
    const data = {...site, departementId: site.departement.id, mediaId: site.medias[0].id, activiteId: site.activites[0].id};
    console.log(data)
    return this.httpClient.put<Root<Site>>(`${this.BASE_URL}/${site.id}`,site,{
      reportProgress: true,
      observe: 'events'});
  }

}
