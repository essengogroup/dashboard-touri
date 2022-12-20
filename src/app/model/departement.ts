export interface Departement {
  id: number;
  name: string;
  description: string;
  image_path: string|File|undefined|null;
  created_at?: string|undefined|null;
  updated_at?: string|undefined|null;
}
