import {Site} from "./site";
import {Activite} from "./activite";
import {SiteDate} from "./site-date";
import {User} from "./user";

export interface Reservation {
  id:number
  user_id:number
  site_id:number
  site_date_id:number
  commentaire:string|undefined
  nb_personnes:number
  activites:number[]|Activite[]
  site:Site
  is_paid:number
  price:number
  site_date:SiteDate
  status:string
  user:User
}
