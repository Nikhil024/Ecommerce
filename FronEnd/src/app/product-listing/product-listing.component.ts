import { Component, OnInit } from '@angular/core';
import {LoginService} from '../app-services/login.service';
import {UserService} from '../app-services/user.service';
import {User} from '../app-models/user.model';
import {ProductCategory} from '../app-models/productCategory.model';
import {Product} from '../app-models/product.model';
import {ProductService} from '../app-services/product.service';
import {ProductCategoryService} from '../app-services/product.category.service';
import {CartService} from '../app-services/cart.service';
import {Cart} from '../app-models/cart.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html'
})
export class ProductListingComponent implements OnInit {
  public user = new User('', '' , '');
  public productCategories: ProductCategory[];
  products: Product[];
  public cart = new Cart(null , null);
  public totalCartCount = 0;
  public totalCartCost = 0;
  public loggedIn = false;
  public seachFilterUI = '';

  constructor(private loginService: LoginService,
              private userService: UserService,
              private productService: ProductService,
              private productCategoryService: ProductCategoryService,
              private cartService: CartService,
              private router: Router) {

    this.loginService.searchFilter.subscribe(
      (response: string) => {
        if (response != null ) {
          this.seachFilterUI = response;
        }
    });
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllProductCategories();
    this.getCart();
    this.checkSession();
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
      response => this.user = response ,
      error => {
        console.log('error ' + JSON.stringify(error));
        this.router.navigate(['/errorpage']);
        }
     );
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      response => {
        this.products = response;
      },
      error => {
        console.log('error:: ' + JSON.stringify(error));
        this.router.navigate(['/errorpage']);
      }
    );
  }

  getAllProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe(
      response => {
        this.productCategories = response;
      },
      error => {
        console.log('error:: ' + JSON.stringify(error));
        this.router.navigate(['/errorpage']);
      }
    );
  }

  getCart() {
    if (localStorage.getItem('cartId') != null && this.cart != null && this.cart.product != null) {
      this.cartService.getCart(parseInt(localStorage.getItem('cartId'), 10)).subscribe(
        response => {
          this.cart = response;
          this.totalCartCount = this.cart.product.length;
          for (let i = 0; i <= this.cart.product.length; i++) {
            this.totalCartCost += response.product[i].offerPrice;
          }
        },
        error => {
          console.log(JSON.stringify(error));
          this.router.navigate(['/errorpage']);
        }
      );
    }
  }

  addToCart(product: Product) {
    if (localStorage.getItem('cartId') != null) {
      this.cartService.addToExistingCart(product.code, parseInt(localStorage.getItem('cartId'), 10)).subscribe(
        response => {
          this.cart = response;
          this.cartService.cart.next(response);
        },
        error => {
          console.log(JSON.stringify(error));
          this.router.navigate(['/errorpage']);
        }
      );
    } else {
      this.cartService.addCart(product.code).subscribe(
        response => {
          this.cartService.cart.next(response);
          this.cart = response;
          localStorage.setItem('cartId', this.cart.id.toString());
        },
        error => {
          console.log(JSON.stringify(error));
          this.router.navigate(['/errorpage']);
        }
      );
    }
  }

  checkSession() {
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

}
