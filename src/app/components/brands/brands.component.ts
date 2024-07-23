import { Brand } from 'src/app/shared/interfaces/product';
import { BrandService } from './../../shared/services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  allBrands:Brand[]=[];
  constructor(private _BrandService:BrandService) {}
  ngOnInit(): void {
      this._BrandService.getAllBrands().subscribe({
        next:(data)=>this.allBrands=data.data,
        error:(err)=>console.log(err)
      })
  }
  
}
