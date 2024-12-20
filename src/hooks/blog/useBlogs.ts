import { Blog, BlogStatus } from "@/types";
import useLazyQuery from "../useLazyQuery";
import useMutation from "../useMutation";
import useQuery from "../useQuery";

export function useListBlog() {
  return useLazyQuery<Blog[]>();
}

export function useBlogById(id: number) {
  const hookResult = useQuery<Blog[]>(
    `/blog/admin?status=${BlogStatus.APPROVED}`
  );

  const { data: listBlog } = hookResult;

  const blog = listBlog?.data.find((blog) => blog.id === id);

  return {
    ...hookResult,
    data: blog,
  };
}

export function useListBlogAll() {
  return useQuery<Blog[]>(`/blog/admin?status=${BlogStatus.APPROVED}`);
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
