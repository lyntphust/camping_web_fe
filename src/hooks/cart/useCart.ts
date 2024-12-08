import useQuery from "@hooks/useQuery";

export function useCart() {
  return useQuery("/user/cart");
}