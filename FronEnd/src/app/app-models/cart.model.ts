import {Product} from './product.model';

export interface Cart {
  id: number;
  product: Product[];
  userId: number;
  createdOn: string;
  lastUpdatedOn: string;
}
