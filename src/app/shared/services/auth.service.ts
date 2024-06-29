import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BaseUrl:string="https://ecommerce.routemisr.com";
  constructor(private _HttpClient:HttpClient) { }

  registerNewUser(newUser:object):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/signup`,newUser)
  }
}
