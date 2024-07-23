import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  /**
   *
   */
  constructor(private _AuthService:AuthService,private _Router:Router) {
    
    
  }
  resetPassword:FormGroup=new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email])
  });
  getPassCode(){
    if(this.resetPassword.valid){
     this._AuthService.forgetPassword(this.resetPassword.value).subscribe({
      next:(data)=>{
        if(data.statusMsg == "success"){
          this._Router.navigate(['/setting/resetCode'])
        }
      }
     })
      
    }
  }
}
