"use client";

import { useBlogById } from "@/hooks/blog/useBlogs";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button, Image } from "antd";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: PageProps) {
  const { data: blog } = useBlogById(Number(id));

  const router = useRouter();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const { id: blogId, image, location, text } = blog;

  return (
    <div>
      <Button
        onClick={() => router.back()}
        className="items-center font-medium pl-8 pr-10 py-2 hover:text-blue-700"
      >
        <ArrowLeftIcon className="w-8 h-4" />
        Quay lại
      </Button>
      <p>{location}</p>
      <Image src={image} alt="blog-image" />
      <p>{text}</p>
    </div>
  );
}
