import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { WishList } from 'src/app/shared/interfaces/wish-list';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishedListService } from 'src/app/shared/services/wished-list.service';

@Component({
  selector: 'app-wished-list',
  templateUrl: './wished-list.component.html',
  styleUrls: ['./wished-list.component.css']
})
export class WishedListComponent implements OnInit {
      wisedList:WishList=null!;
      baseImgURL:string="https://ecommerce.routemisr.com/Route-Academy-products/";
      constructor(private _WishedListService:WishedListService,private _CartService:CartService,private _ToastrService:ToastrService) {
      }
  ngOnInit(): void {
        this._WishedListService.getAllUserWishlist().subscribe({
          next:(data)=>{this.wisedList=data
 
          },
          error:(err)=>console.log(err)
        })
  }

  addToCart(event:any,ProductId:string){
    event.stopPropagation();
    this._CartService.addProductToCart(ProductId).subscribe({
      next:(data)=>{
          this._ToastrService.success(data.message);
          this._CartService.cartNumber.next(data.numOfCartItems)
      },
      error:(err)=>console.log(err) 
    })
   
  }
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

}
