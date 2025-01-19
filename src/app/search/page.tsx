"use client";

import ProductCard from "@/components/catalog/product/ProductCard";
import useSearchPage from "@/hooks/catalog/useSearchPage";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchPage() {
  const { data, fetchData, isLoading, error, refetch } = useSearchPage();
  const searchParams = useSearchParams();

  const products = data?.data;

  useEffect(() => {
    const query = searchParams.get("q");

    if (query) {
      fetchData("/product/search", { q: query });
    }
  }, [fetchData, searchParams]);

  return (
    <div className="container mx-auto mt-10 max-w-7xl">
      <h1>Kết quả tìm kiếm</h1>
      {Number(products?.length) > 0 ? (
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-6 mt-10 mb-5">
          {products
            ?.sort((a, b) => {
              const totalSoldA = a.variants.reduce(
                (acc, variant) => acc + (variant?.sold || 0),
                0
              );
              const totalSoldB = b.variants.reduce(
                (acc, variant) => acc + (variant?.sold || 0),
                0
              );
              return totalSoldB - totalSoldA;
            })
            .map((product) => (
              <li key={product?.id} className="h-full">
                <ProductCard product={product} />
              </li>
            ))}
        </ul>
      ) : (
        <div>
          <p>Không tìm thấy sản phẩm nào!</p>
        </div>
      )}
    </div>
  );
}
