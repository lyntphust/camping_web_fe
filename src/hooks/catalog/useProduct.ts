import useQuery from "@hooks/useQuery";
import useImageMutation from "../useImageMutation";

export function useListProduct() {
  return useQuery("/product");
}

export function useCreateProduct() {
  return useImageMutation("/product");
}
