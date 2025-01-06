import { Blog } from "@/types";
import useDeletion from "@hooks/useDeletion";
import useMutation from "@hooks/useMutation";
import useQuery from "@hooks/useQuery";

export function useListFavoriteBlogs() {
  return useQuery<Blog[]>("/user/favorite-blog");
}

export function useAddFavoriteBlog(blogId: number) {
  return useMutation(`/user/favorite-blog/${blogId}`);
}

export function useRemoveFavoriteBlog(blogId: number) {
  return useDeletion(`/user/favorite-blog/${blogId}`);
}
