import { Product } from './../../shared/interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishedListService } from 'src/app/shared/services/wished-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  serchTerm:string="";
  allCategories:Category[]=[];
  allProducts:Product[]=[];
  wishedlistProducts:Product[]=[];
  constructor(private _ProductService:ProductService,private _CategoryService:CategoryService , private _CartService:CartService,private _ToastrService:ToastrService, private _WishedListService:WishedListService) {}
  ngOnInit(): void {
    this._CategoryService.getAllCategories().subscribe({
      next:(data)=>this.allCategories=data.data,
      error:(error)=>console.log(error)
      
    })
    this._ProductService.getProducts().subscribe({
      next:(data)=>{
          this.allProducts=data.data;
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
  
      this.wishedlistProducts=data.data;
  
      
    },
    error:(err)=>console.log(err)
  });
 }
  customOptions: OwlOptions = {
    autoplay:true,
    
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 200,
    navText: ['', ''],
    items:1,
    nav:true
}
customCategoeirs: OwlOptions = {
  loop: true,
  autoplay:true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 3
    },
    400: {
      items: 6
    },
  
  },
  nav: true
}

}
