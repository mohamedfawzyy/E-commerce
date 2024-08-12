import { ProductBrandComponent } from './components/product-brand/product-brand.component';
import { authGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { notAuthGuard } from './shared/guards/not-auth.guard';
import { DetailesComponent } from './components/detailes/detailes.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishedListComponent } from './components/wished-list/wished-list.component';
import { CategoryDetailesComponent } from './components/category-detailes/category-detailes.component';
import { BrandDetailesComponent } from './components/brand-detailes/brand-detailes.component';
import { ProductsPerCategoriesComponent } from './components/products-per-categories/products-per-categories.component';

const routes: Routes = [
  //blankLayout
  {
    path:"",canActivate:[authGuard],component:BlankLayoutComponent ,children:[
      {path:"",redirectTo:"home",pathMatch:"full"},
      {path:"home" , component:HomeComponent},
      {path:"cart",component:CartComponent},
      {path:"products",component:ProductsComponent},
      {path:"brands",component:BrandsComponent},
      {path:"categories",component:CategoriesComponent},
      {path:"detailes/:id/:iswished",component:DetailesComponent},
      {path:"checkout/:id",component:CheckoutComponent},
      {path:"allorders",component:AllOrdersComponent},
      {path:"wishedlist",component:WishedListComponent},
      {path:"category/:id",component:CategoryDetailesComponent},
      {path:"brand/:id",component:BrandDetailesComponent},
      {path:"ProductCategories/:id",component:ProductsPerCategoriesComponent},
      {path:"ProductBrand/:id",component:ProductBrandComponent}

    ]
  }
  ,
  //authLayout
  {
    path:"",canActivate:[notAuthGuard],component:AuthLayoutComponent,children:[
      {path:"",redirectTo:"register",pathMatch:"full"},
      {path:"register",component:RegisterComponent},
      {path:"signin",component:SigninComponent},
      {path:"setting",loadChildren:()=>import('./setting/setting.module').then(m=>(m.SettingModule))}

    ]
  },
  //page not found
  {
    path:"**" , component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
