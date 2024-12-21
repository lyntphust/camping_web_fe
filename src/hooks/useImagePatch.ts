import { LOADING_DELAY } from "@/constants";
import api from "@/services/baseApiImg";
import { useState } from "react";

export default function useImagePatch(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const patch = async (params: any) => {
    setIsLoading(true);

    try {
      const response = await api.patch(url, params);

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
    patch,
  };
}
