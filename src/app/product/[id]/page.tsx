"use client";

import ConfigurableProduct from "@/components/catalog/product/detail/ConfigurableProduct";
import productApi from "@/services/product";
import { ProductDetail as ProductDetailInteface } from "@/types";
import { message } from "antd";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: number;
  };
}

const renderProductDetail = (product: ProductDetailInteface | undefined) => {
  if (!product) {
    return null;
  }

  return <ConfigurableProduct product={product} />;
};

export default function ProductDetail({ params: { id } }: Props) {
  const [products, setProducts] = useState<ProductDetailInteface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApi.getListProducts();
        setProducts(response.data);
      } catch (error) {
        message.error("Cannot get products! Please try again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section>
        {renderProductDetail(products.find((product) => product.id == id))}
      </section>
    </div>
  );
}
