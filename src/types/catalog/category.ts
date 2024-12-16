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
