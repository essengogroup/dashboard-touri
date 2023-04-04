import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

   currentItemSideBarName:string="Tableau de bord";
   searchText:string = '';
   isLoading:boolean = false;
   isDeterminate:boolean = true;
   progressValue:number = 0;

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

  resetLoading():void{
    this.isDeterminate=true;
    this.isLoading=false;
  }


}
