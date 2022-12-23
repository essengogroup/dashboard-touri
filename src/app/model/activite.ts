import {Pivot} from "./pivot";
import {Site} from "./site";

export interface Activite {
  id: number;
  name: string;
  description: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot|undefined|null;
  sites:Site[]|undefined|null;
}
