import { api } from "@/libs/axios/axios";
import { extractJsonData } from "@/utils/extract-json-data";
import { useQuery } from "@tanstack/react-query";

export const useGetPermissionsOptions = () => {
  return useQuery({
    queryKey: ["permissions-options"],
    queryFn: async () => {
      const response = await api.get("/permissions");

      return extractJsonData(response);
    },
  });
};
