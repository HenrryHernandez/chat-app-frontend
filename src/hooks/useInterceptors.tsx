import { useEffect } from "react";

import { axiosInstance } from "./../api/apiInstance";

export const useInterceptors = () => {
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem("token") || "";

        if (!config.headers.Authorization)
          config.headers.Authorization = `Bearer ${token}`;

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosInstance;
};
