import useMutation from "@hooks/useMutation";
import useQuery from "@hooks/useQuery";
import useDelete from "@hooks/useDelete";

export function useCart() {
  return useQuery("/user/cart");
}

export function useUpdateCartProduct() {
  return useMutation("/user/add-cart");
}

export function useDeleteCartProduct() {
  return useDelete();
}
