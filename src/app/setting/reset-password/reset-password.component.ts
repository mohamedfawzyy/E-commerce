import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  isspinnner:boolean=false;
  errorReset:string="";
  constructor(private _AuthService:AuthService ,private _Router:Router){}
  resetPasswordForm:FormGroup=new FormGroup({
    email:new FormControl(null, [Validators.required,Validators.email]) ,
    newPassword:new FormControl(null,[Validators.required])
  });
  resetPassword(){
    if(this.resetPasswordForm.valid){
      this.isspinnner=true;
      this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
        next:(data)=>{
          localStorage.setItem("freshToken",data.token);
          this.isspinnner=false;
           this._Router.navigate(["/home"]);
        },
        error:(error:HttpErrorResponse)=>{this.errorReset=error.error.message
          this.isspinnner=false;
        },
       
      })
    }
    
  }
}
