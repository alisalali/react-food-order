import { useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url);

      if (!response.ok) {
        throw new Error("Request failed !");
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    error,
    isLoading,
    sendRequest,
  };
};

export default useHttp;
