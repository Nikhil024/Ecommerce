import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AddressComponent } from './address/address.component';
import { SummaryComponent } from './summary/summary.component';
import { ProductConfirmationComponent } from './product-confirmation/product-confirmation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ApplicationRoutes} from './application-routes.module';
import {CategoryListingComponent} from './category-listing/category-listing.component';
import {HeaderComponent} from './header/header.component';
import {SearchFilterPipe} from './search-filter.pipe';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGaurd} from './auth-gaurd.service';
import {LoginService} from './app-services/login.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    AddressComponent,
    SummaryComponent,
    ProductConfirmationComponent,
    LoginComponent,
    RegisterComponent,
    CategoryListingComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    SearchFilterPipe,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ApplicationRoutes
  ],
  providers: [AuthGaurd, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
