export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface Blog {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  author: BlogAuthor;
}
