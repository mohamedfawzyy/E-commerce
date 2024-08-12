import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL:string="https://ecommerce.routemisr.com";
  constructor(private _HttpClient:HttpClient) { }
  

    getProducts(limit:number=40 , page:number=1 ):Observable<any>{
      return this._HttpClient.get(`${this.baseURL}/api/v1/products?limit=${limit}&page=${page}`);
    }

    getProductById(productId:string):Observable<any>{
      return this._HttpClient.get(`${this.baseURL}/api/v1/products/${productId}`);
    }
    getProductsByCategory( CategoryId:string):Observable<any>{
      return this._HttpClient.get(`${this.baseURL}/api/v1/products?category[in]=${CategoryId}`);
    }
    getProductsByBrand( BrandId:string):Observable<any>{
      return this._HttpClient.get(`${this.baseURL}/api/v1/products?brand=${BrandId}`);
    }
}

