import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Product} from '../app-models/product.model';
import { ProductCategory } from '../app-models/productCategory.model';

@Injectable()
export class ProductService {
  private getAllProductsUrl = ApplicationProperties.BackendRestUrl + 'getAllProducts';
  private getProductByCategoryUrl = ApplicationProperties.BackendRestUrl + 'getProductFromCategory';

  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get<Product[]> (this.getAllProductsUrl);
  }
  
  getProductByCategory(categoryId: ProductCategory) {
     return this.httpClient.post<Product[]> (this.getProductByCategoryUrl, categoryId);
  }


}
