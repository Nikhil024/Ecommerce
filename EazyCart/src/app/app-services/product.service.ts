import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Product} from '../app-models/product.model';
import {ProductCategory} from '../app-models/productCategory.model';

@Injectable()
export class ProductService {
  private getAllProductsUrl = ApplicationProperties.BackendRestUrl + 'getAllProducts';
  private getProductByCategoryUrl = ApplicationProperties.BackendRestUrl + 'getProductFromCategory';
  private getAllEnabledProductsUrl = ApplicationProperties.BackendRestUrl + 'getAllEnabledProducts';
  private getProductByCodeUrl = ApplicationProperties.BackendRestUrl + 'getProduct';
  private enableProductUrl = ApplicationProperties.BackendRestUrl + 'admin/enableProduct';
  private createNewProductUrl = ApplicationProperties.BackendRestUrl + 'admin/addProducts';
  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get<Product[]>(this.getAllProductsUrl);
  }

  getAllEnabledProducts() {
    return this.httpClient.get<Product[]>(this.getAllEnabledProductsUrl);
  }

  getProductByCategory(categoryId: ProductCategory) {
    return this.httpClient.post<Product[]>(this.getProductByCategoryUrl, categoryId);
  }

  getProduct(productCode: string) {
    return this.httpClient.post<Product>(this.getProductByCodeUrl, productCode);
  }

  enableProduct(product: Product) {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post(this.enableProductUrl, product, {headers: headers});
  }

  createNewProduct(product: Product) {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post(this.createNewProductUrl, product, {headers: headers});
  }


}
