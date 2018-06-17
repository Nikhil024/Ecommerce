import {Product} from './product.model';

export interface Order {
  id: number;
  product: Product[];
  userId: number;
  addressId: number;
  createdOn: string;
  lastUpdatedOn: string;
}
