import { FavProduct } from "@/types";
import useDeletion from "@hooks/useDeletion";
import useMutation from "@hooks/useMutation";
import useQuery from "@hooks/useQuery";

export function useListFavoriteProducts() {
  return useQuery<FavProduct[]>("/user/favorite");
}

export function useAddFavoriteProduct(productId: number) {
  return useMutation(`/user/favorite/${productId}`);
}

export function useRemoveFavoriteProduct(productId: number) {
  return useDeletion(`/user/favorite/${productId}`);
}
