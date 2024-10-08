import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BaseUrl:string="https://ecommerce.routemisr.com";

  constructor(private _HttpClient:HttpClient ,private _Router:Router) { }

  registerNewUser(newUser:object):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/signup`,newUser)
  }

  DecodeToken(){
    let userData:any=jwtDecode(localStorage.getItem("freshToken")??"");
    return userData;
  }
  loginUser(user:object):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/signin`,user);
  }

  signOutUser(){
    localStorage.removeItem("freshToken");
    this._Router.navigate(["/signin"]);
  }

  forgetPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/forgotPasswords`,userEmail);
  }

  resetCode(ResetCode:object):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/verifyResetCode`,ResetCode);
  }

  resetPassword(resetPassword:object):Observable<any>{
    return this._HttpClient.put(`${this.BaseUrl}/api/v1/auth/resetPassword`,resetPassword);
  }
  
}
