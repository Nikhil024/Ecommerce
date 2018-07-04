import {Product} from './product.model';

export class Order {
  id: number;
  product: Product[];
  userId: number;
  addressId: number;
  createdOn: string;
  lastUpdatedOn: string;

  constructor(product: Product[], userId: number, addressId: number) {
    this.product = product;
    this.userId = userId;
    this.addressId = addressId;

  }
}
