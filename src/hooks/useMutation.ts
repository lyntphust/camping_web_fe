import { LOADING_DELAY } from "@/constants";
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
      setTimeout(() => setIsLoading(false), LOADING_DELAY);
    }
  };

  return {
    isLoading,
    error,
    doMutate,
  };
}
