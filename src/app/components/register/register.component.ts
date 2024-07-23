import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatWith } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  ShowLoader:boolean=false;
  errorMessage:string="";
  constructor(private _AuthService:AuthService,private _Router:Router){}
  //registeration form
    registerForm:FormGroup=new FormGroup({
      name: new FormControl(null, [Validators.required,Validators.pattern(/^[A-Za-z\s]{3,20}$/)]),
      email:new FormControl(null,[Validators.required, Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
      rePassword:new FormControl(null),
      phone:new FormControl(null ,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
            },{validators:[this.checkRePassword]} as FormControlOptions);
  checkRePassword(form:FormGroup):void{
    let Password=form.get('password');
    let rePassword=form.get('rePassword');
    if(!rePassword?.value){
      rePassword?.setErrors({required:true});
    }
    else if(Password?.value != rePassword?.value){
      rePassword?.setErrors({mismatch:true});
    }
  }
  signUP(){
    if(this.registerForm.valid){
      this.ShowLoader=true;
      this._AuthService.registerNewUser(this.registerForm.value).subscribe({
        next:(response)=>{
          this.ShowLoader=false;
          if(response.message == "success"){
              this._Router.navigate(["/signin"]);
          }
        },
        error:(error:HttpErrorResponse)=>{
          this.errorMessage=error.error.message;
          this.ShowLoader=false;
        },
      });
      
    }
    
  }

}