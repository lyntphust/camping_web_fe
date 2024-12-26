export interface Product {
  id: number;
  name: string;
  photo: string;
  description: string;
  discount: number;
  price: number;
}

export interface ProductVariant {
  id: number;
  color: string;
  size: string;
  price: number;
  product: Product;
}

export interface OrderProduct {
  id: number;
  quantity: number;
  productVariant: ProductVariant;
  photo: string;
  name: string;
}

export interface Order {
  id: number;
  address: string;
  price: number;
  date: string;
  status: string;
  userId: number;
  OrdersProducts: OrderProduct[];
  phone: string;
}
