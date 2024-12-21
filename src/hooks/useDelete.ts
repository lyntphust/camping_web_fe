import api from "@/services/baseApi";
import { useState } from "react";

export default function useDelete() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const doDelete = async (url: string, params?: any) => {
    setIsLoading(true);

    try {
      const response = await api.delete(url, params);

      return response;
    } catch (error) {
      setError(error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return {
    isLoading,
    error,
    doDelete,
  };
}
