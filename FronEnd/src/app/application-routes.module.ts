import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListingComponent} from './product-listing/product-listing.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {AddressComponent} from './address/address.component';
import {SummaryComponent} from './summary/summary.component';
import {ProductConfirmationComponent} from './product-confirmation/product-confirmation.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CategoryListingComponent} from './category-listing/category-listing.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGaurd} from './auth-gaurd.service';

const appRoutes: Routes = [
  {path: '', component: ProductListingComponent},
  {path: 'categories/:categoryType/:productCode', component: ProductDetailsComponent},
  {path: 'product/:productCode', component: ProductDetailsComponent},
  {path: 'categories/:categoryType', component: CategoryListingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGaurd]},
  {path: 'address', component: AddressComponent, canActivate: [AuthGaurd]},
  {path: 'summary', component: SummaryComponent, canActivate: [AuthGaurd]},
  {path: 'confirm', component: ProductConfirmationComponent, canActivate: [AuthGaurd]},
  {path: 'admin', component: AdminComponent},
  { path: 'errorpage', component: ErrorPageComponent},
  { path: 'notfound', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class ApplicationRoutes {

}
