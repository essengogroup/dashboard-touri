import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Root} from "../model/root";
import {SiteDate} from "../model/site-date";

@Injectable({
  providedIn: 'root'
})
export class SiteDateService {

  readonly BASE_URL = `${environment.baseUrl}/date-site`;

  constructor(
    private httpClient:HttpClient
  ) {}

  getSiteDate():Observable<Root<SiteDate[]>>{
    return this.httpClient.get<Root<SiteDate[]>>(`${this.BASE_URL}`)
  }

  addDateToSite(siteDate:SiteDate):Observable<any>{
    return this.httpClient.post<Root<SiteDate>>(`${this.BASE_URL}`,siteDate,{
      reportProgress: true,
      observe: 'events'});
  }

  updateDateToSite(siteDate:SiteDate):Observable<any>{
    return this.httpClient.put<Root<SiteDate>>(`${this.BASE_URL}/${siteDate.id}`,SiteDate,{
      reportProgress: true,
      observe: 'events'});
  }

  deleteSiteDate(id:number){
    return this.httpClient.delete<Root<SiteDate>>(`${this.BASE_URL}/${id}`)
  }
}
