import {Component, OnInit} from '@angular/core';
import {LoginService} from '../app-services/login.service';
import {UserService} from '../app-services/user.service';
import {User} from '../app-models/user.model';
import {ProductCategory} from '../app-models/productCategory.model';
import {Product} from '../app-models/product.model';
import {ProductService} from '../app-services/product.service';
import {ProductCategoryService} from '../app-services/product.category.service';
import {CartService} from '../app-services/cart.service';
import {Cart} from '../app-models/cart.model';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html'
})
export class ProductListingComponent implements OnInit {
  public user = new User('', '', '', '', '', false);
  public productCategories: ProductCategory[];
  products: Product[];
  public cart: Cart;
  public currentCart: Cart;
  public totalCartCount = 0;
  public totalCartCost = 0;
  public loggedIn = false;
  public seachFilterUI = '';
  private continueToAddCart = true;
  public applicationName = ApplicationProperties.ApplicationName;

  constructor(private loginService: LoginService,
    private userService: UserService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private cartService: CartService,
    private router: Router) {

    this.loginService.searchFilter.subscribe(
      (response: string) => {
        if (response != null) {
          this.seachFilterUI = response;
        }
      });
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllProductCategories();
    this.getCart();
    this.checkSession();
    this.loginService.loginBanner.subscribe(
    response => {
      if (response) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
    error => {
      this.loggedIn = false;
    }
  );
  }


  logout() {
    this.loginService.logout().subscribe(
      response => {
        this.loggedIn = true;
        localStorage.clear();
      },
      error => {
        console.log(JSON.stringify(error));
        this.loggedIn = false;
      }
    );
  }

  getUser() {
    this.userService.getUser().subscribe(
      (user: User) => this.user = user,
      error => {
        console.log('error ' + JSON.stringify(error));
        this.router.navigate(['/errorpage']);
      }
    );
  }

  getAllProducts() {
    this.productService.getAllEnabledProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      error => {
        console.log('error:: ' + JSON.stringify(error));
        this.router.navigate(['/errorpage']);
      }
    );
  }

  getAllProductCategories() {
    this.productCategoryService.getAllEnabledProductCategories().subscribe(
      (categories: ProductCategory[]) => {
        this.productCategories = categories;
      },
      error => {
        console.log('error:: ' + JSON.stringify(error));
        this.router.navigate(['/errorpage']);
      }
    );
  }

  getCart() {
    if (localStorage.getItem('cartId') != null) {
      this.cartService.getCart(parseInt(localStorage.getItem('cartId'), 10)).subscribe(
        (cart: Cart) => {
          if (cart !== null && cart.product != null) {
            this.cart = cart;
            this.totalCartCount = this.cart.product.length;
            for (const cartProduct of this.cart.product) {
              if (cartProduct != null) {
                $('#' + cartProduct.code + '_cart').text('Added In Cart');
                this.totalCartCost += cartProduct.offerPrice;
              }
            }
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
    $('#' + product.code + '_cart').text('Added In Cart');
    if (this.cart != null && this.cart.product != null) {
      this.continueToAddCart = true;
      for (const cartProduct of this.cart.product) {
        if (cartProduct.code === product.code) {
          this.continueToAddCart = false;
          document.getElementById('alreadyInCartProduct').click();
        }
      }
    }
    if (this.continueToAddCart) {
      if (localStorage.getItem('cartId') != null) {
        this.cartService.addToExistingCart(product.code, parseInt(localStorage.getItem('cartId'), 10)).subscribe(
          (cart: Cart) => {
            this.cart = cart;
            this.cartService.cart.next(cart);
          },
          error => {
            console.log(JSON.stringify(error));
            this.router.navigate(['/errorpage']);
          }
        );
      } else {
        this.cartService.addCart(product.code).subscribe(
          (cart: Cart) => {
            this.cartService.cart.next(cart);
            this.cart = cart;
            localStorage.setItem('cartId', this.cart.id.toString());
          },
          error => {
            console.log(JSON.stringify(error));
            this.router.navigate(['/errorpage']);
          }
        );
      }
    }
  }

  checkSession() {
    if(localStorage.getItem('xAuthToken') != null){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
}
