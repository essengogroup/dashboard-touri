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

  private formData:FormData = new FormData();

  constructor(private httpClient:HttpClient) { }

  getMedias():Observable<Root<Media[]>>{
    return this.httpClient.get<Root<Media[]>>(`${this.BASE_URL}`)
  }

  getMedia(id:number):Observable<Root<Media>>{
    return this.httpClient.get<Root<Media>>(`${this.BASE_URL}/${id}`)
  }

  createMedia(media:Media):Observable<any>{
    this.formData.append('name', media.name.trim());
    this.formData.append('site_id', media.site_id!.toString());
    this.formData.append('path', media.path);
    this.formData.append('type', media.type);
    this.formData.append('is_main', media.is_main?'1':'0');
    return this.httpClient.post<Root<Media>>(`${this.BASE_URL}`,this.formData,{
      reportProgress: true,
      observe: 'events'});
  }

  updateMedia(media:Media):Observable<any>{

    this.formData.append('id', media.id.toString());
    this.formData.append('name', media.name.trim());
    this.formData.append('site_id', media.site_id!.toString());
    this.formData.append('path', media.path);
    this.formData.append('type', media.type);
    this.formData.append('is_main', media.is_main.toString());

    return this.httpClient.post<Root<Media>>(`${this.BASE_URL}/${media.id}`,this.formData,{
      reportProgress: true,
      observe: 'events'});
  }

  deleteMedia(id:number):Observable<any>{
    return this.httpClient.delete<Root<Media>>(`${this.BASE_URL}/${id}`);
  }

}
