export interface Product {
  id: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  [propName: string]: any;
}
export type CartProduct = {
    id: string;
    qty: number;
};

export type Cart = {
  products: CartProduct[],
  total: number
};
