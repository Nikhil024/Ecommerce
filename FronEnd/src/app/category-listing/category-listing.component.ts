import {Product} from '../app-models/product.model';
import {ProductCategory} from '../app-models/productCategory.model';
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
    private productService: ProductService) {}

  ngOnInit() {
    this.productCategoryService.getAllProductCategories().subscribe(
      response => {
        for (const category of response) {
          this.productCategories.push(category);
          if (category.type == this.route.snapshot.params['categoryType']) {
            this.productService.getProductByCategory(category).subscribe(
              response => {
                this.products = response;
                console.log(JSON.stringify(response));
              },
              error => JSON.stringify(error)
            );
          } else {
            console.log('no');
          }
        }
      }
    );
    this.route.params.subscribe(
      (params: Params) => {
        for (const category of this.productCategories) {
          if (category.type == params['categoryType']) {
            this.productService.getProductByCategory(category).subscribe(
              response => {
                this.products = response;
                console.log(JSON.stringify(response));
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
}
