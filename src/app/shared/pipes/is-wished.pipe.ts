import { Product } from 'src/app/shared/interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'isWished'
})
export class IsWishedPipe implements PipeTransform {

  transform(allProducts: Product[], wishListProducts: Product[]): Product[] {
    return allProducts.filter((product)=>{
      product.isWished=false;
      for (const wishProduct of wishListProducts) {
          if(wishProduct._id == product._id)
              product.isWished=true;
          
      }
      return product;
    });
  }

}
