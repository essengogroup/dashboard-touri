export class SiteDate {
  private _id!:number
  private _site_id!:number
  private _date_!:string
  private _start_time!:string
  private _end_time!:string


  constructor(site_id: number, date_: string, start_time: string, end_time: string) {
    this._site_id = site_id;
    this._date_ = date_;
    this._start_time = start_time;
    this._end_time = end_time;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get site_id(): number {
    return this._site_id;
  }

  set site_id(value: number) {
    this._site_id = value;
  }

  get date_(): string {
    return this._date_;
  }

  set date_(value: string) {
    this._date_ = value;
  }

  get start_time(): string {
    return this._start_time;
  }

  set start_time(value: string) {
    this._start_time = value;
  }

  get end_time(): string {
    return this._end_time;
  }

  set end_time(value: string) {
    this._end_time = value;
  }
}
