import { AxiosResponse } from "axios";
import { useState } from "react";
import { CustomResponse } from "../models/response.model";

const useRequestAndLoad = () => {
  const [loading, setLoading] = useState(false);

  const makeCallRequest = async (
    axiosRequest: Promise<AxiosResponse<CustomResponse<any>, any>>
  ) => {
    setLoading(true);

    try {
      const result = await axiosRequest;
      setLoading(false);
      return result?.data;
    } catch (error: any) {
      setLoading(false);
      throw error?.response?.data?.msg || "error";
    }
  };

  return { loading, makeCallRequest };
};

export default useRequestAndLoad;
