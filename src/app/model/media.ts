export interface Media {
  id: number;
  site_id:number|undefined;
  name: string;
  path: string|File;
  type: string;
  is_main: number;
  created_at: string;
  updated_at: string;
}
