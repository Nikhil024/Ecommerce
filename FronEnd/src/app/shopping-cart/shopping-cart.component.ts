import { Component, OnInit } from '@angular/core';
import {Cart} from '../app-models/cart.model';
import {CartService} from '../app-services/cart.service';

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
          this.cart = response;
          for ( let i = 0; i <= this.cart.product.length; i++) {
            this.totalCost += this.cart.product[i].offerPrice;
          }
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }

}
