import { LOADING_DELAY } from "@/constants";
import api from "@services/baseApi";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useQuery<T>(
  url: string,
  params?: AxiosRequestConfig<any>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AxiosResponse<T, any>>();
  const [error, setError] = useState<unknown>();

  const refetch = () => {
    fetchData();
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await api.get(url, params);

      if (response) {
        setData(response);
      }
    } catch (error) {
      if (url === "/user/cart") {
        setData([] as any);
      } else {
        setError(error);
      }
    } finally {
      setTimeout(() => setIsLoading(false), LOADING_DELAY);
    }
  }, [params, url]);

  useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
