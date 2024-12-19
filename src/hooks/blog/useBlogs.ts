import { Blog } from "@/types";
import useLazyQuery from "../useLazyQuery";
import useMutation from "../useMutation";

export function useListBlog() {
  return useLazyQuery<Blog[]>();
}

export function useCreateBlog() {
  return useMutation("/blog");
}
