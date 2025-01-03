"use client";

import ProductVariantCard from "@/components/catalog/product/ProductVariantCard";
import { useBlogById } from "@/hooks/blog/useBlogs";
import { useListProductVariant } from "@/hooks/catalog/useProduct";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Button } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useMemo } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function DetailBlog({ params: { id } }: Props) {
  const { data: blog } = useBlogById(Number(id));
  const { data: productVariantData, fetchData } = useListProductVariant();

  const productIds = useMemo(
    () => blog?.products.map((product) => product.id),
    [blog]
  );

  console.log(productIds);

  useEffect(() => {
    fetchData("product/variant", {
      ids: productIds,
    });
  }, [fetchData, productIds]);

  const productList = useMemo(
    () =>
      productVariantData?.data?.map((variant) => ({
        key: variant.id,
        ...variant,
      })),
    [productVariantData]
  );

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const { title, image, location, text, user, createdAt } = blog;

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="w-full flex justify-between items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div className="inline-flex items-center">
                    <Image
                      className="mr-4 w-16 h-16 rounded-full"
                      src="/user_default.png"
                      width={192}
                      height={192}
                      alt={title}
                    />
                    <div>
                      <a
                        href="#"
                        rel="author"
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        {user.name}
                      </a>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time
                          dateTime={createdAt}
                          title={dayjs(createdAt).format("DD/MM/YYYY")}
                        >
                          {dayjs(createdAt).format("DD/MM/YYYY")}
                        </time>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75v14.25l-5.25-3.75-5.25 3.75V6.75a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {title}
              </h1>
            </header>
            <div className="flex items-center gap-2">
              <MapPinIcon width={24} height={24} />
              <span className="font-bold text-lg">{location}</span>
            </div>
            <div className="indent-6 mt-4">{text}</div>
            <div className="mt-6 flex justify-center">
              <Image
                src="/about_img.png"
                width={600}
                height={400}
                alt="blog-image"
              />
            </div>
          </article>
        </div>
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl my-16">
          <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div className="flex justify-between">
              <span>Các sản phẩm được gắn trong bài</span>
              <Button>Thêm tất cả vào giỏ hàng</Button>
            </div>
            <ul role="list" className="flex flex-wrap gap-4 mt-4">
              {productList?.map((product) => (
                <li key={product.id}>
                  <ProductVariantCard variant={product} />
                </li>
              ))}
            </ul>
          </article>
        </div>
      </main>
    </>
  );
}
