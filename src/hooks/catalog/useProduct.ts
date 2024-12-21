import { ProductDetail } from "@/types";
import useQuery from "@hooks/useQuery";
import useImageMutation from "@hooks/useImageMutation";
import useImagePatch from "../useImagePatch";
import usePatch from "../usePatch";

export function useListProduct() {
  return useQuery<ProductDetail[]>("/product");
}

export function useCreateProduct() {
  return useImageMutation("/product");
}

export function useUpdateProduct(id: number) {
  return usePatch(`/product/${id}`);
}
