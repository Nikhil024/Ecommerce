import {Product} from '../app-models/product.model';
import {ProductCategory} from '../app-models/productCategory.model';
import {CartService} from '../app-services/cart.service';
import {ProductCategoryService} from '../app-services/product.category.service';
import {ProductService} from '../app-services/product.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  productCategories: ProductCategory[];
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private productCategoriesService: ProductCategoryService,
    private cartService: CartService) {}

  ngOnInit() {
    const productCode = this.route.snapshot.params['productCode'];
    this.productService.getProduct(productCode).subscribe(
      response => {
        this.product = response;
        console.log(JSON.stringify(response));
      }
    );
    this.productCategoriesService.getAllProductCategories().subscribe(
      response => this.productCategories = response
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
