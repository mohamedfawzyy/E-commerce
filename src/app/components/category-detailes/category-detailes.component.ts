import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/shared/category.service';
import { Category, Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-category-detailes',
  templateUrl: './category-detailes.component.html',
  styleUrls: ['./category-detailes.component.css']
})
export class CategoryDetailesComponent implements OnInit {
  CategoryId:string="";  
  Category:Category=null!;
    constructor(private _CategoryService:CategoryService,private _ActivatedRoute:ActivatedRoute) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>this.CategoryId=params.get("id")??"",
      error:(err)=>console.log(err)
    })
    this._CategoryService.getCategoryById(this.CategoryId).subscribe({
      next:(data)=>this.Category=data.data
    })
  }
    

}
