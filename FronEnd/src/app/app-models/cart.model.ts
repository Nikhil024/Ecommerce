import {Product} from './product.model';

export class Cart {
  id: number;
  product: Product[];
  userId: number;
  createdOn: string;
  lastUpdatedOn: string;
}
