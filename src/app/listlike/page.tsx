"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Button, Image, Pagination, Skeleton } from "antd";
import {
  useDeleteFavorite,
  useListFavorite,
} from "@/hooks/favorite/useFavorite";
import ProductPartialPrice from "@/components/catalog/product/ProductPartialPrice";

const ListLike = () => {
  const router = useRouter();
  const { data: favorite, refetch } = useListFavorite();
  const { doDelete: deleteFavorite } = useDeleteFavorite();

  const handleDeleteFavorite = async (id: Number) => {
    await deleteFavorite(`/user/favorite/${id}`);

    refetch();
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2 className="mb-4 mt-12 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Yêu thích
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Danh sách sản phẩm yêu thích của bạn
        </p>
      </div>
      <ul role="list" className="">
        {favorite?.data.length === 0 && (
          <section className="text-center">
            Không có sản phẩm{" "}
            <span
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => {
                router.push("/category/what-is-new");
              }}
            >
              Tiếp tục mua sắm
            </span>
          </section>
        )}
        {favorite?.data?.map((product) => (
          <li
            className=" m-2 px-4 rounded-lg flex py-4 transition-all shadow shadow-lg "
            key={product.productId}
          >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={product.photo}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">{product.name}</a>
                  </h3>
                  <ProductPartialPrice
                    price={product.price}
                    discount={product.discount}
                    className="flex-row-reverse"
                  />
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <HeartIcon
                  className="h-10 w-10 flex-shrink-0 text-red-500 cursor-pointer"
                  onClick={() => {
                    handleDeleteFavorite(product.productId);
                  }}
                />
                <div className="mr-4 flow-root lg:ml-6">
                  <a
                    className="w-full text-center text-blue-600 lg:w-1/2 rounded-xl cursor-pointer"
                    onClick={() => router.push(`/product/${product.productId}`)}
                  >
                    Thêm vào giỏ hàng
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* {products.length > 0 && (
        <div className="text-center mt-12">
          <Pagination current={1} pageSize={5} total={10} />
        </div>
      )} */}
    </div>
  );
};

export default ListLike;
