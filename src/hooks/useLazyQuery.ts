import api from "@services/baseApi";
import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";

export default function useLazyQuery<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AxiosResponse<T, any>>();
  const [error, setError] = useState<unknown>();

  const refetch = (url: string, params?: any) => {
    fetchData(url, { params });
  };

  const fetchData = useCallback(async (url: string, params?: any) => {
    setIsLoading(true);

    try {
      const response = await api.get(url, {
        params,
      });

      if (response) {
        setData(response);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchData,
    refetch,
  };
}
