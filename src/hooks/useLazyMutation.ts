import api from "@services/baseApi";
import { AxiosResponse } from "axios";
import { useState } from "react";

export default function useLazyMutation<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AxiosResponse<T, any>>();
  const [error, setError] = useState<unknown>();

  const mutate = async (url: string, params?: any) => {
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
    data,
    isLoading,
    error,
    mutate,
  };
}
