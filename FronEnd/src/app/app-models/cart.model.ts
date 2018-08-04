import {Product} from './product.model';

export class Cart {
  id: number;
  product: Product[];
  userId: number;
  createdOn: string;
  lastUpdatedOn: string;

  constructor(id: number, product: Product[]) {
    this.id = id;
    this.product = product;
  }
}
