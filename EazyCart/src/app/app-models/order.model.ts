import { Address } from './address.model';
import {Product} from './product.model';

export class Order {
  id: number;
  product: Product[];
  address: Address;
  orderStatus: string;
  userId: number;
  createdOn: string;
  lastUpdatedOn: string;

  constructor(product: Product[], address: Address, orderStatus: string) {
    this.product = product;
    this.address = address;
    this.orderStatus = orderStatus;
  }
}
