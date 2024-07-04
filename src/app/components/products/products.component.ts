import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[]=[];
  constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
  
    
    this._ProductService.getProducts().subscribe({
      next:(data)=>{
          this.products=data.data;
      },
      error:(error:HttpErrorResponse)=>{console.log(error.error.message)}
    })
  }

}
