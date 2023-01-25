import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

   currentItemSideBarName:string="Tableau de bord";
   searchText:string = '';

  constructor() { }

  /**
   * get current item sidebar name
   */
  get currentItemSideBar():string{
    return this.currentItemSideBarName;
  }


  /**
   * get current search text
   */
  get currentSearchText():string{
    return this.searchText;
  }
}
