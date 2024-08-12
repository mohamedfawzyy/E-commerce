import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product'
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishedListService } from 'src/app/shared/services/wished-list.service';


@Component({
  selector: 'app-products-per-categories',
  templateUrl: './products-per-categories.component.html',
  styleUrls: ['./products-per-categories.component.css']
})
export class ProductsPerCategoriesComponent  implements OnInit{
  productsCategory:Product[]=[];
  wishedlistProducts:Product[]=[];
  categoryId!:string;
  constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute , private _CartService:CartService,private _ToastrService:ToastrService, private _WishedListService:WishedListService){
    
  }
 ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>this.categoryId=params.get('id')??"",
    })
   this._ProductService.getProductsByCategory(this.categoryId).subscribe({
    next:(data)=>this.productsCategory=data.data
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
