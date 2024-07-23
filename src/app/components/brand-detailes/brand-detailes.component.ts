import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/interfaces/product';
import { BrandService } from 'src/app/shared/services/brand.service';

@Component({
  selector: 'app-brand-detailes',
  templateUrl: './brand-detailes.component.html',
  styleUrls: ['./brand-detailes.component.css']
})
export class BrandDetailesComponent {
  BrandId:string="";  
  Brand:Brand=null!;
    constructor(private _BrandService:BrandService,private _ActivatedRoute:ActivatedRoute) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>this.BrandId=params.get("id")??"",
      error:(err)=>console.log(err)
    })
    this._BrandService.getBrandById(this.BrandId).subscribe({
      next:(data)=>{this.Brand=data.data
        console.log(this.Brand);
        
      }
    })
  }
    
}
