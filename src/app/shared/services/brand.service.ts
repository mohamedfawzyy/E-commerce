import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseURL:string=`https://ecommerce.routemisr.com`;
  constructor(private _HttpClient:HttpClient) {  }

  getAllBrands():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands`);
  }
  
  getBrandById(BrandId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands/${BrandId}`);
  }
}
