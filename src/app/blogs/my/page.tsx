"use client";

import BlogList from "@/components/blog/BlogList";
import { useAuth } from "@/context/AuthContext";
import { useListBlog } from "@/hooks/blog/useBlogs";
import { parseJwt } from "@/util";
import { Button, Pagination } from "antd";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function MyBlogs() {
  const { accessToken } = useAuth();

  const { data: listBlog, fetchData, isLoading } = useListBlog();

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

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const { id } = parseJwt(accessToken);

    fetchData(`/blog/admin?userId=${id}`);
  }, [fetchData, accessToken]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Button className="px-8 py-3 mb-6 text-center text-lg h-fit w-fit text-gray-100 bg-blue-600 border border-transparent hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-xl">
        <Link href="/blogs/create">Tạo blog mới</Link>
      </Button>
      <BlogList blogs={blogs} hiddenBookMark />
      <Pagination
        className="mt-10 text-center"
        hideOnSinglePage
        defaultCurrent={1}
        total={Math.ceil(blogs.length / postsPerPage)}
        onChange={paginate}
      />
    </>
  );
}
