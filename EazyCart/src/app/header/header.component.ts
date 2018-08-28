import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Cart} from '../app-models/cart.model';
import {User} from '../app-models/user.model';
import {CartService} from '../app-services/cart.service';
import {LoginService} from '../app-services/login.service';
import {UserService} from '../app-services/user.service';
import { ApplicationProperties } from '../properties/applicationproperties';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cart = new Cart(null, null);
  public user = new User('', '' , '', '', '', false);
  public totalCartCount = 0;
  public totalCartCost = 0;
  public loggedIn = false;
  public showLogoutBanner = false;
  public showLoginBanner = false;
  public showLoginRequired = false;
  url;
  public applicationName = ApplicationProperties.ApplicationName;
  breadCrumbValue = [];
  public seachFilter = '';
  userRole: string;
  itemType: string;

  constructor(private cartService: CartService,
              public loginService: LoginService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
                  this.showLoginBanner = true;
                  setTimeout(() => {
                      this.showLoginBanner = false;
                      this.showLogoutBanner = false;
                  }, 3000);

  }



  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.itemType = params['item'];
      }
    );

    this.route.url.subscribe(
      (url) => {
        this.url = url.toString().split(',');
        for (const u of this.url.reverse) {
          if (this.url.reverse.length === this.breadCrumbValue.length) {
            this.breadCrumbValue.push(url);
          } else {
            this.breadCrumbValue.push(u);
          }
        }
      }
    );

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

    if (localStorage.getItem('cartId') != null) {
      this.cartService.getCart(parseInt(localStorage.getItem('cartId'), 10)).subscribe(
        (cart: Cart) => {
          this.totalCartCount = 0;
          this.totalCartCost = 0;
          this.cart = cart;
          if (cart != null && cart.product != null) {
            for (const product of cart.product) {
              this.totalCartCount += 1;
              this.totalCartCost += product.offerPrice;
            }
          }
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
    }

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
  }

  logout() {
    this.showLogoutBanner = true;
    this.loginService.logout().subscribe(
      response => {
        this.loggedIn = true;
        localStorage.removeItem('xAuthToken');
      },
      error => {
        localStorage.removeItem('xAuthToken');
        this.loggedIn = false;
      }
    );
  }

  getUser() {
    this.userService.getUser().subscribe(
      response => {
        this.user = response;
        this.userRole = this.user.role;
      },
        error => {console.log('error ' + JSON.stringify(error)); }
    );
  }

  searchFilterCriteria() {
    this.loginService.searchFilter.next(this.seachFilter);
  }

  cartStatus() {
    if (!this.loggedIn) {
      document.getElementById('abc').click();
      this.showLoginRequired = true;
    } else {
      this.showLoginRequired = false;
    }
  }

}
