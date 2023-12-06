import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPriority'
})
export class FilterbypriorityPipe implements PipeTransform {
  transform(arr: any[], filterBy: string): any[] {
    if (arr && filterBy != "All") {
      let ans = arr.filter(item => item.priority === filterBy);
      console.log("shemovei");
      return ans;
    }
    return arr;
  }
}
