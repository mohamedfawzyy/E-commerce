import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  allCategories:Category[]=[];
  constructor(private _CategoryService:CategoryService){}
 
      ngOnInit(): void {
        
        this._CategoryService.getAllCategories().subscribe({
          next:(data)=>{this.allCategories=data.data;
          },
          error:(err)=>console.log(err)
          
        })
  }
}
