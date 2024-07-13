import { Product } from './../../shared/interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  serchTerm:string="";
  allCategories:Category[]=[];
  allProducts:Product[]=[];
  constructor(private _ProductService:ProductService,private _CategoryService:CategoryService , private _CartService:CartService) {}
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
    })
  }

  addToCart(event:any,ProductId:string){
    event.stopPropagation();
    this._CartService.addProductToCart(ProductId).subscribe({
      next:(data)=>console.log(data),
      error:(err)=>console.log(err) 
    })
   
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
