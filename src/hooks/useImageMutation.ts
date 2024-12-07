import api from "@/services/baseApiImg";
import { useState } from "react";

export default function useImageMutation(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<unknown>();

  const mutate = async (params: any) => {
    console.log("mutate");

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
    mutate,
  };
}
