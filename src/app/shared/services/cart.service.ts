import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL:string=`https://ecommerce.routemisr.com`;
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);
 
  constructor(private _HttpClient:HttpClient) { }

  addProductToCart(productId:string):Observable<any>{
    return  this._HttpClient.post(`${this.baseURL}/api/v1/cart?`,{
          "productId": productId
        });
  }

  getCustomerCart():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart`)
  }

  removeSpecificProduct(productId:string):Observable<any>{
  return  this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${productId}`);
  }

  updateCartQuantity(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${productId}`,{
      "count":`${count}`
    });
  }

  checkOutCart(cartId:string,usertData:object):Observable<any>{
   return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,usertData);
  }

  getUserOrders():Observable<any>{
  let usreDatajwtDecode:any=jwtDecode( localStorage?.getItem('freshToken')??"");
  console.log(usreDatajwtDecode.id);
  
  return  this._HttpClient.get(`${this.baseURL}/api/v1/orders/user/${usreDatajwtDecode.id}`);
  }
}

