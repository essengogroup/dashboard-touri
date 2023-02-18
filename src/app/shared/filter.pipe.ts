import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(myArray: any[],searchText:string,fieldName:string,subFieldName:string=''): any[] {
    // return empty array if array is falsy
    if (!myArray) { return []; }

    // return the original array if search text is empty
    if (!searchText) { return myArray; }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    // retrun the filtered array
    return myArray.filter(item => {
      if (subFieldName!==''){
        return (item[fieldName][subFieldName]).toLowerCase().includes(searchText);
      }
      if (item && item[fieldName]) {
        return item[fieldName].toLowerCase().includes(searchText);
      }
      return false;
    });
  }

}
