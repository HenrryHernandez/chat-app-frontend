import { useCallback, useState } from "react";
import { AxiosResponse } from "axios";

import { CustomResponse } from "../models";

export const useRequestAndLoad = () => {
  const [loading, setLoading] = useState(false);

  const makeCallRequest = useCallback(
    async (axiosRequest: Promise<AxiosResponse<CustomResponse<any>, any>>) => {
      setLoading(true);

      try {
        const result = await axiosRequest;
        setLoading(false);
        return result?.data;
      } catch (error: any) {
        setLoading(false);
        throw error?.response?.data?.msg || "error";
      }
    },
    []
  );

  return { loading, makeCallRequest };
};
