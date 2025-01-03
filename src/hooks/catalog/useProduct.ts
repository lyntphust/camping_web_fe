import { ListCommentProduct, ProductDetail, ProductVariant } from "@/types";
import useImageMutation from "@hooks/useImageMutation";
import useQuery from "@hooks/useQuery";
import useLazyQuery from "../useLazyQuery";
import useMutation from "../useMutation";
import usePatch from "../usePatch";

export function useListProduct() {
  return useQuery<ProductDetail[]>("/product");
}

export function useListProductVariant() {
  return useLazyQuery<ProductVariant[]>();
}

export function useCreateProduct() {
  return useImageMutation("/product");
}

export function useUpdateProduct(id: number) {
  return usePatch(`/product/${id}`);
}

export function useListProductComments(id: number) {
  return useQuery<ListCommentProduct[]>(`/comments/product/${id}`);
}

export function useCreateProductComment() {
  return useMutation("/comments");
}
