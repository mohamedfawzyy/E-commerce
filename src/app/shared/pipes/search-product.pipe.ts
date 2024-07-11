import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(products: Product[], searchterm:string): Product[] {
    return products.filter((product)=>product.title.toLowerCase().includes(searchterm.toLowerCase()));
  }

}
