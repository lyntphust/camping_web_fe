import { BreadCrumbNode } from ".";

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
  __typename: string;
  id: string;
  uid: string;
  name: string;
  categories: [
    {
      uid: string;
      category_name: string;
      category_level: number;
      breadcrumbs: BreadCrumbNode[];
    }
  ];
  category?: {
    uid: string;
    category_name: string;
    category_level: number;
    breadcrumbs: BreadCrumbNode[];
  }; // Custom attribute for breadcrumb in product detail page
  description: string;
  short_description: {
    html: string;
  };
  image: string;
  media_gallery_entries: string[];
  price: number;
  discount: number;
  review_count: number;
  rating_summary: number;
  configurable_options: ConfigurableOption[];
  custom_attributes: [
    {
      attribute_metadata: string;
      entered_attribute_value: string;
      selected_attribute_options: [
        {
          attribute_option: {
            is_default: boolean;
            label: string;
            uid: string;
          };
        }
      ];
    }
  ];
  variants: ProductVariant[];
}
