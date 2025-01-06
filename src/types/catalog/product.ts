export interface ProductPartialPrice {
  regular_price: {
    value: number;
    currency: string;
  };
  final_price: {
    value: number;
    currency: string;
  };
  discount: {
    amount_off: number;
    percent_off: number;
  };
}

export interface ProductAggregationOption {
  label: string;
  value: string;
}

export interface ProductAggregation {
  attribute_code: string;
  count: number;
  label: string;
  options: ProductAggregationOption[];
}

export interface SwatchData {
  __typename: string;
  value: string;
}

export interface ConfigurableOptionValue {
  uid: string;
  default_label: string;
  label: string;
  store_label: string;
  use_default_value: boolean;
  value_index: number;
  swatch_data?: SwatchData;
}

export interface ConfigurableOption {
  attribute_code: string;
  attribute_id: string;
  label: string;
  uid: string;
  values: ConfigurableOptionValue[];
}
export interface ProductVariant {
  id: number;
  stock?: number;
  sold?: number;
  size?: string;
  color?: string;
  price: number;
  product?: ProductDetail;
}

export interface ProductDetail {
  id: number;
  name: string;
  discount: number;
  weight: string;
  price: number;
  photo: string;
  image: string;
  description: string;
  category: string;
  variants: ProductVariant[];
  totalSold: number;
  rating_summary?: number;
  review_count?: number;
}

export interface FavProduct {
  id: number;
  userId: number;
  productId: number;
}

export interface ListCommentProduct {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  date: string;
  createdAt: string;
  rating: number;
  comment: string;
}
