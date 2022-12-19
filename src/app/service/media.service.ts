import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Root} from "../model/root";
import {Media} from "../model/media";
import {Observable} from "rxjs";

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
}
