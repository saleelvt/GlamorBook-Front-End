/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { URL } from "./constants";

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const commonRequest = async (
  method: string,
  route: any,
  config: any,
  body?: any
) => {
  const requestConfig = {
    method,
    url: route,
    headers: config,
    data: body,
  };

  try {
    const response = await instance({
      ...requestConfig,
    });

    return response;
  } catch (error: any) {
    return error;
  }
};
