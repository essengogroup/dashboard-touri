import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Root} from "../model/root";
import {Media} from "../model/media";
import {Observable} from "rxjs";
import {Departement} from "../model/departement";

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  readonly BASE_URL = `${environment.baseUrl}/media`;
  constructor(private httpClient:HttpClient) { }

  getMedias():Observable<Root<Media[]>>{
    return this.httpClient.get<Root<Media[]>>(`${this.BASE_URL}`)
  }

  getMedia(id:number):Observable<Root<Media>>{
    return this.httpClient.get<Root<Media>>(`${this.BASE_URL}/${id}`)
  }

  createMedia(media:Media):Observable<any>{
    return this.httpClient.post<Root<Media>>(`${this.BASE_URL}`,media,{
      reportProgress: true,
      observe: 'events'});
  }

  updateMedia(media:Media):Observable<any>{
    return this.httpClient.put<Root<Media>>(`${this.BASE_URL}/${media.id}`,media,{
      reportProgress: true,
      observe: 'events'});
  }

  deleteMedia(id:number):Observable<any>{
    return this.httpClient.delete<Root<Media>>(`${this.BASE_URL}/${id}`);
  }

}
