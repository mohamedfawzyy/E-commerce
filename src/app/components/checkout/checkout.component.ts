import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 cartId:string="";
  constructor(private _CartService:CartService ,private _ActivatedRoute:ActivatedRoute) {

  }
  ngOnInit(): void {
        this._ActivatedRoute.paramMap.subscribe({
          next:(paras)=>this.cartId=paras?.get('id')??"",
          error:(err)=>console.log(err)
          
        })
  }
    shippingForm:FormGroup=new FormGroup({
      details: new FormControl("",[Validators.required]),
      phone:new FormControl("",[Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),
      city: new FormControl("",[Validators.required])
    })

    checkout(){
       if(this.shippingForm.valid){
        this._CartService.checkOutCart(this.cartId,this.shippingForm.value).subscribe({
          next:(data)=>{
            open(data.session.url,"_self");
          },
          error:(err)=>console.log(err)
          
          
        })
       }
    }
}
