export interface Root<T>  {
  message?: string|null|undefined;
  token?: string|null|undefined;
  token_type?:string|null|undefined;
  data:T;
}
