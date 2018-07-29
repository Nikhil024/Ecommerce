export interface Product {
  id: number;
  code: string;
  description: string;
  stock: number;
  price: number;
  offerPrice: number;
  image: Blob;
  enabled: boolean;
  createdOn: string;
  lastUpdatedOn: string;
}
