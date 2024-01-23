"use client";

import BreadCrumb from "@/components/Breadcrumb";
import ConfigurableProduct from "@/components/catalog/product/detail/ConfigurableProduct";
import { productDetail } from "@/data";
import productApi from "@/services/product";
import { ProductDetail as ProductDetailInteface } from "@/types";
import { message } from "antd";
import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

interface Props {
  params: {
    id: string;
  };
}

const renderProductDetail = (product: ProductDetailInteface) => {
  return <ConfigurableProduct product={product} />;
};

export default function ProductDetail({ params: { id } }: Props) {
  const product = productDetail;

  const { name: productName, category } = product;
  const [products, setProducts] = useState([]);

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
      <IntlProvider locale="en">
        <section>
          {category && (
            <BreadCrumb
              breadcrumb={category.breadcrumbs}
              currentNode={productName}
            />
          )}
          {renderProductDetail(products[1])}
        </section>
      </IntlProvider>
    </div>
  );
}
