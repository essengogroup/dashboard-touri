import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Root} from "../model/root";
import {Observable} from "rxjs";
import {Reservation} from "../model/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  readonly BASE_URL = `${environment.baseUrl}/reservation-site`;
  constructor(private httpCilent:HttpClient) { }

  getReservations():Observable<Root<Reservation[]>>{
    return this.httpCilent.get<Root<Reservation[]>>(`${this.BASE_URL}`);
  }

  getReservation(id:number):Observable<Root<Reservation>>{
    return this.httpCilent.get<Root<Reservation>>(`${this.BASE_URL}/${id}`);
  }

  createReservation(reservation:any):Observable<Root<Reservation>>{
    return this.httpCilent.post<Root<Reservation>>(`${this.BASE_URL}`,reservation);
  }

  updateReservation(reservation:any):Observable<Root<Reservation>>{
    return this.httpCilent.put<Root<Reservation>>(`${this.BASE_URL}`,reservation);
  }

  deleteReservation(reservation_id:number):Observable<Root<Reservation>>{
    return this.httpCilent.delete<Root<Reservation>>(`${this.BASE_URL}/${reservation_id}/cancel`);
  }

  validateReservation(reservation_id:number):Observable<Root<Reservation>>{
    return this.httpCilent.get<Root<Reservation>>(`${this.BASE_URL}/${reservation_id}/validate`);
  }

  refuseReservation(reservation_id:number):Observable<Root<Reservation>>{
    return this.httpCilent.get<Root<Reservation>>(`${this.BASE_URL}/${reservation_id}/refuse`);
  }
}
