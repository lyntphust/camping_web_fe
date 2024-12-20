export interface VariantProduct {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export interface ItemVariant {
  id: number;
  color?: string;
  size?: string;
  price: number;
  product: VariantProduct;
}

export interface CartItem {
  id: number;
  quantity: number;
  productVariant: ItemVariant;
}

export interface Cart {
  total: number;
  items: CartItem[];
}
