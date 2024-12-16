import api from "@/services/baseApi";
import { useState } from "react";

export default function useDeletion(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<unknown>();

  const doDelete = async (params?: any) => {
    setIsLoading(true);

    try {
      const response = await api.delete(url, params);

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
    doDelete,
  };
}
