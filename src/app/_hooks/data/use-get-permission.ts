import { api } from "@/libs/axios/axios";
import { extractJsonData } from "@/utils/extract-json-data";
import { useQuery } from "@tanstack/react-query";

export const useGetPermission = () => {
  return useQuery({
    queryKey: ["permissions-me"],
    queryFn: async () => {
      const response = await api.get(`/auth/permissions/me`);

      return extractJsonData(response);
    },
  });
};
