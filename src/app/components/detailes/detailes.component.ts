import { Component, OnInit ,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.css']
})
export class DetailesComponent implements OnInit {
 productId:string="";
 carouselItems:string[]=[];
 product:Product={} as Product;
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService) {
    
    
  }
  ngOnInit(): void {
        this._ActivatedRoute.paramMap.subscribe({
          next:(params)=>this.productId=params.get("id")??"",
          error:(error)=>console.log(error)
        })
       this._ProductService.getProductById(this.productId).subscribe({
        next:(data)=>{this.product=data.data
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
}
