import {Component, OnInit} from '@angular/core';
import {Cart} from '../app-models/cart.model';
import {User} from '../app-models/user.model';
import {CartService} from '../app-services/cart.service';
import {LoginService} from '../app-services/login.service';
import {UserService} from '../app-services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cart = new Cart(null, null);
  public user = new User('', '', '');
  public totalCartCount = 0;
  public totalCartCost = 0;
  public loggedIn = false;
  constructor(private cartService: CartService,
    private loginService: LoginService,
    private userService: UserService) {}

  ngOnInit() {
    this.cartService.cart.subscribe(
      (currentCart: Cart) => {
        this.totalCartCount = 0;
        this.totalCartCost = 0;
        this.cart = currentCart;
        for (const product of this.cart.product) {
          this.totalCartCount += 1;
          this.totalCartCost += product.offerPrice;
        }
      }
    );

    this.cartService.getCart(parseInt(localStorage.getItem('cartId'), 10)).subscribe(
      response => {
        this.totalCartCount = 0;
        this.totalCartCost = 0;
        this.cart = response;
          for (const product of this.cart.product) {
            this.totalCartCount += 1;
            this.totalCartCost += product.offerPrice;
        }
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );

    if (!this.loggedIn) {
      this.loginService.checkSession().subscribe(
        response => {
          this.loggedIn = true;
          this.getUser();
        },
        error => {
          this.loggedIn = false;
          // localStorage.clear();
        }
      );
    }
    console.log('1' + localStorage.getItem('cartId') != null);
    console.log('2' + this.cart != null);
    console.log('3' + this.cart.product != null);
    console.log('4' + localStorage.getItem('cartId') != null && this.cart !== null && this.cart.product !== null);
  }

  logout() {
    this.loginService.logout().subscribe(
      response => {
        console.log(JSON.stringify(response));
        this.loggedIn = true;
      },
      error => {
        console.log(JSON.stringify(error));
        this.loggedIn = false;
      }
    );
  }

  getUser() {
    this.userService.getUser().subscribe(
      response => this.user = response,
      error => console.log('error ' + JSON.stringify(error))
    );
  }

}
