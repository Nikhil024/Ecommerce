import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Cart} from '../app-models/cart.model';

@Injectable()
export class CartService {
  private addCartUrl = ApplicationProperties.BackendRestUrl + 'addCart';
  private addUnknownUserCartUrl = ApplicationProperties.BackendRestUrl + 'unknownUserAddCart';
  private addExistingCartUrl = ApplicationProperties.BackendRestUrl + 'addExistingCart';
  private getCartUrl = ApplicationProperties.BackendRestUrl + 'getCart';
  cartChanged = new EventEmitter<Cart>();

  constructor(private httpClient: HttpClient) {}


  addCart(productCode: string) {
    if (localStorage.getItem('xAuthToken') != null) {
      alert('yes');
      const headers = new HttpHeaders({
        'x-auth-token': localStorage.getItem('xAuthToken')
      });
     return this.httpClient.post<Cart>(this.addCartUrl, productCode, {headers: headers});
    } else {
      alert('no');
      return this.httpClient.post<Cart>(this.addUnknownUserCartUrl, productCode);
    }
  }

  addToExistingCart(productCode: string, cartId: number) {
    if (localStorage.getItem('xAuthToken') != null) {
      const headers = new HttpHeaders({
        'x-auth-token': localStorage.getItem('xAuthToken')
      });
        return this.httpClient.post<Cart>(this.addExistingCartUrl, productCode + ':' + cartId, {headers: headers});
    } else {
        return this.httpClient.post<Cart>(this.addExistingCartUrl, productCode + ':' + cartId);
    }

  }

  getCart(cartId: number) {
    if (localStorage.getItem('xAuthToken') != null) {
      const headers = new HttpHeaders({
        'x-auth-token': localStorage.getItem('xAuthToken')
      });
      return this.httpClient.post<Cart>(this.getCartUrl, cartId, {headers: headers});
    } else {
      this.cartChanged.emit();
      return this.httpClient.post<Cart>(this.getCartUrl, cartId);
    }
  }

}
