"use client";

import { Banner, FeaturedProducts } from "@/components/home";
import ListBlog from "@/components/home/ListBlog";
import productApi from "@/services/product";
import { message } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

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
      <ListBlog />
    </main>
  );
}
