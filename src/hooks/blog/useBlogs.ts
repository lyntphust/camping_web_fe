import { Blog } from "@/types";
import useDelete from "../useDelete";
import useEdit from "../useEdit";
import useImageMutation from "../useImageMutation";
import useLazyQuery from "../useLazyQuery";
import useQuery from "../useQuery";

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
  return useImageMutation("/blog");
}

export function useUpdateBlog() {
  return useEdit();
}

export function useDeleteBlog() {
  return useDelete();
}

export function useBlogById(id: number): {
  data: Blog | undefined;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
} {
  const hookResult = useQuery<Blog[]>(`/blog/admin`);

  const { data: listBlog } = hookResult;

  const blog = listBlog?.data.find((blog) => blog.id === id);

  return {
    ...hookResult,
    data: blog,
  };
}
