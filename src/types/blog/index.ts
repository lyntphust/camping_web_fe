export interface BlogAuthor {
  name: string;
  avatar: string;
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
}
