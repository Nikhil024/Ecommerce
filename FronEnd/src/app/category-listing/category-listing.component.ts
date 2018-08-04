import {Product} from '../app-models/product.model';
import {ProductCategory} from '../app-models/productCategory.model';
import {CartService} from '../app-services/cart.service';
import {ProductCategoryService} from '../app-services/product.category.service';
import {ProductService} from '../app-services/product.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  products: Product[];

  constructor(private route: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private cartService: CartService) {}

  ngOnInit() {
    this.productCategoryService.getAllEnabledProductCategories().subscribe(
      response => {
        for (const category of response) {
          this.productCategories.push(category);
          if (category.code === this.route.snapshot.params['categoryType']) {
            this.productService.getProductByCategory(category).subscribe(
              (products: Product[]) => {
                this.products = products;
              },
              error => JSON.stringify(error)
            );
          }
        }
      }
    );
    this.route.params.subscribe(
      (params: Params) => {
        for (const category of this.productCategories) {
          if (category.code === params['categoryType']) {
            this.productService.getProductByCategory(category).subscribe(
              response => {
                this.products = response;
              },
              error => JSON.stringify(error)
            );
          } else {
            console.log('no');
          }
        }
      }
    );
  }

  addToCart(product: Product) {
    if (localStorage.getItem('cartId') != null) {
      this.cartService.addToExistingCart(product.code, parseInt(localStorage.getItem('cartId'), 10)).subscribe(
        response => {
          this.cartService.cart.next(response);
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
    } else {
      this.cartService.addCart(product.code).subscribe(
        response => {
          this.cartService.cart.next(response);
          localStorage.setItem('cartId', response.id.toString());
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }

}
