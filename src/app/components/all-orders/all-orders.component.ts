import { CartService } from 'src/app/shared/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  /**
   *
   */
  constructor(private _CartService:CartService) {
   
    
  }
  ngOnInit(): void {
    this._CartService.getUserOrders().subscribe({
      next:(data)=>console.log(data),
      error:(err)=>console.log(err)
      
      
    });
  }

  
}
