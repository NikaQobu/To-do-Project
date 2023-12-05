import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbypriority'
})
export class FilterbypriorityPipe implements PipeTransform {

  transform(arr: any[], ...args: unknown[]): any[] {
    if (arr) {
      let ans = arr.filter(item => item.priority == 'medium');
      console.log("shemovei")
      return ans; 
    }
  
    return []; 
  }

}
