import api from "@/services/baseApi";
import { useState } from "react";

export default function useMutation(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const doMutate = async (params?: any) => {
    setIsLoading(true);

    try {
      const response = await api.post(url, params);

      return response;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    doMutate,
  };
}
