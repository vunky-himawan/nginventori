import { api } from "@/libs/axios/axios";
import { TIndexQueryParam } from "@/types/index-query-param";
import { TPaginationMeta } from "@/types/meta";
import { extractJsonData } from "@/utils/extract-json-data";
import { Role } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type RoleResponse = {
  data: Role[];
  meta: TPaginationMeta;
};

export const useGetRoles = (queryParams: TIndexQueryParam) => {
  return useQuery<RoleResponse>({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await api.get("/roles", {
        params: queryParams,
      });

      return extractJsonData(response);
    },
  });
};
