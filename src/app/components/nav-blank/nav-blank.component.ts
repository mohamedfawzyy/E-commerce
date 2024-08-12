import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WishedListService } from 'src/app/shared/services/wished-list.service';
import { Component, HostListener, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { cart } from 'src/app/shared/interfaces/cart';
import { WishList } from 'src/app/shared/interfaces/wish-list';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{
  userName:string="";
  numberOfWishList:number=0;
  numberOfCartProducts:number=0;
  Cart:cart={} as cart;
  Wishlist:WishList={}as WishList;

  constructor(private _AuthService:AuthService,private _WishedListService:WishedListService ,private _CartService:CartService,private _Renderer2:Renderer2){}
  @ViewChild('nav') navElement:any;
  @HostListener('window:scroll')
  addNavPassing(){
    if(window.scrollY > 300){
      this._Renderer2.addClass(this.navElement.nativeElement,"paddingOnScroll");
    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement,"paddingOnScroll");
    }
  }
  ngOnInit(): void {
    this.userName=this._AuthService.DecodeToken().name;
    this._CartService.getCustomerCart().subscribe({
      next:(data)=>{this.Cart=data
        this.numberOfCartProducts=this.Cart.numOfCartItems;
        console.log( this.numberOfCartProducts);
        
      }
    });
    this._CartService.cartNumber.subscribe({
      next:(data)=>this.numberOfCartProducts=data
    })
    this._WishedListService.getAllUserWishlist().subscribe({
      next:(data)=>this.numberOfWishList=data.data.length
    });
    this._WishedListService.WishlistNumber.subscribe({
      next:(data)=>this.numberOfWishList=data
    })
   
  }

  signOutUser(){
    this._AuthService.signOutUser();
  }
}
