export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export type NewProduct = Omit<Product, "id">;
