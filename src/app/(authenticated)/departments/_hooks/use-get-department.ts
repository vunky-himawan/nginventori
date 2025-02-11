import { api } from "@/libs/axios/axios";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationMeta } from "@/types/meta";
import { extractJsonData } from "@/utils/extract-json-data";
import { Department } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type DepartmentResponse = {
  data: Department[];
  meta: TPaginationMeta;
};

export const useGetDepartments = (queryParams: TIndexQueryParam) => {
  return useQuery<DepartmentResponse>({
    queryKey: ["departments", queryParams],
    queryFn: async () => {
      const response = await api.get("/departments", {
        params: queryParams,
      });

      return extractJsonData(response);
    },
  });
};
