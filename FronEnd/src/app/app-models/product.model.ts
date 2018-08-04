import {ProductCategory} from './productCategory.model';

export class Product {
  id: number;
  code: string;
  description: string;
  stock: number;
  price: number;
  offerPrice: number;
  category: ProductCategory;
  imageName: string;
  enabled: boolean;
  createdOn: string;
  lastUpdatedOn: string;


  constructor(code: string, description: string,
              stock: number, price: number, offerPrice: number,
              category: ProductCategory, imageName: string, enabled: boolean) {

    this.code = code;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.offerPrice = offerPrice;
    this.category = category;
    this.imageName = imageName;
    this.enabled = enabled;

  }

}
