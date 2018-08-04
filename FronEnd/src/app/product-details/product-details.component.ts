import {Product} from '../app-models/product.model';
import {ProductCategory} from '../app-models/productCategory.model';
import {CartService} from '../app-services/cart.service';
import {ProductCategoryService} from '../app-services/product.category.service';
import {ProductService} from '../app-services/product.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Cart} from '../app-models/cart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  productCategories: ProductCategory[];
  currentCategory: string;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private productCategoriesService: ProductCategoryService,
    private cartService: CartService) {}

  ngOnInit() {

    const productCode = this.route.snapshot.params['productCode'];
    this.productService.getProduct(productCode).subscribe(
      (product: Product) => {
        this.product = product;
        console.log(JSON.stringify(product));
      }
    );
    this.productCategoriesService.getAllProductCategories().subscribe(
      (categories: ProductCategory[]) => this.productCategories = categories
    );

    this.route.params.subscribe(
      (params: Params) => {
       this.currentCategory =  params['categoryType'];
      }
    );



  }
  addToCart(product: Product) {
      if (localStorage.getItem('cartId') != null) {
        this.cartService.addToExistingCart(product.code, parseInt(localStorage.getItem('cartId'), 10)).subscribe(
          (cart: Cart) => {
            this.cartService.cart.next(cart);
          },
          error => {
            console.log(JSON.stringify(error));
          }
        );
      } else {
        this.cartService.addCart(product.code).subscribe(
          (cart: Cart) => {
            this.cartService.cart.next(cart);
            localStorage.setItem('cartId', cart.id.toString());
          },
          error => {
            console.log(JSON.stringify(error));
          }
        );
      }
    }
}
