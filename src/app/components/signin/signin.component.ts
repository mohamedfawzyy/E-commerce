import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  errorSignin:string="";
  isspinnner:boolean=false;
  constructor(private _AuthService:AuthService,private _Router:Router){}

  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null, [Validators.required,Validators.email]) ,
    password:new FormControl(null,[Validators.required])
  })



  loginUser(){
    if(this.loginForm.valid){
      this.isspinnner=true;
      this._AuthService.loginUser(this.loginForm.value).subscribe({
        next:(data)=>{
          localStorage.setItem("freshToken",data.token);
         
         
          this._Router.navigate(["/home"]);
        },
        error:(error:HttpErrorResponse)=>{this.errorSignin=error.error.message
          this.isspinnner=false;
        },
       
      })
    }
    
  }
}
