import { AxiosResponse } from "axios";

export const extractJsonData = (response: AxiosResponse) => {
  return response.data?.json?.data;
};
