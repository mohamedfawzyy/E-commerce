import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.css']
})
export class ResetCodeComponent {
          constructor(private _AuthService:AuthService,private _Router:Router){}
          resetCode:FormGroup=new FormGroup({
            resetCode: new FormControl(null , [Validators.required])
          });
          submitResetCode(){
              if(this.resetCode.valid)
              this._AuthService.resetCode(this.resetCode.value).subscribe({
                next:(data)=> {
                  if(data.status == "Success"){
                          this._Router.navigate(['/setting/resetPassword'])
                  }
                }
              })
          }
}
