"use client";

import { useBlogById } from "@/hooks/blog/useBlogs";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: PageProps) {
  const { data: blog } = useBlogById(Number(id));

  return <div>My Post: {JSON.stringify(blog, null, 2)}</div>;
}
