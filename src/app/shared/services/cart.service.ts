import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL:string=`https://ecommerce.routemisr.com`;
  headers:any={
    token:localStorage.getItem('freshToken')??""
  }
  constructor(private _HttpClient:HttpClient) { }

  addProductToCart(productId:string):Observable<any>{
    return  this._HttpClient.post(`${this.baseURL}/api/v1/cart?`,{
          "productId": productId
        },{
           headers:this.headers
        });
  }

  getCustomerCart():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart`,{
      headers:this.headers
    })
  }

  removeSpecificProduct(productId:string):Observable<any>{
  return  this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${productId}`,{
    headers:this.headers
  });
  }

  updateCartQuantity(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${productId}`,{
      "count":`${count}`
    },{
      headers:this.headers
    });
  }

  checkOutCart(cartId:string,usertData:object):Observable<any>{
   return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,usertData,{
      headers:this.headers
    });
  }

  getUserOrders():Observable<any>{
  let usreDatajwtDecode:any=jwtDecode( localStorage?.getItem('freshToken')??"");
  console.log(usreDatajwtDecode.id);
  
  return  this._HttpClient.get(`${this.baseURL}/api/v1/orders/user/${usreDatajwtDecode.id}`);
  }
}

