import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  //blankLayout
  {
    path:"blank",component:BlankLayoutComponent
  }
  ,
  //authLayout
  {
    path:"auth",component:AuthLayoutComponent,children:[
      {path:"",redirectTo:"register",pathMatch:"full"},
      {path:"register",component:RegisterComponent},
      {path:"signin",component:SigninComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
