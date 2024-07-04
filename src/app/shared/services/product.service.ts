import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL:string="https://ecommerce.routemisr.com";
  constructor(private _HttpClient:HttpClient) { }
    

    getProducts():Observable<any>{
      return this._HttpClient.get(`${this.baseURL}/api/v1/products`);
    }

}
