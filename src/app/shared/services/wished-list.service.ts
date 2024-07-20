import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishedListService {
  baseURL:string=`https://ecommerce.routemisr.com`;
  constructor(private _HttpClient:HttpClient) { }
  headers:any={
    token:localStorage.getItem("freshToken")
  }
  addToWishedList(productId:string):Observable<any>{
   return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`,{
      "productId": productId
    },{
      headers:this.headers
    })
  }

  getAllUserWishlist():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`,{
      headers:this.headers
    })
  }

  removeFromWishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${productId}`,{
      headers:this.headers
    })
  }
}
