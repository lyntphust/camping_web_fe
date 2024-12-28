"use client";

import { Banner, FeaturedProducts } from "@/components/home";
import ListBlog from "@/components/home/ListBlog";
import { useListBlogAll } from "@/hooks/blog/useBlogs";
import productApi from "@/services/product";
import { message } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  const { data: listBlog } = useListBlogAll();
  const blogData =
    listBlog?.data?.filter((blog) => blog.status === "approve") || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApi.getListProducts();
        setProducts(response.data.data);
      } catch (error) {
        message.error("Cannot get products! Please try again.");
      }
    };

    fetchData();
  }, []);
  return (
    <main>
      <Banner />
      <FeaturedProducts />
      <ListBlog blogData={blogData} />
    </main>
  );
}
