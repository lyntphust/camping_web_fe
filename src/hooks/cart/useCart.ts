import { Cart } from "@/types/cart";
import useDelete from "@hooks/useDelete";
import useMutation from "@hooks/useMutation";
import useQuery from "@hooks/useQuery";

export function useCart() {
  return useQuery<Cart>("/user/cart");
}

export function useUpdateCartProduct() {
  return useMutation("/user/add-cart");
}

export function useDeleteCartProduct() {
  return useDelete();
}
