export interface CategoryNode {
  id: number;
  uid: string;
  level: number;
  name: string;
  path: string;
  url_path: string;
  url_key: string;
  children_count?: number;
  children?: CategoryNode[];
  is_active?: boolean;
}

export interface CategoryDetail {
  id: number;
  uid: string;
  level: number;
  name: string;
  path: string;
  url_path: string;
  url_key: string;
}

export enum FilterCode {
  COLOR = "Color",
  SIZE = "Size",
  PRICE = "Price",
}

export interface FilterValue {
  label: string;
  value: string;
}

export interface Filter {
  key: FilterCode;
  name: string;
  code: FilterCode;
}

export interface StringFilter extends Filter {
  values: FilterValue[];
}

export interface RangeFilter extends Filter {
  min: number;
  max: number;
}
