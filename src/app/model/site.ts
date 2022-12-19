import { Departement } from "./departement"
import {Media} from "./media";
import {Activite} from "./activite";

export interface Site {
  id: number;
  name: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  departement: Departement;
  medias: Media[];
  activites: Activite[];
}
