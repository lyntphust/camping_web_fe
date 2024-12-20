"use client";

import BlogList from "@/components/blog/BlogList";
import { useAuth } from "@/context/AuthContext";
import { useListBlogAll } from "@/hooks/blog/useBlogs";
import { Button, Pagination } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";

const Blog = () => {
  const { accessToken } = useAuth();

  const { data: listBlog, isLoading } = useListBlogAll();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const blogs = useMemo(() => {
    if (!Array.isArray(listBlog?.data)) {
      return [];
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    return listBlog.data
      ?.map((blog) => ({
        key: blog.id,
        ...blog,
      }))
      .slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, listBlog]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Button className="px-8 py-3 mb-6 text-center text-lg h-fit w-fit text-gray-100 bg-blue-600 border border-transparent hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-xl">
        <Link href="/blogs/create">Tạo blog mới</Link>
      </Button>
      <BlogList blogs={blogs} />
      <Pagination
        className="mt-10 text-center"
        hideOnSinglePage
        defaultCurrent={1}
        total={Math.ceil(blogs.length / postsPerPage)}
        onChange={paginate}
      />
    </>
  );
};

export default Blog;
