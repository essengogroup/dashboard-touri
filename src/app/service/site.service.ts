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

}
