import { ListCommentProduct, ProductDetail } from "@/types";
import useQuery from "@hooks/useQuery";
import useImageMutation from "@hooks/useImageMutation";
import useImagePatch from "../useImagePatch";
import usePatch from "../usePatch";
import useMutation from "../useMutation";

export function useListProduct() {
  return useQuery<ProductDetail[]>("/product");
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
