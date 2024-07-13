import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  userCart:cart=null!;
  currentdate:Date=new Date();
  tommorow:any=new Date(this.currentdate.setDate(this.currentdate.getDate()+1)).toLocaleDateString();
  constructor(private _CartService:CartService) { }
  ngOnInit(): void {
        this._CartService.getCustomerCart().subscribe({
          next:(data)=>this.userCart=data
        })
  }
  removeProduct(ProductId:string){
    console.log(ProductId);
    this._CartService.removeSpecificProduct(ProductId).subscribe({
      next:(data)=>{this.userCart=data
        console.log(data);
        
      },
      error:(err)=>console.log(err),
      
    })
  }

  updateQuantity(productId:string,count:number){
    console.log(productId);
    
    if(count>0){
      this._CartService.updateCartQuantity(productId,count).subscribe({
        next:(data)=>{this.userCart=data
        
        },
        error:(err)=>console.log(err)
        
      })
    }else{
      this.removeProduct(productId);
    }
      
  }

}
