"use client";

import {
  useAddFavoriteProduct,
  useListFavoriteProducts,
  useRemoveFavoriteProduct,
} from "@/hooks/user/useFavoriteProduct";
import { HeartIcon } from "@heroicons/react/24/solid";
import { message } from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface Props {
  productId: number;
}

export default function ProductDetailFavorite({ productId }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  const { data: favProducts, refetch } = useListFavoriteProducts();
  const { doMutate: addFavortiteProduct } = useAddFavoriteProduct(productId);
  const { doDelete: removeFavoriteProduct } =
    useRemoveFavoriteProduct(productId);

  useEffect(() => {
    if (favProducts?.data) {
      setIsLiked(
        favProducts.data.findIndex(
          (product) => product.productId == productId
        ) !== -1
      );
    }
  }, [favProducts, productId]);

  const handleAddFavoriteResult = (result: AxiosResponse | undefined) => {
    const defaultMessage = `Product with ID ${productId} has been added to your favorites.`;

    if (result?.status === 201) {
      message.success(result.data.message || defaultMessage);
    } else if (result?.data.message) {
      message.error(result.data.message);
    } else {
      message.error("Something went wrong");
    }
  };

  const handleRemoveFavoriteResult = (result: AxiosResponse | undefined) => {
    const defaultMessage = `Product with ID ${productId} has been removed from your favorites.`;

    if (result?.status === 200 && result?.data.message) {
      message.success(result.data.message || defaultMessage);
    } else if (result?.data.message) {
      message.error(result.data.message);
    } else {
      message.error("Something went wrong");
    }
  };

  const handleLikeButtonClicked = async () => {
    if (!isLiked) {
      const addFavoriteResult = await addFavortiteProduct();

      handleAddFavoriteResult(addFavoriteResult);
    } else {
      const removeFavoriteResult = await removeFavoriteProduct();

      handleRemoveFavoriteResult(removeFavoriteResult);
    }

    refetch();
  };

  return (
    <HeartIcon
      className={`h-10 w-10 flex-shrink-0 cursor-pointer ${
        isLiked ? "text-red-500" : "text-gray-400"
      } group-hover:text-gray-500`}
      onClick={handleLikeButtonClicked}
    />
  );
}
