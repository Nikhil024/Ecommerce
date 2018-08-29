import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Cart} from '../app-models/cart.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CartService {
  private addCartUrl = ApplicationProperties.BackendRestUrl + 'addCart';
  private addUnknownUserCartUrl = ApplicationProperties.BackendRestUrl + 'unknownUserAddCart';
  private addExistingCartUrl = ApplicationProperties.BackendRestUrl + 'addExistingCart';
  private getCartUrl = ApplicationProperties.BackendRestUrl + 'getCart';
  private removeCartUrl = ApplicationProperties.BackendRestUrl + 'removeProduct';
  private removeCartUserUrl = ApplicationProperties.BackendRestUrl + 'removeCart';
  public cart = new Subject();

  constructor(private httpClient: HttpClient) {}


  addCart(productCode: string) {
    if (localStorage.getItem('xAuthToken') == null) {
      return this.httpClient.post<Cart>(this.addUnknownUserCartUrl, productCode);
    } else {
      return this.httpClient.post<Cart>(this.addCartUrl, productCode);
    }

  }

  addToExistingCart(productCode: string, cartId: number) {
    return this.httpClient.post<Cart>(this.addExistingCartUrl, productCode + ':' + cartId);

  }

  getCart(cartId: number) {
    return this.httpClient.post<Cart>(this.getCartUrl, cartId);
  }

  removeCart(productCode: string, cartId: number) {
    return this.httpClient.post<Cart>(this.removeCartUrl, productCode + ':' + cartId);
  }

  removeCartUser() {
    return this.httpClient.post(this.removeCartUserUrl, parseInt(localStorage.getItem('cartId'), 10));
  }

}
