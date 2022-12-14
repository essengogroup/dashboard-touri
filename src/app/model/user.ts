export interface User {
  id: number;
  firstName?: string|undefined|null;
  lastName?: string|undefined|null;
  full_name: string;
  email: string;
  password?: string|undefined|null;
  password_confirmation?: string|undefined|null;
  phone?:  string|undefined|null;
  profile_picture?:  string|undefined|null;
  address?: string|undefined|null;
  email_verified_at: string;
  created_at?:  string|undefined|null;
  updated_at?:  string|undefined|null;
}
