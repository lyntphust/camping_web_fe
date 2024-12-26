"use-client";

import ProductGallery from "@/components/catalog/product/ProductGallery";
import ProductPartialPrice from "@/components/catalog/product/ProductPartialPrice";
import ProductRating from "@/components/catalog/product/ProductRating";
import ProductDetailFavorite from "@/components/catalog/product/detail/Favorite";
import Swatch from "@/components/catalog/product/detail/Swatch";
import {
  ConfigurableOption,
  ConfigurableOptionValue,
  ListCommentProduct,
  ProductDetail,
  ProductVariant,
} from "@/types";
import { Input } from "antd";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import ModalAddToCart from "./ModalAddToCart";
import { useListProductComments } from "@/hooks/catalog/useProduct";
import dayjs from "dayjs";

interface Props {
  product: ProductDetail;
  className?: string;
}

export default function ConfigurableProduct({
  product,
  className = "",
}: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState<string>("");
  const { data: listComment } = useListProductComments(product.id);

  const ratingCount = useMemo(() => {
    return (
      listComment?.data.reduce(
        (total: any, comment: ListCommentProduct) => total + comment.rating,
        0
      ) || 0
    );
  }, [listComment]);

  const showModal = (type: string) => {
    setIsModalVisible(true);
    setAction(type);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <ModalAddToCart
        visible={isModalVisible}
        onClose={handleClose}
        product={product}
        action={action}
      />
      {product && (
        <>
          <div className="flex flex-wrap mb-8 -mx-4">
            <div className="w-full mb-8 md:w-[60%] md:mb-0">
              <div className="overflow-hidden mt-8">
                <ProductGallery galleryImages={[product.image]} />
              </div>
            </div>
            <div className="w-full md:w-[40%]">
              <div className="lg:pl-20">
                <div className="mb-6">
                  <h2 className="max-w-xl mt-6 mb-6 text-2xl font-semibold leading-loose tracking-wide text-gray-700 md:text-3xl">
                    {product.name}
                  </h2>
                  <IntlProvider locale="vi">
                    <ProductPartialPrice
                      price={product.price}
                      discount={product.discount}
                    />
                  </IntlProvider>
                  <ProductRating
                    ratingSummary={ratingCount}
                    reviewCount={listComment?.data.length}
                  />
                </div>
                <div className="flex flex-wrap items-center mb-6">
                  <div className="mb-4 lg:mb-0">
                    <ProductDetailFavorite productId={product.id} />
                  </div>
                  <a
                    href="#"
                    className="w-full ml-10 px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
                    onClick={() => showModal("add")}
                  >
                    Thêm vào giỏ hàng
                  </a>
                </div>
                <div className="flex gap-4 mb-6">
                  <a
                    href="#"
                    className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-xl"
                    onClick={() => showModal("buy")}
                  >
                    Mua ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
          <section className="not-format description-product">
            <div className=" items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Mô tả
              </h2>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                {product.description || "Chưa có mô tả cho sản phẩm"}
              </p>
            </div>
          </section>
          <section className="not-format comment-product">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Phản hồi ({listComment?.data.length})
              </h2>
            </div>
            {listComment?.data.map((comment) => (
              <article
                key={comment.id}
                className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                      <Image
                        className="mr-2 w-6 h-6 rounded-full"
                        src="/user_default.png"
                        width={24}
                        height={24}
                        alt={comment.user.name}
                      />
                      {comment.user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time dateTime={comment.date} title={comment.date}>
                        {dayjs(comment.createdAt).format("HH:mm DD/MM/YYYY")}
                      </time>
                    </p>
                  </div>
                  <ProductRating
                    ratingSummary={comment.rating}
                    reviewCount={1}
                    hideTotal
                  />
                </footer>
                <p>{comment.comment}</p>
              </article>
            ))}
          </section>

          <aside
            aria-label="Related articles"
            className="py-8 lg:py-12 bg-gray-50 dark:bg-gray-800"
          >
            <div className="px-4 mx-auto max-w-screen-xl">
              <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                Đã xem gần đây
              </h2>
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <article className="max-w-xs">
                  <a href="#">
                    <Image
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                      className="mb-5 rounded-lg"
                      alt="Image 1"
                      width={150}
                      height={150}
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a href="#">Our first office</a>
                  </h2>
                  <p className="mb-4 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes!
                    After months of preparation.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 2 minutes
                  </a>
                </article>
                <article className="max-w-xs">
                  <a href="#">
                    <Image
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
                      className="mb-5 rounded-lg"
                      alt="Image 2"
                      width={150}
                      height={150}
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a href="#">Enterprise design tips</a>
                  </h2>
                  <p className="mb-4  text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes!
                    After months of preparation.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 12 minutes
                  </a>
                </article>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
