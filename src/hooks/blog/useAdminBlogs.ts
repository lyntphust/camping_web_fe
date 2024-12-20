import { Blog, BlogStatus } from "@/types";
import useLazyMutation from "../useLazyMutation";
import useQuery from "../useQuery";
import { useState } from "react";

export function useAdminBlogs() {
  const { mutate } = useLazyMutation();
  const [isLoading, setIsLoading] = useState(false);

  const approveBlog = async (blogId: number) => {
    setIsLoading(true);

    const result = await mutate(`/blog/admin/update-status/${blogId}`, {
      status: BlogStatus.APPROVED,
    });

    setIsLoading(false);

    return result;
  };

  const rejectBlog = async (blogId: number) => {
    setIsLoading(true);

    const result = mutate(`/blog/admin/update-status/${blogId}`, {
      status: BlogStatus.REJECTED,
    });

    setIsLoading(false);

    return result;
  };

  const getAllBlogs = () => {
    return useQuery<Blog[]>(`/blog/admin`);
  };

  return {
    getAllBlogs,
    approveBlog,
    rejectBlog,
    isLoading,
  };
}
