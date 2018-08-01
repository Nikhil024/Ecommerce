import {ProductCategory} from './productCategory.model';

export interface Product {
  id: number;
  code: string;
  description: string;
  stock: number;
  price: number;
  offerPrice: number;
  category: ProductCategory;
  image: Blob;
  enabled: boolean;
  createdOn: string;
  lastUpdatedOn: string;
}
