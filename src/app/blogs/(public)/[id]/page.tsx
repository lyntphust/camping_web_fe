"use client";

import { useBlogById } from "@/hooks/blog/useBlogs";
import { Image } from "antd";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: PageProps) {
  const { data: blog } = useBlogById(Number(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const { id: blogId, image, location, text } = blog;

  return (
    <div>
      <p>{location}</p>
      <Image src={image} alt="blog-image" />
      <p>{text}</p>
    </div>
  );
}
