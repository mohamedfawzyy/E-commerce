import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { HomeComponent } from '../home/home.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishedListService } from 'src/app/shared/services/wished-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[]=[];
  wishedlistProducts:Product[]=[];
  constructor(private _ProductService:ProductService ,private _CartService:CartService,private _ToastrService:ToastrService, private _WishedListService:WishedListService){}
  ngOnInit(): void {
  
    this._ProductService.getProducts().subscribe({
      next:(data)=>{
          this.products=data.data;
      },
      error:(error:HttpErrorResponse)=>{console.log(error.error.message)}
    });
    this._WishedListService.getAllUserWishlist().subscribe({
      next:(data)=>{this.wishedlistProducts=data.data
      },
      error:(err)=>console.log(err)
    });
  }

  addToCart(event:any,ProductId:string){
    event.stopPropagation();
    this._CartService.addProductToCart(ProductId).subscribe({
      next:(data)=>{
          this._ToastrService.success(data.message);
      },
      error:(err)=>console.log(err) 
    })
   
  }
  addOrRemoveFavs(event:any,productId:string,isWished:boolean){
    console.log(isWished);
    
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
            }
            
          }
        })
      }
    
      
  }
 changeWishlist(){
  this._WishedListService.getAllUserWishlist().subscribe({
    next:(data)=>{
      console.log(data);
      this.wishedlistProducts=data.data;
      console.log(this.wishedlistProducts);
      
    },
    error:(err)=>console.log(err)
  });
 }

}
