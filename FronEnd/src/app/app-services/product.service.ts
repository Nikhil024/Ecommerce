import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Product} from '../app-models/product.model';

@Injectable()
export class ProductService {
  private getAllProductsUrl = ApplicationProperties.BackendRestUrl + 'getAllProducts';

  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get<Product[]> (this.getAllProductsUrl);
  }


}
