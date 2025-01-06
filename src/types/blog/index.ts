import { ProductDetail } from "../catalog";

export interface BlogAuthor {
  name: string;
  avatar: string;
  email: string;
}

export enum BlogStatus {
  PENDING = "pending",
  APPROVED = "approve",
  REJECTED = "reject",
}

export interface Blog {
  id: number;
  text: string;
  image: string;
  bookmark: boolean;
  location: string;
  status: BlogStatus;
  user: BlogAuthor;
  createdAt: string;
  title: string;
  products: ProductDetail[];
}

export enum BlogMenuKey {
  ALL = "all",
  SAVED = "saved",
  MY = "my",
}
