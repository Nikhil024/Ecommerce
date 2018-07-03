import { Component, OnInit } from '@angular/core';
import {Cart} from '../app-models/cart.model';
import {CartService} from '../app-services/cart.service';
import {Product} from '../app-models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart = new Cart();
  totalCost = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    if (localStorage.getItem('cartId') != null) {
      this.cartService.getCart(parseInt(localStorage.getItem('cartId'), 10)).subscribe(
        response => {
          this.totalCost = 0;
          this.cart = response;
          for ( const responseProduct of response.product) {
            this.totalCost += responseProduct.offerPrice;
          }
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }

  removeProduct(product: Product) {
      const removeProduct = this.cart.product.indexOf(product.code);
      this.cart.product.splice(removeProduct, 1);
      if (parseInt(localStorage.getItem('cartId'), 10) != null) {
        this.cartService.removeCart(product.code, parseInt(localStorage.getItem('cartId'), 10)).subscribe(
          response => {
            this.totalCost = 0;
            this.cart = response;
            for ( const responseProduct of response.product) {
              this.totalCost += responseProduct.offerPrice;
            }
            this.cartService.cart.next(response);
          }
        );
      }
  }

}
