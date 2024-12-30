import { Blog } from "@/types";
import useLazyQuery from "../useLazyQuery";
import useQuery from "../useQuery";
import useEdit from "../useEdit";
import useDelete from "../useDelete";
import useMutation from "../useMutation";

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
