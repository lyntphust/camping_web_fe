import { Blog } from "@/types";
import useLazyQuery from "../useLazyQuery";
import useMutation from "../useMutation";
import useQuery from "../useQuery";
import useEdit from "../useEdit";
import useDelete from "../useDelete";

export function useListBlog() {
  return useLazyQuery<Blog[]>();
}

export function useListBlogAll() {
  return useQuery<Blog[]>("/blog/admin");
}

export function useListBlogSaved() {
  const hookResult = useLazyQuery<Blog[]>();

  const { data: listBlog } = hookResult;

  return {
    ...hookResult,
    data: { data: listBlog?.data.filter((blog) => blog.bookmark) },
  };
}

export function useCreateBlog() {
  return useMutation("/blog");
}

export function useUpdateBlog() {
  return useEdit();
}

export function useDeleteBlog() {
  return useDelete();
}
