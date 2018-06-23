export interface Product {
  id: number;
  code: string;
  description: string;
  stock: number;
  price: number;
  offerPrice: number;
  image: Blob;
  createdOn: string;
  lastUpdatedOn: string;
}
