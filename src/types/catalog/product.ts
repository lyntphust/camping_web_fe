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
  attributes: [
    {
      code: string;
      uid: string;
      value_index: number;
    }
  ];
  product: {
    uid: string;
    media_gallery_entries: string[];
    sku: string;
    stock_status: number;
    price: {
      regularPrice: {
        amount: {
          currency: string;
          value: number;
        };
      };
    };
    price_range: {
      maximum_price: {
        final_price: {
          currency: string;
          value: number;
        };
        discount: {
          amount_off: number;
        };
      };
    };
  };
}

export interface ProductDetail {
  id: number;
  name: string;
  color: string;
  discount: number;
  weight: string;
  price: number;
  photo: string;
  image: string;
  description: string;
  size: string;
  category: string;
  variants: any;
  totalSold: number;
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
