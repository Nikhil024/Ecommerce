import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultProducts = [];
    for (const product of value) {
      if (product[propName].toLowerCase().includes(filterString.toLowerCase())) {
        resultProducts.push(product);
      }
    }
    return resultProducts;
  }

}
