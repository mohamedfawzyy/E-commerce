import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishedListService } from 'src/app/shared/services/wished-list.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.css']
})
export class ProductBrandComponent {
  productsBrand:Product[]=[];
  wishedlistProducts:Product[]=[];
  BrandId!:string;
  constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute , private _CartService:CartService,private _ToastrService:ToastrService, private _WishedListService:WishedListService){
    
  }
 ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>this.BrandId=params.get('id')??"",
    })
   this._ProductService.getProductsByBrand(this.BrandId).subscribe({
    next:(data)=>this.productsBrand=data.data
   })
 }
 addToCart(event:any,ProductId:string){
  event.stopPropagation();
  this._CartService.addProductToCart(ProductId).subscribe({
    next:(data)=>{
        this._ToastrService.success(data.message);
        this._CartService.cartNumber.next(data.numOfCartItems);
    },
    error:(err)=>console.log(err) 
  })
 
}

addOrRemoveFavs(event:any,productId:string,isWished:boolean){

  
    event.stopPropagation();
    if(!isWished){
      if  (event.target != null ){
        event.target.style.color="blue";
      }

      this._WishedListService.addToWishedList(productId).subscribe({
        next:(data)=>{
          if(data.status == "success"){
            this._ToastrService.success("product added to your wish list","Favourites",);
            this.changeWishlist();
           
            this._WishedListService.WishlistNumber.next(data.data.length);
          }
          
        }
      })
    }else{
      if  (event.target != null ){
        event.target.style.color="#595C5F";
      }
  
     
      this._WishedListService.removeFromWishlist(productId).subscribe({
        next:(data)=>{
          if(data.status == "success"){
            this._ToastrService.success("product removed from your wish list","Favourites");
            this.changeWishlist();
            this._WishedListService.WishlistNumber.next(data.data.length);

          }
          
        }
      })
    }
  
    
}
changeWishlist(){
this._WishedListService.getAllUserWishlist().subscribe({
  next:(data)=>{

    this.wishedlistProducts=data.data;

    
  },
  error:(err)=>console.log(err)
});
}
}
