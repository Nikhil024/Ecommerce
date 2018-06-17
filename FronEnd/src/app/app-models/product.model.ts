export interface Product {
  id: number;
  code: string;
  description: string;
  stock: number;
  price: number;
  type: string;
  image: Blob;
  createdOn: string;
  lastUpdatedOn: string;
}
