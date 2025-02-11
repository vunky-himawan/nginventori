import { api } from "@/libs/axios/axios";
import { extractJsonData } from "@/utils/extract-json-data";
import { useQuery } from "@tanstack/react-query";

export const useGetDepartment = (id: number) => {
  return useQuery({
    queryKey: ["department", id],
    queryFn: async () => {
      const response = await api.get(`/departments/${id}`);
      return extractJsonData(response);
    },
    refetchOnWindowFocus: false,
  });
};
