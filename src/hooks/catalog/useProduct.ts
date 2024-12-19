import { ProductDetail } from "@/types";
import useQuery from "@hooks/useQuery";
import useImageMutation from "../useImageMutation";

export function useListProduct() {
  return useQuery<ProductDetail[]>("/product");
}

export function useCreateProduct() {
  return useImageMutation("/product");
}
