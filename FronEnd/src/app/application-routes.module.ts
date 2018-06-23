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

const appRoutes: Routes = [
  {path: '', component: ProductListingComponent},
  {path: 'phones/{device_code}', component: ProductDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'address', component: AddressComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'confirm', component: ProductConfirmationComponent},
  { path: 'categories', component: CategoryListingComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class ApplicationRoutes {

}
