import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {ProductCategory} from '../app-models/productCategory.model';

@Injectable()
export class ProductCategoryService {
  private getAllProductCategoriesUrl = ApplicationProperties.BackendRestUrl + 'getAllCategories';

  constructor(private httpClient: HttpClient) {}

  getAllProductCategories() {
    return this.httpClient.get<ProductCategory[]>(this.getAllProductCategoriesUrl);
  }


}
