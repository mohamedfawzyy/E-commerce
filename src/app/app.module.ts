import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailesComponent } from './components/detailes/detailes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NguCarouselModule } from '@ngu/carousel';
import { SearchProductPipe } from './shared/pipes/search-product.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishedListComponent } from './components/wished-list/wished-list.component';
import { IsWishedPipe } from './shared/pipes/is-wished.pipe';
import { CategoryDetailesComponent } from './components/category-detailes/category-detailes.component';
import { BrandDetailesComponent } from './components/brand-detailes/brand-detailes.component';
import { MyHttpInterceptor } from './shared/interceptors/my-http.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingPageInterceptor } from './shared/interceptors/loading-page.interceptor';
import { ProductsPerCategoriesComponent } from './components/products-per-categories/products-per-categories.component';
import { ProductBrandComponent } from './components/product-brand/product-brand.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    NavAuthComponent,
    NavBlankComponent,
    PageNotFoundComponent,
    DetailesComponent,
    SearchProductPipe,
    CheckoutComponent,
    AllOrdersComponent,
    WishedListComponent,
    IsWishedPipe,
    CategoryDetailesComponent,
    BrandDetailesComponent,
    FooterComponent,
    ProductsPerCategoriesComponent,
    ProductBrandComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    NguCarouselModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:MyHttpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingPageInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
