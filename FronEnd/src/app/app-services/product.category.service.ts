import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {ProductCategory} from '../app-models/productCategory.model';

@Injectable()
export class ProductCategoryService {
  private getAllProductCategoriesUrl = ApplicationProperties.BackendRestUrl + 'getAllCategories';
  private getAllEnabledCategoriesUrl = ApplicationProperties.BackendRestUrl + 'getAllEnabledCategories';
  private enableProductCategoriesUrl = ApplicationProperties.BackendRestUrl + 'admin/enableCategory';
  private createNewCategoriesUrl = ApplicationProperties.BackendRestUrl + 'admin/addCategories';
  constructor(private httpClient: HttpClient) {}

  getAllProductCategories() {
    return this.httpClient.get<ProductCategory[]>(this.getAllProductCategoriesUrl);
  }


  getAllEnabledProductCategories() {
    return this.httpClient.get<ProductCategory[]>(this.getAllEnabledCategoriesUrl);
  }

  enableProductCategories(category: ProductCategory) {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post(this.enableProductCategoriesUrl, category, {headers: headers});
  }

  createNewCategory(category: ProductCategory) {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post(this.createNewCategoriesUrl, category, {headers: headers});
  }
}
