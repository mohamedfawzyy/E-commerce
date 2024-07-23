import { WishedListService } from './../../shared/services/wished-list.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit ,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.css']
})
export class DetailesComponent implements OnInit {
 productId:string="";
 isWished:boolean=false;
 carouselItems:string[]=[];
 product:Product=null!;
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService,private _CartService:CartService,private _ToastrService:ToastrService,private  _WishedListService:WishedListService) {
    
    
  }
  ngOnInit(): void {
        this._ActivatedRoute.paramMap.subscribe({
          next:(params)=>{
            this.productId=params.get("id")??"";
            this.isWished= params.get("iswished")=="true"?true:false;
          
            
          },
          error:(error)=>console.log(error)
        })
       this._ProductService.getProductById(this.productId).subscribe({
        next:(data)=>{
          this.product=data.data;
          this.product.isWished=this.isWished;
          console.log(this.product.isWished);
          
          this.carouselTileLoad(this.product.images);
        },
        error:(error)=>console.log(error)
       })
        
  }

  changeImg(event:any,ele:HTMLImageElement){
    ele.setAttribute('src',event.target?.getAttribute('src'));      
  }

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, xl:3, all: 0 },
    slide:1,
    loop:true,
    interval: {timing: 4000, initialDelay: 1000},
    speed: 400,
    vertical:{
      enabled:true,
      height:400
    },
    point: {
      visible: true
    },
    load: 1,
    velocity: 250,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  carouselTileLoad(data:any) {
    this.carouselItems = [...this.product.images ];
  }

  addToCart(productId:string){
        this._CartService.addProductToCart(productId).subscribe({
          next:(data)=>{
              this._ToastrService.success(data.message);
          },
          error:(err)=>console.log(err) 
        })
  }
  addOrRemoveFavs(event:any,productId:string,isWished:boolean){
    console.log(isWished);
    
    
      if(!isWished){
        if  (event.target != null ){
          event.target.style.color="blue";
        }

        this._WishedListService.addToWishedList(productId).subscribe({
          next:(data)=>{
            if(data.status == "success"){
              this._ToastrService.success("product added to your wish list","Favourites",);
              this.product.isWished=true;
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
              this.product.isWished=false;
            }
            
          }
        })
      }
    
      
  }
}
