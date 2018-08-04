import {Component, OnInit} from '@angular/core';
import {User} from '../../app-models/user.model';
import {UserService} from '../../app-services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../app-services/product.service';
import {ProductCategoryService} from '../../app-services/product.category.service';
import {Product} from '../../app-models/product.model';
import {ProductCategory} from '../../app-models/productCategory.model';
import {LoginService} from '../../app-services/login.service';

@Component({
  selector: 'app-enable-item',
  templateUrl: './enable-item.component.html',
  styleUrls: ['./enable-item.component.css']
})
export class EnableItemComponent implements OnInit {
  private users: User[];
  private itemType: string;
  private products: Product[];
  private productCategories: ProductCategory[];
  public seachFilterUI = '';
  private currentUser: User;
  constructor(private router: Router,
    private activatedRouted: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private loginService: LoginService) {

    this.loginService.searchFilter.subscribe(
      (response: string) => {
        if (response != null) {
          this.seachFilterUI = response;
        }
      });

    this.userService.getUser().subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    );

  }

  ngOnInit() {
    this.activatedRouted.params.subscribe(
      (params: Params) => {
        this.itemType = params['item'];
        if (params['item'] === 'user') {
          this.getUser();
        } else if (params['item'] === 'category') {
          this.getAllProductCategories();
        } else if (params['item'] === 'product') {
          this.getAllProducts();
        }
      }
    );

  }

  getUser() {
    this.userService.getAllUsers().subscribe(
      response => {
        this.users = response;
      },
      error => {console.log('error ' + JSON.stringify(error));}
    );
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  getAllProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe(
      (productCategories: ProductCategory[]) => {
        this.productCategories = productCategories;
      }
    );
  }

  productStatus(category: ProductCategory) {
    if (category.enabled) {
      category.enabled = false;
    } else {
      category.enabled = true;
    }
    this.productCategoryService.enableProductCategories(category).subscribe(
      response => {
        console.log('success:: ' + JSON.stringify(response));
      },
      error => {
        console.log('error' + JSON.stringify(error));
      }
    );
  }



  enableProduct(product: Product) {
    if (!product.category.enabled) {
      document.getElementById('productCategoryEnablingModal').click();
    }
    if (product.enabled) {
      product.enabled = false;
    } else {
      product.enabled = true;
      product.category.enabled = true;
    }
    this.productService.enableProduct(product).subscribe(
      response => {
        console.log('success:: ' + JSON.stringify(response));
      },
      error => {
        console.log('error' + JSON.stringify(error));
      }
    );
  }

}
