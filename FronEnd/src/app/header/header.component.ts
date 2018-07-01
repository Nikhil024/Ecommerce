import { Component, OnInit } from '@angular/core';
import {Cart} from '../app-models/cart.model';
import {CartService} from '../app-services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cart = new Cart();
  public totalCartCount = 0;
  public totalCartCost = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart.subscribe(
      (currentCart: Cart) => {
        this.totalCartCount = 0;
        this.cart = currentCart;
        for (const product of this.cart.product) {
          this.totalCartCount += 1;
          console.log(JSON.stringify(product));
        }
      }
    );
    console.log('1' + localStorage.getItem('cartId') != null);
    console.log('2' + this.cart != null);
    console.log('3' + this.cart.product != null);
    console.log('4' + localStorage.getItem('cartId') != null && this.cart !== null && this.cart.product !== null);
  }

}
