"use client";

import Pagination from "@/components/Pagination";
import ProductFilter from "@/components/catalog/category/ProductFilter";
import ProductCard from "@/components/catalog/product/ProductCard";
import { PRODUCT_LISTING_PAGE_SIZE } from "@/constants";
import productApi from "@/services/product";
import { FilterCode, ProductDetail, RangeFilter, StringFilter } from "@/types";
import { upsertQueryParam, upsertQueryParams } from "@/util";
import { message } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  categoryId?: number;
}

export default function CategoryProductList({ categoryId }: Props) {
  const [currentPage, setCurrentPage] = useState<number | undefined>();
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDetail[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    var result: (StringFilter | RangeFilter)[] = [];
    let minPrice = 1000000000,
      maxPrice = 0;

    const getFilterName = (filterCode: string) => {
      switch (filterCode) {
        case FilterCode.COLOR:
          return "Màu sắc";
        case FilterCode.SIZE:
          return "Kích thước";
        default:
          return "";
      }
    };

    const addStringFilterValue = (code: FilterCode, value: string) => {
      const existingFilter = result.find(
        (filter) => filter.code === code
      ) as StringFilter;

      if (!existingFilter) {
        result.push({
          key: code,
          code,
          name: getFilterName(code),
          values: [{ value, label: value }],
        });
      } else {
        if (existingFilter.values) {
          if (
            !existingFilter.values.find(
              (filterValue) => filterValue.value === value
            )
          ) {
            existingFilter.values.push({ value, label: value });
          }
        } else {
          existingFilter.values = [{ value, label: value }];
        }
      }
    };

    const addRangeFilter = (code: FilterCode, [min, max]: [number, number]) => {
      result.push({
        key: code,
        code,
        name: code,
        min,
        max,
      });
    };

    products?.forEach((product) => {
      const variants = product.variants;

      if (variants.length > 0) {
        variants.forEach(({ color, size }) => {
          const variantColor = color === "null" ? "Mặc định" : color,
            variantSize = size === "null" ? "Mặc định" : size;

          if (variantColor) {
            addStringFilterValue(FilterCode.COLOR, variantColor);
          }

          if (variantSize) {
            addStringFilterValue(FilterCode.SIZE, variantSize);
          }
        });
      }

      const productPrice = (product.price * (100 - product.discount)) / 100;

      if (productPrice < minPrice) {
        minPrice = productPrice;
      }

      if (productPrice > maxPrice) {
        maxPrice = productPrice;
      }
    });

    addRangeFilter(FilterCode.PRICE, [minPrice, maxPrice]);

    return result;
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApi.getListProducts();

        if (categoryId) {
          setProducts(
            response.data?.filter(
              (product: any) => product.category == categoryId
            )
          );
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        message.error("Cannot get products! Please try again.");
      }
    };

    fetchData();
  }, [categoryId]);

  useEffect(() => {
    const pageNumber = searchParams.get("page");

    if (pageNumber) {
      setCurrentPage(Number(pageNumber));
    } else {
      setCurrentPage(1);
    }

    let productColors: string[] = [],
      productSizes: string[] = [];

    filters.forEach((attributeFilter) => {
      const attributeValue = searchParams.get(attributeFilter.code);

      if (attributeFilter.code === FilterCode.COLOR) {
        productColors = attributeValue?.split(",") || [];
      }

      if (attributeFilter.code === FilterCode.SIZE) {
        productSizes = attributeValue?.split(",") || [];
      }
    });

    if (productColors.length || productSizes.length) {
      setFilteredProducts(
        products.filter((product) => {
          return (
            product.variants.some((variant) =>
              productColors.includes(variant.color || "null")
            ) ||
            product.variants.some((variant) =>
              productSizes.includes(variant.size || "null")
            )
          );
        })
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, filters, products]);

  const handleFilterChange = useCallback(
    (filter: Record<string, string>) => {
      const cloneFilter = { ...filter };

      for (const key in cloneFilter) {
        cloneFilter[key] = cloneFilter[key].slice(1, -1).replace(/"/g, "");
      }

      router.push(
        pathname + "?" + upsertQueryParams(searchParams, cloneFilter)
      );
    },
    [pathname, router, searchParams]
  );

  return filteredProducts?.length > 0 ? (
    <div className="mt-6 md:flex">
      <div className="w-full md:w-[16%]">
        <p className="my-2 text-lg">Tìm kiếm sản phẩm</p>
        <div className="mt-4 pr-4">
          <ProductFilter
            onFilterChange={handleFilterChange}
            attributeFilters={filters}
          />
        </div>
      </div>
      <div className="w-full md:w-[84%] pl-0 md:pl-8 ">
        {/* <Pagination
          currentPage={currentPage}
          pageSize={PRODUCT_LISTING_PAGE_SIZE}
          // totalCount={products.total_count}
          onPageChange={(page) => {
            router.push(
              pathname + "?" + upsertQueryParam(searchParams, "page", page)
            );
          }}
        /> */}
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-6 mt-10 mb-5">
          {filteredProducts?.map((product) => (
            <li key={product?.id} className="h-full">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="mt-10">No products found!</div>
  );
}
